import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => { const h = () => setM(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
}

interface Listing {
  id: string; model: string; slug: string; year: number; trim: string;
  miles: number; price: number; color: string; img: string;
  location: string; badge?: string; badgeColor?: string;
}

const LISTINGS: Listing[] = [
  { id: 'po1', model: 'Model 3', slug: 'model-3', year: 2023, trim: 'Long Range AWD', miles: 12400, price: 38990, color: 'Pearl White', img: `${BASE}dl-hero-model-3.jpg`, location: 'Seattle, WA', badge: 'Great Deal', badgeColor: '#22c55e' },
  { id: 'po2', model: 'Model Y', slug: 'model-y', year: 2022, trim: 'Performance AWD', miles: 18700, price: 46500, color: 'Deep Blue Metallic', img: `${BASE}dl-hero-model-y.jpg`, location: 'Portland, OR', badge: 'CPO Certified', badgeColor: '#171a20' },
  { id: 'po3', model: 'Model S', slug: 'model-s', year: 2021, trim: 'Plaid', miles: 24300, price: 74990, color: 'Midnight Silver', img: `${BASE}dl-hero-model-s.jpg`, location: 'San Francisco, CA', badge: 'Low Miles', badgeColor: '#5c5e62' },
  { id: 'po4', model: 'Model 3', slug: 'model-3', year: 2022, trim: 'Standard Range RWD', miles: 31200, price: 28500, color: 'Stealth Grey', img: `${BASE}dl-hero-model-3.jpg`, location: 'Los Angeles, CA' },
  { id: 'po5', model: 'Model X', slug: 'model-x', year: 2022, trim: 'Long Range AWD', miles: 21800, price: 69990, color: 'Pearl White', img: `${BASE}dl-hero-model-x.jpg`, location: 'Phoenix, AZ', badge: 'CPO Certified', badgeColor: '#171a20' },
  { id: 'po6', model: 'Model Y', slug: 'model-y', year: 2023, trim: 'Long Range AWD', miles: 8900, price: 49990, color: 'Ultra Red', img: `${BASE}dl-hero-model-y.jpg`, location: 'Denver, CO', badge: 'Like New', badgeColor: '#5c5e62' },
  { id: 'po7', model: 'Model 3', slug: 'model-3', year: 2021, trim: 'Performance AWD', miles: 38500, price: 32990, color: 'Deep Blue Metallic', img: `${BASE}dl-hero-model-3.jpg`, location: 'Chicago, IL' },
  { id: 'po8', model: 'Cybertruck', slug: 'cybertruck', year: 2024, trim: 'AWD', miles: 4200, price: 77990, color: 'Stainless Steel', img: `${BASE}Cybertruck-Main-Hero-Desktop.jpg`, location: 'Austin, TX', badge: 'Rare Find', badgeColor: '#171a20' },
];

const BENEFITS = [
  { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title: '4-Year, 50,000-Mile Warranty', desc: 'All CPO vehicles come with a comprehensive warranty covering the drive unit and battery for 4 years or 50,000 miles, whichever comes first.' },
  { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: '150+ Point Inspection', desc: 'Every Certified Pre-Owned Tesla undergoes a rigorous multi-point inspection by Tesla-trained technicians before it\'s listed for sale.' },
  { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Competitive Financing', desc: 'Tesla Financial Services offers competitive financing rates on pre-owned vehicles. Get pre-approved in minutes, entirely online.' },
  { icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4', title: 'Return Policy', desc: 'All pre-owned Tesla vehicles are subject to Tesla\'s return policy. Drive confidently knowing you have peace of mind.' },
];

export default function PreOwnedPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('price-asc');
  const [maxPrice, setMaxPrice] = useState(100000);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = LISTINGS
    .filter(l => (filter === 'All' || l.model === filter) && l.price <= maxPrice)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'miles-asc') return a.miles - b.miles;
      if (sort === 'year-desc') return b.year - a.year;
      return 0;
    });

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#171a20 0%,#2d3240 100%)', padding: isMobile ? '100px 24px 60px' : '120px 40px 80px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', marginBottom: '16px' }}>Tesla</p>
        <h1 style={{ fontSize: isMobile ? '38px' : '64px', fontWeight: 700, color: '#fff', letterSpacing: '-2px', marginBottom: '16px', lineHeight: 1.05 }}>Certified<br/>Pre-Owned</h1>
        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.55)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.65 }}>Every vehicle inspected, certified, and backed by Tesla. Drive a pre-owned Tesla with the confidence of a new car purchase.</p>
      </div>

      {/* Benefits */}
      <div style={{ background: '#fff', padding: isMobile ? '40px 20px' : '60px 40px', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '24px' }}>
          {BENEFITS.map(b => (
            <div key={b.title} style={{ textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#171a20" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={b.icon}/></svg>
              </div>
              <h4 style={{ fontSize: isMobile ? '13px' : '14px', fontWeight: 700, color: '#171a20', marginBottom: '6px', lineHeight: 1.3 }}>{b.title}</h4>
              <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.55 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '16px 24px', position: 'sticky', top: '56px', zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '6px', flex: 1, flexWrap: 'wrap' }}>
            {['All', 'Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: '7px 16px', borderRadius: '20px', border: filter === f ? '2px solid #171a20' : '1px solid #d1d5db', background: filter === f ? '#171a20' : '#fff', color: filter === f ? '#fff' : '#374151', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s' }}>{f}</button>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '13px', fontFamily: 'inherit', color: '#374151', background: '#fff', cursor: 'pointer' }}>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="miles-asc">Fewest Miles</option>
            <option value="year-desc">Newest First</option>
          </select>
        </div>
      </div>

      {/* Listings */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '24px 16px 64px' : '40px 40px 80px' }}>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#6e7180' }}>{filtered.length} vehicles available</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {filtered.map(listing => (
            <div key={listing.id} style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 1px 6px rgba(0,0,0,.06)', transition: 'box-shadow .2s, transform .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 6px rgba(0,0,0,.06)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${listing.img})`, backgroundSize: 'cover', backgroundPosition: 'center 45%' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.05) 0%,rgba(0,0,0,.4) 100%)' }} />
                {listing.badge && (
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span style={{ background: listing.badgeColor, color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '16px' }}>{listing.badge}</span>
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(6px)', borderRadius: '6px', padding: '4px 10px' }}>
                  <span style={{ fontSize: '12px', color: '#fff', fontWeight: 600 }}>{listing.location}</span>
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div>
                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#171a20' }}>{listing.year} {listing.model}</h3>
                    <p style={{ fontSize: '13px', color: '#6e7180' }}>{listing.trim}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '20px', fontWeight: 700, color: '#171a20' }}>${listing.price.toLocaleString()}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>est. ${Math.round(listing.price / 72).toLocaleString()}/mo</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', padding: '12px 0', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
                  {[{ label: 'Miles', value: listing.miles.toLocaleString() }, { label: 'Color', value: listing.color }, { label: 'Year', value: listing.year.toString() }].map(s => (
                    <div key={s.label}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#171a20' }}>{s.value}</div>
                      <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => navigate(`/contact?subject=pre-owned&vehicle=${listing.id}`)} style={{ flex: 1, padding: '11px', background: '#171a20', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Request Info</button>
                  <button onClick={() => navigate(`/vehicles/${listing.slug}`)} style={{ padding: '11px 16px', background: '#fff', color: '#374151', border: '1.5px solid #d1d5db', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#9ca3af', fontSize: '16px' }}>No vehicles match your filters. <button onClick={() => { setFilter('All'); setMaxPrice(100000); }} style={{ color: '#171a20', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '16px' }}>Reset filters</button></div>
        )}
      </div>
    </div>
  );
}
