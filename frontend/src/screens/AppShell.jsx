import Crest from '../components/Crest.jsx';
import { NAV, TITLES } from '../data.js';
import FunnelMap from './app/FunnelMap.jsx';
import Variants from './app/Variants.jsx';
import Replay from './app/Replay.jsx';
import Persona from './app/Persona.jsx';
import Gaze from './app/Gaze.jsx';
import Calibration from './app/Calibration.jsx';
import Bottlenecks from './app/Bottlenecks.jsx';

const SCREENS = {
  funnel: FunnelMap,
  variants: Variants,
  replay: Replay,
  persona: Persona,
  gaze: Gaze,
  cal: Calibration,
  bottle: Bottlenecks,
};

const MOBILE_TABS = [
  { key: 'funnel', label: 'Map' },
  { key: 'variants', label: 'Variants' },
  { key: 'replay', label: 'Replay' },
  { key: 'persona', label: 'Who' },
  { key: 'gaze', label: 'Gaze' },
  { key: 'cal', label: 'Loop' },
  { key: 'bottle', label: 'Bottle' },
];

function navStyle(active) {
  const base = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
    padding: '9px 10px', borderRadius: 9, cursor: 'pointer',
    font: "500 12.5px/1.35 'Inter',system-ui,sans-serif", letterSpacing: '-.005em',

    borderWidth: 1, borderStyle: 'solid',
    background: 'transparent', boxShadow: 'none',
  };
  return active
    ? { ...base, background: 'rgba(255,105,180,.13)', borderColor: 'rgba(255,105,180,.3)', color: '#ffe3ef', boxShadow: '0 0 20px rgba(255,105,180,.1)' }
    : { ...base, borderColor: 'transparent', color: 'rgba(251,233,236,.62)' };
}

export default function AppShell({ screen, setScreen }) {
  const Screen = SCREENS[screen] || FunnelMap;
  const [eyebrow, heading] = TITLES[screen];

  return (
    <div className="app-shell">

      <aside className="app-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, animation: 'fadeIn .6s both' }}>
          <div style={{ position: 'relative', width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,105,180,.07)', border: '1px solid rgba(255,105,180,.2)', flex: 'none' }}>
            <Crest w={30} h={27} eye={{ w: 5, h: 3 }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ font: "600 14px 'Space Grotesk',sans-serif", letterSpacing: '-.01em' }}>Perseus</div>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: '.1em', color: 'rgba(251,233,236,.4)' }}>v4.0.0-DRAFT</div>
          </div>
        </div>

        <nav className="stag" style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {NAV.map((sec) => (
            <div key={sec.group} style={{ display: 'contents' }}>
              <div className="mono" style={{ fontSize: 9, letterSpacing: '.14em', color: 'rgba(251,233,236,.32)', padding: '0 10px 6px' }}>{sec.group}</div>
              {sec.items.map((it) => (
                <div key={it.key} className="nv" onClick={() => setScreen(it.key)} style={navStyle(screen === it.key)}>
                  {it.label}
                  <span className="mono" style={{ fontSize: 9.5, opacity: 0.5 }}>{it.ref}</span>
                </div>
              ))}
            </div>
          ))}
        </nav>

        <div className="gl2" style={{ marginTop: 'auto', padding: 13, display: 'flex', flexDirection: 'column', gap: 9, animation: 'fadeUp .7s .3s both' }}>
          <div className="mono" style={{ fontSize: 9, letterSpacing: '.12em', color: 'rgba(251,233,236,.4)' }}>THIS RUN · §11</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div className="mono" style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 10.5, color: 'rgba(251,233,236,.5)' }}>job mem</span><span style={{ fontSize: 10.5 }}>412 / 500 MB</span></div>
            <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,.1)', overflow: 'hidden' }}><div style={{ width: '82%', height: 4, borderRadius: 2, background: 'linear-gradient(90deg,#ff69b4,#a3123f)', animation: 'fadeIn 1s both' }} /></div>
            <div className="mono" style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 10.5, color: 'rgba(251,233,236,.5)' }}>ai calls</span><span style={{ fontSize: 10.5 }}>22 · 1/touchpoint</span></div>
            <div className="mono" style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 10.5, color: 'rgba(251,233,236,.5)' }}>batch 10⁵</span><span style={{ fontSize: 10.5, color: 'var(--red)' }}>B6 ?</span></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 4px' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--pink)', animation: 'pulseDot 2.4s ease-in-out infinite' }} />
            <span className="mono" style={{ fontSize: 10, color: 'rgba(251,233,236,.45)' }}>simulator idle</span>
          </div>
        </div>
      </aside>

      <main className="app-main">

        <div className="mobile-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Crest w={26} h={23} eye={{ w: 4, h: 3 }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ font: "600 13px 'Space Grotesk',sans-serif" }}>{heading}</span>
              <span className="mono" style={{ fontSize: 8.5, letterSpacing: '.08em', color: 'rgba(251,233,236,.4)' }}>{eyebrow}</span>
            </div>
          </div>
          <span className="mono" style={{ fontSize: 9.5, padding: '5px 9px', borderRadius: 6, background: 'rgba(255,77,109,.16)', color: 'var(--red)' }}>CONCEPT</span>
        </div>

        <div className="app-header" style={{ marginBottom: 22, animation: 'fadeIn .5s both' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: '.13em', color: 'rgba(251,233,236,.4)' }}>{eyebrow}</div>
            <div className="shine" style={{ font: "600 25px/1.15 'Space Grotesk',sans-serif", letterSpacing: '-.02em' }}>{heading}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <div className="gl2" style={{ padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', animation: 'pulseDot 2s ease-in-out infinite' }} />
              <span className="mono" style={{ fontSize: 10, letterSpacing: '.06em', color: 'rgba(251,233,236,.7)' }}>CONCEPT · PRE-IMPLEMENTATION</span>
            </div>
            <div className="gl2" style={{ padding: '7px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="mono" style={{ fontSize: 10, color: 'rgba(251,233,236,.55)' }}>Ridgeline Dental</span>
            </div>
          </div>
        </div>

        <div key={screen} className="screen-enter">
          <Screen go={setScreen} />
        </div>
      </main>

      <nav className="mobile-nav scroll-x">
        {MOBILE_TABS.map((t) => {
          const active = screen === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setScreen(t.key)}
              style={{
                flex: '0 0 auto', minWidth: 62, padding: '8px 10px', borderRadius: 10, cursor: 'pointer',
                border: '1px solid ' + (active ? 'rgba(255,105,180,.35)' : 'transparent'),
                background: active ? 'rgba(255,105,180,.13)' : 'transparent',
                color: active ? '#ffe3ef' : 'rgba(251,233,236,.55)',
                font: "500 11px 'Inter',system-ui,sans-serif",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
