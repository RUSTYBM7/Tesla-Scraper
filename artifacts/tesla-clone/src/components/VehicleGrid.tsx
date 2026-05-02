import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParallax } from '../hooks/use-parallax';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

interface ColorOption { name: string; hex: string; filter: string; }
interface TrimVariant { name: string; range: string; accel: string; topSpeed: string; price: string; }
interface Vehicle { label: string; subtitle: string; slug: string; img: string; imgPos: string; colors: ColorOption[]; trims: TrimVariant[]; }

const vehicles: Vehicle[] = [
  {
    label: 'Model S', subtitle: 'Sport Sedan', slug: 'model-s',
    img: `${BASE}grid-model-s.jpg`, imgPos: 'center 52%',
    colors: [
      { name: 'Pearl White', hex: '#f0f0ec', filter: 'none' },
      { name: 'Solid Black', hex: '#1a1a1a', filter: 'brightness(0.42) saturate(0.15)' },
      { name: 'Midnight Silver', hex: '#737373', filter: 'brightness(0.68) saturate(0.18)' },
      { name: 'Deep Blue', hex: '#1e3a5f', filter: 'hue-rotate(200deg) saturate(2) brightness(0.58)' },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68)' },
      { name: 'Quicksilver', hex: '#d0d0d0', filter: 'brightness(0.92) saturate(0.1)' },
    ],
    trims: [
      { name: 'Model S', range: '405 mi', accel: '3.1s', topSpeed: '149 mph', price: '$74,990' },
      { name: 'Model S Plaid', range: '396 mi', accel: '1.99s', topSpeed: '200 mph', price: '$89,990' },
    ],
  },
  {
    label: 'Model Y', subtitle: 'Midsize SUV', slug: 'model-y',
    img: `${BASE}grid-model-y.jpg`, imgPos: 'center 40%',
    colors: [
      { name: 'Pearl White', hex: '#f0f0ec', filter: 'none' },
      { name: 'Stealth Grey', hex: '#4a4a4a', filter: 'brightness(0.55) saturate(0.12)' },
      { name: 'Midnight Silver', hex: '#737373', filter: 'brightness(0.68) saturate(0.18)' },
      { name: 'Deep Blue', hex: '#1e3a5f', filter: 'hue-rotate(200deg) saturate(2) brightness(0.58)' },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68)' },
    ],
    trims: [
      { name: 'Model Y RWD', range: '320 mi', accel: '5.5s', topSpeed: '135 mph', price: '$44,990' },
      { name: 'Long Range AWD', range: '357 mi', accel: '4.8s', topSpeed: '135 mph', price: '$54,990' },
      { name: 'Performance AWD', range: '303 mi', accel: '3.5s', topSpeed: '150 mph', price: '$57,990' },
    ],
  },
  {
    label: 'Model 3', subtitle: 'Compact Sedan', slug: 'model-3',
    img: `${BASE}grid-model-3.jpg`, imgPos: 'center 48%',
    colors: [
      { name: 'Pearl White', hex: '#f0f0ec', filter: 'none' },
      { name: 'Stealth Grey', hex: '#4a4a4a', filter: 'brightness(0.55) saturate(0.12)' },
      { name: 'Midnight Silver', hex: '#737373', filter: 'brightness(0.68) saturate(0.18)' },
      { name: 'Deep Blue', hex: '#1e3a5f', filter: 'hue-rotate(200deg) saturate(2) brightness(0.58)' },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68)' },
    ],
    trims: [
      { name: 'Model 3 RWD', range: '341 mi', accel: '5.8s', topSpeed: '140 mph', price: '$40,240' },
      { name: 'Long Range AWD', range: '358 mi', accel: '4.2s', topSpeed: '145 mph', price: '$47,740' },
      { name: 'Performance AWD', range: '315 mi', accel: '2.9s', topSpeed: '162 mph', price: '$53,240' },
    ],
  },
  {
    label: 'Model X', subtitle: 'Full-Size SUV', slug: 'model-x',
    img: `${BASE}grid-model-x2.jpg`, imgPos: 'center 50%',
    colors: [
      { name: 'Pearl White', hex: '#f0f0ec', filter: 'none' },
      { name: 'Solid Black', hex: '#1a1a1a', filter: 'brightness(0.42) saturate(0.15)' },
      { name: 'Midnight Silver', hex: '#737373', filter: 'brightness(0.68) saturate(0.18)' },
      { name: 'Deep Blue', hex: '#1e3a5f', filter: 'hue-rotate(200deg) saturate(2) brightness(0.58)' },
      { name: 'Ultra Red', hex: '#c0392b', filter: 'hue-rotate(342deg) saturate(2.8) brightness(0.68)' },
      { name: 'Quicksilver', hex: '#d0d0d0', filter: 'brightness(0.92) saturate(0.1)' },
    ],
    trims: [
      { name: 'Model X', range: '335 mi', accel: '3.8s', topSpeed: '155 mph', price: '$79,990' },
      { name: 'Model X Plaid', range: '326 mi', accel: '2.5s', topSpeed: '163 mph', price: '$99,990' },
    ],
  },
  {
    label: 'Cybertruck', subtitle: 'Pickup Truck', slug: 'cybertruck',
    img: `${BASE}grid-cybertruck.jpg`, imgPos: 'center 40%',
    colors: [
      { name: 'Stainless Steel', hex: '#d4d4cc', filter: 'none' },
      { name: 'Matte Black Wrap', hex: '#1a1a1a', filter: 'brightness(0.38) saturate(0.1)' },
      { name: 'Satin Khaki Wrap', hex: '#8b7a5c', filter: 'sepia(0.45) saturate(0.75) brightness(0.68)' },
    ],
    trims: [
      { name: 'Cybertruck AWD', range: '340 mi', accel: '4.1s', topSpeed: '112 mph', price: '$79,990' },
      { name: 'Cyberbeast', range: '320 mi', accel: '2.6s', topSpeed: '130 mph', price: '$99,990' },
    ],
  },
];

function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const st = useRef({ down: false, startX: 0, scrollLeft: 0, moved: false });
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const down = (e: MouseEvent) => { st.current = { down:true, startX:e.pageX - el.offsetLeft, scrollLeft:el.scrollLeft, moved:false }; el.style.cursor='grabbing'; el.style.userSelect='none'; };
    const up = () => { st.current.down=false; el.style.cursor='grab'; el.style.userSelect=''; };
    const move = (e: MouseEvent) => { if (!st.current.down) return; e.preventDefault(); const dx=e.pageX-el.offsetLeft-st.current.startX; if (Math.abs(dx)>4) st.current.moved=true; el.scrollLeft=st.current.scrollLeft-dx*1.2; };
    el.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    el.addEventListener('mousemove', move);
    el.style.cursor='grab';
    return () => { el.removeEventListener('mousedown', down); window.removeEventListener('mouseup', up); el.removeEventListener('mousemove', move); };
  }, []);
  return { ref, wasDragging: () => st.current.moved };
}

function Card({ v, isLast, idx, isMobile }: { v: Vehicle; isLast: boolean; idx: number; isMobile: boolean }) {
  const [vis, setVis] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);
  const [trimIdx, setTrimIdx] = useState(0);
  const [hoverColor, setHoverColor] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { containerRef, bgRef } = useParallax(isMobile ? 0 : 0.24);
  const { ref: carousel, wasDragging } = useDragScroll();

  const setRef = (el: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLElement | null>).current = el;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.04 });
    obs.observe(el);
  };

  const activeFilter = (hoverColor !== null ? v.colors[hoverColor] : v.colors[colorIdx]).filter;
  const activeTrim = v.trims[trimIdx];

  // On mobile: each card is full 100vh, full width, no grid
  // On desktop: 84vh, in 2-col grid (last odd one spans full width)
  const cardHeight = isMobile ? '100vh' : (isLast ? '54vh' : '84vh');
  const minH = isMobile ? '600px' : (isLast ? '400px' : '560px');

  return (
    <div ref={setRef} style={{
      position: 'relative',
      height: cardHeight, minHeight: minH,
      overflow: 'hidden',
      gridColumn: (!isMobile && isLast) ? '1 / -1' : undefined,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity .75s ease ${idx * 0.07}s, transform .75s ease ${idx * 0.07}s`,
      background: '#111',
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div ref={bgRef} style={{ position:'absolute', top:'-20%', left:0, width:'100%', height:'140%', willChange:'transform', pointerEvents:'none' }}>
        <div style={{
          width:'100%', height:'100%',
          backgroundImage: `url(${v.img})`,
          backgroundSize:'cover', backgroundPosition: v.imgPos,
          filter: activeFilter,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1), filter 0.5s ease',
        }} />
      </div>

      <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'linear-gradient(to bottom, transparent 22%, rgba(0,0,0,.48) 58%, rgba(0,0,0,.84) 100%)' }} />

      {/* Label top */}
      <div style={{ position:'absolute', top:'22px', left:'24px', zIndex:2 }}>
        <div style={{ fontSize:'11px', fontWeight:600, color:'rgba(255,255,255,.65)', letterSpacing:'0.1em', textTransform:'uppercase' }}>{v.subtitle}</div>
        <div style={{ fontSize:'24px', fontWeight:600, color:'#fff', marginTop:'2px', letterSpacing:'-0.3px' }}>{v.label}</div>
        <div style={{ fontSize:'13px', color:'rgba(255,255,255,.55)', marginTop:'3px' }}>From {activeTrim.price}</div>
      </div>

      {/* Bottom panel */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, zIndex:3, padding:'0 0 18px' }}>
        {/* Trim carousel */}
        <div ref={carousel} style={{ display:'flex', gap:'8px', overflowX:'auto', scrollSnapType:'x mandatory', padding:'0 18px 10px', scrollbarWidth:'none', msOverflowStyle:'none', WebkitOverflowScrolling:'touch' }}>
          {v.trims.map((trim, ti) => {
            const sel = ti === trimIdx;
            return (
              <button key={trim.name} onClick={() => { if (!wasDragging()) setTrimIdx(ti); }} style={{
                flexShrink:0, scrollSnapAlign:'start', minWidth: isMobile ? '160px' : '172px',
                padding:'11px 13px', borderRadius:'8px', textAlign:'left', cursor:'pointer',
                border: sel ? '1.5px solid rgba(255,255,255,.88)' : '1.5px solid rgba(255,255,255,.2)',
                background: sel ? 'rgba(255,255,255,.14)' : 'rgba(0,0,0,.38)',
                backdropFilter:'blur(10px)', transition:'border-color .2s, background .2s',
              }}>
                <div style={{ fontSize:'11px', fontWeight:600, color:'#fff', marginBottom:'7px' }}>{trim.name}</div>
                <div style={{ display:'flex', gap:'8px', marginBottom:'7px' }}>
                  {[{v:trim.range,l:'Range'},{v:trim.accel,l:'0-60'},{v:trim.topSpeed,l:'Top Spd'}].map(s => (
                    <div key={s.l} style={{ flex:1 }}>
                      <div style={{ fontSize:'12px', fontWeight:700, color:'#fff' }}>{s.v}</div>
                      <div style={{ fontSize:'9px', color:'rgba(255,255,255,.45)', textTransform:'uppercase', letterSpacing:'0.04em', marginTop:'1px' }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize:'10px', color:'rgba(255,255,255,.45)', borderTop:'1px solid rgba(255,255,255,.1)', paddingTop:'5px' }}>Before incentives</div>
              </button>
            );
          })}
        </div>

        {/* Color swatches */}
        <div style={{ display:'flex', alignItems:'center', gap:'7px', padding:'0 18px 10px' }}>
          <span style={{ fontSize:'11px', color:'rgba(255,255,255,.42)', minWidth:'80px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {hoverColor !== null ? v.colors[hoverColor].name : v.colors[colorIdx].name}
          </span>
          {v.colors.map((col, ci) => {
            const active = ci === colorIdx;
            return (
              <button key={col.name} title={col.name}
                onClick={() => setColorIdx(ci)}
                onMouseEnter={() => setHoverColor(ci)}
                onMouseLeave={() => setHoverColor(null)}
                style={{
                  width: active ? '22px' : '16px', height: active ? '22px' : '16px',
                  borderRadius:'50%', background:col.hex, flexShrink:0, cursor:'pointer',
                  border: active ? '2.5px solid #fff' : '2px solid rgba(255,255,255,.3)',
                  outline: active ? '1.5px solid rgba(255,255,255,.45)' : 'none',
                  outlineOffset:'2px', boxShadow:'0 1px 4px rgba(0,0,0,.4)',
                  transition:'all .2s ease',
                }}
              />
            );
          })}
        </div>

        {/* CTAs */}
        <div style={{ display:'flex', gap:'10px', padding:'0 18px' }}>
          <button onClick={() => navigate(`/vehicles/${v.slug}`)} style={{
            flex:1, padding:'13px 0', borderRadius:'4px', fontSize:'13px', fontWeight:500,
            background:'rgba(23,26,32,.88)', color:'#fff', cursor:'pointer',
            backdropFilter:'blur(8px)', border:'none', transition:'background .2s, transform .15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='#171a20'; (e.currentTarget as HTMLElement).style.transform='scale(1.015)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(23,26,32,.88)'; (e.currentTarget as HTMLElement).style.transform='scale(1)'; }}
          >Order Now</button>
          <button onClick={() => navigate(`/vehicles/${v.slug}`)} style={{
            flex:1, padding:'13px 0', borderRadius:'4px', fontSize:'13px', fontWeight:500,
            background:'rgba(255,255,255,.72)', color:'#171a20', cursor:'pointer',
            backdropFilter:'blur(8px)', border:'none', transition:'background .2s, transform .15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,.93)'; (e.currentTarget as HTMLElement).style.transform='scale(1.015)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,.72)'; (e.currentTarget as HTMLElement).style.transform='scale(1)'; }}
          >Learn More</button>
        </div>
      </div>
    </div>
  );
}

export default function VehicleGrid() {
  const isMobile = useIsMobile();
  return (
    <section style={{
      display: isMobile ? 'flex' : 'grid',
      flexDirection: isMobile ? 'column' : undefined,
      gridTemplateColumns: isMobile ? undefined : '1fr 1fr',
      gap: '4px', background: '#e0e0e0',
    }}>
      {vehicles.map((v, i) => (
        <Card key={v.label} v={v}
          isLast={i === vehicles.length - 1 && vehicles.length % 2 !== 0}
          idx={i} isMobile={isMobile} />
      ))}
    </section>
  );
}
