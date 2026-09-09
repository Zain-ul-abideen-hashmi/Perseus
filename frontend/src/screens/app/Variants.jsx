import { Eyebrow, Tag } from '../../components/ui.jsx';

function ShapRow({ label, pct, value, background, delay }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <span style={{ font: "400 12px 'Space Grotesk',sans-serif", width: 100, color: 'rgba(251,233,236,.7)' }}>{label}</span>
      <div style={{ flex: 1, height: 15, borderRadius: 4, background: 'rgba(255,255,255,.06)' }}>
        <div style={{ width: `${pct}%`, height: 15, borderRadius: 4, background, animation: `fadeIn .8s ${delay}s both` }} />
      </div>
      <span className="mono" style={{ fontSize: 10.5, width: 42, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

export default function Variants({ go }) {
  return (
    <div className="stag two-col right-wide">

      <div className="col">
        <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 15 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <Eyebrow>SHAP ATTRIBUTION · WHY FLAGGED</Eyebrow>
            <Tag tone="red">SYNTHETIC · 10⁵ PASSES</Tag>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ShapRow label="skepticism" pct={74} value="+0.31" background="linear-gradient(90deg,rgba(255,77,109,.45),#ff4d6d)" delay={0} />
            <ShapRow label="reading depth" pct={46} value="+0.19" background="linear-gradient(90deg,rgba(247,183,205,.4),#f7b7cd)" delay={.1} />
            <ShapRow label="price sens." pct={28} value="+0.12" background="rgba(255,255,255,.28)" delay={.2} />
            <ShapRow label="impulse" pct={11} value="−0.04" background="rgba(255,255,255,.18)" delay={.3} />
          </div>
        </div>

        <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 13 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <Eyebrow>◈ AEGIS SHIELD · EXTRACTION GATE</Eyebrow>
            <Tag tone="pink">21 / 22 READ CLEANLY</Tag>
          </div>
          <div style={{ font: "400 11.5px/1.5 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.55)' }}>Both passes agreed on what this page is attempting, so the ranking below rests on a clean read (§8).</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {[['schema', 'pass', 'var(--pink)'], ['two-pass', 'agree', 'var(--pink)'], ['ranking held', 'top 3 stable', 'var(--pink)'], ['retrodiction', 'awaiting arms', 'rgba(251,233,236,.4)']].map(([k, v, c]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span className="mono" style={{ fontSize: 10, width: 98, color: 'rgba(251,233,236,.5)' }}>{k}</span>
                <span className="mono" style={{ fontSize: 10.5, color: c }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 11px', borderRadius: 9, border: '1px dashed rgba(255,77,109,.3)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span className="mono" style={{ fontSize: 9.5, color: 'var(--red)' }}>B15 · 1 FLAGGED, NOT DROPPED</span>
            <span style={{ font: "400 10.5px/1.45 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.5)' }}>win-back 5/5 couldn't be read confidently. It stays in the report, marked — agreement isn't correctness.</span>
          </div>
        </div>

        <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Eyebrow>LIVE CONTROL COPY</Eyebrow>
          <div className="gl2" style={{ padding: '14px 15px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ font: "500 15.5px/1.3 'Space Grotesk',sans-serif" }}>Advanced implant dentistry, close to home.</div>
            <div style={{ font: "400 12px/1.5 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.55)' }}>Our team has placed thousands of implants. Book a consultation to find out what's right for you.</div>
            <div style={{ display: 'flex', gap: 7 }}>
              <Tag tone="pink" style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3 }}>LIVE · CONTROL</Tag>
              <Tag tone="mute" style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3 }}>n 3,418 · cvr 2.4%</Tag>
            </div>
          </div>
          <div style={{ padding: '12px 13px', borderRadius: 11, border: '1px dashed rgba(255,255,255,.16)', display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: '.08em', color: 'rgba(251,233,236,.4)' }}>REWARD</div>
            <div className="mono" style={{ fontSize: 12.5 }}>R = conversion − λ · bounce</div>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 13 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Eyebrow>LLM CANDIDATES · BANDIT ARMS</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--pink)', animation: 'pulseDot 1.8s ease-in-out infinite' }} />
              <span className="mono" style={{ fontSize: 10, color: 'rgba(251,233,236,.45)' }}>allocating</span>
            </div>
          </div>

          <div className="gl2" style={{ padding: '13px 14px', display: 'flex', flexDirection: 'column', gap: 9, borderLeft: '2px solid #ff69b4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="mono" style={{ fontSize: 10, color: 'rgba(251,233,236,.5)' }}>ARM A</span>
              <Tag tone="pink" style={{ fontSize: 9.5, padding: '2px 6px', borderRadius: 3 }}>LIVE · 34%</Tag>
            </div>
            <div style={{ font: "500 14px/1.35 'Space Grotesk',sans-serif" }}>Board-certified. 1,900 implants placed. Every case reviewed by two surgeons.</div>
            <div className="mono" style={{ display: 'flex', gap: 14 }}><span style={{ fontSize: 10.5, color: 'rgba(251,233,236,.5)' }}>n 412</span><span style={{ fontSize: 10.5, color: 'var(--pink)' }}>cvr 3.1%</span><span style={{ fontSize: 10.5, color: 'rgba(251,233,236,.5)' }}>P(best) 0.61</span></div>
            <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}><div style={{ width: '61%', height: 5, borderRadius: 3, background: 'linear-gradient(90deg,rgba(255,105,180,.4),#ff69b4)' }} /></div>
          </div>

          <div className="gl2" style={{ padding: '13px 14px', display: 'flex', flexDirection: 'column', gap: 9, borderLeft: '2px solid rgba(255,255,255,.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="mono" style={{ fontSize: 10, color: 'rgba(251,233,236,.5)' }}>ARM B</span>
              <Tag tone="pink" style={{ fontSize: 9.5, padding: '2px 6px', borderRadius: 3, background: 'rgba(255,105,180,.12)' }}>LIVE · 21%</Tag>
            </div>
            <div style={{ font: "500 14px/1.35 'Space Grotesk',sans-serif" }}>See the actual work: 40 patient cases, before and after, with names.</div>
            <div className="mono" style={{ display: 'flex', gap: 14 }}><span style={{ fontSize: 10.5, color: 'rgba(251,233,236,.5)' }}>n 268</span><span style={{ fontSize: 10.5, color: 'rgba(251,233,236,.7)' }}>cvr 2.6%</span><span style={{ fontSize: 10.5, color: 'rgba(251,233,236,.5)' }}>P(best) 0.24</span></div>
            <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}><div style={{ width: '24%', height: 5, borderRadius: 3, background: 'rgba(255,255,255,.35)' }} /></div>
          </div>

          <div style={{ padding: '13px 14px', borderRadius: 12, border: '1px dashed rgba(247,183,205,.35)', background: 'rgba(247,183,205,.05)', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="mono" style={{ fontSize: 10, color: 'rgba(251,233,236,.45)' }}>ARM C</span>
              <Tag tone="blush" style={{ fontSize: 9.5, padding: '2px 6px', borderRadius: 3 }}>HELD · 0%</Tag>
            </div>
            <div style={{ font: "500 14px/1.35 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.7)' }}>Free consultation — no obligation, no sales pitch.</div>
            <div className="mono" style={{ fontSize: 10.5, color: 'rgba(251,233,236,.45)' }}>rejected: overlaps live promo</div>
          </div>
        </div>

        <div style={{ position: 'relative', padding: '19px 20px', borderRadius: 16, background: 'rgba(255,77,109,.07)', backdropFilter: 'blur(22px) saturate(150%)', WebkitBackdropFilter: 'blur(22px) saturate(150%)', border: '1px solid rgba(255,77,109,.3)', display: 'flex', flexDirection: 'column', gap: 13, overflow: 'hidden', boxShadow: '0 0 40px rgba(255,77,109,.1)' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg,transparent,rgba(255,77,109,.12),transparent)', animation: 'sweep 5s ease-in-out infinite' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ width: 15, height: 15, borderRadius: 4, border: '1.5px solid #ff4d6d', animation: 'spinSlow 9s linear infinite' }} />
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: '.1em', color: 'var(--red)' }}>PROMOTION GATE</span>
            <Tag tone="red2" style={{ fontSize: 9, padding: '2px 6px', borderRadius: 3 }}>B1 UNDEFINED</Tag>
          </div>
          <div style={{ font: "400 12px/1.55 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.62)' }}>Arm A leads, but the promotion bar doesn't exist yet. Nothing auto-promotes until a minimum sample size and confidence threshold are set.</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[['MIN N / ARM', 'not set'], ['CONFIDENCE', 'not set']].map(([k, v]) => (
              <div key={k} style={{ padding: '10px 11px', border: '1px dashed rgba(255,255,255,.2)', borderRadius: 9, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span className="mono" style={{ fontSize: 9, color: 'rgba(251,233,236,.4)' }}>{k}</span>
                <span className="mono" style={{ fontSize: 14, color: 'rgba(251,233,236,.3)' }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, padding: 10, borderRadius: 9, background: 'rgba(255,255,255,.06)', color: 'rgba(251,233,236,.32)', font: "500 12px 'Space Grotesk',sans-serif", textAlign: 'center' }}>Promote Arm A</div>
            <div onClick={() => go('bottle')} className="press" style={{ flex: 1, padding: 10, borderRadius: 9, background: '#fbe9ec', color: '#1a0a10', font: "600 12px 'Space Grotesk',sans-serif", textAlign: 'center' }}>Define policy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
