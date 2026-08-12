---
title: "Throughput"
category: "Deployment"
related: ["Latency", "Inference", "Scaling", "Batch Processing"]
date_added: 2026-08-12
---

# Throughput

The number of requests, tokens, or operations an AI system can process per unit of time (e.g., requests per second, tokens per second) — a critical metric for understanding system capacity, scalability, and cost-efficiency at scale.

## The Simple Version
Imagine a highway. 
- **Latency** is how long it takes one car to travel from point A to point B.
- **Throughput** is how many cars can pass through the highway per hour.

You can have a fast highway (low latency) with only one lane (low throughput), or a slower highway with 10 lanes (high throughput). For AI systems, you need to optimize both depending on your use case.

Throughput answers the question: "How much work can this system handle?" If you need to process 10,000 customer queries per hour, you need a system with sufficient throughput.

## Detailed Explanation
Throughput is a fundamental capacity metric that determines how much work an AI system can handle in a given time period.

**Throughput Metrics:**

**1. Requests Per Second (RPS):**
- Number of complete API requests processed per second
- Critical for high-traffic applications (chatbots, search)
- Example: A system handling 100 RPS can serve 360,000 requests per hour

**2. Tokens Per Second (TPS):**
- Number of output tokens generated per second
- Measures raw generation capacity
- Example: 1000 TPS = 1000 words per second (roughly)

**3. Queries Per Second (QPS):**
- Similar to RPS but specific to search/query workloads
- Common metric for vector databases and search systems

**Factors Affecting Throughput:**
- **Hardware:** More GPUs = higher throughput (linear scaling up to a point)
- **Batching:** Processing multiple requests together increases GPU utilization
- **Model Size:** Smaller models have higher throughput (less compute per token)
- **Optimization:** Quantization, pruning, and efficient serving frameworks boost throughput
- **Concurrency:** Ability to handle multiple requests simultaneously

**Throughput vs. Latency Trade-offs:**

| Strategy | Latency | Throughput | Use Case |
|----------|---------|------------|----------|
| **Single request, no batching** | Low | Low | Real-time chat |
| **Dynamic batching** | Medium | High | API serving |
| **Large batch processing** | High | Very High | Offline analysis |

**Throughput Optimization Techniques:**

**1. Batching:**
Group multiple requests and process them together on the GPU.
- *Static batching:* Wait for N requests, then process
- *Dynamic batching:* Process as requests arrive, batch what's available
- *Continuous batching:* Add/remove requests from batch dynamically (vLLM)

**2. Model Parallelism:**
- *Tensor parallelism:* Split model across multiple GPUs
- *Pipeline parallelism:* Split model layers across GPUs
- *Data parallelism:* Replicate model across GPUs, split data

**3. Quantization:**
Reduce model precision (FP16 → INT8 → INT4) to process more tokens per second.

**4. Speculative Decoding:**
Use a small model to draft tokens, verify with large model in parallel.

**5. Caching:**
Cache frequent queries to avoid reprocessing (dramatically increases effective throughput).

## Key Characteristics
- **Capacity Metric:** Measures how much work the system can handle
- **Scalability Indicator:** Higher throughput = better scalability
- **Cost-Efficiency:** Higher throughput = lower cost per request
- **Hardware-Dependent:** Directly tied to available compute resources
- **Optimizable:** Can be improved through batching, parallelism, and optimization

## Business Context
Throughput is critical for enterprise AI planning and cost management:

**Why Throughput Matters:**
- **Capacity Planning:** Determine how much infrastructure you need for expected load
- **Cost Optimization:** Higher throughput = lower cost per request
- **SLA Compliance:** Ensure system can handle peak loads without degradation
- **Scalability:** Plan for growth as usage increases
- **Vendor Selection:** Compare throughput capabilities of different providers

**Throughput Requirements by Use Case:**
- **Customer Support Chatbot:** 10-100 RPS (depends on user base)
- **Internal Search:** 100-1000 QPS (enterprise-wide search)
- **Batch Document Processing:** 1000+ TPS (bulk analysis)
- **Real-time Translation:** 50-200 RPS (live conversation)
- **Code Generation:** 10-50 RPS (developer tools)

**Cost Implications:**
- **Cloud APIs:** Priced per token; throughput affects total cost
- **Self-hosted:** GPU costs are fixed; higher throughput = better ROI
- **Example:** 
  - 1 GPU handling 10 RPS = $0.10 per request
  - 1 GPU handling 100 RPS (with batching) = $0.01 per request
  - 10x throughput improvement = 10x cost reduction

**Scaling Strategies:**
- **Vertical Scaling:** Add more powerful GPUs (A100 → H100)
- **Horizontal Scaling:** Add more GPU instances
- **Load Balancing:** Distribute requests across multiple instances
- **Auto-scaling:** Automatically add/remove instances based on load

**Monitoring and Capacity Planning:**
- Track throughput under different load conditions
- Identify bottlenecks (GPU, memory, network, queue)
- Plan capacity for peak loads (2-3x average)
- Monitor throughput trends as usage grows

## Real-World Analogy
A restaurant kitchen.
- **Low throughput:** One chef cooking one meal at a time (slow, but each meal is fresh)
- **Medium throughput:** One chef cooking multiple dishes simultaneously (faster, but more complex)
- **High throughput:** Multiple chefs working in an assembly line (very fast, standardized)

Each approach has trade-offs. A fine dining restaurant prioritizes quality (low throughput, high attention). A fast-food chain prioritizes speed and volume (high throughput, standardized). Your AI system should match the throughput to your needs.

## Code Example

```python
# Measuring throughput with concurrent requests
import asyncio
import time
from openai import AsyncOpenAI

client = AsyncOpenAI()

async def make_request(prompt: str):
    """Make a single API request."""
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=50
    )
    return response.choices[0].message.content

async def measure_throughput(num_requests: int, concurrency: int):
    """Measure throughput with concurrent requests."""
    
    prompts = [f"Request {i}: What is {i} + {i}?" for i in range(num_requests)]
    
    start_time = time.time()
    
    # Process requests with limited concurrency
    semaphore = asyncio.Semaphore(concurrency)
    
    async def limited_request(prompt):
        async with semaphore:
            return await make_request(prompt)
    
    tasks = [limited_request(prompt) for prompt in prompts]
    results = await asyncio.gather(*tasks)
    
    end_time = time.time()
    total_time = end_time - start_time
    
    rps = num_requests / total_time
    
    print(f"Requests: {num_requests}")
    print(f"Concurrency: {concurrency}")
    print(f"Total Time: {total_time:.2f}s")
    print(f"Throughput: {rps:.2f} requests/second")
    print("-" * 40)

# Test with different concurrency levels
async def main():
    await measure_throughput(100, concurrency=1)   # Sequential
    await measure_throughput(100, concurrency=10)  # 10 concurrent
    await measure_throughput(100, concurrency=50)  # 50 concurrent

asyncio.run(main())
# Expected: Higher concurrency = higher throughput (up to API rate limits)
```

## Common Misconceptions
- **Myth:** Higher throughput always means better performance.
- **Reality:** Throughput and latency are often trade-offs. Maximizing throughput (large batches) increases latency. You need to balance based on your use case.

- **Myth:** Throughput scales linearly with more GPUs.
- **Reality:** Throughput scales sub-linearly due to communication overhead, memory bottlenecks, and diminishing returns. Doubling GPUs doesn't always double throughput.

- **Myth:** Throughput is only important for large-scale systems.
- **Reality:** Even small systems need to understand throughput to plan capacity, optimize costs, and ensure they can handle growth.

- **Myth:** Cloud APIs have unlimited throughput.
- **Reality:** All APIs have rate limits (requests per minute, tokens per minute). You need to design for these constraints or negotiate higher limits.

## Related Terms
- [Latency](../latency/)
- [Inference](../inference/)
- [Scaling](../scaling/)
- [Batch Processing](../batch-processing/)

## Sources & Further Reading
- [vLLM: High-Throughput LLM Serving](https://vllm.readthedocs.io/)
- [NVIDIA Triton Inference Server](https://developer.nvidia.com/triton-inference-server)
- [Scaling LLM Inference (Anthropic)](https://www.anthropic.com/research)
