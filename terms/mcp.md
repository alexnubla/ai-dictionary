---
title: "MCP (Model Context Protocol)"
category: "Deployment"
related: ["Agentic AI", "API", "Tool Use", "RAG"]
date_added: 2026-08-12
---

# MCP (Model Context Protocol)

An open standard protocol that provides a universal, secure way for Large Language Models (LLMs) to connect to and interact with external data sources, tools, and systems, eliminating the need for custom, point-to-point integrations.

## The Simple Version
Imagine every time you bought a new appliance, it came with a completely unique, proprietary plug that didn't fit any wall outlet in your house. You'd need a different adapter for the fridge, the TV, and the toaster. 

Before MCP, connecting an AI to a database, a calendar, or a code repository required building a custom, fragile integration for each one. MCP is like inventing the "USB-C" standard for AI. It provides a single, universal way for any AI model to safely plug into any tool or data source, making connections plug-and-play.

## Detailed Explanation
Introduced by Anthropic in late 2024, the Model Context Protocol (MCP) is an open standard designed to solve the "N x M" integration problem in AI applications (where N models need to connect to M tools, requiring N*M custom integrations).

**How it works:**
1. **MCP Host:** The AI application or IDE (e.g., Claude Desktop, Cursor, a custom enterprise app).
2. **MCP Client:** The protocol handler within the host that manages the connection.
3. **MCP Server:** A lightweight program that exposes a specific resource or tool (e.g., a local file system, a PostgreSQL database, a GitHub repository, or a Slack workspace) using the standardized MCP format.

**Core Capabilities:**
- **Resources:** Exposing read-only data (e.g., "read this file", "query this database").
- **Tools:** Exposing executable actions (e.g., "send an email", "run a SQL query", "create a Jira ticket").
- **Prompts:** Standardized, reusable prompt templates that the server can provide to the host.

**Security Model:**
MCP is designed with security in mind. The host application explicitly controls which servers are connected and requires user approval before the AI can execute any tool that modifies external state (like sending a message or deleting a file).

## Key Characteristics
- **Open Standard:** Not owned by a single vendor; designed for broad industry adoption.
- **Decoupled Architecture:** Separates the AI model from the data/tool logic, allowing independent updates.
- **Local or Remote:** MCP servers can run locally on a user's machine (for privacy) or remotely in the cloud.
- **Language Agnostic:** SDKs are available in Python, TypeScript, and other languages to build MCP servers.

## Business Context
MCP is poised to dramatically accelerate enterprise AI adoption by reducing integration friction:
- **Reduced Development Time:** Engineers build an MCP server once, and it works with any MCP-compatible AI client.
- **Enhanced Security:** IT teams can audit and control exactly which internal systems are exposed to AI via MCP, rather than dealing with scattered, custom API keys.
- **Ecosystem Growth:** A marketplace of pre-built MCP servers (for Salesforce, Snowflake, Jira, etc.) will emerge, allowing businesses to "turn on" AI capabilities for existing tools instantly.
- **Data Privacy:** Local MCP servers allow AI to interact with sensitive, on-premise data without that data ever leaving the corporate network.

## Real-World Analogy
The evolution of smartphone apps. Early phones required custom software for every device. The App Store created a standard interface: developers build to the iOS/Android standard, and the phone knows how to run it. MCP is the "App Store standard" for AI tool connections.

## Code Example

```python
# Example of a simple MCP Server in Python exposing a tool
from mcp.server.fastmcp import FastMCP

# Initialize the MCP server
mcp = FastMCP("WeatherTool")

# Define a tool that the AI can call
@mcp.tool()
def get_current_weather(location: str, unit: str = "celsius") -> str:
    """Get the current weather for a given location."""
    # In a real scenario, this would call a weather API
    return f"The current weather in {location} is 72° {unit}."

# Define a resource (read-only data) the AI can access
@mcp.resource("config://app_settings")
def get_app_settings() -> str:
    return "App version: 2.1, Theme: Dark"

# Run the server
if __name__ == "__main__":
    mcp.run(transport='stdio')
```

## Common Misconceptions
- **Myth:** MCP is a new AI model.
- **Reality:** MCP is a communication protocol (like HTTP or JSON-RPC), not a model. It dictates *how* models and tools talk to each other.
- **Myth:** MCP replaces RAG.
- **Reality:** MCP and RAG are complementary. An MCP server could be built specifically to query a vector database, combining both paradigms.
- **Myth:** MCP is only for Anthropic's Claude.
- **Reality:** While introduced by Anthropic, it is an open standard. Other model providers and open-source projects are rapidly adopting it.

## Related Terms
- [Agentic AI](../agentic-ai/)
- [RAG](../rag/)
- [API](../api/)

## Sources & Further Reading
- [Model Context Protocol Official Documentation](https://modelcontextprotocol.io/)
- [Anthropic's Introduction to MCP](https://www.anthropic.com/news/model-context-protocol)
