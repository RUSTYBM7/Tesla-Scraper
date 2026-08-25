import { useState, useEffect } from 'react';
import { TeslaHero, PageShell, T } from '../components/tesla-ui';
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

const IMAGES = [
  { src: `${BASE}hero-model-3.jpg`, label: 'Model 3' },
  { src: `${BASE}dl-hero-model-y.jpg`, label: 'Model Y' },
  { src: `${BASE}dl-hero-model-s.jpg`, label: 'Model S' },
  { src: `${BASE}model-x-candidate2.jpg`, label: 'Model X' },
  { src: `${BASE}Cybertruck-Main-Hero-Desktop.jpg`, label: 'Cybertruck' },
  { src: `${BASE}fsd-highway.jpg`, label: 'Full Self-Driving' },
  { src: `${BASE}tesla-supercharger-new.jpg`, label: 'Supercharging' },
  { src: `${BASE}energy-solar-roof.jpg`, label: 'Solar Roof' },
  { src: `${BASE}energy-powerwall.jpg`, label: 'Powerwall' },
  { src: `${BASE}fsd-night.jpg`, label: 'Night Drive' },
  { src: `${BASE}hero-highway.jpg`, label: 'Open Road' },
  { src: `${BASE}grid-model-y.jpg`, label: 'Model Y Detail' },
];

export default function GalleryPage() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState<string | null>(null);
  return (
    <PageShell>
      <TeslaHero eyebrow="Media" title="Gallery" subtitle="Explore vehicles, energy products, and the road ahead." isMobile={isMobile} minHeight="300px" />
      <section style={{ background: T.white, padding: isMobile ? '24px 12px 64px' : '32px 24px 96px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '8px' }}>
          {IMAGES.map((img) => (
            <button
              key={img.src}
              type="button"
              aria-label={img.label}
              onClick={() => setActive(img.src)}
              style={{ border: 'none', padding: 0, cursor: 'pointer', aspectRatio: '16/10', overflow: 'hidden', background: T.grayBg, borderRadius: '2px' }}
            >
              <img
                src={img.src}
                alt={img.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
            </button>
          ))}
        </div>
      </section>
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
          onKeyDown={(e) => { if (e.key === 'Escape') setActive(null); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '24px' }}
        >
          <img src={active} alt="" style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }} />
        </div>
      )}
      <Footer />
    </PageShell>
  );
}
