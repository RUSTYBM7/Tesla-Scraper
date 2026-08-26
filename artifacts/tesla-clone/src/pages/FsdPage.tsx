import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import Footer from '../components/Footer';

const BASE = import.meta.env.BASE_URL;

const FEATURES = [
  { title: 'Autopilot', desc: 'Traffic-Aware Cruise Control and Autosteer assist on compatible roads.' },
  { title: 'Full Self-Driving (Supervised)', desc: 'Navigate on Autopilot, Auto Lane Change, Autopark, and related features — always requires an attentive driver.' },
  { title: 'Over-the-Air Learning', desc: 'Capabilities improve through software updates delivered to the vehicle.' },
  { title: 'Vision-Based', desc: 'Cameras and neural nets interpret the driving environment in real time.' },
];

export default function FsdPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <PageShell>
      <TeslaHero
        backgroundImage={`${BASE}fsd-highway.jpg`}
        eyebrow="Autonomy"
        title="Full Self-Driving (Supervised)"
        subtitle="Educational overview. Features require active supervision and vary by region and software version."
        isMobile={isMobile}
      >
        <TeslaButton variant="light" size="lg" onClick={() => navigate('/demo-drive')}>Schedule a Demo</TeslaButton>
      </TeslaHero>
      <section style={{ background: T.white, padding: isMobile ? '48px 20px' : '64px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '28px' }}>
          {FEATURES.map((f) => (
            <div key={f.title}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: T.dark, marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '15px', color: T.gray, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: T.dark, padding: isMobile ? '48px 24px' : '64px 40px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.6 }}>
          This page is for demonstration. Do not rely on it for real vehicle capability or regulatory claims.
        </p>
        <TeslaButton variant="light" onClick={() => navigate('/configure/model-3')}>Design Yours</TeslaButton>
      </section>
      <Footer />
    </PageShell>
  );
}
