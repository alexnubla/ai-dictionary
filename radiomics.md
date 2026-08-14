---
title: "Radiomics"
category: "Healthcare AI"
related: ["Medical Imaging AI", "Computer Vision", "Diagnostic AI", "Clinical Prediction Model"]
date_added: 2026-08-15
---

# Radiomics

The high-throughput extraction of large numbers of quantitative features from radiographic medical images using data-characterization algorithms to build predictive and prognostic models.

## The Simple Version
Turning medical pictures (like CT or MRI scans) into massive spreadsheets of data. While a human doctor looks at a scan and sees a "tumor," Radiomics AI measures hundreds of invisible details about that tumor's shape, texture, and intensity to predict how it will behave, without needing a physical biopsy.

## Detailed Explanation
Radiomics operates on the premise that medical images contain rich, sub-visual information about underlying tissue pathology and genomics. The radiomics pipeline consists of several distinct steps:
- **Image Acquisition & Reconstruction:** Standardized scanning protocols to ensure consistency.
- **Segmentation:** Delineating the Region of Interest (ROI), either manually by a radiologist or automatically via AI.
- **Feature Extraction:** Computing hundreds to thousands of quantitative features (e.g., first-order statistics, texture matrices, and shape descriptors).
- **Model Building:** Using machine learning to correlate these features with clinical outcomes (e.g., survival rates, mutation status, or treatment response).

## Key Characteristics
- **High Dimensionality, Low Sample Size (HDLSS):** Radiomics datasets often have thousands of features but only hundreds of patients, requiring rigorous feature selection to prevent overfitting.
- **Reproducibility Challenges:** Features can be highly sensitive to variations in scanner manufacturers, reconstruction kernels, and imaging parameters.
- **Handcrafted vs. Deep Features:** Traditional radiomics uses mathematically defined, interpretable features. "Deep Radiomics" uses Convolutional Neural Networks (CNNs) to learn features automatically.

## Business Context
- **Non-Invasive Biopsies ("Virtual Biopsy"):** Predicting tumor genetics from a standard CT scan, saving patients from invasive surgical biopsies.
- **Treatment Response Monitoring:** Detecting subtle changes in tumor texture weeks before the tumor physically shrinks.
- **Clinical Trial Enrichment:** Identifying patients most likely to respond to a specific experimental drug, improving trial success rates.

## Real-World Analogy
Analyzing a painting. A casual observer sees a beautiful landscape. An art expert analyzes the exact brushstroke thickness, pigment chemical composition, and canvas weave to determine the painting's exact age, the artist's identity, and whether it's a forgery.

## Code Example

```python
# Conceptual: Extracting radiomic features using a library like PyRadiomics
from radiomics import featureextractor
import SimpleITK as sitk

def extract_tumor_features(image_path, mask_path):
    image = sitk.ReadImage(image_path)
    mask = sitk.ReadImage(mask_path)
    
    params = {
        'binWidth': 25,
        'featureClass': {
            'shape': [],
            'firstorder': [],
            'glcm': [], # Gray Level Co-occurrence Matrix (texture)
        }
    }
    extractor = featureextractor.RadiomicsFeatureExtractor(**params)
    result = extractor.execute(image, mask)
    
    return {
        'Volume': result['original_shape_Volume'],
        'Entropy': result['original_glcm_Entropy'] # Measures texture randomness
    }
```

## Common Misconceptions
- **Myth:** Radiomics is just another name for deep learning in imaging.
- **Reality:** Traditional radiomics relies on explicit, handcrafted mathematical features. Deep learning learns features implicitly. They are distinct methodologies.
- **Myth:** Radiomics models work universally across all hospitals.
- **Reality:** "Domain shift" is the biggest hurdle. A model trained on Siemens scanner data often fails on GE scanner data unless rigorous harmonization techniques are applied.

## Related Terms
- [Medical Imaging AI](../medical-imaging-ai/)
- [Computer Vision](../computer-vision/)
- [Diagnostic AI](../diagnostic-ai/)
- [Clinical Prediction Model](../clinical-prediction-model/)

## Sources & Further Reading
- [Lambin, P., et al. Radiomics: the bridge between medical imaging and personalized medicine. Nature Reviews Clinical Oncology](https://www.nature.com/articles/nrclinonc.2017.141)
- [PyRadiomics: An open-source Python package for radiomics](https://pyradiomics.readthedocs.io/)
