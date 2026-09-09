import { useState } from 'react';
import { Tag } from '../components/ui.jsx';

function tabStyle(active) {
  const base = { padding: '9px 15px', borderRadius: 9, cursor: 'pointer', font: "500 12.5px 'Space Grotesk',sans-serif", borderWidth: 1, borderStyle: 'solid', background: 'transparent' };
  return active
    ? { ...base, background: 'rgba(208,48,94,.16)', borderColor: 'rgba(208,48,94,.45)', color: '#f6dfe4' }
    : { ...base, background: 'rgba(255,255,255,.04)', borderColor: 'rgba(255,255,255,.1)', color: 'rgba(240,237,230,.55)' };
}

const chip = { fontSize: 10.5, padding: '5px 10px', borderRadius: 7, background: 'rgba(255,255,255,.055)', color: 'rgba(240,237,230,.65)' };
const uploadRow = { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 9, background: 'rgba(255,255,255,.04)' };
const kind = { fontSize: 9.5, padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,.07)', color: 'rgba(240,237,230,.55)' };

export default function Intake({ onRun, onBack }) {
  const [mode, setMode] = useState('link');

  return (
    <div className="intake-wrap" style={{ position: 'relative', zIndex: 1, minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 40px' }}>
      <div className="stag" style={{ width: '100%', maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div className="mono" style={{ fontSize: 9.5, letterSpacing: '.13em', color: 'var(--rose)' }}>STEP 1 OF 2 · §6.2 TOUCHPOINT INGESTION</div>
          <div style={{ font: "600 29px/1.12 'Space Grotesk',sans-serif", letterSpacing: '-.02em' }}>Where's the funnel?</div>
          <div style={{ font: "400 13.5px/1.6 'Space Grotesk',sans-serif", color: 'rgba(240,237,230,.6)', maxWidth: '52em' }}>
            Give it a link and it crawls the pages it can reach. Or upload the whole thing — pages, ad copy, email sequences — if some of it isn't public.
          </div>
        </div>

        <div className="gl" style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div onClick={() => setMode('link')} className="btn" style={tabStyle(mode === 'link')}>Paste a link</div>
            <div onClick={() => setMode('upload')} className="btn" style={tabStyle(mode === 'upload')}>Upload files</div>
          </div>

          {mode === 'link' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              <div className="fld" style={{ padding: '13px 15px', borderRadius: 11, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="mono" style={{ fontSize: 10, padding: '3px 7px', borderRadius: 5, background: 'rgba(208,48,94,.16)', color: 'var(--salmon)' }}>URL</span>
                <input defaultValue="https://ridgelinedental.com/implants" className="mono" style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', color: 'rgba(240,237,230,.85)', fontSize: 12.5 }} />
                <span style={{ width: 1, height: 15, background: 'var(--rose)', animation: 'blink 1.1s steps(1) infinite' }} />
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span className="mono" style={chip}>+ /pricing</span>
                <span className="mono" style={chip}>+ /book</span>
                <span className="mono" style={chip}>+ 6 ads · meta</span>
                <span className="mono" style={{ ...chip, background: 'transparent', border: '1px dashed rgba(255,255,255,.18)', color: 'rgba(240,237,230,.42)' }}>add another</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 13px', borderRadius: 10, background: 'rgba(255,255,255,.035)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--salmon)', animation: 'pulseDot 2s ease-in-out infinite' }} />
                <span style={{ font: "400 12px 'Space Grotesk',sans-serif", color: 'rgba(240,237,230,.6)' }}>Found 4 pages and 9 emails linked from this domain.</span>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              <div className="fld" style={{ padding: '30px 20px', borderRadius: 12, border: '1px dashed rgba(208,48,94,.4)', background: 'rgba(208,48,94,.045)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9, textAlign: 'center' }}>
                <span className="mono" style={{ fontSize: 10.5, letterSpacing: '.1em', color: 'var(--salmon)' }}>DROP THE FUNNEL HERE</span>
                <span style={{ font: "400 12.5px/1.5 'Space Grotesk',sans-serif", color: 'rgba(240,237,230,.55)', maxWidth: '32em' }}>HTML exports, PDFs, ad copy, email sequences, screenshots. Anything a visitor would see.</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <div style={uploadRow}><span className="mono" style={kind}>HTML</span><span className="mono" style={{ fontSize: 11.5, color: 'rgba(240,237,230,.7)' }}>implants-landing.html</span><span className="mono" style={{ marginLeft: 'auto', fontSize: 10.5, color: 'var(--salmon)' }}>tagged · landing</span></div>
                <div style={uploadRow}><span className="mono" style={kind}>CSV</span><span className="mono" style={{ fontSize: 11.5, color: 'rgba(240,237,230,.7)' }}>welcome-sequence.csv</span><span className="mono" style={{ marginLeft: 'auto', fontSize: 10.5, color: 'var(--salmon)' }}>5 emails · tagged</span></div>
                <div style={uploadRow}><span className="mono" style={kind}>PDF</span><span className="mono" style={{ fontSize: 11.5, color: 'rgba(240,237,230,.7)' }}>meta-ad-copy-q3.pdf</span><span className="mono" style={{ marginLeft: 'auto', fontSize: 10.5, color: 'rgba(240,237,230,.42)' }}>needs a stage</span></div>
              </div>
            </div>
          )}
        </div>

        <div className="two-even">
          <div className="gl2" style={{ padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: 7 }}>
            <div className="mono" style={{ fontSize: 9, letterSpacing: '.12em', color: 'rgba(240,237,230,.42)' }}>WHAT IT WON'T TAKE</div>
            <div style={{ font: "400 11.5px/1.5 'Space Grotesk',sans-serif", color: 'rgba(240,237,230,.55)' }}>Call recordings. Consent law varies by state, so the voice channel is out of scope entirely (§8).</div>
          </div>
          <div className="gl2" style={{ padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: 7 }}>
            <div className="mono" style={{ fontSize: 9, letterSpacing: '.12em', color: 'rgba(240,237,230,.42)' }}>HOW LONG IT TAKES</div>
            <div style={{ font: "400 11.5px/1.5 'Space Grotesk',sans-serif", color: 'rgba(240,237,230,.55)' }}>Under a minute for a funnel this size. Close the tab if you like — it finishes without you.</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div onClick={() => onRun({ mode })} className="btn" style={{ padding: '13px 26px', borderRadius: 11, background: 'linear-gradient(135deg,#d0305e,#a3123f)', color: '#fff6f8', font: "600 13.5px 'Space Grotesk',sans-serif", cursor: 'pointer', boxShadow: '0 4px 20px rgba(163,18,63,.3)' }}>
            Run the simulation
          </div>
          <div onClick={onBack} style={{ padding: '13px 18px', font: "500 12.5px 'Space Grotesk',sans-serif", color: 'rgba(240,237,230,.45)', cursor: 'pointer' }}>Back</div>
        </div>
      </div>
    </div>
  );
}
