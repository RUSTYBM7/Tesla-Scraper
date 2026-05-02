import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParallax } from '../hooks/use-parallax';

const BASE = import.meta.env.BASE_URL;

export default function FSDSection() {
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
        <div style={{ width: '100%', height: '100%', backgroundImage: `url(${BASE}tesla-interior-fsd.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center 40%', transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(0,0,0,.1) 0%, rgba(0,0,0,.52) 100%)' }} />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '68px', zIndex: 2, opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity .7s ease .15s, transform .7s ease .15s' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', marginBottom: '12px' }}>Full Self-Driving</div>
        <h2 style={{ fontSize: 'clamp(24px,3.5vw,40px)', fontWeight: 600, color: '#fff', marginBottom: '10px', textAlign: 'center', textShadow: '0 1px 8px rgba(0,0,0,.4)', letterSpacing: '-0.5px', padding: '0 24px' }}>Navigate on Autopilot</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.8)', marginBottom: '28px', textAlign: 'center', maxWidth: '480px', padding: '0 24px' }}>Full Self-Driving (Supervised) — available for $99/mo</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => navigate('/contact?subject=demo')} style={{ padding: '13px 36px', borderRadius: '4px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', background: 'rgba(23,26,32,.86)', color: '#fff', border: 'none', backdropFilter: 'blur(6px)', transition: 'background .2s, transform .15s', fontFamily: 'inherit' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#171a20'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(23,26,32,.86)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >Try FSD (Supervised)</button>
          <button onClick={() => navigate('/contact?subject=general')} style={{ padding: '13px 36px', borderRadius: '4px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', background: 'rgba(255,255,255,.68)', color: '#171a20', border: 'none', backdropFilter: 'blur(6px)', transition: 'background .2s, transform .15s', fontFamily: 'inherit' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.93)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.68)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >Learn More</button>
        </div>
      </div>
    </section>
  );
}
