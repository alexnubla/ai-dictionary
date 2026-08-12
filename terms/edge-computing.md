---
title: "Edge Computing"
category: "Deployment"
related: ["Latency", "Quantization", "On-Device AI", "Privacy"]
date_added: 2026-08-12
---

# Edge Computing

A deployment paradigm where AI inference occurs on local devices (phones, IoT devices, browsers, edge servers) rather than centralized cloud infrastructure, enabling low-latency, privacy-preserving, and offline-capable AI applications.

## The Simple Version
Cloud AI is like calling a expert consultant in another city every time you have a question — powerful but slow and requires internet.

Edge AI is like having a knowledgeable assistant right next to you — instant answers, works offline, and your data never leaves the room.

Edge computing brings AI to the device itself, enabling real-time processing without cloud dependency.

## Detailed Explanation
Edge computing for AI involves running models on devices at the "edge" of the network — phones, laptops, IoT devices, cars, browsers — rather than sending data to remote cloud servers.

**Key Enablers:**
- **Model Quantization:** Shrinking models to fit on device (INT4, INT8)
- **Efficient Architectures:** Mobile-optimized models (MobileNet, EfficientNet)
- **Hardware Acceleration:** NPUs, TPUs, and specialized AI chips in devices
- **Web Technologies:** WebGPU, WebAssembly for browser-based inference

**Deployment Options:**
- **On-Device:** Model runs entirely on the device (phone, laptop)
- **Edge Server:** Model runs on a nearby server (factory, retail store)
- **Browser-Based:** Model runs in web browser via WebGPU/WASM
- **Hybrid:** Some processing on device, some in cloud

**Trade-offs:**
- **Advantages:** Low latency, privacy, offline capability, reduced bandwidth
- **Limitations:** Limited compute, smaller models, harder to update

## Key Characteristics
- **Low Latency:** No network round-trip, immediate responses
- **Privacy:** Data stays on device, never sent to cloud
- **Offline Capability:** Works without internet connection
- **Bandwidth Savings:** No data transmission costs
- **Hardware Constraints:** Limited by device compute and memory

## Business Context
Edge AI enables new categories of applications and addresses key enterprise concerns:

**Use Cases:**
- **Mobile AI:** On-device assistants, photo enhancement, real-time translation
- **IoT:** Smart cameras, predictive maintenance, industrial automation
- **Automotive:** Autonomous driving, driver assistance systems
- **Retail:** In-store analytics, smart shelves, personalized experiences
- **Healthcare:** Wearable health monitoring, point-of-care diagnostics

**Strategic Benefits:**
- **Privacy Compliance:** Meet GDPR, HIPAA by keeping data local
- **Cost Reduction:** Eliminate cloud inference costs and bandwidth fees
- **User Experience:** Instant responses, works offline
- **Competitive Advantage:** Unique on-device capabilities

**Challenges:**
- **Model Size:** Must fit on device (typically <1GB)
- **Update Management:** Distributing model updates to millions of devices
- **Hardware Fragmentation:** Different devices have different capabilities
- **Development Complexity:** Requires specialized optimization skills

## Real-World Analogy
A pocket calculator vs. a mainframe computer. The mainframe (cloud) is incredibly powerful but requires you to walk to the computer room, submit your calculation, and wait for results. The pocket calculator (edge) is less powerful but gives you instant answers right in your hand, anywhere, anytime.

## Code Example

```python
# Running a quantized model on-device using ONNX Runtime
import onnxruntime as ort
import numpy as np

# Load a quantized ONNX model (optimized for edge devices)
session = ort.InferenceSession("model_quantized.onnx")

# Prepare input
input_data = np.random.randn(1, 3, 224, 224).astype(np.float32)
input_name = session.get_inputs()[0].name

# Run inference on device (CPU, NPU, or GPU)
outputs = session.run(None, {input_name: input_data})

print("Inference completed on device")
print("Output shape:", outputs[0].shape)

# This runs entirely on the device - no cloud, no internet required
```

## Common Misconceptions
- **Myth:** Edge AI is as powerful as cloud AI.
- **Reality:** Edge devices have limited compute, so models must be smaller and less capable. Edge AI excels at specific tasks but can't match frontier cloud models for complex reasoning.

- **Myth:** Edge AI replaces cloud AI.
- **Reality:** They're complementary. Edge handles latency-sensitive, privacy-critical tasks; cloud handles complex, compute-intensive tasks. Many systems use hybrid approaches.

- **Myth:** Edge AI is only for mobile phones.
- **Reality:** Edge AI spans phones, laptops, IoT devices, cars, industrial equipment, browsers, and edge servers. Any device with compute can run edge AI.

## Related Terms
- [Latency](../latency/)
- [Quantization](../quantization/)
- [Inference](../inference/)

## Sources & Further Reading
- [ONNX Runtime: Cross-Platform Inference](https://onnxruntime.ai/)
- [TensorFlow Lite: On-Device Machine Learning](https://www.tensorflow.org/lite)
- [WebGPU: GPU Access in the Browser](https://www.w3.org/TR/webgpu/)
