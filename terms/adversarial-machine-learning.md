---
title: "Adversarial Machine Learning"
category: "AI Security & Adversarial ML"
related:
  - "Prompt Injection"
  - "Data Poisoning"
  - "Model Evasion"
  - "Red Teaming"
date_added: 2026-08-22
---

# Adversarial Machine Learning

The field of study focused on identifying, exploiting, and defending against vulnerabilities in machine learning models through carefully crafted malicious inputs.

## The Simple Version
The study of how to "trick" AI models with sneaky inputs, and how to build defenses so the AI can't be fooled.

## Detailed Explanation
Adversarial Machine Learning (AML) is a subfield of AI security that examines the vulnerabilities of ML models to adversarial examples—inputs intentionally designed to cause the model to make mistakes. Attacks are generally categorized into three types: **Evasion Attacks** (manipulating inputs at inference time to bypass classifiers, e.g., adversarial patches on stop signs), **Poisoning Attacks** (corrupting the training data to embed backdoors or degrade performance), and **Model Extraction** (stealing a model's architecture or training data via repeated queries). Defending against AML requires techniques like adversarial training, input sanitization, and robust architecture design.

## Security Context
As AI is deployed in high-stakes environments (autonomous vehicles, fraud detection, medical diagnosis), AML transitions from a theoretical academic concern to a critical operational risk. Organizations must treat ML models as attack surfaces, subjecting them to the same rigorous penetration testing and threat modeling as traditional software.

## Real-World Example
A researcher places a specially designed, seemingly random sticker on a stop sign. To a human, it looks like graffiti, but the autonomous vehicle's computer vision model misclassifies the stop sign as a "speed limit 45" sign with 99% confidence, demonstrating a physical-world evasion attack.

## Common Misconceptions
- **Myth:** Adversarial attacks only work in digital environments (like images).
  **Reality:** Physical-world adversarial attacks are highly effective and have been demonstrated against facial recognition systems, LiDAR, and audio classifiers.
3. **Myth:** Making a model larger automatically makes it more robust to adversarial attacks.
  **Reality:** Larger models can be more susceptible to sophisticated attacks like prompt injection or jailbreaking, as their vast knowledge base provides more avenues for exploitation.

## Related Terms
- [Prompt Injection](../prompt-injection/)
- [Red Teaming](../red-teaming/)
- [Data Poisoning](../data-poisoning/)

## Sources & Further Reading
- **NIST:** Adversarial Machine Learning: A Taxonomy and Terminology of Attacks and Mitigations
- **MITRE:** ATLAS (Adversarial Threat Landscape for Artificial-Intelligence Systems)
