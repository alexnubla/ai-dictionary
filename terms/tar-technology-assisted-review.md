---
title: "TAR (Technology-Assisted Review)"
category: "Legal AI"
related: ["eDiscovery", "Machine Learning", "Human-in-the-Loop (HITL)", "Predictive Analytics"]
date_added: 2026-08-17
---

# TAR (Technology-Assisted Review)

A legal process in electronic discovery (eDiscovery) where machine learning algorithms are used to prioritize, classify, and review large volumes of documents for relevance and privilege.

## The Simple Version
Using AI to read and sort through millions of legal documents during a lawsuit to find the important ones, instead of forcing human lawyers to read every single page. You teach the AI what you are looking for, and it finds the rest.

## Detailed Explanation
Technology-Assisted Review (TAR), often referred to as "predictive coding," fundamentally changes the economics of litigation. Instead of linear, manual review, TAR uses supervised machine learning. A senior attorney reviews a small "seed set" of documents, coding them as relevant or not. The algorithm learns these patterns and applies them to the entire document corpus. 
- **TAR 1.0 (Simple Predictive Coding):** Uses a static seed set to train a model (usually a Support Vector Machine or Naive Bayes).
- **TAR 2.0 (Continuous Active Learning - CAL):** The model continuously learns from every document the reviewer codes, constantly re-ranking the remaining documents to surface the most likely relevant ones next.

## Key Characteristics
- **Human-in-the-Loop (HITL):** Requires expert human feedback to train and validate the model.
- **Defensibility:** The methodology must be statistically sound and defensible in court (e.g., proving the model achieved a certain recall rate).
- **Privilege Logging:** Often used in a second pass to identify documents protected by attorney-client privilege.

## Business Context
- **Massive Cost Reduction:** Reduces document review costs by 50-80%, which is typically the largest expense in civil litigation.
- **Faster Time-to-Production:** Allows legal teams to find the "smoking gun" documents in days rather than months.
- **Judicial Acceptance:** Widely accepted by courts globally (e.g., the landmark *Da Silva Moore* case in the US) as a standard, defensible practice.

## Real-World Analogy
A highly trained librarian. Instead of reading every book in a library of millions to find a specific topic, you give the librarian 100 examples of what you want. The librarian learns the pattern and instantly pulls the exact books you need from the millions of shelves.

## Code Example

```python
# Conceptual: Simulating a TAR 1.0 workflow using scikit-learn
# Training a model on a "seed set" to classify the rest of the document corpus.
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.pipeline import make_pipeline

# 1. The "Seed Set": A small batch of documents manually coded by a senior attorney
seed_data = pd.DataFrame({
    'text': ["Contract breach on page 4", "Lunch menu for Tuesday", "Email regarding the merger NDA", "Office supply order"],
    'relevant': [1, 0, 1, 0] # 1 = Relevant to the case, 0 = Not relevant
})

# 2. Build the TAR pipeline (TF-IDF + Support Vector Machine)
tar_model = make_pipeline(TfidfVectorizer(stop_words='english'), LinearSVC())

# 3. Train the model on the seed set
tar_model.fit(seed_data['text'], seed_data['relevant'])

# 4. Apply to the massive document corpus
corpus = ["Memo about the merger", "Gym membership receipt", "Draft of the settlement agreement"]
predictions = tar_model.predict(corpus)

for doc, pred in zip(corpus, predictions):
    print(f"Relevant: {bool(pred)} | Document: {doc}")
```

## Common Misconceptions
- **Myth:** TAR replaces lawyers.
- **Reality:** TAR replaces *manual, repetitive reading*. It elevates the role of the attorney to a strategic reviewer and quality controller.
- **Myth:** TAR is a "black box" that courts don't trust.
- **Reality:** When properly validated using statistical sampling (like the Binomial proportion confidence interval), TAR is highly defensible and often preferred over flawed manual review.

## Related Terms
- [eDiscovery](../ediscovery/)
- [Machine Learning](../machine-learning/)
- [Human-in-the-Loop (HITL)](../hitl/)
- [Predictive Analytics](../predictive-analytics/)

## Sources & Further Reading
- [The Sedona Conference: Commentary on Achieving Quality in the E-Discovery Process](https://thesedonaconference.org/)
- [Grossman, M.R., & Cormack, G.V. Technology-Assisted Review in E-Discovery Can Be More Effective and More Efficient Than Exhaustive Manual Review.](https://www.edrm.net/)
