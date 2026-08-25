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

interface Vehicle {
  slug: string;
  label: string;
  img: string;
  price: string;
  range: string;
  accel: string;
  topSpeed: string;
  seating: string;
  cargo: string;
  tagline: string;
}

const VEHICLES: Vehicle[] = [
  { slug: 'model-s', label: 'Model S', img: `${BASE}dl-hero-model-s.jpg`, price: '$74,990', range: '405 mi', accel: '3.1 s', topSpeed: '149 mph', seating: '5', cargo: '28 cu ft', tagline: 'Relentless Performance' },
  { slug: 'model-3', label: 'Model 3', img: `${BASE}dl-hero-model-3.jpg`, price: '$40,240', range: '358 mi', accel: '4.2 s', topSpeed: '145 mph', seating: '5', cargo: '23 cu ft', tagline: 'Order. Drive. Enjoy.' },
  { slug: 'model-y', label: 'Model Y', img: `${BASE}dl-hero-model-y.jpg`, price: '$44,990', range: '330 mi', accel: '4.8 s', topSpeed: '135 mph', seating: '5–7', cargo: '76 cu ft', tagline: "America's Best-Selling" },
  { slug: 'model-x', label: 'Model X', img: `${BASE}dl-hero-model-x.jpg`, price: '$79,990', range: '348 mi', accel: '3.8 s', topSpeed: '149 mph', seating: '6–7', cargo: '88 cu ft', tagline: 'Beyond Ludicrous' },
  { slug: 'cybertruck', label: 'Cybertruck', img: `${BASE}Cybertruck-Main-Hero-Desktop.jpg`, price: '$79,990', range: '340 mi', accel: '4.1 s', topSpeed: '112 mph', seating: '5', cargo: '120+ cu ft', tagline: 'Built for Any Planet' },
];

const ROWS: { key: keyof Vehicle; label: string }[] = [
  { key: 'price', label: 'Starting Price' },
  { key: 'range', label: 'Range (est.)' },
  { key: 'accel', label: '0–60 mph' },
  { key: 'topSpeed', label: 'Top Speed' },
  { key: 'seating', label: 'Seating' },
  { key: 'cargo', label: 'Cargo' },
];

export default function ComparePage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState<string[]>(['model-3', 'model-y', 'model-s']);

  const toggle = (slug: string) => {
    setSelected((prev) => {
      if (prev.includes(slug)) {
        if (prev.length <= 1) return prev;
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= 3) return [...prev.slice(1), slug];
      return [...prev, slug];
    });
  };

  const cols = VEHICLES.filter((v) => selected.includes(v.slug));

  return (
    <PageShell>
      <TeslaHero eyebrow="Compare" title="Help Me Choose" subtitle="Select up to three vehicles and compare key specs side by side." isMobile={isMobile} minHeight="320px" />

      <section style={{ background: T.white, padding: isMobile ? '24px 16px 32px' : '32px 40px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {VEHICLES.map((v) => {
            const on = selected.includes(v.slug);
            return (
              <button
                key={v.slug}
                type="button"
                onClick={() => toggle(v.slug)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '20px',
                  border: `1px solid ${on ? T.dark : T.grayBorder}`,
                  background: on ? T.dark : T.white,
                  color: on ? T.white : T.dark,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: T.font,
                }}
              >
                {v.label}
              </button>
            );
          })}
        </div>
      </section>

      <section style={{ background: T.white, padding: isMobile ? '0 12px 64px' : '0 40px 96px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isMobile ? '520px' : undefined }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '16px 12px', fontSize: '13px', color: T.gray, fontWeight: 500, borderBottom: `1px solid ${T.grayBorder}` }} />
                {cols.map((v) => (
                  <th key={v.slug} style={{ textAlign: 'center', padding: '16px 12px', borderBottom: `1px solid ${T.grayBorder}`, verticalAlign: 'bottom' }}>
                    <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', borderRadius: '4px', background: T.grayBg, marginBottom: '12px' }}>
                      <img src={v.img} alt={v.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: T.dark }}>{v.label}</div>
                    <div style={{ fontSize: '12px', color: T.gray, fontWeight: 400, marginTop: '4px' }}>{v.tagline}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.key}>
                  <td style={{ padding: '14px 12px', fontSize: '13px', color: T.gray, borderBottom: `1px solid ${T.grayBorder}`, fontWeight: 500 }}>{row.label}</td>
                  {cols.map((v) => (
                    <td key={v.slug} style={{ padding: '14px 12px', fontSize: '15px', fontWeight: 600, color: T.dark, textAlign: 'center', borderBottom: `1px solid ${T.grayBorder}` }}>
                      {v[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td style={{ padding: '20px 12px' }} />
                {cols.map((v) => (
                  <td key={v.slug} style={{ padding: '20px 12px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                      <TeslaButton variant="dark" size="sm" onClick={() => navigate(`/vehicles/${v.slug}`)}>Learn More</TeslaButton>
                      <TeslaButton variant="outline-dark" size="sm" onClick={() => navigate(`/contact?subject=order&vehicle=${v.slug}`)}>Order</TeslaButton>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
