import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T, inputStyle } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { SUPPORT_TOPICS } from '../data/support';
import Footer from '../components/Footer';

const FAQS = [
  { q: 'How do I schedule service?', a: 'Open the Tesla app, go to Service, and request a mobile or center appointment. You can also use Contact Support.' },
  { q: 'How do Supercharging payments work?', a: 'Sessions are billed to the payment method on your Tesla Account. View history in the app under Charging.' },
  { q: 'What is Full Self-Driving (Supervised)?', a: 'An optional suite of driver-assistance features that require continuous driver attention. Availability depends on region and software version.' },
  { q: 'How do over-the-air updates install?', a: 'When an update is ready, you will be notified in the car and app. Schedule installation when the vehicle is parked and charging if possible.' },
  { q: 'How do I manage Powerwall settings?', a: 'Use the Tesla app Energy tab to set backup reserve, storm watch, and utility rate plans where available.' },
  { q: 'Where can I find my order status?', a: 'Sign in to your Tesla Account or use the Account page with your order number.' },
];

export default function SupportPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<number | null>(0);

  const faqs = useMemo(() => {
    if (!query.trim()) return FAQS;
    const q = query.toLowerCase();
    return FAQS.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [query]);

  return (
    <PageShell>
      <TeslaHero eyebrow="Support" title="How can we help?" subtitle="Service, charging, software, energy, and orders." isMobile={isMobile} />
      <section style={{ background: T.white, padding: isMobile ? '32px 16px 80px' : '40px 40px 96px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <input
            style={{ ...inputStyle, marginBottom: '28px' }}
            placeholder="Search support articles…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '12px', marginBottom: '48px' }}>
            {SUPPORT_TOPICS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => navigate(t.route)}
                style={{ textAlign: 'left', padding: '20px', background: T.grayBg, borderRadius: '4px', border: 'none', cursor: 'pointer', fontFamily: T.font }}
              >
                <div style={{ fontSize: '15px', fontWeight: 600, color: T.dark, marginBottom: '6px' }}>{t.title}</div>
                <div style={{ fontSize: '13px', color: T.gray, lineHeight: 1.45 }}>{t.description}</div>
              </button>
            ))}
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 700, color: T.dark, marginBottom: '16px' }}>Frequently asked questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '40px' }}>
            {faqs.map((f, i) => (
              <div key={f.q} style={{ borderBottom: `1px solid ${T.grayBorder}` }}>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '16px 0', background: 'none', border: 'none',
                    cursor: 'pointer', fontFamily: T.font, display: 'flex', justifyContent: 'space-between', gap: '16px',
                  }}
                >
                  <span style={{ fontSize: '15px', fontWeight: 600, color: T.dark }}>{f.q}</span>
                  <span style={{ color: T.gray }}>{open === i ? '−' : '+'}</span>
                </button>
                {open === i && <p style={{ fontSize: '14px', color: T.gray, lineHeight: 1.65, paddingBottom: '16px' }}>{f.a}</p>}
              </div>
            ))}
            {faqs.length === 0 && <p style={{ color: T.gray, padding: '16px 0' }}>No articles match your search.</p>}
          </div>

          <div style={{ textAlign: 'center' }}>
            <TeslaButton variant="dark" size="lg" onClick={() => navigate('/contact')}>Contact Support</TeslaButton>
          </div>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
