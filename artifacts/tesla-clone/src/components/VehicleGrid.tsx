interface VehicleCard {
  label: string;
  subtitle: string;
  gradient: string;
  textColor: string;
  svgPath: string;
  href: string;
}

const vehicles: VehicleCard[] = [
  {
    label: 'Model S',
    subtitle: 'Sport Sedan',
    gradient: 'linear-gradient(160deg, #c8d8e8 0%, #a0b8d0 60%, #7898b8 100%)',
    textColor: '#171a20',
    svgPath: 'M80 140 L80 105 L140 78 L260 55 L400 48 L520 52 L640 68 L710 98 L730 125 L730 140 Z',
    href: '#',
  },
  {
    label: 'Model Y',
    subtitle: 'Midsize SUV',
    gradient: 'linear-gradient(160deg, #2a4a2a 0%, #3a6a3a 60%, #5a8a5a 100%)',
    textColor: '#ffffff',
    svgPath: 'M70 145 L70 100 L130 72 L240 52 L380 44 L520 48 L650 62 L720 92 L740 125 L740 145 Z',
    href: '#',
  },
  {
    label: 'Model 3',
    subtitle: 'Compact Sedan',
    gradient: 'linear-gradient(160deg, #1a1a3a 0%, #2a2a5a 60%, #3a3a7a 100%)',
    textColor: '#ffffff',
    svgPath: 'M85 140 L85 108 L145 82 L265 60 L400 53 L520 57 L635 72 L705 100 L725 128 L725 140 Z',
    href: '#',
  },
  {
    label: 'Model X',
    subtitle: 'Full-Size SUV',
    gradient: 'linear-gradient(160deg, #e8e0d0 0%, #d0c8b8 60%, #b8b0a0 100%)',
    textColor: '#171a20',
    svgPath: 'M65 148 L65 98 L125 68 L235 45 L375 36 L525 40 L655 56 L725 88 L745 125 L745 148 Z',
    href: '#',
  },
  {
    label: 'Cybertruck',
    subtitle: 'Pickup Truck',
    gradient: 'linear-gradient(160deg, #0d0d0d 0%, #1a1a1a 50%, #262626 100%)',
    textColor: '#ffffff',
    svgPath: 'M60 145 L60 108 L120 98 L220 68 L380 60 L520 65 L640 75 L720 100 L750 125 L750 145 Z',
    href: '#',
  },
];

export default function VehicleGrid() {
  return (
    <section style={{ background: '#fff', padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      {vehicles.map((v, i) => {
        const isLast = i === vehicles.length - 1 && vehicles.length % 2 !== 0;
        return (
          <a
            key={v.label}
            href={v.href}
            style={{
              position: 'relative',
              height: '340px',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'block',
              background: v.gradient,
              gridColumn: isLast ? '1 / -1' : undefined,
              textDecoration: 'none',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1.01)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            {/* Text */}
            <div style={{ position: 'absolute', top: '24px', left: '28px', zIndex: 2 }}>
              <div style={{ fontSize: '12px', fontWeight: 500, color: v.textColor, opacity: 0.7, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {v.subtitle}
              </div>
              <div style={{ fontSize: '22px', fontWeight: 600, color: v.textColor, marginTop: '2px' }}>
                {v.label}
              </div>
            </div>

            {/* Car SVG silhouette */}
            <div style={{
              position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
              width: '85%',
            }}>
              <svg viewBox="0 0 800 160" style={{ width: '100%' }}>
                <path d={v.svgPath} fill={v.textColor === '#fff' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)'} />
                <ellipse cx="200" cy={v.label === 'Model X' || v.label === 'Model Y' ? 148 : 143} rx="44" ry="20"
                  fill={v.textColor === '#fff' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)'} />
                <ellipse cx="600" cy={v.label === 'Model X' || v.label === 'Model Y' ? 148 : 143} rx="44" ry="20"
                  fill={v.textColor === '#fff' ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.15)'} />
              </svg>
            </div>

            {/* CTA buttons */}
            <div style={{
              position: 'absolute', bottom: '20px', left: 0, right: 0,
              display: 'flex', justifyContent: 'center', gap: '10px',
            }}>
              <button onClick={(e) => e.preventDefault()} style={{
                fontSize: '13px', fontWeight: 500, color: '#fff',
                background: 'rgba(23,26,32,0.75)',
                padding: '7px 20px', borderRadius: '4px',
                transition: 'background 0.2s', cursor: 'pointer',
              }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(23,26,32,0.95)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(23,26,32,0.75)'}
              >Order Now</button>
              <button onClick={(e) => e.preventDefault()} style={{
                fontSize: '13px', fontWeight: 500, color: '#171a20',
                background: 'rgba(255,255,255,0.65)',
                padding: '7px 20px', borderRadius: '4px',
                transition: 'background 0.2s', cursor: 'pointer',
              }}
                onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.9)'}
                onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.65)'}
              >Learn More</button>
            </div>
          </a>
        );
      })}
    </section>
  );
}
