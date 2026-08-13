---
title: "Federated Learning"
category: "Training"
related: ["Data Privacy", "Distributed Training", "Edge Computing", "Differential Privacy"]
date_added: 2026-08-13
---

# Federated Learning

A decentralized machine learning technique where models are trained across multiple devices or servers holding local data samples, without exchanging the raw data itself — enabling collaborative model training while preserving data privacy and security.

## The Simple Version
Imagine 100 hospitals around the world each want to build an AI that detects a rare disease. The problem? Patient records can't be shared due to privacy laws.

In traditional machine learning, you'd need to collect all the patient data into one giant database — a legal and ethical nightmare.

Federated Learning flips this on its head. Instead of moving the data to the model, you move the model to the data. Each hospital trains a local copy of the model on its own patients' records. Then, instead of sharing the patient data, each hospital shares only the *learned model updates* (the mathematical changes to the model's weights). A central server combines all these updates into a single, improved global model, and sends it back to the hospitals.

The result? A powerful AI trained on the collective knowledge of all 100 hospitals, without a single patient record ever leaving its home hospital.

## Detailed Explanation
Introduced by McMahan et al. at Google in 2016 (initially for improving keyboard prediction on Android phones), Federated Learning addresses the fundamental tension between AI's data hunger and privacy regulations.

**The Federated Learning Process:**

**1. Initialization:**
- A global model is initialized on a central server
- The model is sent to participating client devices (phones, hospitals, banks)

**2. Local Training:**
- Each client trains the model on its local data
- No raw data leaves the device
- Only model updates (gradients or weights) are computed

**3. Aggregation:**
- The central server collects updates from all clients
- Updates are combined using an aggregation algorithm (most commonly **FedAvg** - Federated Averaging)
- The global model is updated with the aggregated knowledge

**4. Iteration:**
- The improved global model is sent back to clients
- Process repeats for many rounds until convergence

**Key Challenges:**

**1. Non-IID Data:**
- Each client's data is not independently and identically distributed
- Hospital A might see different patient demographics than Hospital B
- This "statistical heterogeneity" makes aggregation harder

**2. Systems Heterogeneity:**
- Clients have different hardware, network speeds, and availability
- Some phones may drop out mid-training ("stragglers")

**3. Communication Efficiency:**
- Sending model updates over networks is expensive
- Techniques like compression and quantization reduce bandwidth

**4. Privacy Guarantees:**
- Model updates can still leak information about training data
- **Differential Privacy** adds mathematical noise to updates to prevent this
- **Secure Multi-Party Computation** allows aggregation without any single party seeing others' updates

**Popular Frameworks:**
- **Flower (Flwr):** Open-source federated learning framework
- **PySyft:** OpenMined's privacy-preserving ML library
- **TensorFlow Federated:** Google's federated learning library
- **NVIDIA FLARE:** Enterprise-grade federated learning platform

## Key Characteristics
- **Privacy-Preserving:** Raw data never leaves the local device
- **Decentralized:** Training happens across many locations simultaneously
- **Collaborative:** Multiple parties contribute to a shared model
- **Communication-Intensive:** Requires efficient aggregation strategies
- **Regulatory-Friendly:** Aligns with GDPR, HIPAA, and other data protection laws

## Business Context
Federated Learning unlocks AI applications that were previously impossible due to privacy constraints:

**Enterprise Applications:**
- **Healthcare:** Multi-hospital collaborative training for diagnostic models without sharing patient records
- **Finance:** Banks collaborating on fraud detection models without exposing customer transactions
- **Mobile:** Google's Gboard uses federated learning to improve next-word prediction across billions of phones
- **IoT:** Smart devices learning from local usage patterns without sending data to the cloud
- **Manufacturing:** Multiple factories training defect detection models while keeping proprietary processes private

**Strategic Benefits:**
- **Regulatory Compliance:** Enables AI in highly regulated industries (healthcare, finance)
- **Competitive Collaboration:** Competitors can collaborate on shared problems (e.g., fraud detection) without revealing proprietary data
- **Data Sovereignty:** Data stays within organizational or geographic boundaries
- **Reduced Liability:** Less centralized data means smaller attack surface for breaches

**Cost Considerations:**
- **Communication Costs:** Aggregating model updates across networks can be expensive
- **Compute Distribution:** Each client needs sufficient compute for local training
- **Coordination Overhead:** Managing thousands of heterogeneous clients requires sophisticated orchestration
- **ROI:** Often justified by enabling AI in otherwise impossible scenarios (e.g., multi-hospital medical AI)

## Real-World Analogy
A group of chefs from different countries collaborating on a new recipe. Each chef experiments in their own kitchen using their own local ingredients. They don't share their ingredient lists or recipes (the raw data). Instead, they share only what they learned: "Adding more garlic improved the flavor." A master chef combines all these insights into a universal recipe that works everywhere. The final recipe benefits from everyone's expertise, but no one's secret ingredients were revealed.

## Code Example

```python
# Federated Learning using Flower framework (simplified)
import flwr as fl
import torch
import torch.nn as nn
from collections import OrderedDict

# Define a simple neural network
class SimpleNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)
    
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        return self.fc2(x)

# Define a Federated Learning client
class FLCient(fl.client.NumPyClient):
    def __init__(self, local_data, model):
        self.local_data = local_data  # Data NEVER leaves this device
        self.model = model
    
    def get_parameters(self, config):
        # Extract model weights to send to server
        return [val.cpu().numpy() for _, val in self.model.state_dict().items()]
    
    def set_parameters(self, parameters):
        # Receive global model weights from server
        params_dict = zip(self.model.state_dict().keys(), parameters)
        state_dict = OrderedDict({k: torch.tensor(v) for k, v in params_dict})
        self.model.load_state_dict(state_dict, strict=True)
    
    def fit(self, parameters, config):
        # 1. Receive global model
        self.set_parameters(parameters)
        
        # 2. Train on LOCAL data only (privacy preserved!)
        optimizer = torch.optim.SGD(self.model.parameters(), lr=0.01)
        for epoch in range(5):
            for data, target in self.local_data:
                optimizer.zero_grad()
                output = self.model(data)
                loss = nn.CrossEntropyLoss()(output, target)
                loss.backward()
                optimizer.step()
        
        # 3. Return only the UPDATED WEIGHTS (not the data!)
        return self.get_parameters(config), len(self.local_data), {}

# Start the federated learning client
# In production, this would run on a phone, hospital server, or bank
fl.client.start_numpy_client(
    server_address="127.0.0.1:8080",
    client=FLClient(local_data=my_private_data, model=SimpleNet())
)

# The central server (Flower server) aggregates updates from all clients
# using Federated Averaging (FedAvg) to create an improved global model
```

## Common Misconceptions
- **Myth:** Federated Learning is 100% private and secure.
- **Reality:** Model updates can still leak information about training data through "gradient inversion attacks." For strong privacy guarantees, Federated Learning must be combined with Differential Privacy or Secure Aggregation.

- **Myth:** Federated Learning is slower than centralized training.
- **Reality:** While communication adds overhead, the parallel nature of local training can actually be faster for large-scale deployments. The trade-off is between communication cost and privacy benefits.

- **Myth:** Federated Learning only works for mobile phones.
- **Reality:** While popularized by Google's mobile keyboard, federated learning is used in healthcare, finance, IoT, and enterprise settings. Any scenario with distributed, private data can benefit.

- **Myth:** Federated Learning produces models as accurate as centralized training.
- **Reality:** Due to non-IID data and communication constraints, federated models may achieve slightly lower accuracy than centralized models trained on the same total data. However, the privacy benefits often outweigh this small performance gap.

## Related Terms
- [Data Privacy](../data-privacy/)
- [Edge Computing](../edge-computing/)
- [Differential Privacy](../differential-privacy/)
- [Distributed Training](../distributed-training/)

## Sources & Further Reading
- [Communication-Efficient Learning of Deep Networks from Decentralized Data (McMahan et al., 2016)](https://arxiv.org/abs/1602.05629)
- [Flower: A Friendly Federated Learning Framework](https://flower.dev/)
- [Advances and Open Problems in Federated Learning (Kairouz et al., 2021)](https://arxiv.org/abs/1912.04977)
