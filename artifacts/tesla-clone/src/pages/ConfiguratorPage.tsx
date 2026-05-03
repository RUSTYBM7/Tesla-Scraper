import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 900);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 900);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

/* ─── Data ─────────────────────────────────────────────────────────── */

interface Trim { name: string; basePrice: number; range: string; accel: string; topSpeed: string; awd: boolean; }
interface ColorOpt { name: string; hex: string; filter: string; price: number; }
interface WheelOpt { name: string; size: string; price: number; desc: string; }
interface InteriorOpt { name: string; desc: string; price: number; hex1: string; hex2: string; }
interface AutopilotOpt { name: string; price: number; features: string[]; }

interface VehicleConfig {
  label: string;
  img: string;
  imgPos: string;
  trims: Trim[];
  colors: ColorOpt[];
  wheels: WheelOpt[];
  interiors: InteriorOpt[];
  autopilot: AutopilotOpt[];
}

const CONFIGS: Record<string, VehicleConfig> = {
  'model-s': {
    label: 'Model S', img: `${BASE}dl-hero-model-s.jpg`, imgPos: 'center 45%',
    trims: [
      { name: 'Model S', basePrice: 74990, range: '405 mi', accel: '3.1s', topSpeed: '149 mph', awd: true },
      { name: 'Model S Plaid', basePrice: 89990, range: '396 mi', accel: '1.99s', topSpeed: '200 mph', awd: true },
    ],
    colors: [
      { name: 'Pearl White Multi-Coat', hex: '#f0f0ec', filter: 'none', price: 0 },
      { name: 'Solid Black', hex: '#1a1a1a', filter: 'brightness(0.4) saturate(0.15)', price: 1500 },
      { name: 'Midnight Silver Metallic', hex: '#737373', filter: 'brightness(0.68) saturate(0.18)', price: 1500 },
      { name: 'Deep Blue Metallic', hex: '#1e3a5f', filter: 'hue-rotate(200deg) saturate(2) brightness(0.58)', price: 2500 },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68)', price: 3500 },
      { name: 'Quicksilver', hex: '#d0d0d0', filter: 'brightness(0.92) saturate(0.1)', price: 4000 },
    ],
    wheels: [
      { name: '19" Tempest Wheels', size: '19"', price: 0, desc: 'Aero-optimized for maximum range' },
      { name: '21" Arachnid Wheels', size: '21"', price: 4500, desc: 'Sport-tuned performance compound' },
    ],
    interiors: [
      { name: 'All Black', desc: 'Black premium leather', price: 0, hex1: '#1a1a1a', hex2: '#2d2d2d' },
      { name: 'Black & White', desc: 'White leather with black trim', price: 2000, hex1: '#1a1a1a', hex2: '#f0f0ec' },
      { name: 'Cream', desc: 'Cream leather with walnut décor', price: 2000, hex1: '#e8d8c0', hex2: '#c8a87a' },
    ],
    autopilot: [
      { name: 'Standard Autopilot', price: 0, features: ['Traffic-aware cruise control', 'Autosteer on marked roads'] },
      { name: 'Enhanced Autopilot', price: 3400, features: ['Navigate on Autopilot', 'Auto lane change', 'Autopark', 'Summon'] },
      { name: 'Full Self-Driving (Supervised)', price: 8000, features: ['All Enhanced features', 'Traffic & stop sign control', 'Autosteer on city streets', 'Automatic driving on most roads'] },
    ],
  },
  'model-3': {
    label: 'Model 3', img: `${BASE}dl-hero-model-3.jpg`, imgPos: 'center 45%',
    trims: [
      { name: 'Model 3 RWD', basePrice: 40240, range: '341 mi', accel: '5.8s', topSpeed: '140 mph', awd: false },
      { name: 'Long Range AWD', basePrice: 47740, range: '358 mi', accel: '4.2s', topSpeed: '145 mph', awd: true },
      { name: 'Performance AWD', basePrice: 53240, range: '315 mi', accel: '2.9s', topSpeed: '162 mph', awd: true },
    ],
    colors: [
      { name: 'Pearl White Multi-Coat', hex: '#f0f0ec', filter: 'none', price: 0 },
      { name: 'Stealth Grey', hex: '#4a4a4a', filter: 'brightness(0.55) saturate(0.12)', price: 1000 },
      { name: 'Midnight Silver Metallic', hex: '#737373', filter: 'brightness(0.68) saturate(0.18)', price: 1500 },
      { name: 'Deep Blue Metallic', hex: '#1e3a5f', filter: 'hue-rotate(200deg) saturate(2) brightness(0.58)', price: 2500 },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68)', price: 3500 },
    ],
    wheels: [
      { name: '18" Aero Wheels', size: '18"', price: 0, desc: 'Aerodynamic covers maximize range' },
      { name: '19" Nova Wheels', size: '19"', price: 1500, desc: 'Sport appearance and performance' },
      { name: '20" Überturbine Wheels', size: '20"', price: 3000, desc: 'Performance compound for track days' },
    ],
    interiors: [
      { name: 'All Black', desc: 'Black vegan leather seating', price: 0, hex1: '#1a1a1a', hex2: '#2d2d2d' },
      { name: 'Black & White', desc: 'White vegan leather with black trim', price: 1000, hex1: '#1a1a1a', hex2: '#f0f0ec' },
    ],
    autopilot: [
      { name: 'Standard Autopilot', price: 0, features: ['Traffic-aware cruise control', 'Autosteer on marked roads'] },
      { name: 'Enhanced Autopilot', price: 3400, features: ['Navigate on Autopilot', 'Auto lane change', 'Autopark', 'Summon'] },
      { name: 'Full Self-Driving (Supervised)', price: 8000, features: ['All Enhanced features', 'Traffic & stop sign control', 'Autosteer on city streets', 'Automatic driving on most roads'] },
    ],
  },
  'model-y': {
    label: 'Model Y', img: `${BASE}dl-hero-model-y.jpg`, imgPos: 'center 45%',
    trims: [
      { name: 'Model Y RWD', basePrice: 44990, range: '320 mi', accel: '5.5s', topSpeed: '135 mph', awd: false },
      { name: 'Long Range AWD', basePrice: 54990, range: '357 mi', accel: '4.8s', topSpeed: '135 mph', awd: true },
      { name: 'Performance AWD', basePrice: 57990, range: '303 mi', accel: '3.5s', topSpeed: '150 mph', awd: true },
    ],
    colors: [
      { name: 'Pearl White Multi-Coat', hex: '#f0f0ec', filter: 'none', price: 0 },
      { name: 'Stealth Grey', hex: '#4a4a4a', filter: 'brightness(0.55) saturate(0.12)', price: 1000 },
      { name: 'Midnight Silver Metallic', hex: '#737373', filter: 'brightness(0.68) saturate(0.18)', price: 1500 },
      { name: 'Deep Blue Metallic', hex: '#1e3a5f', filter: 'hue-rotate(200deg) saturate(2) brightness(0.58)', price: 2500 },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68)', price: 3500 },
    ],
    wheels: [
      { name: '19" Gemini Wheels', size: '19"', price: 0, desc: 'Standard aero-optimized wheels' },
      { name: '21" Überturbine Wheels', size: '21"', price: 2000, desc: 'Sport compound for performance' },
    ],
    interiors: [
      { name: 'All Black', desc: 'Black vegan leather seating', price: 0, hex1: '#1a1a1a', hex2: '#2d2d2d' },
      { name: 'Black & White', desc: 'White vegan leather with black trim', price: 1000, hex1: '#1a1a1a', hex2: '#f0f0ec' },
      { name: '7-Seat Interior', desc: 'Third-row seating for up to 7', price: 3500, hex1: '#1a1a1a', hex2: '#5a6e8a' },
    ],
    autopilot: [
      { name: 'Standard Autopilot', price: 0, features: ['Traffic-aware cruise control', 'Autosteer on marked roads'] },
      { name: 'Enhanced Autopilot', price: 3400, features: ['Navigate on Autopilot', 'Auto lane change', 'Autopark', 'Summon'] },
      { name: 'Full Self-Driving (Supervised)', price: 8000, features: ['All Enhanced features', 'Traffic & stop sign control', 'Autosteer on city streets', 'Automatic driving on most roads'] },
    ],
  },
  'model-x': {
    label: 'Model X', img: `${BASE}dl-hero-model-x.jpg`, imgPos: 'center 45%',
    trims: [
      { name: 'Model X', basePrice: 79990, range: '335 mi', accel: '3.8s', topSpeed: '155 mph', awd: true },
      { name: 'Model X Plaid', basePrice: 99990, range: '326 mi', accel: '2.5s', topSpeed: '163 mph', awd: true },
    ],
    colors: [
      { name: 'Pearl White Multi-Coat', hex: '#f0f0ec', filter: 'none', price: 0 },
      { name: 'Solid Black', hex: '#1a1a1a', filter: 'brightness(0.4) saturate(0.15)', price: 1500 },
      { name: 'Midnight Silver Metallic', hex: '#737373', filter: 'brightness(0.68) saturate(0.18)', price: 1500 },
      { name: 'Deep Blue Metallic', hex: '#1e3a5f', filter: 'hue-rotate(200deg) saturate(2) brightness(0.58)', price: 2500 },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68)', price: 3500 },
      { name: 'Quicksilver', hex: '#d0d0d0', filter: 'brightness(0.92) saturate(0.1)', price: 4000 },
    ],
    wheels: [
      { name: '20" Cyberstream Wheels', size: '20"', price: 0, desc: 'Aero-optimized all-season compound' },
      { name: '22" Turbine Wheels', size: '22"', price: 5500, desc: 'Full sport appearance package' },
    ],
    interiors: [
      { name: '6-Seat All Black', desc: 'Captain\'s chairs in second row', price: 0, hex1: '#1a1a1a', hex2: '#2d2d2d' },
      { name: '7-Seat All Black', desc: 'Bench seat second row', price: 0, hex1: '#1a1a1a', hex2: '#3a3a3a' },
      { name: '6-Seat Black & White', desc: 'Captain\'s chairs with white accent', price: 2500, hex1: '#1a1a1a', hex2: '#f0f0ec' },
      { name: 'Cream', desc: 'Cream leather with walnut trim', price: 2500, hex1: '#e8d8c0', hex2: '#c8a87a' },
    ],
    autopilot: [
      { name: 'Standard Autopilot', price: 0, features: ['Traffic-aware cruise control', 'Autosteer on marked roads'] },
      { name: 'Enhanced Autopilot', price: 3400, features: ['Navigate on Autopilot', 'Auto lane change', 'Autopark', 'Summon'] },
      { name: 'Full Self-Driving (Supervised)', price: 8000, features: ['All Enhanced features', 'Traffic & stop sign control', 'Autosteer on city streets', 'Automatic driving on most roads'] },
    ],
  },
  'cybertruck': {
    label: 'Cybertruck', img: `${BASE}Cybertruck-Main-Hero-Desktop.jpg`, imgPos: 'center 40%',
    trims: [
      { name: 'Cybertruck AWD', basePrice: 79990, range: '340 mi', accel: '4.1s', topSpeed: '112 mph', awd: true },
      { name: 'Cyberbeast', basePrice: 99990, range: '320 mi', accel: '2.6s', topSpeed: '130 mph', awd: true },
    ],
    colors: [
      { name: 'Stainless Steel', hex: '#d8d8d0', filter: 'none', price: 0 },
      { name: 'Matte Black Wrap', hex: '#1a1a1a', filter: 'brightness(0.38) saturate(0.1)', price: 6000 },
      { name: 'Satin Khaki Wrap', hex: '#8b7a5c', filter: 'sepia(0.45) saturate(0.75) brightness(0.68)', price: 6000 },
    ],
    wheels: [
      { name: '20" All-Terrain', size: '20"', price: 0, desc: 'Standard all-terrain tires' },
      { name: '20" Off-Road Package', size: '20"', price: 2500, desc: 'Enhanced off-road compound + skid plates' },
      { name: '22" Sport Wheels', size: '22"', price: 4000, desc: 'Street-focused performance package' },
    ],
    interiors: [
      { name: 'All Black', desc: 'Durable black interior with matte trim', price: 0, hex1: '#1a1a1a', hex2: '#2d2d2d' },
      { name: 'White Interior', desc: 'White interior with chrome accents', price: 2000, hex1: '#e8e8e8', hex2: '#c8c8c8' },
    ],
    autopilot: [
      { name: 'Standard Autopilot', price: 0, features: ['Traffic-aware cruise control', 'Autosteer on marked roads'] },
      { name: 'Enhanced Autopilot', price: 3400, features: ['Navigate on Autopilot', 'Auto lane change', 'Autopark', 'Summon'] },
      { name: 'Full Self-Driving (Supervised)', price: 8000, features: ['All Enhanced features', 'Traffic & stop sign control', 'Autosteer on city streets', 'Automatic driving on most roads'] },
    ],
  },
};

/* ─── Helpers ──────────────────────────────────────────────────────── */

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US');
}

/* ─── Order Modal ──────────────────────────────────────────────────── */

interface Summary {
  vehicle: string; trim: string; color: string; wheels: string;
  interior: string; autopilot: string; total: number;
}

function OrderModal({ summary, onClose }: { summary: Summary; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', delivery: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }} onClick={onClose}>
      <style>{`@keyframes mFade{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}`}</style>
      <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', animation: 'mFade .25s ease' }} onClick={e => e.stopPropagation()}>
        {!sent ? (
          <>
            <div style={{ padding: '32px 32px 0', borderBottom: '1px solid #eee' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#171a20', marginBottom: '4px' }}>Complete Your Order</h2>
              <p style={{ fontSize: '13px', color: '#6e7180', marginBottom: '20px' }}>Review your configuration and submit</p>

              {/* Summary */}
              <div style={{ background: '#f8f9fa', borderRadius: '10px', padding: '16px', marginBottom: '20px', fontSize: '13px' }}>
                <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '10px', color: '#171a20' }}>{summary.vehicle} — {summary.trim}</div>
                {[
                  ['Color', summary.color],
                  ['Wheels', summary.wheels],
                  ['Interior', summary.interior],
                  ['Autopilot', summary.autopilot],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #eee', color: '#5c5e62' }}>
                    <span>{k}</span><span style={{ color: '#171a20', fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontWeight: 700, fontSize: '16px', color: '#171a20' }}>
                  <span>Total</span><span>{fmt(summary.total)}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '24px 32px 32px' }}>
              {[
                { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Jane Smith', required: true },
                { label: 'Email Address', key: 'email', type: 'email', placeholder: 'jane@example.com', required: true },
                { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+1 (555) 000-0000', required: false },
                { label: 'Preferred Delivery Date', key: 'delivery', type: 'date', placeholder: '', required: false },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#5c5e62', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>{f.label}{f.required && ' *'}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    required={f.required}
                    value={(form as Record<string, string>)[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', color: '#171a20' }}
                    onFocus={e => (e.target.style.borderColor = '#171a20')}
                    onBlur={e => (e.target.style.borderColor = '#d1d5db')}
                  />
                </div>
              ))}
              <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '20px' }}>A $250 deposit is due at order placement. Full payment at delivery.</p>
              <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', borderRadius: '8px', background: loading ? '#888' : '#171a20', color: '#fff', border: 'none', fontSize: '15px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'background .2s' }}>
                {loading ? 'Submitting…' : `Place Order — ${fmt(summary.total)}`}
              </button>
            </form>
          </>
        ) : (
          <div style={{ padding: '52px 32px', textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#171a20', marginBottom: '8px' }}>Order Submitted!</h2>
            <p style={{ fontSize: '14px', color: '#6e7180', marginBottom: '6px' }}>Thank you for your order of the <strong>{summary.vehicle}</strong>.</p>
            <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '32px' }}>A confirmation will be sent to your email. A Teslaofficial.site advisor will be in touch shortly.</p>
            <div style={{ background: '#f8f9fa', borderRadius: '10px', padding: '16px', textAlign: 'left', fontSize: '13px', marginBottom: '28px' }}>
              <div style={{ fontWeight: 700, color: '#171a20', marginBottom: '8px' }}>Order Reference: <span style={{ color: '#3e6ae1' }}>TO-{Math.random().toString(36).slice(2, 8).toUpperCase()}</span></div>
              <div style={{ color: '#5c5e62' }}>{summary.trim} · {summary.color}</div>
              <div style={{ fontWeight: 600, color: '#171a20', marginTop: '8px' }}>{fmt(summary.total)}</div>
            </div>
            <button onClick={onClose} style={{ padding: '13px 40px', borderRadius: '8px', background: '#171a20', color: '#fff', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Section wrapper ──────────────────────────────────────────────── */

function Section({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '44px' }}>
      <div style={{ marginBottom: '18px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#171a20', marginBottom: '2px' }}>{title}</h3>
        <p style={{ fontSize: '12px', color: '#9ca3af' }}>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

/* ─── Main Page ────────────────────────────────────────────────────── */

export default function ConfiguratorPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const cfg = slug ? CONFIGS[slug] : null;

  const [trimIdx, setTrimIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);
  const [wheelIdx, setWheelIdx] = useState(0);
  const [interiorIdx, setInteriorIdx] = useState(0);
  const [apIdx, setApIdx] = useState(0);
  const [showOrder, setShowOrder] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!cfg) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, marginBottom: '16px' }}>Vehicle not found</h1>
        <button onClick={() => navigate('/')} style={{ color: '#3e6ae1', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontFamily: 'inherit' }}>Back to Home</button>
      </div>
    );
  }

  const trim = cfg.trims[trimIdx];
  const color = cfg.colors[colorIdx];
  const wheel = cfg.wheels[wheelIdx];
  const interior = cfg.interiors[interiorIdx];
  const ap = cfg.autopilot[apIdx];
  const total = trim.basePrice + color.price + wheel.price + interior.price + ap.price;

  const summary: Summary = {
    vehicle: cfg.label, trim: trim.name, color: color.name,
    wheels: wheel.name, interior: interior.name, autopilot: ap.name, total,
  };

  const OPTION_BTN = (selected: boolean): React.CSSProperties => ({
    border: selected ? '2px solid #171a20' : '1px solid #e0e0e0',
    borderRadius: '10px',
    background: selected ? '#171a20' : '#fff',
    color: selected ? '#fff' : '#171a20',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all .18s',
    textAlign: 'left' as const,
    outline: 'none',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <style>{`
        @keyframes cfgFade{from{opacity:0}to{opacity:1}}
        .cfg-scroll::-webkit-scrollbar{width:4px}
        .cfg-scroll::-webkit-scrollbar-track{background:transparent}
        .cfg-scroll::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px}
        input:focus{outline:none}
        .opt-card:hover{border-color:#171a20!important}
      `}</style>

      {/* Back breadcrumb */}
      <div style={{ position: 'fixed', top: '60px', left: '20px', zIndex: 100 }}>
        <button onClick={() => navigate(`/vehicles/${slug}`)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,.88)', backdropFilter: 'blur(8px)', border: '1px solid rgba(0,0,0,.1)', borderRadius: '20px', padding: '8px 14px', cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: '#171a20', fontFamily: 'inherit', boxShadow: '0 2px 8px rgba(0,0,0,.1)' }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
          {cfg.label}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', minHeight: '100vh', paddingTop: '0' }}>

        {/* ── Left: Sticky Vehicle Viewer ── */}
        <div style={{ width: isMobile ? '100%' : '52%', position: isMobile ? 'relative' : 'sticky', top: 0, height: isMobile ? '55vw' : '100vh', flexShrink: 0, overflow: 'hidden', background: '#0d1117' }}>
          {!imgLoaded && <div style={{ position: 'absolute', inset: 0, background: '#1a1f2e' }} />}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${cfg.img})`, backgroundSize: 'cover', backgroundPosition: cfg.imgPos, filter: color.filter, transition: 'filter .6s ease', opacity: imgLoaded ? 1 : 0 }} />
          <img src={cfg.img} alt="" style={{ display: 'none' }} onLoad={() => setImgLoaded(true)} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.3) 0%,rgba(0,0,0,.05) 50%,rgba(0,0,0,.6) 100%)', pointerEvents: 'none' }} />

          {/* Vehicle name + price overlay */}
          <div style={{ position: 'absolute', bottom: isMobile ? '16px' : '40px', left: '0', right: '0', textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ fontSize: isMobile ? '11px' : '12px', fontWeight: 600, letterSpacing: '0.14em', color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', marginBottom: '4px' }}>Configure Your</div>
            <div style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 700, color: '#fff', letterSpacing: '-1px' }}>{cfg.label}</div>
            <div style={{ fontSize: isMobile ? '14px' : '15px', color: 'rgba(255,255,255,.55)', marginTop: '2px' }}>{trim.name}</div>
          </div>

          {/* Color swatch strip at bottom left */}
          <div style={{ position: 'absolute', bottom: isMobile ? '16px' : '40px', right: isMobile ? '16px' : '24px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
            {cfg.colors.map((c, i) => (
              <button key={c.name} title={c.name} onClick={() => setColorIdx(i)} style={{ width: i === colorIdx ? '26px' : '18px', height: i === colorIdx ? '26px' : '18px', borderRadius: '50%', background: c.hex, border: i === colorIdx ? '2px solid #fff' : '1.5px solid rgba(255,255,255,.35)', cursor: 'pointer', transition: 'all .2s', outline: 'none', boxShadow: i === colorIdx ? '0 0 0 2px rgba(255,255,255,.4)' : 'none' }} />
            ))}
          </div>
        </div>

        {/* ── Right: Configuration Panels ── */}
        <div ref={rightRef} className="cfg-scroll" style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '24px 16px 160px' : '64px 48px 160px', maxWidth: isMobile ? '100%' : '560px' }}>

          {/* ── 1. Trim ── */}
          <Section title="Choose Your Model" subtitle="Select a trim level">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cfg.trims.map((t, i) => (
                <button key={t.name} className="opt-card" onClick={() => setTrimIdx(i)} style={{ ...OPTION_BTN(i === trimIdx), padding: '16px 18px', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>{t.name}</div>
                      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                        {[['Range', t.range], ['0–60 mph', t.accel], ['Top Speed', t.topSpeed]].map(([k, v]) => (
                          <div key={k}>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: i === trimIdx ? 'rgba(255,255,255,.9)' : '#171a20' }}>{v}</div>
                            <div style={{ fontSize: '11px', color: i === trimIdx ? 'rgba(255,255,255,.5)' : '#9ca3af' }}>{k}</div>
                          </div>
                        ))}
                        {t.awd && <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: i === trimIdx ? 'rgba(255,255,255,.15)' : '#f1f5f9', borderRadius: '4px', padding: '2px 7px', fontSize: '11px', fontWeight: 600, color: i === trimIdx ? 'rgba(255,255,255,.8)' : '#64748b' }}>AWD</div>}
                      </div>
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '12px' }}>{fmt(t.basePrice)}</div>
                  </div>
                </button>
              ))}
            </div>
          </Section>

          {/* ── 2. Color ── */}
          <Section title="Exterior Color" subtitle={`${color.name}${color.price > 0 ? ` — +${fmt(color.price)}` : ' — Included'}`}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(cfg.colors.length, 3)}, 1fr)`, gap: '10px' }}>
              {cfg.colors.map((c, i) => (
                <button key={c.name} className="opt-card" onClick={() => setColorIdx(i)} style={{ ...OPTION_BTN(i === colorIdx), padding: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: c.hex, border: i === colorIdx ? '3px solid #171a20' : '2px solid #e0e0e0', transition: 'border .2s', boxShadow: '0 2px 6px rgba(0,0,0,.12)' }} />
                  <div style={{ fontSize: '11px', fontWeight: 500, color: i === colorIdx ? '#171a20' : '#5c5e62', textAlign: 'center', lineHeight: 1.3 }}>{c.name}</div>
                  <div style={{ fontSize: '11px', color: c.price > 0 ? '#3e6ae1' : '#22c55e', fontWeight: 600 }}>{c.price > 0 ? `+${fmt(c.price)}` : 'Incl.'}</div>
                </button>
              ))}
            </div>
          </Section>

          {/* ── 3. Wheels ── */}
          <Section title="Wheels" subtitle="Choose your wheel style and size">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cfg.wheels.map((w, i) => (
                <button key={w.name} className="opt-card" onClick={() => setWheelIdx(i)} style={{ ...OPTION_BTN(i === wheelIdx), padding: '16px 18px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: i === wheelIdx ? '3px solid rgba(255,255,255,.6)' : '3px solid #d0d0d0', background: i === wheelIdx ? '#444' : '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                      {[0, 90, 180, 270].map(deg => (
                        <div key={deg} style={{ position: 'absolute', width: '2px', height: '16px', background: i === wheelIdx ? 'rgba(255,255,255,.6)' : '#b0b0b0', top: '50%', left: '50%', transformOrigin: '50% 0', transform: `translateX(-50%) rotate(${deg}deg)` }} />
                      ))}
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: i === wheelIdx ? '#666' : '#999', position: 'absolute', zIndex: 1 }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>{w.name}</div>
                      <div style={{ fontSize: '12px', color: i === wheelIdx ? 'rgba(255,255,255,.6)' : '#9ca3af' }}>{w.desc}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '12px' }}>{w.price > 0 ? `+${fmt(w.price)}` : 'Incl.'}</div>
                </button>
              ))}
            </div>
          </Section>

          {/* ── 4. Interior ── */}
          <Section title="Interior" subtitle="Choose your cabin experience">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {cfg.interiors.map((it, i) => (
                <button key={it.name} className="opt-card" onClick={() => setInteriorIdx(i)} style={{ ...OPTION_BTN(i === interiorIdx), padding: '14px' }}>
                  <div style={{ height: '36px', borderRadius: '6px', background: `linear-gradient(135deg, ${it.hex1} 50%, ${it.hex2} 50%)`, marginBottom: '10px', border: '1px solid rgba(0,0,0,.1)' }} />
                  <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '2px' }}>{it.name}</div>
                  <div style={{ fontSize: '11px', color: i === interiorIdx ? 'rgba(255,255,255,.6)' : '#9ca3af', marginBottom: '6px' }}>{it.desc}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: it.price > 0 ? (i === interiorIdx ? '#93c5fd' : '#3e6ae1') : (i === interiorIdx ? '#86efac' : '#22c55e') }}>
                    {it.price > 0 ? `+${fmt(it.price)}` : 'Included'}
                  </div>
                </button>
              ))}
            </div>
          </Section>

          {/* ── 5. Autopilot ── */}
          <Section title="Autopilot" subtitle="Choose your driver assistance package">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {cfg.autopilot.map((a, i) => (
                <button key={a.name} className="opt-card" onClick={() => setApIdx(i)} style={{ ...OPTION_BTN(i === apIdx), padding: '16px 18px', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700 }}>{a.name}</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, whiteSpace: 'nowrap', marginLeft: '12px', color: i === apIdx ? 'rgba(255,255,255,.9)' : '#171a20' }}>{a.price > 0 ? `+${fmt(a.price)}` : 'Included'}</div>
                  </div>
                  <ul style={{ margin: 0, padding: '0 0 0 16px' }}>
                    {a.features.map(f => (
                      <li key={f} style={{ fontSize: '12px', color: i === apIdx ? 'rgba(255,255,255,.65)' : '#6e7180', marginBottom: '2px', lineHeight: 1.4 }}>{f}</li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </Section>

          {/* ── 6. Price Summary ── */}
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e5e7eb', padding: '20px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#171a20', marginBottom: '14px' }}>Your Configuration</h3>
            {[
              [trim.name, fmt(trim.basePrice)],
              ...(color.price > 0 ? [[color.name, `+${fmt(color.price)}`]] : []),
              ...(wheel.price > 0 ? [[wheel.name, `+${fmt(wheel.price)}`]] : []),
              ...(interior.price > 0 ? [[interior.name, `+${fmt(interior.price)}`]] : []),
              ...(ap.price > 0 ? [[ap.name, `+${fmt(ap.price)}`]] : []),
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#5c5e62', padding: '4px 0', borderBottom: '1px solid #f3f4f6' }}>
                <span>{k}</span><span style={{ fontWeight: 500, color: '#171a20' }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 700, color: '#171a20', marginTop: '12px' }}>
              <span>Total</span><span>{fmt(total)}</span>
            </div>
            <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '6px' }}>Before taxes, incentives, and destination charges</p>
          </div>

        </div>
      </div>

      {/* ── Sticky Bottom Bar ── */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200, background: 'rgba(255,255,255,.96)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(0,0,0,.1)', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '1px' }}>{cfg.label} · {trim.name}</div>
          <div style={{ fontSize: '22px', fontWeight: 700, color: '#171a20', lineHeight: 1 }}>{fmt(total)}</div>
          <div style={{ fontSize: '11px', color: '#9ca3af' }}>est. {fmt(Math.round(total / 72))}/mo financing</div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => navigate(`/vehicles/${slug}`)} style={{ padding: '13px 24px', borderRadius: '8px', background: 'transparent', border: '1.5px solid #d1d5db', color: '#374151', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color .2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#171a20'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#d1d5db'}
          >Learn More</button>
          <button onClick={() => setShowOrder(true)} style={{ padding: '13px 32px', borderRadius: '8px', background: '#171a20', color: '#fff', border: 'none', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'background .2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#2d3240'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#171a20'}
          >Order Now</button>
        </div>
      </div>

      {showOrder && <OrderModal summary={summary} onClose={() => setShowOrder(false)} />}
    </div>
  );
}
