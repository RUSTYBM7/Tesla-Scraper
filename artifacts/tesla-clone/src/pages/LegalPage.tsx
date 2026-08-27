import { useState } from 'react';
import { TeslaHero, PageShell, T } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { LEGAL_SECTIONS } from '../data/legal';
import Footer from '../components/Footer';

export default function LegalPage() {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(LEGAL_SECTIONS[0].id);
  const section = LEGAL_SECTIONS.find((s) => s.id === active) || LEGAL_SECTIONS[0];

  return (
    <PageShell>
      <TeslaHero eyebrow="Tesla" title="Privacy & Legal" subtitle="Policies governing Tesla products, services, and websites." isMobile={isMobile} minHeight="260px" />
      <section style={{ background: T.white, padding: isMobile ? '32px 16px 80px' : '40px 40px 96px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '240px 1fr', gap: isMobile ? '24px' : '48px' }}>
          <nav style={{ display: 'flex', flexDirection: isMobile ? 'row' : 'column', flexWrap: 'wrap', gap: '4px' }}>
            {LEGAL_SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: T.font,
                  fontSize: '13px',
                  fontWeight: active === s.id ? 600 : 400,
                  background: active === s.id ? T.grayBg : 'transparent',
                  color: T.dark,
                }}
              >
                {s.title}
              </button>
            ))}
          </nav>
          <article>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: T.dark, marginBottom: '16px' }}>{section.title}</h2>
            <p style={{ fontSize: '15px', color: T.gray, lineHeight: 1.8 }}>{section.body}</p>
          </article>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
