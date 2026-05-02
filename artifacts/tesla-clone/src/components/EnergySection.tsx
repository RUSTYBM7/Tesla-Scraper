import { useEffect, useRef, useState } from 'react';
import { useParallax } from '../hooks/use-parallax';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

const cards = [
  { title: 'Solar Panels', sub: 'Produce Clean Energy From Your Roof', p1: 'Order Now', p2: 'Learn More', img: `${BASE}tesla-energy-new.jpg`, imgPos: 'center center', light: false },
  { title: 'Powerwall', sub: 'Power Your Home After Sundown', p1: 'Order Now', p2: 'Learn More', img: `${BASE}energy-powerwall2.jpg`, imgPos: 'center center', light: true },
  { title: 'Solar Roof', sub: 'Looks Great. Generates Clean Energy.', p1: 'Order Now', p2: 'Learn More', img: `${BASE}energy-solar-roof.jpg`, imgPos: 'center bottom', light: false },
  { title: 'Megapack', sub: 'Utility-Scale Energy Storage', p1: 'Learn More', p2: 'Contact Sales', img: `${BASE}energy-megapack.jpg`, imgPos: 'center center', light: true },
];

function ECard({ c, i, isMobile }: { c: typeof cards[0]; i: number; isMobile: boolean }) {
  const [vis, setVis] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { containerRef, bgRef } = useParallax(isMobile ? 0 : 0.26);

  const setRef = (el: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLElement | null>).current = el;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.06 });
    obs.observe(el);
  };

  const tc = c.light ? '#fff' : '#171a20';

  return (
    <div ref={setRef} style={{
      position:'relative',
      height: isMobile ? '100vh' : '68vh',
      minHeight: isMobile ? '500px' : '420px',
      overflow:'hidden', background:'#111',
      opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity .75s ease ${i * 0.1}s, transform .75s ease ${i * 0.1}s`,
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={bgRef} style={{ position:'absolute', top:'-20%', left:0, width:'100%', height:'140%', willChange:'transform', pointerEvents:'none' }}>
        <div style={{
          width:'100%', height:'100%',
          backgroundImage: `url(${c.img})`,
          backgroundSize:'cover', backgroundPosition: c.imgPos,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition:'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>

      <div style={{ position:'absolute', inset:0, pointerEvents:'none', background: c.light ? 'linear-gradient(180deg,rgba(0,0,0,.06) 0%,rgba(0,0,0,.55) 100%)' : 'linear-gradient(180deg,rgba(255,255,255,.04) 0%,rgba(0,0,0,.32) 100%)' }} />

      <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'22px 26px 32px', zIndex:2, textAlign:'center' }}>
        <h3 style={{ fontSize:'28px', fontWeight:600, color:tc, marginBottom:'8px', textShadow: c.light ? '0 1px 5px rgba(0,0,0,.3)' : 'none' }}>{c.title}</h3>
        <p style={{ fontSize:'15px', color: c.light ? 'rgba(255,255,255,.8)' : '#5c5e62', marginBottom:'20px' }}>{c.sub}</p>
        <div style={{ display:'flex', gap:'10px', justifyContent:'center' }}>
          {[c.p1, c.p2].map((label, bi) => (
            <button key={label} style={{
              padding:'12px 32px', borderRadius:'4px', fontSize:'14px', fontWeight:500, cursor:'pointer',
              background: bi === 0 ? 'rgba(23,26,32,.84)' : 'rgba(255,255,255,.7)',
              color: bi === 0 ? '#fff' : '#171a20',
              backdropFilter:'blur(8px)', border:'none', minWidth:'130px',
              transition:'background .2s, transform .15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = bi === 0 ? '#171a20' : 'rgba(255,255,255,.95)'; (e.currentTarget as HTMLElement).style.transform='scale(1.02)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = bi === 0 ? 'rgba(23,26,32,.84)' : 'rgba(255,255,255,.7)'; (e.currentTarget as HTMLElement).style.transform='scale(1)'; }}
            >{label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function EnergySection() {
  const isMobile = useIsMobile();
  return (
    <section style={{
      display: isMobile ? 'flex' : 'grid',
      flexDirection: isMobile ? 'column' : undefined,
      gridTemplateColumns: isMobile ? undefined : '1fr 1fr',
      gap:'4px', background:'#e0e0e0',
    }}>
      {cards.map((c, i) => <ECard key={c.title} c={c} i={i} isMobile={isMobile} />)}
    </section>
  );
}
