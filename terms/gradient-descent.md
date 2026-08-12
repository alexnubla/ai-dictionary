---
title: "Gradient Descent"
category: "Training"
related: ["Backpropagation", "Loss Function", "Training", "Optimizer"]
date_added: 2026-08-12
---

# Gradient Descent

An iterative optimization algorithm that minimizes a loss function by computing the gradient (direction of steepest increase) and updating model parameters in the opposite direction — the fundamental mechanism by which neural networks learn from data.

## The Simple Version
Imagine you're blindfolded on a mountain, and your goal is to reach the lowest point (the valley). You can't see, but you can feel the slope under your feet. You take a step in the direction that goes downhill. Then you feel the slope again and take another step downhill. You repeat this until you reach the bottom.

That's gradient descent. The "mountain" is the loss function (error). The "slope" is the gradient (how the loss changes with respect to each parameter). The "steps" are parameter updates. By repeatedly stepping downhill, the model finds the parameters that minimize the loss.

## Detailed Explanation
Gradient descent is the workhorse optimization algorithm for training neural networks. It uses calculus to determine how to adjust each parameter to reduce the loss.

**The Algorithm:**
1. **Initialize** parameters randomly
2. **Forward pass:** Compute predictions and loss
3. **Backward pass:** Compute gradients (∂loss/∂parameter) via backpropagation
4. **Update:** parameter = parameter - learning_rate × gradient
5. **Repeat** until convergence

**Variants:**

**1. Batch Gradient Descent:**
- Computes gradients using the entire dataset
- Stable but slow for large datasets
- Rarely used in practice

**2. Stochastic Gradient Descent (SGD):**
- Computes gradients using a single random sample
- Fast but noisy (high variance)
- Can escape local minima due to noise

**3. Mini-Batch SGD:**
- Computes gradients using a small batch (32-2048 samples)
- Balance between stability and speed
- Most common in practice

**Advanced Optimizers (built on gradient descent):**
- **Momentum:** Accumulates past gradients to accelerate convergence
- **Adam:** Adaptive learning rates per parameter (most popular)
- **RMSprop:** Divides learning rate by running average of gradient magnitudes
- **AdaGrad:** Adapts learning rates based on historical gradients

**Key Hyperparameters:**
- **Learning Rate:** Step size (too high = unstable, too low = slow)
- **Batch Size:** Number of samples per gradient computation
- **Momentum:** How much to consider past gradients
- **Weight Decay:** Regularization to prevent overfitting

## Key Characteristics
- **Iterative:** Updates parameters step-by-step toward minimum
- **Gradient-Based:** Uses calculus to determine update direction
- **Local Optimization:** Finds local minima (may not be global minimum)
- **Scalable:** Mini-batch variants handle large datasets efficiently

## Business Context
Understanding gradient descent helps interpret training dynamics and costs:

**Practical Implications:**
- **Training Time:** Number of iterations affects total training duration and cost
- **Convergence:** Learning rate and optimizer choice impact how quickly model learns
- **Hardware Requirements:** Gradient computation is compute-intensive (requires GPUs)
- **Debugging:** Training issues (divergence, slow convergence) often relate to gradient descent settings

**Cost Drivers:**
- **Compute:** Each gradient computation requires forward + backward passes
- **Memory:** Storing gradients for all parameters requires significant VRAM
- **Iterations:** More iterations = more compute = higher cost

## Real-World Analogy
A hiker descending a foggy mountain. The hiker can't see the valley but feels the slope. They take a step downhill, feel the new slope, and repeat. The learning rate is how big each step is. Too big, and they might overshoot the valley. Too small, and it takes forever. Momentum is like carrying speed from previous steps — helps go faster downhill but might overshoot at the bottom.

## Code Example

```python
# Gradient descent from scratch
import torch

# Simple quadratic loss: L = (w - 3)^2
# Minimum at w = 3
w = torch.tensor(0.0, requires_grad=True)
learning_rate = 0.1

print("Gradient Descent Optimization:")
for step in range(20):
    # Forward pass: compute loss
    loss = (w - 3) ** 2
    
    # Backward pass: compute gradient
    loss.backward()
    
    # Update parameter (gradient descent step)
    with torch.no_grad():
        w -= learning_rate * w.grad
    
    # Zero gradients for next iteration
    w.grad = None
    
    if step % 5 == 0:
        print(f"Step {step}: w = {w.item():.4f}, loss = {loss.item():.4f}")

# Final result
print(f"\nFinal: w = {w.item():.4f} (target: 3.0)")
# w converges to 3.0, loss converges to 0.0
```

## Common Misconceptions
- **Myth:** Gradient descent always finds the global minimum.
- **Reality:** Gradient descent finds local minima. For non-convex loss functions (like neural networks), there are many local minima. In practice, finding a "good enough" local minimum is sufficient.

- **Myth:** Gradient descent is the same as backpropagation.
- **Reality:** Backpropagation computes the gradients; gradient descent uses those gradients to update parameters. They're complementary but distinct steps.

- **Myth:** Larger learning rates always speed up training.
- **Reality:** Too large a learning rate causes instability (loss oscillates or diverges). Too small slows convergence. Finding the right learning rate is critical.

## Related Terms
- [Backpropagation](../backpropagation/)
- [Loss Function](../loss-function/)
- [Training](../training/)

## Sources & Further Reading
- [Deep Learning Book: Optimization](https://www.deeplearningbook.org/)
- [An Overview of Gradient Descent Optimization Algorithms](https://arxiv.org/abs/1609.04747)
