---
title: "Chain of Thought (CoT)"
category: "Training"
related: ["Reasoning Model", "LRM", "Prompt Engineering", "In-Context Learning"]
date_added: 2026-08-12
---

Chain of Thought (CoT)

A prompting technique that encourages language models to generate intermediate reasoning steps before producing a final answer, dramatically improving performance on complex tasks requiring logical reasoning, mathematics, or multi-step problem-solving.

## The Simple Version
Imagine asking someone "What's 247 × 389?" They could guess, or they could work through it step-by-step: "First, 247 × 300 = 74,100. Then, 247 × 80 = 19,760. Then, 247 × 9 = 2,223. Adding those up: 74,100 + 19,760 + 2,223 = 96,083."

Chain of thought prompting asks the AI to "show its work" — to think through problems step-by-step rather than jumping straight to an answer. This simple technique dramatically improves accuracy on math, logic, and reasoning tasks.

## Detailed Explanation
Introduced by Wei et al. in 2022, chain-of-thought prompting demonstrated that large language models could perform much better on reasoning tasks when encouraged to generate intermediate steps.

**How It Works:**
1. **Standard Prompting:** "What is 247 × 389?" → Model guesses or makes errors
2. **Chain-of-Thought Prompting:** "Let's think step by step. What is 247 × 389?" → Model works through the calculation

**Types of Chain-of-Thought:**

**1. Zero-Shot CoT:**
Simply add "Let's think step by step" to the prompt.
```
Q: Roger has 5 tennis balls. He buys 2 more cans of tennis balls. 
Each can has 3 tennis balls. How many tennis balls does he have now?
A: Let's think step by step.
```

**2. Few-Shot CoT:**
Provide examples that include reasoning steps.
```
Q: There are 15 trees in the grove. Grove workers will plant trees today. 
After they are done, there will be 21 trees. How many trees did they plant?
A: There are 15 trees originally. Then there were 21 trees after some more were planted. 
So there must have been 21 - 15 = 6. The answer is 6.

Q: [Your question here]
A:
```

**3. Self-Consistency:**
Generate multiple reasoning paths and pick the most common answer.

**4. Tree of Thoughts:**
Explore multiple reasoning branches and backtrack when needed.

**Why It Works:**
- **Decomposition:** Breaks complex problems into smaller, manageable steps
- **Error Detection:** Makes it easier to spot and correct mistakes mid-reasoning
- **Pattern Matching:** Leverages the model's ability to follow logical sequences
- **Attention Focus:** Forces the model to attend to each step of the reasoning process

**Performance Gains:**
- **Mathematics:** 20-40% improvement on grade school math benchmarks
- **Logic Puzzles:** Significant improvements on multi-step reasoning tasks
- **Code Generation:** Better debugging and algorithm design
- **Common Sense Reasoning:** Improved performance on tasks requiring real-world knowledge

## Key Characteristics
- **Step-by-Step Reasoning:** Generates intermediate steps before final answer
- **Improved Accuracy:** Dramatically better on complex reasoning tasks
- **Transparent Process:** Shows the reasoning path, making it auditable
- **Model-Dependent:** Works best with larger models (10B+ parameters)
- **Task-Specific:** Most effective on tasks requiring logical reasoning

## Business Context
Chain-of-thought prompting is a high-ROI technique for enterprise AI:

**When to Use CoT:**
- **Complex Calculations:** Financial modeling, engineering calculations
- **Logical Reasoning:** Decision trees, rule-based systems
- **Code Debugging:** Tracing through code logic to find bugs
- **Multi-Step Problems:** Tasks requiring sequential reasoning
- **Verification:** Checking work and validating solutions

**When NOT to Use CoT:**
- **Simple Factual Questions:** "What's the capital of France?" doesn't need step-by-step reasoning
- **Creative Tasks:** Writing, brainstorming (where direct generation is better)
- **Speed-Critical Applications:** CoT adds latency (10-100x slower)
- **Cost-Sensitive Tasks:** CoT uses more tokens = higher costs

**Enterprise Applications:**
- **Financial Analysis:** Step-by-step financial calculations and modeling
- **Legal Reasoning:** Breaking down complex legal arguments
- **Technical Support:** Systematic troubleshooting and debugging
- **Scientific Research:** Hypothesis generation and experimental design
- **Strategic Planning:** Multi-step decision analysis

**Implementation Considerations:**
- **Model Selection:** CoT works best with capable models (GPT-4, Claude, Llama-70B+)
- **Prompt Design:** Carefully craft prompts to encourage clear reasoning
- **Output Parsing:** Extract the final answer from the reasoning trace
- **Cost Management:** CoT uses more tokens; balance quality vs. cost
- **Evaluation:** Measure both accuracy and reasoning quality

## Real-World Analogy
Showing your work on a math test. Instead of just writing the answer, you write out each step: "First, I'll factor this equation. Then, I'll solve for x. Checking my work..." This makes it easier to spot errors, understand your logic, and verify the answer is correct.

## Code Example

```python
# Comparing standard vs chain-of-thought prompting
from openai import OpenAI

client = OpenAI()

# Complex reasoning problem
problem = """
A store has 3 types of fruit:
- Apples cost $2 each
- Oranges cost $3 each  
- Bananas cost $1 each

A customer buys 5 apples, 3 oranges, and 7 bananas. 
They pay with a $50 bill. How much change do they get?
"""

# Standard prompting (may make errors)
standard = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": problem}]
)
print("Standard:", standard.choices[0].message.content)

# Chain-of-thought prompting (more accurate)
cot = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "Solve problems step by step, showing your work."},
        {"role": "user", "content": problem + "\n\nLet's think step by step."}
    ]
)
print("\nChain-of-Thought:", cot.choices[0].message.content)
# The CoT response will show:
# "Step 1: Calculate apple cost: 5 × $2 = $10"
# "Step 2: Calculate orange cost: 3 × $3 = $9"
# "Step 3: Calculate banana cost: 7 × $1 = $7"
# "Step 4: Total cost: $10 + $9 + $7 = $26"
# "Step 5: Change: $50 - $26 = $24"
# "The answer is $24"
```

## Common Misconceptions
- **Myth:** Chain-of-thought makes models "think" like humans.
- **Reality:** CoT is a prompting technique that encourages step-by-step generation. It's not human-like consciousness or reasoning — it's sophisticated pattern matching guided by the prompt structure.

- **Myth:** CoT always improves performance.
- **Reality:** CoT helps most with complex reasoning tasks. For simple factual questions or creative tasks, it can add unnecessary latency and cost without improving quality.

- **Myth:** Any model can use CoT effectively.
- **Reality:** CoT works best with larger, more capable models (10B+ parameters). Smaller models may struggle to generate coherent reasoning chains.

- **Myth:** CoT eliminates all errors.
- **Reality:** While CoT significantly improves accuracy, models can still make reasoning errors. The step-by-step process makes errors easier to spot, but doesn't eliminate them entirely.

## Related Terms
- [Reasoning Model](../reasoning-model/)
- [LRM](../lrm/)
- [Prompt Engineering](../prompt-engineering/)
- [In-Context Learning](../in-context-learning/)

## Sources & Further Reading
- [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903)
- [Self-Consistency Improves Chain of Thought Reasoning](https://arxiv.org/abs/2203.11171)
- [Tree of Thoughts: Deliberate Problem Solving with Large Language Models](https://arxiv.org/abs/2305.10601)
