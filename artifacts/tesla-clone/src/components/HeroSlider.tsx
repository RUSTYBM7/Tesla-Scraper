import { useState, useEffect, useRef } from 'react';

const BASE = import.meta.env.BASE_URL;

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  btnPrimary: string;
  btnSecondary: string;
  btnPrimaryStyle: 'blue' | 'dark';
  img: string;
  imgPos?: string;
  textLight: boolean;
}

const slides: Slide[] = [
  {
    id: 'fsd',
    title: 'Full Self-Driving (Supervised)',
    subtitle: 'Available for $99/mo',
    btnPrimary: 'Demo FSD (Supervised)',
    btnSecondary: 'Learn More',
    btnPrimaryStyle: 'blue',
    img: `${BASE}hero-highway.jpg`,
    imgPos: 'center 40%',
    textLight: true,
  },
  {
    id: 'model-y',
    title: 'Model Y',
    subtitle: 'Starting at $42,490',
    btnPrimary: 'Order Now',
    btnSecondary: 'Learn More',
    btnPrimaryStyle: 'dark',
    img: `${BASE}slide-car2.jpg`,
    imgPos: 'center center',
    textLight: false,
  },
  {
    id: 'model-3',
    title: 'Model 3',
    subtitle: 'Starting at $38,990',
    btnPrimary: 'Order Now',
    btnSecondary: 'Learn More',
    btnPrimaryStyle: 'dark',
    img: `${BASE}slide-car1.jpg`,
    imgPos: 'center center',
    textLight: false,
  },
  {
    id: 'cybertruck',
    title: 'Cybertruck',
    subtitle: 'Built for Any Planet',
    btnPrimary: 'Order Now',
    btnSecondary: 'Learn More',
    btnPrimaryStyle: 'dark',
    img: `${BASE}slide-mountain.jpg`,
    imgPos: 'center 60%',
    textLight: true,
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [fade, setFade] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => {
    if (idx === current) return;
    setFade(false);
    setTimeout(() => { setCurrent(idx); setFade(true); }, 320);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => { setCurrent((p) => { setFade(true); return (p + 1) % slides.length; }); }, 320);
    }, 7000);
  };

  useEffect(() => {
    if (playing) startTimer();
    else if (timerRef.current) clearInterval(timerRef.current);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing]);

  const prev = () => { goTo((current - 1 + slides.length) % slides.length); if (playing) startTimer(); };
  const next = () => { goTo((current + 1) % slides.length); if (playing) startTimer(); };

  const slide = slides[current];
  const tc = slide.textLight ? '#fff' : '#171a20';
  const sc = slide.textLight ? 'rgba(255,255,255,0.88)' : '#5c5e62';

  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#0d1b2e' }}>
      {/* Stacked crossfade backgrounds */}
      {slides.map((s, i) => (
        <div key={s.id} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${s.img})`,
          backgroundSize: 'cover',
          backgroundPosition: s.imgPos || 'center center',
          opacity: i === current ? (fade ? 1 : 0) : 0,
          transition: 'opacity 0.65s cubic-bezier(0.4,0,0.2,1)',
        }} />
      ))}

      {/* Scrim */}
      <div style={{
        position: 'absolute', inset: 0,
        background: slide.textLight
          ? 'linear-gradient(180deg,rgba(0,0,0,.28) 0%,rgba(0,0,0,.04) 45%,rgba(0,0,0,.18) 100%)'
          : 'linear-gradient(180deg,rgba(255,255,255,.18) 0%,transparent 40%)',
        transition: 'background 0.6s ease',
      }} />

      {/* Headline + CTA — top-anchored like Tesla */}
      <div style={{
        position: 'absolute',
        top: '13%',
        left: 0, right: 0,
        textAlign: 'center',
        zIndex: 2,
        padding: '0 20px',
        opacity: fade ? 1 : 0,
        transform: fade ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s',
      }}>
        <h1 style={{
          fontSize: 'clamp(22px, 3.2vw, 48px)',
          fontWeight: 600,
          color: tc,
          letterSpacing: '-0.2px',
          lineHeight: 1.18,
          marginBottom: '8px',
          textShadow: slide.textLight ? '0 1px 6px rgba(0,0,0,.35)' : 'none',
        }}>{slide.title}</h1>
        <p style={{
          fontSize: '16px', color: sc, marginBottom: '24px', fontWeight: 400,
          textShadow: slide.textLight ? '0 1px 4px rgba(0,0,0,.3)' : 'none',
        }}>{slide.subtitle}</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Primary */}
          <a href="#" style={{
            padding: '11px 38px', borderRadius: '4px', fontSize: '14px', fontWeight: 500,
            background: slide.btnPrimaryStyle === 'blue' ? '#3e6ae1' : 'rgba(23,26,32,0.82)',
            color: '#fff', minWidth: '196px', textAlign: 'center',
            backdropFilter: 'blur(6px)', transition: 'background .2s, transform .15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = slide.btnPrimaryStyle === 'blue' ? '#2d58cc' : 'rgba(23,26,32,1)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.025)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = slide.btnPrimaryStyle === 'blue' ? '#3e6ae1' : 'rgba(23,26,32,0.82)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >{slide.btnPrimary}</a>
          {/* Secondary */}
          <a href="#" style={{
            padding: '11px 38px', borderRadius: '4px', fontSize: '14px', fontWeight: 500,
            background: 'rgba(255,255,255,0.70)', color: '#171a20', minWidth: '196px', textAlign: 'center',
            backdropFilter: 'blur(6px)', transition: 'background .2s, transform .15s',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.93)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1.025)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.70)'; (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >{slide.btnSecondary}</a>
        </div>
      </div>

      {/* Left arrow */}
      <button onClick={prev} aria-label="Previous" style={{
        position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)',
        zIndex: 3, width: '40px', height: '40px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.32)', transition: 'background .2s',
      }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.32)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.16)'}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="15,18 9,12 15,6"/></svg>
      </button>

      {/* Right arrow */}
      <button onClick={next} aria-label="Next" style={{
        position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)',
        zIndex: 3, width: '40px', height: '40px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.32)', transition: 'background .2s',
      }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.32)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.16)'}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><polyline points="9,6 15,12 9,18"/></svg>
      </button>

      {/* Bottom: pause + dots */}
      <div style={{
        position: 'absolute', bottom: '28px', left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', zIndex: 3,
      }}>
        <button onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Pause' : 'Play'} style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.16)', backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.32)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .2s',
        }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.3)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.16)'}
        >
          {playing
            ? <svg viewBox="0 0 24 24" width="12" height="12" fill="#fff"><rect x="5" y="4" width="4" height="16" rx="1"/><rect x="15" y="4" width="4" height="16" rx="1"/></svg>
            : <svg viewBox="0 0 24 24" width="12" height="12" fill="#fff"><polygon points="6,4 20,12 6,20"/></svg>}
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => { goTo(i); if (playing) startTimer(); }} aria-label={`Slide ${i+1}`} style={{
            width: i === current ? '28px' : '8px', height: '8px', borderRadius: '4px', padding: 0,
            background: i === current ? '#fff' : 'rgba(255,255,255,0.5)',
            transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)', cursor: 'pointer',
          }} />
        ))}
      </div>
    </section>
  );
}
