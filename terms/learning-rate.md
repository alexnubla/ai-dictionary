---
title: "Learning Rate"
category: "Training"
related: ["Gradient Descent", "Optimizer", "Training", "Hyperparameter"]
date_added: 2026-08-12
---

# Learning Rate

A critical hyperparameter that controls the size of the steps taken during model optimization — determining how much the model's weights are adjusted in response to the estimated error at each iteration, with values that are too high causing instability and values that are too low causing slow convergence.

## The Simple Version
Imagine you're trying to find the lowest point in a valley while blindfolded. You can feel the slope under your feet and take steps downhill.

- **High learning rate:** You take huge leaps. You might overshoot the valley entirely, bouncing back and forth across it, never settling at the bottom.
- **Low learning rate:** You take tiny baby steps. You'll eventually reach the bottom, but it will take forever.
- **Right learning rate:** You take confident, measured steps. You reach the bottom efficiently without overshooting.

The learning rate is the "step size" for your AI model as it learns. Get it right, and training is fast and stable. Get it wrong, and training either fails completely or takes impractically long.

## Detailed Explanation
The learning rate (often denoted as η or α) is a scalar that multiplies the gradient when updating model parameters:

```
parameter_new = parameter_old - learning_rate × gradient
```

**Effects of Different Learning Rates:**

**Too High:**
- Training diverges (loss increases instead of decreases)
- Oscillations around the minimum
- "NaN" (not a number) errors in extreme cases
- Model fails to learn anything useful

**Too Low:**
- Training is extremely slow
- May get stuck in local minima
- Requires many more epochs to converge
- Computationally expensive

**Just Right:**
- Fast, stable convergence
- Reaches good minimum efficiently
- Balances speed and accuracy

**Learning Rate Schedules:**
Modern training rarely uses a fixed learning rate. Common schedules include:

**1. Step Decay:**
- Reduce learning rate by a factor at fixed intervals
- Example: Multiply by 0.1 every 30 epochs
- Simple and effective

**2. Exponential Decay:**
- Learning rate decreases exponentially over time
- η_t = η_0 × e^(-kt)
- Smooth, continuous reduction

**3. Cosine Annealing:**
- Learning rate follows a cosine curve
- Starts high, decreases smoothly, can restart
- Popular in modern deep learning

**4. Warmup:**
- Start with very small learning rate
- Gradually increase to target value
- Stabilizes early training, especially for Transformers

**5. One-Cycle Policy:**
- Single cycle: warmup → high LR → cooldown
- Can achieve faster convergence and better generalization

**Typical Learning Rate Ranges:**
- **SGD:** 0.01 - 0.1
- **Adam:** 0.001 - 0.0001 (most common: 0.0001)
- **Fine-tuning LLMs:** 1e-5 to 5e-5 (very small to avoid catastrophic forgetting)
- **Training from scratch:** 1e-4 to 1e-2

**Learning Rate Finding:**
- **Grid Search:** Try multiple values, pick best
- **Learning Rate Range Test:** Gradually increase LR, find point where loss decreases fastest
- **Automated Tools:** Optuna, Ray Tune for hyperparameter optimization

## Key Characteristics
- **Most Important Hyperparameter:** Often the single most critical setting
- **Task-Dependent:** Optimal value varies by model, data, and task
- **Dynamic:** Modern training uses schedules, not fixed values
- **Sensitive:** Small changes can dramatically affect training
- **Empirical:** Must be determined experimentally, not theoretically

## Business Context
Learning rate directly impacts training costs and model quality:

**Cost Implications:**
- **Poor Learning Rate:** Wasted compute (divergent training, slow convergence)
- **Good Learning Rate:** Efficient training, faster time-to-deployment
- **Fine-tuning LLMs:** Too high a learning rate can destroy pre-trained knowledge (catastrophic forgetting)

**Enterprise Considerations:**
- **Training Budget:** Optimal learning rate reduces compute costs
- **Reproducibility:** Document learning rate schedules for reproducibility
- **Expertise Required:** Learning rate tuning requires ML expertise
- **Automation:** Hyperparameter optimization tools can help

**Common Pitfalls:**
- **Using Default Values:** Default learning rates may not work for your specific task
- **Ignoring Schedules:** Fixed learning rates often underperform schedules
- **Not Monitoring:** Failing to detect divergence or slow convergence early
- **Fine-tuning Mistakes:** Using pre-training learning rates for fine-tuning

**Best Practices:**
- **Start Conservative:** Begin with lower learning rates, increase if needed
- **Use Schedules:** Implement warmup and decay for stability
- **Monitor Closely:** Watch loss curves for signs of problems
- **Document Everything:** Record learning rate settings for reproducibility
- **Automate When Possible:** Use hyperparameter optimization tools

## Real-World Analogy
Driving a car toward a destination:
- **Too fast (high LR):** You overshoot turns, crash, never arrive
- **Too slow (low LR):** You crawl along, waste time and gas
- **Just right (optimal LR):** You drive efficiently, arrive on time, safely

The learning rate is like your speed — too fast or too slow both cause problems. The right speed gets you there efficiently.

## Code Example

```python
# Learning rate schedules in PyTorch
import torch
import torch.nn as nn
import torch.optim as optim
import matplotlib.pyplot as plt

# Simple model
model = nn.Linear(10, 1)
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 1. Step Decay Scheduler
scheduler_step = optim.lr_scheduler.StepLR(optimizer, step_size=10, gamma=0.1)

# 2. Exponential Decay Scheduler
scheduler_exp = optim.lr_scheduler.ExponentialLR(optimizer, gamma=0.95)

# 3. Cosine Annealing Scheduler
scheduler_cosine = optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=100)

# 4. Warmup + Cosine Annealing (common for Transformers)
def get_warmup_cosine_scheduler(optimizer, warmup_steps, total_steps):
    def lr_lambda(step):
        if step < warmup_steps:
            return step / warmup_steps
        progress = (step - warmup_steps) / (total_steps - warmup_steps)
        return 0.5 * (1 + torch.cos(torch.tensor(progress * 3.14159)))
    return optim.lr_scheduler.LambdaLR(optimizer, lr_lambda)

scheduler_warmup = get_warmup_cosine_scheduler(optimizer, warmup_steps=100, total_steps=1000)

# Demonstrate learning rate over training
lrs = []
for epoch in range(100):
    # Training step would go here
    optimizer.step()
    
    # Record learning rate
    lrs.append(optimizer.param_groups[0]['lr'])
    
    # Update scheduler
    scheduler_cosine.step()

# Plot learning rate schedule
plt.plot(lrs)
plt.title("Cosine Annealing Learning Rate Schedule")
plt.xlabel("Epoch")
plt.ylabel("Learning Rate")
plt.grid(True)
plt.show()

# Learning rate range test (finding optimal LR)
def lr_range_test(model, train_loader, start_lr=1e-7, end_lr=1, num_iters=100):
    """Find optimal learning rate by gradually increasing it."""
    optimizer = optim.SGD(model.parameters(), lr=start_lr)
    
    lr_mult = (end_lr / start_lr) ** (1 / num_iters)
    lrs = []
    losses = []
    
    current_lr = start_lr
    for i in range(num_iters):
        optimizer.param_groups[0]['lr'] = current_lr
        
        # Training step (simplified)
        # ... forward, loss, backward ...
        
        lrs.append(current_lr)
        # losses.append(loss.item())
        
        current_lr *= lr_mult
    
    return lrs, losses

# Learning rate finder helps identify the LR where loss decreases fastest
# Typically use LR slightly before the minimum loss point
```

## Common Misconceptions
- **Myth:** There's one "best" learning rate for all models.
- **Reality:** Optimal learning rate depends on the model architecture, dataset, optimizer, and task. What works for one model may fail for another.

- **Myth:** Higher learning rates always train faster.
- **Reality:** Too high a learning rate causes divergence, wasting all compute. There's an optimal range that balances speed and stability.

- **Myth:** Learning rate doesn't matter much.
- **Reality:** Learning rate is often the most important hyperparameter. Poor choices can completely prevent training or dramatically slow it down.

- **Myth:** You should always use the default learning rate.
- **Reality:** Default learning rates (like Adam's 0.001) are reasonable starting points but often need tuning for specific tasks, especially fine-tuning.

## Related Terms
- [Adam / AdamW (Adaptive Moment Estimation)](../adam-adamw/)
- [Gradient Descent](../gradient-descent/)
- [Hyperparameter](../hyperparameter/)
- [Optimizer](../optimizer/)
- [Training](../training/)

## Sources & Further Reading
- [A disciplined approach to neural network hyper-parameters (Smith)](https://arxiv.org/abs/1506.01186)
- [PyTorch Learning Rate Scheduler Documentation](https://pytorch.org/docs/stable/optim.html#how-to-adjust-learning-rate)
- [Fastai Learning Rate Finder](https://docs.fast.ai/callback.schedule.html)
