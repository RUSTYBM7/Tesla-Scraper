import { useEffect, useRef } from 'react';

/**
 * Smooth parallax scroll effect.
 * Returns refs for the outer container and the background element.
 * The background should be oversized (height:140%, top:-20%) and use will-change:transform.
 *
 * @param speed  0 = no movement, 0.4 = moderate, 0.6 = strong. Default 0.35.
 */
export function useParallax(speed = 0.35) {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number | null = null;

    const update = () => {
      raf = null;
      if (!containerRef.current || !bgRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // offset: negative when section above viewport center, positive when below
      const offset = rect.top * speed;
      bgRef.current.style.transform = `translateY(${offset}px)`;
    };

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // initial position
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return { containerRef, bgRef };
}
