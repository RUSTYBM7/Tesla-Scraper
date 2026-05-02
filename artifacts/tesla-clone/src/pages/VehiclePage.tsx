import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useParallax } from '../hooks/use-parallax';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => { const h = () => setM(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
}

interface ColorOption { name: string; hex: string; filter: string; }
interface TrimVariant { name: string; range: string; accel: string; topSpeed: string; price: string; awd?: boolean; }
interface VehicleData {
  label: string; tagline: string; heroImg: string; heroPos: string; light: boolean;
  colors: ColorOption[]; trims: TrimVariant[];
  specs: { label: string; value: string; unit: string }[];
  features: { title: string; desc: string }[];
}

const VEHICLES: Record<string, VehicleData> = {
  'model-s': {
    label: 'Model S', tagline: 'Relentless Performance',
    heroImg: `${BASE}grid-model-s.jpg`, heroPos: 'center 50%', light: true,
    colors: [
      { name: 'Pearl White Multi-Coat', hex: '#f0f0ec', filter: 'none' },
      { name: 'Solid Black', hex: '#1a1a1a', filter: 'brightness(0.4) saturate(0.15)' },
      { name: 'Midnight Silver Metallic', hex: '#737373', filter: 'brightness(0.68) saturate(0.18)' },
      { name: 'Deep Blue Metallic', hex: '#1e3a5f', filter: 'hue-rotate(200deg) saturate(2) brightness(0.58)' },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68)' },
      { name: 'Quicksilver', hex: '#d0d0d0', filter: 'brightness(0.92) saturate(0.1)' },
    ],
    trims: [
      { name: 'Model S', range: '405 mi', accel: '3.1s', topSpeed: '149 mph', price: '$74,990', awd: true },
      { name: 'Model S Plaid', range: '396 mi', accel: '1.99s', topSpeed: '200 mph', price: '$89,990', awd: true },
    ],
    specs: [
      { label: 'Peak Power', value: '670', unit: 'hp' },
      { label: 'Range', value: '405', unit: 'mi' },
      { label: '0-60 mph', value: '3.1', unit: 's' },
      { label: 'Top Speed', value: '149', unit: 'mph' },
    ],
    features: [
      { title: 'Ludicrous Mode', desc: '0-60 mph in 1.99s with Plaid powertrain' },
      { title: '5-Star Safety', desc: 'Top safety rating in every category' },
      { title: 'Over-the-Air Updates', desc: 'Software updates delivered while you sleep' },
      { title: 'Gaming & Entertainment', desc: 'Steam gaming platform built in' },
    ],
  },
  'model-3': {
    label: 'Model 3', tagline: 'Order. Drive. Enjoy.',
    heroImg: `${BASE}hero-model-3.jpg`, heroPos: 'center 50%', light: false,
    colors: [
      { name: 'Pearl White Multi-Coat', hex: '#f0f0ec', filter: 'none' },
      { name: 'Stealth Grey', hex: '#4a4a4a', filter: 'brightness(0.55) saturate(0.12)' },
      { name: 'Midnight Silver Metallic', hex: '#737373', filter: 'brightness(0.68) saturate(0.18)' },
      { name: 'Deep Blue Metallic', hex: '#1e3a5f', filter: 'hue-rotate(200deg) saturate(2) brightness(0.58)' },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68)' },
    ],
    trims: [
      { name: 'Model 3 RWD', range: '341 mi', accel: '5.8s', topSpeed: '140 mph', price: '$40,240' },
      { name: 'Long Range AWD', range: '358 mi', accel: '4.2s', topSpeed: '145 mph', price: '$47,740', awd: true },
      { name: 'Performance AWD', range: '315 mi', accel: '2.9s', topSpeed: '162 mph', price: '$53,240', awd: true },
    ],
    specs: [
      { label: 'Peak Power', value: '283', unit: 'hp' },
      { label: 'Range', value: '358', unit: 'mi' },
      { label: '0-60 mph', value: '4.2', unit: 's' },
      { label: 'Top Speed', value: '145', unit: 'mph' },
    ],
    features: [
      { title: 'Track-Ready Performance', desc: 'Performance variant reaches 162 mph' },
      { title: 'Most Affordable', desc: 'Starting at $40,240 before incentives' },
      { title: '358 mi Range', desc: 'Long Range AWD for the open road' },
      { title: 'Full Self-Driving Capable', desc: 'FSD (Supervised) available' },
    ],
  },
  'model-y': {
    label: 'Model Y', tagline: "America's Best-Selling Vehicle",
    heroImg: `${BASE}model-y-road.jpg`, heroPos: 'center 40%', light: true,
    colors: [
      { name: 'Pearl White Multi-Coat', hex: '#f0f0ec', filter: 'none' },
      { name: 'Stealth Grey', hex: '#4a4a4a', filter: 'brightness(0.55) saturate(0.12)' },
      { name: 'Midnight Silver Metallic', hex: '#737373', filter: 'brightness(0.68) saturate(0.18)' },
      { name: 'Deep Blue Metallic', hex: '#1e3a5f', filter: 'hue-rotate(200deg) saturate(2) brightness(0.58)' },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68)' },
    ],
    trims: [
      { name: 'Model Y RWD', range: '320 mi', accel: '5.5s', topSpeed: '135 mph', price: '$44,990' },
      { name: 'Long Range AWD', range: '357 mi', accel: '4.8s', topSpeed: '135 mph', price: '$54,990', awd: true },
      { name: 'Performance AWD', range: '303 mi', accel: '3.5s', topSpeed: '150 mph', price: '$57,990', awd: true },
    ],
    specs: [
      { label: 'Seating', value: '7', unit: 'adults' },
      { label: 'Range', value: '357', unit: 'mi' },
      { label: '0-60 mph', value: '3.5', unit: 's' },
      { label: 'Cargo', value: '76', unit: 'cu ft' },
    ],
    features: [
      { title: '7-Seat Option', desc: 'Third row seating for the whole family' },
      { title: '76 cu ft Cargo', desc: 'Best-in-class storage with rear seats down' },
      { title: 'Top Safety Rating', desc: 'NHTSA 5-star rating in all categories' },
      { title: 'All-Wheel Drive', desc: 'Dual motor AWD available on all trims' },
    ],
  },
  'model-x': {
    label: 'Model X', tagline: 'Beyond Ludicrous',
    heroImg: `${BASE}grid-model-x2.jpg`, heroPos: 'center 50%', light: true,
    colors: [
      { name: 'Pearl White Multi-Coat', hex: '#f0f0ec', filter: 'none' },
      { name: 'Solid Black', hex: '#1a1a1a', filter: 'brightness(0.4) saturate(0.15)' },
      { name: 'Midnight Silver Metallic', hex: '#737373', filter: 'brightness(0.68) saturate(0.18)' },
      { name: 'Deep Blue Metallic', hex: '#1e3a5f', filter: 'hue-rotate(200deg) saturate(2) brightness(0.58)' },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68)' },
      { name: 'Quicksilver', hex: '#d0d0d0', filter: 'brightness(0.92) saturate(0.1)' },
    ],
    trims: [
      { name: 'Model X', range: '335 mi', accel: '3.8s', topSpeed: '155 mph', price: '$79,990', awd: true },
      { name: 'Model X Plaid', range: '326 mi', accel: '2.5s', topSpeed: '163 mph', price: '$99,990', awd: true },
    ],
    specs: [
      { label: 'Seating', value: '7', unit: 'adults' },
      { label: 'Range', value: '335', unit: 'mi' },
      { label: '0-60 mph', value: '2.5', unit: 's' },
      { label: 'Top Speed', value: '163', unit: 'mph' },
    ],
    features: [
      { title: 'Falcon Wing Doors', desc: 'Open in tight spaces, rain-free rear loading' },
      { title: '17-inch Rear Screen', desc: 'Cinematic display for rear passengers' },
      { title: '1,020 hp Plaid', desc: 'Tri-motor absolute performance' },
      { title: 'Air Suspension', desc: 'Adaptive suspension for any terrain' },
    ],
  },
  'cybertruck': {
    label: 'Cybertruck', tagline: 'Built for Any Planet',
    heroImg: `${BASE}truck-candidate.jpg`, heroPos: 'center 40%', light: true,
    colors: [
      { name: 'Stainless Steel', hex: '#d8d8d0', filter: 'none' },
      { name: 'Matte Black Wrap', hex: '#1a1a1a', filter: 'brightness(0.38) saturate(0.1)' },
      { name: 'Satin Khaki Wrap', hex: '#8b7a5c', filter: 'sepia(0.45) saturate(0.75) brightness(0.68)' },
    ],
    trims: [
      { name: 'Cybertruck AWD', range: '340 mi', accel: '4.1s', topSpeed: '112 mph', price: '$79,990', awd: true },
      { name: 'Cyberbeast', range: '320 mi', accel: '2.6s', topSpeed: '130 mph', price: '$99,990', awd: true },
    ],
    specs: [
      { label: 'Payload', value: '2,200', unit: 'lbs' },
      { label: 'Range', value: '340', unit: 'mi' },
      { label: '0-60 mph', value: '2.6', unit: 's' },
      { label: 'Towing', value: '11,000', unit: 'lbs' },
    ],
    features: [
      { title: 'Stainless Steel Exoskeleton', desc: 'Ultra-hard 30X cold-rolled stainless steel body' },
      { title: '11,000 lb Towing', desc: 'Haul nearly any load on any terrain' },
      { title: 'Cyberbeast Mode', desc: '0-60 in 2.6s with all three motors' },
      { title: 'On-Board Power Export', desc: '11.5 kW to power any tool on any job site' },
    ],
  },
};

function HeroSection({ img, pos, filter, light, label, tagline }: { img: string; pos: string; filter: string; light: boolean; label: string; tagline: string }) {
  const { containerRef, bgRef } = useParallax(0.35);
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section ref={containerRef as React.RefObject<HTMLElement>} style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#0d1b2e' }}>
      <div ref={bgRef} style={{ position: 'absolute', top: '-20%', left: 0, width: '100%', height: '140%', willChange: 'transform' }}>
        <div style={{ width: '100%', height: '100%', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: pos, filter, transition: 'filter 0.6s ease' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: light ? 'linear-gradient(180deg,rgba(0,0,0,.32) 0%,rgba(0,0,0,.08) 50%,rgba(0,0,0,.55) 100%)' : 'linear-gradient(180deg,rgba(0,0,0,.12) 0%,transparent 40%,rgba(0,0,0,.3) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '18%', left: 0, right: 0, textAlign: 'center', zIndex: 2, opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity .8s ease, transform .8s ease' }}>
        <p style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '12px' }}>{tagline}</p>
        <h1 style={{ fontSize: 'clamp(48px,8vw,100px)', fontWeight: 600, color: '#fff', letterSpacing: '-2px', lineHeight: 1, textShadow: '0 2px 16px rgba(0,0,0,.35)' }}>{label}</h1>
      </div>
      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', opacity: vis ? 0.6 : 0, transition: 'opacity 1.2s ease 0.5s' }}>
        <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#fff', textTransform: 'uppercase' }}>Configure</span>
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><polyline points="6,9 12,15 18,9"/></svg>
      </div>
    </section>
  );
}

export default function VehiclePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const vehicle = slug ? VEHICLES[slug] : null;

  const [colorIdx, setColorIdx] = useState(0);
  const [trimIdx, setTrimIdx] = useState(0);
  const [hoveredColor, setHoveredColor] = useState<number | null>(null);
  const [vis, setVis] = useState(false);
  const specRef = useRef<HTMLDivElement>(null);
  const trimRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setColorIdx(0); setTrimIdx(0); setVis(false); const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t); }, [slug]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (specRef.current) obs.observe(specRef.current);
    return () => obs.disconnect();
  }, []);

  if (!vehicle) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '16px' }}>Vehicle not found</h1>
        <button onClick={() => navigate('/')} style={{ color: '#3e6ae1', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', fontFamily: 'inherit' }}>Back to Home</button>
      </div>
    );
  }

  const activeColor = vehicle.colors[hoveredColor ?? colorIdx];
  const activeTrim = vehicle.trims[trimIdx];

  function scrollTrims(dir: number) {
    trimRef.current?.scrollBy({ left: dir * 220, behavior: 'smooth' });
  }

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', background: '#f8f9fa' }}>
      <style>{`.trim-scroll::-webkit-scrollbar{display:none}`}</style>

      <HeroSection img={vehicle.heroImg} pos={vehicle.heroPos} filter={activeColor.filter} light={vehicle.light} label={vehicle.label} tagline={vehicle.tagline} />

      {/* Specs bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
        <div ref={specRef} style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${vehicle.specs.length},1fr)`, gap: '1px', background: '#eee' }}>
          {vehicle.specs.map((s, i) => (
            <div key={s.label} style={{ background: '#fff', padding: isMobile ? '20px 12px' : '28px 20px', textAlign: 'center', opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(16px)', transition: `opacity .6s ease ${i * 0.08}s, transform .6s ease ${i * 0.08}s` }}>
              <div style={{ fontSize: isMobile ? '22px' : '30px', fontWeight: 700, color: '#171a20', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: '#5c5e62', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.unit}</div>
              <div style={{ fontSize: '12px', color: '#9a9a9a', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: isMobile ? '36px 16px 100px' : '52px 24px 100px' }}>

        {/* Trim selector */}
        <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 700, color: '#171a20', marginBottom: '6px' }}>Choose Your Trim</h2>
        <p style={{ fontSize: '13px', color: '#9a9a9a', marginBottom: '18px' }}>Swipe to see all options</p>
        <div style={{ position: 'relative', marginBottom: '44px' }}>
          {!isMobile && vehicle.trims.length > 2 && (
            <>
              <button onClick={() => scrollTrims(-1)} style={{ position: 'absolute', left: '-16px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, width: '36px', height: '36px', borderRadius: '50%', background: '#fff', border: '1px solid #e0e0e0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.1)' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#171a20" strokeWidth="2" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
              </button>
              <button onClick={() => scrollTrims(1)} style={{ position: 'absolute', right: '-16px', top: '50%', transform: 'translateY(-50%)', zIndex: 2, width: '36px', height: '36px', borderRadius: '50%', background: '#fff', border: '1px solid #e0e0e0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.1)' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#171a20" strokeWidth="2" strokeLinecap="round"><polyline points="9,6 15,12 9,18"/></svg>
              </button>
            </>
          )}
          <div ref={trimRef} className="trim-scroll" style={{ display: 'flex', gap: '12px', overflowX: 'auto', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', paddingBottom: '4px' }}>
            {vehicle.trims.map((trim, ti) => {
              const sel = ti === trimIdx;
              return (
                <button key={trim.name} onClick={() => setTrimIdx(ti)} style={{ flexShrink: 0, scrollSnapAlign: 'start', minWidth: isMobile ? 'calc(88vw - 32px)' : '280px', padding: '22px', borderRadius: '12px', textAlign: 'left', border: `2px solid ${sel ? '#171a20' : '#e0e0e0'}`, background: sel ? '#fff' : '#fafafa', cursor: 'pointer', fontFamily: 'inherit', boxShadow: sel ? '0 4px 20px rgba(0,0,0,.1)' : 'none', transition: 'border-color .2s, box-shadow .2s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: '#171a20' }}>{trim.name}</div>
                    {trim.awd && <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', color: '#fff', background: '#171a20', padding: '3px 8px', borderRadius: '4px' }}>AWD</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '20px', marginBottom: '14px' }}>
                    {[{ v: trim.range, l: 'Range' }, { v: trim.accel, l: '0-60 mph' }, { v: trim.topSpeed, l: 'Top Speed' }].map(s => (
                      <div key={s.l}>
                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#171a20' }}>{s.v}</div>
                        <div style={{ fontSize: '10px', color: '#9a9a9a', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ borderTop: '1px solid #eee', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '18px', fontWeight: 700, color: '#171a20' }}>{trim.price}</span>
                      <span style={{ fontSize: '11px', color: '#9a9a9a', marginLeft: '6px' }}>before incentives</span>
                    </div>
                    {sel && <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#171a20', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    </div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Color selector */}
        <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 700, color: '#171a20', marginBottom: '4px' }}>Exterior Color</h2>
        <p style={{ fontSize: '14px', color: '#5c5e62', marginBottom: '18px', minHeight: '20px' }}>{activeColor.name}</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '52px' }}>
          {vehicle.colors.map((col, ci) => {
            const active = ci === colorIdx;
            return (
              <button key={col.name} title={col.name}
                onClick={() => setColorIdx(ci)}
                onMouseEnter={() => setHoveredColor(ci)}
                onMouseLeave={() => setHoveredColor(null)}
                style={{ width: active ? '46px' : '38px', height: active ? '46px' : '38px', borderRadius: '50%', background: col.hex, border: `3px solid ${active ? '#171a20' : 'transparent'}`, outline: active ? '2px solid rgba(23,26,32,.2)' : '2px solid #e0e0e0', outlineOffset: '2px', cursor: 'pointer', transition: 'all .2s', boxShadow: '0 2px 6px rgba(0,0,0,.18)', transform: hoveredColor === ci && !active ? 'scale(1.08)' : 'scale(1)' }}
              />
            );
          })}
        </div>

        {/* Features grid */}
        <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 700, color: '#171a20', marginBottom: '20px' }}>Key Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '12px', marginBottom: '52px' }}>
          {vehicle.features.map((f, fi) => (
            <div key={f.title} style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #eee', opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(16px)', transition: `opacity .6s ease ${fi * 0.07}s, transform .6s ease ${fi * 0.07}s` }}>
              <div style={{ width: '32px', height: '32px', background: '#f4f4f4', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#171a20" strokeWidth="2" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
              </div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#171a20', marginBottom: '5px' }}>{f.title}</div>
              <div style={{ fontSize: '12px', color: '#9a9a9a', lineHeight: 1.55 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
          <button onClick={() => navigate(`/contact?subject=order&vehicle=${slug}`)} style={{ flex: 1, minWidth: isMobile ? '100%' : undefined, padding: '17px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, background: '#171a20', color: '#fff', cursor: 'pointer', border: 'none', fontFamily: 'inherit', transition: 'background .2s, transform .15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2a2d35'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.01)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#171a20'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >Order Now — {activeTrim.price}</button>
          <button onClick={() => navigate(`/contact?subject=demo&vehicle=${slug}`)} style={{ flex: 1, minWidth: isMobile ? '100%' : undefined, padding: '17px', borderRadius: '8px', fontSize: '15px', fontWeight: 700, background: '#fff', color: '#171a20', cursor: 'pointer', border: '2px solid #e0e0e0', fontFamily: 'inherit', transition: 'background .2s, border-color .2s, transform .15s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#f4f4f4'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.01)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >Schedule a Demo Drive</button>
          <button onClick={() => navigate('/compare')} style={{ padding: '17px 28px', borderRadius: '8px', fontSize: '15px', fontWeight: 600, background: '#f4f4f4', color: '#5c5e62', cursor: 'pointer', border: '1.5px solid #e0e0e0', fontFamily: 'inherit', transition: 'background .2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#eee'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#f4f4f4'}
          >Compare</button>
        </div>

        <button onClick={() => navigate('/')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '28px', fontSize: '13px', color: '#5c5e62', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#171a20'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#5c5e62'}
        >
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="10,4 6,8 10,12"/></svg>
          Back to all vehicles
        </button>
      </div>
    </div>
  );
}
