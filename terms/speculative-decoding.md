---
title: "Speculative Decoding"
category: "Deployment"
related: ["Inference", "Latency", "KV Cache", "Draft Model"]
date_added: 2026-08-12
---

# Speculative Decoding

An inference optimization technique that uses a small, fast "draft" model to generate multiple candidate tokens, which are then verified in parallel by a larger, more accurate "target" model — achieving the quality of the large model with the speed approaching the small model.

## The Simple Version
Imagine you're writing a document with a very fast but occasionally inaccurate assistant, and a very accurate but slow editor.

Without speculative decoding: You wait for the slow editor to write each word. It's accurate but takes forever.

With speculative decoding: The fast assistant quickly drafts 5-10 words. The slow editor reviews all of them at once (in parallel), accepting the correct ones and fixing any mistakes. You get the editor's accuracy with the assistant's speed.

Speculative decoding does the same for AI. A small, fast model (draft model) generates several tokens quickly. The large, accurate model (target model) verifies them all at once. If the draft was right, you've generated multiple tokens in the time it takes to generate one. If the draft was wrong, the target model corrects it.

This technique can achieve 2-3x speedup while maintaining the exact same output quality as the large model.

## Detailed Explanation
Speculative decoding exploits the fact that verifying N tokens takes roughly the same time as generating 1 token in autoregressive decoding. By having a draft model propose multiple tokens, the target model can verify them in parallel.

**The Process:**

**Step 1: Draft Phase**
- Small draft model generates K candidate tokens (typically K=5-10)
- Draft model is fast (small, optimized)
- Draft tokens may contain errors

**Step 2: Verification Phase**
- Large target model processes all K draft tokens in parallel
- Target model computes probabilities for each position
- Compare draft tokens with target model's predictions

**Step 3: Acceptance/Rejection**
- For each draft token, accept if it matches target model's distribution
- Reject at first mismatch, regenerate from that point
- Repeat the process

**Mathematical Insight:**
- Standard decoding: Generate 1 token per forward pass
- Speculative decoding: Generate up to K tokens per forward pass (if draft is correct)
- Expected speedup: 2-3x in practice (depends on draft quality)

**Draft Model Selection:**
- **Same Architecture, Smaller Size:** Llama-70B target + Llama-7B draft
- **Different Architecture:** Any fast model that approximates target
- **Medusa:** Multiple prediction heads on target model (no separate draft)
- **Eagle:** Learned draft model specific to target

**Key Factors for Success:**

**1. Draft Quality:**
- Higher draft accuracy = more tokens accepted = better speedup
- Draft model should approximate target model's distribution
- Typical acceptance rate: 60-80%

**2. Draft Length (K):**
- Too short: Limited speedup
- Too long: More rejections, wasted computation
- Optimal K: 5-10 tokens (task-dependent)

**3. Hardware Utilization:**
- Verification phase must be memory-bound (not compute-bound)
- Works best on high-memory-bandwidth hardware (H100, A100)

**Variants:**

**1. Standard Speculative Decoding:**
- Separate draft and target models
- Most common implementation
- Flexible but requires two models in memory

**2. Medusa:**
- Multiple prediction heads on target model
- No separate draft model needed
- Lower memory overhead

**3. SpecInfer:**
- Uses ensemble of draft models
- Higher acceptance rate
- More complex implementation

**4. EAGLE:**
- Learned draft model with context features
- Higher acceptance rate than standard draft
- State-of-the-art performance

## Key Characteristics
- **Lossless:** Produces identical outputs to standard decoding
- **2-3x Speedup:** Significant latency reduction in practice
- **Memory Overhead:** Requires loading draft model (or Medusa heads)
- **Hardware-Dependent:** Works best on high-bandwidth GPUs
- **Task-Dependent:** Speedup varies by task and draft quality

## Business Context
Speculative decoding is critical for reducing inference costs at scale:

**Why It Matters:**
- **Cost Reduction:** 2-3x speedup = 2-3x cost reduction for inference
- **User Experience:** Faster responses improve user satisfaction
- **Scalability:** Serve more users with same infrastructure
- **Competitive Advantage:** Lower costs enable better pricing

**Enterprise Applications:**
- **High-Traffic APIs:** Reduce costs for millions of requests
- **Real-Time Applications:** Meet strict latency requirements
- **Long-Form Generation:** Speed up document generation, code completion
- **Interactive Systems:** Chatbots, code assistants, voice assistants

**Cost Example:**
- **Standard decoding (Llama-70B):** $0.06 per 1M tokens
- **Speculative decoding (Llama-70B + 7B draft):** $0.02 per 1M tokens
- **Savings:** 67% cost reduction with identical quality

**Implementation Considerations:**
- **Draft Model Selection:** Choose draft that approximates target well
- **Memory Requirements:** Need to load both models (or Medusa heads)
- **Tuning:** Optimize K (draft length) for your specific use case
- **Monitoring:** Track acceptance rates to measure effectiveness

**Popular Implementations:**
- **vLLM:** Built-in speculative decoding support
- **TensorRT-LLM:** NVIDIA's optimized implementation
- **llama.cpp:** Speculative decoding for CPU inference
- **Medusa:** Open-source implementation

## Real-World Analogy
A chef and sous-chef preparing a meal. The sous-chef (draft model) quickly preps ingredients based on the recipe. The head chef (target model) reviews everything at once, accepting correct prep and fixing mistakes. The meal is prepared much faster because the head chef doesn't have to do everything from scratch — they just verify and correct.

## Code Example

```python
# Speculative decoding with Hugging Face Transformers
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

# Load target model (large, accurate)
target_model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-70b-hf",
    torch_dtype=torch.float16,
    device_map="auto"
)

# Load draft model (small, fast)
draft_model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-2-7b-hf",
    torch_dtype=torch.float16,
    device_map="auto"
)

tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-2-70b-hf")

# Speculative decoding function
def speculative_decode(
    prompt: str,
    target_model,
    draft_model,
    tokenizer,
    max_new_tokens: int = 100,
    K: int = 5  # Number of tokens to draft
):
    """Generate text using speculative decoding."""
    
    inputs = tokenizer(prompt, return_tensors="pt").to(target_model.device)
    generated_ids = inputs.input_ids
    
    for _ in range(max_new_tokens // K):
        # Step 1: Draft phase - generate K tokens with draft model
        draft_outputs = draft_model.generate(
            generated_ids,
            max_new_tokens=K,
            do_sample=False,  # Greedy for deterministic drafting
            return_dict_in_generate=True,
            output_scores=True
        )
        draft_tokens = draft_outputs.sequences[0, -K:]
        
        # Step 2: Verification phase - verify all K tokens with target model
        # Target model processes all K tokens in parallel
        with torch.no_grad():
            target_outputs = target_model(
                torch.cat([generated_ids, draft_tokens.unsqueeze(0)], dim=1)
            )
            target_logits = target_outputs.logits[0, -K-1:-1]  # Logits for K positions
            target_probs = torch.softmax(target_logits, dim=-1)
        
        # Step 3: Acceptance/rejection
        accepted_tokens = []
        for i in range(K):
            draft_token = draft_tokens[i]
            target_token = target_probs[i].argmax()
            
            # Accept if draft matches target's most likely token
            if draft_token == target_token:
                accepted_tokens.append(draft_token)
            else:
                # Reject and use target's token
                accepted_tokens.append(target_token)
                break  # Stop at first mismatch
        
        # Append accepted tokens
        generated_ids = torch.cat([
            generated_ids,
            torch.tensor(accepted_tokens, device=generated_ids.device).unsqueeze(0)
        ], dim=1)
        
        # Stop if we generated enough tokens
        if len(accepted_tokens) < K:
            break
    
    return tokenizer.decode(generated_ids[0], skip_special_tokens=True)

# Usage
prompt = "Once upon a time in a land far away,"
result = speculative_decode(prompt, target_model, draft_model, tokenizer)
print(result)
# Achieves 2-3x speedup compared to standard decoding
# while producing identical output quality
```

## Common Misconceptions
- **Myth:** Speculative decoding reduces output quality.
- **Reality:** Speculative decoding is mathematically guaranteed to produce identical outputs to standard decoding. The draft model's errors are caught and corrected by the target model.

- **Myth:** Speculative decoding works for all models.
- **Reality:** Speedup depends on draft model quality and hardware. Poor draft models or low-memory-bandwidth hardware may see limited benefits.

- **Myth:** Speculative decoding eliminates the need for large models.
- **Reality:** You still need the large target model for quality. Speculative decoding just makes it faster by using a small draft model to accelerate generation.

- **Myth:** Speculative decoding is only for research.
- **Reality:** It's production-ready and deployed by major providers (vLLM, TensorRT-LLM). It's one of the most effective inference optimizations available today.

## Related Terms
- [Inference](../inference/)
- [Latency](../latency/)
- [KV Cache](../kv-cache/)
- [Quantization](../quantization/)

## Sources & Further Reading
- [Fast Inference from Transformers via Speculative Decoding](https://arxiv.org/abs/2211.17192)
- [Medusa: Simple LLM Inference Acceleration Framework](https://arxiv.org/abs/2401.10774)
- [vLLM Speculative Decoding Documentation](https://docs.vllm.ai/)
