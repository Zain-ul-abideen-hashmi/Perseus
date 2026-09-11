from __future__ import annotations

import numpy as np

# §5 Bernard's Loop — layered calibration as three stacked weight matrices.
# Each maps the appeal vector F_j onto changes in the persona state vector.
#   L1 global   : published CRO / persuasion priors
#   L2 niche    : a cluster (vertical) adjustment
#   L3 personal : shrinkage toward THIS business's own observed results,
#                 pulled by λ = n / (n + K) so a little data nudges, not owns.
STATE = ["trust", "urgency", "skepticism", "budget"]
APPEAL = ["proof", "urgency", "price", "claim_gap", "clarity", "cta_strength"]

# rows = state, cols = appeal
_L1 = np.array([
    # proof  urg   price  claim  clar   cta
    [ 0.90, 0.00, -0.10, -0.75,  0.20,  0.10],   # trust
    [ 0.00, 0.90,  0.10,  0.00,  0.00,  0.25],   # urgency
    [-0.70, 0.05,  0.15,  0.90, -0.20,  0.00],   # skepticism
    [-0.10, 0.00,  0.90,  0.05,  0.00,  0.00],   # budget
])

# cluster C-04 adjustment (dental-like): proof carries more, price bites more
_L2 = np.array([
    [ 0.25, 0.00,  0.00,  0.00,  0.00,  0.00],
    [ 0.00, 0.00,  0.00,  0.00,  0.00,  0.00],
    [-0.15, 0.00,  0.00,  0.00,  0.00,  0.00],
    [ 0.00, 0.00,  0.15,  0.00,  0.00,  0.00],
])

# what this business's live arms suggest (proof wins here) — a target delta
_L3 = np.array([
    [ 0.40, 0.00,  0.00,  0.00,  0.00,  0.00],
    [ 0.00, 0.00,  0.00,  0.00,  0.00,  0.00],
    [-0.30, 0.00,  0.00,  0.00,  0.00,  0.00],
    [ 0.00, 0.00,  0.00,  0.00,  0.00,  0.00],
])


def build_bernard(n_obs: int = 14, k: int = 60):
    lam = n_obs / (n_obs + k)
    niche = _L2
    personal = lam * _L3
    W = _L1 + niche + personal

    gm, nm, pm = np.linalg.norm(_L1), np.linalg.norm(niche), np.linalg.norm(personal)
    tot = gm + nm + pm or 1.0

    # per-trait pull: the proof-response mapped to 0..1 (tanh, so it never
    # saturates), prior = cluster prior (L1+L2), posterior = after personal pull
    prior_row = _L1 + niche
    pull = []
    for i, s in enumerate(STATE):
        prior = float(0.5 + 0.5 * np.tanh(prior_row[i, 0]))
        post = float(0.5 + 0.5 * np.tanh(W[i, 0]))
        pull.append({"trait": s, "prior": round(prior, 2), "posterior": round(post, 2)})

    meta = {
        "state": STATE, "appeal": APPEAL,
        "matrix": [[round(float(x), 2) for x in row] for row in W],
        "layers": {
            "global": round(100 * gm / tot, 1),
            "niche": round(100 * nm / tot, 1),
            "personal": round(100 * pm / tot, 1),
        },
        "n_obs": n_obs, "lambda": round(lam, 3),
        "pull": pull,
    }
    return W, meta
