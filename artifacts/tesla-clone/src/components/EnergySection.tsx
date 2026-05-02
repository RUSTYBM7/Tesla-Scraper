const energyCards = [
  {
    title: 'Solar Panels',
    subtitle: 'Produce Clean Energy From Your Roof',
    btnPrimary: 'Order Now',
    btnSecondary: 'Learn More',
    gradient: 'linear-gradient(160deg, #f5f0e0 0%, #e8d8a0 50%, #c8a830 100%)',
    textColor: '#171a20',
    icon: (
      <svg viewBox="0 0 120 80" style={{ width: '280px' }}>
        <rect x="5" y="5" width="110" height="70" rx="4" fill="rgba(0,0,0,0.05)" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
        {[0,1,2,3,4].map(col => [0,1,2].map(row => (
          <rect key={`${col}-${row}`}
            x={8 + col * 22} y={8 + row * 22}
            width="19" height="19" rx="2"
            fill="rgba(30,60,120,0.25)"
            stroke="rgba(0,0,0,0.08)" strokeWidth="0.5"
          />
        )))}
        <line x1="5" y1="40" x2="115" y2="40" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
        <line x1="60" y1="5" x2="60" y2="75" stroke="rgba(0,0,0,0.08)" strokeWidth="0.5" />
      </svg>
    ),
  },
  {
    title: 'Powerwall',
    subtitle: 'Power Your Home After Sundown',
    btnPrimary: 'Order Now',
    btnSecondary: 'Learn More',
    gradient: 'linear-gradient(160deg, #1a2a1a 0%, #2a4a2a 50%, #3a6a3a 100%)',
    textColor: '#ffffff',
    icon: (
      <svg viewBox="0 0 80 140" style={{ width: '120px' }}>
        <rect x="10" y="5" width="60" height="130" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <rect x="16" y="12" width="48" height="116" rx="5" fill="rgba(255,255,255,0.04)" />
        <rect x="28" y="0" width="24" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
        <rect x="14" y="55" width="52" height="30" rx="3" fill="rgba(100,200,100,0.3)" />
        <rect x="14" y="55" width="36" height="30" rx="3" fill="rgba(100,200,100,0.5)" />
        <circle cx="40" cy="70" r="8" fill="rgba(255,255,255,0.15)" />
        <path d="M37 70 L40 65 L43 70 L40 72 Z" fill="rgba(100,255,100,0.8)" />
      </svg>
    ),
  },
  {
    title: 'Solar Roof',
    subtitle: 'Looks Great. Costs Less.',
    btnPrimary: 'Order Now',
    btnSecondary: 'Learn More',
    gradient: 'linear-gradient(160deg, #2a1a0a 0%, #4a3a1a 50%, #6a5a2a 100%)',
    textColor: '#ffffff',
    icon: (
      <svg viewBox="0 0 200 100" style={{ width: '280px' }}>
        <polygon points="0,100 100,10 200,100" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {[-40,-20,0,20,40,60,80,100,120,140,160,180,200].map((x, i) => (
          <line key={i} x1={x} y1="100" x2={x + 50} y2="10" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
        ))}
        {[20,35,50,65,80].map((y, i) => (
          <line key={i} x1={0} y1={y + 45} x2={200} y2={y + 10} stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />
        ))}
      </svg>
    ),
  },
  {
    title: 'Megapack',
    subtitle: 'Utility-Scale Energy Storage',
    btnPrimary: 'Learn More',
    btnSecondary: 'Contact Sales',
    gradient: 'linear-gradient(160deg, #0a0a1a 0%, #1a1a3a 50%, #2a2a5a 100%)',
    textColor: '#ffffff',
    icon: (
      <svg viewBox="0 0 240 100" style={{ width: '300px' }}>
        {[0,1,2].map(i => (
          <rect key={i} x={i * 82} y="15" width="75" height="70" rx="4"
            fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        ))}
        {[0,1,2].map(i => (
          <rect key={i} x={i * 82 + 5} y="22" width="65" height="56" rx="3"
            fill="rgba(100,150,255,0.1)" />
        ))}
        {[0,1,2].map(i => [0,1,2,3].map(j => (
          <rect key={`${i}-${j}`} x={i * 82 + 8} y={25 + j * 13} width="59" height="10" rx="2"
            fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        )))}
      </svg>
    ),
  },
];

export default function EnergySection() {
  return (
    <section style={{ background: '#fff' }}>
      <div style={{ padding: '48px 48px 24px', borderBottom: '1px solid #e5e5e5' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#171a20' }}>Clean Energy for Home &amp; Business</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '12px' }}>
        {energyCards.map((card) => (
          <div key={card.title} style={{
            position: 'relative', height: '500px', borderRadius: '16px', overflow: 'hidden',
            background: card.gradient, display: 'flex', flexDirection: 'column',
          }}>
            {/* Icon area */}
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '32px',
            }}>
              {card.icon}
            </div>

            {/* Text + CTA */}
            <div style={{
              padding: '24px 28px 28px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)',
              textAlign: 'center',
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: 600, color: card.textColor, marginBottom: '6px' }}>{card.title}</h3>
              <p style={{ fontSize: '14px', color: card.textColor, opacity: 0.8, marginBottom: '20px' }}>{card.subtitle}</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <a href="#" style={{
                  padding: '9px 24px', borderRadius: '4px', fontSize: '13px', fontWeight: 500,
                  background: 'rgba(23,26,32,0.8)', color: '#fff', display: 'inline-block', transition: 'background 0.2s',
                }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(23,26,32,1)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(23,26,32,0.8)'}
                >{card.btnPrimary}</a>
                <a href="#" style={{
                  padding: '9px 24px', borderRadius: '4px', fontSize: '13px', fontWeight: 500,
                  background: 'rgba(255,255,255,0.65)', color: '#171a20', display: 'inline-block', transition: 'background 0.2s',
                }}
                  onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.9)'}
                  onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.65)'}
                >{card.btnSecondary}</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
