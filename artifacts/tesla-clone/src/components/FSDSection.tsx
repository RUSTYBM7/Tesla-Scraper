export default function FSDSection() {
  return (
    <section style={{
      position: 'relative', height: '580px', overflow: 'hidden',
      background: 'linear-gradient(160deg, #050510 0%, #0a1020 40%, #0d1830 100%)',
    }}>
      {/* Road visualization */}
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Perspective road */}
        <svg viewBox="0 0 1440 580" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {/* Road surface */}
          <path d="M520 580 L700 200 L740 200 L920 580 Z" fill="rgba(30,40,60,0.8)" />
          {/* Lane markings */}
          {[250, 290, 330, 370, 410, 450, 490, 530, 570].map((y, i) => (
            <rect key={i} x={718} y={y} width={4} height={20}
              fill="rgba(255,255,200,0.4)"
              style={{ transform: `scaleX(${1 - i * 0.08})`, transformOrigin: '720px 0' }}
            />
          ))}
          {/* Detection boxes */}
          {[
            { x: 480, y: 240, w: 60, h: 80, color: '#3e6ae1', label: 'CAR' },
            { x: 900, y: 260, w: 55, h: 70, color: '#3e6ae1', label: 'CAR' },
            { x: 640, y: 310, w: 40, h: 60, color: '#00cc88', label: 'BIKE' },
          ].map(({ x, y, w, h, color, label }) => (
            <g key={label + x}>
              <rect x={x} y={y} width={w} height={h} fill="none" stroke={color} strokeWidth="1.5" opacity="0.7" />
              <rect x={x} y={y - 14} width={label.length * 6 + 8} height={14} fill={color} opacity="0.8" rx="2" />
              <text x={x + 4} y={y - 4} fill="white" fontSize="8" fontFamily="monospace">{label}</text>
            </g>
          ))}
          {/* Horizon glow */}
          <ellipse cx="720" cy="200" rx="200" ry="30" fill="rgba(62,106,225,0.15)" />
          {/* Data overlay lines */}
          <line x1="200" y1="100" x2="720" y2="200" stroke="rgba(62,106,225,0.2)" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="1240" y1="110" x2="720" y2="200" stroke="rgba(62,106,225,0.2)" strokeWidth="1" strokeDasharray="4,4" />
          {/* Sensor arc */}
          <path d="M600 580 A280 280 0 0 1 840 580" fill="none" stroke="rgba(62,106,225,0.25)" strokeWidth="1" />
          <path d="M650 580 A230 230 0 0 1 790 580" fill="none" stroke="rgba(62,106,225,0.15)" strokeWidth="1" />
        </svg>

        {/* HUD elements */}
        <div style={{
          position: 'absolute', top: '60px', left: '60px',
          background: 'rgba(0,0,0,0.5)', borderRadius: '8px',
          padding: '12px 16px', border: '1px solid rgba(62,106,225,0.3)',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>AUTOPILOT</div>
          <div style={{ fontSize: '32px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>82</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>mph</div>
        </div>
        <div style={{
          position: 'absolute', top: '60px', right: '60px',
          background: 'rgba(0,0,0,0.5)', borderRadius: '8px',
          padding: '12px 16px', border: '1px solid rgba(62,106,225,0.3)',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>ETA</div>
          <div style={{ fontSize: '20px', fontWeight: 600, color: '#fff', lineHeight: 1 }}>23 min</div>
          <div style={{ fontSize: '11px', color: 'rgba(62,225,150,0.8)', marginTop: '2px' }}>● FSD Active</div>
        </div>
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: '64px',
      }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '6px', textAlign: 'center' }}>
          Full Self-Driving (Supervised)
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', marginBottom: '28px', textAlign: 'center' }}>
          Available for $99/mo
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="#" style={{
            padding: '10px 28px', borderRadius: '4px', fontSize: '14px', fontWeight: 500,
            background: '#3e6ae1', color: '#fff', display: 'inline-block', transition: 'background 0.2s',
          }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#2d5bc8'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#3e6ae1'}
          >Demo FSD (Supervised)</a>
          <a href="#" style={{
            padding: '10px 28px', borderRadius: '4px', fontSize: '14px', fontWeight: 500,
            background: 'rgba(255,255,255,0.12)', color: '#fff', display: 'inline-block',
            border: '1px solid rgba(255,255,255,0.25)', transition: 'background 0.2s',
          }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'}
          >Learn More</a>
        </div>
      </div>
    </section>
  );
}
