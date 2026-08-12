---
title: "KV Cache (Key-Value Cache)"
category: "Deployment"
related: ["Inference", "Latency", "Transformer", "Attention Mechanism"]
date_added: 2026-08-12
---

# KV Cache (Key-Value Cache)

An inference optimization technique that stores the Key and Value tensors from previous tokens in transformer attention layers, avoiding redundant recomputation during autoregressive generation — the critical mechanism that makes long-context LLM inference practical.

## The Simple Version
Imagine you're writing a long essay. After writing each paragraph, you need to review the entire essay so far to ensure consistency. 

Without KV cache: Every time you write a new sentence, you re-read the entire essay from the beginning. For a 100-page essay, this becomes incredibly slow.

With KV cache: You keep notes (summaries) of each paragraph as you write it. When writing a new sentence, you consult your notes instead of re-reading everything. Much faster!

KV cache does the same for AI. When generating text token-by-token, instead of recomputing attention for all previous tokens at each step, the model stores the "keys" and "values" (intermediate computations) from previous tokens. When generating the next token, it only computes attention for the new token, using the cached keys and values for all previous tokens.

This optimization is what makes generating long responses (thousands of tokens) feasible in reasonable time.

## Detailed Explanation
In transformer models, the self-attention mechanism computes relationships between all tokens in a sequence. For each new token generated, the model needs to attend to all previous tokens.

**Without KV Cache:**
- Token 1: Compute attention for token 1
- Token 2: Compute attention for tokens 1-2
- Token 3: Compute attention for tokens 1-3
- Token N: Compute attention for tokens 1-N
- **Total computation:** O(N²) — quadratic growth

**With KV Cache:**
- Token 1: Compute K, V for token 1, store in cache
- Token 2: Compute K, V for token 2, use cached K, V for token 1
- Token 3: Compute K, V for token 3, use cached K, V for tokens 1-2
- Token N: Compute K, V for token N, use cached K, V for tokens 1-(N-1)
- **Total computation:** O(N) — linear growth

**What's Stored in KV Cache:**
- **Keys (K):** Representations used to compute attention scores
- **Values (V):** Representations used to compute attention outputs
- **Per Layer:** Each transformer layer has its own KV cache
- **Per Head:** Each attention head has separate K, V tensors

**Memory Requirements:**
For a model like Llama-2-70B:
- **KV cache size:** ~1-2 GB per 1000 tokens (depending on precision)
- **For 32K context:** ~32-64 GB just for KV cache
- **Bottleneck:** KV cache often limits maximum context length

**KV Cache Optimizations:**

**1. Quantized KV Cache:**
- Store K, V in lower precision (FP16 → INT8 → INT4)
- Reduces memory by 2-4x
- Minimal impact on output quality

**2. Sliding Window Attention:**
- Only cache recent N tokens (e.g., last 4096)
- Dramatically reduces memory
- Used by Mistral, Longformer

**3. PagedAttention (vLLM):**
- Treat KV cache like virtual memory
- Page in/out as needed
- Enables efficient batching and memory sharing

**4. Multi-Query Attention (MQA):**
- Share K, V across multiple attention heads
- Reduces KV cache size by number of heads
- Used by Falcon, PaLM

**5. Grouped-Query Attention (GQA):**
- Share K, V across groups of heads
- Balance between MQA and standard attention
- Used by Llama-2-70B

## Key Characteristics
- **Memory-Intensive:** KV cache is often the memory bottleneck
- **Enables Long Context:** Makes long sequences feasible
- **Linear Complexity:** Reduces generation from O(N²) to O(N)
- **Optimizable:** Multiple techniques reduce memory footprint
- **Critical for Performance:** Essential for fast inference

## Business Context
KV cache directly impacts inference costs and capabilities:

**Why It Matters:**
- **Cost Driver:** KV cache memory determines how many concurrent users you can serve
- **Context Limits:** KV cache size limits maximum context length
- **Performance:** Efficient KV cache management enables faster inference
- **Scalability:** Better KV cache management = more users per GPU

**Enterprise Implications:**
- **Infrastructure Planning:** KV cache requirements determine GPU memory needs
- **Model Selection:** Models with MQA/GQA have smaller KV cache requirements
- **Serving Frameworks:** vLLM, TGI optimize KV cache management
- **Cost Optimization:** Quantized KV cache reduces infrastructure costs

**Cost Example:**
- **Standard KV cache (FP16):** 1 GPU serves 10 concurrent users with 4K context
- **Quantized KV cache (INT8):** 1 GPU serves 20 concurrent users (2x improvement)
- **PagedAttention:** 1 GPU serves 50+ concurrent users (5x improvement)

**Popular Implementations:**
- **vLLM:** PagedAttention for efficient KV cache management
- **TensorRT-LLM:** Optimized KV cache for NVIDIA GPUs
- **llama.cpp:** Efficient KV cache for CPU inference
- **FlashAttention:** Memory-efficient attention with KV cache optimization

## Real-World Analogy
A librarian helping patrons find books. Without KV cache, the librarian re-catalogs the entire library every time someone asks a question. With KV cache, the librarian maintains an index card catalog — when a new book arrives, they add one card instead of re-cataloging everything. The catalog (KV cache) grows with the library, but lookups stay fast.

## Code Example

```python
# KV Cache in transformer inference (PyTorch)
import torch
import torch.nn as nn

class TransformerBlockWithKVCache(nn.Module):
    def __init__(self, dim, num_heads):
        super().__init__()
        self.num_heads = num_heads
        self.head_dim = dim // num_heads
        
        self.q_proj = nn.Linear(dim, dim)
        self.k_proj = nn.Linear(dim, dim)
        self.v_proj = nn.Linear(dim, dim)
        self.o_proj = nn.Linear(dim, dim)
    
    def forward(self, x, past_kv=None):
        batch_size, seq_len, dim = x.shape
        
        # Compute Q, K, V for current tokens
        q = self.q_proj(x).view(batch_size, seq_len, self.num_heads, self.head_dim)
        k = self.k_proj(x).view(batch_size, seq_len, self.num_heads, self.head_dim)
        v = self.v_proj(x).view(batch_size, seq_len, self.num_heads, self.head_dim)
        
        # If past_kv exists, concatenate with cached K, V
        if past_kv is not None:
            past_k, past_v = past_kv
            k = torch.cat([past_k, k], dim=1)  # Cache all previous K
            v = torch.cat([past_v, v], dim=1)  # Cache all previous V
        
        # Compute attention (simplified)
        # q: [batch, seq_len, heads, head_dim]
        # k, v: [batch, total_seq_len, heads, head_dim]
        
        # Transpose for attention computation
        q = q.transpose(1, 2)  # [batch, heads, seq_len, head_dim]
        k = k.transpose(1, 2)  # [batch, heads, total_seq_len, head_dim]
        v = v.transpose(1, 2)  # [batch, heads, total_seq_len, head_dim]
        
        # Attention scores
        scores = torch.matmul(q, k.transpose(-2, -1)) / (self.head_dim ** 0.5)
        attn_weights = torch.softmax(scores, dim=-1)
        
        # Apply attention to values
        output = torch.matmul(attn_weights, v)
        output = output.transpose(1, 2).contiguous().view(batch_size, seq_len, dim)
        output = self.o_proj(output)
        
        # Return output and current KV (to be cached for next step)
        current_kv = (k, v)
        return output, current_kv

# Usage example
block = TransformerBlockWithKVCache(dim=512, num_heads=8)

# First token
x1 = torch.randn(1, 1, 512)  # batch=1, seq=1, dim=512
out1, kv1 = block(x1)

# Second token (uses cached KV from first token)
x2 = torch.randn(1, 1, 512)
out2, kv2 = block(x2, past_kv=kv1)  # Pass cached KV

# Third token (uses cached KV from first two tokens)
x3 = torch.randn(1, 1, 512)
out3, kv3 = block(x3, past_kv=kv2)

print(f"KV cache size after 3 tokens: {kv3[0].shape}")
# Output: torch.Size([1, 8, 3, 64]) - cached K for all 3 tokens
```

## Common Misconceptions
- **Myth:** KV cache eliminates all redundant computation.
- **Reality:** KV cache eliminates redundant K, V computation, but attention scores still need to be recomputed for each new token. It's a significant optimization, not a complete elimination.

- **Myth:** KV cache is free (no cost).
- **Reality:** KV cache consumes significant GPU memory, often the primary bottleneck for long-context inference. Managing KV cache memory is a critical engineering challenge.

- **Myth:** All models use the same KV cache size.
- **Reality:** KV cache size varies by model architecture. Models with MQA or GQA have much smaller KV caches than standard multi-head attention models.

- **Myth:** KV cache only matters for long sequences.
- **Reality:** Even for short sequences, KV cache provides 2-5x speedup. For long sequences (32K+ tokens), it's essential — without it, inference would be impractically slow.

## Related Terms
- [Inference](../inference/)
- [Latency](../latency/)
- [Transformer](../transformer/)
- [Attention Mechanism](../attention-mechanism/)

## Sources & Further Reading
- [vLLM: Efficient Memory Management for LLM Serving with PagedAttention](https://arxiv.org/abs/2309.06180)
- [FlashAttention: Fast and Memory-Efficient Exact Attention](https://arxiv.org/abs/2205.14135)
- [Hugging Face: KV Cache Documentation](https://huggingface.co/docs/transformers/main_classes/model_output)
