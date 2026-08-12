---
title: "GPT (Generative Pre-trained Transformer)"
category: "Architecture"
related: ["Transformer", "BERT", "LLM", "Autoregressive"]
date_added: 2026-08-12
---

GPT (Generative Pre-trained Transformer)

A family of large language models developed by OpenAI that uses a decoder-only transformer architecture to generate human-like text by predicting the next word in a sequence, trained on massive amounts of internet data.

## The Simple Version
Imagine a highly advanced autocomplete on your phone, but instead of just finishing a word, it can finish a sentence, a paragraph, or an entire essay. 

GPT works by reading the text you give it and asking, "Based on everything I've ever read, what word is most likely to come next?" It picks that word, adds it to the text, and then asks the question again for the next word. It does this over and over, building a coherent response one word (or token) at a time.

## Detailed Explanation
GPT (Generative Pre-trained Transformer) pioneered the decoder-only transformer architecture for language modeling.

**Core Principles:**
1. **Autoregressive Generation:** Predicts the next token $P(x_t | x_1, ..., x_{t-1})$ based only on previous tokens (left-to-right).
2. **Causal Attention:** A masking mechanism ensures the model cannot "see" future tokens during training or generation, preventing cheating.
3. **Unsupervised Pre-training:** Learns general language patterns by predicting the next word on trillions of tokens from the internet, books, and code.
4. **Instruction Fine-tuning (RLHF):** Later versions (like ChatGPT) are fine-tuned on human conversations to follow instructions and be helpful.

**Evolution:**
- **GPT-1 (2018):** Proved the viability of unsupervised pre-training followed by supervised fine-tuning.
- **GPT-2 (2019):** Demonstrated emergent capabilities at scale (1.5B parameters).
- **GPT-3 (2020):** Introduced in-context learning (few-shot prompting) at 175B parameters.
- **GPT-4/4o (2023-2024):** Multimodal capabilities, advanced reasoning, and massive scale.

## Key Characteristics
- **Generative:** Excels at creating new text, code, and structured data.
- **Autoregressive:** Generates sequentially, which can lead to compounding errors (hallucinations) over long outputs.
- **Scalable:** Performance predictably improves with more parameters, data, and compute (Scaling Laws).
- **Versatile:** A single model can perform translation, summarization, coding, and reasoning via prompting.

## Business Context
GPT models are the foundation of the generative AI boom:
- **Content Creation:** Drafting emails, marketing copy, and reports.
- **Software Development:** Powering tools like GitHub Copilot for code generation.
- **Customer Interaction:** Driving advanced, conversational chatbots.
- **Strategic Consideration:** While powerful, enterprises must manage data privacy (avoiding sending sensitive data to public APIs), control hallucinations, and evaluate the cost of high-volume token generation.

## Real-World Analogy
An improv actor. You give them a starting prompt ("You are a pirate who just found a map"), and they build the story line by line, reacting to what they just said, drawing on their vast knowledge of pirate tropes to keep the story going logically.

## Code Example

```python
# Text generation using OpenAI API (GPT-4)
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum entanglement in one sentence."}
    ],
    temperature=0.7,
    max_tokens=50
)

print(response.choices[0].message.content)
```

## Common Misconceptions
- **Myth:** GPT stands for "General Purpose Technology."
- **Reality:** It stands for "Generative Pre-trained Transformer."
- **Myth:** GPT knows facts and can reason like a human.
- **Reality:** It is a statistical pattern matcher. It generates plausible-sounding text, which sometimes happens to be factually correct, but it does not "know" things in the human sense.

## Related Terms
- [Transformer](../transformer/)
- [BERT](../bert/)
- [LLM](../llm/)
- [Hallucination](../hallucination/)

## Sources & Further Reading
- [Language Models are Unsupervised Multitask Learners (GPT-2)](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)
- [OpenAI GPT-4 Technical Report](https://arxiv.org/abs/2303.08774)
