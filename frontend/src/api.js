// Every call falls back to bundled data when the FastAPI backend is offline.
import { COHORTS, BOTTLENECKS } from './data.js';

async function get(path, fallback) {
  try {
    const res = await fetch(path, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(String(res.status));
    return await res.json();
  } catch {
    return fallback;
  }
}

export const api = {

  runSimulation: (payload) =>
    fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload || {}),
    })
      .then((r) => (r.ok ? r.json() : { ok: true, source: 'fallback' }))
      .catch(() => ({ ok: true, source: 'fallback' })),

  cohorts: () => get('/api/cohorts', { cohorts: COHORTS }),
  bottlenecks: () => get('/api/bottlenecks', { bottlenecks: BOTTLENECKS }),
  report: () => get('/api/report', null),
};
