import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

interface VehicleCompareData {
  label: string;
  category: string;
  img: string;
  startingPrice: number;
  priceDisplay: string;
  range: number;
  accel: number;
  topSpeed: number;
  seating: number;
  cargo: number;
  power: number;
  towing: number;
  tagline: string;
  accent: string;
  trims: { name: string; price: string; range: string; accel: string }[];
}

const VEHICLES: Record<string, VehicleCompareData> = {
  'model-s': {
    label: 'Model S', category: 'Sedan', img: `${BASE}dl-hero-model-s.jpg`,
    startingPrice: 74990, priceDisplay: '$74,990',
    range: 405, accel: 3.1, topSpeed: 149, seating: 5, cargo: 28, power: 670, towing: 2700,
    tagline: 'Relentless Performance', accent: '#171a20',
    trims: [
      { name: 'Model S', price: '$74,990', range: '405 mi', accel: '3.1s' },
      { name: 'Model S Plaid', price: '$89,990', range: '396 mi', accel: '1.99s' },
    ],
  },
  'model-3': {
    label: 'Model 3', category: 'Sedan', img: `${BASE}dl-hero-model-3.jpg`,
    startingPrice: 40240, priceDisplay: '$40,240',
    range: 358, accel: 4.2, topSpeed: 145, seating: 5, cargo: 23, power: 283, towing: 2000,
    tagline: 'Order. Drive. Enjoy.', accent: '#171a20',
    trims: [
      { name: 'Model 3 RWD', price: '$40,240', range: '341 mi', accel: '5.8s' },
      { name: 'Long Range AWD', price: '$47,740', range: '358 mi', accel: '4.2s' },
      { name: 'Performance AWD', price: '$53,240', range: '315 mi', accel: '2.9s' },
    ],
  },
  'model-y': {
    label: 'Model Y', category: 'SUV', img: `${BASE}dl-hero-model-y.jpg`,
    startingPrice: 44990, priceDisplay: '$44,990',
    range: 357, accel: 3.5, topSpeed: 150, seating: 7, cargo: 76, power: 384, towing: 3500,
    tagline: "America's Best-Selling Vehicle", accent: '#27ae60',
    trims: [
      { name: 'Model Y RWD', price: '$44,990', range: '320 mi', accel: '5.5s' },
      { name: 'Long Range AWD', price: '$54,990', range: '357 mi', accel: '4.8s' },
      { name: 'Performance AWD', price: '$57,990', range: '303 mi', accel: '3.5s' },
    ],
  },
  'model-x': {
    label: 'Model X', category: 'SUV', img: `${BASE}dl-hero-model-x.jpg`,
    startingPrice: 79990, priceDisplay: '$79,990',
    range: 335, accel: 2.5, topSpeed: 163, seating: 7, cargo: 88, power: 1020, towing: 5000,
    tagline: 'Beyond Ludicrous', accent: '#8e44ad',
    trims: [
      { name: 'Model X', price: '$79,990', range: '335 mi', accel: '3.8s' },
      { name: 'Model X Plaid', price: '$99,990', range: '326 mi', accel: '2.5s' },
    ],
  },
  'cybertruck': {
    label: 'Cybertruck', category: 'Truck', img: `${BASE}Cybertruck-Main-Hero-Desktop.jpg`,
    startingPrice: 79990, priceDisplay: '$79,990',
    range: 340, accel: 2.6, topSpeed: 130, seating: 5, cargo: 120, power: 845, towing: 11000,
    tagline: 'Built for Any Planet', accent: '#e67e22',
    trims: [
      { name: 'Cybertruck AWD', price: '$79,990', range: '340 mi', accel: '4.1s' },
      { name: 'Cyberbeast', price: '$99,990', range: '320 mi', accel: '2.6s' },
    ],
  },
};

const ALL_SLUGS = ['model-s', 'model-3', 'model-y', 'model-x', 'cybertruck'];

interface SpecRow {
  label: string;
  unit: string;
  keyA: keyof VehicleCompareData;
  higherIsBetter: boolean;
  format?: (v: number) => string;
  iconPath: string;
}

const SPEC_ROWS: SpecRow[] = [
  { label: 'Starting Price', unit: 'USD', keyA: 'startingPrice', higherIsBetter: false, format: (v) => `$${v.toLocaleString()}`, iconPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z' },
  { label: 'Range', unit: 'mi', keyA: 'range', higherIsBetter: true, format: (v) => `${v}`, iconPath: 'M7 4v2h3v2H7l-2 2v3H3v3h2v3h2v-3h8v3h2v-3h2v-3h-2v-3l-2-2h-3V6h3V4H7zm0 8h10v3H7v-3z' },
  { label: '0–60 mph', unit: 'sec', keyA: 'accel', higherIsBetter: false, format: (v) => `${v}`, iconPath: 'M20.38 8.57l-1.23 1.85a8 8 0 01-.22 7.58H5.07A8 8 0 0115.58 6.85l1.85-1.23A10 10 0 003.35 19a2 2 0 001.72 1h13.85a2 2 0 001.74-1 10 10 0 00-.27-10.44zm-9.79 6.84a2 2 0 003.89-.67 1.9 1.9 0 00-.18-.47l1.5-6.12-5.61 4.34c-.19.16-.34.34-.46.54a2 2 0 00.86 2.38z' },
  { label: 'Top Speed', unit: 'mph', keyA: 'topSpeed', higherIsBetter: true, format: (v) => `${v}`, iconPath: 'M4 14.899A7 7 0 1115.71 8h1.79a4.5 4.5 0 010 9H5a5 5 0 01-1-9.9M12 12l-3-3m3 3l3-3' },
  { label: 'Seating', unit: 'adults', keyA: 'seating', higherIsBetter: true, format: (v) => `${v}`, iconPath: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
  { label: 'Cargo Volume', unit: 'cu ft', keyA: 'cargo', higherIsBetter: true, format: (v) => `${v}`, iconPath: 'M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm-7-3a1 1 0 011 1v1h-4V5a1 1 0 011-1h2zM6 3h2a1 1 0 011 1v1H5V4a1 1 0 011-1zM3 11h18v2H3v-2zm0 4h18v4H3v-4z' },
  { label: 'Peak Power', unit: 'hp', keyA: 'power', higherIsBetter: true, format: (v) => `${v}`, iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
  { label: 'Max Towing', unit: 'lbs', keyA: 'towing', higherIsBetter: true, format: (v) => `${v.toLocaleString()}`, iconPath: 'M1 3h14v13H1V3zm16 2h4l2 3v5h-2v1.5a1.5 1.5 0 01-3 0V13h-1V5zM4 16a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4z' },
];

function VehicleSelector({ value, onChange, exclude }: { value: string; onChange: (s: string) => void; exclude: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const v = VEHICLES[value];

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: '16px',
        padding: '20px 24px', borderRadius: '16px',
        border: `2px solid ${open ? v.accent : 'rgba(255,255,255,0.15)'}`,
        background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
        cursor: 'pointer', transition: 'all 0.22s ease', textAlign: 'left',
      }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = v.accent}
        onMouseLeave={e => { if (!open) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.15)'; }}
      >
        <div style={{
          width: '80px', height: '52px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0,
          background: 'rgba(255,255,255,0.08)',
        }}>
          <img src={v.img} alt={v.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>{v.label}</div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{v.category} · {v.tagline}</div>
        </div>
        <svg style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', color: 'rgba(255,255,255,0.5)' }} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0, zIndex: 50,
          background: 'rgba(18,18,24,0.97)', backdropFilter: 'blur(24px)',
          borderRadius: '16px', border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)', overflow: 'hidden',
          animation: 'dropIn 0.18s ease',
        }}>
          {ALL_SLUGS.filter(s => s !== exclude).map(slug => {
            const vv = VEHICLES[slug];
            const isActive = slug === value;
            return (
              <button key={slug} onClick={() => { onChange(slug); setOpen(false); }} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: '14px',
                padding: '14px 20px', background: isActive ? `${vv.accent}22` : 'transparent',
                border: 'none', cursor: 'pointer', transition: 'background 0.15s', textAlign: 'left',
                borderLeft: isActive ? `3px solid ${vv.accent}` : '3px solid transparent',
              }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <div style={{ width: '56px', height: '36px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,0.08)' }}>
                  <img src={vv.img} alt={vv.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: isActive ? vv.accent : '#fff' }}>{vv.label}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{vv.category} · From {vv.priceDisplay}</div>
                </div>
                {isActive && <svg style={{ marginLeft: 'auto', color: vv.accent }} width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ComparePage() {
  const navigate = useNavigate();
  const [leftSlug, setLeftSlug] = useState('model-3');
  const [rightSlug, setRightSlug] = useState('model-y');
  const [vis, setVis] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.05 });
    if (tableRef.current) obs.observe(tableRef.current);
    return () => obs.disconnect();
  }, []);

  const left = VEHICLES[leftSlug];
  const right = VEHICLES[rightSlug];

  function winner(row: SpecRow): 'left' | 'right' | 'tie' {
    const lv = left[row.keyA] as number;
    const rv = right[row.keyA] as number;
    if (lv === rv) return 'tie';
    const leftWins = row.higherIsBetter ? lv > rv : lv < rv;
    return leftWins ? 'left' : 'right';
  }

  const leftWins = SPEC_ROWS.filter(r => winner(r) === 'left').length;
  const rightWins = SPEC_ROWS.filter(r => winner(r) === 'right').length;

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <style>{`
        @keyframes dropIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes barGrow { from { width: 0; } to { width: var(--w); } }
        @media (max-width: 768px) {
          .compare-selectors { flex-direction: column !important; }
          .compare-table-row { grid-template-columns: 1fr !important; }
          .compare-table-cell { padding: 16px !important; }
          .compare-vs-badge { display: none !important; }
          .compare-hero-title { font-size: 36px !important; }
        }
      `}</style>

      {/* ── Hero header ── */}
      <div style={{
        paddingTop: '100px', paddingBottom: '60px',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #111827 50%, #0a0a0f 100%)',
        textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '24px', background: 'rgba(62,106,225,0.15)', border: '1px solid rgba(62,106,225,0.3)', marginBottom: '24px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#171a20"><path d="M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z"/></svg>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#171a20', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Side-by-Side Comparison</span>
        </div>
        <h1 className="compare-hero-title" style={{ fontSize: '56px', fontWeight: 700, color: '#fff', letterSpacing: '-2px', lineHeight: 1.05, marginBottom: '16px' }}>
          Compare Models
        </h1>
        <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.45)', maxWidth: '440px', margin: '0 auto 48px', lineHeight: 1.6 }}>
          Select any two Tesla vehicles to see a detailed side-by-side breakdown of performance, range, and more.
        </p>

        {/* Selectors */}
        <div className="compare-selectors" style={{ display: 'flex', gap: '16px', maxWidth: '900px', margin: '0 auto', padding: '0 24px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <VehicleSelector value={leftSlug} onChange={s => { setLeftSlug(s); setVis(false); setTimeout(() => setVis(true), 50); }} exclude={rightSlug} />
          </div>
          <div className="compare-vs-badge" style={{
            width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em',
          }}>VS</div>
          <div style={{ flex: 1 }}>
            <VehicleSelector value={rightSlug} onChange={s => { setRightSlug(s); setVis(false); setTimeout(() => setVis(true), 50); }} exclude={leftSlug} />
          </div>
        </div>
      </div>

      {/* ── Score banner ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0',
        background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}>
        {[
          { v: left, wins: leftWins, align: 'right' as const },
          { v: right, wins: rightWins, align: 'left' as const },
        ].map((side, i) => (
          <div key={i} style={{
            flex: 1, padding: '20px 32px', display: 'flex',
            flexDirection: i === 0 ? 'row' : 'row-reverse', alignItems: 'center', gap: '16px',
            borderRight: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
          }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: `${side.v.accent}22`, border: `2px solid ${side.v.accent}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', fontWeight: 800, color: side.v.accent, flexShrink: 0,
            }}>{side.wins}</div>
            <div style={{ textAlign: i === 0 ? 'right' : 'left' }}>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>{side.v.label}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
                {side.wins === SPEC_ROWS.length ? '🏆 Wins all categories' : `Wins ${side.wins} of ${SPEC_ROWS.length} categories`}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Comparison table ── */}
      <div ref={tableRef} style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Column headers */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 240px 240px',
          gap: '0', marginBottom: '4px', padding: '0 0 16px',
          opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}>
          <div />
          {[left, right].map((v, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '0 16px' }}>
              <div style={{
                display: 'inline-block', padding: '6px 18px', borderRadius: '24px',
                background: `${v.accent}22`, border: `1px solid ${v.accent}44`,
                fontSize: '14px', fontWeight: 700, color: v.accent,
              }}>{v.label}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '6px' }}>{v.category}</div>
            </div>
          ))}
        </div>

        {/* Spec rows */}
        {SPEC_ROWS.map((row, rowIdx) => {
          const w = winner(row);
          const lv = left[row.keyA] as number;
          const rv = right[row.keyA] as number;
          const fmt = row.format ?? ((n: number) => `${n}`);
          const delay = rowIdx * 0.06;

          return (
            <div key={row.label} className="compare-table-row" style={{
              display: 'grid', gridTemplateColumns: '1fr 240px 240px',
              background: rowIdx % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'transparent',
              borderRadius: '12px', marginBottom: '4px', overflow: 'hidden',
              opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(16px)',
              transition: `opacity 0.5s ${delay}s ease, transform 0.5s ${delay}s ease`,
            }}>
              {/* Label */}
              <div className="compare-table-cell" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="rgba(255,255,255,0.5)" style={{ flexShrink: 0 }}><path d={row.iconPath}/></svg>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{row.label}</div>
                  <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>{row.unit}</div>
                </div>
              </div>

              {/* Left value */}
              <div className="compare-table-cell" style={{
                padding: '20px 24px', textAlign: 'center',
                background: w === 'left' ? `${left.accent}14` : 'transparent',
                borderLeft: w === 'left' ? `2px solid ${left.accent}55` : '2px solid transparent',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
              }}>
                <span style={{ fontSize: '22px', fontWeight: 700, color: w === 'left' ? left.accent : 'rgba(255,255,255,0.7)', lineHeight: 1 }}>
                  {fmt(lv)}
                </span>
                {w === 'left' && (
                  <span style={{ fontSize: '10px', fontWeight: 700, color: left.accent, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <svg viewBox="0 0 12 12" width="10" height="10" fill={left.accent}><path d="M1 6l3.5 3.5L11 2"/></svg> Better
                  </span>
                )}
              </div>

              {/* Right value */}
              <div className="compare-table-cell" style={{
                padding: '20px 24px', textAlign: 'center',
                background: w === 'right' ? `${right.accent}14` : 'transparent',
                borderLeft: w === 'right' ? `2px solid ${right.accent}55` : '2px solid transparent',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px',
              }}>
                <span style={{ fontSize: '22px', fontWeight: 700, color: w === 'right' ? right.accent : 'rgba(255,255,255,0.7)', lineHeight: 1 }}>
                  {fmt(rv)}
                </span>
                {w === 'right' && (
                  <span style={{ fontSize: '10px', fontWeight: 700, color: right.accent, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <svg viewBox="0 0 12 12" width="10" height="10" fill={right.accent}><path d="M1 6l3.5 3.5L11 2"/></svg> Better
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* Trims section */}
        <div style={{
          marginTop: '56px',
          opacity: vis ? 1 : 0, transition: 'opacity 0.5s 0.6s ease',
        }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '24px', textAlign: 'center' }}>Available Trims</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[{ v: left, slug: leftSlug }, { v: right, slug: rightSlug }].map(({ v, slug }) => (
              <div key={slug} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '16px', padding: '24px', border: `1px solid ${v.accent}22` }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: v.accent, marginBottom: '16px' }}>{v.label}</div>
                {v.trims.map(t => (
                  <div key={t.name} style={{
                    padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                    display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>{t.name}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '3px' }}>
                        {t.range} · 0–60 in {t.accel}
                      </div>
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', textAlign: 'right' }}>{t.price}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          marginTop: '56px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap',
          opacity: vis ? 1 : 0, transition: 'opacity 0.5s 0.75s ease',
        }}>
          {[{ v: left, slug: leftSlug }, { v: right, slug: rightSlug }].map(({ v, slug }) => (
            <button key={slug} onClick={() => navigate(`/contact?subject=order&vehicle=${slug}`)} style={{
              padding: '14px 36px', borderRadius: '28px',
              background: v.accent, border: 'none', cursor: 'pointer',
              fontSize: '15px', fontWeight: 700, color: '#fff',
              transition: 'opacity 0.18s, transform 0.18s',
              boxShadow: `0 8px 24px ${v.accent}44`,
              fontFamily: 'inherit',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Order {v.label}
            </button>
          ))}
          <button onClick={() => navigate('/')} style={{
            padding: '14px 36px', borderRadius: '28px',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
            cursor: 'pointer', fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.75)',
            transition: 'background 0.18s',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.14)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
