import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import Footer from '../components/Footer';

const MILES = [
  { year: '2003', text: "Tesla founded to accelerate the world's transition to sustainable energy." },
  { year: '2008', text: 'Roadster — first production vehicle.' },
  { year: '2012', text: 'Model S launches.' },
  { year: '2017', text: 'Model 3 production begins.' },
  { year: '2020', text: 'Model Y becomes a global best-seller.' },
  { year: '2023', text: 'Cybertruck deliveries begin.' },
];
const VALS = [
  { title: 'Move Fast', desc: 'Ship, learn, iterate faster than the industry.' },
  { title: 'First Principles', desc: 'Reason from the ground up, not from analogy.' },
  { title: 'Do the Impossible', desc: 'Ambitious goals force better solutions.' },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <PageShell>
      <TeslaHero eyebrow="About" title="Accelerating Sustainable Energy" subtitle="Educational overview of Tesla's mission and milestones. Not affiliated with Tesla, Inc." isMobile={isMobile} />
      <section style={{ background: T.white, padding: isMobile ? '48px 20px' : '64px 40px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 700, color: T.dark, marginBottom: '16px' }}>Mission</h2>
          <p style={{ fontSize: '16px', color: T.gray, lineHeight: 1.75 }}>Design and manufacture electric vehicles, energy generation, and storage to speed the transition to sustainable energy.</p>
        </div>
      </section>
      <section style={{ background: T.grayBg, padding: isMobile ? '48px 20px' : '64px 40px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 700, color: T.dark, textAlign: 'center', marginBottom: '32px' }}>Milestones</h2>
          {MILES.map((m, i) => (
            <div key={m.year} style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '16px', padding: '16px 0', borderBottom: i < MILES.length - 1 ? `1px solid ${T.grayBorder}` : 'none' }}>
              <div style={{ fontWeight: 700, color: T.dark }}>{m.year}</div>
              <div style={{ color: T.gray, fontSize: '15px', lineHeight: 1.6 }}>{m.text}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: T.dark, padding: isMobile ? '48px 20px' : '64px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '28px' }}>
          {VALS.map((v) => (
            <div key={v.title}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: T.white, marginBottom: '8px' }}>{v.title}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: T.white, padding: isMobile ? '48px 24px' : '64px 40px', textAlign: 'center' }}>
        <TeslaButton variant="dark" size="lg" onClick={() => navigate('/careers')}>View Careers</TeslaButton>
      </section>
      <Footer />
    </PageShell>
  );
}
