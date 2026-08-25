import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TeslaButton, TeslaHero, TeslaBadge, PageShell, T, inputStyle, labelStyle } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import Footer from '../components/Footer';

const BASE = import.meta.env.BASE_URL;

export interface PreOwnedVehicle {
  id: string;
  model: string;
  slug: string;
  year: number;
  trim: string;
  miles: number;
  price: number;
  color: string;
  img: string;
  location: string;
  badge?: string;
  cpo: boolean;
}

const INVENTORY: PreOwnedVehicle[] = [
  { id: '1', model: 'Model 3', slug: 'model-3', year: 2023, trim: 'Long Range AWD', miles: 12400, price: 38990, color: 'Pearl White', img: `${BASE}dl-hero-model-3.jpg`, location: 'Fremont, CA', badge: 'CPO', cpo: true },
  { id: '2', model: 'Model Y', slug: 'model-y', year: 2024, trim: 'Long Range AWD', miles: 6800, price: 44990, color: 'Stealth Grey', img: `${BASE}dl-hero-model-y.jpg`, location: 'Austin, TX', badge: 'CPO', cpo: true },
  { id: '3', model: 'Model S', slug: 'model-s', year: 2022, trim: 'Plaid', miles: 18200, price: 74990, color: 'Solid Black', img: `${BASE}dl-hero-model-s.jpg`, location: 'Seattle, WA', cpo: false },
  { id: '4', model: 'Model 3', slug: 'model-3', year: 2022, trim: 'RWD', miles: 31200, price: 28500, color: 'Stealth Grey', img: `${BASE}dl-hero-model-3.jpg`, location: 'Los Angeles, CA', cpo: false },
  { id: '5', model: 'Model X', slug: 'model-x', year: 2022, trim: 'Long Range AWD', miles: 21800, price: 69990, color: 'Pearl White', img: `${BASE}dl-hero-model-x.jpg`, location: 'Phoenix, AZ', badge: 'CPO', cpo: true },
  { id: '6', model: 'Model Y', slug: 'model-y', year: 2023, trim: 'Long Range AWD', miles: 8900, price: 49990, color: 'Ultra Red', img: `${BASE}dl-hero-model-y.jpg`, location: 'Denver, CO', badge: 'Like New', cpo: false },
  { id: '7', model: 'Model 3', slug: 'model-3', year: 2021, trim: 'Performance AWD', miles: 38500, price: 32990, color: 'Deep Blue', img: `${BASE}dl-hero-model-3.jpg`, location: 'Chicago, IL', cpo: false },
  { id: '8', model: 'Cybertruck', slug: 'cybertruck', year: 2024, trim: 'AWD', miles: 4200, price: 77990, color: 'Stainless Steel', img: `${BASE}Cybertruck-Main-Hero-Desktop.jpg`, location: 'Austin, TX', badge: 'Rare', cpo: false },
  { id: '9', model: 'Model Y', slug: 'model-y', year: 2022, trim: 'RWD', miles: 24100, price: 35990, color: 'Pearl White', img: `${BASE}dl-hero-model-y.jpg`, location: 'Miami, FL', cpo: true, badge: 'CPO' },
  { id: '10', model: 'Model S', slug: 'model-s', year: 2023, trim: 'Long Range', miles: 9100, price: 69990, color: 'Ultra Red', img: `${BASE}dl-hero-model-s.jpg`, location: 'New York, NY', cpo: true, badge: 'CPO' },
];

type SortKey = 'price-asc' | 'price-desc' | 'miles-asc' | 'year-desc';

export default function PreOwnedPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [params, setParams] = useSearchParams();

  const model = params.get('model') || 'All';
  const cpoOnly = params.get('cpo') === '1';
  const maxPrice = Number(params.get('maxPrice') || 0) || 0;
  const maxMiles = Number(params.get('maxMiles') || 0) || 0;
  const sort = (params.get('sort') as SortKey) || 'price-asc';

  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'All' || value === '0') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = [...INVENTORY];
    if (model !== 'All') list = list.filter((v) => v.model === model);
    if (cpoOnly) list = list.filter((v) => v.cpo);
    if (maxPrice > 0) list = list.filter((v) => v.price <= maxPrice);
    if (maxMiles > 0) list = list.filter((v) => v.miles <= maxMiles);
    list.sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'miles-asc') return a.miles - b.miles;
      return b.year - a.year;
    });
    return list;
  }, [model, cpoOnly, maxPrice, maxMiles, sort]);

  const models = ['All', 'Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'];

  return (
    <PageShell>
      <TeslaHero eyebrow="Inventory" title="Pre-Owned" subtitle="Filter by model, price, mileage, and CPO status. Demo inventory for educational use." isMobile={isMobile} />

      <section style={{ background: T.white, padding: isMobile ? '24px 16px 0' : '32px 40px 0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {models.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setFilter('model', m)}
                style={{
                  padding: '8px 18px', borderRadius: '20px',
                  border: `1px solid ${model === m ? T.dark : T.grayBorder}`,
                  background: model === m ? T.dark : T.white,
                  color: model === m ? T.white : T.dark,
                  fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: T.font,
                }}
              >
                {m}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '12px', marginBottom: '8px' }}>
            <div>
              <label style={labelStyle}>Max price</label>
              <select style={{ ...inputStyle, appearance: 'none' }} value={maxPrice || ''} onChange={(e) => setFilter('maxPrice', e.target.value)}>
                <option value="">Any</option>
                <option value="35000">Under $35,000</option>
                <option value="45000">Under $45,000</option>
                <option value="55000">Under $55,000</option>
                <option value="70000">Under $70,000</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Max miles</label>
              <select style={{ ...inputStyle, appearance: 'none' }} value={maxMiles || ''} onChange={(e) => setFilter('maxMiles', e.target.value)}>
                <option value="">Any</option>
                <option value="10000">Under 10,000</option>
                <option value="20000">Under 20,000</option>
                <option value="30000">Under 30,000</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Sort</label>
              <select style={{ ...inputStyle, appearance: 'none' }} value={sort} onChange={(e) => setFilter('sort', e.target.value)}>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="miles-asc">Mileage: Low to High</option>
                <option value="year-desc">Year: Newest</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: T.dark, paddingBottom: '12px' }}>
                <input type="checkbox" checked={cpoOnly} onChange={(e) => setFilter('cpo', e.target.checked ? '1' : '')} />
                CPO only
              </label>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: T.gray, marginBottom: '24px' }}>{filtered.length} vehicle{filtered.length === 1 ? '' : 's'}</p>
        </div>
      </section>

      <section style={{ background: T.white, padding: isMobile ? '0 16px 64px' : '0 40px 96px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
          {filtered.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 16px', color: T.gray }}>
              No vehicles match these filters. Try broadening your search.
            </div>
          )}
          {filtered.map((v) => (
            <div key={v.id} style={{ borderRadius: '4px', overflow: 'hidden', background: T.grayBg }}>
              <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                <img src={v.img} alt={`${v.year} ${v.model}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: T.dark }}>{v.year} {v.model}</div>
                    <div style={{ fontSize: '13px', color: T.gray }}>{v.trim}</div>
                  </div>
                  {v.badge && <TeslaBadge>{v.badge}</TeslaBadge>}
                </div>
                <div style={{ fontSize: '13px', color: T.gray, marginBottom: '12px' }}>
                  {v.miles.toLocaleString()} mi · {v.color} · {v.location}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: T.dark, marginBottom: '16px' }}>
                  ${v.price.toLocaleString()}
                </div>
                <TeslaButton variant="dark" size="sm" fullWidth onClick={() => navigate(`/contact?subject=order&vehicle=${v.slug}`)}>
                  View Details
                </TeslaButton>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
