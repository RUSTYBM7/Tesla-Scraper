import { useState, useEffect, useRef } from 'react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  btnPrimary: string;
  btnSecondary: string;
  gradient: string;
  accent: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Full Self-Driving (Supervised)',
    subtitle: 'Available for $99/mo',
    btnPrimary: 'Demo FSD (Supervised)',
    btnSecondary: 'Learn More',
    gradient: 'linear-gradient(160deg, #1a2a4a 0%, #2d4a7a 40%, #c8d8e8 100%)',
    accent: '#3e6ae1',
  },
  {
    id: 2,
    title: 'Model Y',
    subtitle: 'Starting at $42,490',
    btnPrimary: 'Order Now',
    btnSecondary: 'Learn More',
    gradient: 'linear-gradient(160deg, #e8f0e8 0%, #d0dcd0 40%, #a0b8a0 100%)',
    accent: '#171a20',
  },
  {
    id: 3,
    title: 'Model 3',
    subtitle: 'Starting at $38,990',
    btnPrimary: 'Order Now',
    btnSecondary: 'Learn More',
    gradient: 'linear-gradient(160deg, #1a1a2e 0%, #2d2d4a 40%, #4a4a6a 100%)',
    accent: '#fff',
  },
  {
    id: 4,
    title: 'Cybertruck',
    subtitle: 'Built for Any Planet',
    btnPrimary: 'Order Now',
    btnSecondary: 'Learn More',
    gradient: 'linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)',
    accent: '#fff',
  },
];

function CarSilhouette({ slide }: { slide: Slide }) {
  const isLight = slide.id === 2;
  const color = isLight ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.12)';

  if (slide.id === 4) {
    return (
      <svg viewBox="0 0 800 200" style={{ width: '70%', maxWidth: '900px', opacity: 0.9 }}>
        <path d="M60 160 L60 120 L120 100 L220 70 L380 60 L520 65 L640 75 L720 100 L750 120 L750 160 Z" fill={color} />
        <path d="M180 160 L180 130 L200 115 L260 95 L380 85 L500 88 L580 92 L640 105 L660 130 L660 160 Z" fill={isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.1)'} />
        <ellipse cx="200" cy="160" rx="38" ry="20" fill={isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'} />
        <ellipse cx="620" cy="160" rx="38" ry="20" fill={isLight ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)'} />
        <rect x="60" y="155" width="690" height="10" rx="4" fill={isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)'} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 800 180" style={{ width: '65%', maxWidth: '850px', opacity: 0.85 }}>
      <path d="M80 150 L80 110 L140 80 L260 55 L400 48 L520 52 L640 68 L710 100 L730 130 L730 150 Z" fill={color} />
      <path d="M220 150 L220 115 L280 90 L390 72 L490 70 L580 78 L640 100 L650 130 L650 150 Z" fill={isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.08)'} />
      <ellipse cx="220" cy="150" rx="42" ry="22" fill={isLight ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.18)'} />
      <ellipse cx="600" cy="150" rx="42" ry="22" fill={isLight ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.18)'} />
      <rect x="80" y="145" width="650" height="8" rx="4" fill={isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'} />
    </svg>
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
  };

  useEffect(() => {
    if (playing) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing]);

  const go = (idx: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, 200);
    if (playing) startTimer();
  };

  const prev = () => go((current - 1 + slides.length) % slides.length);
  const next = () => go((current + 1) % slides.length);

  const slide = slides[current];
  const isLight = slide.id === 2;
  const textColor = isLight ? '#171a20' : '#ffffff';
  const subtitleColor = isLight ? '#5c5e62' : 'rgba(255,255,255,0.85)';

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      background: slide.gradient,
      transition: 'background 0.8s ease',
    }}>
      {/* Animated background shapes */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}>
        {/* Road-like element */}
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: 0, right: 0,
          height: '2px',
          background: isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: 0, right: 0,
          height: '60px',
          background: isLight
            ? 'linear-gradient(to top, rgba(0,0,0,0.05), transparent)'
            : 'linear-gradient(to top, rgba(0,0,0,0.25), transparent)',
        }} />
      </div>

      {/* Car silhouette */}
      <div style={{
        position: 'absolute',
        bottom: '16%',
        left: '50%',
        transform: 'translateX(-50%)',
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 0.4s ease',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <CarSilhouette slide={slide} />
      </div>

      {/* Spec bubbles */}
      {slide.id <= 2 && (
        <div style={{
          position: 'absolute',
          bottom: '28%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '40px',
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.4s ease 0.1s',
        }}>
          {[
            { val: slide.id === 1 ? '396mi' : '330mi', label: 'Range (est.)' },
            { val: slide.id === 1 ? '2.1s' : '3.5s', label: '0–60 mph' },
            { val: slide.id === 1 ? '670hp' : '456hp', label: 'Peak Power' },
          ].map(({ val, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: 600, color: textColor, lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: '11px', color: subtitleColor, marginTop: '4px', letterSpacing: '0.02em' }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{
        position: 'absolute',
        top: '14%',
        left: 0, right: 0,
        textAlign: 'center',
        zIndex: 2,
        padding: '0 24px',
        opacity: transitioning ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}>
        <h1 style={{
          fontSize: 'clamp(28px, 4vw, 56px)',
          fontWeight: 600,
          color: textColor,
          letterSpacing: '-0.5px',
          lineHeight: 1.1,
          marginBottom: '8px',
        }}>
          {slide.title}
        </h1>
        <p style={{
          fontSize: '18px',
          color: subtitleColor,
          marginBottom: '28px',
          fontWeight: 400,
        }}>
          {slide.subtitle}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#" style={{
            padding: '10px 32px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            background: isLight ? 'rgba(23,26,32,0.8)' : 'rgba(23,26,32,0.85)',
            color: '#fff',
            display: 'inline-block',
            transition: 'background 0.2s',
            minWidth: '180px',
          }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(23,26,32,1)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = isLight ? 'rgba(23,26,32,0.8)' : 'rgba(23,26,32,0.85)'}
          >{slide.btnPrimary}</a>
          <a href="#" style={{
            padding: '10px 32px',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            background: 'rgba(255,255,255,0.65)',
            color: '#171a20',
            display: 'inline-block',
            transition: 'background 0.2s',
            minWidth: '180px',
          }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.9)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.65)'}
          >{slide.btnSecondary}</a>
        </div>
      </div>

      {/* Prev arrow */}
      <button onClick={prev} style={{
        position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)',
        zIndex: 3, width: '44px', height: '44px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.3)', transition: 'background 0.2s',
      }}
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.3)'}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill={isLight ? '#171a20' : '#fff'}>
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>

      {/* Next arrow */}
      <button onClick={next} style={{
        position: 'absolute', top: '50%', right: '20px', transform: 'translateY(-50%)',
        zIndex: 3, width: '44px', height: '44px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: '1px solid rgba(255,255,255,0.3)', transition: 'background 0.2s',
      }}
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.3)'}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)'}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill={isLight ? '#171a20' : '#fff'}>
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>

      {/* Bottom controls */}
      <div style={{
        position: 'absolute', bottom: '28px', left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', zIndex: 3,
      }}>
        <button onClick={() => setPlaying(!playing)} style={{
          width: '32px', height: '32px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill={isLight ? '#171a20' : '#fff'}>
            {playing
              ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              : <path d="M8 5v14l11-7z" />}
          </svg>
        </button>
        {slides.map((_, i) => (
          <button key={i} onClick={() => go(i)} style={{
            width: i === current ? '28px' : '8px',
            height: '8px', borderRadius: '4px',
            background: i === current
              ? (isLight ? '#171a20' : '#fff')
              : (isLight ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)'),
            transition: 'all 0.3s ease', border: 'none',
          }} />
        ))}
      </div>
    </section>
  );
}
