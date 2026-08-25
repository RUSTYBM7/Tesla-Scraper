import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T } from '../components/tesla-ui';
import Footer from '../components/Footer';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

const CATS = [
  { name: 'Vehicle Accessories', desc: 'Floor mats, roof racks, mud flaps, and more', img: `${BASE}grid-model-3.jpg`, route: '/contact?subject=order' },
  { name: 'Apparel', desc: 'Tesla-branded clothing and lifestyle gear', img: `${BASE}tesla-hero-general.jpg`, route: '/contact' },
  { name: 'Lifestyle', desc: 'Drinkware, bags, and everyday essentials', img: `${BASE}charging.jpg`, route: '/contact' },
  { name: 'Charging', desc: 'Wall Connector, Mobile Connector, adapters', img: `${BASE}tesla-supercharger-new.jpg`, route: '/charging' },
];

const FEATURED = [
  { name: 'Wall Connector', price: '$475', img: `${BASE}tesla-supercharger-new.jpg` },
  { name: 'Model Y All-Weather Floor Liners', price: '$225', img: `${BASE}grid-model-y.jpg` },
  { name: 'Cybertruck Tonneau Cover', price: '$1,200', img: `${BASE}Cybertruck-Main-Hero-Desktop.jpg` },
  { name: 'Tesla Cyberwhistle', price: '$50', img: `${BASE}grid-cybertruck.jpg` },
];

export default function ShopPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <PageShell>
      <TeslaHero eyebrow="Tesla Shop" title="Accessories & Lifestyle" subtitle="Official-style products designed to complement your vehicle and everyday life." isMobile={isMobile} />
      <section style={{ background: T.white, padding: isMobile ? '40px 16px 64px' : '48px 40px 80px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
          {CATS.map((c) => (
            <button key={c.name} onClick={() => navigate(c.route)} style={{ border: 'none', background: T.grayBg, borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', textAlign: 'left', fontFamily: T.font, padding: 0 }}>
              <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '18px', fontWeight: 600, color: T.dark, marginBottom: '4px' }}>{c.name}</div>
                <div style={{ fontSize: '14px', color: T.gray }}>{c.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </section>
      <section style={{ background: T.grayBg, padding: isMobile ? '48px 16px 64px' : '64px 40px 96px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 700, color: T.dark, marginBottom: '32px', textAlign: 'center', letterSpacing: '-0.5px' }}>Featured</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '16px' }}>
            {FEATURED.map((p) => (
              <div key={p.name} style={{ background: T.white, borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ aspectRatio: '1', overflow: 'hidden', background: T.grayBg }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: T.dark, marginBottom: '4px' }}>{p.name}</div>
                  <div style={{ fontSize: '14px', color: T.gray }}>{p.price}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <TeslaButton variant="dark" size="lg" onClick={() => navigate('/contact')}>Shop All</TeslaButton>
          </div>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
