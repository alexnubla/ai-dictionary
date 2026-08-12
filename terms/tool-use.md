---
title: "Tool Use / Function Calling"
category: "Enterprise AI"
related: ["Agent", "MCP", "Agentic AI", "LLM"]
date_added: 2026-08-12
---

# Tool Use / Function Calling

The capability of language models to generate structured calls to external functions, APIs, or tools — enabling AI systems to interact with databases, execute code, search the web, send emails, and perform actions beyond text generation.

## The Simple Version
Imagine you have a smart assistant who can't directly access your calendar, email, or bank account. But you can give them a phone, a computer, and a credit card, and they can use those tools to get things done.

Tool use (or function calling) is how AI models "use tools." Instead of just generating text, the model can output structured requests like:
- `search_web(query="weather in Tokyo")`
- `send_email(to="boss@company.com", subject="Report", body="...")`
- `query_database(sql="SELECT * FROM users WHERE active=true")`

The model decides when to use a tool, what parameters to pass, and how to incorporate the results into its response.

## Detailed Explanation
Tool use extends LLMs from text generators to action executors. The model is given a set of available tools (functions) with descriptions and parameter schemas, and it can choose to invoke them during generation.

**How It Works:**
1. **Tool Definition:** Developer defines available tools with names, descriptions, and parameter schemas (JSON Schema)
2. **Model Invocation:** User sends a request that requires a tool
3. **Tool Selection:** Model decides which tool to call and generates the parameters
4. **Execution:** System executes the tool (API call, database query, etc.)
5. **Result Integration:** Tool results are fed back to the model
6. **Final Response:** Model generates a response incorporating tool results

**Example Flow:**
```
User: "What's the weather in Paris?"
Model: [decides to call weather tool]
Tool Call: get_weather(city="Paris", unit="celsius")
Tool Result: {"temperature": 18, "condition": "cloudy"}
Model: "The weather in Paris is currently 18°C and cloudy."
```

**Popular Implementations:**
- **OpenAI Function Calling:** GPT-4, GPT-4o support structured tool calls
- **Anthropic Tool Use:** Claude models support tool use via API
- **LangChain Tools:** Framework for defining and using tools
- **MCP (Model Context Protocol):** Standardized protocol for tool integration

**Tool Categories:**
- **Information Retrieval:** Search engines, databases, APIs
- **Code Execution:** Python interpreters, shell commands
- **Communication:** Email, messaging, notifications
- **Data Manipulation:** File operations, data transformations
- **External Services:** Payment processing, booking systems

## Key Characteristics
- **Structured Output:** Tool calls are structured (JSON), not free-form text
- **Developer-Defined:** Tools are defined by developers, not learned by models
- **Composable:** Multiple tools can be chained for complex workflows
- **Safe by Design:** Tools can include validation, permissions, and guardrails

## Business Context
Tool use is foundational for building practical AI applications:

**Enterprise Applications:**
- **Customer Support:** Query order databases, check inventory, process refunds
- **Data Analysis:** Execute SQL queries, generate charts, analyze datasets
- **Automation:** Send emails, create tickets, update CRM records
- **Research:** Search academic databases, retrieve documents, summarize findings
- **Code Development:** Execute code, run tests, debug errors

**Strategic Benefits:**
- **Actionable AI:** Moves beyond information retrieval to task execution
- **Integration:** Connects AI to existing enterprise systems
- **Efficiency:** Automates multi-step workflows
- **Accuracy:** Grounds responses in real data from authoritative sources

**Security Considerations:**
- **Permissions:** Tools should respect user permissions and data access controls
- **Validation:** Input validation to prevent injection attacks
- **Audit Logging:** Track all tool invocations for compliance
- **Human Oversight:** Critical actions may require human approval (HITL)

## Real-World Analogy
A personal assistant with access to your phone, computer, and credit card. You say "Book me a flight to London." The assistant uses the airline website (tool) to search for flights, your calendar (tool) to check availability, and your credit card (tool) to make the purchase. Each tool is a specific capability the assistant can invoke to complete the task.

## Code Example

```python
# Tool use with OpenAI function calling
from openai import OpenAI
import json

client = OpenAI()

# Define available tools
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "Get current weather for a location",
            "parameters": {
                "type": "object",
                "properties": {
                    "location": {"type": "string", "description": "City name"},
                    "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
                },
                "required": ["location"]
            }
        }
    }
]

# User request
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "What's the weather in Tokyo?"}],
    tools=tools,
    tool_choice="auto"
)

# Check if model wants to call a tool
message = response.choices[0].message
if message.tool_calls:
    tool_call = message.tool_calls[0]
    function_name = tool_call.function.name
    arguments = json.loads(tool_call.function.arguments)
    
    print(f"Model wants to call: {function_name}")
    print(f"Arguments: {arguments}")
    # Output: 
    # Model wants to call: get_weather
    # Arguments: {"location": "Tokyo", "unit": "celsius"}
    
    # In a real application, you would:
    # 1. Execute the function
    # 2. Send the result back to the model
    # 3. Get the final response
```

## Common Misconceptions
- **Myth:** Tool use means the model can do anything.
- **Reality:** Models can only use tools explicitly defined by developers. They can't invent new tools or access systems without permission.

- **Myth:** Tool use is the same as plugins.
- **Reality:** Plugins are a specific implementation (e.g., ChatGPT plugins). Tool use is the general capability; plugins are one way to expose tools to models.

- **Myth:** Tool use is fully autonomous.
- **Reality:** Most implementations require human oversight, especially for actions that modify external systems. Tools should include validation and approval workflows.

## Related Terms
- [Agent](../agent/)
- [MCP](../mcp/)
- [Agentic AI](../agentic-ai/)
- [LLM](../llm/)

## Sources & Further Reading
- [OpenAI Function Calling Guide](https://platform.openai.com/docs/guides/function-calling)
- [Anthropic Tool Use Documentation](https://docs.anthropic.com/claude/docs/tool-use)
- [LangChain Tools Documentation](https://python.langchain.com/docs/modules/tools/)
