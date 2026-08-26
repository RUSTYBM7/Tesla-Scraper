import { TeslaHero, PageShell, T } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { STORIES } from '../data/stories';
import Footer from '../components/Footer';

export default function StoriesPage() {
  const isMobile = useIsMobile();
  return (
    <PageShell>
      <TeslaHero eyebrow="Discover" title="Customer Stories" subtitle="Illustrative narratives for UI demonstration — not real customer testimonials." isMobile={isMobile} />
      <section style={{ background: T.white, padding: isMobile ? '40px 16px 80px' : '48px 40px 96px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
          {STORIES.map((s) => (
            <article key={s.id} style={{ background: T.grayBg, borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                <img src={s.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: T.gray, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>{s.vehicle}</div>
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: T.dark, marginBottom: '8px' }}>{s.title}</h2>
                <p style={{ fontSize: '14px', color: T.gray, lineHeight: 1.65, marginBottom: '12px' }}>{s.excerpt}</p>
                <div style={{ fontSize: '13px', color: T.dark, fontWeight: 500 }}>— {s.author}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
