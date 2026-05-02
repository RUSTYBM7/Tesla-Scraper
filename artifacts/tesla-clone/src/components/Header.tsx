import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

const VEHICLE_SLUGS: Record<string, string> = {
  'Model S': 'model-s',
  'Model 3': 'model-3',
  'Model Y': 'model-y',
  'Model X': 'model-x',
  'Cybertruck': 'cybertruck',
};

const navItems = [
  {
    label: 'Vehicles',
    megaMenu: {
      featured: [
        { name: 'Model S',    img: `${BASE}menu-model-s.png` },
        { name: 'Model 3',    img: `${BASE}menu-model-3.png` },
        { name: 'Model Y',    img: `${BASE}hero-model-y-menu.png` },
        { name: 'Model X',    img: `${BASE}hero-model-x.png` },
        { name: 'Cybertruck', img: `${BASE}menu-cybertruck.png` },
      ],
      links: [
        'Current Offers', 'Demo Drive', 'Trade-in', 'Pre-Owned',
        'Trip Planner', 'Features', 'Help Me Choose', 'Compare', 'Safety',
      ],
    },
  },
  {
    label: 'Energy',
    megaMenu: {
      featured: [
        { name: 'Solar Panels', img: `${BASE}menu-solar-hd.png` },
        { name: 'Solar Roof',   img: `${BASE}menu-solar-roof.png` },
        { name: 'Powerwall',    img: `${BASE}menu-powerwall.png` },
        { name: 'Megapack',     img: `${BASE}energy-megapack.jpg` },
      ],
      links: ['Schedule a Consultation', 'Why Solar', 'Incentives', 'Support', 'Commercial', 'Utilities'],
    },
  },
  {
    label: 'Charging',
    megaMenu: {
      featured: [
        { name: 'Charging',      img: `${BASE}tesla-supercharger-new.jpg` },
        { name: 'Home Charging', img: `${BASE}tesla-charging-station.jpg` },
      ],
      links: ['Help Me Charge', 'Charging Calculator', 'Charging With NACS', 'Host a Supercharger'],
    },
  },
  {
    label: 'Discover',
    megaMenu: {
      featured: [],
      links: ['Demo Drive', 'Insurance', 'Current Offers', 'Learn', 'Video Guides', 'Customer Stories', 'Events', 'Safety', 'Find Us', 'About', 'Careers'],
    },
  },
  { label: 'Shop', href: '#' },
];

function TeslaLogo({ color }: { color: string }) {
  return (
    <span style={{
      fontFamily: "'Inter', -apple-system, sans-serif",
      fontSize: '13px', fontWeight: 700, letterSpacing: '0.22em',
      color, userSelect: 'none', lineHeight: 1,
    }}>TESLA</span>
  );
}

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reset scroll state on route change
  useEffect(() => {
    setScrolled(window.scrollY > 20);
    setActiveMenu(null);
  }, [location.pathname]);

  const open = (label: string) => { if (timeoutRef.current) clearTimeout(timeoutRef.current); setActiveMenu(label); };
  const close = () => { timeoutRef.current = setTimeout(() => setActiveMenu(null), 130); };
  const cancelClose = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };

  // On non-home pages the header is always solid
  const isTransparent = isHome && !scrolled && activeMenu === null;
  const headerBg = isTransparent ? 'transparent' : scrolled || !isHome ? 'rgba(255,255,255,0.97)' : '#fff';
  const textColor = isTransparent ? '#fff' : '#171a20';
  const isLight = isTransparent;

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px', background: headerBg,
        backdropFilter: !isTransparent ? 'blur(12px)' : 'none',
        transition: 'background 0.28s ease, backdrop-filter 0.28s ease',
        boxShadow: !isTransparent ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
      }}>
        {/* Logo */}
        <button onClick={() => navigate('/')} style={{
          flexShrink: 0, display: 'flex', alignItems: 'center',
          padding: '4px 12px', borderRadius: '4px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          transition: 'background 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = isLight ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.05)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
        >
          <TeslaLogo color={textColor} />
        </button>

        {/* Centered nav */}
        <nav style={{
          display: 'flex', alignItems: 'center', gap: '2px',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        }}>
          {navItems.map((item) => (
            <div key={item.label} style={{ position: 'relative' }}
              onMouseEnter={() => item.megaMenu ? open(item.label) : undefined}
              onMouseLeave={item.megaMenu ? close : undefined}
            >
              <button style={{
                display: 'block', padding: '8px 15px', fontSize: '14px', fontWeight: 500,
                color: textColor, borderRadius: '20px', background: 'transparent', border: 'none', cursor: 'pointer',
                transition: 'background 0.18s',
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = isLight ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.06)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                {item.label}
              </button>
            </div>
          ))}
        </nav>

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {[
            { label: 'Help',    d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z' },
            { label: 'Globe',   d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
            { label: 'Account', d: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
          ].map(({ label, d }) => (
            <button key={label} title={label} style={{
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '50%', background: 'transparent', border: 'none', cursor: 'pointer',
              transition: 'background 0.18s',
            }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = isLight ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.06)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill={textColor}><path d={d}/></svg>
            </button>
          ))}
        </div>
      </header>

      {/* ── Mega menu panel ── */}
      {activeMenu && (() => {
        const item = navItems.find(n => n.label === activeMenu);
        if (!item?.megaMenu) return null;
        return (
          <div style={{
            position: 'fixed', top: '56px', left: 0, right: 0,
            background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            padding: '28px 48px 32px', zIndex: 999,
            display: 'flex', gap: '48px',
            animation: 'megaFadeIn 0.18s ease',
          }}
            onMouseEnter={cancelClose}
            onMouseLeave={close}
          >
            {item.megaMenu.featured.length > 0 && (
              <div style={{ display: 'flex', gap: '28px', flex: 1 }}>
                {item.megaMenu.featured.map((v) => {
                  const slug = VEHICLE_SLUGS[v.name];
                  return (
                    <div key={v.name} style={{ textAlign: 'center', minWidth: '110px' }}>
                      <div style={{
                        width: '140px', height: '82px', margin: '0 auto', borderRadius: '6px', overflow: 'hidden',
                        background: '#f5f5f5', cursor: 'pointer',
                      }}
                        onClick={() => { if (slug) { navigate(`/vehicles/${slug}`); setActiveMenu(null); } }}
                      >
                        <img src={v.img} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                        />
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '8px', color: '#171a20' }}>{v.name}</div>
                      <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '5px' }}>
                        {slug && (
                          <button onClick={() => { navigate(`/vehicles/${slug}`); setActiveMenu(null); }} style={{
                            fontSize: '12px', color: '#5c5e62', background: 'none', border: 'none', cursor: 'pointer',
                            textDecoration: 'underline', textUnderlineOffset: '2px', padding: 0,
                          }}>Learn</button>
                        )}
                        {slug && (
                          <button onClick={() => { navigate(`/vehicles/${slug}`); setActiveMenu(null); }} style={{
                            fontSize: '12px', color: '#5c5e62', background: 'none', border: 'none', cursor: 'pointer',
                            textDecoration: 'underline', textUnderlineOffset: '2px', padding: 0,
                          }}>Order</button>
                        )}
                        {!slug && <a href="#" style={{ fontSize: '12px', color: '#5c5e62', textDecoration: 'underline', textUnderlineOffset: '2px' }}>Learn</a>}
                        {!slug && <a href="#" style={{ fontSize: '12px', color: '#5c5e62', textDecoration: 'underline', textUnderlineOffset: '2px' }}>Order</a>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div style={{ minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
              {item.megaMenu.links.map((link) => (
                <a key={link} href="#" style={{ fontSize: '13px', color: '#171a20', padding: '2px 0', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#3e6ae1'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#171a20'}
                >{link}</a>
              ))}
            </div>
          </div>
        );
      })()}

      <style>{`
        @keyframes megaFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { font-family: inherit; }
      `}</style>
    </>
  );
}
