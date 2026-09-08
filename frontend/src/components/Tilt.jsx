// Pointer-driven 3D tilt + specular glare wrapper; disabled on touch and under reduced-motion.
import { useRef } from 'react';

export default function Tilt({
  as: Tag = 'div',
  className = '',
  style = {},
  max = 8,
  scale = 1.02,
  glare = false,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const glareRef = useRef(null);

  const enabled = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onMove(e) {
    if (!enabled()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
    el.style.transition = 'transform .06s linear';
    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(200px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,.14), transparent 60%)`;
      glareRef.current.style.opacity = '1';
    }
  }
  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
    if (glareRef.current) glareRef.current.style.opacity = '0';
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform', ...(glare ? { position: 'relative', overflow: 'hidden' } : {}) }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
      {glare && (
        <span
          ref={glareRef}
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', opacity: 0, transition: 'opacity .3s ease', pointerEvents: 'none', zIndex: 3 }}
        />
      )}
    </Tag>
  );
}
