import { useEffect, useRef, useState } from 'react';

const BASE = import.meta.env.BASE_URL;

interface Vehicle {
  label: string;
  subtitle: string;
  img: string;
  imgPos: string;
  darkText?: boolean;
}

const vehicles: Vehicle[] = [
  { label: 'Model S', subtitle: 'Sport Sedan', img: `${BASE}grid-model-s.jpg`, imgPos: 'center center' },
  { label: 'Model Y', subtitle: 'Midsize SUV',  img: `${BASE}grid-model-y.jpg`, imgPos: 'center 55%' },
  { label: 'Model 3', subtitle: 'Compact Sedan', img: `${BASE}grid-model-3.jpg`, imgPos: 'center center' },
  { label: 'Model X', subtitle: 'Full-Size SUV', img: `${BASE}grid-model-x.jpg`, imgPos: 'center center' },
  { label: 'Cybertruck', subtitle: 'Pickup Truck', img: `${BASE}grid-cybertruck.jpg`, imgPos: 'center center', darkText: false },
];

function Card({ v, isLast, idx }: { v: Vehicle; isLast: boolean; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      position: 'relative',
      height: isLast ? '52vh' : '68vh',
      minHeight: isLast ? '360px' : '420px',
      overflow: 'hidden',
      gridColumn: isLast ? '1 / -1' : undefined,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity .7s ease ${idx * 0.08}s, transform .7s ease ${idx * 0.08}s`,
      background: '#1a1a1a',
    }}>
      {/* Photo with Ken Burns effect on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${v.img})`,
        backgroundSize: 'cover',
        backgroundPosition: v.imgPos,
        transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
      }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
      />

      {/* Bottom gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.62) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Label — top left */}
      <div style={{ position: 'absolute', top: '24px', left: '28px', zIndex: 2 }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.72)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{v.subtitle}</div>
        <div style={{ fontSize: '22px', fontWeight: 600, color: '#fff', marginTop: '2px', letterSpacing: '-0.2px' }}>{v.label}</div>
      </div>

      {/* CTAs — bottom center */}
      <div style={{ position: 'absolute', bottom: '22px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '12px', zIndex: 2 }}>
        <button style={{
          padding: '10px 28px', borderRadius: '4px', fontSize: '13px', fontWeight: 500,
          background: 'rgba(23,26,32,0.82)', color: '#fff', cursor: 'pointer',
          backdropFilter: 'blur(6px)', transition: 'background .2s, transform .15s', minWidth: '136px',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(23,26,32,1)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(23,26,32,0.82)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
        >Order Now</button>
        <button style={{
          padding: '10px 28px', borderRadius: '4px', fontSize: '13px', fontWeight: 500,
          background: 'rgba(255,255,255,0.68)', color: '#171a20', cursor: 'pointer',
          backdropFilter: 'blur(6px)', transition: 'background .2s, transform .15s', minWidth: '136px',
        }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.93)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.68)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
        >Learn More</button>
      </div>
    </div>
  );
}

export default function VehicleGrid() {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', background: '#f0f0f0' }}>
      {vehicles.map((v, i) => (
        <Card key={v.label} v={v} isLast={i === vehicles.length - 1 && vehicles.length % 2 !== 0} idx={i} />
      ))}
    </section>
  );
}
