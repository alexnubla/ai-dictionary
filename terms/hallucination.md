---
title: "Hallucination"
category: "Evaluation"
related: ["Grounding", "Perplexity", "RAG", "Fact-Checking"]
date_added: 2026-08-12
---

# Hallucination

A phenomenon where a large language model generates output that is confident, fluent, and grammatically correct, but factually incorrect, nonsensical, or entirely fabricated, with no basis in the input prompt or its training data.

## The Simple Version
Imagine a student taking a test who doesn't know the answer. Instead of writing "I don't know," they confidently write a detailed, plausible-sounding essay full of made-up facts, fake historical dates, and invented quotes, hoping the teacher will be impressed by the writing style and not notice the content is completely false.

That's an AI hallucination. The model isn't "lying" intentionally; it's just doing what it was trained to do: predict the next most likely word. Sometimes, the most likely-sounding sequence of words is a complete fabrication.

## Detailed Explanation
Hallucinations are a fundamental challenge in generative AI, stemming from the autoregressive nature of LLMs.

**Types of Hallucinations:**
1. **Intrinsic Hallucination:** The output contradicts the provided input context. (e.g., The prompt says "The sky is green," and the model summarizes it as "The sky is blue.")
2. **Extrinsic Hallucination:** The output adds information that is not present in the input and cannot be verified, often inventing facts, citations, or URLs. (e.g., "According to a 2023 Harvard study..." when no such study exists).

**Root Causes:**
- **Training Objective:** Models are trained to maximize the likelihood of the next token, not to verify factual truth.
- **Data Noise:** The training data (the internet) contains contradictions, outdated information, and falsehoods, which the model learns to replicate.
- **Over-optimization for Helpfulness:** RLHF training can incentivize the model to provide a "helpful" answer rather than admitting ignorance.
- **Long-Context Degradation:** As prompts get longer, models struggle to attend to all facts, increasing the chance of mixing up details.

**Mitigation Strategies:**
- **Grounding / RAG:** Forcing the model to answer only from retrieved, verified documents.
- **Prompt Engineering:** Explicitly instructing the model to say "I don't know" if the information is missing.
- **Self-Consistency:** Generating multiple responses and checking if they agree.
- **Fact-Checking Layers:** Using a separate, specialized model or search tool to verify claims before presenting them to the user.

## Key Characteristics
- **Plausible:** Hallucinations often sound highly authoritative and well-written.
- **Non-Deterministic:** The same prompt might yield a factual answer one time and a hallucinated answer the next, depending on sampling temperature.
- **Task-Dependent:** More common in creative generation, summarization of complex documents, and niche factual queries.

## Business Context
Hallucinations represent the primary risk to enterprise AI adoption:
- **Reputational Damage:** A customer-facing chatbot providing false legal or medical advice can lead to lawsuits and brand destruction.
- **Productivity Loss:** If employees cannot trust AI-generated code or summaries, they must spend time fact-checking, negating the efficiency gains.
- **Compliance:** Regulated industries (finance, healthcare) have strict rules against providing unverified information.
- **Mitigation Cost:** Enterprises must invest in robust evaluation frameworks, RAG pipelines, and human-in-the-loop review to manage hallucination risk.

## Real-World Analogy
A confident but misinformed tour guide. They speak beautifully and with great authority, but they confidently point to a modern building and claim it was the site of a famous 18th-century battle. The delivery is perfect; the facts are entirely wrong.

## Code Example

```python
# Demonstrating hallucination mitigation via strict prompting
from openai import OpenAI

client = OpenAI()

# A prompt designed to reduce hallucination
def get_safe_answer(question: str, context: str) -> str:
    system_prompt = """
    You are a factual assistant. Answer the question based ONLY on the provided context.
    If the context does not contain the answer, you MUST reply exactly with: 
    "I do not have enough information to answer that based on the provided context."
    Do not make up facts, dates, or names.
    """
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Context: {context}\n\nQuestion: {question}"}
        ],
        temperature=0.0 # Low temperature reduces creative/random generation
    )
    
    return response.choices[0].message.content

# Test case
context = "The company was founded in 2010 by Jane Doe."
question = "Who was the CEO in 2015?"

print(get_safe_answer(question, context))
# Output: "I do not have enough information to answer that based on the provided context."
# (Prevents the model from hallucinating a name)
```

## Common Misconceptions
- **Myth:** Hallucinations mean the AI is "conscious" or "creative."
- **Reality:** Hallucinations are a statistical artifact of next-token prediction, not a sign of imagination or intent.
- **Myth:** Larger models do not hallucinate.
- **Reality:** While larger models hallucinate *less frequently* than smaller ones, they are still fundamentally prone to it. In fact, their fluency makes their hallucinations more dangerous because they are more believable.
- **Myth:** Hallucinations can be 100% eliminated.
- **Reality:** They can be drastically reduced through grounding and guardrails, but the probabilistic nature of LLMs means a non-zero risk always remains.

## Related Terms
- [Grounding](../grounding/)
- [RAG](../rag/)
- [Perplexity](../perplexity/)

## Sources & Further Reading
- [Survey of Hallucination in Natural Language Generation](https://arxiv.org/abs/2202.03629)
- [Google's Study on LLM Hallucinations](https://blog.google/technology/ai/google-ai-updates/)
