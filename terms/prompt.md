---
title: "Prompt"
category: "Training"
related: ["Prompt Engineering", "Context Window", "Token", "In-Context Learning"]
date_added: 2026-08-12
---

# Prompt

The input text or instruction provided to a language model that guides its response, ranging from simple questions to complex, structured instructions with examples, context, and constraints.

## The Simple Version
A prompt is like a question or request you give to an AI. If you ask "What's the weather?" you'll get a generic response. But if you ask "What's the weather in San Francisco today, and should I bring an umbrella?" you'll get a much more useful, specific answer.

The quality of your prompt directly affects the quality of the AI's response. A vague prompt gets a vague answer. A clear, specific prompt gets a clear, specific answer. That's why "prompt engineering" — the art of writing effective prompts — has become an important skill.

## Detailed Explanation
In the context of large language models, a prompt is the complete input provided to the model, which typically includes:

**Components of a Prompt:**
1. **System Message:** Instructions that define the model's behavior, persona, and constraints (e.g., "You are a helpful assistant")
2. **Context:** Background information, retrieved documents, or conversation history
3. **User Query:** The actual question or request from the user
4. **Examples:** Demonstrations of desired input-output pairs (few-shot learning)
5. **Output Format:** Specifications for how the response should be structured

**Prompt Structure (Modern Chat Models):**
```
[
  {"role": "system", "content": "You are a helpful coding assistant."},
  {"role": "user", "content": "Explain what a prompt is."}
]
```

**Types of Prompts:**
- **Zero-Shot:** Direct instruction without examples ("Translate this to French")
- **Few-Shot:** Includes 2-5 examples to establish the pattern
- **Chain-of-Thought:** Asks the model to reason step-by-step
- **Structured:** Specifies exact output format (JSON, XML, markdown)
- **Constrained:** Sets boundaries ("Answer in 3 sentences or less")

**Prompt Engineering Techniques:**
- **Clarity:** Be specific and unambiguous
- **Context:** Provide relevant background information
- **Examples:** Show what good output looks like
- **Role Assignment:** Give the model a persona ("You are an expert...")
- **Step-by-Step:** Break complex tasks into smaller steps
- **Output Specification:** Define the exact format you want

**Prompt Anatomy:**
- **Tokens:** Prompts are measured in tokens (roughly 0.75 words per token)
- **Context Window:** Prompts must fit within the model's context window
- **Cost:** Longer prompts cost more (priced per token)
- **Latency:** Longer prompts take more time to process

## Key Characteristics
- **Determines Output Quality:** Better prompts = better responses
- **Context-Dependent:** Effectiveness varies by model, task, and domain
- **Iterative:** Prompts improve through testing and refinement
- **Measurable:** Prompt quality can be evaluated systematically
- **Accessible:** Anyone can write prompts; no coding required

## Business Context
Prompts are the primary interface between humans and AI, making prompt quality critical for enterprise success:

**Why Prompts Matter:**
- **User Experience:** Well-crafted prompts lead to better AI interactions
- **Consistency:** Standardized prompts ensure consistent outputs across teams
- **Cost Efficiency:** Efficient prompts reduce token costs
- **Reliability:** Good prompts produce predictable, high-quality results
- **Competitive Advantage:** Organizations with better prompts get better AI outputs

**Enterprise Prompt Management:**
- **Prompt Libraries:** Maintain versioned, tested prompts for common tasks
- **Prompt Templates:** Create reusable templates with variable placeholders
- **Evaluation:** Systematically test and measure prompt performance
- **Documentation:** Track which prompts work for which use cases
- **Governance:** Review prompts for bias, compliance, and security

**Prompt Engineering as a Skill:**
- **Growing Demand:** Prompt engineering is becoming a valuable professional skill
- **Cross-Functional:** Useful for developers, analysts, writers, and business users
- **Continuous Learning:** Prompt techniques evolve as models improve
- **Domain Expertise:** Effective prompts often require deep knowledge of the task

## Real-World Analogy
Writing a brief for a freelancer. If you say "Write something about dogs," you'll get something generic. If you say "Write a 500-word blog post for first-time dog owners about choosing the right breed, focusing on apartment-friendly dogs, with a friendly and encouraging tone," you'll get something valuable. The prompt is your brief — the more specific and clear it is, the better the result.

## Code Example

```python
# Different prompt structures and their effects
from openai import OpenAI

client = OpenAI()

# 1. Simple prompt (zero-shot)
simple_prompt = "What is machine learning?"
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": simple_prompt}]
)
print("Simple:", response.choices[0].message.content[:100])

# 2. Structured prompt with system message and constraints
structured_prompt = [
    {"role": "system", "content": "You are a technical writer. Explain concepts clearly and concisely."},
    {"role": "user", "content": "Explain machine learning in exactly 2 sentences for a non-technical audience."}
]
response = client.chat.completions.create(
    model="gpt-4",
    messages=structured_prompt
)
print("Structured:", response.choices[0].message.content)

# 3. Few-shot prompt with examples
fewshot_prompt = """
Classify the sentiment of customer reviews as Positive, Negative, or Neutral.

Example 1:
Review: "The product arrived quickly and works perfectly!"
Sentiment: Positive

Example 2:
Review: "Terrible quality. Broke after one use."
Sentiment: Negative

Now classify this review:
Review: "It's okay. Does what it's supposed to do, nothing more."
Sentiment:"""

response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": fewshot_prompt}]
)
print("Few-shot:", response.choices[0].message.content)
```

## Common Misconceptions
- **Myth:** Prompts are just questions.
- **Reality:** Prompts can include system instructions, context, examples, constraints, and output specifications. They're much more than simple questions.

- **Myth:** There's one "perfect" prompt for each task.
- **Reality:** Prompts are context-dependent. The best prompt varies by model, use case, and audience. Continuous iteration is key.

- **Myth:** Prompt engineering is only for technical people.
- **Reality:** Anyone who can clearly articulate what they want can write effective prompts. It's a communication skill, not a coding skill.

- **Myth:** Better models make prompts irrelevant.
- **Reality:** Even the most capable models benefit from clear, well-structured prompts. Prompt quality amplifies model capabilities.

## Related Terms
- [Prompt Engineering](../prompt-engineering/)
- [Context Window](../context-window/)
- [Token](../token/)
- [In-Context Learning](../in-context-learning/)

## Sources & Further Reading
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic's Prompt Engineering Interactive Tutorial](https://docs.anthropic.com/claude/prompt-engineering)
- [The Prompt Engineering Guide](https://www.promptingguide.ai/)
