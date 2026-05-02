import { useEffect, useRef } from 'react';

/**
 * Smooth GPU-composited parallax.
 * containerRef → the clipping section element
 * bgRef        → the oversized background wrapper (top:-20%, height:140%)
 *
 * Only writes translateY — never scale. Keep scale on a separate inner div.
 */
export function useParallax(speed = 0.32) {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number | null = null;
    let lastY = 0;

    const update = () => {
      raf = null;
      if (!containerRef.current || !bgRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const y = rect.top * speed;
      if (Math.abs(y - lastY) < 0.1) return; // skip tiny changes
      lastY = y;
      bgRef.current.style.transform = `translateY(${y.toFixed(2)}px)`;
    };

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return { containerRef, bgRef };
}
