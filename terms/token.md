---
title: "Token"
category: "Architecture"
related: ["Tokenizer", "LLM", "Context Window", "Embedding"]
date_added: 2026-08-12
---

# Token

The basic unit of text that AI language models process, where text is broken down into smaller pieces (words, subwords, or characters) that the model can understand and work with.

## The Simple Version
Imagine you're trying to teach a computer to read, but the computer can't understand whole words like humans do. Instead, you need to break sentences into tiny puzzle pieces that the computer can handle.

These puzzle pieces are called "tokens." Sometimes a token is a whole word like "cat." Sometimes it's part of a word like "ing" from "running." Sometimes it's even just a single letter or punctuation mark like "." or "?".

When you type a sentence into an AI, the first thing it does is chop your sentence into tokens. Then it processes each token, understands how they relate to each other, and generates its response — also as tokens — which it then stitches back together into words you can read.

It's like the difference between seeing a whole photograph versus seeing it as individual pixels. The AI works with the "pixels" of language (tokens) to understand and create text.

## Detailed Explanation
Tokens are the atomic units of text processing in language models. Before any text can be processed by an LLM, it must be converted into tokens through a process called **tokenization**.

**How tokenization works:**
1. **Text Input:** Raw text string (e.g., "The quick brown fox jumps")
2. **Tokenization:** Text is split into tokens using a tokenizer algorithm
3. **Token IDs:** Each token is mapped to a unique integer ID from the model's vocabulary
4. **Embedding:** Token IDs are converted to high-dimensional vectors (embeddings)
5. **Processing:** Model processes the sequence of embeddings
6. **Detokenization:** Output tokens are converted back to text

**Types of tokenization:**
- **Word-level:** Each word is a token (simple but large vocabulary)
- **Character-level:** Each character is a token (small vocabulary but long sequences)
- **Subword-level:** Words are split into meaningful subword units (modern standard)
  - **BPE (Byte Pair Encoding):** Used by GPT models
  - **WordPiece:** Used by BERT
  - **SentencePiece:** Language-agnostic tokenization

**Token examples:**
- "hello" → 1 token
- "unbelievable" → might be 2 tokens: "un" + "believable"
- "I'm" → might be 2 tokens: "I" + "'m"
- "👍" → might be 1-2 tokens depending on the tokenizer

**Why tokens matter:**
- **Context Window:** Models have a maximum number of tokens they can process (e.g., 4K, 8K, 32K, 128K tokens)
- **Cost:** API pricing is often per token (input + output tokens)
- **Speed:** More tokens = slower processing
- **Quality:** Better tokenization can improve model performance

## Key Characteristics
- **Granularity:** Tokens are smaller than words but larger than characters (typically subwords)
- **Vocabulary Size:** Models have fixed vocabularies (e.g., GPT-4 has ~100K tokens)
- **Variable Length:** One word can be 1-3+ tokens depending on the tokenizer
- **Language-Specific:** Tokenizers are optimized for specific languages or multilingual use
- **Deterministic:** Same text always produces same tokens with same tokenizer

## Business Context
Understanding tokens is critical for enterprise AI deployment because they directly impact cost, performance, and user experience:

**Cost implications:**
- **API Pricing:** Most LLM APIs charge per 1K tokens (input and output separately)
- **Example:** GPT-4 pricing might be $0.03 per 1K input tokens, $0.06 per 1K output tokens
- **Budget Planning:** A 1000-word document might be ~1300 tokens; processing it costs ~$0.04
- **Scale:** Processing 1M documents/month could cost thousands of dollars

**Performance considerations:**
- **Latency:** More tokens = longer processing time
- **Context Limits:** Documents exceeding context window must be chunked or summarized
- **Throughput:** Systems must be designed to handle token-level rate limits

**Operational impact:**
- **Cost Attribution:** Track token usage by project, team, or client
- **Optimization:** Reduce costs by optimizing prompts, using caching, or selecting appropriate models
- **Monitoring:** Alert on unusual token consumption patterns
- **Governance:** Set token usage limits per user or application

**Strategic decisions:**
- **Model Selection:** Larger context windows (128K vs 4K) cost more but handle longer documents
- **Architecture:** RAG systems retrieve relevant chunks to stay within token limits
- **Caching:** Cache frequent queries to avoid reprocessing same tokens

## Real-World Analogy
Counting words in an essay for a class assignment. Your teacher says the essay must be "500 words." But what counts as a word? Does "don't" count as one word or two? Does a hyphenated word like "well-being" count as one or two?

Tokens are like that, but for AI. The tokenizer is the "word counter" that decides how to break text into pieces. Different tokenizers might count differently, just like different people might count "don't" differently. The important thing is that the AI and the tokenizer agree on the rules.

## Code Example

```python
# Tokenization examples using Hugging Face Transformers
from transformers import AutoTokenizer

# Load GPT-2 tokenizer
tokenizer = AutoTokenizer.from_pretrained("gpt2")

# Example text
text = "The quick brown fox jumps over the lazy dog."

# Tokenize
tokens = tokenizer.tokenize(text)
print("Tokens:", tokens)

# Get token IDs
token_ids = tokenizer.encode(text)
print("Token IDs:", token_ids)
print("Number of tokens:", len(token_ids))

# Decode back to text
decoded = tokenizer.decode(token_ids)
print("Decoded:", decoded)

# Compare with a word that might be split into subwords
complex_word = "unbelievable"
tokens_complex = tokenizer.tokenize(complex_word)
print("Tokens for 'unbelievable':", tokens_complex)

# Count tokens for cost estimation
long_text = "This is a much longer document that would cost more to process..."
token_count = len(tokenizer.encode(long_text))
cost_per_1k = 0.03
estimated_cost = (token_count / 1000) * cost_per_1k
print("Token count:", token_count, "Estimated cost: $", round(estimated_cost, 4))
```

## Common Misconceptions
- **Myth:** One token always equals one word.
- **Reality:** Tokens are typically subwords. Common words might be 1 token, but complex or rare words can be 2-5+ tokens. On average, 1 token ≈ 0.75 words in English.

- **Myth:** All AI models use the same tokenization.
- **Reality:** Different models have different tokenizers with different vocabularies. GPT-4, Claude, and Llama all tokenize text differently, so the same text will have different token counts across models.

- **Myth:** Tokens are only relevant for text generation.
- **Reality:** Tokens matter for everything: input processing, context limits, API costs, embedding generation, and even multimodal models (images are also converted to tokens).

- **Myth:** More tokens always means better understanding.
- **Reality:** While longer context windows allow processing more information, there are diminishing returns. Models may struggle to attend to all information in very long contexts ("lost in the middle" problem).

## Related Terms
- [Tokenizer](./tokenizer/)
- [Context Window](./context-window/)
- [Embedding](./embedding/)
- [LLM](./llm/)

## Sources & Further Reading
- [Hugging Face Tokenizers Documentation](https://huggingface.co/docs/tokenizers)
- [GPT-3 Tokenizer Explained](https://beta.openai.com/tokenizer)
- [SentencePiece: A simple and language independent subword tokenizer](https://arxiv.org/abs/1808.06226)
- [Understanding GPT Tokenizers by Simon Willison](https://simonwillison.net/2023/Apr/14/understanding-gpt-tokenizers/)
