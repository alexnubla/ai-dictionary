---
title: "Temperature"
category: "Deployment"
related: ["Inference", "Deterministic", "Non-Deterministic", "Sampling"]
date_added: 2026-08-12
---

# Temperature

A parameter that controls the randomness and creativity of a language model's output by scaling the probability distribution of next-token predictions, where lower values produce more deterministic, focused outputs and higher values produce more diverse, creative outputs.

## The Simple Version
Imagine you're at an ice cream shop. The shop has 100 flavors. 
- If you always pick the most popular flavor (vanilla), your choice is very predictable. That's like temperature = 0.
- If you pick from the top 5 most popular flavors, there's some variety but still predictable. That's like temperature = 0.5.
- If you pick randomly from all 100 flavors, your choice is very unpredictable and creative. That's like temperature = 1.0 or higher.

Temperature controls how "adventurous" the AI is when choosing the next word. Low temperature = safe, predictable answers. High temperature = creative, surprising answers.

## Detailed Explanation
Temperature is a hyperparameter applied during the softmax function that converts model logits (raw scores) into probabilities for the next token.

**Mathematical Effect:**
```
probability(token) = exp(logit(token) / temperature) / Σ exp(logit(i) / temperature)
```

**How Temperature Works:**
- **Temperature = 0:** Model always picks the highest-probability token (greedy decoding). Output is deterministic — same input always produces same output.
- **Temperature = 0.5:** Model is more likely to pick high-probability tokens, but with some variation. Balanced between predictability and creativity.
- **Temperature = 1.0:** Model samples from the raw probability distribution. Standard behavior.
- **Temperature > 1.0:** Model is more likely to pick lower-probability tokens. Output is more diverse and creative, but also more likely to be incoherent or nonsensical.

**Visual Intuition:**
```
Temperature = 0.2:  [████████████████████] 95% | [██] 3% | [█] 2%
Temperature = 1.0:  [██████████] 50% | [████] 25% | [██] 15% | [█] 10%
Temperature = 2.0:  [█████] 30% | [████] 25% | [███] 20% | [██] 15% | [█] 10%
```

**Common Temperature Settings:**
- **0.0 - 0.3:** Factual Q&A, code generation, data extraction (deterministic, focused)
- **0.5 - 0.7:** General conversation, summarization (balanced)
- **0.8 - 1.0:** Creative writing, brainstorming (diverse, creative)
- **1.0+:** Experimental, highly creative (risky, often incoherent)

**Interaction with Other Parameters:**
- **Top-p (Nucleus Sampling):** Often used with temperature to further control diversity
- **Top-k:** Limits sampling to the top k most likely tokens
- **Frequency Penalty:** Discourages repetition (works alongside temperature)
- **Presence Penalty:** Encourages topic diversity (works alongside temperature)

## Key Characteristics
- **Controls Randomness:** Higher temperature = more random, diverse outputs
- **Deterministic at 0:** Temperature = 0 produces identical outputs for identical inputs
- **Task-Dependent:** Optimal temperature varies by task (factual vs. creative)
- **Model-Sensitive:** Different models may respond differently to the same temperature
- **Non-Linear Effect:** Small changes in temperature can have large effects on output diversity

## Business Context
Temperature selection directly impacts AI output quality and consistency:

**When to Use Low Temperature (0.0 - 0.3):**
- **Factual Q&A:** You want accurate, consistent answers
- **Code Generation:** You want correct, predictable code
- **Data Extraction:** You want reliable, structured outputs
- **Classification:** You want consistent categorization
- **Reproducibility:** You need identical outputs for identical inputs

**When to Use High Temperature (0.7 - 1.0):**
- **Creative Writing:** You want diverse, imaginative content
- **Brainstorming:** You want many different ideas
- **Marketing Copy:** You want varied, engaging content
- **Exploration:** You want to discover unexpected solutions

**Enterprise Considerations:**
- **Consistency:** Customer-facing applications often need low temperature for reliability
- **Brand Voice:** Marketing applications may use higher temperature for creativity
- **Testing:** Use temperature = 0 for reproducible testing
- **Cost:** Higher temperature doesn't increase costs (same number of tokens)
- **User Experience:** Balance between predictability (low temp) and engagement (high temp)

**Best Practices:**
- **Start Conservative:** Begin with temperature = 0.7 for general use
- **Test Extensively:** Evaluate outputs at different temperatures for your specific use case
- **Document Choices:** Record which temperature works best for each application
- **Monitor Quality:** Track whether outputs remain coherent at higher temperatures
- **A/B Test:** Compare user satisfaction at different temperatures

## Real-World Analogy
A jazz musician improvising. At low temperature, they stick closely to the melody, playing safe, predictable notes. At high temperature, they take wild risks, playing unexpected notes and exploring unconventional harmonies. Both approaches have value — low temperature for reliability, high temperature for creativity — but the right choice depends on the context (a classical concert vs. a jazz club).

## Code Example

```python
# Demonstrating temperature effects
from openai import OpenAI

client = OpenAI()

prompt = "Write a haiku about artificial intelligence."

# Low temperature (deterministic, focused)
low_temp = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt}],
    temperature=0.2
)
print("Temperature 0.2:", low_temp.choices[0].message.content)
# Likely: "Silicon minds think / Processing endless data / Learning, never sleeping"

# Medium temperature (balanced)
med_temp = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt}],
    temperature=0.7
)
print("\nTemperature 0.7:", med_temp.choices[0].message.content)
# More varied: "Neural networks dream / Of electric sheep at night / Waking to new thoughts"

# High temperature (creative, diverse)
high_temp = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt}],
    temperature=1.0
)
print("\nTemperature 1.0:", high_temp.choices[0].message.content)
# Very varied: "Algorithms bloom / In gardens of computation / Wisdom emerges"

# Run the same prompt multiple times to see variation
print("\n--- Running same prompt 3 times with temperature=0.9 ---")
for i in range(3):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.9
    )
    print(f"Run {i+1}:", response.choices[0].message.content)
```

## Common Misconceptions
- **Myth:** Higher temperature always means better, more creative outputs.
- **Reality:** Higher temperature increases diversity but also increases the chance of incoherent, nonsensical outputs. There's a sweet spot for each task.

- **Myth:** Temperature = 0 means the model is "smarter."
- **Reality:** Temperature = 0 just makes the model deterministic. It doesn't improve the model's capabilities — it just makes it always pick the most likely next token.

- **Myth:** Temperature affects the model's knowledge.
- **Reality:** Temperature only affects how the model samples from its probability distribution. It doesn't change what the model knows — only how it expresses that knowledge.

- **Myth:** You should always use the same temperature.
- **Reality:** Different tasks require different temperatures. Factual Q&A needs low temperature; creative writing needs high temperature. One size does not fit all.

## Related Terms
- [Inference](../inference/)
- [Deterministic](../deterministic/)
- [Non-Deterministic](../non-deterministic/)
- [Prompt](../prompt/)

## Sources & Further Reading
- [OpenAI API Reference: Temperature Parameter](https://platform.openai.com/docs/api-reference/chat/create)
- [How to Use Temperature in LLMs (Hugging Face)](https://huggingface.co/blog/how-to-generate)
- [The Effects of Temperature on LLM Output](https://arxiv.org/abs/2207.07651)
