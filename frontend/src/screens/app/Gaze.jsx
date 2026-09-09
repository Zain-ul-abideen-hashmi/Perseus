import { Eyebrow, Tag, Meter, VBar } from '../../components/ui.jsx';
import NeuralNet from '../../components/NeuralNet.jsx';

const ENTROPY = [
  [38, 'rgba(255,105,180,.45)'], [52, 'rgba(255,105,180,.45)'], [71, 'rgba(247,183,205,.55)'],
  [83, 'rgba(255,77,109,.7)'], [88, 'rgba(255,77,109,.7)'], [91, 'rgba(255,77,109,.8)'],
  [86, 'rgba(255,77,109,.8)'], [89, 'rgba(255,77,109,.8)'], [94, 'rgba(255,77,109,.9)', true],
  [87, 'rgba(255,77,109,.9)'], [81, 'rgba(255,77,109,.8)'], [76, 'rgba(247,183,205,.65)'],
  [69, 'rgba(247,183,205,.6)'], [58, 'rgba(247,183,205,.55)'], [47, 'rgba(255,105,180,.45)'],
  [41, 'rgba(255,105,180,.45)'], [36, 'rgba(255,105,180,.45)'], [44, 'rgba(255,105,180,.45)'],
  [39, 'rgba(255,105,180,.45)'], [33, 'rgba(255,105,180,.45)'], [29, 'rgba(255,105,180,.45)'],
  [31, 'rgba(255,105,180,.45)'], [24, 'rgba(255,105,180,.45)'], [19, 'rgba(255,105,180,.45)'],
];

const LINES = [
  [130, 44, 620, 86, .4, 3.5, '8 6', 5], [620, 86, 160, 136, .32, 3, '8 6', 5.4],
  [160, 136, 650, 146, .26, 2.5, '8 6', 5.8], [650, 146, 180, 196, .22, 2, '8 6', 6.2],
  [180, 196, 570, 212, .2, 2, '8 6', 6.6], [570, 212, 210, 250, .18, 1.6, null, null],
  [210, 250, 530, 276, .16, 1.4, null, null], [530, 276, 250, 296, .14, 1.4, null, null],
  [250, 296, 610, 322, .12, 1.2, null, null], [610, 322, 128, 336, .1, 1.2, null, null],
];
const CIRCLES = [
  [130, 44, 18, '#ff4d6d', .8], [620, 86, 14, '#ff4d6d', .62], [160, 136, 12, '#f7b7cd', .7],
  [650, 146, 9, '#f7b7cd', .55], [180, 196, 10, '#f7b7cd', .5], [570, 212, 8, '#f7b7cd', .4],
  [210, 250, 7, '#fbe9ec', .3], [530, 276, 7, '#fbe9ec', .26], [250, 296, 6, '#fbe9ec', .22],
  [610, 322, 6, '#fbe9ec', .2], [128, 336, 6, '#fbe9ec', .2],
];

export default function Gaze() {
  return (
    <div className="stag" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div className="gl lift" style={{ padding: '16px 20px 6px', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <Eyebrow color="var(--pink)">◈ ATTENTION NETWORK · FORWARD PASS</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 7, height: 7, borderRadius: 2, background: '#7b93d4' }} /><span className="mono" style={{ fontSize: 9.5, color: 'rgba(251,233,236,.5)' }}>touchpoint features</span></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 7, height: 7, borderRadius: 2, background: '#ff4d6d' }} /><span className="mono" style={{ fontSize: 9.5, color: 'rgba(251,233,236,.5)' }}>fixation weights</span></div>
            <Tag tone="red">B9 · UNTRAINED</Tag>
          </div>
        </div>
        <NeuralNet layers={[6, 10, 10, 4]} height={230} speed={1} />
        <div className="mono" style={{ fontSize: 10, color: 'rgba(251,233,236,.4)', paddingBottom: 6 }}>Signals shown are illustrative — the gaze network has no training signal yet (§15, B9).</div>
      </div>

      <div className="two-col gaze">
      <div className="col">

        <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <Eyebrow>SCANPATH + HEAT · 2,000 SIMULATED TRACES</Eyebrow>
            <Tag tone="red">SYNTHETIC · B9 NO SIGNAL</Tag>
          </div>
          <div style={{ position: 'relative', height: 378, borderRadius: 13, background: 'rgba(255,255,255,.028)', border: '1px solid rgba(255,255,255,.08)', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px)', backgroundSize: '25% 20%' }} />
            <div style={{ position: 'absolute', left: 22, top: 18, width: '44%', height: 52, borderRadius: 7, background: 'radial-gradient(ellipse at 30% 50%,rgba(255,77,109,.4),rgba(255,77,109,.05) 70%)', display: 'flex', alignItems: 'center', padding: '0 13px' }}><span className="mono" style={{ fontSize: 10.5, color: 'rgba(251,233,236,.6)' }}>headline · .19</span></div>
            <div style={{ position: 'absolute', right: 26, top: 18, width: '27%', height: 142, borderRadius: 7, background: 'radial-gradient(ellipse at 50% 40%,rgba(255,77,109,.3),rgba(255,77,109,.03) 72%)', display: 'flex', alignItems: 'flex-end', padding: 11 }}><span className="mono" style={{ fontSize: 10.5, color: 'rgba(251,233,236,.55)' }}>hero img · .15</span></div>
            <div style={{ position: 'absolute', left: 22, top: 148, width: '38%', height: 86, borderRadius: 7, background: 'radial-gradient(ellipse at 40% 50%,rgba(247,183,205,.24),rgba(247,183,205,.03) 72%)', display: 'flex', alignItems: 'flex-end', padding: 11 }}><span className="mono" style={{ fontSize: 10.5, color: 'rgba(251,233,236,.5)' }}>credentials · .09</span></div>
            <div style={{ position: 'absolute', left: 22, bottom: 26, width: '24%', height: 46, borderRadius: 7, background: 'rgba(255,105,180,.09)', border: '1px solid rgba(255,105,180,.4)', display: 'flex', alignItems: 'center', padding: '0 13px', boxShadow: '0 0 24px rgba(255,105,180,.14)' }}><span className="mono" style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--pink)' }}>CTA · .03</span></div>

            <svg viewBox="0 0 800 380" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              {LINES.map(([x1, y1, x2, y2, op, w, dash, dur], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fbe9ec" strokeOpacity={op} strokeWidth={w}
                  strokeDasharray={dash || undefined}
                  style={dur ? { animation: `dashRun ${dur}s linear infinite` } : undefined} />
              ))}
              <line x1="128" y1="336" x2="120" y2="352" stroke="#ff69b4" strokeOpacity=".85" strokeWidth="2.5" strokeDasharray="6 4" style={{ animation: 'dashRun 3s linear infinite' }} />
              {CIRCLES.map(([cx, cy, r, fill, op], i) => <circle key={i} cx={cx} cy={cy} r={r} fill={fill} fillOpacity={op} />)}
              <circle cx="120" cy="352" r="11" fill="none" stroke="#ff69b4" strokeWidth="2.5" style={{ animation: 'pulseDot 2s ease-in-out infinite' }} />
            </svg>
            <div className="mono" style={{ position: 'absolute', left: 146, top: 58, fontSize: 9.5, color: 'var(--red)' }}>f1 · 1.9s</div>
            <div className="mono" style={{ position: 'absolute', left: 58, bottom: 12, fontSize: 9.5, color: 'var(--pink)' }}>f12 · CTA reached last</div>
          </div>
        </div>

        <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
            <Eyebrow>FIXATION ENTROPY H · 24 STEPS</Eyebrow>
            <div className="mono" style={{ fontSize: 10, color: 'rgba(251,233,236,.4)' }}>paralysis if H &gt; 1.6 for 8 steps</div>
          </div>
          <div style={{ position: 'relative', height: 98, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 30, height: 1, background: 'rgba(255,77,109,.45)' }} />
            {ENTROPY.map(([h, bg, glow], i) => (
              <VBar key={i} h={h} delay={i * 0.03} background={bg} glow={glow ? '16px rgba(255,77,109,.4)' : undefined} />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 13px', borderRadius: 11, background: 'rgba(255,77,109,.08)', border: '1px solid rgba(255,77,109,.24)', flexWrap: 'wrap' }}>
            <span className="mono" style={{ fontSize: 9.5, letterSpacing: '.06em', color: 'var(--red)' }}>DECISION-PARALYSIS DETECTED</span>
            <span style={{ font: "400 11.5px 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.6)' }}>steps 4–11 · sustained H with no convergence toward CTA</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="gl" style={{ padding: '17px 18px', display: 'flex', flexDirection: 'column', gap: 13 }}>
          <Eyebrow>DRIVE STATE · QUERY Qₜ</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Meter label="urgency" value="0.72" pct={72} height={5} />
            <Meter label="skepticism" value="0.81" pct={81} height={5} />
            <Meter label="fatigue" value="0.44" pct={44} height={5} />
          </div>
        </div>

        <div className="gl" style={{ padding: '17px 18px', display: 'flex', flexDirection: 'column', gap: 11 }}>
          <Eyebrow>SOFTMAX TEMPERATURE</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}><span className="mono" style={{ fontSize: 28, fontWeight: 600 }}>0.34</span><span style={{ font: "400 11px 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.45)' }}>near-deterministic scan</span></div>
          <div style={{ position: 'relative', height: 6, borderRadius: 3, background: 'linear-gradient(90deg,rgba(255,105,180,.6),rgba(255,255,255,.12))' }}><div style={{ position: 'absolute', left: '34%', top: -4, width: 2, height: 14, background: '#fbe9ec' }} /></div>
          <div className="mono" style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 9.5, color: 'rgba(251,233,236,.32)' }}>0 deterministic</span><span style={{ fontSize: 9.5, color: 'rgba(251,233,236,.32)' }}>1 exploratory</span></div>
          <div className="mono" style={{ fontSize: 10, color: 'rgba(251,233,236,.4)' }}>τ = f(drive state) · form TBD · B11</div>
        </div>

        <div className="gl" style={{ padding: '17px 18px', display: 'flex', flexDirection: 'column', gap: 11 }}>
          <Eyebrow>PERCEIVED VS REAL TIME</Eyebrow>
          <div className="mono" style={{ fontSize: 12, color: 'rgba(251,233,236,.75)' }}>≈ k · log(1 + t/τ)</div>
          <div className="mono" style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 11.5, color: 'rgba(251,233,236,.5)' }}>real dwell</span><span style={{ fontSize: 11.5 }}>41 s</span></div>
          <div className="mono" style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 11.5, color: 'rgba(251,233,236,.5)' }}>perceived</span><span style={{ fontSize: 11.5, color: 'var(--red)' }}>≈ 2 min 10 s</span></div>
          <div style={{ display: 'flex', gap: 7, paddingTop: 2 }}><span className="mono" style={{ fontSize: 9.5, color: 'var(--red)' }}>B10</span><span style={{ font: "400 10.5px/1.4 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.45)' }}>k, τ uncalibrated — illustrative, not measured</span></div>
        </div>

        <div className="gl2" style={{ padding: '14px 15px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span className="mono" style={{ fontSize: 9.5, letterSpacing: '.1em', color: 'rgba(251,233,236,.42)' }}>ENTROPY → TIME → DECAY</span>
          <div className="mono" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span style={{ fontSize: 11, color: 'rgba(251,233,236,.55)' }}>H 1.74</span><span style={{ fontSize: 11, color: 'rgba(251,233,236,.3)' }}>→</span><span style={{ fontSize: 11, color: 'rgba(251,233,236,.55)' }}>k large</span><span style={{ fontSize: 11, color: 'rgba(251,233,236,.3)' }}>→</span><span style={{ fontSize: 11, color: 'var(--red)' }}>patience 18%</span></div>
          <div style={{ height: 5, borderRadius: 3, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}><div style={{ width: '18%', height: 5, borderRadius: 3, background: 'var(--red)' }} /></div>
        </div>
      </div>
      </div>
    </div>
  );
}
