---
title: "Parameter"
category: "Architecture"
related: ["Model", "Hyperparameter", "Training", "Neural Network"]
date_added: 2026-08-13
---

# Parameter

An internal variable within a machine learning model that is learned automatically from training data — the "knowledge" the model acquires, typically represented as weights and biases in a neural network.

## The Simple Version
Imagine a giant sound mixing board with thousands of knobs. Each knob controls how much of a specific sound (like bass, treble, or vocals) gets through. 

When a sound engineer mixes a song, they turn the knobs until the music sounds perfect. In an AI model, the **parameters** are those knobs. During training, the AI automatically turns millions or billions of these "knobs" (parameters) to the perfect positions so that it can accurately recognize patterns, translate languages, or generate text. The final position of every single knob is the model's "memory" or "knowledge."

## Detailed Explanation
In the context of neural networks, parameters are the numerical values that define the model's behavior. They are the only part of the model that changes during training.

**Types of Parameters:**
1. **Weights:** Determine the strength of the connection between neurons. A high weight means the input is very important; a low weight means it's negligible.
2. **Biases:** An offset added to the weighted sum, allowing the model to shift the activation function to better fit the data.

**Scale of Parameters:**
- **Small Models:** Millions of parameters (e.g., MobileNet for phones).
- **Medium Models:** Billions of parameters (e.g., Llama 3 8B).
- **Frontier Models:** Trillions of parameters (e.g., rumored GPT-4, Llama 3 405B).

**Parameters vs. Hyperparameters:**
This is a critical distinction:
- **Parameters:** Learned *during* training from the data. (e.g., weights).
- **Hyperparameters:** Set *before* training by the engineer. (e.g., learning rate, number of layers).

**How Parameters Store Knowledge:**
Parameters don't store facts like a database. Instead, they store statistical relationships. For example, a parameter might encode the strong association between the words "peanut butter" and "jelly," allowing the model to predict "jelly" when it sees "peanut butter."

## Key Characteristics
- **Learned, Not Programmed:** Developers don't write parameters; the training algorithm calculates them.
- **Numerical:** Typically stored as floating-point numbers (FP32, FP16, INT8).
- **Volatile:** Can be forgotten or overwritten if the model is retrained (Catastrophic Forgetting).
- **Resource-Intensive:** Storing billions of parameters requires significant memory (VRAM).

## Business Context
The number of parameters is often used as a proxy for a model's capability, though it's not the only factor:

**Strategic Implications:**
- **Compute Costs:** More parameters = more compute needed for training and inference.
- **Licensing & Valuation:** Models with billions of parameters are valuable assets.
- **Hardware Requirements:** Deploying a 70B parameter model requires significantly more GPU memory than a 7B model.
- **Quantization:** Reducing parameter precision (e.g., from 16-bit to 4-bit) is a key strategy for reducing costs.

## Real-World Analogy
A musician's muscle memory. When a pianist learns a song, they don't memorize every single note consciously. Their fingers "learn" the movements through practice. The muscle memory is like the parameters — it's the physical embodiment of the learned skill.

## Code Example

```python
# Inspecting parameters in a PyTorch model
import torch
import torch.nn as nn

# Define a tiny neural network
class TinyNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(2, 3) # 2 inputs, 3 neurons
        self.fc2 = nn.Linear(3, 1) # 3 inputs, 1 output

    def forward(self, x):
        x = torch.relu(self.fc1(x))
        return self.fc2(x)

model = TinyNet()

# Count parameters
total_params = sum(p.numel() for p in model.parameters())
trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)

print(f"Total parameters: {total_params}")
# fc1: (2*3 weights) + 3 biases = 9
# fc2: (3*1 weights) + 1 bias = 4
# Total = 13

# Look at the actual parameter values (the "learned knowledge")
for name, param in model.named_parameters():
    print(f"{name}: {param.data}")
```

## Common Misconceptions
- **Myth:** More parameters always mean a smarter model.
- **Reality:** Architecture, data quality, and training methodology matter just as much. A well-trained 7B model can outperform a poorly-trained 70B model.
- **Myth:** Parameters are the same as hyperparameters.
- **Reality:** Parameters are learned from data; hyperparameters are set by humans before training.
- **Myth:** Parameters store facts like a database.
- **Reality:** Parameters store statistical patterns. This is why models can "hallucinate" — they are predicting likely patterns, not retrieving verified facts.

## Related Terms
- [Model](../model/)
- [Hyperparameter](../hyperparameter/)
- [Training](../training/)
- [Neural Network](../neural-network/)

## Sources & Further Reading
- [Deep Learning Book: Parameters and Hyperparameters](https://www.deeplearningbook.org/)
- [Hugging Face: Model Parameters](https://huggingface.co/docs/transformers/main_classes/model)
