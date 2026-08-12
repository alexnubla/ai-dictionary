---
title: "In-Context Learning"
category: "Training"
related: ["Few-Shot Learning", "Zero-Shot Learning", "Prompt Engineering", "Transformer"]
date_added: 2026-08-13
---

# In-Context Learning

The ability of large language models to learn tasks from examples provided within the input prompt itself, without any gradient updates or parameter changes to the model weights.

## The Simple Version
Imagine you're a new employee on your first day. Your manager doesn't send you to a week-long training course. Instead, they sit you down and say: "Here are three examples of how we handle customer emails. Now, here's a new email — handle it the same way."

You watch the examples, understand the pattern, and immediately apply it to the new situation. You didn't go through formal training — you learned "in context," right there in the moment, from the examples you were shown.

That's exactly what in-context learning is for AI. The model sees examples in the prompt, figures out the pattern, and applies it to new inputs — all without any actual "training" in the traditional sense.

## Detailed Explanation
In-context learning (ICL) is a surprising emergent capability of large transformer-based language models. Unlike traditional machine learning, where models learn by updating weights through gradient descent, ICL happens entirely at inference time.

**How it works:**
1. **Examples in Prompt:** The user provides input-output pairs in the prompt
2. **Pattern Recognition:** The model's attention mechanism identifies patterns across examples
3. **Implicit Task Inference:** The model infers the task from the examples
4. **Application:** The model applies the learned pattern to new inputs

**Theoretical Understanding:**
Recent research suggests ICL works through:
- **Implicit Bayesian Inference:** The model performs Bayesian reasoning over possible tasks
- **Induction Heads:** Specialized attention patterns that copy and complete patterns
- **Meta-Learning:** Pre-training effectively trains the model to learn from examples

**Relationship to Other Concepts:**
- **Zero-Shot Learning:** ICL with zero examples
- **Few-Shot Learning:** ICL with 1-10 examples (most common form)
- **Many-Shot Learning:** ICL with dozens or hundreds of examples (approaching traditional supervised learning)

**Key Factors for Success:**
- **Example Quality:** Clear, representative examples work best
- **Example Diversity:** Cover different cases to improve generalization
- **Example Ordering:** Recent research shows order impacts performance
- **Model Size:** Larger models exhibit stronger ICL capabilities
- **Task Complexity:** Simpler tasks require fewer examples

## Key Characteristics
- **No Weight Updates:** Model parameters remain frozen during inference
- **Instant Adaptation:** Switch tasks by changing examples in the prompt
- **Context Window Dependent:** Limited by maximum context length
- **Emergent Capability:** Appears in models above a certain size threshold (~10B parameters)
- **Composable:** Can combine with other techniques (RAG, chain-of-thought)

## Business Context
In-context learning is the foundation of practical LLM deployment in enterprises:

**Why it matters:**
- **Democratizes AI:** Business users can "teach" AI without ML expertise
- **Rapid Iteration:** Test new tasks in minutes, not weeks
- **Cost-Effective:** No training infrastructure or compute required
- **Flexible:** Adapt to changing requirements by updating examples
- **Low Risk:** Frozen models are predictable and auditable

**Enterprise Applications:**
- **Dynamic Classification:** Categorize documents by showing examples of each category
- **Format Standardization:** Teach the model your preferred output format
- **Domain Adaptation:** Provide domain-specific examples for specialized tasks
- **Multi-Tenant Systems:** Different users provide different examples for their needs
- **Continuous Improvement:** Update examples as requirements evolve

**Strategic Considerations:**
- **Prompt Management:** Version control your prompts and examples
- **Example Curation:** Invest time in high-quality, diverse examples
- **Monitoring:** Track performance as examples change
- **Hybrid Approaches:** Combine ICL with RAG for knowledge-grounded responses
- **Cost Optimization:** Use fewer examples when possible to reduce token costs

## Real-World Analogy
Learning to dance by watching. Instead of taking formal lessons (traditional training), you watch three experienced dancers perform a routine, then immediately join in and mimic their moves. You learned "in context" from the examples you observed, without formal instruction.

## Example Prompt

**Scenario:** Teaching the model to extract structured data.

**The Prompt:**
> Extract the company name, funding amount, and lead investor from startup announcements.
>
> Example 1:
> Announcement: "TechStartup Inc. announced a $50M Series B round led by Sequoia Capital."
> Extraction: {"company": "TechStartup Inc.", "funding": "$50M", "lead_investor": "Sequoia Capital"}
>
> Example 2:
> Announcement: "BioHealth raised $25M in Series A funding. The round was led by Andreessen Horowitz."
> Extraction: {"company": "BioHealth", "funding": "$25M", "lead_investor": "Andreessen Horowitz"}
>
> Now extract from this announcement:
> Announcement: "CloudAI has secured $100M in Series C funding. The round was led by Accel, with participation from existing investors."
> Extraction:

**The AI's Response:**
> {"company": "CloudAI", "funding": "$100M", "lead_investor": "Accel"}

**Why this works:**
- The model sees the pattern: extract three specific fields into JSON format
- It applies this pattern to the new input
- No training required — learning happened purely from the examples in context

## Common Misconceptions
- **Myth:** In-context learning is the same as fine-tuning.
- **Reality:** ICL happens at inference time with no weight updates. Fine-tuning actually changes model parameters through training. ICL is temporary; fine-tuning is permanent.

- **Myth:** ICL means the model truly "learns" like a human.
- **Reality:** ICL is pattern matching at inference time. The model doesn't retain the examples after the conversation ends. It's more like "contextual adaptation" than true learning.

- **Myth:** More examples always improve ICL performance.
- **Reality:** There's a sweet spot (typically 3-10 examples). Too many examples can exceed context limits, increase costs, or confuse the model with redundant information.

- **Myth:** ICL works equally well for all tasks.
- **Reality:** ICL excels at pattern-based tasks (classification, extraction, formatting) but struggles with tasks requiring deep reasoning or specialized knowledge not in pre-training.

## Related Terms
- [Few-Shot Learning](../few-shot-learning/)
- [Zero-Shot Learning](../zero-shot-learning/)
- [Prompt Engineering](../prompt-engineering/)
- [Transformer](../transformer/)

## Sources & Further Reading
- [An Explanation of In-context Learning as Implicit Bayesian Inference](https://arxiv.org/abs/2111.02080)
- [Why Can GPT Learn In-Context? Language Models Secretly Perform Gradient Descent](https://arxiv.org/abs/2212.10559)
- [A Systematic Survey of Prompt Engineering](https://arxiv.org/abs/2307.06435)
