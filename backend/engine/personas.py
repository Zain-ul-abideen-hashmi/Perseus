from __future__ import annotations

import numpy as np

# §4.3 population, built from named archetypes. Each persona is drawn from an
# archetype (a trait profile), and which archetypes arrive depends on the
# channel — search brings ready buyers, ads bring window shoppers, etc.
ARCHETYPES = {
    "ready":      {"name": "The Ready Buyer",   "blurb": "Came to buy — just needs the path cleared.",
                   "intent": .80, "trust": .55, "skepticism": .30, "budget": .35, "patience": .60, "reading_depth": .50, "price_sensitivity": .40, "impulse": .55},
    "skeptic":    {"name": "The Skeptic",       "blurb": "Wants it, won't believe a claim without proof.",
                   "intent": .60, "trust": .34, "skepticism": .82, "budget": .42, "patience": .55, "reading_depth": .72, "price_sensitivity": .46, "impulse": .30},
    "bargain":    {"name": "The Bargain Hunter", "blurb": "Price is the whole conversation.",
                   "intent": .55, "trust": .46, "skepticism": .46, "budget": .58, "patience": .50, "reading_depth": .46, "price_sensitivity": .86, "impulse": .46},
    "researcher": {"name": "The Researcher",    "blurb": "Methodical, compares everything, hates clutter.",
                   "intent": .52, "trust": .50, "skepticism": .56, "budget": .45, "patience": .72, "reading_depth": .86, "price_sensitivity": .50, "impulse": .22},
    "browser":    {"name": "The Window Shopper", "blurb": "Barely shopping — one distraction and it's gone.",
                   "intent": .26, "trust": .35, "skepticism": .50, "budget": .50, "patience": .32, "reading_depth": .35, "price_sensitivity": .55, "impulse": .76},
}

ARCHETYPE_KEYS = list(ARCHETYPES.keys())

# who arrives through each channel (weights over archetypes)
CHANNEL_ARCHETYPES = {
    "landing": {"ready": .35, "skeptic": .20, "researcher": .20, "bargain": .15, "browser": .10},
    "ads":     {"browser": .30, "skeptic": .25, "bargain": .20, "ready": .15, "researcher": .10},
    "social":  {"browser": .45, "bargain": .20, "skeptic": .15, "ready": .10, "researcher": .10},
    "email":   {"ready": .30, "researcher": .25, "skeptic": .20, "bargain": .15, "browser": .10},
}

_TRAITS = ["intent", "trust", "skepticism", "budget", "patience",
           "reading_depth", "price_sensitivity", "impulse"]


def _sample(rng, mean, n, spread=0.10):
    return np.clip(rng.normal(mean, spread, n), 0.02, 0.98)


def build_population(channel_mix: dict[str, float], n: int = 800, seed: int = 42) -> dict:
    rng = np.random.default_rng(seed)
    channels = list(channel_mix.keys()) or ["landing"]
    w = np.array([channel_mix[c] for c in channels], dtype=float)
    w = w / w.sum()
    ch_idx = rng.choice(len(channels), size=n, p=w)

    arche = np.empty(n, dtype=object)
    for i, ch in enumerate(channels):
        mask = ch_idx == i
        pref = CHANNEL_ARCHETYPES.get(ch, CHANNEL_ARCHETYPES["landing"])
        keys = list(pref.keys())
        probs = np.array([pref[k] for k in keys]); probs = probs / probs.sum()
        arche[mask] = rng.choice(keys, size=int(mask.sum()), p=probs)

    pop = {t: np.empty(n) for t in _TRAITS}
    for key in ARCHETYPE_KEYS:
        mask = arche == key
        if not mask.any():
            continue
        prof = ARCHETYPES[key]
        for t in _TRAITS:
            pop[t][mask] = _sample(rng, prof[t], int(mask.sum()))

    pop["urgency"] = _sample(rng, 0.20, n)          # built up by the funnel
    pop["archetype"] = arche
    pop["channel"] = np.array([channels[i] for i in ch_idx])
    pop["rng"] = rng
    pop["n"] = n
    return pop


def archetype_mix(pop: dict) -> dict[str, int]:
    arche = pop["archetype"]
    return {k: int((arche == k).sum()) for k in ARCHETYPE_KEYS}
