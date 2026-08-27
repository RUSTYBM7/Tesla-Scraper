import { TeslaHero, TeslaBadge, PageShell, T } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { RECALLS } from '../data/recalls';
import Footer from '../components/Footer';

export default function RecallsPage() {
  const isMobile = useIsMobile();
  return (
    <PageShell>
      <TeslaHero eyebrow="Safety" title="Vehicle Recalls" subtitle="View open and completed campaigns for your vehicle." isMobile={isMobile} minHeight="280px" />
      <section style={{ background: T.white, padding: isMobile ? '32px 16px 80px' : '40px 40px 96px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {RECALLS.map((r) => (
            <div key={r.id} style={{ border: `1px solid ${T.grayBorder}`, borderRadius: '4px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: T.dark }}>{r.campaign}</div>
                <TeslaBadge>{r.status}</TeslaBadge>
              </div>
              <div style={{ fontSize: '13px', color: T.gray, marginBottom: '8px' }}>{r.id} · {r.date} · {r.models.join(', ')}</div>
              <p style={{ fontSize: '14px', color: T.gray, lineHeight: 1.6 }}>{r.summary}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
