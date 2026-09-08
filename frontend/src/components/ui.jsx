import { useCountUp } from './hooks.js';

export function Count({ value, suffix = '', decimals = 0, duration = 900, ...rest }) {
  const text = useCountUp(value, {
    duration,
    format: (n) => `${decimals ? n.toFixed(decimals) : Math.round(n)}${suffix}`,
  });
  return <span {...rest}>{text}</span>;
}

export function Eyebrow({ children, color = 'rgba(251,233,236,.42)', style }) {
  return (
    <div className="mono" style={{ fontSize: 9.5, letterSpacing: '.12em', color, ...style }}>
      {children}
    </div>
  );
}

const TONES = {
  red:   ['rgba(255,77,109,.16)', 'var(--red)'],
  red2:  ['rgba(255,77,109,.2)',  'var(--red)'],
  pink:  ['rgba(255,105,180,.15)', 'var(--pink)'],
  blush: ['rgba(247,183,205,.16)', 'var(--blush)'],
  blue:  ['rgba(123,147,212,.16)', 'var(--blue)'],
  mauve: ['rgba(192,123,168,.16)', 'var(--mauve)'],
  mute:  ['rgba(255,255,255,.07)', 'rgba(251,233,236,.55)'],
};

export function Tag({ tone = 'mute', children, style }) {
  const [bg, color] = TONES[tone] || TONES.mute;
  return (
    <span
      className="mono"
      style={{ fontSize: 9.5, letterSpacing: '.06em', padding: '4px 8px', borderRadius: 5, background: bg, color, whiteSpace: 'nowrap', ...style }}
    >
      {children}
    </span>
  );
}

export function Meter({ label, value, pct, color = 'var(--pink)', glow = 'rgba(255,105,180,.4)', height = 6 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div className="mono" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, color: 'rgba(251,233,236,.6)' }}>{label}</span>
        {value != null && <span style={{ fontSize: 11 }}>{value}</span>}
      </div>
      <div style={{ height, borderRadius: 3, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
        <div
          style={{
            width: `${Math.max(0, Math.min(100, pct))}%`,
            height,
            borderRadius: 3,
            background: `linear-gradient(90deg,${color}55,${color})`,
            boxShadow: `0 0 12px ${glow}`,
            transition: 'width .6s cubic-bezier(.16,1,.3,1)',
          }}
        />
      </div>
    </div>
  );
}

export function ChannelRow({ label, pct, count, color = 'var(--pink)', dim = false, strike = false, note }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, opacity: dim ? 0.4 : 1 }}>
      <span className="mono" style={{ fontSize: 10.5, width: 72, color: 'rgba(251,233,236,.55)', textDecoration: strike ? 'line-through' : 'none' }}>{label}</span>
      <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'rgba(255,255,255,.09)' }}>
        {pct != null && <div style={{ width: `${pct}%`, height: 5, borderRadius: 3, background: color }} />}
      </div>
      <span className="mono" style={{ fontSize: 10, color: 'rgba(251,233,236,.45)' }}>{note ?? count}</span>
    </div>
  );
}

export function VBar({ h, delay = 0, background, glow }) {
  return (
    <div
      className="bar"
      style={{
        flex: 1,
        height: `${h}%`,
        borderRadius: '3px 3px 0 0',
        background,
        animationDelay: `${delay}s`,
        boxShadow: glow ? `0 0 ${glow}` : undefined,
      }}
    />
  );
}
