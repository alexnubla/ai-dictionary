---
title: "NER (Named Entity Recognition)"
category: "Architecture"
related: ["Natural Language Processing (NLP)", "Information Extraction", "Transformer", "Text Classification"]
date_added: 2026-08-18
---

# NER (Named Entity Recognition)

A subtask of Natural Language Processing that involves identifying and classifying specific, real-world objects (entities) mentioned in unstructured text into predefined categories like names, organizations, dates, and locations.

## The Simple Version
Teaching a computer to read a sentence and highlight the "who, what, where, and when." If you feed it a news article, NER will automatically tag "Apple" as a Company, "Tim Cook" as a Person, and "Cupertino" as a Location.

## Detailed Explanation
NER transforms unstructured text into structured data. It typically uses sequence labeling models (like BiLSTM-CRF or fine-tuned Transformers like BERT) to assign a specific tag (e.g., B-PER, I-PER for Person) to every token in a sentence. It is a foundational step for building knowledge graphs and powering search engines.

## Key Characteristics
- **Token Classification:** Operates at the word or sub-word level, requiring context from surrounding words to resolve ambiguity (e.g., "Apple" the fruit vs. "Apple" the company).
- **Nested Entities:** Advanced NER handles overlapping entities (e.g., "[Bank of [America]]").
- **Domain Specificity:** Models trained on news data often fail on medical or legal text without domain-specific fine-tuning.

## Business Context
- **Automated Data Entry:** Extracting invoice numbers, dates, and vendor names from thousands of PDFs automatically.
- **Customer Support:** Automatically routing tickets by detecting product names or specific error codes in user emails.
- **Financial Analysis:** Scanning earnings call transcripts to extract competitor names and revenue figures instantly.

## Real-World Analogy
A highly efficient legal assistant reading a 100-page contract and using three different colored highlighters to mark all the dates in yellow, all the people in pink, and all the monetary values in green.

## Code Example

```python
# Conceptual: NER using spaCy
import spacy

# Load the English NLP model
nlp = spacy.load("en_core_web_sm")

text = "Alex Nubla founded the AI Dictionary in San Francisco on August 18, 2026."
doc = nlp(text)

for ent in doc.ents:
    print(f"Entity: {ent.text} | Label: {ent.label_} | Description: {spacy.explain(ent.label_)}")

# Output:
# Entity: Alex Nubla | Label: PERSON
# Entity: San Francisco | Label: GPE (Geopolitical Entity)
# Entity: August 18, 2026 | Label: DATE
```

## Common Misconceptions
- **Myth:** NER is just a simple dictionary lookup.
- **Reality:** It requires deep contextual understanding. "I saw a bat" (animal) vs "I saw a bat" (sports equipment) requires context to classify correctly if it's an entity.
- **Myth:** NER models work perfectly out of the box for any industry.
- **Reality:** Generic models struggle with jargon. A medical NER model needs to be trained on clinical notes to recognize drug names and diseases.

## Related Terms
- [Natural Language Processing (NLP)](../nlp/)
- [Information Extraction](../information-extraction/)
- [Text Classification](../text-classification/)

## Sources & Further Reading
- [Tjong Kim Sang, E. F., & De Meulder, F. Introduction to the CoNLL-2003 Shared Task. CoNLL 2003](https://aclanthology.org/)
