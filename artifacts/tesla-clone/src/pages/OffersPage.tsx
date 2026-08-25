import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, TeslaBadge, PageShell, T } from '../components/tesla-ui';
import Footer from '../components/Footer';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

const OFFERS = [
  { model: 'Model 3', slug: 'model-3', img: `${BASE}dl-hero-model-3.jpg`, badge: 'Limited Time', headline: '0.99% APR Financing', subline: 'On Model 3 Long Range for well-qualified buyers', details: ['0.99% APR for 72 months', 'Up to $7,500 federal tax credit eligible', 'Free Supercharging for 1 year'], price: 'From $42,490' },
  { model: 'Model Y', slug: 'model-y', img: `${BASE}dl-hero-model-y.jpg`, badge: 'Most Popular', headline: '1.99% APR + Free FSD Trial', subline: "America's best-selling vehicle", details: ['1.99% APR for 60 months', '3-month Full Self-Driving trial', 'Inventory ready now'], price: 'From $44,990' },
  { model: 'Model S', slug: 'model-s', img: `${BASE}dl-hero-model-s.jpg`, badge: 'Performance', headline: '$5,000 Savings on Model S', subline: 'Starting at $74,990 for a limited time', details: ['$5,000 off MSRP', 'FSD capability included', 'Priority delivery'], price: 'From $74,990' },
  { model: 'Model X', slug: 'model-x', img: `${BASE}dl-hero-model-x.jpg`, badge: 'Offer Ends Soon', headline: '$3,500 Savings on Model X', subline: 'Starting at $76,490 for a limited time', details: ['$3,500 off MSRP', 'Premium audio included', 'Tow package at no cost'], price: 'From $76,490' },
  { model: 'Cybertruck', slug: 'cybertruck', img: `${BASE}Cybertruck-Main-Hero-Desktop.jpg`, badge: 'Now Available', headline: 'In-Stock Deliveries', subline: 'Order today — no waitlist', details: ['Immediate delivery available', 'Up to $7,500 federal tax credit', 'Cyberbeast trim in stock'], price: 'From $72,490' },
];

const FIN = [
  { rate: '0.99%', term: '72 months', model: 'Model 3' },
  { rate: '1.99%', term: '60 months', model: 'Model Y' },
  { rate: '2.49%', term: '60 months', model: 'Model S / X' },
];

export default function OffersPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <PageShell>
      <TeslaHero eyebrow="Current Offers" title="Special Financing & Incentives" subtitle="Limited-time offers on new Tesla vehicles. Terms apply." isMobile={isMobile} />
      <section style={{ background: T.white, padding: isMobile ? '40px 16px 64px' : '48px 40px 96px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {OFFERS.map((o) => (
            <div key={o.slug} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? '24px' : '48px', alignItems: 'center' }}>
              <div style={{ borderRadius: '4px', overflow: 'hidden', aspectRatio: '16/10', background: T.grayBg }}>
                <img src={o.img} alt={o.model} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ marginBottom: '12px' }}><TeslaBadge>{o.badge}</TeslaBadge></div>
                <h2 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 700, color: T.dark, letterSpacing: '-0.5px', marginBottom: '6px' }}>{o.model}</h2>
                <p style={{ fontSize: '18px', fontWeight: 600, color: T.dark, marginBottom: '4px' }}>{o.headline}</p>
                <p style={{ fontSize: '14px', color: T.gray, marginBottom: '20px' }}>{o.subline}</p>
                <ul style={{ marginBottom: '24px' }}>
                  {o.details.map((d) => (
                    <li key={d} style={{ fontSize: '14px', color: T.gray, padding: '4px 0', paddingLeft: '16px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>·</span> {d}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: '15px', fontWeight: 600, color: T.dark, marginBottom: '20px' }}>{o.price}</p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <TeslaButton variant="dark" onClick={() => navigate(`/contact?subject=order&vehicle=${o.slug}`)}>Order Now</TeslaButton>
                  <TeslaButton variant="outline-dark" onClick={() => navigate(`/vehicles/${o.slug}`)}>Learn More</TeslaButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: T.dark, padding: isMobile ? '48px 20px' : '64px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 700, color: T.white, marginBottom: '32px' }}>Financing Rates</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '16px' }}>
            {FIN.map((f) => (
              <div key={f.model} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '4px', padding: '28px 20px' }}>
                <div style={{ fontSize: '36px', fontWeight: 700, color: T.white }}>{f.rate}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>{f.term}</div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: T.white, marginTop: '12px' }}>{f.model}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '24px' }}>Rates for well-qualified buyers. Subject to credit approval.</p>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
