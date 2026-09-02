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

# LLM Hijacking (LLMjacking)

The successful outcome of an adversarial attack where an attacker takes unauthorized control of an LLM's session, context, or connected tools to perform actions on their behalf, including illicit resource consumption.

## The Simple Version
When a hacker successfully tricks an AI into taking over a user's session or tools, essentially "steering the wheel" of the AI to do the hacker's bidding—whether that means stealing data or racking up massive cloud computing bills.

## Detailed Explanation
LLM Hijacking refers to the scenario where an adversarial input successfully compromises an AI agent's operational integrity. Unlike a simple jailbreak (which just forces the model to output restricted text), hijacking implies the attacker has gained functional control. This often occurs in agentic systems where the LLM has access to external tools, APIs, or user-specific data. Once hijacked, the LLM may be coerced into exfiltrating sensitive data, executing unauthorized transactions, modifying system configurations, or illicitly consuming compute resources (a specific variant known as **LLMjacking**), all while appearing to operate normally to the end user.

## Key Characteristics
- **Functional Control:** The attacker doesn't just get a bad text output; they commandeer the AI's actions (e.g., sending emails, querying databases, executing code).
- **Resource & Compute Abuse (LLMjacking):** Attackers may hijack the session not just to steal data, but to illicitly invoke expensive LLM APIs or provision GPU instances on the victim's cloud account, racking up massive financial costs (the AI equivalent of cryptojacking).
- **Stealthy Execution:** The hijacked AI often continues to interact with the legitimate user, masking the malicious activity as normal, helpful operations.
- **Tool Exploitation:** Heavily relies on the AI's "Tool Use" or "Function Calling" capabilities to bridge the gap between text generation and real-world action.
- **Session Persistence:** The compromise often persists across the entire conversation thread until the session is explicitly terminated or reset by the system.

## Business Context
For enterprises, LLM Hijacking represents a severe escalation from simple data leakage to active system and financial compromise. If an internal AI assistant has access to CRM data, internal wikis, or financial APIs, a successful hijack can lead to unauthorized data exfiltration or fraudulent transactions. Furthermore, LLMjacking poses a direct financial risk: attackers can hijack an agent to spin up expensive GPU instances or make thousands of LLM API calls, resulting in massive, unexpected cloud bills before the abuse is detected. Mitigating this requires strict Principle of Least Privilege (PoLP), human-in-the-loop (HITL) approvals for high-risk actions, and robust AI Gateway monitoring to detect anomalous tool-use or billing patterns.

## Real-World Example
In a documented 2026 cloud intrusion (Sysdig Threat Research), an attacker gained initial access via exposed S3 credentials. They hijacked the environment by injecting malicious code into a Lambda function, and then used the compromised identity to illicitly invoke 9 different Amazon Bedrock AI models 13 times. The attacker also attempted to provision expensive `p4d.24xlarge` GPU instances and deployed a publicly accessible JupyterLab server as a persistent backdoor. This demonstrated how hijacked AI resources can be weaponized for both data theft and massive financial damage.

## Common Misconceptions
- **Myth:** LLM Hijacking and Prompt Injection are the exact same thing.
  **Reality:** Prompt injection is the *attack vector* (the weapon). LLM hijacking is the *successful compromise* (the breach). Not all prompt injections result in a hijack.
- **Myth:** LLMjacking is just about stealing API keys.
  **Reality:** It is about actively consuming the victim's compute resources. The attacker uses the victim's own cloud environment and permissions to run their own AI workloads, leaving the victim with the bill.
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
- **Sysdig Threat Research:** [AI-Assisted Cloud Intrusion Achieves Admin Access in 8 Minutes](https://www.sysdig.com/blog/ai-assisted-cloud-intrusion-achieves-admin-access-in-8-minutes)
- **Microsoft:** [Microsoft AI Red Team: Building the Future of Safer AI](https://www.microsoft.com/en-us/security/blog/2023/08/07/microsoft-ai-red-team-building-future-of-safer-ai/)
