---
title: "Context Window"
category: "Architecture"
related: ["Token", "Transformer", "RAG", "Prompt"]
date_added: 2026-08-12
---

# Context Window

The maximum number of tokens (text units) that a language model can process in a single input-output interaction, defining the "working memory" available for the model to understand and generate text.

## The Simple Version
Imagine you're having a conversation with someone, but they can only remember the last 10 minutes of what you've said. If you talk for an hour, they'll forget the beginning. 

A context window is like that memory limit for AI. If a model has a 4,000-token context window, it can only "see" the most recent 4,000 tokens of your conversation or document. Anything beyond that is invisible to the model — it's as if it doesn't exist.

This is why you can't paste an entire book into ChatGPT and ask it to analyze the whole thing. The book is longer than the context window, so the model can only see a portion of it.

## Detailed Explanation
The context window is a fundamental architectural constraint of transformer-based language models, determined by the model's positional encoding mechanism and attention mechanism.

**How Context Windows Work:**
1. **Tokenization:** Input text is converted into tokens (roughly 0.75 words per token in English)
2. **Context Limit:** The model can only process up to its maximum context window size
3. **Sliding Window:** As new tokens are added, older tokens "fall off" the beginning
4. **Shared Space:** The context window includes both input (prompt + retrieved context) AND output (model's response)

**Context Window Sizes (2026):**
- **GPT-4o:** 128K tokens (~96,000 words)
- **Claude 3.5 Sonnet:** 200K tokens (~150,000 words)
- **Gemini 1.5 Pro:** 1M-2M tokens (~750,000-1.5M words)
- **Llama 3.1:** 128K tokens
- **GPT-4 (original):** 8K tokens

**Why Context Windows Matter:**
- **Document Processing:** Determines how much of a document the model can analyze at once
- **Conversation Length:** Limits how long a conversation can continue before context is lost
- **RAG Design:** Influences how much retrieved context can be included in prompts
- **Cost:** Longer contexts = more tokens = higher API costs
- **Performance:** Models may struggle with "lost in the middle" problem (forgetting information in the middle of long contexts)

**Technical Constraints:**
- **Quadratic Attention:** Standard attention scales quadratically with context length (O(n²))
- **Memory Requirements:** Longer contexts require more GPU memory
- **Latency:** Processing longer contexts takes more time
- **Innovations:** Techniques like sparse attention, sliding windows, and linear attention enable longer contexts

## Key Characteristics
- **Hard Limit:** Models cannot process more tokens than their context window allows
- **Shared Resource:** Input and output compete for the same context space
- **Cost Driver:** Longer contexts = higher token costs
- **Performance Variable:** Models may perform differently at different context lengths
- **Evolving:** Context windows are rapidly increasing (4K → 128K → 1M+)

## Business Context
Context windows directly impact enterprise AI architecture and costs:

**Strategic Implications:**
- **Document Processing:** Choose models with context windows large enough for your documents
- **Conversation Design:** Design chatbots to manage context efficiently (summarization, retrieval)
- **Cost Management:** Longer contexts cost more; optimize by retrieving only relevant information
- **RAG Strategy:** Context window size determines how much retrieved context you can include

**Practical Considerations:**
- **Token Counting:** Estimate costs by counting tokens (1 token ≈ 0.75 words in English)
- **Context Overflow:** Handle cases where input exceeds context window (truncation, summarization, chunking)
- **Performance Testing:** Test model performance at your typical context lengths
- **Model Selection:** Balance context window size with cost, speed, and capability

**Cost Example:**
- **4K context:** ~$0.001 per query
- **128K context:** ~$0.03 per query (30x more expensive)
- **Decision:** Use smaller contexts when possible; reserve large contexts for tasks that truly need them

## Real-World Analogy
A desk workspace. A small desk (4K context) can only hold a few papers at once — you need to constantly shuffle things around. A large conference table (1M context) can hold hundreds of documents, letting you see everything at once. The larger workspace is more powerful but also more expensive and harder to manage.

## Code Example

```python
# Checking context window and token usage
import tiktoken

# Load tokenizer for GPT-4
encoding = tiktoken.encoding_for_model("gpt-4")

# Example text
text = """
The history of artificial intelligence began in antiquity, with myths, stories, 
and rumors of artificial beings endowed with intelligence or consciousness 
by master craftsmen. The study of logic and formal reasoning from antiquity 
to the present led directly to the invention of the programmable digital 
computer in the 1940s...
""" * 100  # Repeat to make it longer

# Count tokens
tokens = encoding.encode(text)
print(f"Text length: {len(text)} characters")
print(f"Token count: {len(tokens)} tokens")
print(f"Approximate words: {len(tokens) * 0.75:.0f} words")

# Check if it fits in context window
gpt4_context = 128000  # GPT-4o context window
if len(tokens) > gpt4_context:
    print(f"WARNING: Text exceeds context window by {len(tokens) - gpt4_context} tokens")
else:
    print(f"Fits in context window with {gpt4_context - len(tokens)} tokens to spare")
```

## Common Misconceptions
- **Myth:** Context window is the same as the model's total knowledge.
- **Reality:** The context window is the model's "working memory" for a single interaction. The model's total knowledge is everything it learned during training, which is much larger but not directly accessible.

- **Myth:** Longer context windows are always better.
- **Reality:** Longer contexts cost more and may suffer from "lost in the middle" problems. For many tasks, a smaller context with well-chosen information (via RAG) works better than a huge context with everything.

- **Myth:** Models can process unlimited text if you just wait longer.
- **Reality:** Context windows are hard architectural limits. If your text exceeds the context window, you must chunk it, summarize it, or use retrieval techniques.

- **Myth:** All models with the same context window perform equally well.
- **Reality:** Models vary in how well they use long contexts. Some excel at finding information anywhere in the context; others struggle with information in the middle.

## Related Terms
- [Token](../token/)
- [Transformer](../transformer/)
- [RAG](../rag/)
- [Prompt](../prompt/)

## Sources & Further Reading
- [GPT-4 Technical Report](https://arxiv.org/abs/2303.08774)
- [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)
- [Anthropic's 200K Context Window Announcement](https://www.anthropic.com/news/200k-context)
