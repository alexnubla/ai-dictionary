---
title: "Prompt Obfuscation (Encoding & Transliteration)"
category: "AI Security & Adversarial ML"
related:
  - "Token Breaking"
  - "ASCII Smuggling"
  - "Jailbreak"
date_added: 2026-08-24
---

# Prompt Obfuscation (Encoding & Transliteration)

The practice of concealing malicious prompts by converting them into alternative formats, such as Base64, ROT13, or transliterating words into different alphabets (e.g., Cyrillic), to bypass keyword-based safety filters.

## The Simple Version
Writing a harmful prompt in a secret code (like Base64) or a different alphabet (like Russian or Greek) to sneak it past the AI's keyword blockers.

## Detailed Explanation
Prompt Obfuscation encompasses techniques that alter the surface-level representation of a prompt without changing its underlying semantic meaning to the LLM. **Encoding** involves converting text into formats like Base64, hexadecimal, or Morse code. **Transliteration** involves writing words using the characters of a different alphabet (e.g., writing English words using Cyrillic characters that look similar, known as homoglyphs). Because modern LLMs are trained on highly multilingual and diverse datasets, they can natively decode and understand these obfuscated inputs, while simple, English-centric string-matching safety filters fail to detect the threat.

## Security Context
Obfuscation is a standard tactic in the red teamer's playbook. It proves that security filters must be semantically aware and multilingual. Defending against this requires input normalization pipelines that decode common encodings and map homoglyphs back to their standard Latin equivalents *before* the prompt is evaluated by the safety classifier.

## Real-World Example
An attacker wants to ask a prohibited question but knows the word is blocked. They transliterate the word into Cyrillic characters that visually resemble the English letters, or they encode the entire harmful prompt in Base64. The LLM decodes the Base64 or reads the Cyrillic, understands the request perfectly, and complies, while the regex filter sees only random-looking strings.

## Common Misconceptions
- **Myth:** LLMs only understand English, so foreign alphabets will confuse them.
  **Reality:** State-of-the-art LLMs are trained on massive multilingual corpora. They are highly proficient at understanding, translating, and reasoning across dozens of languages and scripts.
- **Myth:** Obfuscation is hard to do.
  **Reality:** Attackers can use other AI models to automatically generate obfuscated versions of their prompts, creating an automated pipeline for bypassing filters.

## Related Terms
- [Token Breaking](../token-breaking/)
- [ASCII Smuggling](../ascii-smuggling/)
- [Multimodal](../multimodal/)

## Sources & Further Reading
- **arXiv:** "Multilingual Jailbreak Challenges in Large Language Models"
- **OWASP:** Top 10 for Large Language Model Applications
