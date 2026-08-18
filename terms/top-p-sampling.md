---
title: "Top-p Sampling (Nucleus Sampling)"
category: "Deployment"
related: ["Sampling", "Temperature", "Beam Search", "Inference"]
date_added: 2026-08-19
---

# Top-p Sampling (Nucleus Sampling)

A decoding strategy for language models that dynamically filters the vocabulary to the smallest set of tokens whose cumulative probability exceeds a threshold $p$, balancing output creativity and coherence.

## The Simple Version
A smart way for an AI to choose its next word. Instead of always picking the most likely word, or picking randomly from the whole dictionary, Top-p looks at the top contenders until their combined probability hits a certain percentage (like 90%), and then randomly picks one from just that small, high-quality group.

## Detailed Explanation
In autoregressive generation, pure greedy search leads to repetitive text, while pure random sampling produces gibberish. Top-p sampling solves this by sorting the probability distribution of the next token in descending order. It then accumulates the probabilities until the sum reaches $p$ (e.g., 0.9). The model then samples exclusively from this "nucleus" of likely tokens. Unlike Top-k sampling (which always picks the top $k$ tokens regardless of their actual probabilities), Top-p dynamically adjusts the size of the candidate pool based on the model's confidence.

## Key Characteristics
- **Dynamic Vocabulary Size:** If the model is highly confident, the nucleus is small (few choices). If the model is uncertain, the nucleus expands to include more options.
- **Coherence vs. Creativity:** A lower $p$ (e.g., 0.5) yields more focused, deterministic text. A higher $p$ (e.g., 0.95) yields more diverse, creative text.
- **Industry Standard:** It is the default decoding strategy in almost all modern LLM APIs (OpenAI, Anthropic) alongside Temperature.

## Business Context
- **Controlling AI Output:** Allows developers to fine-tune the "personality" of an AI. A customer service bot might use $p=0.7$ for safe, factual answers, while a creative writing bot might use $p=0.95$.
- **Preventing Repetition:** Crucial for avoiding the "looping" behavior where an AI gets stuck repeating the same phrase endlessly.

## Real-World Analogy
Ordering food at a restaurant. Greedy search is always ordering your absolute favorite dish. Top-p sampling is looking at the menu, picking the top 3 dishes you'd actually be happy eating, and then letting your mood decide which one to order today.

## Code Example

```python
# Conceptual: Top-p Sampling logic
import numpy as np

def top_p_sampling(probabilities, p=0.9):
    # Sort probabilities in descending order
    sorted_indices = np.argsort(probabilities)[::-1]
    sorted_probs = probabilities[sorted_indices]
    
    # Calculate cumulative sum
    cumulative_probs = np.cumsum(sorted_probs)
    
    # Find the cutoff index where cumulative prob exceeds p
    cutoff_index = np.searchsorted(cumulative_probs, p, side='right')
    
    # Mask out probabilities outside the nucleus
    nucleus_probs = sorted_probs[:cutoff_index + 1]
    nucleus_probs /= nucleus_probs.sum() # Renormalize
    
    # Sample from the nucleus
    chosen_index = np.random.choice(len(nucleus_probs), p=nucleus_probs)
    return sorted_indices[chosen_index]
```

## Common Misconceptions
- **Myth:** Top-p and Top-k are the same thing.
- **Reality:** Top-k always selects a fixed number of tokens (e.g., top 50). Top-p selects a variable number of tokens based on their actual probability mass.
- **Myth:** Setting $p=1.0$ is the same as no sampling.
- **Reality:** $p=1.0$ still involves random sampling from the entire distribution; it just doesn't filter the vocabulary at all.

## Related Terms
- [Sampling](../sampling/)
- [Temperature](../temperature/)
- [Inference](../inference/)

## Sources & Further Reading
- [Holtzman, A., et al. The Curious Case of Neural Text Degeneration (Nucleus Sampling). ICLR 2020](https://arxiv.org/abs/1904.09751)
