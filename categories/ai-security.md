---
title: "AI Security & Adversarial ML"
description: "AI security vulnerabilities, adversarial attacks, and red teaming methodologies"
---

# 🔒 AI Security & Adversarial ML

AI security vulnerabilities, adversarial attacks, and red teaming methodologies used to identify, exploit, and defend against threats in machine learning systems.

## What is AI Security & Adversarial ML?

AI Security and Adversarial Machine Learning (AML) focus on the unique vulnerabilities of AI systems. Unlike traditional software security, AI models can be manipulated through their inputs, training data, or inference processes without altering their underlying code.

This category encompasses:
- **Prompt Injection & Jailbreaking:** Manipulating LLM inputs to bypass safety guardrails and ethical constraints.
- **Adversarial Examples:** Crafting inputs to deceive computer vision or classification models.
- **Data Poisoning:** Corrupting training data to compromise model integrity.
- **Red Teaming:** Proactively testing AI systems to discover and patch security flaws before deployment.

## Terms in This Category

| Term | Description |
|------|-------------|
| [Adversarial Machine Learning](/ai-dictionary/terms/adversarial-machine-learning/) | The study of identifying and defending against vulnerabilities in ML models through carefully crafted malicious inputs. |
| [ASCII Smuggling](/ai-dictionary/terms/ascii-smuggling/) | An obfuscation technique hiding malicious prompts within ASCII art or invisible Unicode characters to bypass human moderators and basic filters. |
| [ChatInject](/ai-dictionary/terms/chatinject/) | Attacks targeting the UI/UX of chat applications to manipulate the interface, exfiltrate data, or trigger unintended actions in connected systems. |
| [DAN (Do Anything Now) Jailbreak](/ai-dictionary/terms/dan-jailbreak/) | A foundational persona-adoption exploit instructing an AI to pretend it is an entity with no rules, ethical constraints, or safety filters. |
| [Deep Prompt Injection](/ai-dictionary/terms/deep-prompt-injection/) | Hiding adversarial instructions deep within a massive context window to bypass initial safety filters while still influencing the model's output. |
| [Framing Injection](/ai-dictionary/terms/framing-injection/) | Bypassing safety guardrails by wrapping a harmful request inside a seemingly benign, hypothetical, or academic context. |
| [Indirect Prompt Injection](/ai-dictionary/terms/indirect-prompt-injection/) | Hiding malicious instructions within external, untrusted data sources (like websites or PDFs) that an AI system processes. |
| [Just-In-Time (JIT) Access](/ai-dictionary/terms/just-in-time-access/) | A security model granting AI agents temporary, highly specific permissions to execute a tool or access data only for the exact duration of a task. |
| [LLM Code Injection](/ai-dictionary/terms/llm-code-injection/) | A vulnerability where an attacker manipulates an AI model with code interpreter capabilities into writing and executing malicious code. |
| [LLM Hijacking](/ai-dictionary/terms/llm-hijacking/) | The successful outcome of an adversarial attack where an attacker takes unauthorized control of an LLM's session, context, or connected tools. |
| [Prompt Obfuscation (Encoding & Transliteration)](/ai-dictionary/terms/prompt-obfuscation/) | Concealing malicious prompts by converting them into alternative formats (e.g., Base64) or different alphabets to bypass keyword filters. |
| [TAP (Tree of Attacks with Pruning)](/ai-dictionary/terms/tap-tree-of-attacks/) | An automated black-box jailbreak algorithm using an attacker LLM to iteratively generate and refine a tree of candidate attack prompts. |
| [Token Breaking](/ai-dictionary/terms/token-breaking/) | Evading token-level safety classifiers by deliberately splitting a forbidden keyword across multiple tokens using spaces or special characters. |

## Why AI Security & Adversarial ML Matters

As AI systems are integrated into critical enterprise workflows, customer-facing applications, and autonomous agents, they become prime targets for malicious actors. Understanding AI security is crucial for:
- **Protecting Brand Reputation:** Preventing jailbreaks that force AI to generate toxic, biased, or harmful content.
- **Securing Data Pipelines:** Defending against indirect prompt injection in RAG systems that could lead to data exfiltration.
- **Ensuring Model Integrity:** Preventing data poisoning and adversarial evasion that could cause catastrophic failures in production.
- **Regulatory Compliance:** Meeting emerging requirements for AI red teaming and safety testing under frameworks like the EU AI Act.

Proactive adversarial testing and robust guardrails are no longer optional; they are essential for deploying AI safely at scale.

---
*[← Back to Home]({{ site.baseurl }}/)* | *[View All Terms]({{ site.baseurl }}/terms/)*
