---
title: "Semantic Search"
category: "Deployment"
related: ["Embedding", "Vector Database", "RAG", "Information Retrieval"]
date_added: 2026-08-12
---

# Semantic Search

A search methodology that retrieves results based on the meaning and intent of a query rather than exact keyword matches, using vector embeddings to capture semantic relationships between concepts.

## The Simple Version
Traditional search is like looking for a book by its exact title. If you search "artificial intelligence," you only find books with those exact words.

Semantic search is like asking a librarian "books about smart machines." The librarian understands you might want books about AI, robotics, machine learning, or even philosophy of mind — even if those exact words don't appear in your query. It searches by meaning, not just keywords.

## Detailed Explanation
Semantic search works by converting both queries and documents into high-dimensional vector embeddings, then finding documents whose embeddings are most similar to the query embedding.

**The Pipeline:**
1. **Embedding Generation:** Convert documents into vectors using a model like Sentence-BERT or OpenAI embeddings
2. **Indexing:** Store vectors in a vector database with efficient similarity search (HNSW, IVF)
3. **Query Embedding:** Convert user query into a vector
4. **Similarity Search:** Find top-K most similar vectors using cosine similarity or other metrics
5. **Result Ranking:** Return documents ranked by semantic similarity

**Hybrid Search:**
Modern systems combine semantic search with traditional keyword search (BM25) to get the best of both worlds:
- **Keyword search:** Exact matches, good for specific terms, codes, names
- **Semantic search:** Conceptual matches, good for meaning and intent

**Key Metrics:**
- **Cosine Similarity:** Angle between vectors (most common)
- **Euclidean Distance:** Straight-line distance
- **Dot Product:** Useful when vectors are normalized

## Key Characteristics
- **Meaning-Based:** Retrieves conceptually similar content, not just lexical matches
- **Context-Aware:** Understands synonyms, paraphrases, and related concepts
- **Embedding-Dependent:** Quality depends on the embedding model used
- **Scalable:** Vector databases enable fast search over billions of documents

## Business Context
Semantic search is transforming enterprise information retrieval:

**Applications:**
- **Enterprise Search:** Find relevant documents across wikis, SharePoint, drives
- **Customer Support:** Match user questions to knowledge base articles by meaning
- **E-commerce:** Product discovery based on intent, not just keywords
- **Legal Research:** Find relevant cases and contracts by concept
- **Healthcare:** Match patient symptoms to medical literature

**ROI Drivers:**
- **Productivity:** Employees find information 3-5x faster
- **Customer Satisfaction:** Support agents resolve issues faster with better search
- **Discovery:** Uncover relevant content that keyword search misses

## Real-World Analogy
A knowledgeable concierge at a hotel. You say "I want to see something beautiful and historic." The concierge doesn't search for "beautiful historic" — they understand you might want museums, historic districts, architectural landmarks, or scenic viewpoints. They retrieve options based on meaning.

## Code Example

```python
# Semantic search using sentence-transformers and FAISS
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Documents to search
documents = [
    "The cat sat on the mat",
    "A feline rested on the rug",
    "Dogs are loyal companions",
    "Python is a programming language",
    "Machine learning models learn from data"
]

# Create embeddings
doc_embeddings = model.encode(documents)

# Build FAISS index
dimension = doc_embeddings.shape[1]
index = faiss.IndexFlatL2(dimension)
index.add(doc_embeddings.astype('float32'))

# Search query
query = "kitten sitting on carpet"
query_embedding = model.encode([query])

# Find most similar documents
distances, indices = index.search(query_embedding.astype('float32'), k=3)

print("Query:", query)
print("Top results:")
for idx in indices[0]:
    print(f"  - {documents[idx]}")
# Returns: "The cat sat on the mat", "A feline rested on the rug"
# Even though query used different words ("kitten", "carpet")
```

## Common Misconceptions
- **Myth:** Semantic search replaces keyword search.
- **Reality:** They're complementary. Keyword search excels at exact matches (product codes, names); semantic search excels at conceptual matches. Hybrid search combines both.

- **Myth:** Semantic search always gives better results.
- **Reality:** Quality depends on the embedding model. Poor embeddings lead to poor semantic search. Domain-specific embedding models often outperform general-purpose ones.

- **Myth:** Semantic search understands language like humans.
- **Reality:** It captures statistical patterns in embeddings, not true understanding. It can miss nuances or make unexpected connections.

## Related Terms
- [Embedding](../embedding/)
- [Vector Database](../vector-database/)
- [RAG](../rag/)

## Sources & Further Reading
- [Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks](https://arxiv.org/abs/1908.10084)
- [FAISS: A Library for Efficient Similarity Search](https://github.com/facebookresearch/faiss)
