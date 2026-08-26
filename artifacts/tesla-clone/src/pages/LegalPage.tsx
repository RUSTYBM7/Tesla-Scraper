import { TeslaHero, PageShell, T } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { LEGAL_SECTIONS } from '../data/legal';
import Footer from '../components/Footer';

export default function LegalPage() {
  const isMobile = useIsMobile();
  return (
    <PageShell>
      <TeslaHero eyebrow="Legal" title="Privacy & Legal" subtitle="Policies for this educational demonstration site." isMobile={isMobile} minHeight="280px" />
      <section style={{ background: T.white, padding: isMobile ? '40px 20px 80px' : '48px 40px 96px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {LEGAL_SECTIONS.map((s) => (
            <div key={s.id} id={s.id}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: T.dark, marginBottom: '12px' }}>{s.title}</h2>
              <p style={{ fontSize: '15px', color: T.gray, lineHeight: 1.75 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
