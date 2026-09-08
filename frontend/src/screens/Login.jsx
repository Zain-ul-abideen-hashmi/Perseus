import Crest from '../components/Crest.jsx';

const stepList = [
  ['01', 'Point it at a live funnel — a link, or an export.'],
  ['02', 'It runs the simulation and ranks the friction for you.'],
  ['03', 'Nothing changes on your site until a live test earns it.'],
];

const fld = {
  padding: '11px 13px', borderRadius: 10, background: 'rgba(255,255,255,.04)',
  border: '1px solid rgba(255,255,255,.11)', display: 'flex', alignItems: 'center', gap: 8,
};

export default function Login({ onContinue }) {
  return (
    <div className="auth-split">

      <div className="auth-pitch">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, animation: 'fadeIn .6s both' }}>
          <Crest w={38} h={34} eye={{ w: 6, h: 4 }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ font: "600 15px 'Space Grotesk',sans-serif", letterSpacing: '-.01em' }}>Perseus</div>
            <div className="mono" style={{ fontSize: 9.5, letterSpacing: '.1em', color: 'rgba(240,237,230,.4)' }}>v4.0.0-DRAFT</div>
          </div>
        </div>

        <div className="stag" style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 480 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            <div className="shine" style={{ font: "600 38px/1.08 'Space Grotesk',sans-serif", letterSpacing: '-.025em' }}>
              See where your funnel loses people.
            </div>
            <div style={{ font: "400 14.5px/1.6 'Space Grotesk',sans-serif", color: 'rgba(240,237,230,.6)', textWrap: 'pretty' }}>
              Perseus builds a population of buyers matched to your real traffic, walks every one through your funnel,
              then tells you which step is costing you the most and why.
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {stepList.map(([n, t]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
                <span className="mono" style={{ fontSize: 10, color: 'var(--rose)', paddingTop: 2 }}>{n}</span>
                <span style={{ font: "400 13px/1.55 'Space Grotesk',sans-serif", color: 'rgba(240,237,230,.62)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mono" style={{ fontSize: 10, color: 'rgba(240,237,230,.32)', animation: 'fadeIn .8s .3s both' }}>
          Concept build · simulated data only
        </div>
      </div>

      <div className="auth-form-wrap" style={{ position: 'relative' }}>

        <div aria-hidden="true" style={{ position: 'absolute', width: 460, height: 460, maxWidth: '92vw', pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle,rgba(208,48,94,.18),transparent 62%)', filter: 'blur(24px)', animation: 'markPulse 6s ease-in-out infinite' }} />
          <div className="orbit-ring">
            <span className="orbit-dot" style={{ transform: 'translate(-50%,-50%) translateX(210px)' }} />
            <span className="orbit-dot" style={{ transform: 'translate(-50%,-50%) translateX(-210px)', background: '#7b93d4', boxShadow: '0 0 10px 2px rgba(123,147,212,.6)' }} />
          </div>
          <div className="orbit-ring rev">
            <span className="orbit-dot" style={{ transform: 'translate(-50%,-50%) translateY(200px)', width: 4, height: 4, background: '#f7b7cd' }} />
            <span className="orbit-dot" style={{ transform: 'translate(-50%,-50%) translateY(-200px)', width: 4, height: 4 }} />
          </div>
        </div>
        <form
          className="gl stag lift"
          onSubmit={(e) => { e.preventDefault(); onContinue(); }}
          style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 352, padding: '30px 30px 26px', display: 'flex', flexDirection: 'column', gap: 18 }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ font: "600 20px 'Space Grotesk',sans-serif", letterSpacing: '-.015em' }}>Sign in</div>
            <div style={{ font: "400 12.5px 'Space Grotesk',sans-serif", color: 'rgba(240,237,230,.5)' }}>Pilot access only while B1 is open.</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="mono" style={{ fontSize: 9, letterSpacing: '.13em', color: 'rgba(240,237,230,.42)' }}>WORK EMAIL</span>
              <div className="fld" style={fld}>
                <input
                  type="email"
                  defaultValue="dana@ridgelinedental.com"
                  className="mono"
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'rgba(240,237,230,.85)', fontSize: 12 }}
                />
              </div>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="mono" style={{ fontSize: 9, letterSpacing: '.13em', color: 'rgba(240,237,230,.42)' }}>PASSWORD</span>
              <div className="fld" style={fld}>
                <input
                  type="password"
                  defaultValue="perseus4draft"
                  className="mono"
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'rgba(240,237,230,.7)', fontSize: 12, letterSpacing: '.18em' }}
                />
                <span style={{ width: 1, height: 14, background: 'var(--rose)', animation: 'blink 1.1s steps(1) infinite' }} />
              </div>
            </label>
          </div>

          <button type="submit" className="btn" style={{
            padding: 12, borderRadius: 10, border: 'none',
            background: 'linear-gradient(135deg,#d0305e,#a3123f)', color: '#fff6f8',
            font: "600 13.5px 'Space Grotesk',sans-serif", textAlign: 'center', cursor: 'pointer',
            boxShadow: '0 4px 18px rgba(163,18,63,.28)',
          }}>Sign in</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.09)' }} />
            <span className="mono" style={{ fontSize: 9.5, color: 'rgba(240,237,230,.3)' }}>OR</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.09)' }} />
          </div>

          <button type="button" onClick={onContinue} className="fld" style={{
            padding: 11, borderRadius: 10, border: '1px solid rgba(255,255,255,.13)', background: 'transparent',
            textAlign: 'center', cursor: 'pointer', font: "500 12.5px 'Space Grotesk',sans-serif", color: 'rgba(240,237,230,.75)',
          }}>Continue with Google</button>

          <div style={{ font: "400 11px/1.5 'Space Grotesk',sans-serif", color: 'rgba(240,237,230,.35)', textAlign: 'center' }}>
            Your funnel content stays in your workspace. Never pooled with a direct competitor.
          </div>
        </form>
      </div>
    </div>
  );
}
