import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useParallax } from '../hooks/use-parallax';

const BASE = import.meta.env.BASE_URL;

interface ColorOption { name: string; hex: string; filter: string; }
interface TrimVariant { name: string; range: string; accel: string; topSpeed: string; price: string; awd?: boolean; }

interface VehicleData {
  label: string;
  tagline: string;
  heroImg: string;
  heroPos: string;
  light: boolean;
  colors: ColorOption[];
  trims: TrimVariant[];
  specs: { label: string; value: string; unit: string }[];
}

const VEHICLES: Record<string, VehicleData> = {
  'model-s': {
    label: 'Model S',
    tagline: 'Relentless Performance',
    heroImg: `${BASE}hero-model-3.jpg`,
    heroPos: 'center 50%',
    light: true,
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
      { label: '0–60 mph', value: '3.1', unit: 's' },
      { label: 'Top Speed', value: '149', unit: 'mph' },
    ],
  },
  'model-3': {
    label: 'Model 3',
    tagline: 'Order. Drive. Enjoy.',
    heroImg: `${BASE}hero-model-3.jpg`,
    heroPos: 'center 50%',
    light: false,
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
      { label: '0–60 mph', value: '4.2', unit: 's' },
      { label: 'Top Speed', value: '145', unit: 'mph' },
    ],
  },
  'model-y': {
    label: 'Model Y',
    tagline: "America's Best-Selling Vehicle",
    heroImg: `${BASE}hero-model-y.jpg`,
    heroPos: 'center 45%',
    light: false,
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
      { label: '0–60 mph', value: '3.5', unit: 's' },
      { label: 'Cargo', value: '76', unit: 'cu ft' },
    ],
  },
  'model-x': {
    label: 'Model X',
    tagline: 'Beyond Ludicrous',
    heroImg: `${BASE}model-x-candidate2.jpg`,
    heroPos: 'center 50%',
    light: true,
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
      { label: '0–60 mph', value: '2.5', unit: 's' },
      { label: 'Top Speed', value: '163', unit: 'mph' },
    ],
  },
  'cybertruck': {
    label: 'Cybertruck',
    tagline: 'Built for Any Planet',
    heroImg: `${BASE}hero-highway.jpg`,
    heroPos: 'center 55%',
    light: true,
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
      { label: '0–60 mph', value: '2.6', unit: 's' },
      { label: 'Towing', value: '11,000', unit: 'lbs' },
    ],
  },
};

function HeroParallax({ img, pos, filter, light, label, tagline }: {
  img: string; pos: string; filter: string; light: boolean; label: string; tagline: string;
}) {
  const { containerRef, bgRef } = useParallax(0.35);
  return (
    <section ref={containerRef as React.RefObject<HTMLElement>} style={{
      position: 'relative', height: '100vh', overflow: 'hidden', background: '#0d1b2e',
    }}>
      <div ref={bgRef} style={{ position: 'absolute', top: '-20%', left: 0, width: '100%', height: '140%', willChange: 'transform' }}>
        <div style={{
          width: '100%', height: '100%',
          backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: pos,
          filter,
          transition: 'filter 0.6s ease',
        }} />
      </div>
      <div style={{
        position: 'absolute', inset: 0,
        background: light
          ? 'linear-gradient(180deg,rgba(0,0,0,.32) 0%,rgba(0,0,0,.08) 50%,rgba(0,0,0,.55) 100%)'
          : 'linear-gradient(180deg,rgba(0,0,0,.12) 0%,transparent 40%,rgba(0,0,0,.3) 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{ position: 'absolute', top: '18%', left: 0, right: 0, textAlign: 'center', zIndex: 2 }}>
        <p style={{ fontSize: '13px', fontWeight: 500, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: '10px' }}>
          {tagline}
        </p>
        <h1 style={{
          fontSize: 'clamp(48px, 7vw, 96px)', fontWeight: 600, color: '#fff',
          letterSpacing: '-2px', lineHeight: 1, textShadow: '0 2px 12px rgba(0,0,0,.3)',
        }}>{label}</h1>
      </div>
    </section>
  );
}

export default function VehiclePage() {
  const { slug } = useParams<{ slug: string }>();
  const vehicle = slug ? VEHICLES[slug] : null;

  const [colorIdx, setColorIdx] = useState(0);
  const [trimIdx, setTrimIdx] = useState(0);
  const [hoveredColor, setHoveredColor] = useState<number | null>(null);
  const [vis, setVis] = useState(false);
  const specRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColorIdx(0); setTrimIdx(0); setVis(false);
    const t = setTimeout(() => setVis(true), 100);
    return () => clearTimeout(t);
  }, [slug]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (specRef.current) obs.observe(specRef.current);
    return () => obs.disconnect();
  }, []);

  if (!vehicle) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 600, marginBottom: '16px' }}>Vehicle not found</h1>
        <Link to="/" style={{ color: '#3e6ae1', textDecoration: 'none' }}>← Back to Home</Link>
      </div>
    );
  }

  const activeColor = vehicle.colors[hoveredColor ?? colorIdx];
  const activeTrim = vehicle.trims[trimIdx];

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif', background: '#f8f8f8' }}>
      {/* Hero with parallax */}
      <HeroParallax
        img={vehicle.heroImg}
        pos={vehicle.heroPos}
        filter={activeColor.filter}
        light={vehicle.light}
        label={vehicle.label}
        tagline={vehicle.tagline}
      />

      {/* Configurator panel */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 24px 64px' }}>

        {/* Specs bar */}
        <div ref={specRef} style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px',
          background: '#e0e0e0', borderRadius: '12px', overflow: 'hidden', marginBottom: '48px',
          opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity .7s ease, transform .7s ease',
        }}>
          {vehicle.specs.map(s => (
            <div key={s.label} style={{ background: '#fff', padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#171a20', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: '#5c5e62', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.unit}</div>
              <div style={{ fontSize: '12px', color: '#9a9a9a', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Trim selector */}
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#171a20', marginBottom: '16px' }}>Choose Your Model</h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {vehicle.trims.map((trim, ti) => {
            const sel = ti === trimIdx;
            return (
              <button key={trim.name} onClick={() => setTrimIdx(ti)} style={{
                flex: '1', minWidth: '200px', padding: '20px', borderRadius: '10px', textAlign: 'left',
                border: sel ? '2px solid #171a20' : '2px solid #e0e0e0',
                background: sel ? '#f5f5f5' : '#fff', cursor: 'pointer',
                transition: 'border-color .2s, box-shadow .2s',
                boxShadow: sel ? '0 2px 8px rgba(0,0,0,.08)' : 'none',
              }}>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#171a20', marginBottom: '12px' }}>{trim.name}</div>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  {[{v: trim.range, l: 'Range'}, {v: trim.accel, l: '0-60'}, {v: trim.topSpeed, l: 'Top Spd'}].map(s => (
                    <div key={s.l}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#171a20' }}>{s.v}</div>
                      <div style={{ fontSize: '10px', color: '#9a9a9a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '13px', color: '#5c5e62' }}>{trim.price} <span style={{ fontSize: '11px', color: '#9a9a9a' }}>before incentives</span></div>
                {trim.awd && <div style={{ marginTop: '8px', display: 'inline-block', fontSize: '10px', fontWeight: 600, letterSpacing: '0.06em', color: '#fff', background: '#171a20', padding: '2px 8px', borderRadius: '3px' }}>AWD</div>}
              </button>
            );
          })}
        </div>

        {/* Color selector */}
        <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#171a20', marginBottom: '8px' }}>Exterior Color</h2>
        <p style={{ fontSize: '14px', color: '#5c5e62', marginBottom: '16px' }}>{activeColor.name}</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '48px' }}>
          {vehicle.colors.map((col, ci) => {
            const active = ci === colorIdx;
            return (
              <button key={col.name} title={col.name}
                onClick={() => setColorIdx(ci)}
                onMouseEnter={() => setHoveredColor(ci)}
                onMouseLeave={() => setHoveredColor(null)}
                style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: col.hex,
                  border: active ? '3px solid #171a20' : '3px solid transparent',
                  outline: active ? '2px solid rgba(23,26,32,0.2)' : '2px solid #e0e0e0',
                  outlineOffset: '2px',
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                  transform: active ? 'scale(1.12)' : hoveredColor === ci ? 'scale(1.06)' : 'scale(1)',
                }}
              />
            );
          })}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            flex: 1, padding: '16px', borderRadius: '6px', fontSize: '15px', fontWeight: 500,
            background: '#171a20', color: '#fff', cursor: 'pointer', border: 'none',
            transition: 'background .2s, transform .15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2a2d35'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.01)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#171a20'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >Order Now — {activeTrim.price}</button>
          <button style={{
            flex: 1, padding: '16px', borderRadius: '6px', fontSize: '15px', fontWeight: 500,
            background: '#f4f4f4', color: '#171a20', cursor: 'pointer', border: '1.5px solid #e0e0e0',
            transition: 'background .2s, transform .15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#eaeaea'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.01)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#f4f4f4'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >Schedule a Demo Drive</button>
        </div>

        <Link to="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '32px',
          fontSize: '13px', color: '#5c5e62', textDecoration: 'none',
          transition: 'color .15s',
        }}>
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="10,4 6,8 10,12"/></svg>
          Back to all vehicles
        </Link>
      </div>
    </div>
  );
}
