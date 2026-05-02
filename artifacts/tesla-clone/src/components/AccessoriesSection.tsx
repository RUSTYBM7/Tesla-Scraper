import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 640);
  useEffect(() => { const h = () => setM(window.innerWidth < 640); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
}

const cats = [
  { label: 'Charging', desc: 'Wall Connectors, Adapters & More', img: `${BASE}slide-charging.jpg`, imgPos: 'center center', route: '/contact?subject=general' },
  { label: 'Vehicle Accessories', desc: 'Floor Mats, Covers & Add-ons', img: `${BASE}grid-model-3.jpg`, imgPos: 'center 45%', route: '/contact?subject=general' },
  { label: 'Apparel', desc: 'Hats, Jackets & Lifestyle', img: `${BASE}city-night.jpg`, imgPos: 'center center', route: '/contact?subject=general' },
  { label: 'Lifestyle', desc: 'Luggage, Gear & Collectibles', img: `${BASE}tesla-test1.jpg`, imgPos: 'center center', route: '/contact?subject=general' },
];

export default function AccessoriesSection() {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.06 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: '#fff' }}>
      <div style={{ padding: isMobile ? '40px 20px 20px' : '52px 48px 28px', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)', transition: 'opacity .6s ease, transform .6s ease' }}>
        <h2 style={{ fontSize: isMobile ? '20px' : '22px', fontWeight: 600, color: '#171a20', marginBottom: '4px' }}>Shop</h2>
        <p style={{ fontSize: '14px', color: '#5c5e62' }}>Accessories designed for your Tesla</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '4px', padding: '0 4px 4px' }}>
        {cats.map((cat, i) => (
          <button key={cat.label} onClick={() => navigate(cat.route)} style={{
            position: 'relative', display: 'block', height: isMobile ? '220px' : '340px',
            overflow: 'hidden', background: '#111', border: 'none', cursor: 'pointer', padding: 0,
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)',
            transition: `opacity .6s ease ${i * 0.09}s, transform .6s ease ${i * 0.09}s`,
          }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${cat.img})`, backgroundSize: 'cover', backgroundPosition: cat.imgPos, transition: 'transform .55s cubic-bezier(.4,0,.2,1)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.07)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent 35%,rgba(0,0,0,.72) 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: isMobile ? '14px' : '20px', left: isMobile ? '14px' : '20px', zIndex: 2, textAlign: 'left' }}>
              <div style={{ fontSize: isMobile ? '13px' : '15px', fontWeight: 600, color: '#fff', marginBottom: '2px' }}>{cat.label}</div>
              {!isMobile && <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.7)', marginBottom: '10px' }}>{cat.desc}</div>}
              <div style={{ fontSize: '12px', fontWeight: 500, color: '#fff', display: 'flex', alignItems: 'center', gap: '3px' }}>
                Shop Now
                <svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polyline points="6,4 10,8 6,12"/></svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
