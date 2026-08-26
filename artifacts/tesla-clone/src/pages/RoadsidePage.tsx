import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import Footer from '../components/Footer';

const ITEMS = [
  { title: 'Flat Tire', desc: 'Mobile service or tow to the nearest service center when appropriate.' },
  { title: 'Dead 12V / Low Charge', desc: 'Jump-start or transport guidance depending on vehicle state.' },
  { title: 'Lockout', desc: 'Assistance unlocking the vehicle when keys or app access fail.' },
  { title: 'Towing', desc: 'Flatbed transport recommended for electric vehicles.' },
];

export default function RoadsidePage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <PageShell>
      <TeslaHero eyebrow="Support" title="Roadside Assistance" subtitle="Educational overview of common roadside scenarios. For real emergencies, contact local emergency services." isMobile={isMobile} />
      <section style={{ background: T.white, padding: isMobile ? '48px 20px' : '64px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
          {ITEMS.map((i) => (
            <div key={i.title} style={{ padding: '24px', background: T.grayBg, borderRadius: '4px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: T.dark, marginBottom: '8px' }}>{i.title}</h3>
              <p style={{ fontSize: '14px', color: T.gray, lineHeight: 1.6 }}>{i.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <p style={{ fontSize: '14px', color: T.gray, marginBottom: '16px' }}>Demo contact number: 1-877-798-3752</p>
          <TeslaButton variant="dark" size="lg" onClick={() => navigate('/contact?subject=service')}>Contact Support</TeslaButton>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
