import Crest from '../components/Crest.jsx';
import { LOAD_STEPS, LOAD_COPY } from '../data.js';

function stepStyle(i, pct) {
  const done = pct >= (i + 1) * 25;
  const live = !done && pct >= i * 25;
  const base = { display: 'flex', alignItems: 'center', gap: 10, transition: 'color .3s ease, opacity .3s ease' };
  if (done) return { ...base, color: 'rgba(240,237,230,.5)' };
  if (live) return { ...base, color: '#f6dfe4' };
  return { ...base, color: 'rgba(240,237,230,.26)' };
}
const icon = (i, pct) => (pct >= (i + 1) * 25 ? '✓' : pct >= i * 25 ? '▸' : '·');

export default function Loading({ pct, onSkip }) {
  const p = Math.round(pct);
  const copy = p < 25 ? LOAD_COPY[0] : p < 50 ? LOAD_COPY[1] : p < 75 ? LOAD_COPY[2] : LOAD_COPY[3];

  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36, padding: '48px 24px' }}>
      <div style={{ position: 'relative', width: 300, height: 266, maxWidth: '80vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ position: 'absolute', width: 186, height: 186, borderRadius: '50%', border: `1px solid rgba(208,48,94,${0.45 - i * 0.11})`, animation: `ringPulse 3s ease-out infinite ${i}s` }} />
        ))}
        <div style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle,rgba(208,48,94,.24),transparent 66%)', filter: 'blur(16px)', animation: 'markPulse 2.4s ease-in-out infinite' }} />
        <div className="orbit-ring" aria-hidden="true">
          <span className="orbit-dot" style={{ transform: 'translate(-50%,-50%) translateX(130px)' }} />
          <span className="orbit-dot" style={{ transform: 'translate(-50%,-50%) translateX(-130px)', background: '#7b93d4', boxShadow: '0 0 10px 2px rgba(123,147,212,.6)' }} />
        </div>
        <div className="orbit-ring rev" aria-hidden="true">
          <span className="orbit-dot" style={{ transform: 'translate(-50%,-50%) translateY(118px)', background: '#f7b7cd' }} />
          <span className="orbit-dot" style={{ transform: 'translate(-50%,-50%) translateY(-118px)', width: 4, height: 4 }} />
        </div>
        <Crest w={216} h={194} blaze animate eye={{ w: 22, h: 13 }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, maxWidth: 440, textAlign: 'center' }}>
        <div style={{ font: "600 22px 'Space Grotesk',sans-serif", letterSpacing: '-.018em' }}>{copy[0]}</div>
        <div style={{ font: "400 13px/1.55 'Space Grotesk',sans-serif", color: 'rgba(240,237,230,.55)' }}>{copy[1]}</div>
      </div>

      <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '.11em', color: 'rgba(240,237,230,.4)' }}>SIMULATING</span>
          <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--salmon)' }}>{p}%</span>
        </div>
        <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
          <div style={{ width: `${p}%`, height: 5, borderRadius: 3, background: 'linear-gradient(90deg,#a3123f,#ec8298)', boxShadow: '0 0 14px rgba(208,48,94,.5)', transition: 'width .2s linear' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, paddingTop: 6 }}>
          {LOAD_STEPS.map((label, i) => (
            <div key={i} style={stepStyle(i, p)}>
              <span className="mono" style={{ fontSize: 11, width: 15 }}>{icon(i, p)}</span>
              <span style={{ font: "400 12.5px 'Space Grotesk',sans-serif" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div onClick={onSkip} style={{ font: "500 11.5px 'Space Grotesk',sans-serif", color: 'rgba(240,237,230,.32)', cursor: 'pointer' }}>Skip →</div>
    </div>
  );
}
