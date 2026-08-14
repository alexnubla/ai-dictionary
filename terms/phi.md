---
title: "PHI (Protected Health Information)"
category: "Healthcare AI"
related: ["HIPAA Compliance", "Data Privacy", "De-identification", "Security"]
date_added: 2026-08-13
---

# PHI (Protected Health Information)

Any individually identifiable health information held or transmitted by a covered entity or its business associate, in any form or media, whether electronic, paper, or oral, as defined by the HIPAA Privacy Rule in the United States.

## The Simple Version
PHI is any piece of health data that can be used to figure out *who* the patient is. It’s not just the medical diagnosis; it’s the diagnosis *plus* the patient's name, birth date, address, or even their IP address. If you can link the health information back to a specific person, it’s PHI, and it is heavily protected by law.

## Detailed Explanation
Under HIPAA, there are 18 specific identifiers that, when linked with health information, constitute PHI:
1. Names
2. Geographic subdivisions smaller than a state (e.g., street address, city, ZIP code)
3. All elements of dates (except year) directly related to an individual (birth date, admission date, etc.)
4. Telephone numbers
5. Fax numbers
6. Email addresses
7. Social Security numbers
8. Medical record numbers
9. Health plan beneficiary numbers
10. Account numbers
11. Certificate/license numbers
12. Vehicle identifiers and serial numbers
13. Device identifiers and serial numbers
14. Web Universal Resource Locators (URLs)
15. Internet Protocol (IP) address numbers
16. Biometric identifiers (fingerprints, voiceprints)
17. Full-face photographic images
18. Any other unique identifying number, characteristic, or code

**De-identification:** To use health data for AI training or research without patient consent, it must be de-identified. HIPAA provides two methods:
- **Safe Harbor:** Removal of all 18 identifiers listed above.
- **Expert Determination:** A qualified statistician certifies that the risk of re-identification is very small.

## Key Characteristics
- **Broad Definition:** Encompasses clinical, administrative, and even billing data.
- **Context-Dependent:** A standalone list of diseases is not PHI. A list of diseases linked to patient names *is* PHI.
- **Highly Regulated:** Unauthorized use or disclosure can result in massive civil and criminal penalties.
- **Persistent:** PHI protections apply regardless of the medium (cloud, on-premise, paper, or AI model weights).

## Business Context
Handling PHI correctly is the single biggest compliance risk for Healthcare AI companies:
- **BAA Requirement:** Any AI vendor processing PHI for a healthcare provider must sign a Business Associate Agreement (BAA), accepting legal liability for data breaches.
- **Cloud Architecture:** AI infrastructure must be HIPAA-compliant (e.g., encrypted at rest and in transit, strict access controls, audit logging).
- **Model Inversion Risk:** There is emerging research showing that some AI models can inadvertently "memorize" and regurgitate PHI from their training data, making de-identification a critical pre-processing step.
- **Global Equivalents:** Outside the US, similar concepts apply (e.g., "Special Category Data" under GDPR in Europe).

## Real-World Analogy
A sealed, confidential personnel file. The file itself isn't dangerous, but if it contains your name, salary, and performance reviews, it must be kept in a locked cabinet, and only authorized people can view it.

## Code Example

```python
# De-identifying text using Microsoft Presidio (Open Source PII/PHI detection)
# pip install presidio-analyzer presidio-anonymizer

from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine

# Sample clinical note containing PHI
clinical_note = """
Patient John Doe (SSN: 123-45-6789, DOB: 1980-05-15) 
presented to Mount Sinai Hospital on 2023-10-25 with acute chest pain. 
Contact: john.doe@email.com or 555-0198.
"""

# Initialize engines
analyzer = AnalyzerEngine()
anonymizer = AnonymizerEngine()

# Analyze the text to find PHI entities
analyzer_results = analyzer.analyze(text=clinical_note, language='en')

# Anonymize (redact or replace) the identified PHI
anonymized_result = anonymizer.anonymize(
    text=clinical_note,
    analyzer_results=analyzer_results,
    operators={"DEFAULT": "replace", "PERSON": "mask"} # Custom masking rules
)

print("--- Original ---")
print(clinical_note)
print("\n--- De-identified (Safe for AI Training) ---")
print(anonymized_result.text)

# Output will replace names, SSNs, dates, and emails with tags like <PERSON>, <US_SSN>, etc.
```

## Common Misconceptions
- **Myth:** If you remove the patient's name, the data is no longer PHI.
- **Reality:** A combination of ZIP code, birth year, and gender can uniquely identify a large percentage of the population. All 18 identifiers must be addressed.
- **Myth:** AI models can't "leak" PHI if the training data was de-identified.
- **Reality:** Advanced "model inversion" or "membership inference" attacks can sometimes extract training data from poorly regularized models. Robust de-identification and differential privacy are recommended.
- **Myth:** HIPAA only applies to hospitals and doctors.
- **Reality:** It applies to "Covered Entities" AND their "Business Associates." If your AI startup processes PHI for a hospital, you are legally bound by HIPAA.

## Related Terms
- [HIPAA Compliance](../hipaa-compliance/)
- [Data Privacy](../data-privacy/)
- [De-identification](../de-identification/)
- [Security](../security/)

## Sources & Further Reading
- [HHS.gov: Guidance on HIPAA & Cloud Computing](https://www.hhs.gov/hipaa/for-professionals/special-topics/cloud-computing/index.html)
- [Microsoft Presidio: Data Protection and De-identification](https://microsoft.github.io/presidio/)
- [HIPAA Journal: The 18 HIPAA Identifiers](https://www.hipaajournal.com/)
