import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { SUPPORT_TOPICS } from '../data/support';
import Footer from '../components/Footer';

export default function SupportPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <PageShell>
      <TeslaHero eyebrow="Help" title="Support" subtitle="Service, charging, orders, and energy — pick a topic to continue." isMobile={isMobile} />
      <section style={{ background: T.white, padding: isMobile ? '40px 16px 80px' : '48px 40px 96px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '16px' }}>
          {SUPPORT_TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => navigate(t.route)}
              style={{ textAlign: 'left', padding: '24px', background: T.grayBg, borderRadius: '4px', border: 'none', cursor: 'pointer', fontFamily: T.font }}
            >
              <div style={{ fontSize: '16px', fontWeight: 600, color: T.dark, marginBottom: '8px' }}>{t.title}</div>
              <div style={{ fontSize: '14px', color: T.gray, lineHeight: 1.5 }}>{t.description}</div>
            </button>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <TeslaButton variant="dark" size="lg" onClick={() => navigate('/contact')}>Contact Support</TeslaButton>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
