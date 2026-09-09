import { Eyebrow, Tag, Count } from '../../components/ui.jsx';
import { AreaChart } from '../../components/charts.jsx';
import { useCountUp } from '../../components/hooks.js';

const DOTS = [
  [14, 'convertRun', 0], [38, 'dropA', .3], [62, 'dropB', .8], [86, 'dropA', 1.1],
  [110, 'dropC', 1.5], [134, 'dropA', 1.9], [158, 'dropD', 2], [182, 'convertRun', 2.2],
  [26, 'dropB', 2.5], [50, 'dropA', 2.8], [74, 'dropC', 3.3], [98, 'dropA', 3.6],
  [122, 'dropB', 4.1], [146, 'dropA', 4.4], [170, 'dropA', 4.6], [194, 'dropD', 4.9],
  [18, 'dropA', 5.3], [42, 'dropC', 5.5], [66, 'dropB', 5.9], [90, 'dropA', 6.2],
  [114, 'dropD', 6.8], [138, 'convertRun', 7.1], [162, 'dropA', 7.6], [186, 'dropB', 7.9],
  [30, 'dropC', 8.3],
];

const STAGES = [['ARRIVES', 100], ['READS ON', 62], ['CHECKS PRICE', 41], ['OPENS CALENDAR', 24], ['BOOKS', 12, 'var(--pink)']];

const LEAVE = [
  ['Landing hero', '/implants', 38, 'Nothing on the page proves the claim. Skepticism is the single biggest driver at this step (+0.31 of the model’s attention), and visitors leave before they ever see a price.', 'TRUST-DEFICIT', 'red'],
  ['Welcome email 2/5', '"Which option is right"', 21, 'Too many equal-looking choices and no recommendation. Attention scatters instead of settling — the gaze model reads sustained high entropy with no move toward the button.', 'DECISION-PARALYSIS', 'mauve'],
  ['Pricing page', '/pricing', 17, 'The number arrives with no frame around it. Financing exists but sits below the table, so most people never reach it.', 'PRICE-OBJECTION', 'blush'],
  ['Calendar', '/book', 12, 'No reason to book today rather than next month. People who get this far intend to come back, and most don’t.', 'URGENCY-ABSENCE', 'pink'],
];

const RANK = [
  ['1', 'Hero makes a claim it doesn’t back up', '43%', '2 ARMS LIVE', 'pink'],
  ['2', 'Welcome email offers choices, not a recommendation', '24%', 'CANDIDATES DRAFTED', 'blush'],
  ['3', 'Price shown before financing', '19%', 'LAYOUT, NOT COPY', 'mute'],
  ['4', 'No reason to book today', '14%', 'NOT STARTED', 'mute'],
];

const th = { fontSize: 9, letterSpacing: '.12em', color: 'rgba(251,233,236,.35)' };

export default function Replay({ go }) {
  const projected = useCountUp(16, { format: (n) => `${Math.round(n)}%` });
  return (
    <div className="stag" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div className="gl" style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Eyebrow>SIMULATED VISITORS MOVING THROUGH THE FUNNEL</Eyebrow>
            <div style={{ font: "400 13px/1.5 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.6)' }}>Out of every 100 people who arrive, 12 book. The other 88 leave at one of four points.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--pink)', boxShadow: '0 0 10px rgba(255,105,180,.7)' }} /><span className="mono" style={{ fontSize: 10.5, color: 'rgba(251,233,236,.6)' }}>booked</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', boxShadow: '0 0 10px rgba(255,77,109,.7)' }} /><span className="mono" style={{ fontSize: 10.5, color: 'rgba(251,233,236,.6)' }}>left</span></div>
            <Tag tone="red">SYNTHETIC · B7</Tag>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 0, padding: '0 2px' }}>
          {STAGES.map(([k, v, c]) => (
            <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span className="mono" style={{ fontSize: 9.5, letterSpacing: '.1em', color: 'rgba(251,233,236,.42)' }}>{k}</span>
              <Count className="mono" style={{ fontSize: 19, fontWeight: 600, color: c || undefined }} value={v} suffix="%" />
            </div>
          ))}
        </div>

        <div style={{ position: 'relative', height: 292, borderRadius: 13, background: 'rgba(255,255,255,.028)', border: '1px solid rgba(255,255,255,.08)', overflow: 'hidden' }}>
          {[22, 46, 70, 90].map((l) => <div key={l} style={{ position: 'absolute', left: `${l}%`, top: 0, bottom: 0, width: 1, background: 'rgba(255,77,109,.3)' }} />)}
          <div style={{ position: 'absolute', left: '95.5%', top: 0, bottom: 0, width: 1, background: 'rgba(255,105,180,.4)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(255,255,255,.05),transparent 24%,rgba(255,77,109,.05) 46%,transparent 72%,rgba(255,105,180,.06))' }} />

          {[['LANDING HERO', '/implants', '12px'], ['WELCOME EMAIL', '2/5', '23.5%'], ['PRICING PAGE', '/pricing', '47.5%'], ['CALENDAR', '/book', '71.5%']].map(([a, b, left]) => (
            <div key={a} style={{ position: 'absolute', left, top: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span className="mono" style={{ fontSize: 9.5, color: 'rgba(251,233,236,.5)' }}>{a}</span>
              <span className="mono" style={{ fontSize: 9, color: 'rgba(251,233,236,.3)' }}>{b}</span>
            </div>
          ))}

          <div style={{ position: 'absolute', left: 0, right: 0, top: 74, height: 200 }}>
            {DOTS.map(([top, name, delay], i) => (
              <div key={i} className="lane" style={{ top }}>
                <span className="dot" style={{ animationName: name, animationDelay: `${delay}s` }} />
              </div>
            ))}
          </div>

          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 10, display: 'grid', gridTemplateColumns: '22% 24% 24% 20% 10%' }}>
            {[['−38%', 'left here', 'var(--red)'], ['−21%', 'left here', 'var(--red)'], ['−17%', 'left here', 'var(--red)'], ['−12%', 'left here', 'var(--red)']].map(([n, l, c], i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', paddingRight: 8, gap: 2 }}>
                <span className="mono" style={{ fontSize: 15, fontWeight: 600, color: c }}>{n}</span>
                <span className="mono" style={{ fontSize: 9, color: 'rgba(251,233,236,.4)' }}>{l}</span>
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
              <span className="mono" style={{ fontSize: 15, fontWeight: 600, color: 'var(--pink)' }}>12%</span>
              <span className="mono" style={{ fontSize: 9, color: 'rgba(251,233,236,.4)' }}>booked</span>
            </div>
          </div>
        </div>
        <div className="mono" style={{ fontSize: 10, color: 'rgba(251,233,236,.35)' }}>1 dot ≈ 4 simulated visitors · 25-dot sample of 10⁵ passes, proportions rounded</div>
      </div>

      <div className="gl" style={{ padding: '6px 0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 22px 12px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ font: "600 15px 'Space Grotesk',sans-serif" }}>Where people leave, and why</div>
            <div style={{ font: "400 12px 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.5)' }}>Percentages are of everyone who arrived, so the four numbers plus the 12% who book add to 100.</div>
          </div>
          <Tag tone="red">SIMULATED</Tag>
        </div>
        <div className="scroll-x">
          <div style={{ minWidth: 640 }}>
            <div className="mono" style={{ display: 'grid', gridTemplateColumns: '200px 96px 1fr 150px', gap: 16, padding: '10px 22px', borderTop: '1px solid rgba(255,255,255,.07)', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
              <span style={th}>STEP</span><span style={th}>LEAVES</span><span style={th}>WHAT'S GOING WRONG</span><span style={th}>FRICTION TYPE</span>
            </div>
            {LEAVE.map(([step, sub, pct, why, tag, tone], i) => (
              <div key={i} className="rw" style={{ display: 'grid', gridTemplateColumns: '200px 96px 1fr 150px', gap: 16, padding: '14px 22px', alignItems: 'center', borderBottom: i < LEAVE.length - 1 ? '1px solid rgba(255,255,255,.045)' : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><span style={{ font: "500 12.5px 'Space Grotesk',sans-serif" }}>{step}</span><span className="mono" style={{ fontSize: 9.5, color: 'rgba(251,233,236,.4)' }}>{sub}</span></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}><span className="mono" style={{ fontSize: 15, fontWeight: 600, color: 'var(--red)' }}>{pct}%</span><div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,.08)' }}><div style={{ width: `${pct}%`, height: 4, borderRadius: 2, background: 'var(--red)' }} /></div></div>
                <span style={{ font: "400 12.5px/1.5 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.72)' }}>{why}</span>
                <Tag tone={tone} style={{ justifySelf: 'start' }}>{tag}</Tag>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="calib-row">
        <div className="gl" style={{ padding: '6px 0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 22px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ font: "600 15px 'Space Grotesk',sans-serif" }}>Fix this first</div>
            <div style={{ font: "400 12px 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.5)' }}>Ranked by how much of the 88% each step is responsible for.</div>
          </div>
          <div className="scroll-x">
            <div style={{ minWidth: 460 }}>
              <div className="mono" style={{ display: 'grid', gridTemplateColumns: '34px 1fr 108px 150px', gap: 14, padding: '10px 22px', borderTop: '1px solid rgba(255,255,255,.07)', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                <span style={th}>#</span><span style={th}>ISSUE</span><span style={th}>SHARE OF LOSS</span><span style={th}>STATUS</span>
              </div>
              {RANK.map(([n, issue, share, status, tone], i) => (
                <div key={i} className="rw" style={{ display: 'grid', gridTemplateColumns: '34px 1fr 108px 150px', gap: 14, padding: '13px 22px', alignItems: 'center', borderBottom: i < RANK.length - 1 ? '1px solid rgba(255,255,255,.045)' : 'none' }}>
                  <span className="mono" style={{ fontSize: 12, color: 'rgba(251,233,236,.45)' }}>{n}</span>
                  <span style={{ font: "400 12.5px 'Space Grotesk',sans-serif" }}>{issue}</span>
                  <span className="mono" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--red)' }}>{share}</span>
                  <Tag tone={tone} style={{ justifySelf: 'start' }}>{status}</Tag>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Eyebrow>IF THE TOP FIX LANDS</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span className="mono" style={{ fontSize: 30, fontWeight: 600, color: 'rgba(251,233,236,.55)' }}>12%</span>
              <span className="mono" style={{ fontSize: 18, color: 'rgba(251,233,236,.35)' }}>→</span>
              <span className="mono shine" style={{ fontSize: 30, fontWeight: 600 }}>{projected}</span>
            </div>
            <AreaChart data={[12, 12, 12.4, 13, 13.6, 14.2, 15, 15.4, 16]} height={70} color="#ff69b4" />
            <div style={{ font: "400 12px/1.55 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.6)' }}>Arm A is converting at 3.1% against the control's 2.4% on the hero alone. Carried through the rest of the funnel unchanged, that's roughly 4 more bookings per 100 visitors.</div>
            <div style={{ padding: '11px 12px', borderRadius: 10, background: 'rgba(255,77,109,.08)', border: '1px solid rgba(255,77,109,.25)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span className="mono" style={{ fontSize: 9.5, color: 'var(--red)' }}>PROJECTION, NOT A RESULT</span>
              <span style={{ font: "400 11px/1.45 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.55)' }}>Assumes every other step behaves the same. Nothing promotes until the gate bar is defined (B1).</span>
            </div>
          </div>
          <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 11 }}>
            <Eyebrow>HOW TO READ THIS</Eyebrow>
            <div style={{ font: "400 12px/1.55 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.6)' }}>These are simulated people, not your visitors. The percentages describe how the model thinks a funnel like yours behaves. They become evidence only after the same pattern shows up in live traffic.</div>
            <div onClick={() => go('bottle')} className="rw press" style={{ padding: 9, borderRadius: 9, background: 'rgba(255,255,255,.07)', textAlign: 'center', font: "500 11.5px 'Space Grotesk',sans-serif" }}>See what's unresolved</div>
          </div>
        </div>
      </div>
    </div>
  );
}
