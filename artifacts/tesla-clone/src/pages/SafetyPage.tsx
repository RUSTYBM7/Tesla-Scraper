import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import Footer from '../components/Footer';

const FEATURES = [
  { title: '5-Star Safety', desc: 'High-strength structure, low center of gravity, and advanced restraints.' },
  { title: 'Active Safety', desc: 'Automatic Emergency Braking, Forward Collision Warning, and related features standard.' },
  { title: 'Cabin Structure', desc: 'Reinforced cabin and crumple zones designed to protect occupants.' },
  { title: 'Battery Safety', desc: 'Multiple layers of protection from cell chemistry through pack design.' },
];

export default function SafetyPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <PageShell>
      <TeslaHero eyebrow="Safety" title="Safety First" subtitle="Structure, software, and standards designed around occupant protection." isMobile={isMobile} />
      <section style={{ background: T.white, padding: isMobile ? '48px 20px' : '64px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '12px', marginBottom: '48px' }}>
          {['Model 3', 'Model Y', 'Model S', 'Model X'].map((m) => (
            <div key={m} style={{ textAlign: 'center', padding: '24px', background: T.grayBg, borderRadius: '4px' }}>
              <div style={{ fontSize: '22px', fontWeight: 700, color: T.dark }}>5-Star</div>
              <div style={{ fontSize: '13px', color: T.gray, marginTop: '6px' }}>{m}</div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {FEATURES.map((f) => (
            <div key={f.title}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: T.dark, marginBottom: '8px' }}>{f.title}</h3>
              <p style={{ fontSize: '15px', color: T.gray, lineHeight: 1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: T.dark, padding: isMobile ? '48px 24px' : '64px 40px', textAlign: 'center' }}>
        <TeslaButton variant="light" size="lg" onClick={() => navigate('/')}>Explore Vehicles</TeslaButton>
      </section>
      <Footer />
    </PageShell>
  );
}
