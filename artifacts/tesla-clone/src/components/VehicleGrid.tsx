import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

interface Vehicle {
  label: string;
  subtitle: string;
  slug: string;
  img: string;
  imgPos: string;
  price: string;
  textLight: boolean;
}

const vehicles: Vehicle[] = [
  { label: 'Model S', subtitle: 'Relentless Performance', slug: 'model-s', img: `${BASE}grid-model-s.jpg`, imgPos: 'center 50%', price: 'Starting at $74,990', textLight: true },
  { label: 'Model Y', subtitle: "America's Best-Selling Vehicle", slug: 'model-y', img: `${BASE}grid-model-y.jpg`, imgPos: 'center 50%', price: 'Starting at $44,990', textLight: false },
  { label: 'Model 3', subtitle: 'Order. Drive. Enjoy.', slug: 'model-3', img: `${BASE}grid-model-3.jpg`, imgPos: 'center 50%', price: 'Starting at $40,240', textLight: false },
  { label: 'Model X', subtitle: 'Beyond Ludicrous', slug: 'model-x', img: `${BASE}grid-model-x2.jpg`, imgPos: 'center 50%', price: 'Starting at $79,990', textLight: true },
  { label: 'Cybertruck', subtitle: 'Built for Any Planet', slug: 'cybertruck', img: `${BASE}truck-candidate.jpg`, imgPos: 'center 40%', price: 'Starting at $79,990', textLight: true },
];

function VehicleSection({ v, idx }: { v: Vehicle; idx: number }) {
  const [vis, setVis] = useState(false);
  const [hovered, setHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  const tc = v.textLight ? '#fff' : '#171a20';
  const sc = v.textLight ? 'rgba(255,255,255,.7)' : '#5c5e62';

  return (
    <section ref={sectionRef}
      style={{ position: 'relative', height: '100vh', minHeight: '600px', overflow: 'hidden', background: '#0a0a0a' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={bgRef} style={{ position: 'absolute', top: '-15%', left: 0, width: '100%', height: '130%', willChange: 'transform', pointerEvents: 'none' }}>
        <div style={{
          width: '100%', height: '100%',
          backgroundImage: `url(${v.img})`, backgroundSize: 'cover', backgroundPosition: v.imgPos,
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: v.textLight ? 'linear-gradient(180deg,rgba(0,0,0,.22) 0%,rgba(0,0,0,.05) 40%,rgba(0,0,0,.5) 100%)' : 'linear-gradient(180deg,rgba(255,255,255,.12) 0%,transparent 38%,rgba(0,0,0,.18) 100%)' }} />

      <div style={{ position: 'absolute', top: '12%', left: 0, right: 0, textAlign: 'center', zIndex: 2, padding: '0 24px', opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(16px)', transition: `opacity .7s ease ${idx * 0.06}s, transform .7s ease ${idx * 0.06}s` }}>
        <h2 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 600, color: tc, letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: '10px', textShadow: v.textLight ? '0 2px 12px rgba(0,0,0,.4)' : 'none' }}>{v.label}</h2>
        <p style={{ fontSize: 'clamp(14px,1.4vw,17px)', color: sc, textShadow: v.textLight ? '0 1px 6px rgba(0,0,0,.3)' : 'none' }}>{v.price}</p>
      </div>

      <div style={{ position: 'absolute', bottom: '10%', left: 0, right: 0, textAlign: 'center', zIndex: 2, padding: '0 24px', opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(16px)', transition: `opacity .7s ease ${idx * 0.06 + 0.1}s, transform .7s ease ${idx * 0.06 + 0.1}s` }}>
        <p style={{ fontSize: '14px', color: sc, marginBottom: '20px', textShadow: v.textLight ? '0 1px 6px rgba(0,0,0,.3)' : 'none' }}>{v.subtitle}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate(`/contact?subject=order&vehicle=${v.slug}`)} style={{ padding: '13px 44px', borderRadius: '4px', fontSize: '14px', fontWeight: 500, minWidth: '180px', background: 'rgba(23,26,32,.86)', color: '#fff', border: 'none', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'background .2s, transform .15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#171a20'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.025)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(23,26,32,.86)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >Order Now</button>
          <button onClick={() => navigate(`/vehicles/${v.slug}`)} style={{ padding: '13px 44px', borderRadius: '4px', fontSize: '14px', fontWeight: 500, minWidth: '180px', background: 'rgba(255,255,255,.76)', color: '#171a20', border: 'none', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'background .2s, transform .15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.95)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.025)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.76)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >Learn More</button>
        </div>
      </div>
    </section>
  );
}

export default function VehicleGrid() {
  return (
    <div>
      {vehicles.map((v, i) => <VehicleSection key={v.slug} v={v} idx={i} />)}
    </div>
  );
}
