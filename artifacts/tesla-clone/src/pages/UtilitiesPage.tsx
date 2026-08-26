import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { ENERGY_PRODUCTS } from '../data/energy';
import Footer from '../components/Footer';

export default function UtilitiesPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const commercial = ENERGY_PRODUCTS.filter((p) => p.category === 'utility' || p.slug === 'megapack');
  return (
    <PageShell>
      <TeslaHero eyebrow="Commercial & Utilities" title="Scale Energy Storage" subtitle="Megapack and utility-scale solutions — educational product overview." isMobile={isMobile} />
      <section style={{ background: T.white, padding: isMobile ? '48px 20px' : '64px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '16px', color: T.gray, lineHeight: 1.75, marginBottom: '32px' }}>
            Utilities and large commercial customers deploy battery storage for peak shaving, renewable firming, and grid services. This page summarizes the product family for demo purposes.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            {commercial.map((p) => (
              <div key={p.slug} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', padding: '20px', background: T.grayBg, borderRadius: '4px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 600, color: T.dark }}>{p.label}</div>
                  <div style={{ fontSize: '14px', color: T.gray }}>{p.tagline}</div>
                </div>
                <TeslaButton variant="outline-dark" size="sm" onClick={() => navigate(`/energy/${p.slug}`)}>Learn More</TeslaButton>
              </div>
            ))}
          </div>
          <TeslaButton variant="dark" size="lg" onClick={() => navigate('/contact?subject=energy')}>Contact Energy Sales</TeslaButton>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
