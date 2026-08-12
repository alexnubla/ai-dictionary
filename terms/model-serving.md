---
title: "Model Serving"
category: "Deployment"
related: ["Inference", "Latency", "Throughput", "API Gateway"]
date_added: 2026-08-12
---

# Model Serving

The infrastructure and software systems that deploy trained machine learning models into production, making them accessible via APIs for real-time predictions — the critical layer between trained models and end-user applications.

## The Simple Version
Imagine you've trained a brilliant data scientist (the model). They know everything about your domain and can answer any question. But they're sitting in a back room with no phone, no email, no way for customers to reach them.

Model serving is like giving that data scientist a phone, an email address, and a receptionist to handle calls. It makes the model accessible to users through APIs, handles multiple requests at once, manages load, and ensures reliability.

Without model serving, you have a trained model that can't be used. With model serving, you have a production AI system that can serve millions of users.

## Detailed Explanation
Model serving encompasses the entire infrastructure stack that makes trained models available for inference in production environments.

**Core Components:**

**1. Model Loading:**
- Load trained model weights into memory
- Initialize model architecture
- Move model to appropriate hardware (GPU, CPU)
- Optimize model for inference (quantization, pruning)

**2. Request Handling:**
- Receive API requests from clients
- Parse and validate inputs
- Preprocess inputs (tokenization, normalization)
- Route requests to appropriate model

**3. Inference Execution:**
- Run model forward pass
- Generate predictions
- Postprocess outputs (detokenization, formatting)
- Return results to client

**4. Scaling and Load Balancing:**
- Handle concurrent requests
- Scale horizontally (add more instances) or vertically (bigger GPUs)
- Load balance across multiple replicas
- Auto-scale based on demand

**5. Monitoring and Observability:**
- Track latency, throughput, error rates
- Monitor GPU utilization, memory usage
- Log requests and responses
- Alert on anomalies

**Model Serving Frameworks:**

**1. vLLM:**
- High-throughput LLM serving
- PagedAttention for efficient KV cache
- Continuous batching
- OpenAI-compatible API
- **Best for:** LLMs, high-throughput scenarios

**2. Text Generation Inference (TGI):**
- Hugging Face's serving framework
- Optimized for transformer models
- Streaming support
- **Best for:** Hugging Face models, text generation

**3. NVIDIA Triton Inference Server:**
- Multi-framework support (PyTorch, TensorFlow, ONNX, TensorRT)
- Dynamic batching
- Ensemble models
- **Best for:** Multi-model deployments, enterprise

**4. TorchServe:**
- PyTorch's official serving solution
- Simple to use for PyTorch models
- **Best for:** PyTorch models, simple deployments

**5. Ray Serve:**
- Scalable model serving on Ray
- Supports complex workflows
- **Best for:** Complex ML pipelines, multi-model systems

**6. SGLang:**
- High-performance LLM serving
- RadixAttention for prefix caching
- **Best for:** LLMs with shared prefixes

**Key Features of Production Serving:**

**1. Batching:**
- Group multiple requests for efficient GPU utilization
- Static batching (wait for N requests)
- Dynamic batching (process as requests arrive)
- Continuous batching (add/remove requests dynamically)

**2. Streaming:**
- Return tokens as they're generated
- Reduces perceived latency
- Essential for chat applications

**3. Caching:**
- Cache frequent queries
- Cache KV cache for shared prefixes
- Reduces redundant computation

**4. Quantization:**
- Serve models in lower precision (INT8, INT4)
- Reduces memory and increases throughput
- Minimal quality loss

**5. Model Versioning:**
- Serve multiple model versions simultaneously
- Enable A/B testing
- Rollback capabilities

**6. Security:**
- Authentication and authorization
- Rate limiting
- Input validation
- Output filtering

## Key Characteristics
- **Production-Ready:** Handles real-world traffic and reliability requirements
- **Scalable:** Can serve thousands to millions of requests
- **Observable:** Provides metrics, logs, and traces
- **Flexible:** Supports multiple models, frameworks, and hardware
- **Optimized:** Maximizes throughput and minimizes latency

## Business Context
Model serving is the bridge between trained models and business value:

**Why It Matters:**
- **Enables Production Use:** Without serving, models can't be used
- **Cost Driver:** Serving infrastructure is a major operational cost
- **Performance Impact:** Serving quality affects user experience
- **Scalability:** Determines how many users you can serve

**Enterprise Considerations:**

**Build vs. Buy:**
- **Cloud APIs (OpenAI, Anthropic):** Easy to use, pay-per-token, limited control
- **Self-Hosted (vLLM, TGI):** More control, lower cost at scale, requires expertise
- **Managed Serving (Modal, Replicate, Together):** Balance of control and convenience

**Cost Comparison:**
- **OpenAI API:** $0.06 per 1M tokens (GPT-4o)
- **Self-hosted Llama-70B:** $0.01-$0.02 per 1M tokens (at scale)
- **Savings:** 67-83% cost reduction with self-hosting (at sufficient volume)

**When to Self-Host:**
- High volume (>100M tokens/month)
- Strict data privacy requirements
- Need for customization (fine-tuned models)
- Cost optimization at scale

**When to Use Cloud APIs:**
- Low volume (<10M tokens/month)
- Rapid prototyping
- Limited ML engineering resources
- Want latest models without infrastructure management

**Infrastructure Requirements:**
- **GPUs:** A100, H100 for large models; T4, L4 for smaller models
- **Memory:** 40-80GB VRAM for 70B+ models
- **Networking:** High-bandwidth for low-latency serving
- **Storage:** Fast SSDs for model loading

## Real-World Analogy
A restaurant kitchen. The chef (model) can cook amazing dishes, but without the kitchen infrastructure (ovens, prep stations, waitstaff, ordering system), they can't serve customers. Model serving is the kitchen infrastructure that enables the chef to serve hundreds of customers efficiently, handling orders, managing timing, and ensuring quality.

## Code Example

```python
# Deploying a model with vLLM (production-grade serving)
from vllm import LLM, SamplingParams

# Initialize the serving engine
llm = LLM(
    model="meta-llama/Llama-2-70b-chat-hf",
    tensor_parallel_size=4,  # Use 4 GPUs
    gpu_memory_utilization=0.9,
    max_model_len=4096,
    quantization="awq",  # Quantized for efficiency
    enable_prefix_caching=True,  # Cache shared prefixes
)

# Define sampling parameters
sampling_params = SamplingParams(
    temperature=0.7,
    top_p=0.9,
    max_tokens=500,
)

# Serve multiple requests (batching)
prompts = [
    "Explain quantum computing in simple terms:",
    "Write a haiku about artificial intelligence:",
    "What are the benefits of renewable energy?",
]

# Generate responses (vLLM handles batching automatically)
outputs = llm.generate(prompts, sampling_params)

for output in outputs:
    prompt = output.prompt
    generated_text = output.outputs[0].text
    print(f"Prompt: {prompt}")
    print(f"Response: {generated_text}")
    print("---")

# vLLM also provides an OpenAI-compatible API server
# Run: python -m vllm.entrypoints.openai.api_server --model meta-llama/Llama-2-70b-chat-hf
# Then use standard OpenAI client to query it
```

```python
# Alternative: Using Hugging Face TGI (Text Generation Inference)
# Deploy with Docker:
# docker run --gpus all -p 8080:80 \
#   ghcr.io/huggingface/text-generation-inference:latest \
#   --model-id meta-llama/Llama-2-70b-chat-hf

# Query the deployed model
import requests

response = requests.post(
    "http://localhost:8080/generate",
    json={
        "inputs": "What is the capital of France?",
        "parameters": {
            "max_new_tokens": 50,
            "temperature": 0.7,
        }
    }
)

print(response.json()["generated_text"])
```

## Common Misconceptions
- **Myth:** Model serving is just loading a model and running it.
- **Reality:** Production serving requires batching, scaling, monitoring, security, and optimization. It's a complex infrastructure challenge, not just `model.predict()`.

- **Myth:** You should always self-host models.
- **Reality:** Cloud APIs are often more cost-effective for low-volume use cases. Self-hosting makes sense at scale (>100M tokens/month) or for strict privacy requirements.

- **Myth:** All serving frameworks are equivalent.
- **Reality:** Frameworks vary significantly in performance, features, and ease of use. vLLM excels for LLMs, Triton for multi-model deployments, TGI for Hugging Face models.

- **Myth:** Model serving is a one-time setup.
- **Reality:** Serving requires ongoing monitoring, optimization, and updates. Model versions change, traffic patterns evolve, and infrastructure needs scaling.

## Related Terms
- [Inference](../inference/)
- [Latency](../latency/)
- [Throughput](../throughput/)
- [Batch Processing](../batch-processing/)

## Sources & Further Reading
- [vLLM: Efficient Memory Management for LLM Serving](https://vllm.readthedocs.io/)
- [Hugging Face Text Generation Inference](https://github.com/huggingface/text-generation-inference)
- [NVIDIA Triton Inference Server](https://developer.nvidia.com/triton-inference-server)
