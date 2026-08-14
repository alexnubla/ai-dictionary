---
title: "Algorithmic Risk Assessment"
category: "Legal AI"
related: ["Bias", "Automated Decision-Making (ADM)", "Explainability / XAI", "High-Risk AI System"]
date_added: 2026-08-15
---

# Algorithmic Risk Assessment

The use of predictive algorithms and machine learning models, primarily within the criminal justice system, to evaluate an individual's likelihood of future offending (recidivism) or flight risk to inform bail, sentencing, and parole decisions.

## The Simple Version
Using a computer algorithm to calculate the likelihood of a person committing a future crime or failing to show up to court, which judges then use to help decide whether to grant bail or set a sentence.

## Detailed Explanation
Algorithmic risk assessments (like the widely used COMPAS tool) analyze historical data—such as criminal history, age, employment status, and sometimes social factors—to output a risk score. The goal is to introduce data-driven objectivity into judicial decisions, reducing human inconsistency and jail overcrowding. However, they are highly controversial due to concerns over due process, transparency, and embedded historical biases.

## Key Characteristics
- **Proxy Variables:** Models often use variables (like zip code or arrest history) that act as proxies for race or socioeconomic status, leading to disparate impact.
- **Due Process & Right to Explanation:** Defendants often cannot see the proprietary algorithm or the exact weight of the variables used to calculate their score, raising constitutional concerns.
- **Calibration vs. Error Rate Balance:** A model can be "calibrated" (a score of 7 means 70% risk for all groups) but still have unequal false positive rates across different demographics.

## Business Context
- **Judicial Efficiency:** Helps courts process high volumes of bail hearings quickly.
- **Civil Rights Litigation:** Heavy exposure to lawsuits alleging violations of the Equal Protection Clause or fair housing/credit laws if the model exhibits racial bias.
- **Regulatory Scrutiny:** Classified as a "High-Risk AI System" under the EU AI Act, requiring strict fundamental rights impact assessments and human oversight.

## Real-World Analogy
A credit score, but for a person's likelihood of re-offending. Just as a credit score uses financial history to predict loan repayment, a risk assessment uses criminal and demographic history to predict court appearance or re-arrest.

## Code Example

```python
# Conceptual: Auditing a Risk Assessment model for Disparate Impact using Fairlearn
# Checking if the model falsely flags one demographic group at a higher rate than another.
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from fairlearn.metrics import MetricFrame, false_positive_rate

# Mock dataset: Features, actual recidivism (y_true), model prediction (y_pred), and race (sensitive feature)
data = pd.DataFrame({
    'y_true': [0, 1, 0, 1, 0, 0, 1, 1],
    'y_pred': [0, 1, 1, 1, 0, 1, 1, 1], # Model predictions
    'race': ['A', 'B', 'A', 'B', 'A', 'B', 'A', 'B'] # Sensitive attribute
})

# Calculate False Positive Rate (FPR) grouped by race
# FPR = Out of the people who DID NOT re-offend, how many did the AI wrongly flag as high risk?
metric_frame = MetricFrame(
    metrics=false_positive_rate,
    y_true=data['y_true'],
    y_pred=data['y_pred'],
    sensitive_features=data['race']
)

print("False Positive Rates by Group:")
print(metric_frame.by_group)
# If Group A has an FPR of 0.33 and Group B has 0.0, the model is legally and ethically biased.
```

## Common Misconceptions
- **Myth:** Algorithms are completely objective and free of human bias.
- **Reality:** Algorithms are trained on historical data. If the historical justice system was biased, the algorithm will learn and automate that bias.
- **Myth:** The AI makes the final legal decision.
- **Reality:** Legally, these tools are advisory. The judge makes the final decision, though studies show judges are heavily influenced by the risk score.

## Related Terms
- [Bias](../bias/)
- [Automated Decision-Making (ADM)](../automated-decision-making/)
- [Explainability / XAI](../explainability/)
- [High-Risk AI System](../high-risk-ai-system/)

## Sources & Further Reading
- [ProPublica: Machine Bias (Investigation into COMPAS)](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing)
- [EU AI Act: Annex III (High-Risk AI Systems in Law Enforcement and Justice)](https://artificialintelligenceact.eu/)
