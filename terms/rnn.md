---
title: "RNN (Recurrent Neural Network)"
category: "Architecture"
related: ["LSTM", "GRU", "Sequence Modeling", "Time Series", "Transformer"]
date_added: 2026-08-12
---

# RNN (Recurrent Neural Network)

A type of neural network designed to process sequential data by maintaining an internal "memory" of previous inputs, allowing it to handle tasks where context and order matter, such as language, time series, and speech.

## The Simple Version
Imagine you're reading a book aloud to a friend. As you read each word, you don't just think about that word in isolation — you remember all the words that came before it. That's why you can understand pronouns like "he" or "she," and why you can follow a story that unfolds over many pages.

An RNN works similarly. When it processes information, it doesn't just look at the current input — it also remembers what it saw before. It has a kind of "memory" that carries forward from one step to the next.

This is really useful for things that happen in sequence, like sentences in a sentence, notes in a song, or stock prices over time. The RNN can use what it learned earlier to help understand what's happening now.

But there's a catch: just like you might forget the beginning of a very long story, RNNs can struggle to remember things from far back in a sequence. That's why newer versions like LSTM and GRU were invented — they have better "long-term memory."

## Detailed Explanation
RNNs process sequential data by maintaining a hidden state that captures information about previous time steps. At each step, the network takes both the current input and the previous hidden state as inputs, producing a new hidden state and an output.

**How it works:**
1. **Input Sequence:** x₁, x₂, x₃, ..., xₜ
2. **Hidden State:** hₜ = f(Wₕₕ · hₜ₋₁ + Wₓₕ · xₜ)
3. **Output:** yₜ = g(Wₕᵧ · hₜ)

The hidden state acts as the network's memory, allowing information to persist across time steps.

**Types of RNNs:**
- **Vanilla RNN:** Basic recurrent structure
- **LSTM (Long Short-Term Memory):** Uses gates to control information flow, solving vanishing gradient problem
- **GRU (Gated Recurrent Unit):** Simplified version of LSTM with fewer parameters
- **Bidirectional RNN:** Processes sequence in both forward and backward directions
- **Deep RNN:** Multiple layers of recurrent units

**Common applications:**
- **Language Modeling:** Predicting next word in a sequence
- **Machine Translation:** Converting text from one language to another
- **Speech Recognition:** Converting audio to text
- **Time Series Forecasting:** Predicting future values based on past data
- **Sentiment Analysis:** Understanding emotion in text

**Limitations:**
- **Vanishing/Exploding Gradients:** Difficulty learning long-range dependencies
- **Sequential Processing:** Cannot parallelize training (slow for long sequences)
- **Limited Context:** Struggles with very long sequences
- **Largely Superseded:** Transformers now dominate most sequence tasks

## Key Characteristics
- **Sequential Processing:** Handles data in order, maintaining temporal dependencies
- **Hidden State Memory:** Carries information from previous time steps
- **Variable Length Input:** Can process sequences of different lengths
- **Parameter Sharing:** Same weights used across all time steps
- **Context Awareness:** Current output depends on entire history of inputs

## Business Context
While Transformers have largely replaced RNNs for many NLP tasks, RNNs and their variants (LSTM, GRU) remain relevant in specific enterprise scenarios:

**Where RNNs still excel:**
- **Time Series Forecasting:** Stock prices, weather, demand prediction
- **Real-time Processing:** Streaming data where latency matters
- **Edge Devices:** Smaller models that run on limited hardware
- **Legacy Systems:** Existing RNN-based systems that work well
- **Specific Domains:** Some audio and signal processing tasks

**Business considerations:**
- **Migration Path:** Many organizations are migrating from RNNs to Transformers
- **Cost-Benefit:** RNNs may be sufficient for simpler tasks, avoiding Transformer complexity
- **Expertise Availability:** More data scientists have RNN experience than Transformer expertise
- **Infrastructure:** RNNs may work better with existing CPU-based infrastructure

**When to consider RNNs vs. Transformers:**
- **RNNs:** Real-time processing, edge deployment, simple sequential tasks, limited compute
- **Transformers:** Complex language tasks, long sequences, parallel training, state-of-the-art performance

## Real-World Analogy
Following a recipe while cooking. You don't just look at the current step — you remember what you did before. If step 5 says "add the mixture from step 3," you need to remember what you did in step 3. Your memory of previous steps helps you understand and execute the current step correctly.

## Code Example

{% raw %}
<div markdown="1">
{% highlight python %}
# Simple RNN for sequence classification using PyTorch
import torch
import torch.nn as nn

class SimpleRNN(nn.Module):
    def __init__(self, input_size, hidden_size, num_layers, num_classes):
        super(SimpleRNN, self).__init__()
        self.hidden_size = hidden_size
        self.num_layers = num_layers
        
        # RNN layer
        self.rnn = nn.RNN(
            input_size=input_size,
            hidden_size=hidden_size,
            num_layers=num_layers,
            batch_first=True
        )
        
        # Output layer
        self.fc = nn.Linear(hidden_size, num_classes)
        
    def forward(self, x):
        # Initialize hidden state with zeros
        batch_size = x.size(0)
        h0 = torch.zeros(self.num_layers, batch_size, self.hidden_size)
        
        # Forward pass through RNN
        out, _ = self.rnn(x, h0)
        
        # Get output from last time step
        out = self.fc(out[:, -1, :])
        
        return out

# Create model with sample parameters
model = SimpleRNN(
    input_size=10,      # Number of input features
    hidden_size=64,     # Number of hidden units
    num_layers=2,       # Number of RNN layers
    num_classes=5       # Number of output classes
)

# Test with sample input
batch_size = 32
sequence_length = 20
input_features = 10

sample_input = torch.randn(batch_size, sequence_length, input_features)
output = model(sample_input)

print("Input shape:", sample_input.shape)
print("Output shape:", output.shape)
print("Output:", output[0])  # First sample's predictions
{% endhighlight %}
</div>
{% endraw %}
