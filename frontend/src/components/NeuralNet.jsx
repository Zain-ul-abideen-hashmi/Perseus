// Animated attention network on <canvas>: signals travel the edges; holds one static frame under reduced-motion.
import { useRef, useEffect } from 'react';

const PALETTE = {
  edge: 'rgba(255,105,180,0.10)',
  edgeHot: 'rgba(255,105,180,0.55)',
  node: 'rgba(251,233,236,0.35)',
  nodeGlow: '#ff69b4',
  signal: '#ffd7ea',
  input: '#7b93d4',
  output: '#ff4d6d',
};

export default function NeuralNet({ layers = [5, 8, 8, 4], height = 300, speed = 1 }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes = [];
    let edges = [];
    let signals = [];
    let raf = 0, t0 = performance.now();

    function build() {
      const rect = wrap.getBoundingClientRect();
      W = rect.width; H = height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(W * dpr));
      canvas.height = Math.max(1, Math.floor(H * dpr));
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = [];
      const padX = 34, padY = 26;
      const cols = layers.length;
      layers.forEach((count, li) => {
        const x = cols === 1 ? W / 2 : padX + (li * (W - padX * 2)) / (cols - 1);
        for (let i = 0; i < count; i++) {
          const y = count === 1 ? H / 2 : padY + (i * (H - padY * 2)) / (count - 1);
          nodes.push({ x, y, layer: li, idx: i, glow: 0, r: li === 0 || li === cols - 1 ? 4.2 : 3.4 });
        }
      });

      edges = [];
      for (let li = 0; li < cols - 1; li++) {
        const a = nodes.filter((n) => n.layer === li);
        const b = nodes.filter((n) => n.layer === li + 1);
        a.forEach((na) => b.forEach((nb) => edges.push({ a: na, b: nb })));
      }
      signals = [];
    }

    function spawn() {

      const firstEdges = edges.filter((e) => e.a.layer === 0);
      if (!firstEdges.length) return;
      const e = firstEdges[(Math.random() * firstEdges.length) | 0];
      signals.push({ edge: e, t: 0, speed: (0.6 + Math.random() * 0.7) * speed });
    }

    function nextEdgeFrom(node) {
      const outs = edges.filter((e) => e.a === node);
      return outs.length ? outs[(Math.random() * outs.length) | 0] : null;
    }

    function draw(now) {
      const dt = Math.min(48, now - t0) / 1000;
      t0 = now;
      ctx.clearRect(0, 0, W, H);

      ctx.lineWidth = 1;
      for (const e of edges) {
        ctx.strokeStyle = PALETTE.edge;
        ctx.beginPath();
        ctx.moveTo(e.a.x, e.a.y);
        ctx.lineTo(e.b.x, e.b.y);
        ctx.stroke();
      }

      const cols = layers.length;
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.t += dt * s.speed;
        const e = s.edge;
        const tt = Math.min(1, s.t);
        const x = e.a.x + (e.b.x - e.a.x) * tt;
        const y = e.a.y + (e.b.y - e.a.y) * tt;

        ctx.strokeStyle = PALETTE.edgeHot;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(e.a.x, e.a.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.arc(x, y, 2.6, 0, Math.PI * 2);
        ctx.fillStyle = PALETTE.signal;
        ctx.shadowColor = PALETTE.nodeGlow;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (s.t >= 1) {
          e.b.glow = 1;
          const nxt = nextEdgeFrom(e.b);
          if (nxt && e.b.layer < cols - 1) {
            s.edge = nxt; s.t = 0; s.speed = (0.6 + Math.random() * 0.7) * speed;
          } else {
            signals.splice(i, 1);
          }
        }
      }

      for (const n of nodes) {
        n.glow = Math.max(0, n.glow - dt * 1.6);
        const base = n.layer === 0 ? PALETTE.input : n.layer === cols - 1 ? PALETTE.output : PALETTE.node;
        const r = n.r + n.glow * 2.4;
        if (n.glow > 0.02) {
          ctx.shadowColor = PALETTE.nodeGlow;
          ctx.shadowBlur = 16 * n.glow;
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.glow > 0.02
          ? `rgba(255,105,180,${0.5 + n.glow * 0.5})`
          : base;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(draw);
    }

    build();
    if (reduce) {

      nodes.forEach((n, i) => (n.glow = i % 5 === 0 ? 0.8 : 0));
      draw(performance.now());
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
      const spawner = setInterval(() => { if (signals.length < 7) spawn(); }, 520 / speed);
      const ro = new ResizeObserver(() => build());
      ro.observe(wrap);
      return () => { cancelAnimationFrame(raf); clearInterval(spawner); ro.disconnect(); };
    }
    return () => cancelAnimationFrame(raf);
  }, [layers, height, speed]);

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%', height }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height }} />
    </div>
  );
}
