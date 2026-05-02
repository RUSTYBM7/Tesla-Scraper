import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

interface Slide {
  id: string; title: string; subtitle: string;
  btnPrimary: string; btnSecondary: string;
  btnPrimaryStyle: 'blue' | 'dark';
  btnPrimaryRoute: string; btnSecondaryRoute: string;
  img: string; imgPos?: string; textLight: boolean;
}

const slides: Slide[] = [
  {
    id: 'model-y',
    title: 'Model Y',
    subtitle: "Starting at $44,990 · America's Best-Selling Vehicle",
    btnPrimary: 'Order Now', btnSecondary: 'Learn More',
    btnPrimaryStyle: 'dark',
    btnPrimaryRoute: '/vehicles/model-y', btnSecondaryRoute: '/vehicles/model-y',
    img: `${BASE}hero-model-y.jpg`, imgPos: 'center 50%',
    textLight: false,
  },
  {
    id: 'model-3',
    title: 'Model 3',
    subtitle: 'Starting at $40,240 · Redesigned Inside and Out',
    btnPrimary: 'Order Now', btnSecondary: 'Learn More',
    btnPrimaryStyle: 'dark',
    btnPrimaryRoute: '/vehicles/model-3', btnSecondaryRoute: '/vehicles/model-3',
    img: `${BASE}hero-model-3.jpg`, imgPos: 'center 50%',
    textLight: false,
  },
  {
    id: 'model-x',
    title: 'Model X',
    subtitle: 'Beyond Ludicrous · From $79,990',
    btnPrimary: 'Order Now', btnSecondary: 'Learn More',
    btnPrimaryStyle: 'dark',
    btnPrimaryRoute: '/vehicles/model-x', btnSecondaryRoute: '/vehicles/model-x',
    img: `${BASE}model-x-candidate2.jpg`, imgPos: 'center 50%',
    textLight: true,
  },
  {
    id: 'fsd',
    title: 'Full Self-Driving',
    subtitle: 'Navigate city streets and highways — $99/mo',
    btnPrimary: 'Try FSD', btnSecondary: 'Learn More',
    btnPrimaryStyle: 'blue',
    btnPrimaryRoute: '/vehicles/model-3', btnSecondaryRoute: '/vehicles/model-3',
    img: `${BASE}fsd-highway.jpg`, imgPos: 'center 40%',
    textLight: true,
  },
  {
    id: 'cybertruck',
    title: 'Cybertruck',
    subtitle: 'Built for Any Planet · From $79,990',
    btnPrimary: 'Order Now', btnSecondary: 'Learn More',
    btnPrimaryStyle: 'dark',
    btnPrimaryRoute: '/vehicles/cybertruck', btnSecondaryRoute: '/vehicles/cybertruck',
    img: `${BASE}grid-cybertruck.jpg`, imgPos: 'center 40%',
    textLight: true,
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [fade, setFade] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bgGroupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let raf: number | null = null;
    const update = () => {
      raf = null;
      if (bgGroupRef.current) bgGroupRef.current.style.transform = `translateY(${(window.scrollY * 0.38).toFixed(2)}px)`;
    };
    const onScroll = () => { if (raf === null) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setFade(false);
    setTimeout(() => { setCurrent(idx); setFade(true); }, 300);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => { setCurrent(p => (p + 1) % slides.length); setFade(true); }, 300);
    }, 7000);
  };

  useEffect(() => {
    if (playing) startTimer(); else if (timerRef.current) clearInterval(timerRef.current);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing]);

  const prev = () => { goTo((current - 1 + slides.length) % slides.length); if (playing) startTimer(); };
  const next = () => { goTo((current + 1) % slides.length); if (playing) startTimer(); };

  const slide = slides[current];
  const tc = slide.textLight ? '#fff' : '#171a20';
  const sc = slide.textLight ? 'rgba(255,255,255,.85)' : '#5c5e62';

  return (
    <section style={{ position:'relative', width:'100%', height:'100vh', overflow:'hidden', background:'#0a0a0a' }}>
      {/* Parallax bg group */}
      <div ref={bgGroupRef} style={{ position:'absolute', top:'-15%', left:0, width:'100%', height:'130%', willChange:'transform', pointerEvents:'none' }}>
        {slides.map((s, i) => (
          <div key={s.id} style={{
            position:'absolute', inset:0,
            backgroundImage: `url(${s.img})`,
            backgroundSize:'cover', backgroundPosition: s.imgPos || 'center',
            opacity: i === current ? (fade ? 1 : 0) : 0,
            transition:'opacity 0.7s cubic-bezier(0.4,0,0.2,1)',
          }} />
        ))}
      </div>

      {/* Scrim */}
      <div style={{
        position:'absolute', inset:0, zIndex:1, pointerEvents:'none',
        background: slide.textLight
          ? 'linear-gradient(180deg,rgba(0,0,0,.3) 0%,rgba(0,0,0,.04) 42%,rgba(0,0,0,.25) 100%)'
          : 'linear-gradient(180deg,rgba(255,255,255,.15) 0%,transparent 38%)',
        transition:'background .6s',
      }} />

      {/* Headline */}
      <div style={{
        position:'absolute', top:'13%', left:0, right:0, textAlign:'center', zIndex:2, padding:'0 20px',
        opacity: fade ? 1 : 0, transform: fade ? 'translateY(0)' : 'translateY(12px)',
        transition:'opacity .5s ease .08s, transform .5s ease .08s',
      }}>
        <h1 style={{
          fontSize:'clamp(28px, 4vw, 56px)', fontWeight:600, color:tc,
          letterSpacing:'-0.5px', lineHeight:1.12, marginBottom:'12px',
          textShadow: slide.textLight ? '0 1px 8px rgba(0,0,0,.4)' : 'none',
        }}>{slide.title}</h1>
        <p style={{
          fontSize:'clamp(13px, 1.5vw, 16px)', color:sc, marginBottom:'28px',
          textShadow: slide.textLight ? '0 1px 4px rgba(0,0,0,.3)' : 'none',
        }}>{slide.subtitle}</p>
        <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
          <button onClick={() => navigate(slide.btnPrimaryRoute)} style={{
            padding:'13px 44px', borderRadius:'4px', fontSize:'14px', fontWeight:500,
            background: slide.btnPrimaryStyle === 'blue' ? '#3e6ae1' : 'rgba(23,26,32,.84)',
            color:'#fff', minWidth:'200px',
            backdropFilter:'blur(6px)', border:'none', cursor:'pointer',
            transition:'background .2s, transform .15s',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = slide.btnPrimaryStyle === 'blue' ? '#2d58cc' : '#171a20'; el.style.transform='scale(1.025)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = slide.btnPrimaryStyle === 'blue' ? '#3e6ae1' : 'rgba(23,26,32,.84)'; el.style.transform='scale(1)'; }}
          >{slide.btnPrimary}</button>
          <button onClick={() => navigate(slide.btnSecondaryRoute)} style={{
            padding:'13px 44px', borderRadius:'4px', fontSize:'14px', fontWeight:500,
            background:'rgba(255,255,255,.72)', color:'#171a20', minWidth:'200px',
            backdropFilter:'blur(6px)', border:'none', cursor:'pointer',
            transition:'background .2s, transform .15s',
          }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background='rgba(255,255,255,.95)'; el.style.transform='scale(1.025)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background='rgba(255,255,255,.72)'; el.style.transform='scale(1)'; }}
          >{slide.btnSecondary}</button>
        </div>
      </div>

      {/* Prev */}
      <button onClick={prev} aria-label="Previous" style={{
        position:'absolute', top:'50%', left:'16px', transform:'translateY(-50%)', zIndex:3,
        width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
        background:'rgba(255,255,255,.15)', backdropFilter:'blur(6px)',
        border:'1px solid rgba(255,255,255,.3)', cursor:'pointer', transition:'background .2s',
      }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,.3)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,.15)'}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
      </button>

      {/* Next */}
      <button onClick={next} aria-label="Next" style={{
        position:'absolute', top:'50%', right:'16px', transform:'translateY(-50%)', zIndex:3,
        width:'40px', height:'40px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
        background:'rgba(255,255,255,.15)', backdropFilter:'blur(6px)',
        border:'1px solid rgba(255,255,255,.3)', cursor:'pointer', transition:'background .2s',
      }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,.3)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,.15)'}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="9,6 15,12 9,18"/></svg>
      </button>

      {/* Bottom controls */}
      <div style={{ position:'absolute', bottom:'28px', left:0, right:0, display:'flex', alignItems:'center', justifyContent:'center', gap:'12px', zIndex:3 }}>
        <button onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause' : 'Play'} style={{
          width:'30px', height:'30px', borderRadius:'50%',
          background:'rgba(255,255,255,.15)', backdropFilter:'blur(6px)',
          border:'1px solid rgba(255,255,255,.3)', display:'flex', alignItems:'center', justifyContent:'center',
          cursor:'pointer',
        }}>
          {playing
            ? <svg viewBox="0 0 24 24" width="11" height="11" fill="#fff"><rect x="5" y="4" width="4" height="16" rx="1"/><rect x="15" y="4" width="4" height="16" rx="1"/></svg>
            : <svg viewBox="0 0 24 24" width="11" height="11" fill="#fff"><polygon points="6,4 20,12 6,20"/></svg>}
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => { goTo(i); if (playing) startTimer(); }} style={{
            width: i === current ? '28px' : '8px', height:'8px', borderRadius:'4px', padding:0, border:'none',
            background: i === current ? '#fff' : 'rgba(255,255,255,.45)',
            transition:'all .35s cubic-bezier(0.4,0,0.2,1)', cursor:'pointer',
          }} />
        ))}
      </div>
    </section>
  );
}
