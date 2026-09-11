from __future__ import annotations

import numpy as np

from .schemas import REGIONS

# §16 Medusa's Gaze. A small attention network that reads a touchpoint's
# region features and decides where the eye lands. It is UNTRAINED (B9: no
# training signal yet), so its behaviour comes from a human reading-order
# prior plus a lightly-seeded feature layer — a real forward pass, honest
# about being illustrative. Swap the weights for a trained model later.

_FEATS = ["mass", "proof", "urgency", "price", "claim", "is_cta"]
_rng = np.random.default_rng(7)

_W1 = _rng.normal(0, 0.35, size=(len(_FEATS), 8))
_b1 = np.zeros(8)
_W2 = _rng.normal(0, 0.35, size=(8, 1))
_b2 = 0.0

# Hand prior: salience rises with visual mass / proof / claim; the eye reaches
# the CTA last (matches the mockup's "CTA reached last").
_FEATURE_BIAS = np.array([0.9, 0.7, 0.4, 0.3, 0.6, -0.8])
# Reading-order prior over regions [headline, hero, proof, price, cta].
_REGION_PRIOR = np.array([1.1, 0.8, 0.2, 0.0, -0.6])


def _softmax(x: np.ndarray) -> np.ndarray:
    e = np.exp(x - x.max())
    return e / e.sum()


def look(regions: dict[str, dict]) -> dict:
    """Forward pass over one touchpoint's regions.
    Returns attention weights, normalized fixation entropy H, the fixation
    order, and the appeal vector F_j the persona actually absorbs."""
    S = np.array([[regions[r][f] for f in _FEATS] for r in REGIONS])  # R x K
    hidden = np.tanh(S @ _W1 + _b1)
    learned = (hidden @ _W2).ravel() + _b2
    prior = S @ _FEATURE_BIAS + _REGION_PRIOR
    attn = _softmax(1.1 * prior + 0.6 * learned)

    R = len(REGIONS)
    H = float(-(attn * np.log(attn + 1e-9)).sum() / np.log(R))     # 0..1
    order = [REGIONS[i] for i in np.argsort(-attn)]
    gate = {REGIONS[i]: float(min(1.0, attn[i] * R)) for i in range(R)}
    return {
        "attention": {REGIONS[i]: float(attn[i]) for i in range(R)},
        "entropy": H,
        "order": order,
        "gate": gate,
    }


def absorb(feats: dict, gaze: dict) -> dict:
    """What the visitor takes in = touchpoint features gated by where the eye
    dwelled. This appeal vector F_j is what the simulation acts on."""
    g = gaze["gate"]
    return {
        "proof": feats["proof"] * (0.40 + 0.60 * g["proof"]),
        "price": feats["price"] * (0.40 + 0.60 * g["price"]),
        "urgency": feats["urgency"] * (0.40 + 0.60 * g["hero"]),
        "claim_gap": feats["claim_gap"] * (0.50 + 0.50 * g["headline"]),
        "clarity": feats["clarity"],
        "cta_strength": feats["cta_strength"] * (0.30 + 0.70 * g["cta"]),
        "choice": feats["choice"],
        "entropy": gaze["entropy"],
    }
