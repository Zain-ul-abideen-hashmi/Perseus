// Ambient backdrop: colour blobs + a cursor-reactive particle field + a spotlight; static under reduced-motion.
import { useRef, useEffect } from 'react';

export default function Background() {
  const canvasRef = useRef(null);
  const spotRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    let pts = [];
    let raf = 0, last = performance.now();
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.min(80, Math.round((W * H) / 22000));
      pts = Array.from({ length: target }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 0.8 + Math.random() * 1.6,
      }));
    }

    const LINK = 132;
    function frame(now) {
      const dt = Math.min(40, now - last) / 16.67;
      last = now;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.x < -20) p.x = W + 20; if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; if (p.y > H + 20) p.y = -20;

        const dxm = mouse.x - p.x, dym = mouse.y - p.y;
        const dm2 = dxm * dxm + dym * dym;
        if (dm2 < 200 * 200) { p.x += dxm * 0.0009 * dt; p.y += dym * 0.0009 * dt; }
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const o = (1 - Math.sqrt(d2) / LINK) * 0.16;
            ctx.strokeStyle = `rgba(255,105,180,${o})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 170 * 170) {
          const o = (1 - Math.sqrt(d2) / 170) * 0.5;
          ctx.strokeStyle = `rgba(255,77,109,${o})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(251,233,236,0.35)';
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    function onMove(e) {
      mouse.tx = e.clientX; mouse.ty = e.clientY;
      if (spotRef.current) {
        spotRef.current.style.setProperty('--mx', e.clientX + 'px');
        spotRef.current.style.setProperty('--my', e.clientY + 'px');
        spotRef.current.style.opacity = '1';
      }
    }
    function onLeave() {
      mouse.tx = -9999; mouse.ty = -9999;
      if (spotRef.current) spotRef.current.style.opacity = '0';
    }

    resize();
    window.addEventListener('resize', resize);
    if (reduce) {

      last = performance.now();
      ctx.clearRect(0, 0, W, H);
      for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(251,233,236,0.3)'; ctx.fill(); }
      return () => window.removeEventListener('resize', resize);
    }
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }} aria-hidden="true">
      <div style={{ position: 'absolute', top: -160, left: -120, width: 620, height: 620, borderRadius: '50%', background: 'radial-gradient(circle,rgba(136,17,68,.34),transparent 66%)', filter: 'blur(50px)', animation: 'blobA 24s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: -220, right: -140, width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(128,0,33,.26),transparent 66%)', filter: 'blur(60px)', animation: 'blobB 31s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: '34%', left: '44%', width: 460, height: 460, borderRadius: '50%', background: 'radial-gradient(circle,rgba(36,58,102,.2),transparent 68%)', filter: 'blur(60px)', animation: 'blobA 38s ease-in-out infinite reverse' }} />
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      <div ref={spotRef} style={{ position: 'absolute', inset: 0, opacity: 0, transition: 'opacity .4s ease', background: 'radial-gradient(360px circle at var(--mx,-100px) var(--my,-100px), rgba(255,105,180,.09), transparent 60%)' }} />
      <img src="/perseus-crest.png" alt="" style={{ position: 'absolute', right: -60, bottom: -40, width: 520, height: 520, maxWidth: '70vw', objectFit: 'contain', opacity: 0.1, filter: 'blur(.5px)' }} />
    </div>
  );
}
