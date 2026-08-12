---
title: "LRM (Large Reasoning Model)"
category: "Architecture"
related: ["LLM", "Chain-of-Thought", "Transformer", "Inference-Time Compute"]
date_added: 2026-08-12
---

# LRM (Large Reasoning Model)

A class of AI models that use extended chain-of-thought reasoning to solve complex problems by "thinking" through steps before producing a final answer, trading speed and cost for significantly improved accuracy on tasks requiring deep reasoning — exemplified by OpenAI's o1 and o3 series, and Anthropic's Claude with extended thinking.

## The Simple Version
Imagine two students taking a math test. The first student reads each question and immediately writes down the first answer that comes to mind. They finish quickly but make mistakes on hard problems.

The second student reads each question, then spends time working through the problem step-by-step on scratch paper. They check their work, consider alternative approaches, and only write down an answer when they're confident. They take longer, but get more problems right — especially the hard ones.

LRMs are like the second student. Instead of generating an answer immediately, they "think" through the problem, exploring different approaches, checking their reasoning, and only producing a final answer after careful deliberation. This extended reasoning process makes them much better at complex tasks — math, coding, science, strategy — but also slower and more expensive.

## Detailed Explanation
Large Reasoning Models (LRMs) emerged in 2024-2025 as a new paradigm in AI, pioneered by OpenAI's o1 (September 2024) and followed by o3, Anthropic's Claude with extended thinking, and similar systems.

**Key Innovation:**
Traditional LLMs generate answers token-by-token in a single pass. LRMs generate an extended chain-of-thought (CoT) reasoning trace before producing the final answer. This reasoning trace can be thousands or tens of thousands of tokens long.

**How LRMs Work:**
1. **Problem Input:** User provides a complex question or task
2. **Extended Reasoning:** Model generates a detailed reasoning trace, exploring:
   - Different approaches to the problem
   - Step-by-step calculations or logic
   - Verification of intermediate results
   - Consideration of edge cases
   - Self-correction of errors
3. **Final Answer:** Model produces the final response based on its reasoning

**Training Approach:**
LRMs are trained using reinforcement learning to optimize for reasoning quality:
- **Process Reward Models (PRMs):** Reward good reasoning steps, not just correct answers
- **Outcome Reward Models (ORMs):** Reward correct final answers
- **Scale RL:** Train on massive compute to develop reasoning capabilities
- **Curriculum Learning:** Progress from simple to complex reasoning tasks

**Key Characteristics:**
- **Extended Thinking:** Reasoning traces can be 10K-100K+ tokens
- **Inference-Time Compute:** More compute at inference = better answers (unlike traditional LLMs)
- **Task Specialization:** Excel at math, coding, science, strategy, and complex reasoning
- **Slower Speed:** 10-100x slower than standard LLMs due to extended reasoning
- **Higher Cost:** 10-100x more expensive per query due to token usage
- **Transparency:** Reasoning traces can be shown to users (in some implementations)

**Comparison with Standard LLMs:**

| Aspect | Standard LLM (GPT-4, Claude) | LRM (o1, o3) |
|--------|------------------------------|--------------|
| **Response Time** | Seconds | 10-100 seconds |
| **Cost per Query** | $0.01-$0.06 | $0.10-$1.00+ |
| **Math Performance** | Good | Excellent |
| **Coding Performance** | Good | Excellent |
| **Reasoning Depth** | Surface-level | Deep, multi-step |
| **Best For** | General tasks, conversation | Complex reasoning, hard problems |

**When to Use LRMs:**
- **Complex Math:** Olympiad-level mathematics, proofs, calculations
- **Hard Coding:** Algorithm design, debugging complex systems, architecture
- **Scientific Reasoning:** Hypothesis generation, experimental design, analysis
- **Strategic Planning:** Multi-step decision making, game theory, optimization
- **Verification:** Checking work, finding errors, validating solutions

**When Standard LLMs Are Better:**
- **Simple Tasks:** Basic questions, conversation, summarization
- **Speed-Critical:** Real-time applications, chatbots
- **Cost-Sensitive:** High-volume, low-margin applications
- **Creative Tasks:** Writing, brainstorming, ideation (where speed matters more than precision)

**The Inference-Time Compute Paradigm:**
LRMs introduce a new scaling law: performance improves with more compute at inference time, not just at training time. This is a fundamental shift from traditional LLMs, where all compute happens during training.

**Implications:**
- **Cost-Performance Tradeoff:** Users can choose how much to spend per query
- **Adaptive Reasoning:** Models can spend more time on harder problems
- **New Hardware Requirements:** Inference becomes compute-intensive, not just memory-intensive
- **Pricing Models:** Shift from per-token to per-reasoning-step pricing

## Key Characteristics
- **Extended Reasoning:** Generates detailed chain-of-thought before answering
- **Inference-Time Scaling:** More compute at inference = better performance
- **Task Specialization:** Excels at complex reasoning tasks
- **Slower and More Expensive:** Trades speed and cost for accuracy
- **Transparent Reasoning:** Can show reasoning process to users (in some implementations)

## Business Context
LRMs create new strategic options for enterprise AI:

**Opportunities:**
- **Solving Hard Problems:** Tackle tasks that were previously impossible for AI
- **Quality-Critical Applications:** Use LRMs for high-stakes decisions where accuracy matters
- **Competitive Advantage:** Access reasoning capabilities competitors may lack
- **New Use Cases:** Enable applications that require deep reasoning (scientific discovery, complex optimization)

**Challenges:**
- **Cost Management:** LRM queries are 10-100x more expensive than standard LLMs
- **Latency:** 10-100 second response times limit real-time applications
- **Routing Complexity:** Deciding when to use LRM vs. standard LLM
- **Vendor Lock-in:** LRM capabilities are concentrated in a few providers

**Enterprise Strategies:**
- **Tiered Architecture:** Route simple queries to standard LLMs, complex queries to LRMs
- **Cost Optimization:** Use LRMs selectively for high-value tasks
- **Hybrid Approaches:** Combine LRM reasoning with standard LLM speed
- **Build vs. Buy:** Evaluate whether to develop in-house reasoning capabilities
- **Use Case Prioritization:** Focus LRM investment on tasks where reasoning quality is critical

**ROI Considerations:**
- **Quality Improvement:** 20-50% better accuracy on complex tasks
- **Cost Increase:** 10-100x higher cost per query
- **Value Assessment:** Calculate whether quality improvement justifies cost increase
- **Selective Deployment:** Use LRMs only where the quality improvement creates measurable value

## Real-World Analogy
Hiring a consultant vs. an intern. An intern (standard LLM) can handle routine tasks quickly and cheaply. A consultant (LRM) takes longer and costs more, but can solve complex problems that stump the intern. You wouldn't hire a consultant to format a spreadsheet, but you would hire one to design your company's 5-year strategy. LRMs are the consultants of AI.

## Code Example

```python
# Using an LRM (OpenAI o1) with extended reasoning
import openai

client = openai.OpenAI()

# Standard LLM query (fast, cheap)
standard_response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "What is 247 * 389?"}
    ]
)
print("Standard LLM:", standard_response.choices[0].message.content)
# Output: "96,083" (may be incorrect)

# LRM query (slower, more expensive, more accurate)
reasoning_response = client.chat.completions.create(
    model="o1",
    messages=[
        {"role": "user", "content": "What is 247 * 389?"}
    ],
    # The model will spend time reasoning through the calculation
    # before producing the final answer
)
print("LRM:", reasoning_response.choices[0].message.content)
# Output: "96,083" (correct, with reasoning trace)

# For complex problems, the difference is dramatic
complex_problem = """
A company has 3 factories producing widgets. Factory A produces 100 widgets/day 
with 95% quality. Factory B produces 150 widgets/day with 92% quality. 
Factory C produces 200 widgets/day with 88% quality. 

If the company needs to produce 1000 high-quality widgets (quality >= 90%) 
in the minimum time, how should they allocate production across factories?
"""

# Standard LLM might give a quick but suboptimal answer
# LRM will reason through the optimization problem step-by-step
```

## Common Misconceptions
- **Myth:** LRMs are just LLMs with longer outputs.
- **Reality:** LRMs are fundamentally different — they're trained with reinforcement learning to optimize for reasoning quality, not just next-token prediction. The extended reasoning trace is a symptom, not the cause, of their capabilities.

- **Myth:** LRMs will replace standard LLMs.
- **Reality:** LRMs and standard LLMs serve different purposes. LRMs excel at complex reasoning but are slower and more expensive. Standard LLMs are better for general tasks, conversation, and speed-critical applications.

- **Myth:** More reasoning always means better answers.
- **Reality:** For simple tasks, extended reasoning is wasteful. LRMs are most valuable for problems that genuinely require deep reasoning. Using an LRM for "What's the capital of France?" is overkill.

- **Myth:** LRMs are always more accurate than standard LLMs.
- **Reality:** LRMs are more accurate on complex reasoning tasks, but for simple factual questions, standard LLMs are equally accurate and much faster. The advantage is task-dependent.

## Related Terms
- [LLM](../llm/)
- [Chain-of-Thought](../chain-of-thought/)
- [Transformer](../transformer/)
- [Inference-Time Compute](../inference-time-compute/)

## Sources & Further Reading
- [OpenAI o1 System Card](https://openai.com/index/openai-o1-system-card/)
- [Let's Verify Step by Step (Process Reward Models)](https://arxiv.org/abs/2305.20050)
- [Anthropic Claude Extended Thinking](https://www.anthropic.com/news/claude-extended-thinking)
