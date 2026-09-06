import { useId } from 'react';
import { useTweenArray } from './hooks.js';

export function RadarChart({ axes, values, size = 220, color = '#ff69b4' }) {
  const v = useTweenArray(values);
  const gid = useId().replace(/:/g, '');
  const cx = size / 2, cy = size / 2;
  const r = size / 2 - 26;
  const n = axes.length;
  const ang = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i, radius) => [cx + Math.cos(ang(i)) * radius, cy + Math.sin(ang(i)) * radius];
  const poly = v.map((val, i) => pt(i, r * Math.max(0.04, Math.min(1, val))).join(',')).join(' ');
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: size, display: 'block', margin: '0 auto', overflow: 'visible' }}>
      <defs>
        <radialGradient id={`rg${gid}`} cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0.08" />
        </radialGradient>
      </defs>
      {rings.map((rr, i) => (
        <polygon key={i}
          points={axes.map((_, idx) => pt(idx, r * rr).join(',')).join(' ')}
          fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1" />
      ))}
      {axes.map((_, i) => {
        const [x, y] = pt(i, r);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,.07)" strokeWidth="1" />;
      })}
      <polygon points={poly} fill={`url(#rg${gid})`} stroke={color} strokeWidth="2"
        style={{ filter: `drop-shadow(0 0 10px ${color}66)` }} />
      {v.map((val, i) => {
        const [x, y] = pt(i, r * Math.max(0.04, Math.min(1, val)));
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
      })}
      {axes.map((a, i) => {
        const [x, y] = pt(i, r + 15);
        return (
          <text key={i} x={x} y={y} fill="rgba(251,233,236,.6)"
            fontFamily="'JetBrains Mono',monospace" fontSize="8.5"
            textAnchor={Math.abs(Math.cos(ang(i))) < 0.3 ? 'middle' : Math.cos(ang(i)) > 0 ? 'start' : 'end'}
            dominantBaseline="middle">{a.label}</text>
        );
      })}
    </svg>
  );
}

export function AreaChart({ data, height = 90, color = '#ff69b4', markers = [], strokeWidth = 2 }) {
  const gid = useId().replace(/:/g, '');
  const W = 300, H = height;
  const pad = 6;
  const min = Math.min(...data), max = Math.max(...data);
  const span = max - min || 1;
  const xs = (i) => pad + (i * (W - pad * 2)) / (data.length - 1);
  const ys = (val) => H - pad - ((val - min) / span) * (H - pad * 2);
  const pts = data.map((d, i) => [xs(i), ys(d)]);

  let line = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    line += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`;
  }
  const area = `${line} L ${W - pad} ${H} L ${pad} ${H} Z`;
  const head = pts[pts.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" preserveAspectRatio="none" style={{ display: 'block', height }}>
      <defs>
        <linearGradient id={`ag${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#ag${gid})`} style={{ animation: 'fadeIn 1.1s .3s both' }} />
      <path d={line} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
        pathLength="1" style={{ strokeDasharray: 1, strokeDashoffset: 1, animation: 'drawIn 1.3s cubic-bezier(.16,1,.3,1) forwards' }} />
      {markers.map((m, i) => {
        const x = xs(m.i ?? i);
        return <line key={i} x1={x} y1={pad} x2={x} y2={H - pad} stroke="rgba(255,77,109,.3)" strokeWidth="1" strokeDasharray="3 3" />;
      })}
      <circle cx={head[0]} cy={head[1]} r="3.5" fill={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }}>
        <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export function Donut({ value, size = 96, stroke = 9, color = '#ff69b4', track = 'rgba(255,255,255,.08)', label }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.max(0, Math.min(1, value)));
  const gid = useId().replace(/:/g, '');
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id={`dg${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} /><stop offset="100%" stopColor="#a3123f" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={`url(#dg${gid})`} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
          style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(.16,1,.3,1)', filter: `drop-shadow(0 0 6px ${color}66)` }} />
      </svg>
      {label && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          {label}
        </div>
      )}
    </div>
  );
}
