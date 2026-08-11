---
title: "Few-Shot Learning"
category: "Training"
related: ["Zero-Shot Learning", "Prompt Engineering", "In-Context Learning", "Fine-tuning"]
date_added: 2026-08-12
---

# Few-Shot Learning

A machine learning approach where models learn to perform tasks from only a handful of examples (typically 1-10), rather than requiring thousands or millions of training samples.

## The Simple Version
Think about how a child learns what a "dog" is. You don't need to show them a thousand different dogs. After seeing just two or three dogs — maybe a golden retriever, a poodle, and a chihuahua — the child understands the concept well enough to recognize other dogs they've never seen before.

That's few-shot learning. Instead of needing massive amounts of data to learn something new, the AI can learn from just a few examples. You show it 2-3 examples of what you want, and it figures out the pattern.

For language AI, this means you can give it a few examples of how to format something, translate a phrase, or classify text, and it will understand the task and apply it to new inputs — all without any special training or reprogramming.

## Detailed Explanation
Few-shot learning leverages a model's pre-trained knowledge to generalize from minimal examples. In the context of large language models (LLMs), this is often called **in-context learning** — the model learns the task from examples provided in the prompt itself, without any gradient updates or parameter changes.

**Approaches:**
- **Zero-shot:** No examples provided; model relies entirely on pre-training
- **One-shot:** Single example provided
- **Few-shot:** 2-10 examples provided (sweet spot for most tasks)
- **Many-shot:** More examples, approaching traditional supervised learning

**How it works in LLMs:**
1. Examples are formatted as input-output pairs in the prompt
2. The model identifies the pattern from these examples
3. When given a new input, it applies the learned pattern to generate the output
4. No model weights are updated — the "learning" happens purely through context

**Key factors for success:**
- **Example quality:** Clear, representative examples work better than ambiguous ones
- **Example diversity:** Covering different cases helps generalization
- **Example ordering:** Recent research shows order can impact performance
- **Task complexity:** Simpler tasks require fewer examples

## Key Characteristics
- **Data Efficiency:** Requires minimal training data or examples
- **Rapid Adaptation:** Can switch between tasks instantly by changing examples
- **No Retraining:** Works with frozen, pre-trained models
- **Flexibility:** Easy to modify or update by changing the examples
- **Cost-Effective:** Avoids expensive fine-tuning for simple task adaptations

## Business Context
Few-shot learning is transformative for enterprises because it dramatically reduces the barrier to deploying AI for specific tasks:

**Use cases:**
- **Document Classification:** Show 3-5 examples of how to categorize different document types
- **Data Extraction:** Provide examples of extracting specific fields from forms or invoices
- **Content Formatting:** Demonstrate the desired output format with a few examples
- **Customer Intent:** Show examples of different customer inquiry types
- **Code Generation:** Provide examples of the coding style or patterns you want

**Business advantages:**
- **Speed:** Deploy AI solutions in hours instead of weeks
- **Cost:** No expensive training infrastructure or ML engineering resources needed
- **Agility:** Quickly adapt to new requirements by updating examples
- **Accessibility:** Business users can create few-shot prompts without technical expertise

**When to use few-shot vs. fine-tuning:**
- **Few-shot:** Simple tasks, rapid prototyping, limited examples available, need flexibility
- **Fine-tuning:** Complex tasks, high accuracy requirements, large dataset available, performance-critical applications

## Real-World Analogy
Teaching a new employee a specific task by showing them 2-3 examples of how it's done, rather than sending them to a week-long training course. They watch the examples, understand the pattern, and can immediately apply it to new situations.

## Code Example

{% raw %}
<div markdown="1">
{% highlight python %}
# Few-shot prompting with OpenAI API (current format)
from openai import OpenAI

client = OpenAI()

# Define few-shot examples in the system message
system_prompt = """You are a sentiment classifier. Use these examples to understand the task:

Example 1:
Review: "The product arrived quickly and works perfectly!"
Sentiment: Positive

Example 2:
Review: "Terrible quality. Broke after one use."
Sentiment: Negative

Example 3:
Review: "It's okay. Does what it's supposed to do."
Sentiment: Neutral

Now classify the following review:"""

# New input to classify
user_message = "The customer service was helpful, but shipping took forever."

# Call the API
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_message}
    ],
    temperature=0
)

classification = response.choices[0].message.content.strip()
print("Review:", user_message)
print("Classification:", classification)
{% endhighlight %}
</div>
{% endraw %}
