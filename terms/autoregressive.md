---
title: "Autoregressive"
category: "Architecture"
related: ["GPT", "LLM", "Transformer", "Sampling"]
date_added: 2026-08-12
---

# Autoregressive

A modeling approach where each element in a sequence is predicted based on all previous elements, generating outputs one token at a time in a left-to-right fashion — the foundational principle behind GPT, Llama, Claude, and most modern language models.

## The Simple Version
Imagine writing a story where you can only write one word at a time, and each word must make sense given everything you've written so far. You write "The" → then "cat" → then "sat" → then "on" → then "the" → then "mat". Each word depends on all the words before it.

That's autoregressive generation. The AI predicts the next token based on the entire sequence it has generated so far, adds it to the sequence, and repeats. It's like a very sophisticated autocomplete that builds text one piece at a time.

## Detailed Explanation
In autoregressive models, the probability of a sequence is decomposed as a product of conditional probabilities:

P(x₁, x₂, ..., xₙ) = P(x₁) × P(x₂|x₁) × P(x₃|x₁,x₂) × ... × P(xₙ|x₁,...,xₙ₋₁)

Each token is sampled from the model's probability distribution conditioned on all previous tokens. This creates a causal dependency — you cannot generate token N without first generating tokens 1 through N-1.

**Key Properties:**
- **Sequential Generation:** Tokens are produced one at a time, creating inherent latency
- **Causal Attention:** Transformer architectures use masked attention to prevent "seeing" future tokens
- **Training Objective:** Maximize likelihood of training sequences via next-token prediction
- **Diverse Outputs:** Sampling from the distribution enables creative, varied generation

**Autoregressive vs. Non-Autoregressive:**
- **Autoregressive (GPT, Llama):** Sequential, high quality, slower
- **Non-Autoregressive (some translation models):** Parallel, faster, lower quality
- **Diffusion (image models):** Iterative refinement, different paradigm entirely

## Key Characteristics
- **Sequential:** Cannot parallelize generation across tokens
- **Flexible:** Can generate sequences of any length
- **Coherent:** Each token conditioned on full context ensures consistency
- **Controllable:** Temperature, top-p, and other sampling parameters shape outputs

## Business Context
Understanding autoregressive generation helps explain AI behavior and limitations:

**Implications:**
- **Latency:** Generation speed is limited by sequential nature (cannot parallelize)
- **Cost:** Longer outputs = more inference compute = higher costs
- **Error Propagation:** Early mistakes compound as generation continues
- **Streaming:** Natural fit for streaming responses token-by-token

**Optimization Strategies:**
- **Speculative Decoding:** Use small model to draft tokens, verify with large model
- **KV Caching:** Cache attention keys/values to avoid recomputation
- **Batching:** Process multiple sequences in parallel on GPU

## Real-World Analogy
Building a tower of blocks one at a time. Each block must be placed carefully based on the structure below it. You can't place the 10th block without first placing blocks 1-9. The sequential nature ensures stability but limits speed.

## Code Example

```python
# Autoregressive generation with Hugging Face
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("gpt2")
tokenizer = AutoTokenizer.from_pretrained("gpt2")

prompt = "The future of AI is"
inputs = tokenizer(prompt, return_tensors="pt")

# Autoregressive generation - one token at a time
output = model.generate(
    **inputs,
    max_new_tokens=20,
    do_sample=True,
    temperature=0.7
)

# Each token was generated sequentially based on all previous tokens
print(tokenizer.decode(output[0]))
```

## Common Misconceptions
- **Myth:** Autoregressive means the model is "thinking" sequentially.
- **Reality:** It's a mathematical formulation for sequence generation. The model processes the entire context in parallel during each step; only the output generation is sequential.

- **Myth:** Autoregressive models are inherently slow.
- **Reality:** While generation is sequential, optimizations like KV caching, speculative decoding, and hardware acceleration make modern autoregressive models quite fast.

- **Myth:** All text generation is autoregressive.
- **Reality:** Non-autoregressive models exist (e.g., some translation systems) that generate all tokens in parallel, trading some quality for speed.

## Related Terms
- [GPT](../gpt/)
- [LLM](../llm/)
- [Transformer](../transformer/)
- [Sampling](../sampling/)

## Sources & Further Reading
- [Language Models are Unsupervised Multitask Learners (GPT-2)](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)
- [Fast Inference from Transformers via Speculative Decoding](https://arxiv.org/abs/2211.17192)
