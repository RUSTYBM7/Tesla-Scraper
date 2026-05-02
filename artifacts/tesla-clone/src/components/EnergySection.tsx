import { useEffect, useRef, useState } from 'react';

const BASE = import.meta.env.BASE_URL;

const cards = [
  { title: 'Solar Panels', sub: 'Produce Clean Energy From Your Roof', p1: 'Order Now', p2: 'Learn More', p1Subject: 'order', img: `${BASE}tesla-energy-new.jpg`, imgPos: 'center center', textLight: false },
  { title: 'Powerwall', sub: 'Power Your Home After Sundown', p1: 'Order Now', p2: 'Learn More', p1Subject: 'order', img: `${BASE}energy-powerwall2.jpg`, imgPos: 'center center', textLight: true },
  { title: 'Solar Roof', sub: 'Looks Great. Generates Clean Energy.', p1: 'Order Now', p2: 'Learn More', p1Subject: 'order', img: `${BASE}energy-solar-roof.jpg`, imgPos: 'center bottom', textLight: false },
  { title: 'Megapack', sub: 'Utility-Scale Energy Storage', p1: 'Learn More', p2: 'Contact Sales', p1Subject: 'general', img: `${BASE}energy-megapack.jpg`, imgPos: 'center center', textLight: true },
];

function EnergyCard({ c, i }: { c: typeof cards[0]; i: number }) {
  const [vis, setVis] = useState(false);
  const [hovered, setHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.04 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let raf: number | null = null;
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;
    const update = () => {
      raf = null;
      const rect = section.getBoundingClientRect();
      const progress = -rect.top / window.innerHeight;
      bg.style.transform = `translateY(${(progress * 60).toFixed(2)}px)`;
    };
    const onScroll = () => { if (raf === null) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const tc = c.textLight ? '#fff' : '#171a20';
  const sc = c.textLight ? 'rgba(255,255,255,.75)' : '#5c5e62';

  return (
    <section ref={sectionRef} style={{ position: 'relative', height: '100vh', minHeight: '600px', overflow: 'hidden', background: '#0a0a0a' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={bgRef} style={{ position: 'absolute', top: '-15%', left: 0, width: '100%', height: '130%', willChange: 'transform', pointerEvents: 'none' }}>
        <div style={{ width: '100%', height: '100%', backgroundImage: `url(${c.img})`, backgroundSize: 'cover', backgroundPosition: c.imgPos, transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: c.textLight ? 'linear-gradient(180deg,rgba(0,0,0,.22) 0%,rgba(0,0,0,.05) 40%,rgba(0,0,0,.5) 100%)' : 'linear-gradient(180deg,rgba(255,255,255,.12) 0%,transparent 38%,rgba(0,0,0,.18) 100%)' }} />

      <div style={{ position: 'absolute', top: '12%', left: 0, right: 0, textAlign: 'center', zIndex: 2, padding: '0 24px', opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(16px)', transition: `opacity .7s ease ${i * 0.06}s, transform .7s ease ${i * 0.06}s` }}>
        <h2 style={{ fontSize: 'clamp(32px,4.5vw,58px)', fontWeight: 600, color: tc, letterSpacing: '-1px', lineHeight: 1.05, textShadow: c.textLight ? '0 2px 12px rgba(0,0,0,.4)' : 'none' }}>{c.title}</h2>
      </div>

      <div style={{ position: 'absolute', bottom: '10%', left: 0, right: 0, textAlign: 'center', zIndex: 2, padding: '0 24px', opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(16px)', transition: `opacity .7s ease ${i * 0.06 + 0.1}s, transform .7s ease ${i * 0.06 + 0.1}s` }}>
        <p style={{ fontSize: '15px', color: sc, marginBottom: '20px', textShadow: c.textLight ? '0 1px 6px rgba(0,0,0,.3)' : 'none' }}>{c.sub}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/contact?subject=order&vehicle=solar" style={{
            padding: '13px 44px', borderRadius: '4px', fontSize: '14px', fontWeight: 500, minWidth: '160px', textAlign: 'center', textDecoration: 'none',
            background: 'rgba(23,26,32,.86)', color: '#fff', backdropFilter: 'blur(8px)', transition: 'background .2s, transform .15s', display: 'inline-block',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#171a20'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.025)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(23,26,32,.86)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >{c.p1}</a>
          <a href="/contact?subject=general&vehicle=solar" style={{
            padding: '13px 44px', borderRadius: '4px', fontSize: '14px', fontWeight: 500, minWidth: '160px', textAlign: 'center', textDecoration: 'none',
            background: 'rgba(255,255,255,.76)', color: '#171a20', backdropFilter: 'blur(8px)', transition: 'background .2s, transform .15s', display: 'inline-block',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.95)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.025)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.76)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >{c.p2}</a>
        </div>
      </div>
    </section>
  );
}

export default function EnergySection() {
  return (
    <div>
      {cards.map((c, i) => <EnergyCard key={c.title} c={c} i={i} />)}
    </div>
  );
}
