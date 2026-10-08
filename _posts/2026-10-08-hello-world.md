---
title: "Hello, world: checking the pipeline"
---

This placeholder post checks that every part of the blog works: text, code, math and images.

## Code

```python
import torch

def lora_forward(x, W, A, B, alpha, r):
    # Frozen weight plus low-rank update
    return x @ W.T + (alpha / r) * (x @ A.T @ B.T)
```

## Math

Inline: LoRA's update has rank at most $$r$$, with $$r \ll \min(d, k)$$.

Display:

$$
W' = W_0 + \Delta W = W_0 + \frac{\alpha}{r} B A, \qquad B \in \mathbb{R}^{d \times r},\; A \in \mathbb{R}^{r \times k}
$$

Cosine similarity between embeddings:

$$
\cos(\mathbf{q}, \mathbf{d}) = \frac{\mathbf{q} \cdot \mathbf{d}}{\lVert \mathbf{q} \rVert \, \lVert \mathbf{d} \rVert}
$$

## Diagram

![Retrieval pipeline]({{ "/assets/images/rag-pipeline.svg" | relative_url }})
