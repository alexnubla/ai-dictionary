---
title: "GRPO (Group Relative Policy Optimization)"
category: "Training"
related: ["RLHF", "PPO", "Reward Model", "Reinforcement Learning (RL)"]
date_added: 2026-08-20
---

# GRPO (Group Relative Policy Optimization)

A reinforcement learning algorithm used to align AI models with human preferences, which eliminates the need for a separate "critic" model by evaluating a group of outputs relative to each other.

## The Simple Version
A training method where the AI learns by comparing a group of its own answers to see which one is best, rather than relying on a separate "judge" AI to score them. It’s like a student taking a practice test, looking at their 4 different answers, and figuring out which one makes the most sense without needing a teacher to grade it.

## Detailed Explanation
Traditionally, aligning models via Reinforcement Learning (like PPO) requires training a separate "Critic" or "Value" model to estimate how good a response is. This is computationally expensive and unstable. **GRPO**, popularized by the DeepSeek-R1 reasoning models, skips the critic model entirely. For a given prompt, the model generates a *group* of responses. These responses are scored by a reward function (e.g., rule-based correctness or an LLM judge). The model is then updated to increase the probability of the high-scoring responses in the group and decrease the probability of the low-scoring ones, using the group's average score as the baseline.

## Key Characteristics
- **No Critic Model:** Drastically reduces memory and compute requirements during alignment training.
- **Group Relative Scoring:** Uses the mean reward of a group of outputs as the baseline, stabilizing the training process.
- **Ideal for Reasoning:** Highly effective for training models on tasks with verifiable outcomes (like math or coding), where rule-based rewards can be easily applied.

## Business Context
- **Democratizing Alignment:** By removing the need to train a massive critic model, GRPO allows smaller teams and open-source developers to perform high-quality RL alignment on consumer hardware.
- **Reasoning Models:** It is the foundational algorithm behind the recent wave of highly capable, open-weight "reasoning" models that show their work before answering.

## Real-World Analogy
A chef trying to perfect a recipe. Instead of hiring a food critic (the Critic model) to taste every dish, the chef makes 5 variations, tastes them all side-by-side, and keeps the ingredients from the best-tasting one while discarding the worst.

## Code Example

```python
# Conceptual: GRPO reward calculation
def calculate_grpo_rewards(group_outputs, reward_function):
    # 1. Generate a group of N responses for the same prompt
    # 2. Score each response
    scores = [reward_function(output) for output in group_outputs]
    
    # 3. Calculate the group mean and standard deviation (the baseline)
    mean_score = sum(scores) / len(scores)
    std_score = calculate_std(scores)
    
    # 4. Normalize rewards relative to the group
    # This tells the model: "You did better than your average self"
    relative_rewards = [(s - mean_score) / (std_score + 1e-5) for s in scores]
    
    return relative_rewards
```

## Common Misconceptions
- **Myth:** GRPO is completely unsupervised.
- **Reality:** It still requires a reward signal (from human feedback, rule-based checks, or another AI judge). It just doesn't require a separate *neural network* to predict that reward.
- **Myth:** It replaces PPO for all tasks.
- **Reality:** It excels at tasks with clear, verifiable rewards (math, code). For subjective tasks (creative writing), traditional PPO with a trained reward model is still often preferred.

## Related Terms
- [RLHF](../rlhf/)
- [Reinforcement Learning (RL)](../reinforcement-learning/)
- [Reward Model](../reward-model/)

## Sources & Further Reading
- [Shao, Z., et al. DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models. 2024](https://arxiv.org/abs/2402.03300)
