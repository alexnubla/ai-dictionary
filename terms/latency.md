---
title: "Latency"
category: "Deployment"
related: ["Throughput", "Inference", "Temperature", "Context Window"]
date_added: 2026-08-12
---

# Latency

The time delay between when a request is sent to an AI system and when the first response (or complete response) is received — a critical performance metric that directly impacts user experience and system responsiveness.

## The Simple Version
Imagine calling a friend and asking them a question. Latency is how long it takes for them to start answering. 
- Low latency: They answer immediately (good for conversation)
- High latency: They pause for 10 seconds before answering (frustrating)

For AI systems, latency is the time between you hitting "send" and seeing the AI's response appear. In conversational AI, high latency makes the system feel slow and unresponsive. In batch processing, latency matters less since you're not waiting interactively.

## Detailed Explanation
Latency in AI systems is measured at multiple points and has significant implications for architecture and user experience.

**Types of Latency:**

**1. Time to First Token (TTFT):**
- Time from request submission to the first output token
- Critical for perceived responsiveness in chat applications
- Typical range: 100ms - 2 seconds for modern LLMs

**2. Time Between Tokens (Inter-Token Latency):**
- Time between consecutive output tokens
- Determines the "streaming" speed users see
- Typical range: 20-100ms per token

**3. Total Latency:**
- Time from request to complete response
- = TTFT + (number of output tokens × inter-token latency)
- Critical for applications requiring complete responses (APIs, batch processing)

**Factors Affecting Latency:**
- **Model Size:** Larger models are slower (more computation per token)
- **Context Length:** Longer inputs require more processing (quadratic attention in standard Transformers)
- **Hardware:** GPUs, TPUs, and specialized accelerators reduce latency
- **Optimization:** Quantization, pruning, and speculative decoding can reduce latency
- **Network:** Network latency between client and API server
- **Queue Time:** Time spent waiting in request queues during high load

**Latency Benchmarks (2026):**
- **GPT-4o:** ~300ms TTFT, ~30ms per token
- **Claude 3.5 Sonnet:** ~500ms TTFT, ~40ms per token
- **Llama 3.1 70B (optimized):** ~200ms TTFT, ~25ms per token
- **Small models (7B-8B):** ~50ms TTFT, ~10ms per token

**Latency vs. Quality Trade-offs:**
- **Lower Latency:** Smaller models, quantization, fewer reasoning steps
- **Higher Quality:** Larger models, extended reasoning (LRMs), more context
- **Decision:** Balance based on use case (chat needs low latency; analysis can tolerate higher latency)

## Key Characteristics
- **User-Facing:** Directly impacts perceived system responsiveness
- **Measurable:** Can be precisely quantified and monitored
- **Variable:** Depends on model, hardware, load, and input complexity
- **Optimizable:** Can be reduced through various techniques
- **Cost-Linked:** Lower latency often requires more expensive infrastructure

## Business Context
Latency is a critical factor in enterprise AI deployment and user experience:

**Why Latency Matters:**
- **User Experience:** High latency frustrates users and reduces adoption
- **Competitive Advantage:** Faster systems win users (studies show 100ms delay reduces engagement by 7%)
- **SLA Requirements:** Enterprise contracts often specify maximum latency thresholds
- **Cost Implications:** Low-latency infrastructure is more expensive
- **Use Case Dependent:** Chat needs <1s TTFT; batch processing can tolerate minutes

**Latency Requirements by Use Case:**
- **Real-time Chat:** <500ms TTFT, <50ms per token
- **Voice Assistants:** <200ms TTFT (must feel instantaneous)
- **Code Completion:** <300ms total latency
- **Document Analysis:** <5 seconds acceptable
- **Batch Processing:** Minutes to hours acceptable

**Optimization Strategies:**
- **Model Selection:** Use smaller, faster models for latency-critical tasks
- **Caching:** Cache frequent queries to avoid reprocessing
- **Streaming:** Return tokens as they're generated (reduces perceived latency)
- **Edge Deployment:** Run models closer to users to reduce network latency
- **Speculative Decoding:** Use small models to predict tokens, verify with large model
- **Quantization:** Reduce model precision (FP16 → INT8 → INT4) for faster inference

**Monitoring and Alerting:**
- Track P50, P95, P99 latency percentiles
- Set alerts for latency spikes
- Monitor latency trends over time
- Correlate latency with load and model version

## Real-World Analogy
Ordering food at a restaurant. 
- **Low latency:** Fast food — you order and get food in 2 minutes (good for quick meals)
- **Medium latency:** Casual dining — you wait 15-20 minutes (acceptable for a meal)
- **High latency:** Fine dining — you wait 45+ minutes (acceptable for a special occasion)

Each has its place. You wouldn't want fine dining latency when you're hungry and in a hurry, but you'd accept it for a celebration dinner. Similarly, AI latency requirements depend on the context.

## Code Example

```python
# Measuring latency for AI API calls
import time
from openai import OpenAI

client = OpenAI()

def measure_latency(prompt: str, model: str = "gpt-4o"):
    """Measure time to first token and total latency."""
    
    start_time = time.time()
    
    # Streaming response to measure TTFT
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        stream=True
    )
    
    first_token_time = None
    token_count = 0
    
    for chunk in response:
        if chunk.choices[0].delta.content:
            if first_token_time is None:
                first_token_time = time.time()
            token_count += 1
    
    end_time = time.time()
    
    ttft = first_token_time - start_time
    total_time = end_time - start_time
    tokens_per_second = token_count / (total_time - ttft) if total_time > ttft else 0
    
    print(f"Model: {model}")
    print(f"Time to First Token: {ttft*1000:.0f}ms")
    print(f"Total Latency: {total_time*1000:.0f}ms")
    print(f"Tokens Generated: {token_count}")
    print(f"Generation Speed: {tokens_per_second:.1f} tokens/sec")
    print("-" * 40)

# Test with different prompts
measure_latency("What is 2+2?")
measure_latency("Write a detailed essay about the history of artificial intelligence.")
```

## Common Misconceptions
- **Myth:** Lower latency always means better user experience.
- **Reality:** For complex tasks (analysis, research), users prefer a slower, more accurate response over a fast, shallow one. Latency requirements are use-case dependent.

- **Myth:** Latency is only about the model.
- **Reality:** Latency includes network time, queue time, preprocessing, model inference, and postprocessing. Optimizing just the model won't solve all latency issues.

- **Myth:** You can't have both low latency and high quality.
- **Reality:** With proper optimization (caching, edge deployment, model selection), you can achieve both. It requires architectural investment, but it's possible.

- **Myth:** Latency doesn't matter for batch processing.
- **Reality:** While batch processing tolerates higher latency, extremely high latency (hours) can delay business decisions and reduce the value of time-sensitive insights.

## Related Terms
- [Throughput](../throughput/)
- [Inference](../inference/)
- [Temperature](../temperature/)
- [Context Window](../context-window/)

## Sources & Further Reading
- [OpenAI API Latency Documentation](https://platform.openai.com/docs/guides/rate-limits)
- [Optimizing LLM Inference Latency (vLLM)](https://blog.vllm.ai/)
- [The Impact of Latency on User Experience (Google Research)](https://research.google/)
