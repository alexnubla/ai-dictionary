---
title: "Quantization"
category: "Deployment"
related: ["Distillation", "Inference", "Latency", "Throughput"]
date_added: 2026-08-12
---

# Quantization

A model optimization technique that reduces the numerical precision of a neural network's weights and activations (e.g., from 32-bit floating point to 8-bit integers), dramatically shrinking model size and speeding up inference with minimal loss in accuracy.

## The Simple Version
Imagine you have a high-resolution photograph that's 50MB. It looks beautiful, but it's huge and slow to load. If you compress it to a JPEG, it becomes 2MB — still looks great, but loads 25x faster. You traded a tiny bit of quality for massive gains in speed and size.

Quantization does the same thing to AI models. Instead of storing each number in the model with 32 bits of precision (like 3.14159265358979), it uses fewer bits — maybe 8 bits (just 3) or even 4 bits (just 3.1). The model becomes 4-8x smaller and runs much faster, while still giving nearly identical answers.

This is why you can now run a 70-billion parameter model like Llama 2 on a laptop — quantization makes it fit.

## Detailed Explanation
Neural networks store their "knowledge" as billions of numerical weights. By default, these weights are stored as 32-bit floating point numbers (FP32), which can represent values with extreme precision. Quantization reduces this precision.

**Precision Levels:**
- **FP32 (32-bit):** Full precision. A 7B parameter model = ~28GB
- **FP16 / BF16 (16-bit):** Half precision. Same model = ~14GB
- **INT8 (8-bit):** Quarter precision. Same model = ~7GB
- **INT4 (4-bit):** Sixteenth precision. Same model = ~3.5GB
- **INT2 / INT1 (experimental):** Extreme compression, larger accuracy trade-offs

**Two Main Approaches:**

**1. Post-Training Quantization (PTQ):**
- Take an already-trained model and convert its weights to lower precision
- Fast (minutes), no retraining needed
- Slight accuracy loss (typically 1-3%)
- Examples: GPTQ, AWQ, llama.cpp GGUF formats

**2. Quantization-Aware Training (QAT):**
- Simulate lower precision during training so the model learns to compensate
- Better accuracy preservation
- Requires retraining (more expensive)
- Used when every bit of accuracy matters

**Modern Quantization Techniques:**

**GPTQ (Post-Training):**
- One-shot quantization based on approximate second-order information
- Popular for LLMs, works well at 4-bit and 8-bit
- Requires calibration data (small representative dataset)

**AWQ (Activation-Aware Weight Quantization):**
- Protects salient weights (the 1% that matter most) at higher precision
- Better accuracy than naive quantization at same bit-width
- Very fast inference on modern GPUs

**GGUF (llama.cpp format):**
- Community-standard format for running quantized LLMs locally
- Supports mixed precision (some layers at 4-bit, others at 8-bit)
- Enables running large models on consumer hardware (even CPUs)

**BitsAndBytes (NF4 / FP4):**
- 4-bit NormalFloat quantization used in QLoRA
- Enables fine-tuning large models on consumer GPUs
- Critical for democratizing LLM fine-tuning

## Key Characteristics
- **Size Reduction:** 2-8x smaller models depending on bit-width
- **Speed Improvement:** 2-4x faster inference (memory bandwidth is often the bottleneck)
- **Memory Efficiency:** Enables running large models on limited hardware
- **Minimal Accuracy Loss:** Modern techniques preserve 95-99% of original performance
- **Hardware Dependent:** Some quantization formats require specific hardware support (e.g., INT8 on GPUs)

## Business Context
Quantization is the key enabler for cost-effective enterprise AI deployment:

**Why It Matters:**
- **Cost Reduction:** Smaller models = cheaper inference (often 4-8x cost savings)
- **Edge Deployment:** Run AI on phones, IoT devices, browsers without cloud dependency
- **Privacy:** On-device processing keeps sensitive data local
- **Latency:** Faster inference enables real-time applications
- **Democratization:** Makes large models accessible without expensive GPU clusters

**Enterprise Applications:**
- **Mobile AI:** Run LLMs on smartphones for offline assistance
- **Browser AI:** Local AI features in web apps (WebGPU + quantized models)
- **Edge Devices:** Manufacturing, retail, and automotive applications
- **Cost-Optimized APIs:** Offer cheaper tiers using quantized models
- **Compliance:** Meet data residency requirements with on-device AI

**ROI Example:**
- **FP16 model (7B):** ~$0.06 per 1M tokens, requires A100 GPU
- **INT4 quantized (7B):** ~$0.008 per 1M tokens, runs on T4 GPU
- **Savings:** 87% cost reduction with ~98% quality retention
- **At scale:** Millions of dollars saved annually for high-volume applications

**Popular Quantized Model Ecosystems:**
- **Hugging Face:** `bitsandbytes`, `auto-gptq`, `optimum` libraries
- **llama.cpp:** GGUF format for local inference
- **vLLM:** Production serving with quantization support
- **Ollama:** Easy local deployment of quantized models
- **ONNX Runtime:** Cross-platform quantized inference

## Real-World Analogy
A master chef's recipe written in three versions:
- **FP32:** The original handwritten recipe with every detail, measurements to the milligram, and extensive notes (50 pages)
- **INT8:** A typed version with rounded measurements and key steps (10 pages) — still produces the same dish
- **INT4:** A one-page summary with only the essentials — an experienced cook can still make it, but a novice might struggle

The essence is preserved, but the format is optimized for the situation.

## Code Example

```python
# Loading a quantized model using Hugging Face + bitsandbytes
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
import torch

model_id = "meta-llama/Llama-2-7b-hf"

# Configure 4-bit quantization (NF4)
quantization_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",           # NormalFloat 4-bit
    bnb_4bit_compute_dtype=torch.bfloat16, # Compute in higher precision
    bnb_4bit_use_double_quant=True        # Quantize the quantization constants too
)

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_id)

# Load quantized model (uses ~3.5GB instead of ~28GB for FP16)
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=quantization_config,
    device_map="auto"
)

# Compare memory usage
print(f"Model loaded with 4-bit quantization")
print(f"Memory usage: ~3.5GB (vs ~28GB for FP16)")

# Generate text
prompt = "Explain quantization in one sentence:"
inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
outputs = model.generate(**inputs, max_new_tokens=50)
print(tokenizer.decode(outputs[0], skip_special_tokens=True))
```

## Common Misconceptions
- **Myth:** Quantization always significantly hurts model quality.
- **Reality:** Modern techniques (AWQ, GPTQ, NF4) preserve 95-99% of original performance at 4-bit. The accuracy gap has narrowed dramatically in recent years.

- **Myth:** Quantization only works for small models.
- **Reality:** Quantization works for models of all sizes. In fact, larger models often tolerate quantization better because they have more redundancy in their weights.

- **Myth:** You have to retrain the model from scratch to quantize it.
- **Reality:** Post-training quantization (PTQ) works on already-trained models in minutes. Quantization-aware training (QAT) gives better results but isn't required.

- **Myth:** All quantization methods are equivalent.
- **Reality:** Quality varies significantly. Naive rounding loses more accuracy than sophisticated methods like AWQ or GPTQ. The choice of method and bit-width matters.

## Related Terms
- [Distillation](../distillation/)
- [Inference](../inference/)
- [Latency](../latency/)
- [Throughput](../throughput/)

## Sources & Further Reading
- [GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers](https://arxiv.org/abs/2210.17323)
- [AWQ: Activation-aware Weight Quantization](https://arxiv.org/abs/2306.00978)
- [QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)
- [Hugging Face Quantization Documentation](https://huggingface.co/docs/transformers/main_classes/quantization)
