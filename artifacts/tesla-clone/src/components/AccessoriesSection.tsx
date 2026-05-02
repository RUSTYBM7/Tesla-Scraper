const categories = [
  {
    label: 'Charging',
    desc: 'Wall Connectors, Adapters & More',
    gradient: 'linear-gradient(135deg, #1a2a4a 0%, #2a4a7a 100%)',
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80">
        <rect x="20" y="10" width="40" height="55" rx="6" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <rect x="30" y="5" width="20" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
        <rect x="25" y="30" width="30" height="20" rx="3" fill="rgba(62,106,225,0.4)" />
        <path d="M38 42 L40 36 L42 42 L40 44 Z" fill="rgba(200,220,255,0.9)" />
        <line x1="40" y1="65" x2="40" y2="75" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeDasharray="3,2" />
      </svg>
    ),
    textColor: '#fff',
  },
  {
    label: 'Vehicle Accessories',
    desc: 'Floor Mats, Covers & Add-ons',
    gradient: 'linear-gradient(135deg, #f0ece4 0%, #d8d0c0 100%)',
    icon: (
      <svg viewBox="0 0 100 60" width="120" height="72">
        <path d="M10 45 L10 25 L20 12 L45 8 L65 9 L82 16 L92 30 L92 45 Z" fill="rgba(0,0,0,0.1)" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
        <ellipse cx="28" cy="45" rx="10" ry="6" fill="rgba(0,0,0,0.12)" />
        <ellipse cx="72" cy="45" rx="10" ry="6" fill="rgba(0,0,0,0.12)" />
      </svg>
    ),
    textColor: '#171a20',
  },
  {
    label: 'Apparel',
    desc: 'Hats, Jackets & Lifestyle',
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #3a1a1a 100%)',
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80">
        <path d="M15 30 L30 10 L50 10 L65 30 L55 35 L55 70 L25 70 L25 35 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <path d="M30 10 L25 35 L55 35 L50 10" fill="rgba(255,255,255,0.06)" />
        <text x="40" y="55" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="sans-serif">T</text>
      </svg>
    ),
    textColor: '#fff',
  },
  {
    label: 'Lifestyle',
    desc: 'Luggage, Gear & Collectibles',
    gradient: 'linear-gradient(135deg, #0a1a0a 0%, #1a3a2a 100%)',
    icon: (
      <svg viewBox="0 0 80 80" width="80" height="80">
        <rect x="15" y="25" width="50" height="40" rx="6" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <rect x="28" y="18" width="24" height="10" rx="4" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <rect x="22" y="40" width="12" height="12" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <rect x="46" y="40" width="12" height="12" rx="2" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      </svg>
    ),
    textColor: '#fff',
  },
];

export default function AccessoriesSection() {
  return (
    <section style={{ padding: '48px 12px 12px', background: '#fff' }}>
      <div style={{ padding: '0 36px 28px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#171a20', marginBottom: '4px' }}>Shop</h2>
        <p style={{ fontSize: '14px', color: '#5c5e62' }}>Accessories designed for your Tesla</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', padding: '0 12px' }}>
        {categories.map((cat) => (
          <a key={cat.label} href="#" style={{
            display: 'flex', flexDirection: 'column',
            borderRadius: '16px', overflow: 'hidden',
            background: cat.gradient, height: '260px',
            textDecoration: 'none',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            position: 'relative',
          }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div style={{
              flex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px',
            }}>
              {cat.icon}
            </div>
            <div style={{ padding: '16px 20px 20px' }}>
              <div style={{ fontSize: '15px', fontWeight: 600, color: cat.textColor }}>{cat.label}</div>
              <div style={{ fontSize: '12px', color: cat.textColor, opacity: 0.6, marginTop: '2px' }}>{cat.desc}</div>
              <div style={{
                marginTop: '12px', fontSize: '12px', fontWeight: 500,
                color: cat.textColor, display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                Shop Now
                <svg viewBox="0 0 16 16" width="12" height="12" fill={cat.textColor}>
                  <path d="M6 4l4 4-4 4" stroke={cat.textColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
