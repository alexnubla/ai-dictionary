---
title: "Scaling Laws"
category: "Training"
related: ["Foundation Model", "LLM", "Pre-training", "Compute"]
date_added: 2026-08-12
---

# Scaling Laws

Empirical relationships describing how AI model performance improves predictably as you increase model size, dataset size, and computational resources — the mathematical principles that guide the development of increasingly capable foundation models.

## The Simple Version
Imagine baking cookies. If you double the ingredients, you get roughly twice as many cookies. If you use a bigger oven, you can bake more at once. There are predictable relationships between inputs (ingredients, oven size) and outputs (cookies).

Scaling laws in AI are similar. They describe predictable relationships between:
- **Model size** (number of parameters)
- **Data size** (number of training tokens)
- **Compute** (amount of training computation)
- **Performance** (measured by loss or benchmarks)

These laws allow researchers to predict how well a model will perform before training it, and to allocate resources optimally.

## Detailed Explanation
Scaling laws were formalized by Kaplan et al. (OpenAI, 2020) and extended by Hoffmann et al. (Chinchilla, 2022). They reveal power-law relationships between model performance and resources.

**Key Findings:**

**1. Kaplan et al. (2020):**
- Performance (loss) scales as a power law with model size, dataset size, and compute
- Larger models are more sample-efficient (need less data per parameter)
- Suggested: "Just make models bigger"

**2. Hoffmann et al. (Chinchilla, 2022):**
- For a given compute budget, optimal training requires scaling model size and data size together
- Many large models (GPT-3, PaLM) were undertrained (too few tokens for their size)
- **Chinchilla Optimal:** N ≈ 20 × D (parameters ≈ 20 × dataset size in tokens)

**The Scaling Equation (simplified):**
L(N, D) ≈ (A / N^α) + (B / D^β) + E

Where:
- L = loss (lower is better)
- N = number of parameters
- D = dataset size (tokens)
- A, B, α, β, E = constants fitted empirically

**Implications:**
- **Predictable Performance:** Can forecast model performance before training
- **Resource Allocation:** Optimize compute budget between model size and data
- **Diminishing Returns:** Performance gains slow as models get larger
- **Data Matters:** More data is as important as more parameters

## Key Characteristics
- **Empirical:** Derived from observations, not theoretical proofs
- **Predictable:** Performance follows power-law relationships
- **Resource-Guiding:** Informs optimal allocation of compute budget
- **Diminishing Returns:** Gains slow at extreme scale

## Business Context
Scaling laws have profound implications for enterprise AI strategy:

**Strategic Implications:**
- **Build vs. Buy:** Understanding scaling helps evaluate whether to train custom models or use existing ones
- **Cost Forecasting:** Predict training costs and expected performance
- **Resource Planning:** Allocate compute budget optimally between model size and data
- **Vendor Evaluation:** Assess whether vendor models are optimally trained

**Practical Applications:**
- **Fine-tuning:** Scaling laws apply to fine-tuning too — more data generally helps
- **Domain Adaptation:** Estimate how much domain-specific data is needed
- **Model Selection:** Choose appropriately sized models for your use case
- **ROI Estimation:** Predict performance improvements from additional training

**The "Chinchilla Rule":**
For a given compute budget, the optimal model size (in parameters) is approximately:
N ≈ 20 × D (where D is dataset size in tokens)

Example: If you have 10 billion tokens of training data, the optimal model size is ~200 billion parameters (for that compute budget).

## Real-World Analogy
Building a race car. There are predictable relationships between engine size, weight, aerodynamics, and speed. You can use these relationships to design a car that maximizes speed for a given budget. Scaling laws are the "physics" of AI model development — they tell you how to allocate resources for optimal performance.

## Code Example

```python
# Estimating optimal model size using Chinchilla scaling
def chinchilla_optimal(compute_budget_flops):
    """
    Estimate optimal model size and data size for a given compute budget.
    Based on Hoffmann et al. (2022).
    """
    # Approximate constants from Chinchilla paper
    # These are simplified for illustration
    C = compute_budget_flops  # Total compute budget in FLOPs
    
    # Optimal parameters: N ≈ (C / 6)^(1/2)
    # Optimal data: D ≈ (C / 6)^(1/2) / 20
    # (Simplified - actual formulas are more complex)
    
    N_optimal = (C / 6) ** 0.5  # Number of parameters
    D_optimal = N_optimal / 20  # Dataset size in tokens
    
    return N_optimal, D_optimal

# Example: Compute budget of 10^24 FLOPs (roughly GPT-3 scale)
compute_budget = 1e24
N, D = chinchilla_optimal(compute_budget)

print(f"Compute Budget: {compute_budget:.2e} FLOPs")
print(f"Optimal Model Size: {N:.2e} parameters")
print(f"Optimal Dataset Size: {D:.2e} tokens")
print(f"Chinchilla Ratio: N/D = {N/D:.1f} (target: ~20)")
```

## Common Misconceptions
- **Myth:** Bigger models are always better.
- **Reality:** Scaling laws show that for a given compute budget, there's an optimal balance between model size and data size. An undertrained large model can perform worse than a properly trained smaller model.

- **Myth:** Scaling laws mean we can infinitely scale to superintelligence.
- **Reality:** Scaling laws show diminishing returns at extreme scale. Performance gains slow, and other limitations (data quality, architectural innovations) become more important.

- **Myth:** Scaling laws apply equally to all tasks.
- **Reality:** Scaling laws were derived for language modeling. They may not apply equally to other domains (vision, robotics, etc.) or specific tasks within language.

## Related Terms
- [Foundation Model](../foundation-model/)
- [LLM](../llm/)
- [Pre-training](../pre-training/)

## Sources & Further Reading
- [Scaling Laws for Neural Language Models (Kaplan et al., 2020)](https://arxiv.org/abs/2001.08361)
- [Training Compute-Optimal Large Language Models (Chinchilla, Hoffmann et al., 2022)](https://arxiv.org/abs/2203.15556)
