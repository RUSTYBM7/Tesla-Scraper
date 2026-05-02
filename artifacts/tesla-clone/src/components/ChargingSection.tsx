import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { containerRef, bgRef } = useParallax(0.32);

  const setRefs = (el: HTMLElement | null) => {
    (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
    (containerRef as React.MutableRefObject<HTMLElement | null>).current = el;
  };

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={setRefs} style={{ position: 'relative', height: '100vh', minHeight: '560px', overflow: 'hidden' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={bgRef} style={{ position: 'absolute', top: '-20%', left: 0, width: '100%', height: '140%', willChange: 'transform', pointerEvents: 'none' }}>
        <div style={{ width: '100%', height: '100%', backgroundImage: `url(${BASE}tesla-supercharger-new.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center', transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(0,0,0,.12) 0%, rgba(0,0,0,.58) 100%)' }} />

      {/* Stats */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-58%)', display: 'flex', gap: 'clamp(24px,5vw,64px)', zIndex: 2, flexWrap: 'wrap', justifyContent: 'center', opacity: visible ? 1 : 0, transition: 'opacity .9s ease .3s' }}>
        {stats.map(({ val, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.72)', marginTop: '8px', maxWidth: '140px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Bottom content */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '68px', zIndex: 2, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity .7s ease .2s, transform .7s ease .2s' }}>
        <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 600, color: '#fff', marginBottom: '8px', textAlign: 'center' }}>Supercharging</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.8)', marginBottom: '26px', textAlign: 'center', padding: '0 24px' }}>Go anywhere with the world's largest fast charging network</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => navigate('/contact?subject=charging')} style={{ padding: '12px 36px', borderRadius: '4px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', background: 'rgba(23,26,32,.86)', color: '#fff', border: 'none', backdropFilter: 'blur(6px)', transition: 'background .2s, transform .15s', fontFamily: 'inherit' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#171a20'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(23,26,32,.86)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >Find a Charger</button>
          <button onClick={() => navigate('/contact?subject=charging')} style={{ padding: '12px 36px', borderRadius: '4px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', background: 'rgba(255,255,255,.68)', color: '#171a20', border: 'none', backdropFilter: 'blur(6px)', transition: 'background .2s, transform .15s', fontFamily: 'inherit' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.93)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.68)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >Learn More</button>
        </div>
      </div>
    </section>
  );
}
