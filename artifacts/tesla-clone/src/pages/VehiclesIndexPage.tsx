import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { VEHICLES } from '../data/vehicles';
import Footer from '../components/Footer';

export default function VehiclesIndexPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <PageShell>
      <TeslaHero eyebrow="Vehicles" title="All Models" subtitle="Explore the lineup, then configure or schedule a demo drive." isMobile={isMobile} />
      <section style={{ background: T.white, padding: isMobile ? '32px 16px 80px' : '40px 40px 96px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
          {VEHICLES.map((v) => (
            <div key={v.slug} style={{ background: T.grayBg, borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                <img src={v.heroImg} alt={v.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '20px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: T.dark }}>{v.label}</h2>
                <p style={{ fontSize: '14px', color: T.gray, margin: '6px 0 12px' }}>{v.tagline}</p>
                <p style={{ fontSize: '13px', color: T.gray, marginBottom: '16px' }}>
                  From ${v.startingPrice.toLocaleString()} · {v.range} · 0–60 {v.accel}
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <TeslaButton variant="dark" size="sm" onClick={() => navigate(`/vehicles/${v.slug}`)}>Learn</TeslaButton>
                  <TeslaButton variant="outline-dark" size="sm" onClick={() => navigate(`/configure/${v.slug}`)}>Order</TeslaButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
