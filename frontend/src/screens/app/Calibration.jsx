import { Eyebrow, Tag } from '../../components/ui.jsx';
import NeuralNet from '../../components/NeuralNet.jsx';

function PullRow({ label, priorLeft, posteriorLeft, barLeft, barWidth, value, dim = false, pinnedOnly = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, opacity: dim ? 0.5 : 1 }}>
      <span style={{ font: "400 12.5px 'Space Grotesk',sans-serif", width: 96, color: dim ? undefined : 'rgba(251,233,236,.7)' }}>{label}</span>
      <div style={{ flex: 1, position: 'relative', height: 22, borderRadius: 5, background: 'rgba(255,255,255,.05)' }}>
        <div style={{ position: 'absolute', left: `${priorLeft}%`, top: 0, width: 2, height: 22, background: 'rgba(251,233,236,.35)' }} />
        {!pinnedOnly && <div style={{ position: 'absolute', left: `${barLeft}%`, top: 8, width: `${barWidth}%`, height: 6, background: '#ff69b4', animation: 'fadeIn .9s both' }} />}
        <div style={{ position: 'absolute', left: `${posteriorLeft}%`, top: 1, width: 3, height: 20, borderRadius: 2, background: pinnedOnly ? 'rgba(251,233,236,.3)' : '#ff69b4', boxShadow: pinnedOnly ? undefined : '0 0 12px rgba(255,105,180,.6)' }} />
      </div>
      <span className="mono" style={{ fontSize: 10.5, width: 88, textAlign: 'right', color: 'rgba(251,233,236,.6)' }}>{value}</span>
    </div>
  );
}

function ProvRow({ label, pct, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div className="mono" style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 11, color: 'rgba(251,233,236,.55)' }}>{label}</span><span style={{ fontSize: 11 }}>{pct}%</span></div>
      <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,.08)' }}><div style={{ width: `${pct}%`, height: 5, borderRadius: 3, background: color }} /></div>
    </div>
  );
}

export default function Calibration() {
  return (
    <div className="stag two-col left-wide">
      <div className="col">

        <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 15 }}>
          <Eyebrow>BERNARD'S LOOP · TRUST-DEFICIT</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div className="gl2" style={{ flex: '1 1 150px', padding: 14, display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div className="mono" style={{ fontSize: 9.5, letterSpacing: '.1em', color: 'rgba(251,233,236,.45)' }}>L1 · GLOBAL</div>
              <div style={{ font: "400 11.5px/1.45 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.6)' }}>Published CRO / persuasion research</div>
              <Tag tone="blue" style={{ alignSelf: 'flex-start', fontSize: 9, padding: '2px 6px', borderRadius: 3 }}>PRIOR · SOURCED</Tag>
            </div>
            <span className="mono" style={{ fontSize: 15, color: 'rgba(251,233,236,.25)' }}>→</span>
            <div className="gl2" style={{ flex: '1 1 150px', padding: 14, display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div className="mono" style={{ fontSize: 9.5, letterSpacing: '.1em', color: 'rgba(251,233,236,.45)' }}>L2 · NICHE</div>
              <div style={{ font: "400 11.5px/1.45 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.6)' }}>Cluster C-04 · trait-based · 11 businesses</div>
              <Tag tone="blush" style={{ alignSelf: 'flex-start', fontSize: 9, padding: '2px 6px', borderRadius: 3 }}>B3 · METHOD TBD</Tag>
            </div>
            <span className="mono" style={{ fontSize: 15, color: 'rgba(251,233,236,.25)' }}>→</span>
            <div style={{ flex: '1 1 150px', padding: 14, borderRadius: 12, background: 'rgba(255,105,180,.08)', border: '1px solid rgba(255,105,180,.32)', display: 'flex', flexDirection: 'column', gap: 7, boxShadow: '0 0 26px rgba(255,105,180,.1)' }}>
              <div className="mono" style={{ fontSize: 9.5, letterSpacing: '.1em', color: 'var(--pink)' }}>L3 · PERSONAL</div>
              <div style={{ font: "400 11.5px/1.45 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.6)' }}>n = 14 real interactions</div>
              <Tag tone="pink" style={{ alignSelf: 'flex-start', fontSize: 9, padding: '2px 6px', borderRadius: 3 }}>LIVE · SHRINKAGE</Tag>
            </div>
          </div>
          <div style={{ position: 'relative', borderRadius: 11, background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.06)', overflow: 'hidden' }}>
            <div className="mono" style={{ position: 'absolute', top: 10, left: 12, fontSize: 8.5, letterSpacing: '.1em', color: 'rgba(251,233,236,.4)', zIndex: 2 }}>L1 → L2 → L3 → POSTERIOR</div>
            <NeuralNet layers={[3, 5, 5, 2]} height={140} speed={0.85} />
          </div>
          <div style={{ padding: '13px 14px', borderRadius: 11, background: 'rgba(255,255,255,.04)', display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: '.08em', color: 'rgba(251,233,236,.42)' }}>HOW TO SAY IT</div>
            <div style={{ font: "400 12.5px/1.5 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.72)' }}>"14 observations pull the cluster prior toward this business." Not "enough data to build its own weights."</div>
          </div>
        </div>

        <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 15 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Eyebrow>PULL STRENGTH · PRIOR → POSTERIOR</Eyebrow>
            <div className="mono" style={{ fontSize: 10, color: 'rgba(251,233,236,.4)' }}>shrinkage λ ∝ n</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <PullRow label="Trust" priorLeft={38} posteriorLeft={52} barLeft={38} barWidth={14} value=".38 → .52" />
            <PullRow label="Urgency" priorLeft={61} posteriorLeft={57} barLeft={57} barWidth={4} value=".61 → .57" />
            <PullRow label="Skepticism" priorLeft={44} posteriorLeft={67} barLeft={44} barWidth={23} value=".44 → .67" />
            <PullRow label="Budget stress" priorLeft={50} posteriorLeft={50} dim pinnedOnly value="pinned to prior" />
          </div>
          <div className="mono" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}><span style={{ fontSize: 10, color: 'rgba(251,233,236,.4)' }}>┊ cluster prior</span><span style={{ fontSize: 10, color: 'rgba(251,233,236,.4)' }}>▌ posterior</span><span style={{ fontSize: 10, color: 'rgba(251,233,236,.4)' }}>— pull</span></div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="gl" style={{ padding: '17px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Eyebrow>POSTERIOR PROVENANCE</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <ProvRow label="global research" pct={44} color="#7b93d4" />
            <ProvRow label="cluster C-04" pct={39} color="#f7b7cd" />
            <ProvRow label="this business n=14" pct={17} color="#ff69b4" />
          </div>
        </div>
        <div className="gl" style={{ padding: '17px 18px', display: 'flex', flexDirection: 'column', gap: 9 }}>
          <Eyebrow>GRACEFUL DEGRADATION</Eyebrow>
          <div style={{ font: "400 11.5px/1.5 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.55)' }}>No ad-channel data. Layer 3 for ads stays pinned to the L1/L2 prior — onboarding not blocked.</div>
        </div>
        <div className="gl2" style={{ padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="mono" style={{ fontSize: 9.5, letterSpacing: '.1em', color: 'rgba(251,233,236,.42)' }}>PROVENANCE · ORION</div>
          <div style={{ font: "400 11.5px/1.5 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.55)' }}>Architecture ported from the Nashville real-estate pilot: 6 bookings in 3 days.</div>
        </div>
      </div>
    </div>
  );
}
