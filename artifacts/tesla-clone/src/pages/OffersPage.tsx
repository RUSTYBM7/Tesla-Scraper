import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => { const h = () => setM(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
}

const OFFERS = [
  {
    model: 'Model 3', slug: 'model-3', img: `${BASE}dl-hero-model-3.jpg`,
    badge: 'Most Popular', badgeColor: '#171a20',
    headline: '$7,500 Federal Tax Credit Available',
    subline: 'Starting at $32,740 after credit',
    details: ['Up to $7,500 federal tax credit', '0.99% APR financing available', 'Free Supercharging — 1,500 miles', 'Delivery in 2–4 weeks'],
    originalPrice: '$40,240', salePrice: '$32,740', note: 'After federal tax credit',
  },
  {
    model: 'Model Y', slug: 'model-y', img: `${BASE}dl-hero-model-y.jpg`,
    badge: 'Best Seller', badgeColor: '#22c55e',
    headline: 'Up to $7,500 Federal Tax Credit',
    subline: 'Starting at $37,490 after credit',
    details: ['Up to $7,500 federal tax credit', '1.99% APR for 60 months', 'Free Home Charging Installation', 'Delivery available nationwide'],
    originalPrice: '$44,990', salePrice: '$37,490', note: 'After federal tax credit',
  },
  {
    model: 'Model S', slug: 'model-s', img: `${BASE}dl-hero-model-s.jpg`,
    badge: 'Limited Time', badgeColor: '#171a20',
    headline: 'Free Full Self-Driving Included',
    subline: '$8,000 FSD value at no charge',
    details: ['Full Self-Driving (Supervised) included ($8,000 value)', 'Enhanced Autopilot capability', 'Premium connectivity included', '6-month free Supercharging'],
    originalPrice: '$82,990', salePrice: '$74,990', note: 'With FSD included',
  },
  {
    model: 'Model X', slug: 'model-x', img: `${BASE}dl-hero-model-x.jpg`,
    badge: 'Offer Ends Soon', badgeColor: '#5c5e62',
    headline: '$3,500 Savings on Model X',
    subline: 'Starting at $76,490 for a limited time',
    details: ['$3,500 off MSRP', 'Premium audio upgrade included', 'Tow package at no cost', 'Priority delivery scheduling'],
    originalPrice: '$79,990', salePrice: '$76,490', note: 'Limited-time incentive',
  },
  {
    model: 'Cybertruck', slug: 'cybertruck', img: `${BASE}Cybertruck-Main-Hero-Desktop.jpg`,
    badge: 'Now Available', badgeColor: '#5c5e62',
    headline: 'Cybertruck In-Stock Deliveries',
    subline: 'No longer on waiting list — order today',
    details: ['Immediate delivery available', 'Up to $7,500 federal tax credit', 'Commercial use tax benefits', 'Cyberbeast trim in stock'],
    originalPrice: '$79,990', salePrice: '$72,490', note: 'After federal tax credit',
  },
];

const FINANCING = [
  { rate: '0.99%', term: '72 months', model: 'Model 3', note: 'For well-qualified buyers' },
  { rate: '1.99%', term: '60 months', model: 'Model Y', note: 'For well-qualified buyers' },
  { rate: '2.49%', term: '60 months', model: 'Model S / X', note: 'For well-qualified buyers' },
];

export default function OffersPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = activeFilter === 'All' ? OFFERS : OFFERS.filter(o => o.model === activeFilter);

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', minHeight: '100vh', background: '#f8f9fa' }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0d1117 0%,#1a2744 100%)', padding: isMobile ? '100px 24px 60px' : '120px 40px 80px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', marginBottom: '16px' }}>Limited Time</p>
        <h1 style={{ fontSize: isMobile ? '38px' : '64px', fontWeight: 700, color: '#fff', letterSpacing: '-2px', marginBottom: '16px', lineHeight: 1.05 }}>Current Offers</h1>
        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.55)', maxWidth: '480px', margin: '0 auto 40px', lineHeight: 1.65 }}>Take advantage of federal tax credits, financing incentives, and exclusive Tesla promotions available right now.</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {['All', 'Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'].map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: '9px 20px', borderRadius: '24px', border: activeFilter === f ? '2px solid #fff' : '1px solid rgba(255,255,255,.2)', background: activeFilter === f ? '#fff' : 'transparent', color: activeFilter === f ? '#171a20' : 'rgba(255,255,255,.7)', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .18s' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Tax Credit Banner */}
      <div style={{ background: '#22c55e', padding: '14px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#fff', margin: 0 }}>⚡ Federal Clean Vehicle Tax Credit: Eligible Tesla buyers can receive up to $7,500 off their tax bill. <button onClick={() => navigate('/contact?subject=general')} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit', fontSize: '14px', fontWeight: 700 }}>Learn if you qualify →</button></p>
      </div>

      {/* Offers Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '32px 16px' : '56px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : filtered.length === 1 ? '1fr' : 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px', marginBottom: '64px' }}>
          {filtered.map((offer, i) => (
            <div key={offer.model} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,.08)', border: '1px solid #e5e7eb', animation: `fadeUp .4s ease ${i * 0.06}s both` }}>
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${offer.img})`, backgroundSize: 'cover', backgroundPosition: 'center 45%' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.1) 0%,rgba(0,0,0,.5) 100%)' }} />
                <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
                  <span style={{ background: offer.badgeColor, color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', letterSpacing: '0.04em' }}>{offer.badge}</span>
                </div>
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{offer.model}</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.75)' }}>{offer.subline}</p>
                </div>
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'line-through', marginBottom: '2px' }}>{offer.originalPrice}</div>
                    <div style={{ fontSize: '26px', fontWeight: 700, color: '#171a20', lineHeight: 1 }}>{offer.salePrice}</div>
                    <div style={{ fontSize: '11px', color: '#6e7180', marginTop: '2px' }}>{offer.note}</div>
                  </div>
                  <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '8px 12px', textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700 }}>You Save</div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: '#16a34a' }}>${(parseInt(offer.originalPrice.replace(/\D/g,'')) - parseInt(offer.salePrice.replace(/\D/g,''))).toLocaleString()}</div>
                  </div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#171a20', marginBottom: '10px' }}>{offer.headline}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {offer.details.map(d => (
                    <li key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: '#5c5e62', lineHeight: 1.4 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: '1px' }}><polyline points="20,6 9,17 4,12"/></svg>
                      {d}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => navigate(`/configure/${offer.slug}`)} style={{ flex: 1, padding: '13px', background: '#171a20', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'background .2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#2d3240'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#171a20'}
                  >Order Now</button>
                  <button onClick={() => navigate(`/vehicles/${offer.slug}`)} style={{ padding: '13px 18px', background: 'transparent', color: '#374151', border: '1.5px solid #d1d5db', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color .15s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#171a20'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#d1d5db'}
                  >Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Financing Section */}
        <div style={{ background: '#0d1117', borderRadius: '20px', padding: isMobile ? '40px 24px' : '60px', marginBottom: '48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: isMobile ? '28px' : '44px', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: '10px' }}>Financing Options</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.5)' }}>Low APR financing available for well-qualified buyers through Tesla Financial Services.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '16px', marginBottom: '32px' }}>
            {FINANCING.map(f => (
              <div key={f.model} style={{ background: 'rgba(255,255,255,.05)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,.08)', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', fontWeight: 700, color: '#fff', letterSpacing: '-1px' }}>{f.rate}</div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.5)', margin: '4px 0 8px' }}>APR for {f.term}</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,.8)' }}>{f.model}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.3)', marginTop: '4px' }}>{f.note}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => navigate('/contact?subject=general')} style={{ padding: '14px 40px', background: '#fff', color: '#171a20', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Apply for Financing</button>
          </div>
        </div>

        {/* Referral */}
        <div style={{ background: '#fff', borderRadius: '20px', padding: isMobile ? '40px 24px' : '60px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#171a20" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h2 style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 700, color: '#171a20', letterSpacing: '-1px', marginBottom: '10px' }}>Refer a Friend, Earn Rewards</h2>
          <p style={{ fontSize: '15px', color: '#6e7180', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.65 }}>When a friend orders a Tesla using your referral link, you both earn credits. Refer enough friends and earn free Supercharging, merchandise, and more.</p>
          <button onClick={() => navigate('/contact?subject=general')} style={{ padding: '14px 40px', background: '#171a20', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Get Your Referral Link</button>
        </div>
      </div>
    </div>
  );
}
