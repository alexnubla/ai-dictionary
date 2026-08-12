---
title: "Encoder-Decoder"
category: "Architecture"
related: ["Transformer", "BERT", "GPT", "Sequence-to-Sequence"]
date_added: 2026-08-12
---

# Encoder-Decoder

A neural network architecture consisting of two main components — an Encoder that processes input data into a compressed representation, and a Decoder that generates output from that representation — widely used for sequence-to-sequence tasks like translation, summarization, and question answering.

## The Simple Version
Imagine you're translating a book from English to French. You need two skills:
1. **Understanding** the English text (reading comprehension)
2. **Writing** the French translation (generation)

An encoder-decoder architecture works the same way. The **Encoder** reads and understands the input (like English text), compressing it into a compact representation. The **Decoder** then takes that representation and generates the output (like French text).

This architecture is perfect for tasks where you need to transform one sequence into another: translate languages, summarize documents, convert speech to text, or answer questions.

## Detailed Explanation
The encoder-decoder architecture separates the tasks of understanding and generation, allowing each component to specialize.

**The Encoder:**
- Processes the input sequence
- Creates a rich, contextualized representation
- Can attend to all parts of the input (bidirectional)
- Outputs: Context vectors or hidden states

**The Decoder:**
- Takes the encoder's representation
- Generates the output sequence token by token
- Typically autoregressive (generates one token at a time)
- Can attend to encoder outputs (cross-attention)

**Architecture Variants:**

**1. RNN-based Encoder-Decoder:**
- Encoder: LSTM or GRU processes input sequence
- Decoder: LSTM or GRU generates output sequence
- Problem: Information bottleneck (single context vector)
- Solution: Attention mechanism

**2. Transformer Encoder-Decoder:**
- Encoder: Stack of transformer encoder layers
- Decoder: Stack of transformer decoder layers with cross-attention
- Examples: T5, BART, mBART
- Advantage: Parallel processing, better long-range dependencies

**3. Encoder-Only (BERT-style):**
- Only encoder, no decoder
- Bidirectional context (sees full input)
- Used for: Classification, extraction, understanding tasks
- Examples: BERT, RoBERTa, DeBERTa

**4. Decoder-Only (GPT-style):**
- Only decoder, no encoder
- Unidirectional context (sees only past tokens)
- Used for: Generation tasks
- Examples: GPT, Llama, Claude

**Key Components:**

**Attention Mechanisms:**
- **Self-Attention (Encoder):** Each input token attends to all other input tokens
- **Self-Attention (Decoder):** Each output token attends to previous output tokens
- **Cross-Attention (Decoder):** Each output token attends to all encoder outputs

**Training:**
- **Teacher Forcing:** During training, decoder uses ground truth previous tokens (not its own predictions)
- **Scheduled Sampling:** Gradually transition from teacher forcing to using model's own predictions
- **Loss:** Cross-entropy between predicted and actual output tokens

**Applications:**
- **Machine Translation:** English → French, Chinese → English
- **Summarization:** Long document → short summary
- **Question Answering:** Context + question → answer
- **Speech Recognition:** Audio → text
- **Text-to-Speech:** Text → audio
- **Image Captioning:** Image → description

## Key Characteristics
- **Separation of Concerns:** Encoder understands, decoder generates
- **Flexible:** Can handle different input/output lengths
- **Attention-Powered:** Cross-attention enables flexible alignment
- **Versatile:** Works for many sequence-to-sequence tasks
- **Composable:** Can mix encoder-only, decoder-only, or full encoder-decoder

## Business Context
Encoder-decoder architectures power many enterprise AI applications:

**Enterprise Applications:**
- **Translation Services:** Multilingual customer support, document translation
- **Summarization:** Executive briefings, meeting notes, document summaries
- **Customer Support:** Question answering, knowledge base search
- **Content Creation:** Generate reports, emails, documentation
- **Data Processing:** Extract structured data from unstructured text

**Strategic Benefits:**
- **Automation:** Automate tasks that require understanding + generation
- **Scalability:** Handle high volumes of sequence-to-sequence tasks
- **Quality:** Attention mechanisms enable high-quality outputs
- **Flexibility:** Same architecture works for many different tasks

**Model Selection:**
- **Understanding tasks (classification, extraction):** Use encoder-only (BERT)
- **Generation tasks (writing, completion):** Use decoder-only (GPT)
- **Transformation tasks (translation, summarization):** Use encoder-decoder (T5, BART)

**Popular Encoder-Decoder Models:**
- **T5 (Text-to-Text Transfer Transformer):** Google's versatile model
- **BART:** Denoising autoencoder for sequence-to-sequence
- **mBART:** Multilingual version of BART
- **Marian:** Fast neural machine translation
- **OPUS-MT:** Open-source translation models

## Real-World Analogy
A translator working at the United Nations. The translator listens to a speech in one language (encoder processes input), understands the meaning and context, then speaks the translation in another language (decoder generates output). The encoder and decoder work together seamlessly, with the translator's understanding (the compressed representation) bridging the two languages.

## Code Example

```python
# Encoder-Decoder model using Hugging Face Transformers (T5)
from transformers import T5Tokenizer, T5ForConditionalGeneration

# Load pre-trained T5 model (encoder-decoder architecture)
model_name = "t5-small"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

# Task 1: Translation (English to German)
input_text = "translate English to German: The house is wonderful."
inputs = tokenizer(input_text, return_tensors="pt")

outputs = model.generate(
    **inputs,
    max_new_tokens=50,
    num_beams=4,  # Beam search for better quality
    early_stopping=True
)
translation = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(f"Translation: {translation}")
# Output: "Das Haus ist wunderbar."

# Task 2: Summarization
input_text = """summarize: The tower is 324 metres (1,063 ft) tall, about the same height
as an 81-storey building, and the tallest structure in Paris. Its base is square,
measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower
surpassed the Washington Monument to become the tallest man-made structure in the world."""

inputs = tokenizer(input_text, return_tensors="pt", max_length=512, truncation=True)
outputs = model.generate(
    **inputs,
    max_new_tokens=50,
    num_beams=4,
    early_stopping=True
)
summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(f"Summary: {summary}")
# Output: "The Eiffel Tower is 324 metres tall, the tallest structure in Paris."

# Task 3: Question Answering
input_text = "question: What is the capital of France? context: France is a country in Europe. Its capital is Paris, a major center for art, fashion, and cuisine."
inputs = tokenizer(input_text, return_tensors="pt")
outputs = model.generate(**inputs, max_new_tokens=20)
answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(f"Answer: {answer}")
# Output: "Paris"
```

## Common Misconceptions
- **Myth:** Encoder-decoder is the only architecture for sequence tasks.
- **Reality:** Encoder-only (BERT) and decoder-only (GPT) architectures are often preferred for specific tasks. Encoder-decoder shines for transformation tasks (translation, summarization) but isn't always the best choice.

- **Myth:** Encoder-decoder models are outdated.
- **Reality:** Modern models like T5 and BART are state-of-the-art for many tasks. The encoder-decoder architecture is still widely used and actively researched.

- **Myth:** The encoder and decoder must be the same size.
- **Reality:** Encoder and decoder can have different sizes. Some architectures use a large encoder with a small decoder (or vice versa) depending on the task requirements.

- **Myth:** Encoder-decoder can only handle text.
- **Reality:** Encoder-decoder architectures work for any sequence data: text, audio, video, time series. The encoder processes the input modality, and the decoder generates the output modality.

## Related Terms
- [Transformer](../transformer/)
- [BERT](../bert/)
- [GPT](../gpt/)

## Sources & Further Reading
- [Sequence to Sequence Learning with Neural Networks](https://arxiv.org/abs/1409.3215)
- [Attention Is All You Need (Transformer)](https://arxiv.org/abs/1706.03762)
- [Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer (T5)](https://arxiv.org/abs/1910.10683)
