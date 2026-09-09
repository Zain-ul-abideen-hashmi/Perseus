import { useState } from 'react';
import { Eyebrow, Tag, Meter, VBar } from '../../components/ui.jsx';
import { RadarChart } from '../../components/charts.jsx';
import { COHORTS, pc, distColor } from '../../data.js';

const RADAR_AXES = [{ label: 'trust' }, { label: 'urgency' }, { label: 'skepticism' }, { label: 'budget' }];

const ROWS = [
  ['hero', 'Left at the hero', '/implants', '38%', 'var(--red)', '0.31 close', 'var(--red)', "Wanted it, didn't believe it. Highest-value group in the funnel."],
  ['email', 'Left at welcome email', '2/5', '21%', 'var(--blush)', '0.58 mid', 'rgba(251,233,236,.7)', 'Stalled choosing. Attention never settled on one option.'],
  ['price', 'Left at pricing', '/pricing', '17%', 'var(--blush)', '0.44 close', 'rgba(251,233,236,.7)', 'Price landed without a frame. Financing sits too far down the page.'],
  ['cal', 'Left at the calendar', '/book', '12%', 'rgba(251,233,236,.7)', '0.79 far', 'rgba(251,233,236,.5)', 'Meant to come back later. Nothing made today the day.'],
  ['won', 'Booked', 'reached S_converted', '12%', 'var(--pink)', '0.09 won', 'var(--pink)', 'Trust cleared the bar before patience ran out.'],
];

const th = { fontSize: 9, letterSpacing: '.12em', color: 'rgba(251,233,236,.35)' };

export default function Persona() {
  const [cohort, setCohort] = useState('hero');
  const v = COHORTS[cohort];

  return (
    <div className="stag two-col persona">
      <div className="col">

        <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 15 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <Eyebrow>HOW CLOSE THEY GOT BEFORE LEAVING</Eyebrow>
              <div style={{ font: "400 12.5px/1.55 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.6)', maxWidth: '52em' }}>A drop-off only matters if the person was nearly convinced. Bars on the left are people who were never going to buy. Bars on the right almost did.</div>
            </div>
            <Tag tone="red">SYNTHETIC · B7</Tag>
          </div>
          <div style={{ position: 'relative', height: 150, display: 'flex', alignItems: 'flex-end', gap: 5 }}>
            {[[22, 'rgba(255,255,255,.16)', 0], [31, 'rgba(255,255,255,.16)', .04], [44, 'rgba(255,255,255,.18)', .08], [38, 'rgba(255,255,255,.18)', .12], [52, 'rgba(247,183,205,.4)', .16], [71, 'rgba(247,183,205,.5)', .2], [88, 'rgba(255,105,180,.6)', .24]].map(([h, bg, d], i) => <VBar key={i} h={h} background={bg} delay={d} />)}
            <VBar h={100} delay={.28} background="linear-gradient(180deg,#ff4d6d,rgba(255,77,109,.35))" glow="22px rgba(255,77,109,.45)" />
            <VBar h={79} delay={.32} background="linear-gradient(180deg,#ff4d6d,rgba(255,77,109,.35))" glow="18px rgba(255,77,109,.4)" />
            <VBar h={41} delay={.36} background="rgba(255,105,180,.5)" />
          </div>
          <div className="mono" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: 'rgba(251,233,236,.35)' }}>never close</span>
            <span style={{ fontSize: 10, color: 'rgba(251,233,236,.5)' }}>borderline</span>
            <span style={{ fontSize: 10, color: 'var(--red)' }}>almost converted</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 13px', borderRadius: 11, background: 'rgba(255,77,109,.08)', border: '1px solid rgba(255,77,109,.24)', flexWrap: 'wrap' }}>
            <span className="mono" style={{ fontSize: 9.5, letterSpacing: '.06em', color: 'var(--red)' }}>THE FINDING</span>
            <span style={{ font: "400 12px 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.65)', flex: 1, minWidth: 220 }}>Most of the loss sits in the two rightmost bars — people who were close. That's why the hero ranks first, not the calendar.</span>
          </div>
        </div>

        <div className="gl" style={{ padding: '6px 0', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ font: "600 15px 'Space Grotesk',sans-serif" }}>Who left, and how close they were</div>
            <div style={{ font: "400 12px 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.5)' }}>Click a row to load that group's state into the panel.</div>
          </div>
          <div className="scroll-x">
            <div style={{ minWidth: 560 }}>
              <div className="mono" style={{ display: 'grid', gridTemplateColumns: '200px 76px 92px 1fr', gap: 14, padding: '10px 20px', borderTop: '1px solid rgba(255,255,255,.07)', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
                <span style={th}>GROUP</span><span style={th}>SHARE</span><span style={th}>DISTANCE</span><span style={th}>READING</span>
              </div>
              {ROWS.map(([key, group, sub, share, shareColor, dist, distC, reading]) => {
                const active = cohort === key;
                return (
                  <div key={key} onClick={() => setCohort(key)} className="rw press" style={{
                    display: 'grid', gridTemplateColumns: '200px 76px 92px 1fr', gap: 14, padding: '13px 20px', alignItems: 'center',
                    borderBottom: '1px solid rgba(255,255,255,.045)',
                    background: active ? 'rgba(255,77,109,.12)' : 'transparent',
                    boxShadow: active ? 'inset 2px 0 0 #ff4d6d' : 'none',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}><span style={{ font: "500 12.5px 'Space Grotesk',sans-serif" }}>{group}</span><span className="mono" style={{ fontSize: 9.5, color: 'rgba(251,233,236,.4)' }}>{sub}</span></div>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: shareColor }}>{share}</span>
                    <span className="mono" style={{ fontSize: 12, color: distC }}>{dist}</span>
                    <span style={{ font: "400 12px/1.5 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.65)' }}>{reading}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="gl" style={{ padding: '17px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Eyebrow>STATE AT DROP-OFF · Vₜ</Eyebrow>
            <span className="mono" style={{ fontSize: 9.5, color: 'rgba(251,233,236,.35)' }}>§7.1</span>
          </div>
          <div style={{ font: "500 13.5px 'Space Grotesk',sans-serif", color: '#f7d9d9' }}>{v.name}</div>
          <RadarChart axes={RADAR_AXES} values={[v.trust, v.urg, v.skep, v.bud]} size={200} color={distColor(v.dist)} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <Meter label="trust" value={v.trust.toFixed(2)} pct={pc(v.trust)} color="#ff69b4" glow="rgba(255,105,180,.4)" />
            <Meter label="urgency" value={v.urg.toFixed(2)} pct={pc(v.urg)} color="#7b93d4" glow="rgba(123,147,212,.4)" />
            <Meter label="skepticism" value={v.skep.toFixed(2)} pct={pc(v.skep)} color="#ff4d6d" glow="rgba(255,77,109,.4)" />
            <Meter label="budget stress" value={v.bud.toFixed(2)} pct={pc(v.bud)} color="#f7b7cd" glow="rgba(247,183,205,.4)" />
          </div>
        </div>

        <div className="gl" style={{ padding: '17px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Eyebrow>DISTANCE TO CONVERTED · §7.5</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
            <span className="mono" style={{ fontSize: 34, fontWeight: 600, color: distColor(v.dist) }}>{v.dist.toFixed(2)}</span>
            <span className="mono" style={{ fontSize: 10.5, color: 'rgba(251,233,236,.42)' }}>{v.trend}</span>
          </div>
          <div style={{ height: 7, borderRadius: 4, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
            <div style={{ width: `${pc(Math.min(v.dist, 1))}%`, height: 7, borderRadius: 4, background: `linear-gradient(90deg,${distColor(v.dist)}88,${distColor(v.dist)})`, transition: 'width .6s cubic-bezier(.16,1,.3,1)' }} />
          </div>
          <div style={{ font: "400 11.5px/1.5 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.55)' }}>{v.note}</div>
        </div>

        <div className="gl" style={{ padding: '17px 18px', display: 'flex', flexDirection: 'column', gap: 11 }}>
          <Eyebrow>REPEATED TACTIC WEARS OFF · §7.4</Eyebrow>
          <div style={{ font: "400 11.5px/1.5 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.55)' }}>Emails 2–5 all reach for urgency. Each one lands weaker than the last.</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 56 }}>
            {[[100, 'rgba(255,105,180,.5)', 0], [72, 'rgba(247,183,205,.55)', .08], [48, 'rgba(255,77,109,.6)', .16], [29, 'rgba(255,77,109,.7)', .24], [16, 'rgba(255,77,109,.8)', .32]].map(([h, bg, d], i) => <VBar key={i} h={h} background={bg} delay={d} />)}
          </div>
          <div style={{ padding: '10px 11px', borderRadius: 9, border: '1px dashed rgba(255,77,109,.32)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span className="mono" style={{ fontSize: 9.5, color: 'var(--red)' }}>B4 · TAXONOMY UNDEFINED</span>
            <span style={{ font: "400 10.5px/1.45 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.5)' }}>Easier now that copy is pre-tagged, but "count" still needs a definition. Curve is illustrative.</span>
          </div>
        </div>

        <div className="gl2" style={{ padding: '14px 15px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="mono" style={{ fontSize: 9.5, letterSpacing: '.1em', color: 'rgba(251,233,236,.4)' }}>REACHABILITY CHECK</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--pink)', animation: 'pulseDot 2.2s ease-in-out infinite' }} /><span style={{ font: "400 11.5px/1.5 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.6)' }}>Every persona can reach S_converted · no dead-end sinks</span></div>
          <div style={{ font: "400 10.5px/1.45 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.42)' }}>A population that can't convert would make any funnel look broken.</div>
        </div>
      </div>
    </div>
  );
}
