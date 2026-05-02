import { useEffect, useRef, useState } from 'react';
import { useParallax } from '../hooks/use-parallax';

const BASE = import.meta.env.BASE_URL;

const stats = [
  { val: '45,000+', label: 'Superchargers Worldwide' },
  { val: '15 min', label: 'to add 200 miles of range' },
  { val: '99.97%', label: 'Network Uptime' },
];

export default function ChargingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { containerRef, bgRef } = useParallax(0.35);

  // Merge sectionRef and containerRef
  const setRefs = (el: HTMLElement | null) => {
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
    (containerRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={setRefs} style={{
      position: 'relative',
      height: '100vh',
      minHeight: '560px',
      overflow: 'hidden',
    }}>
      {/* Parallax background — oversized so translateY has room */}
      <div ref={bgRef} style={{
        position: 'absolute',
        top: '-20%', left: 0, width: '100%', height: '140%',
        backgroundImage: `url(${BASE}supercharger.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        willChange: 'transform',
      }} />

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Stats row */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        gap: '64px',
        zIndex: 2,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.9s ease 0.35s',
      }}>
        {stats.map(({ val, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '38px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', marginTop: '8px', maxWidth: '140px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Bottom content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: '72px', zIndex: 2,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
      }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '8px', textAlign: 'center' }}>
          Supercharging
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '28px', textAlign: 'center' }}>
          Go anywhere with the world's largest fast charging network
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            padding: '11px 32px', borderRadius: '4px', fontSize: '14px', fontWeight: 500,
            background: 'rgba(23,26,32,0.85)', color: '#fff', border: 'none', cursor: 'pointer',
            backdropFilter: 'blur(6px)', transition: 'background 0.2s, transform 0.15s',
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#171a20'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(23,26,32,0.85)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >Find a Charger</button>
          <button style={{
            padding: '11px 32px', borderRadius: '4px', fontSize: '14px', fontWeight: 500,
            background: 'rgba(255,255,255,0.65)', color: '#171a20', border: 'none', cursor: 'pointer',
            backdropFilter: 'blur(6px)', transition: 'background 0.2s, transform 0.15s',
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.92)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.65)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >Learn More</button>
        </div>
      </div>
    </section>
  );
}
