---
title: "LLM Hijacking"
category: "AI Security & Adversarial ML"
related:
  - "Prompt Injection"
  - "Indirect Prompt Injection"
  - "ChatInject"
  - "Tool Use / Function Calling"
  - "AI Gateway"
date_added: 2026-08-31
---

# LLM Hijacking

The successful outcome of an adversarial attack where an attacker takes unauthorized control of an LLM's session, context, or connected tools to perform actions on their behalf.

## The Simple Version
When a hacker successfully tricks an AI into taking over a user's session or tools, essentially "steering the wheel" of the AI to do the hacker's bidding instead of the user's.

## Detailed Explanation
LLM Hijacking (colloquially known as "LLMjacking") refers to the scenario where an adversarial input successfully compromises an AI agent's operational integrity. Unlike a simple jailbreak (which just forces the model to output restricted text), hijacking implies the attacker has gained functional control. This often occurs in agentic systems where the LLM has access to external tools, APIs, or user-specific data. Once hijacked, the LLM may be coerced into exfiltrating sensitive data, executing unauthorized transactions, or modifying system configurations, all while appearing to operate normally to the end user.

## Key Characteristics
- **Functional Control:** The attacker doesn't just get a bad text output; they commandeer the AI's actions (e.g., sending emails, querying databases, executing code).
- **Stealthy Execution:** The hijacked AI often continues to interact with the legitimate user, masking the malicious activity as normal, helpful operations.
- **Tool Exploitation:** Heavily relies on the AI's "Tool Use" or "Function Calling" capabilities to bridge the gap between text generation and real-world action.
- **Session Persistence:** The compromise often persists across the entire conversation thread until the session is explicitly terminated or reset by the system.

## Business Context
For enterprises, LLM Hijacking represents a severe escalation from simple data leakage to active system compromise. If an internal AI assistant has access to CRM data, internal wikis, or financial APIs, a successful hijack can lead to unauthorized data exfiltration, fraudulent transactions, or severe compliance violations (e.g., GDPR, HIPAA, SOC2). Mitigating this business risk requires strict Principle of Least Privilege (PoLP) for AI tool access, human-in-the-loop (HITL) approvals for high-risk actions, and robust AI Gateway monitoring to detect anomalous tool-use patterns.

## Real-World Example
An employee uses an AI assistant connected to their company's CRM to summarize their daily schedule. An attacker sends the employee a seemingly innocent calendar invite containing hidden indirect prompt injection instructions. When the AI processes the invite, it is hijacked: it quietly copies the employee's entire client list and emails it to an external address, all while the employee just sees a normal, helpful calendar summary on their screen.

## Common Misconceptions
- **Myth:** LLM Hijacking and Prompt Injection are the exact same thing.
  **Reality:** Prompt injection is the *attack vector* (the weapon). LLM hijacking is the *successful compromise* (the breach). Not all prompt injections result in a hijack.
- **Myth:** Only fully autonomous agents can be hijacked.
  **Reality:** Even standard chatbots can be hijacked if the attacker uses the compromised session to trick the user into revealing sensitive information (a form of AI-mediated social engineering).

## Related Terms
- [Prompt Injection](../prompt-injection/)
- [Indirect Prompt Injection](../indirect-prompt-injection/)
- [ChatInject](../chatinject/)
- [Tool Use / Function Calling](../tool-use/)
- [AI Gateway](../ai-gateway/)

## Sources & Further Reading
- **OWASP:** [Top 10 for Large Language Model Applications (LLM01: Prompt Injection)](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- **Microsoft:** [Microsoft AI Red Team: Building the Future of Safer AI](https://www.microsoft.com/en-us/security/blog/2023/08/07/microsoft-ai-red-team-building-future-of-safer-ai/)
