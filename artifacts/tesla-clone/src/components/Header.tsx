import { useState, useRef, useEffect } from 'react';

const BASE = import.meta.env.BASE_URL;

const navItems = [
  {
    label: 'Vehicles',
    megaMenu: {
      featured: [
        { name: 'Model S', img: `${BASE}menu-model-s.png`, learnHref: '#', orderHref: '#' },
        { name: 'Model 3', img: `${BASE}menu-model-3.png`, learnHref: '#', orderHref: '#' },
        { name: 'Model Y', img: `${BASE}menu-model-y.jpg`, learnHref: '#', orderHref: '#' },
        { name: 'Model X', img: `${BASE}menu-model-x.png`, learnHref: '#', orderHref: '#' },
        { name: 'Cybertruck', img: `${BASE}menu-cybertruck.png`, learnHref: '#', orderHref: '#' },
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
        { name: 'Solar Panels', img: `${BASE}menu-solar-panels.png`, learnHref: '#', orderHref: '#' },
        { name: 'Solar Roof', img: `${BASE}menu-solar-roof.png`, learnHref: '#', orderHref: '#' },
        { name: 'Powerwall', img: `${BASE}menu-powerwall.png`, learnHref: '#', orderHref: '#' },
      ],
      links: [
        'Schedule a Consultation', 'Why Solar', 'Incentives', 'Support', 'Commercial', 'Utilities',
      ],
    },
  },
  {
    label: 'Charging',
    megaMenu: {
      featured: [
        { name: 'Charging', img: `${BASE}menu-charging.png`, learnHref: '#', orderHref: '#' },
      ],
      links: [
        'Help Me Charge', 'Charging Calculator', 'Charging With NACS', 'Host a Supercharger',
      ],
    },
  },
  {
    label: 'Discover',
    megaMenu: {
      featured: [],
      links: [
        'Demo Drive', 'Insurance', 'Current Offers', 'Learn', 'Video Guides',
        'Customer Stories', 'Events', 'Safety', 'Find Us', 'About', 'Careers',
      ],
    },
  },
  { label: 'Shop', href: '#' },
];

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const open = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const close = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const cancelClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const isLight = !scrolled && activeMenu === null;

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: 'var(--header-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      background: scrolled ? 'rgba(255,255,255,0.97)' : activeMenu ? '#fff' : 'transparent',
      backdropFilter: scrolled ? 'blur(8px)' : 'none',
      transition: 'background 0.3s ease',
    }}>
      {/* Logo */}
      <a href="#" style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        <svg width="103" height="13" viewBox="0 0 103 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.17.5H0v12h3.17V.5zM9.39.5H6.22v12h3.17V.5zM15.61.5h-3.17v12h3.17V.5z" fill={isLight ? '#fff' : '#171a20'} />
          <path fillRule="evenodd" clipRule="evenodd" d="M0 .5h18.78v3.06H11.7V12.5H7.08V3.56H0V.5z" fill={isLight ? '#fff' : '#171a20'} />
          <path d="M21.5.5h12.47v2.86h-9.3v2.37h8.22v2.86h-8.22V9.7h9.3v2.8H21.5V.5zM36.9.5h3.17l3.26 4.77L46.58.5h3.17L44.42 7.4V12.5h-3.17V7.4L36.9.5zM51.6.5H64.07v2.86h-4.75V12.5H56.3V3.36H51.6V.5zM66.1.5h12.47v2.86h-9.3v2.37h8.22v2.86h-8.22V9.7h9.3v2.8H66.1V.5zM80.5 9.64L83.2 8c.42.83 1.29 1.4 2.37 1.4 1.19 0 1.85-.51 1.85-1.3 0-.88-.77-1.19-2.17-1.63C83.13 5.96 81 5.27 81 2.73 81 1.07 82.4.2 84.27.2c1.68 0 2.96.7 3.73 1.85l-2.5 1.56c-.38-.69-1.02-1.12-1.75-1.12-.66 0-1.12.31-1.12.85 0 .75.88 1.05 2.17 1.46C87.03 5.33 90 6.04 90 9.1c0 1.91-1.56 3.4-4.45 3.4-2.25 0-4-1.06-5.05-2.86zM91.9.5h3.17v9h5.43v3h-8.6V.5z" fill={isLight ? '#fff' : '#171a20'} />
        </svg>
      </a>

      {/* Nav */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        {navItems.map((item) => (
          <div
            key={item.label}
            style={{ position: 'relative' }}
            onMouseEnter={() => item.megaMenu ? open(item.label) : undefined}
            onMouseLeave={item.megaMenu ? close : undefined}
          >
            <a
              href={item.href || '#'}
              style={{
                display: 'block',
                padding: '6px 16px',
                fontSize: '14px',
                fontWeight: 500,
                color: isLight ? '#fff' : '#171a20',
                borderRadius: '20px',
                transition: 'background 0.2s',
                background: activeMenu === item.label ? 'rgba(0,0,0,0.06)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.06)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  activeMenu === item.label ? 'rgba(0,0,0,0.06)' : 'transparent';
              }}
            >
              {item.label}
            </a>

            {item.megaMenu && activeMenu === item.label && (
              <div
                style={{
                  position: 'fixed',
                  top: 'var(--header-height)',
                  left: 0,
                  right: 0,
                  background: '#fff',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  padding: '32px 48px',
                  zIndex: 999,
                  display: 'flex',
                  gap: '48px',
                }}
                onMouseEnter={cancelClose}
                onMouseLeave={close}
              >
                {item.megaMenu.featured.length > 0 && (
                  <div style={{ display: 'flex', gap: '32px', flex: 1 }}>
                    {item.megaMenu.featured.map((v) => (
                      <div key={v.name} style={{ textAlign: 'center', minWidth: '120px' }}>
                        <img src={v.img} alt={v.name} style={{ width: '140px', height: '80px', objectFit: 'contain', margin: '0 auto' }} />
                        <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '8px' }}>{v.name}</div>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '6px' }}>
                          <a href={v.learnHref} style={{ fontSize: '12px', color: '#5c5e62', textDecoration: 'underline' }}>Learn</a>
                          <a href={v.orderHref} style={{ fontSize: '12px', color: '#5c5e62', textDecoration: 'underline' }}>Order</a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {item.megaMenu.links.map((link) => (
                    <a key={link} href="#" style={{ fontSize: '13px', color: '#171a20', padding: '3px 0' }}
                      onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#3e6ae1'}
                      onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#171a20'}
                    >{link}</a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Right icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {[
          { label: 'Help', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z' },
          { label: 'Globe', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
          { label: 'Account', path: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
        ].map(({ label, path }) => (
          <button key={label} title={label} style={{
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', transition: 'background 0.2s',
          }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.08)'}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'transparent'}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill={isLight ? '#fff' : '#171a20'}>
              <path d={path} />
            </svg>
          </button>
        ))}
      </div>

      {/* Backdrop overlay for mega menu */}
      {activeMenu && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          background: 'rgba(0,0,0,0.3)',
        }} onClick={() => setActiveMenu(null)} />
      )}
    </header>
  );
}
