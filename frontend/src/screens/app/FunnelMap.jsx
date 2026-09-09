import { Eyebrow, Tag, ChannelRow, VBar, Count } from '../../components/ui.jsx';
import { Donut, AreaChart } from '../../components/charts.jsx';
import Tilt from '../../components/Tilt.jsx';

function TouchCard({ meta, title, theta, thetaColor, tag, tagTone, border, flag, glow, onClick }) {
  return (
    <div
      className={onClick ? 'rw press' : 'gl2'}
      onClick={onClick}
      style={
        flag
          ? { padding: '11px 12px', borderRadius: 12, cursor: 'pointer', background: 'rgba(255,77,109,.09)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,77,109,.35)', borderLeft: '2px solid #ff4d6d', display: 'flex', flexDirection: 'column', gap: 7, boxShadow: '0 0 26px rgba(255,77,109,.14)' }
          : { padding: '11px 12px', display: 'flex', flexDirection: 'column', gap: 7, borderLeft: `2px solid ${border}`, boxShadow: glow ? `0 0 22px ${glow}` : undefined }
      }
    >
      <div className="mono" style={{ fontSize: 9.5, color: 'rgba(251,233,236,.42)' }}>{meta}</div>
      <div style={{ font: "500 12.5px/1.35 'Space Grotesk',sans-serif" }}>{title}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span className="mono" style={{ fontSize: 10, fontWeight: theta.includes('▲') ? 600 : 400, color: thetaColor }}>{theta}</span>
        <Tag tone={tagTone} style={{ fontSize: 8.5, padding: '2px 5px', borderRadius: 3 }}>{tag}</Tag>
      </div>
    </div>
  );
}

export default function FunnelMap({ go }) {
  return (
    <div className="stag" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div className="stat-row">
        <Tilt className="gl lift" glare style={{ padding: '15px 17px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Eyebrow>TOUCHPOINTS</Eyebrow>
            <Count className="mono" style={{ fontSize: 26, fontWeight: 600 }} value={22} />
            <span className="mono" style={{ fontSize: 9.5, color: 'var(--red)' }}>3 above θ trigger</span>
          </div>
        </Tilt>
        <Tilt className="gl lift" glare style={{ padding: '15px 17px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Eyebrow>CONVERSION</Eyebrow>
            <span className="mono" style={{ fontSize: 9.5, color: 'rgba(251,233,236,.45)' }}>simulated · booked</span>
          </div>
          <Donut value={0.12} size={62} stroke={7} color="#ff69b4"
            label={<Count className="mono" style={{ fontSize: 15, fontWeight: 600, color: 'var(--pink)' }} value={12} suffix="%" />} />
        </Tilt>
        <Tilt className="gl lift" glare style={{ padding: '15px 17px', display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
          <Eyebrow>IF TOP FIX LANDS</Eyebrow>
          <Count className="mono shine" style={{ fontSize: 26, fontWeight: 600 }} value={16} suffix="%" />
          <AreaChart data={[12, 12.5, 13, 13.8, 14.5, 15.2, 16]} height={26} color="#ff69b4" strokeWidth={1.6} />
        </Tilt>
        <Tilt className="gl lift" glare style={{ padding: '15px 17px', display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
          <Eyebrow>SIMULATED BUYERS</Eyebrow>
          <Count className="mono" style={{ fontSize: 26, fontWeight: 600 }} value={100000} duration={1200} />
          <span className="mono" style={{ fontSize: 9.5, color: 'rgba(251,233,236,.45)' }}>10⁵ passes · 22 AI reads</span>
        </Tilt>
      </div>

      <div className="two-col left-wide">
      <div className="col">

        <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 15 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
            <Eyebrow>22 TOUCHPOINTS · CHANNEL × ARCHETYPE</Eyebrow>
            <div style={{ display: 'flex', gap: 7 }}>
              <Tag tone="red">SYNTHETIC ONLY · B7</Tag>
              <Tag tone="mute">CLUSTER C-04</Tag>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 11 }}>
            {['AWARENESS', 'CONSIDERATION', 'OBJECTION', 'BOOKING'].map((s) => (
              <div key={s} className="mono" style={{ fontSize: 9.5, letterSpacing: '.1em', color: 'rgba(251,233,236,.35)' }}>{s}</div>
            ))}
          </div>

          <div className="scroll-x">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(150px,1fr))', gap: 11, alignItems: 'start', minWidth: 620 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <TouchCard meta="AD · meta-01" title={'"Same-day crowns, no wait"'} theta="θ 0.21" thetaColor="rgba(251,233,236,.5)" tag="PROOF-GAP" tagTone="blue" border="#7b93d4" />
                <TouchCard meta="SOCIAL · ig-reel-04" title="Before/after carousel" theta="θ 0.09" thetaColor="rgba(251,233,236,.5)" tag="URGENCY" tagTone="pink" border="#ff69b4" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <div className="glow-wrap" style={{ borderRadius: 12 }}>
                  <TouchCard flag onClick={() => go('variants')} meta="LANDING · /implants" title="Hero + credential block" theta="θ 0.68 ▲" thetaColor="var(--red)" tag="TRUST-DEF" tagTone="red2" />
                </div>
                <TouchCard meta="EMAIL · welcome 2/5" title={'"Which option is right"'} theta="θ 0.34" thetaColor="rgba(251,233,236,.5)" tag="PARALYSIS" tagTone="mauve" border="#c07ba8" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <TouchCard meta="EMAIL · objection 3/5" title={'"About the cost…"'} theta="θ 0.57 ▲" thetaColor="var(--blush)" tag="PRICE-OBJ" tagTone="blush" border="#f7b7cd" glow="rgba(247,183,205,.1)" />
                <TouchCard meta="LANDING · /pricing" title="Financing table" theta="θ 0.41" thetaColor="rgba(251,233,236,.5)" tag="PRICE-OBJ" tagTone="blush" border="#f7b7cd" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <TouchCard meta="LANDING · /book" title="Calendar embed" theta="θ 0.28" thetaColor="rgba(251,233,236,.5)" tag="URGENCY" tagTone="pink" border="#ff69b4" />
                <div style={{ padding: '11px 12px', borderRadius: 12, border: '1px dashed rgba(255,255,255,.16)', display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <div className="mono" style={{ fontSize: 9.5, color: 'rgba(251,233,236,.35)' }}>EMAIL · win-back 5/5</div>
                  <div style={{ font: "400 11px/1.4 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.42)' }}>Untagged — needs per-touchpoint archetype</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="gl" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 13 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Eyebrow>θ DISTRIBUTION · TRIGGER 0.50</Eyebrow>
            <div className="mono" style={{ fontSize: 10, color: 'rgba(251,233,236,.4)' }}>3 nodes above bar</div>
          </div>
          <div style={{ position: 'relative', height: 96, display: 'flex', alignItems: 'flex-end', gap: 5 }}>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 8 }}>
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent)', animation: 'sweep 6s ease-in-out infinite' }} />
            </div>
            {[
              [18, 'rgba(255,255,255,.18)', 0], [34, 'rgba(255,255,255,.18)', .05], [53, 'rgba(255,255,255,.18)', .1],
              [79, 'rgba(255,255,255,.2)', .15], [100, 'rgba(255,255,255,.22)', .2], [64, 'rgba(255,255,255,.2)', .25],
              [41, 'rgba(255,255,255,.18)', .3],
            ].map(([h, bg, d], i) => <VBar key={i} h={h} background={bg} delay={d} />)}
            <VBar h={29} delay={.35} background="linear-gradient(180deg,#f7b7cd,rgba(247,183,205,.35))" glow="18px rgba(247,183,205,.35)" />
            <VBar h={17} delay={.4} background="linear-gradient(180deg,#f7b7cd,rgba(247,183,205,.35))" />
            <VBar h={11} delay={.45} background="linear-gradient(180deg,#ff4d6d,rgba(255,77,109,.35))" glow="20px rgba(255,77,109,.4)" />
          </div>
          <div className="mono" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 10, color: 'rgba(251,233,236,.32)' }}>0.0</span>
            <span style={{ fontSize: 10, color: 'rgba(251,233,236,.5)' }}>0.50 trigger</span>
            <span style={{ fontSize: 10, color: 'rgba(251,233,236,.32)' }}>1.0</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="gl" style={{ padding: '17px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Eyebrow>CHANNELS</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <ChannelRow label="landing" pct={40} count={4} />
            <ChannelRow label="ads" pct={60} count={6} />
            <ChannelRow label="social" pct={30} count={3} />
            <ChannelRow label="email" pct={90} count={9} />
            <ChannelRow label="voice" strike dim note="§8" />
          </div>
        </div>

        <div className="gl" style={{ padding: '17px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Eyebrow>BERNARD'S LOOP · TRUST-DEFICIT</Eyebrow>
          <div style={{ font: "400 11.5px/1.5 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.55)' }}>Layer 2 · pooled by archetype, not vertical</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            <ChannelRow label="law" pct={82} note="" color="rgba(251,233,236,.7)" />
            <ChannelRow label="realty" pct={64} note="" color="rgba(251,233,236,.7)" />
            <ChannelRow label="cybersec" pct={37} note="" color="rgba(251,233,236,.7)" />
            <ChannelRow label="dental" pct={14} note="" color="var(--pink)" />
          </div>
          <div style={{ padding: '10px 11px', borderRadius: 9, background: 'rgba(255,77,109,.09)', display: 'flex', gap: 8 }}>
            <span className="mono" style={{ fontSize: 9.5, color: 'var(--red)' }}>B5</span>
            <span style={{ font: "400 10.5px/1.45 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.55)' }}>1 direct competitor excluded pending consent policy.</span>
          </div>
        </div>

        <div className="gl" style={{ padding: '17px 18px', display: 'flex', flexDirection: 'column', gap: 11 }}>
          <Eyebrow color="var(--red)">B2 · BLOCKS POOLING</Eyebrow>
          <div style={{ font: "400 11.5px/1.5 'Space Grotesk',sans-serif", color: 'rgba(251,233,236,.55)' }}>Stage columns are this business's own. No shared normalization exists yet.</div>
          <div onClick={() => go('bottle')} className="rw press" style={{ padding: 9, borderRadius: 9, background: 'rgba(255,255,255,.07)', textAlign: 'center', font: "500 11.5px 'Space Grotesk',sans-serif" }}>Open bottleneck board</div>
        </div>
      </div>
      </div>
    </div>
  );
}
