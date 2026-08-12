---
title: "PEFT (Parameter-Efficient Fine-Tuning)"
category: "Training"
related: ["LoRA", "Fine-tuning", "Transfer Learning", "Quantization"]
date_added: 2026-08-12
---

# PEFT (Parameter-Efficient Fine-Tuning)

A family of techniques that adapt large pre-trained models to specific tasks by updating only a small subset of parameters (typically 0.1-5% of the total), dramatically reducing the computational cost and memory requirements of fine-tuning while preserving most of the performance gains.

## The Simple Version
Imagine you have a master chef who has spent 20 years learning to cook every cuisine in the world. You want them to specialize in your family's secret recipes. 

Full fine-tuning would be like sending the chef back to culinary school for 4 more years to relearn everything with your family's recipes in mind. That's expensive and time-consuming.

PEFT is like giving the chef a small notebook with just your family's recipes and techniques. They keep all their existing skills but add your specific knowledge. It's fast, cheap, and they still perform at a master level.

PEFT methods (like LoRA, Adapters, Prefix Tuning) do the same thing with AI models. Instead of updating all 70 billion parameters, they update just 70-350 million parameters (0.1-0.5%), achieving 95-99% of full fine-tuning performance at a fraction of the cost.

## Detailed Explanation
PEFT addresses the fundamental challenge of adapting large foundation models to specific tasks without the prohibitive cost of full fine-tuning.

**Why PEFT Matters:**
- **Full Fine-tuning:** A 70B parameter model requires ~140GB GPU memory (for gradients + optimizer states)
- **PEFT:** Same model requires ~5-10GB GPU memory (only updating small adapter layers)
- **Cost Reduction:** 10-50x cheaper to fine-tune
- **Accessibility:** Enables fine-tuning on consumer GPUs (24GB VRAM)

**Major PEFT Methods:**

**1. LoRA (Low-Rank Adaptation):**
- Injects trainable low-rank matrices into attention layers
- Freezes original model weights
- Most popular PEFT method (used in QLoRA)
- Typical rank: 8-64 (0.1-1% of parameters)

**2. Adapters:**
- Inserts small neural network layers between transformer blocks
- Each adapter is a bottleneck architecture (down-project → non-linearity → up-project)
- Can have multiple adapters for different tasks
- Easy to swap adapters for different use cases

**3. Prefix Tuning:**
- Prepends trainable "virtual tokens" to the input
- Only these prefix tokens are updated during training
- Original model remains frozen
- Works well for generation tasks

**4. Prompt Tuning:**
- Similar to prefix tuning but uses continuous prompt embeddings
- Even fewer parameters than prefix tuning
- Best for simple task adaptation

**5. BitFit:**
- Only updates the bias terms of the model
- Extremely parameter-efficient (<0.1% of parameters)
- Limited performance gains compared to other methods

**PEFT Performance Comparison:**
| Method | Parameters Updated | Performance vs Full FT | Memory Required |
|--------|-------------------|------------------------|-----------------|
| Full Fine-tuning | 100% | 100% | ~140GB (70B model) |
| LoRA | 0.1-1% | 95-99% | ~5-10GB |
| Adapters | 1-3% | 93-98% | ~8-15GB |
| Prefix Tuning | 0.1-0.5% | 90-95% | ~3-8GB |
| Prompt Tuning | 0.01-0.1% | 85-92% | ~2-5GB |

## Key Characteristics
- **Parameter Efficiency:** Updates only 0.1-5% of model parameters
- **Memory Efficient:** Enables fine-tuning on consumer hardware
- **Cost Effective:** 10-50x cheaper than full fine-tuning
- **Modular:** Can maintain multiple PEFT adapters for different tasks
- **Performance:** Preserves 90-99% of full fine-tuning quality

## Business Context
PEFT is the standard approach for enterprise model customization:

**Why Enterprises Use PEFT:**
- **Cost Reduction:** Fine-tune domain-specific models without massive GPU clusters
- **Speed:** Adapt models in hours instead of days
- **Flexibility:** Maintain separate adapters for different use cases (customer support, legal, medical)
- **Privacy:** Fine-tune on proprietary data without exposing it to third parties
- **Scalability:** Deploy multiple specialized models without multiplying infrastructure costs

**Enterprise Applications:**
- **Domain Adaptation:** Adapt general models to industry-specific terminology (legal, medical, financial)
- **Style Transfer:** Train models to match company brand voice and tone
- **Task Specialization:** Create specialized models for specific workflows (summarization, classification, extraction)
- **Multi-Tenant Systems:** Serve different customers with different adapters on the same base model

**ROI Example:**
- **Full Fine-tuning (70B model):** $5,000-$10,000 in compute, requires 8x A100 GPUs
- **LoRA (70B model):** $100-$300 in compute, runs on single 24GB GPU
- **Performance:** LoRA achieves 97% of full fine-tuning quality
- **Savings:** 95%+ cost reduction with minimal quality trade-off

**Popular PEFT Frameworks:**
- **Hugging Face PEFT:** Official library with LoRA, Adapters, Prefix Tuning
- **LLaMA-Factory:** Unified framework for PEFT training
- **Axolotl:** User-friendly fine-tuning toolkit
- **Unsloth:** 2x faster LoRA training with memory optimizations

## Real-World Analogy
A universal remote control. Instead of buying a separate remote for every device (TV, stereo, lights, AC), you have one universal remote that learns the codes for each device. The remote (base model) stays the same, but you add small code databases (adapters) for each device. It's efficient, flexible, and cost-effective.

## Code Example

```python
# PEFT with LoRA using Hugging Face
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model, TaskType

# Load base model (frozen)
model_name = "meta-llama/Llama-2-7b-hf"
model = AutoModelForCausalLM.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Configure LoRA
lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,                      # Rank (higher = more parameters, better quality)
    lora_alpha=32,             # Scaling factor
    target_modules=["q_proj", "v_proj"],  # Which layers to adapt
    lora_dropout=0.05,
    bias="none"
)

# Apply LoRA to the model
model = get_peft_model(model, lora_config)

# Check parameter counts
model.print_trainable_parameters()
# Output: trainable params: 4,194,304 || all params: 6,742,609,920 || trainable%: 0.0622

# Now train the model - only LoRA parameters are updated
# This requires ~10GB VRAM instead of ~140GB for full fine-tuning

# After training, you can:
# 1. Save just the LoRA weights (~16MB vs ~14GB for full model)
model.save_pretrained("./my-lora-adapter")

# 2. Load the adapter onto the base model later
from peft import PeftModel
model = AutoModelForCausalLM.from_pretrained(model_name)
model = PeftModel.from_pretrained(model, "./my-lora-adapter")
```

## Common Misconceptions
- **Myth:** PEFT always performs worse than full fine-tuning.
- **Reality:** Modern PEFT methods (especially LoRA) achieve 95-99% of full fine-tuning performance on most tasks. The gap has narrowed significantly with better techniques.

- **Myth:** PEFT is only for small models.
- **Reality:** PEFT works for models of all sizes. In fact, it's most valuable for large models (70B+) where full fine-tuning is prohibitively expensive.

- **Myth:** All PEFT methods are equivalent.
- **Reality:** Performance varies significantly. LoRA generally outperforms Adapters and Prefix Tuning, but the best method depends on the task and model architecture.

- **Myth:** PEFT eliminates the need for training data.
- **Reality:** PEFT still requires task-specific training data. It just reduces the compute needed to train on that data.

## Related Terms
- [LoRA](../lora/)
- [Fine-tuning](../fine-tuning/)
- [Transfer Learning](../transfer-learning/)
- [Quantization](../quantization/)

## Sources & Further Reading
- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)
- [Hugging Face PEFT Documentation](https://huggingface.co/docs/peft)
- [Parameter-Efficient Transfer Learning for NLP](https://arxiv.org/abs/1902.00751)
