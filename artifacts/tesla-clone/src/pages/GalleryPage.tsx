import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => { const h = () => setM(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
}

type Category = 'All' | 'Vehicles' | 'Energy' | 'Charging' | 'Performance';

interface GalleryItem {
  src: string;
  title: string;
  category: Category;
}

const items: GalleryItem[] = [
  { src: `${BASE}grid-model-s.jpg`,           title: 'Model S',                 category: 'Vehicles' },
  { src: `${BASE}grid-model-y.jpg`,           title: 'Model Y',                 category: 'Vehicles' },
  { src: `${BASE}grid-model-x.jpg`,           title: 'Model X',                 category: 'Vehicles' },
  { src: `${BASE}grid-model-x2.jpg`,          title: 'Model X — Exterior',      category: 'Vehicles' },
  { src: `${BASE}grid-cybertruck.jpg`,        title: 'Cybertruck',              category: 'Vehicles' },
  { src: `${BASE}truck-candidate.jpg`,        title: 'Cybertruck — Profile',    category: 'Vehicles' },
  { src: `${BASE}model-x-candidate2.jpg`,     title: 'Model X — Falcon Wings',  category: 'Vehicles' },
  { src: `${BASE}white-suv-road.jpg`,         title: 'Tesla SUV on the Road',   category: 'Vehicles' },
  { src: `${BASE}tesla-model-y.jpg`,          title: 'Model Y — Road',          category: 'Vehicles' },
  { src: `${BASE}fsd-highway.jpg`,            title: 'FSD on Highway',          category: 'Performance' },
  { src: `${BASE}fsd-night.jpg`,             title: 'Autopilot Night Drive',    category: 'Performance' },
  { src: `${BASE}fsd-road.jpg`,              title: 'Full Self-Driving',        category: 'Performance' },
  { src: `${BASE}tesla-interior-fsd.jpg`,    title: 'Tesla Interior',           category: 'Performance' },
  { src: `${BASE}tesla-supercharger-new.jpg`, title: 'Supercharger Network',    category: 'Charging' },
  { src: `${BASE}tesla-charging-station.jpg`, title: 'Home Charging',           category: 'Charging' },
  { src: `${BASE}slide-charging.jpg`,        title: 'Charging on the Road',     category: 'Charging' },
  { src: `${BASE}energy-megapack.jpg`,       title: 'Megapack',                 category: 'Energy' },
  { src: `${BASE}energy-powerwall.jpg`,      title: 'Powerwall',                category: 'Energy' },
  { src: `${BASE}energy-solar-roof.jpg`,     title: 'Solar Roof',               category: 'Energy' },
  { src: `${BASE}energy-solar.jpg`,          title: 'Solar Panels',             category: 'Energy' },
];

const CATS: Category[] = ['All', 'Vehicles', 'Performance', 'Energy', 'Charging'];

function LightboxModal({ item, onClose, onPrev, onNext }: { item: GalleryItem; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,.93)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <style>{`@keyframes lbFade{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}`}</style>
      <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh', animation: 'lbFade .2s ease' }} onClick={e => e.stopPropagation()}>
        <img src={item.src} alt={item.title} style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px', display: 'block' }} />
        <div style={{ textAlign: 'center', marginTop: '14px', color: 'rgba(255,255,255,.8)', fontSize: '15px', fontWeight: 500 }}>{item.title}</div>
        <button onClick={onClose} style={{ position: 'absolute', top: '-16px', right: '-16px', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <button onClick={e => { e.stopPropagation(); onPrev(); }} style={{ position: 'fixed', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
      </button>
      <button onClick={e => { e.stopPropagation(); onNext(); }} style={{ position: 'fixed', right: '16px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="9,6 15,12 9,18"/></svg>
      </button>
    </div>
  );
}

export default function GalleryPage() {
  const [cat, setCat] = useState<Category>('All');
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [loaded, setLoaded] = useState<Set<string>>(new Set());
  const [errored, setErrored] = useState<Set<string>>(new Set());
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const filtered = (cat === 'All' ? items : items.filter(i => i.category === cat))
    .filter(i => !errored.has(i.src));

  function markLoaded(src: string) { setLoaded(s => new Set(s).add(src)); }
  function markErrored(src: string) { setErrored(s => new Set(s).add(src)); }

  const cols = isMobile ? 2 : 3;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'Inter, -apple-system, sans-serif', paddingBottom: '80px' }}>
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .gal-item { overflow:hidden; border-radius:8px; cursor:pointer; background:#111; position:relative; }
        .gal-item img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .55s cubic-bezier(.4,0,.2,1); }
        .gal-item:hover img { transform:scale(1.07); }
        .gal-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(0,0,0,.72) 0%,transparent 55%); opacity:0; transition:opacity .3s; display:flex; align-items:flex-end; padding:16px; }
        .gal-item:hover .gal-overlay { opacity:1; }
        .cat-btn { border:1px solid rgba(255,255,255,.15); background:transparent; color:rgba(255,255,255,.6); border-radius:24px; padding:8px 20px; font-size:13px; font-weight:500; cursor:pointer; transition:all .18s; font-family:inherit; }
        .cat-btn.active, .cat-btn:hover { background:rgba(255,255,255,.12); border-color:rgba(255,255,255,.4); color:#fff; }
      `}</style>

      {/* Hero */}
      <div style={{ paddingTop: '96px', paddingBottom: '48px', textAlign: 'center', background: 'linear-gradient(180deg,#111 0%,#0a0a0a 100%)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.16em', color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', marginBottom: '14px' }}>Teslaofficial.site</p>
        <h1 style={{ fontSize: isMobile ? '36px' : '52px', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', marginBottom: '12px' }}>Photo Gallery</h1>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.45)', maxWidth: '400px', margin: '0 auto 36px' }}>Tesla vehicles, energy products, and more</p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', padding: '0 20px' }}>
          {CATS.map(c => (
            <button key={c} className={`cat-btn${cat === c ? ' active' : ''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
      </div>

      {/* Masonry Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '24px 12px' : '40px 24px' }}>
        <div style={{ columns: cols, gap: '12px', columnFill: 'balance' }}>
          {filtered.map((item, i) => {
            const isLoaded = loaded.has(item.src);
            return (
              <div key={item.src + cat} className="gal-item"
                style={{ marginBottom: '12px', breakInside: 'avoid', animation: `fadeIn .4s ease ${Math.min(i * 0.04, 0.3)}s both` }}
                onClick={() => setLightbox(i)}
              >
                {!isLoaded && <div style={{ height: '240px', background: 'rgba(255,255,255,.04)', borderRadius: '8px' }} />}
                <img
                  src={item.src}
                  alt={item.title}
                  style={{ display: isLoaded ? 'block' : 'none' }}
                  onLoad={() => markLoaded(item.src)}
                  onError={() => markErrored(item.src)}
                />
                <div className="gal-overlay">
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{item.title}</div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.5)', marginTop: '2px' }}>{item.category}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'rgba(255,255,255,.3)', fontSize: '16px' }}>No items in this category</div>
        )}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '0 24px 40px' }}>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.25)', marginBottom: '20px' }}>Want to add your own photos to the gallery? Contact us.</p>
        <button onClick={() => navigate('/contact?subject=general')} style={{ padding: '14px 40px', borderRadius: '8px', background: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: '#171a20', fontFamily: 'inherit', transition: 'opacity .2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.85'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
        >Contact Us</button>
      </div>

      {lightbox !== null && (
        <LightboxModal
          item={filtered[lightbox]}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox((lightbox - 1 + filtered.length) % filtered.length)}
          onNext={() => setLightbox((lightbox + 1) % filtered.length)}
        />
      )}
    </div>
  );
}
