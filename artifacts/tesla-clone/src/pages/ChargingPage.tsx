import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import Footer from '../components/Footer';

const BASE = import.meta.env.BASE_URL;

const OPTIONS = [
  { title: 'Home Charging', desc: 'Charge overnight with a Wall Connector. Most owners wake up to a full battery.', img: `${BASE}charging.jpg`, id: 'home' },
  { title: 'Supercharger Network', desc: 'Access a vast fast-charging network. Add substantial range in about 15 minutes on newer stalls.', img: `${BASE}tesla-supercharger-new.jpg`, id: 'supercharger' },
  { title: 'Destination Charging', desc: 'Charge while you shop, dine, or stay overnight at equipped locations.', img: `${BASE}tesla-supercharger3.jpg`, id: 'destination' },
];

export default function ChargingPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <PageShell>
      <TeslaHero eyebrow="Charging" title="Charge Anywhere" subtitle="Home, highway, and destination charging designed around convenience." isMobile={isMobile} />
      <section style={{ background: T.white, padding: isMobile ? '40px 16px' : '48px 40px' }} id="calculator">
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '16px', marginBottom: '56px' }}>
          {[
            { v: '50,000+', l: 'Superchargers worldwide' },
            { v: '15 min', l: 'for meaningful range on V3/V4' },
            { v: '99%', l: 'network uptime (illustrative)' },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: 'center', padding: '28px 16px', background: T.grayBg, borderRadius: '4px' }}>
              <div style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 700, color: T.dark }}>{s.v}</div>
              <div style={{ fontSize: '13px', color: T.gray, marginTop: '8px' }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }} id="nacs">
          {OPTIONS.map((o, i) => (
            <div key={o.id} id={o.id} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '20px' : '48px', alignItems: 'center' }}>
              <div style={{ order: isMobile ? 0 : i % 2 === 1 ? 1 : 0, borderRadius: '4px', overflow: 'hidden', aspectRatio: '16/10', background: T.grayBg }}>
                <img src={o.img} alt={o.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h2 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 700, color: T.dark, marginBottom: '12px' }}>{o.title}</h2>
                <p style={{ fontSize: '15px', color: T.gray, lineHeight: 1.7 }}>{o.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: T.dark, padding: isMobile ? '48px 24px' : '64px 40px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <TeslaButton variant="light" size="lg" onClick={() => navigate('/trip-planner')}>Trip Planner</TeslaButton>
          <TeslaButton variant="outline-light" size="lg" onClick={() => navigate('/contact?subject=charging')}>Learn More</TeslaButton>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
