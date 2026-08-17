---
title: "Batch Size"
category: "Training"
related: ["Gradient Descent", "Stochastic Gradient Descent (SGD)", "Learning Rate", "Convergence"]
date_added: 2026-08-18
---

# Batch Size

The number of training examples utilized in one iteration (forward and backward pass) before the model's internal parameters are updated.

## The Simple Version
How many flashcards a student looks at before taking a practice test to see how much they've learned. A small batch size means updating knowledge frequently but noisily; a large batch size means updating knowledge less often but more accurately.

## Detailed Explanation
In mini-batch gradient descent, the dataset is divided into subsets (batches). The loss is calculated for the batch, gradients are computed, and weights are updated. 
- **Batch Size = 1:** Stochastic Gradient Descent (SGD). High variance, fast updates.
- **Batch Size = Total Dataset:** Batch Gradient Descent. Stable, but computationally expensive and memory-heavy.
- **Mini-Batch:** The sweet spot (e.g., 32, 64, 256), balancing computational efficiency with gradient stability.

## Key Characteristics
- **Memory Constraint:** Dictated by the VRAM of the GPU. Larger batches require more memory.
- **Gradient Noise:** Smaller batches introduce noise, which can act as a regularizer and help escape local minima.
- **Learning Rate Scaling:** Larger batch sizes generally require proportionally larger learning rates to maintain training speed.

## Business Context
- **Compute Cost Optimization:** Maximizing batch size to fully utilize GPU tensor cores reduces total training time and cloud compute bills.
- **Generalization Trade-off:** Research suggests smaller batch sizes often yield models that generalize better to unseen data, impacting final product accuracy.

## Real-World Analogy
Eating a meal. Batch size 1 is taking one bite and checking if you're full after every bite (slow, noisy). Batch size = whole meal is eating the entire plate at once and checking (fast, but you might overeat/crash). Mini-batch is eating in sensible portions.

## Code Example

```python
# Conceptual: Setting batch size in a PyTorch DataLoader
from torch.utils.data import DataLoader

# dataset = MyCustomDataset(...)

# Batch size of 32 means the model sees 32 examples before updating weights
train_loader = DataLoader(dataset, batch_size=32, shuffle=True)

for batch_inputs, batch_labels in train_loader:
    # Forward pass, calculate loss, backward pass, optimizer step
    pass
```

## Common Misconceptions
- **Myth:** Bigger batch size is always better because it's more accurate.
- **Reality:** Massive batch sizes can lead to "sharp minima," resulting in a model that performs poorly on real-world, unseen data (poor generalization).
- **Myth:** Batch size doesn't affect the final model quality.
- **Reality:** It fundamentally changes the optimization landscape and requires tuning the learning rate accordingly.

## Related Terms
- [Gradient Descent](../gradient-descent/)
- [Learning Rate](../learning-rate/)
- [Convergence](../convergence/)

## Sources & Further Reading
- [Goodfellow, I., et al. Deep Learning. MIT Press, 2016. Chapter 8](https://www.deeplearningbook.org/)
