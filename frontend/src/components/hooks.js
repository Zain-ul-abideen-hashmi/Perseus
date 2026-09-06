import { useEffect, useRef, useState } from 'react';

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useCountUp(value, { duration = 900, format = (n) => Math.round(n) } = {}) {
  const [display, setDisplay] = useState(() => format(value));
  const fromRef = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    if (reduceMotion()) { setDisplay(format(value)); return; }
    const from = fromRef.current;
    const to = value;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(format(from + (to - from) * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);

  }, [value, duration]);

  return display;
}

export function useTweenArray(target, duration = 550) {
  const [vals, setVals] = useState(target);
  const fromRef = useRef(target);
  const raf = useRef(0);

  useEffect(() => {
    if (reduceMotion()) { setVals(target); fromRef.current = target; return; }
    const from = fromRef.current;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVals(target.map((to, i) => (from[i] ?? to) + (to - (from[i] ?? to)) * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);

  }, [JSON.stringify(target), duration]);

  return vals;
}

export function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}
