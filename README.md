# Perseus

A stress test for sales funnels — find what's costing you customers, rewrite it,
and prove the rewrite before it ships. This repo holds the **UI concept build**
(v4.0.0-draft) implemented against the design mockups.

> Concept / pre-implementation. All data on screen is **synthetic** — no live
> traffic, no real customers (spec §B7).

## Stack

- **Frontend** — Vite + React 18 (`frontend/`)
- **Backend** — FastAPI + Uvicorn (`backend/`)

The frontend renders fully on its own; it calls the FastAPI endpoints under
`/api` and falls back to bundled data when the backend isn't running.

## Run it

### 1. Frontend (Vite dev server → http://localhost:5173)

```bash
cd frontend
npm install
npm run dev
```

### 2. Backend (optional — FastAPI on http://127.0.0.1:8000)

```bash
cd backend
pip install -r requirements.txt
python run.py            # or: uvicorn backend.main:app --reload --port 8000
```

Vite proxies `/api/*` to the backend automatically (see `frontend/vite.config.js`).

In **PyCharm**: open the `perseus` folder as the project, right-click
`backend/run.py` → Run for the API, and run `npm run dev` in the terminal for the UI.

## What's in the UI

Four stages — **Sign in → Intake → Simulating → App** — and seven app screens:

| Screen | Spec | What it shows |
| --- | --- | --- |
| Touchpoint map | §6.2 | 22 touchpoints by channel × archetype, θ distribution |
| Variants & gate | §6.1 | SHAP attribution, Aegis Shield extraction gate, bandit arms, promotion gate |
| Simulation replay | §10 | Animated visitors flowing through the funnel, drop-off table |
| Who converts | §7 | Convertibility distribution + per-cohort state vectors (click a row) |
| Medusa's Gaze | §15 | Scanpath + heat, fixation entropy, perceived vs. real time |
| Bernard's Loop | §5 | Three-layer calibration, prior → posterior pull strength |
| Bottlenecks | §9 | The 16 tracked open problems |

Responsive: a full sidebar layout on desktop collapses to a sticky header +
scrollable bottom tab bar on tablet/phone, with every grid reflowing to a single
column. Honors `prefers-reduced-motion`.
