---
title: "Beam Search"
category: "Deployment"
related: ["Natural Language Processing (NLP)", "Transformer", "Decoding Strategy", "Greedy Search"]
date_added: 2026-08-18
---

# Beam Search

A heuristic search algorithm used in sequence generation tasks (like machine translation or text generation) that explores multiple possible sequences simultaneously, keeping only the top 'k' most probable candidates at each step.

## The Simple Version
A smarter way for AI to write sentences. Instead of just picking the single most likely next word (which can lead to repetitive, boring text), it keeps track of the top 5 (or 10) best partial sentences at every step, eventually choosing the best complete sentence.

## Detailed Explanation
In autoregressive models, generating text word-by-word using Greedy Search often leads to suboptimal global sequences. Beam Search maintains a "beam width" (k). At each time step, it expands all current hypotheses by the vocabulary size, calculates the cumulative log probabilities, and prunes the list back down to the top k hypotheses. This balances computational cost with sequence quality.

## Key Characteristics
- **Beam Width (k):** The hyperparameter controlling the trade-off. k=1 is Greedy Search; k=infinity is exhaustive search (impossible). Typical values are 4 to 10.
- **Length Penalty:** Raw beam search favors shorter sequences. A length penalty is applied to the scoring function to encourage natural-length outputs.
- **Diversity Issues:** Standard beam search can produce repetitive or generic text; techniques like diverse beam search are used to mitigate this.

## Business Context
- **Machine Translation:** The industry standard for high-quality translation APIs (Google Translate, DeepL) before the advent of advanced sampling techniques.
- **Code Generation:** Used in AI coding assistants to ensure the generated code blocks are syntactically valid and logically coherent.

## Real-World Analogy
Navigating a maze. Greedy search always turns toward the exit, even if it's a dead end. Beam search sends 5 scouts down the 5 most promising paths at every intersection, ensuring you don't miss the optimal route just because the first turn looked slightly better.

## Code Example

```python
# Conceptual: Beam Search logic (simplified)
def beam_search(initial_token, beam_width=3, max_length=10):
    # Start with the initial token and a probability of 1.0
    hypotheses = [( [initial_token], 1.0 )]
    
    for _ in range(max_length):
        all_candidates = []
        for seq, score in hypotheses:
            # Get probabilities for next tokens from the model
            next_tokens = get_model_probabilities(seq[-1]) 
            for token, prob in next_tokens:
                all_candidates.append((seq + [token], score * prob))
        
        # Sort by cumulative probability and keep top k
        all_candidates.sort(key=lambda x: x[1], reverse=True)
        hypotheses = all_candidates[:beam_width]
        
    return hypotheses[0][0] # Return the highest probability sequence
```

## Common Misconceptions
- **Myth:** Beam search always produces the most natural-sounding text.
- **Reality:** It often produces repetitive, generic, or "safe" text. Modern LLMs often use Top-p (nucleus) sampling for more creative outputs.
- **Myth:** A larger beam width always equals better results.
- **Reality:** Beyond a certain point, larger beams yield diminishing returns and drastically increase computation time.

## Related Terms
- [Autoregressive](../autoregressive/)
- [Greedy Search](../greedy-search/)
- [Top-p Sampling (Nucleus Sampling)](../top-p-sampling/)

## Sources & Further Reading
- [Freitag, M., & Al-Onaizan, Y. Beam Search Strategies for Neural Machine Translation. ACL 2017](https://aclanthology.org/)
