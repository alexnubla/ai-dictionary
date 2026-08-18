---
title: "Sampling"
category: "Deployment"
related: ["Top-p Sampling", "Temperature", "Beam Search", "Non-Deterministic", "Inference", "LLM"]
date_added: 2026-08-12
---

# Sampling

The process of selecting the next token from a language model's probability distribution during text generation, with various strategies (greedy, random, top-k, top-p) controlling the trade-off between determinism and diversity.

## The Simple Version
Imagine you're at an ice cream shop with 100 flavors. The shop ranks them by popularity:
- **Greedy sampling:** Always pick the #1 most popular flavor (vanilla). Predictable but boring.
- **Random sampling:** Pick any flavor randomly. Creative but might get "pistachio garlic" (nonsense).
- **Top-k sampling:** Pick randomly from the top 5 most popular flavors. Balanced variety.
- **Top-p (nucleus) sampling:** Pick from flavors that together make up 90% of popularity. Dynamic selection.

Sampling is how the AI picks the next word. Different strategies give different balances of predictability and creativity.

## Detailed Explanation
After a language model processes input, it outputs a probability distribution over its entire vocabulary (e.g., 50,000 tokens). Sampling selects which token to generate next.

**Sampling Strategies:**

**1. Greedy (Argmax):**
- Always select the token with highest probability
- Deterministic: same input → same output
- Can produce repetitive, bland text

**2. Random (Multinomial):**
- Sample from the full probability distribution
- Highly diverse but can produce incoherent text
- Controlled by temperature parameter

**3. Top-k:**
- Restrict sampling to the k most likely tokens
- k=1 is greedy; k=vocab_size is random
- Fixed cutoff regardless of probability distribution shape

**4. Top-p (Nucleus):**
- Select smallest set of tokens whose cumulative probability exceeds p
- Dynamic cutoff: adapts to distribution shape
- p=0.9 typically works well

**5. Typical Sampling:**
- Select tokens with probability close to the "typical" information content
- Avoids both very high and very low probability tokens

**Parameters:**
- **Temperature:** Scales the distribution (0=greedy, 1=raw, >1=flatter)
- **Top-k:** Number of tokens to consider
- **Top-p:** Cumulative probability threshold
- **Repetition Penalty:** Discourages repeating tokens
- **Frequency/Presence Penalty:** Further controls repetition

## Key Characteristics
- **Controls Diversity:** Determines how varied outputs are
- **Task-Dependent:** Different tasks need different sampling strategies
- **Non-Deterministic:** Most strategies produce varied outputs
- **Configurable:** Multiple parameters allow fine-grained control

## Business Context
Sampling strategy directly impacts AI output quality and user experience:

**Use Cases by Strategy:**
- **Greedy (temp=0):** Code generation, data extraction, factual Q&A
- **Balanced (temp=0.7, top-p=0.9):** General conversation, summarization
- **Creative (temp=1.0, top-p=0.95):** Creative writing, brainstorming, marketing

**Best Practices:**
- **Start Conservative:** Begin with temperature=0.7 for most applications
- **Test Extensively:** Evaluate outputs across multiple runs
- **Document Choices:** Record which parameters work for each use case
- **Monitor Quality:** Track coherence at different settings

## Real-World Analogy
A jazz musician choosing the next note. Greedy sampling always plays the most expected note (safe but predictable). Random sampling plays any note (creative but possibly chaotic). Top-p sampling plays from a curated set of musically appropriate notes (balanced creativity and coherence).

## Code Example

```python
# Comparing sampling strategies
from transformers import AutoModelForCausalLM, AutoTokenizer

model = AutoModelForCausalLM.from_pretrained("gpt2")
tokenizer = AutoTokenizer.from_pretrained("gpt2")

prompt = "Once upon a time"
inputs = tokenizer(prompt, return_tensors="pt")

# Greedy (deterministic)
greedy = model.generate(**inputs, max_new_tokens=20, do_sample=False)
print("Greedy:", tokenizer.decode(greedy[0]))

# Random with temperature
random = model.generate(**inputs, max_new_tokens=20, do_sample=True, temperature=1.0)
print("Random:", tokenizer.decode(random[0]))

# Top-k sampling
topk = model.generate(**inputs, max_new_tokens=20, do_sample=True, top_k=50)
print("Top-k=50:", tokenizer.decode(topk[0]))

# Top-p (nucleus) sampling
topp = model.generate(**inputs, max_new_tokens=20, do_sample=True, top_p=0.9)
print("Top-p=0.9:", tokenizer.decode(topp[0]))
```

## Common Misconceptions
- **Myth:** Higher temperature always means better, more creative outputs.
- **Reality:** Higher temperature increases diversity but also increases incoherence risk. There's an optimal range for each task.

- **Myth:** Sampling is random noise.
- **Reality:** Sampling is guided by the model's probability distribution. It's controlled randomness, not chaos.

- **Myth:** Greedy sampling is always best for factual tasks.
- **Reality:** While greedy is deterministic, it can produce repetitive text. Top-p with low temperature often works better.

## Related Terms
- [Inference](../inference/)
- [Non-Deterministic](../non-deterministic/)
- [Temperature](../temperature/)
- [Top-p Sampling (Nucleus Sampling)](../top-p-sampling/)

## Sources & Further Reading
- [How to Generate Text from a Language Model (Hugging Face)](https://huggingface.co/blog/how-to-generate)
- [The Curious Case of Neural Text Degeneration (Nucleus Sampling)](https://arxiv.org/abs/1904.09751)
