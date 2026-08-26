import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, TeslaBadge, PageShell, T } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { EVENTS } from '../data/events';
import Footer from '../components/Footer';

export default function EventsPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <PageShell>
      <TeslaHero eyebrow="Community" title="Events" subtitle="Demo drives, workshops, and owner meetups — sample calendar for this educational site." isMobile={isMobile} />
      <section style={{ background: T.white, padding: isMobile ? '40px 16px 80px' : '48px 40px 96px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {EVENTS.map((ev) => (
            <div key={ev.id} style={{ padding: '24px', border: `1px solid ${T.grayBorder}`, borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <div style={{ fontSize: '18px', fontWeight: 600, color: T.dark }}>{ev.title}</div>
                <TeslaBadge>{ev.type}</TeslaBadge>
              </div>
              <div style={{ fontSize: '13px', color: T.gray, marginBottom: '10px' }}>
                {ev.date} · {ev.city}{ev.state ? `, ${ev.state}` : ''}
              </div>
              <p style={{ fontSize: '14px', color: T.gray, lineHeight: 1.6, marginBottom: '16px' }}>{ev.description}</p>
              <TeslaButton variant="outline-dark" size="sm" onClick={() => navigate('/contact?subject=events')}>Register Interest</TeslaButton>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
