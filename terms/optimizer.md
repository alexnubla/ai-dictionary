---
title: "Optimizer"
category: "Training"
related: ["Gradient Descent", "Training", "Backpropagation", "Learning Rate"]
date_added: 2026-08-12
---

# Optimizer

An algorithm that updates a neural network's parameters (weights and biases) based on computed gradients to minimize the loss function — the engine that drives the learning process by determining how and when to adjust the model during training.

## The Simple Version
Imagine you're hiking down a mountain in thick fog. You can feel the slope under your feet (the gradient), but you need a strategy for how to take your steps. 

- **SGD (Stochastic Gradient Descent):** Take a step directly downhill. Simple but might zigzag.
- **Momentum:** Build up speed as you go downhill, like a snowball rolling faster and faster.
- **Adam:** Adjust your step size based on the terrain — take bigger steps on gentle slopes, smaller steps on steep sections.

The optimizer is your hiking strategy. Gradient descent tells you which direction is downhill, but the optimizer decides how big your steps should be and how to use momentum to get to the bottom efficiently.

## Detailed Explanation
Optimizers are the algorithms that actually apply the gradients computed during backpropagation to update model parameters. While gradient descent is the concept, optimizers are the specific implementations.

**Major Optimizer Families:**

**1. SGD (Stochastic Gradient Descent):**
- Basic optimizer: parameter = parameter - learning_rate × gradient
- Simple, well-understood, but can be slow to converge
- Variants: SGD with Momentum, SGD with Nesterov Momentum

**2. Adam (Adaptive Moment Estimation):**
- Most popular optimizer for deep learning
- Combines momentum (first moment) with adaptive learning rates (second moment)
- Works well out-of-the-box for most tasks
- Default choice for many practitioners

**3. AdamW:**
- Adam with decoupled weight decay
- Better generalization than Adam
- Standard for training Transformers (BERT, GPT, Llama)

**4. RMSprop:**
- Divides learning rate by running average of gradient magnitudes
- Good for recurrent neural networks
- Precursor to Adam

**5. AdaGrad:**
- Adapts learning rates based on historical gradients
- Good for sparse features
- Learning rates can become too small over time

**6. LAMB / LARS:**
- Layer-wise adaptive optimizers
- Enable training with very large batch sizes
- Used for training large models efficiently

**Key Hyperparameters:**

**Learning Rate:**
- Most important hyperparameter
- Too high: training diverges (loss increases)
- Too low: training is slow or gets stuck
- Typical range: 1e-5 to 1e-2
- Often use learning rate schedules (warmup, decay)

**Momentum:**
- Accumulates past gradients to accelerate convergence
- Helps escape local minima
- Typical value: 0.9

**Weight Decay:**
- Regularization technique to prevent overfitting
- Adds L2 penalty to loss function
- Typical value: 0.01 to 0.1

**Epsilon:**
- Small constant to prevent division by zero
- Typical value: 1e-8

**Optimizer Comparison:**

| Optimizer | Speed | Memory | Stability | Best For |
|-----------|-------|--------|-----------|----------|
| **SGD** | Slow | Low | Moderate | Simple models, convex problems |
| **SGD + Momentum** | Fast | Low | Good | CNNs, when you want control |
| **Adam** | Fast | Medium | Excellent | Default choice, most tasks |
| **AdamW** | Fast | Medium | Excellent | Transformers, LLMs |
| **RMSprop** | Fast | Medium | Good | RNNs, non-stationary objectives |

## Key Characteristics
- **Gradient-Based:** Uses computed gradients to update parameters
- **Adaptive:** Modern optimizers adjust learning rates per parameter
- **Stateful:** Maintains running averages of gradients (momentum, variance)
- **Configurable:** Multiple hyperparameters control behavior
- **Critical:** Optimizer choice significantly impacts training speed and final performance

## Business Context
Understanding optimizers helps interpret training dynamics and costs:

**Why Optimizers Matter:**
- **Training Speed:** Better optimizers converge faster, reducing training time and cost
- **Final Performance:** Optimizer choice affects model quality (generalization)
- **Stability:** Some optimizers are more robust to hyperparameter choices
- **Resource Usage:** Optimizers with momentum require more memory

**Enterprise Considerations:**
- **Default Choices:** Adam/AdamW work well for most applications
- **Fine-tuning:** Learning rate is critical — too high can catastrophic forget, too low is slow
- **Large-Scale Training:** Specialized optimizers (LAMB, LARS) enable training with huge batch sizes
- **Cost Optimization:** Faster convergence = less compute = lower costs

**Optimizer Selection Guide:**
- **General Purpose:** AdamW (default for most tasks)
- **Transformers/LLMs:** AdamW with weight decay
- **CNNs:** SGD with momentum or Adam
- **RNNs:** RMSprop or Adam
- **Large Batch Training:** LAMB or LARS
- **Memory-Constrained:** SGD (lowest memory overhead)

## Real-World Analogy
A GPS navigation system. Gradient descent tells you which direction is toward your destination (the gradient points uphill, so you go opposite). The optimizer is the navigation strategy: do you take the fastest route (Adam), the most scenic route (SGD with momentum), or adjust based on traffic conditions (adaptive optimizers)? The optimizer determines how efficiently you reach your destination.

## Code Example

```python
# Comparing different optimizers in PyTorch
import torch
import torch.nn as nn
import torch.optim as optim

# Simple model
model = nn.Sequential(
    nn.Linear(10, 64),
    nn.ReLU(),
    nn.Linear(64, 1)
)

# Dummy data
X = torch.randn(100, 10)
y = torch.randn(100, 1)
criterion = nn.MSELoss()

# 1. SGD (basic)
optimizer_sgd = optim.SGD(model.parameters(), lr=0.01)

# 2. SGD with Momentum
optimizer_sgd_momentum = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

# 3. Adam (most popular)
optimizer_adam = optim.Adam(model.parameters(), lr=0.001)

# 4. AdamW (Adam with decoupled weight decay)
optimizer_adamw = optim.AdamW(model.parameters(), lr=0.001, weight_decay=0.01)

# Training loop (example with AdamW)
optimizer = optimizer_adamw

for epoch in range(100):
    # Forward pass
    predictions = model(X)
    loss = criterion(predictions, y)
    
    # Backward pass (compute gradients)
    optimizer.zero_grad()  # Clear old gradients
    loss.backward()        # Compute new gradients
    
    # Optimizer step (update parameters)
    optimizer.step()
    
    if (epoch + 1) % 20 == 0:
        print(f"Epoch {epoch+1}, Loss: {loss.item():.4f}")

# Learning rate scheduling (common practice)
scheduler = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=100)

for epoch in range(100):
    # ... training loop ...
    scheduler.step()  # Update learning rate
    print(f"Epoch {epoch+1}, LR: {scheduler.get_last_lr()[0]:.6f}")
```

## Common Misconceptions
- **Myth:** Adam is always the best optimizer.
- **Reality:** Adam works well for most tasks, but SGD with momentum can generalize better for some problems (especially CNNs). The best optimizer depends on the task and model architecture.

- **Myth:** Optimizers don't matter much — just use the default.
- **Reality:** Optimizer choice significantly impacts training speed, stability, and final model quality. Poor optimizer settings can lead to slow convergence or failure to converge.

- **Myth:** Higher learning rates always speed up training.
- **Reality:** Too high a learning rate causes instability (loss oscillates or diverges). Learning rate schedules (warmup, decay) are often essential for successful training.

- **Myth:** All optimizers require the same memory.
- **Reality:** Optimizers with momentum (Adam, RMSprop) maintain running averages, requiring 2-3x more memory than SGD. This matters for large models.

## Related Terms
- [Gradient Descent](../gradient-descent/)
- [Training](../training/)
- [Backpropagation](../backpropagation/)

## Sources & Further Reading
- [Adam: A Method for Stochastic Optimization](https://arxiv.org/abs/1412.6980)
- [Decoupled Weight Decay Regularization (AdamW)](https://arxiv.org/abs/1711.05101)
- [PyTorch Optimizer Documentation](https://pytorch.org/docs/stable/optim.html)
