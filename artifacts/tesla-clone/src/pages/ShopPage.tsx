import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => { const h = () => setM(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
}

interface Product {
  id: string; name: string; price: number; originalPrice?: number;
  category: string; badge?: string; badgeColor?: string;
  desc: string; colors?: string[];
}

const PRODUCTS: Product[] = [
  { id: 'wc', name: 'Wall Connector', price: 350, category: 'Charging', desc: 'Up to 44 miles of range added per hour. Wi-Fi enabled for remote monitoring and scheduling.', badge: 'Best Seller', badgeColor: '#22c55e' },
  { id: 'mc', name: 'Mobile Connector', price: 230, category: 'Charging', desc: 'Charge almost anywhere with the Mobile Connector. Includes NEMA 5-15 adapter.' },
  { id: 'j17', name: 'J1772 Adapter', price: 45, category: 'Charging', desc: 'Use any J1772 public Level 2 charger with your Tesla.' },
  { id: 'nacs', name: 'NACS to CCS1 Adapter', price: 175, category: 'Charging', desc: 'Charge at select non-Tesla public charging stations with CCS1 connectors.' },
  { id: 'mat1', name: 'All-Weather Floor Mats — Model 3', price: 155, category: 'Vehicle Accessories', desc: 'Custom-fit mats designed for Model 3. Laser-measured for a perfect fit with raised edges.' },
  { id: 'mat2', name: 'All-Weather Floor Mats — Model Y', price: 175, category: 'Vehicle Accessories', desc: 'Custom-fit mats for Model Y with third-row coverage option.' },
  { id: 'mat3', name: 'All-Weather Floor Mats — Cybertruck', price: 195, category: 'Vehicle Accessories', desc: 'Precision-fit mats for Cybertruck front, rear, and frunk.' },
  { id: 'cap', name: 'Frunk/Trunk Organizer', price: 65, category: 'Vehicle Accessories', desc: 'Collapsible organizer bag keeps groceries and gear tidy in your trunk or frunk.' },
  { id: 'wrap', name: 'Center Console Wrap — Model 3', price: 85, category: 'Vehicle Accessories', desc: 'Brushed aluminum or carbon fiber console wrap. Protect and personalize your interior.', colors: ['Brushed Aluminum', 'Carbon Fiber', 'Matte Black'] },
  { id: 'dcp', name: 'Destination Charging Connector', price: 290, category: 'Charging', desc: 'A 24-foot destination charging cable, ideal for guest lodging or workplace charging installations.' },
  { id: 'jacket', name: 'Cyberquad Jacket', price: 125, originalPrice: 175, category: 'Lifestyle', desc: 'Water-resistant tech jacket with Tesla branding. Available in multiple sizes.', colors: ['Matte Black', 'Deep Blue'], badge: 'Sale', badgeColor: '#171a20' },
  { id: 'tee', name: 'Tesla Logo Tee', price: 35, category: 'Lifestyle', desc: '100% organic cotton tee with embroidered Tesla T logo. Slim fit.', colors: ['Black', 'White', 'Grey', 'Navy'] },
  { id: 'cap2', name: 'Tesla Cap', price: 30, category: 'Lifestyle', desc: 'Structured six-panel cap with Tesla logo embroidered on the front.', colors: ['Black', 'White'] },
  { id: 'bag', name: 'Tesla Canvas Tote', price: 25, category: 'Lifestyle', desc: 'Heavy-duty canvas tote with "Tesla" wordmark. Ideal for everyday use.' },
  { id: 'pw2', name: 'Powerwall Home Energy Kit', price: 9200, category: 'Energy', desc: 'Complete home battery backup system. 13.5 kWh capacity, Wi-Fi enabled.', badge: 'Most Popular', badgeColor: '#171a20' },
  { id: 'sol', name: 'Solar Roof Consultation', price: 0, category: 'Energy', desc: 'Book a free consultation with a Tesla Energy Advisor to design your Solar Roof system.' },
];

const CATEGORIES = ['All', 'Charging', 'Vehicle Accessories', 'Lifestyle', 'Energy'];

export default function ShopPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<string[]>([]);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered = PRODUCTS.filter(p => activeCategory === 'All' || p.category === activeCategory);

  function addToCart(id: string) {
    setCart(prev => [...prev, id]);
    setAddedItem(id);
    setTimeout(() => setAddedItem(null), 1500);
  }

  const cartTotal = cart.reduce((sum, id) => {
    const p = PRODUCTS.find(p => p.id === id);
    return sum + (p?.price ?? 0);
  }, 0);

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', minHeight: '100vh', background: '#f8f9fa' }}>
      <style>{`
        @keyframes addPop{0%{transform:scale(1)}50%{transform:scale(1.08)}100%{transform:scale(1)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#171a20 0%,#0d1117 100%)', padding: isMobile ? '100px 24px 60px' : '120px 40px 80px', textAlign: 'center' }}>
        <h1 style={{ fontSize: isMobile ? '38px' : '64px', fontWeight: 700, color: '#fff', letterSpacing: '-2px', marginBottom: '14px', lineHeight: 1.05 }}>Tesla Shop</h1>
        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.5)', maxWidth: '440px', margin: '0 auto' }}>Accessories, apparel, and energy products — designed for Tesla owners.</p>
      </div>

      {/* Sticky cart bar */}
      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100, background: '#171a20', color: '#fff', borderRadius: '12px', padding: '14px 20px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 8px 32px rgba(0,0,0,.3)', cursor: 'pointer' }}
          onClick={() => navigate('/contact?subject=order')}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <span style={{ fontSize: '14px', fontWeight: 700 }}>{cart.length} item{cart.length > 1 ? 's' : ''}</span>
          <span style={{ fontSize: '14px', color: 'rgba(255,255,255,.6)' }}>·</span>
          <span style={{ fontSize: '14px', fontWeight: 700 }}>${cartTotal.toLocaleString()}</span>
          <button style={{ padding: '8px 18px', background: '#fff', color: '#171a20', border: 'none', borderRadius: '6px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Checkout</button>
        </div>
      )}

      {/* Filters */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '0 24px', position: 'sticky', top: '56px', zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '0', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '18px 24px', fontSize: '14px', fontWeight: 600, color: activeCategory === cat ? '#171a20' : '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', borderBottom: activeCategory === cat ? '2px solid #171a20' : '2px solid transparent', fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'color .15s' }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '24px 16px 80px' : '40px 40px 80px' }}>
        <div style={{ marginBottom: '16px', fontSize: '14px', color: '#9ca3af' }}>{filtered.length} products</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filtered.map((product, i) => (
            <div key={product.id} style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,.04)', animation: `fadeUp .4s ease ${i * 0.04}s both`, transition: 'box-shadow .2s, transform .2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,.04)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <div style={{ position: 'relative', height: '180px', background: 'linear-gradient(135deg,#1a1f2e,#2d3748)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {product.badge && (
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span style={{ background: product.badgeColor, color: '#fff', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px' }}>{product.badge}</span>
                  </div>
                )}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                    {product.category === 'Charging' ? (
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
                    ) : product.category === 'Vehicle Accessories' ? (
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                    ) : product.category === 'Energy' ? (
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                    )}
                  </div>
                  <span style={{ fontSize: '11px', color: 'rgba(255,255,255,.3)' }}>{product.category}</span>
                </div>
                {addedItem === product.id && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(34,197,94,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '14px' }}>
                    <div style={{ background: '#22c55e', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'addPop .3s ease' }}>
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ padding: isMobile ? '16px' : '20px' }}>
                <h3 style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: 700, color: '#171a20', marginBottom: '6px', lineHeight: 1.3 }}>{product.name}</h3>
                <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.55, marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' } as React.CSSProperties}>{product.desc}</p>
                {product.colors && (
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    {product.colors.map(c => (
                      <span key={c} style={{ fontSize: '10px', color: '#9ca3af', background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>{c}</span>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                  <div>
                    {product.originalPrice && (
                      <span style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'line-through', marginRight: '6px' }}>${product.originalPrice}</span>
                    )}
                    <span style={{ fontSize: '17px', fontWeight: 700, color: '#171a20' }}>{product.price === 0 ? 'Free' : `$${product.price.toLocaleString()}`}</span>
                  </div>
                  <button onClick={() => product.price === 0 ? navigate('/contact?subject=energy') : addToCart(product.id)} style={{ padding: '9px 16px', background: '#171a20', color: '#fff', border: 'none', borderRadius: '7px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'background .18s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#2d3240'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#171a20'}
                  >{product.price === 0 ? 'Book Free' : 'Add to Cart'}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free shipping banner */}
      <div style={{ background: '#0d1117', padding: isMobile ? '40px 24px' : '60px 40px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: 'M5 12h14 M12 5l7 7-7 7', label: 'Free Shipping', desc: 'On orders over $75' },
            { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label: 'Official Tesla Products', desc: '100% authentic' },
            { icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4', label: '30-Day Returns', desc: 'Easy returns policy' },
          ].map(b => (
            <div key={b.label} style={{ textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="2" strokeLinecap="round"><path d={b.icon}/></svg>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '2px' }}>{b.label}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.35)' }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
