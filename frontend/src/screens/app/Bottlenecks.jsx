import { Eyebrow, Tag, Count } from '../../components/ui.jsx';
import { Donut } from '../../components/charts.jsx';
import Tilt from '../../components/Tilt.jsx';
import { BOTTLENECKS } from '../../data.js';

const idColor = { red: 'var(--red)', blush: 'var(--blush)', pink: 'var(--pink)', mute: 'rgba(251,233,236,.5)' };
const th = { fontSize: 9, letterSpacing: '.12em', color: 'rgba(251,233,236,.35)' };

const SUMMARY = [
  ['OPEN', '7', 'var(--red)'],
  ['DIRECTION DECIDED', '3', 'var(--blush)'],
  ['DECIDED', '1', 'var(--pink)'],
  ['REMOVED', '1', 'rgba(251,233,236,.4)'],
];

const SEQ = [
  ['FIRST', 'Historical backtest — replay a test whose winner is already known', 'var(--pink)', 'rgba(255,105,180,.08)', 'rgba(255,105,180,.28)'],
  ['THEN', 'Diagnosis-only pilots — the report, no rewriting. Needs no promotion bar', 'rgba(251,233,236,.45)', 'rgba(255,255,255,.04)', 'rgba(255,255,255,.08)'],
  ['LAST', 'Full rewrite-and-test loop — once B1 and B2 are answered', 'rgba(251,233,236,.4)', 'rgba(255,255,255,.03)', 'rgba(255,255,255,.07)'],
];

const VERTICALS = ['real estate', 'law', 'finance', 'dental*', 'construction', 'cybersecurity', 'ecommerce'];

export default function Bottlenecks() {
  return (
    <div className="stag" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="stat-row">
        {SUMMARY.map(([label, n, color]) => (
          <Tilt key={label} className="gl lift" glare style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Eyebrow>{label}</Eyebrow>
              <Count className="mono" style={{ fontSize: 28, fontWeight: 600, color }} value={Number(n)} />
            </div>
            {label === 'OPEN' && (
              <Donut value={5 / 12} size={54} stroke={6} color="#ff4d6d"
                label={<span className="mono" style={{ fontSize: 9, color: 'rgba(251,233,236,.55)' }}>of 12</span>} />
            )}
            {label === 'DECIDED' && (
              <Donut value={4 / 12} size={54} stroke={6} color="#ff69b4"
                label={<span className="mono" style={{ fontSize: 9, color: 'rgba(251,233,236,.55)' }}>4/12</span>} />
            )}
          </Tilt>
        ))}
      </div>

      <div className="gl" style={{ padding: '6px 0', overflow: 'hidden' }}>
        <div className="scroll-x">
          <div style={{ minWidth: 640 }}>
            <div className="mono" style={{ display: 'grid', gridTemplateColumns: '52px 1fr 150px 130px', gap: 14, padding: '11px 20px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
              <span style={th}>ID</span><span style={th}>PROBLEM</span><span style={th}>STATUS</span><span style={th}>BLOCKS</span>
            </div>
            {BOTTLENECKS.map((b, i) => (
              <div key={b.id} className="rw" style={{ display: 'grid', gridTemplateColumns: '52px 1fr 150px 130px', gap: 14, padding: '13px 20px', alignItems: 'center', borderBottom: i < BOTTLENECKS.length - 1 ? '1px solid rgba(255,255,255,.045)' : 'none', opacity: b.struck ? 0.5 : 1 }}>
                <span className="mono" style={{ fontSize: 11.5, color: idColor[b.tone] || 'inherit' }}>{b.id}</span>
                <span style={{ font: "400 12.5px 'Space Grotesk',sans-serif", textDecoration: b.struck ? 'line-through' : 'none' }}>{b.problem}</span>
                <Tag tone={b.statusTone} style={{ justifySelf: 'start' }}>{b.status}</Tag>
                <span className="mono" style={{ fontSize: 10.5, color: 'rgba(251,233,236,.45)' }}>{b.blocks}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="two-even">
        <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Eyebrow>PILOT SEQUENCING · §13</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {SEQ.map(([tag, text, tagColor, bg, border]) => (
              <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 12px', borderRadius: 11, background: bg, border: `1px solid ${border}` }}>
                <span className="mono" style={{ fontSize: 10.5, color: tagColor, flex: 'none' }}>{tag}</span>
                <span style={{ font: "400 12px 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.7)' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Eyebrow>VERTICAL SPREAD AS INFRASTRUCTURE</Eyebrow>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {VERTICALS.map((v) => {
              const active = v.endsWith('*');
              const label = active ? v.slice(0, -1) : v;
              return (
                <span key={v} className="mono" style={{ fontSize: 10.5, padding: '5px 10px', borderRadius: 6, background: active ? 'rgba(255,105,180,.14)' : 'rgba(255,255,255,.06)', color: active ? 'var(--pink)' : undefined }}>{label}</span>
              );
            })}
          </div>
          <div style={{ font: "400 11.5px/1.5 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.5)' }}>Breadth is what makes archetype-pooled priors converge fast enough to be useful in a short pilot window.</div>
        </div>
      </div>
    </div>
  );
}
