from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Perseus API",
    version="4.0.0-draft",
    description="Funnel stress tester — concept build, synthetic data only.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data below mirrors frontend/src/data.js so the two stay in lock-step.
COHORTS = {
    "hero":  {"key": "hero",  "name": "Left at the hero",          "trust": 0.24, "urg": 0.66, "skep": 0.87, "bud": 0.52, "dist": 0.31, "trend": "closest group",       "note": "They wanted it. Nothing on the page proved the claim, so skepticism held and they left while still interested. Fixing this is worth more than fixing any later step."},
    "email": {"key": "email", "name": "Left at welcome email",     "trust": 0.51, "urg": 0.38, "skep": 0.44, "bud": 0.49, "dist": 0.58, "trend": "stalled, not lost",   "note": "Attention scattered across equal-looking options and never settled. A recommendation instead of a menu would move this group."},
    "price": {"key": "price", "name": "Left at pricing",           "trust": 0.58, "urg": 0.55, "skep": 0.41, "bud": 0.88, "dist": 0.44, "trend": "close, price-blocked","note": "Trust was fine. The number arrived with no frame around it, and financing sits below where most people stop reading."},
    "cal":   {"key": "cal",   "name": "Left at the calendar",      "trust": 0.67, "urg": 0.19, "skep": 0.31, "bud": 0.44, "dist": 0.79, "trend": "no reason to act",    "note": "Convinced but unhurried. They intended to come back, and mostly did not. Lowest-value group to chase."},
    "won":   {"key": "won",   "name": "Booked",                    "trust": 0.83, "urg": 0.71, "skep": 0.18, "bud": 0.36, "dist": 0.09, "trend": "converted",           "note": "Trust cleared the bar before patience ran out. This is the state vector every fix is trying to reach."},
}

FUNNEL = [
    {"step": "Landing hero",      "sub": "/implants",              "leaves": 38, "friction": "TRUST-DEFICIT",      "distance": 0.31},
    {"step": "Welcome email 2/5", "sub": '"Which option is right"', "leaves": 21, "friction": "DECISION-PARALYSIS", "distance": 0.58},
    {"step": "Pricing page",      "sub": "/pricing",               "leaves": 17, "friction": "PRICE-OBJECTION",    "distance": 0.44},
    {"step": "Calendar",          "sub": "/book",                  "leaves": 12, "friction": "URGENCY-ABSENCE",    "distance": 0.79},
]

BOTTLENECKS = [
    {"id": "B1",  "problem": "No numeric promotion policy for variant winners",         "status": "OPEN",             "blocks": "promotion gate"},
    {"id": "B2",  "problem": "Funnel-stage normalization across different businesses",  "status": "OPEN · NOW FIRST", "blocks": "§6.3 pooling"},
    {"id": "B3",  "problem": "Niche clustering: industry label vs. empirical traits",   "status": "DIRECTION SET",    "blocks": "Layer 2"},
    {"id": "B4",  "problem": "Resistance decay needs a way to recognise repeated tactics","status": "REDUCED IN v3",  "blocks": "§7.4 · pre-tagged"},
    {"id": "B5",  "problem": "Pooling between directly competing businesses",           "status": "OPEN · MORE URGENT","blocks": "query-layer rule"},
    {"id": "B6",  "problem": "10^5 personas in <15 s within the per-job memory budget", "status": "UNVERIFIED",       "blocks": "§11 · de-risked by §4.2"},
    {"id": "B7",  "problem": "Synthetic significance never reported as real evidence",  "status": "DISCIPLINE",       "blocks": "every screen"},
    {"id": "B8",  "problem": "Voice/call channel ingestion",                            "status": "REMOVED §8",       "blocks": "consent law"},
    {"id": "B9",  "problem": "Gaze network has no training signal",                     "status": "OPEN",             "blocks": "§15 entire"},
    {"id": "B10", "problem": "Entropy <-> time constants (k, tau) uncalibrated",        "status": "OPEN",             "blocks": "§15.4"},
    {"id": "B11", "problem": "Attention temperature as function of drive-state",        "status": "DIRECTION SET",    "blocks": "§15.3"},
    {"id": "B12", "problem": "Hunger -> food-cue bias effect size contested",           "status": "CONTESTED",        "blocks": "prior only"},
]


class RunRequest(BaseModel):
    mode: str = "link"
    url: str | None = None
    business: str = "Ridgeline Dental"


@app.get("/api/health")
def health():
    return {"ok": True, "stage": "concept", "synthetic_only": True}


@app.post("/api/run")
def run(_: RunRequest):
    return {
        "ok": True,
        "run_id": "concept-0001",
        "population": 100_000,
        "ai_calls": 22,
        "note": "Synthetic run — no live traffic (B7).",
    }


@app.get("/api/cohorts")
def cohorts():
    return {"cohorts": COHORTS}


@app.get("/api/bottlenecks")
def bottlenecks():
    return {"bottlenecks": BOTTLENECKS, "open": 7, "direction_decided": 3, "decided": 1, "removed": 1}


@app.get("/api/report")
def report():
    return {
        "business": "Ridgeline Dental",
        "synthetic_only": True,
        "touchpoints": 22,
        "above_trigger": 3,
        "trigger_theta": 0.50,
        "conversion": {"current": 0.12, "projected": 0.16},
        "funnel": FUNNEL,
        "cohorts": COHORTS,
        "bottlenecks": BOTTLENECKS,
    }
