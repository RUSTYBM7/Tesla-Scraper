import { useEffect, useRef, useState } from 'react';
import { useParallax } from '../hooks/use-parallax';

const BASE = import.meta.env.BASE_URL;

interface ColorOption {
  name: string;
  hex: string;
  filter: string;
}

interface TrimVariant {
  name: string;
  range: string;
  accel: string;
  topSpeed: string;
  price: string;
  priceNote: string;
}

interface Vehicle {
  label: string;
  subtitle: string;
  img: string;
  imgPos: string;
  colors: ColorOption[];
  trims: TrimVariant[];
}

const vehicles: Vehicle[] = [
  {
    label: 'Model S',
    subtitle: 'Sport Sedan',
    img: `${BASE}grid-model-s.jpg`,
    imgPos: 'center center',
    colors: [
      { name: 'Pearl White', hex: '#f5f5f0', filter: 'none' },
      { name: 'Solid Black', hex: '#1a1a1a', filter: 'brightness(0.42) saturate(0.2)' },
      { name: 'Midnight Silver', hex: '#808080', filter: 'brightness(0.72) saturate(0.22)' },
      { name: 'Deep Blue', hex: '#1a3a6b', filter: 'hue-rotate(198deg) saturate(1.9) brightness(0.6)' },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68) sepia(0.2)' },
      { name: 'Quicksilver', hex: '#c8c8c8', filter: 'brightness(0.9) saturate(0.12)' },
    ],
    trims: [
      { name: 'Model S', range: '405 mi', accel: '3.1s', topSpeed: '149 mph', price: '$74,990', priceNote: 'Before incentives' },
      { name: 'Model S Plaid', range: '396 mi', accel: '1.99s', topSpeed: '200 mph', price: '$89,990', priceNote: 'Before incentives' },
    ],
  },
  {
    label: 'Model Y',
    subtitle: 'Midsize SUV',
    img: `${BASE}grid-model-y.jpg`,
    imgPos: 'center 55%',
    colors: [
      { name: 'Pearl White', hex: '#f5f5f0', filter: 'none' },
      { name: 'Stealth Grey', hex: '#5a5a5a', filter: 'brightness(0.6) saturate(0.18)' },
      { name: 'Midnight Silver', hex: '#808080', filter: 'brightness(0.72) saturate(0.22)' },
      { name: 'Deep Blue', hex: '#1a3a6b', filter: 'hue-rotate(198deg) saturate(1.9) brightness(0.6)' },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68) sepia(0.2)' },
    ],
    trims: [
      { name: 'Model Y RWD', range: '320 mi', accel: '5.5s', topSpeed: '135 mph', price: '$44,990', priceNote: 'Before incentives' },
      { name: 'Long Range AWD', range: '357 mi', accel: '4.8s', topSpeed: '135 mph', price: '$54,990', priceNote: 'Before incentives' },
      { name: 'Performance AWD', range: '303 mi', accel: '3.5s', topSpeed: '150 mph', price: '$57,990', priceNote: 'Before incentives' },
    ],
  },
  {
    label: 'Model 3',
    subtitle: 'Compact Sedan',
    img: `${BASE}grid-model-3.jpg`,
    imgPos: 'center center',
    colors: [
      { name: 'Pearl White', hex: '#f5f5f0', filter: 'none' },
      { name: 'Stealth Grey', hex: '#5a5a5a', filter: 'brightness(0.6) saturate(0.18)' },
      { name: 'Midnight Silver', hex: '#808080', filter: 'brightness(0.72) saturate(0.22)' },
      { name: 'Deep Blue', hex: '#1a3a6b', filter: 'hue-rotate(198deg) saturate(1.9) brightness(0.6)' },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68) sepia(0.2)' },
    ],
    trims: [
      { name: 'Model 3 RWD', range: '341 mi', accel: '5.8s', topSpeed: '140 mph', price: '$40,240', priceNote: 'Before incentives' },
      { name: 'Long Range AWD', range: '358 mi', accel: '4.2s', topSpeed: '145 mph', price: '$47,740', priceNote: 'Before incentives' },
      { name: 'Performance AWD', range: '315 mi', accel: '2.9s', topSpeed: '162 mph', price: '$53,240', priceNote: 'Before incentives' },
    ],
  },
  {
    label: 'Model X',
    subtitle: 'Full-Size SUV',
    img: `${BASE}grid-model-x.jpg`,
    imgPos: 'center center',
    colors: [
      { name: 'Pearl White', hex: '#f5f5f0', filter: 'none' },
      { name: 'Solid Black', hex: '#1a1a1a', filter: 'brightness(0.42) saturate(0.2)' },
      { name: 'Midnight Silver', hex: '#808080', filter: 'brightness(0.72) saturate(0.22)' },
      { name: 'Deep Blue', hex: '#1a3a6b', filter: 'hue-rotate(198deg) saturate(1.9) brightness(0.6)' },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68) sepia(0.2)' },
      { name: 'Quicksilver', hex: '#c8c8c8', filter: 'brightness(0.9) saturate(0.12)' },
    ],
    trims: [
      { name: 'Model X', range: '335 mi', accel: '3.8s', topSpeed: '155 mph', price: '$79,990', priceNote: 'Before incentives' },
      { name: 'Model X Plaid', range: '326 mi', accel: '2.5s', topSpeed: '163 mph', price: '$99,990', priceNote: 'Before incentives' },
    ],
  },
  {
    label: 'Cybertruck',
    subtitle: 'Pickup Truck',
    img: `${BASE}grid-cybertruck.jpg`,
    imgPos: 'center center',
    colors: [
      { name: 'Stainless Steel', hex: '#d4d4cc', filter: 'none' },
      { name: 'Matte Black Wrap', hex: '#1a1a1a', filter: 'brightness(0.38) saturate(0.15)' },
      { name: 'Satin Khaki Wrap', hex: '#8b7355', filter: 'sepia(0.5) saturate(0.8) brightness(0.7)' },
    ],
    trims: [
      { name: 'Cybertruck AWD', range: '340 mi', accel: '4.1s', topSpeed: '112 mph', price: '$79,990', priceNote: 'Before incentives' },
      { name: 'Cyberbeast', range: '320 mi', accel: '2.6s', topSpeed: '130 mph', price: '$99,990', priceNote: 'Before incentives' },
    ],
  },
];

/* ─── Drag-to-scroll hook ─────────────────────────────────────── */
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ down: false, startX: 0, scrollLeft: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onDown = (e: MouseEvent) => {
      state.current = { down: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
      el.style.cursor = 'grabbing';
    };
    const onUp = () => { state.current.down = false; el.style.cursor = 'grab'; };
    const onMove = (e: MouseEvent) => {
      if (!state.current.down) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      el.scrollLeft = state.current.scrollLeft - (x - state.current.startX) * 1.2;
    };
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    el.addEventListener('mousemove', onMove);
    el.style.cursor = 'grab';
    return () => {
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      el.removeEventListener('mousemove', onMove);
    };
  }, []);

  return ref;
}

/* ─── Vehicle Card ──────────────────────────────────────────────── */
function Card({ v, isLast, idx }: { v: Vehicle; isLast: boolean; idx: number }) {
  const [vis, setVis] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);
  const [trimIdx, setTrimIdx] = useState(0);
  const [hoveredColor, setHoveredColor] = useState<number | null>(null);
  const { containerRef, bgRef } = useParallax(0.26);
  const carouselRef = useDragScroll();

  const setRef = (el: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLElement | null>).current = el;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.08 });
    obs.observe(el);
  };

  const activeColor = v.colors[hoveredColor ?? colorIdx];
  const activeTrim = v.trims[trimIdx];

  return (
    <div ref={setRef} style={{
      position: 'relative',
      height: isLast ? '56vh' : '82vh',
      minHeight: isLast ? '420px' : '560px',
      overflow: 'hidden',
      gridColumn: isLast ? '1 / -1' : undefined,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity .7s ease ${idx * 0.08}s, transform .7s ease ${idx * 0.08}s`,
      background: '#1a1a1a',
    }}>

      {/* ── Parallax background ── */}
      <div ref={bgRef} style={{
        position: 'absolute',
        top: '-20%', left: 0, width: '100%', height: '140%',
        backgroundImage: `url(${v.img})`,
        backgroundSize: 'cover',
        backgroundPosition: v.imgPos,
        willChange: 'transform',
        filter: activeColor.filter,
        transition: 'filter 0.55s ease, transform 0.55s cubic-bezier(0.4,0,0.2,1)',
      }} />

      {/* Bottom gradient — taller to cover carousel area */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, transparent 28%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.82) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Label top-left ── */}
      <div style={{ position: 'absolute', top: '24px', left: '28px', zIndex: 2 }}>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.68)', letterSpacing: '0.09em', textTransform: 'uppercase' }}>{v.subtitle}</div>
        <div style={{ fontSize: '24px', fontWeight: 600, color: '#fff', marginTop: '2px', letterSpacing: '-0.3px' }}>{v.label}</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginTop: '4px' }}>{activeTrim.price}</div>
      </div>

      {/* ── Bottom panel ── */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, padding: '0 0 20px' }}>

        {/* Trim carousel */}
        <div ref={carouselRef} style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '0 20px 12px',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          userSelect: 'none',
          WebkitOverflowScrolling: 'touch',
        }}>
          {v.trims.map((trim, ti) => {
            const selected = ti === trimIdx;
            return (
              <button
                key={trim.name}
                onClick={() => setTrimIdx(ti)}
                style={{
                  flexShrink: 0,
                  scrollSnapAlign: 'start',
                  minWidth: '168px',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  border: selected ? '1.5px solid rgba(255,255,255,0.9)' : '1.5px solid rgba(255,255,255,0.22)',
                  background: selected ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.35)',
                  backdropFilter: 'blur(10px)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.55)'; }}
                onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)'; }}
              >
                {/* Trim name */}
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#fff', marginBottom: '8px', lineHeight: 1.2 }}>{trim.name}</div>
                {/* Stats row */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                  {[
                    { val: trim.range, lbl: 'Range' },
                    { val: trim.accel, lbl: '0-60 mph' },
                    { val: trim.topSpeed, lbl: 'Top Speed' },
                  ].map(s => (
                    <div key={s.lbl} style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.val}</div>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>
                {/* Price */}
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '6px' }}>{trim.priceNote}</div>
              </button>
            );
          })}
        </div>

        {/* Color swatches */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 20px 12px' }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginRight: '4px' }}>
            {hoveredColor !== null ? v.colors[hoveredColor].name : v.colors[colorIdx].name}
          </span>
          {v.colors.map((col, ci) => {
            const active = ci === colorIdx;
            return (
              <button
                key={col.name}
                title={col.name}
                onClick={() => setColorIdx(ci)}
                onMouseEnter={() => setHoveredColor(ci)}
                onMouseLeave={() => setHoveredColor(null)}
                style={{
                  width: active ? '22px' : '16px',
                  height: active ? '22px' : '16px',
                  borderRadius: '50%',
                  background: col.hex,
                  border: active ? '2.5px solid #fff' : '2px solid rgba(255,255,255,0.35)',
                  outline: active ? '1.5px solid rgba(255,255,255,0.5)' : 'none',
                  outlineOffset: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
                }}
              />
            );
          })}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: '10px', padding: '0 20px' }}>
          <button style={{
            flex: 1, padding: '11px 0', borderRadius: '4px', fontSize: '13px', fontWeight: 500,
            background: 'rgba(23,26,32,0.88)', color: '#fff', cursor: 'pointer',
            backdropFilter: 'blur(8px)', border: 'none', transition: 'background .2s, transform .15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#171a20'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.015)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(23,26,32,0.88)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >Order Now</button>
          <button style={{
            flex: 1, padding: '11px 0', borderRadius: '4px', fontSize: '13px', fontWeight: 500,
            background: 'rgba(255,255,255,0.72)', color: '#171a20', cursor: 'pointer',
            backdropFilter: 'blur(8px)', border: 'none', transition: 'background .2s, transform .15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.93)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.015)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.72)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >Learn More</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Grid ──────────────────────────────────────────────────────── */
export default function VehicleGrid() {
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', background: '#e8e8e8' }}>
      {vehicles.map((v, i) => (
        <Card
          key={v.label}
          v={v}
          isLast={i === vehicles.length - 1 && vehicles.length % 2 !== 0}
          idx={i}
        />
      ))}
    </section>
  );
}
