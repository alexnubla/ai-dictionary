---
title: "TAP (Tree of Attacks with Pruning)"
category: "AI Security & Adversarial ML"
related:
  - "Red Teaming"
  - "Jailbreak"
  - "Automated Red Teaming"
  - "Adversarial Machine Learning"
date_added: 2026-08-24
---

# TAP (Tree of Attacks with Pruning)

An advanced, automated black-box jailbreak algorithm that uses an attacker LLM to iteratively generate, evaluate, and refine a tree of candidate attack prompts until a successful bypass of the target model's safety guardrails is found.

## The Simple Version
An automated AI red-teaming tool that acts like a persistent hacker, generating and refining attack prompts over multiple steps until it successfully breaks the target AI's safety rules.

## Detailed Explanation
Tree of Attacks with Pruning (TAP) is a sophisticated, automated method for discovering jailbreaks without requiring access to the target model's internal weights or gradients (black-box). It works by employing an "attacker" LLM to generate a tree of candidate prompts. These prompts are sent to the target model. A separate "judge" LLM evaluates the target's response to determine if the attack was successful. Successful branches are kept and iteratively refined (mutated) to become more effective, while unsuccessful branches are "pruned" (discarded). This evolutionary process efficiently navigates the vast space of possible prompts to find novel, complex jailbreaks that human red teamers might miss.

## Security Context
TAP represents a paradigm shift in AI red teaming, moving from manual, human-driven prompt crafting to scalable, automated adversarial search. It highlights the vulnerability of models to persistent, iterative probing. Defending against TAP requires robust, dynamic guardrails that can detect and block iterative probing patterns, rate limiting, and continuous adversarial training using automated attack generators.

## Real-World Example
A security team wants to test if their customer service bot can be tricked into revealing PII. They run TAP, specifying the goal. The attacker LLM automatically generates hundreds of variations of framing injections and indirect prompts, testing them against the bot. Within minutes, TAP discovers a highly specific, multi-step conversational path that successfully extracts the PII, which the team can then patch.

## Common Misconceptions
- **Myth:** TAP requires white-box access (knowing the model's weights).
  **Reality:** TAP is specifically designed as a black-box attack, making it highly relevant for testing proprietary, API-only models like GPT-4 or Claude.
- **Myth:** Automated red teaming replaces human red teamers.
  **Reality:** TAP is a tool *for* human red teamers. It automates the brute-force search, but humans are still required to define the threat models, interpret the results, and design the mitigation strategies.

## Related Terms
- [Red Teaming](../red-teaming/)
- [Jailbreak](../jailbreak/)
- [Adversarial Machine Learning](../adversarial-machine-learning/)

## Sources & Further Reading
- **arXiv:** "Tree of Attacks: Jailbreaking Black-Box LLMs Automatically" (Mehrotra et al., 2023)
- **Microsoft:** "Automated Red Teaming with Generative AI"
