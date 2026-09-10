from __future__ import annotations

import re

from .schemas import Touchpoint, REGIONS

PROOF = ["board-certified", "certified", "licensed", "accredited", "award", "reviews",
         "rated", "testimonial", "guarantee", "guaranteed", "warranty", "years",
         "experience", "trusted", "results", "case study", "before and after",
         "clinically", "proven", "verified", "insured", "%", "★", "5-star"]
URGENCY = ["now", "today", "limited", "hurry", "don't wait", "dont wait", "ends",
           "deadline", "spots", "act fast", "last chance", "only", "expires",
           "book now", "sale", "instant", "same-day", "same day", "immediately"]
PRICE = ["$", "price", "pricing", "cost", "fee", "financing", "afford", "affordable",
         "payment", "per month", "/mo", "budget", "quote", "estimate", "free"]
CLAIM = ["best", "#1", "number one", "leading", "premier", "advanced", "world-class",
         "unmatched", "revolutionary", "transform", "ultimate", "top", "expert",
         "trusted by thousands", "guaranteed"]
VAGUE = ["quality", "great", "amazing", "excellent", "professional", "solutions",
         "innovative", "seamless", "cutting-edge", "passion", "dedicated"]

_word = re.compile(r"[A-Za-z']+")
_sent = re.compile(r"[.!?]+")
_num = re.compile(r"\b\d[\d,\.]*\b")


def _syllables(word: str) -> int:
    word = word.lower()
    groups = re.findall(r"[aeiouy]+", word)
    n = len(groups)
    if word.endswith("e") and n > 1:
        n -= 1
    return max(1, n)


def _density(text: str, terms: list[str]) -> float:
    """Saturating presence measure — robust on short marketing copy, where
    length-normalization overweights a couple of keywords."""
    t = text.lower()
    hits = sum(t.count(term) for term in terms)
    return 1.0 - 0.6 ** hits


def readability_grade(text: str) -> float:
    words = _word.findall(text)
    if len(words) < 5:
        return 8.0
    sentences = max(1, len(_sent.findall(text)))
    syl = sum(_syllables(w) for w in words)
    w = len(words)
    return 0.39 * (w / sentences) + 11.8 * (syl / w) - 15.59


def _clamp(x: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, x))


def analyze(tp: Touchpoint) -> dict:
    """Read one touchpoint into a global feature dict plus a per-region matrix.
    Everything is a deterministic heuristic over the copy (offline, no API)."""
    full = " ".join([tp.headline, tp.body, " ".join(tp.ctas)]).strip()
    grade = readability_grade(full)
    words = len(_word.findall(full))
    nums = len(_num.findall(full))

    proof = _density(full, PROOF) + min(0.3, nums / 12)
    claim = _density(full, CLAIM)
    feats = {
        "proof": _clamp(proof),
        "urgency": _clamp(_density(full, URGENCY)),
        "price": _clamp(_density(full, PRICE)),
        "claim": _clamp(claim),
        "claim_gap": _clamp(claim - proof + 0.05),          # promised more than proven
        "clarity": _clamp(1 - (grade - 6) / 12),            # grade 6 = crystal, 18 = opaque
        "specificity": _clamp(min(1.0, nums / 6) - _density(full, VAGUE)),
        "choice": _clamp(max(0, len(tp.ctas) - 1) * 0.22 + min(0.3, tp.links / 50)),  # competing actions → paralysis
        "cta_strength": _clamp(0.9 if len(tp.ctas) == 1 else 0.6 if len(tp.ctas) == 2 else 0.3 if tp.ctas else 0.0),
        "grade": grade,
        "words": words,
    }

    rt = tp.region_text()
    regions = {}
    for r in REGIONS:
        text = rt.get(r, "")
        regions[r] = {
            "mass": _clamp(len(_word.findall(text)) / 120),
            "proof": _density(text, PROOF),
            "urgency": _density(text, URGENCY),
            "price": _density(text, PRICE),
            "claim": _density(text, CLAIM),
            "is_cta": 1.0 if r == "cta" and tp.ctas else 0.0,
        }
    return {"feats": feats, "regions": regions}
