export default function ChargingSection() {
  return (
    <section style={{
      position: 'relative', height: '580px', overflow: 'hidden',
      background: 'linear-gradient(160deg, #0a1628 0%, #1a2a4a 50%, #0d1f3c 100%)',
    }}>
      {/* Animated road lines */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {/* Supercharger stalls */}
        {[120, 280, 440, 600, 760, 920, 1080].map((x, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${x - 600}px`,
            bottom: '120px',
            width: '3px',
            height: '80px',
            background: 'rgba(255,255,255,0.2)',
            transform: 'rotate(0deg)',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: '-12px',
              width: '26px', height: '8px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '2px 2px 0 0',
            }} />
          </div>
        ))}

        {/* Glowing road */}
        <div style={{
          position: 'absolute', bottom: '80px', left: 0, right: 0,
          height: '40px',
          background: 'linear-gradient(to right, transparent, rgba(62,106,225,0.15) 30%, rgba(62,106,225,0.3) 50%, rgba(62,106,225,0.15) 70%, transparent)',
        }} />

        {/* Stats circles */}
        {[
          { val: '45,000+', label: 'Superchargers', x: '15%', y: '20%', size: 140 },
          { val: '15 min', label: 'Avg. Charge Time', x: '50%', y: '12%', size: 120 },
          { val: '99.97%', label: 'Network Uptime', x: '80%', y: '22%', size: 130 },
        ].map(({ val, label, x, y, size }) => (
          <div key={label} style={{
            position: 'absolute', left: x, top: y,
            transform: 'translate(-50%, 0)',
            width: `${size}px`, height: `${size}px`,
            borderRadius: '50%',
            border: '1px solid rgba(62,106,225,0.3)',
            background: 'rgba(62,106,225,0.08)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}>
            <div style={{ fontSize: '22px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginTop: '6px', textAlign: 'center', padding: '0 8px' }}>{label}</div>
          </div>
        ))}

        {/* Lightning bolt icon */}
        <div style={{
          position: 'absolute', bottom: '175px', left: '50%', transform: 'translateX(-50%)',
        }}>
          <svg viewBox="0 0 60 100" width="40" height="60" fill="none">
            <path d="M35 5 L10 55 L28 55 L22 95 L52 40 L34 40 L40 5 Z" fill="#3e6ae1" opacity="0.9" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: '64px',
      }}>
        <h2 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginBottom: '6px', textAlign: 'center' }}>
          Supercharging
        </h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.75)', marginBottom: '28px', textAlign: 'center' }}>
          The world's largest fast-charging network
        </p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="#" style={{
            padding: '10px 28px', borderRadius: '4px', fontSize: '14px', fontWeight: 500,
            background: '#3e6ae1', color: '#fff', display: 'inline-block', transition: 'background 0.2s',
          }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = '#2d5bc8'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = '#3e6ae1'}
          >Find a Charger</a>
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
