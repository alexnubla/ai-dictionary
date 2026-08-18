---
title: "Adam / AdamW (Adaptive Moment Estimation)"
category: "Training"
related: ["Gradient Descent", "Optimizer", "Learning Rate", "Loss Function"]
date_added: 2026-08-19
---

# Adam / AdamW (Adaptive Moment Estimation)

The industry-standard optimization algorithm used to train neural networks, which dynamically adapts the learning rate for every individual parameter based on the history of its gradients.

## The Simple Version
A smart learning algorithm for AI. Instead of updating all parts of the AI's "brain" at the same speed, Adam looks at how much each specific part contributed to the last mistake and adjusts its learning speed individually. AdamW is a slightly improved version that prevents the AI from becoming overly complex.

## Detailed Explanation
Adam combines the benefits of two other extensions of stochastic gradient descent: AdaGrad (which works well with sparse gradients) and RMSProp (which works well in online and non-stationary settings). It computes individual adaptive learning rates for different parameters from estimates of first and second moments of the gradients. **AdamW** (Adam with Weight Decay) decouples weight decay from the gradient update, which has been proven to yield better generalization and training stability, especially for Transformers.

## Key Characteristics
- **Adaptive Learning Rates:** Each parameter gets its own learning rate, speeding up convergence.
- **Momentum:** Keeps a running average of past gradients to smooth out the optimization path and avoid local minima.
- **AdamW Superiority:** Standard Adam applies weight decay incorrectly when combined with adaptive learning rates; AdamW fixes this, making it the default choice for training LLMs.

## Business Context
- **Training Stability:** Using AdamW drastically reduces the chance of training runs diverging or crashing, saving massive amounts of compute time and money.
- **Standardization:** Because it is the default optimizer for almost all modern deep learning frameworks, it ensures reproducibility and easier hiring of ML engineers.

## Real-World Analogy
Navigating a rocky downhill path. A standard optimizer takes the same size step with both feet. Adam is like an experienced hiker who takes small, careful steps on steep, unstable rocks (high gradient variance) and large, confident strides on flat, smooth ground (low gradient variance).

## Code Example

```python
# Conceptual: Using AdamW in PyTorch
import torch
import torch.nn as nn

model = nn.Linear(10, 1)
# AdamW is the standard for training Transformers and modern LLMs
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.01)

# In a training loop:
# loss.backward()
# optimizer.step() # Updates weights using adaptive, per-parameter learning rates
```

## Common Misconceptions
- **Myth:** Adam is always better than standard SGD (Stochastic Gradient Descent).
- **Reality:** While Adam converges faster, SGD with momentum can sometimes find "flatter" minima that generalize slightly better for specific tasks like computer vision.
- **Myth:** Adam and AdamW are exactly the same.
- **Reality:** The decoupling of weight decay in AdamW is mathematically distinct and crucial for training large language models effectively.

## Related Terms
- [Gradient Descent](../gradient-descent/)
- [Optimizer](../optimizer/)
- [Learning Rate](../learning-rate/)

## Sources & Further Reading
- [Loshchilov, I., & Hutter, F. Decoupled Weight Decay Regularization (AdamW). ICLR 2019](https://arxiv.org/abs/1711.05101)
