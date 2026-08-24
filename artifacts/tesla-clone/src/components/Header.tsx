import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

const VEHICLE_SLUGS: Record<string, string> = {
  'Model S': 'model-s', 'Model 3': 'model-3',
  'Model Y': 'model-y', 'Model X': 'model-x', 'Cybertruck': 'cybertruck',
};

interface NavLink { label: string; route: string; }
interface NavItem {
  label: string;
  route?: string;
  megaMenu?: {
    featured: { name: string; img: string }[];
    links: NavLink[];
  };
}

const ENERGY_SLUGS: Record<string, string> = {
  'Solar Panels': 'solar-panels',
  'Solar Roof':   'solar-roof',
  'Powerwall':    'powerwall',
  'Megapack':     'megapack',
};

const navItems: NavItem[] = [
  {
    label: 'Vehicles',
    megaMenu: {
      featured: [
        { name: 'Model S',    img: `${BASE}menu-model-s.png` },
        { name: 'Model 3',    img: `${BASE}menu-model-3.png` },
        { name: 'Model Y',    img: `${BASE}menu-model-y.jpg` },
        { name: 'Model X',    img: `${BASE}menu-model-x.png` },
        { name: 'Cybertruck', img: `${BASE}menu-cybertruck.png` },
      ],
      links: [
        { label: 'Current Offers',  route: '/offers' },
        { label: 'Demo Drive',      route: '/contact?subject=demo' },
        { label: 'Trade-in',        route: '/contact?subject=tradein' },
        { label: 'Pre-Owned',       route: '/pre-owned' },
        { label: 'Trip Planner',    route: '/trip-planner' },
        { label: 'Features',        route: '/compare' },
        { label: 'Help Me Choose',  route: '/compare' },
        { label: 'Compare Models',  route: '/compare' },
        { label: 'Safety',          route: '/safety' },
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
      links: [
        { label: 'Schedule a Consultation', route: '/contact?subject=energy' },
        { label: 'Why Solar',               route: '/energy/solar-panels' },
        { label: 'Incentives',              route: '/offers' },
        { label: 'Support',                 route: '/contact?subject=service' },
        { label: 'Commercial',              route: '/energy/megapack' },
        { label: 'Utilities',               route: '/energy/megapack' },
      ],
    },
  },
  {
    label: 'Charging',
    megaMenu: {
      featured: [
        { name: 'Supercharger',  img: `${BASE}tesla-supercharger-new.jpg` },
        { name: 'Home Charging', img: `${BASE}tesla-charging-station.jpg` },
      ],
      links: [
        { label: 'Help Me Charge',      route: '/charging' },
        { label: 'Charging Calculator', route: '/charging' },
        { label: 'Charging With NACS',  route: '/charging' },
        { label: 'Host a Supercharger', route: '/contact?subject=charging' },
      ],
    },
  },
  {
    label: 'Discover',
    megaMenu: {
      featured: [],
      links: [
        { label: 'Demo Drive',       route: '/contact?subject=demo' },
        { label: 'Insurance',        route: '/insurance' },
        { label: 'Current Offers',   route: '/offers' },
        { label: 'Gallery',          route: '/gallery' },
        { label: 'Video Guides',     route: '/gallery' },
        { label: 'Customer Stories', route: '/gallery' },
        { label: 'Events',           route: '/contact?subject=events' },
        { label: 'Safety',           route: '/safety' },
        { label: 'Find Us',          route: '/contact' },
        { label: 'About',            route: '/about' },
        { label: 'Careers',          route: '/careers' },
      ],
    },
  },
  { label: 'Shop', route: '/shop' },
];

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 900);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 900);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

function TeslaLogo({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 342 35" width="100" height="17" fill={color} style={{ display: 'block' }}>
      <path d="M0 .1C22.4 4.9 45.1 7.4 68 7.4c22.9 0 45.6-2.5 68-7.4L136 5c-15.3 3.5-31.7 5.7-48 6.7V35h-8V11.7C63.7 10.7 47.3 8.5 32 5L0 .1zM126.4 4.9C103.7 1.7 81 0 58.3 0v6.9c15 .5 29.7 1.9 44.2 4.2L126.4 4.9zM0 4.9c22.7-3.2 45.4-4.9 68.1-4.9v6.9C53.1 7.4 38.4 8.8 23.9 11.1L0 4.9z" transform="translate(120,0)"/>
      <text x="0" y="26" fontSize="28" fontWeight="700" letterSpacing="4" fontFamily="system-ui,sans-serif">TESLA</text>
    </svg>
  );
}

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setScrolled(window.scrollY > 20);
    setActiveMenu(null);
    setDrawerOpen(false);
    setExpandedMobile(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const open = useCallback((label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  }, []);
  const close = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 130);
  }, []);
  const cancelClose = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  const isTransparent = isHome && !scrolled && activeMenu === null && !drawerOpen;
  const headerBg = isTransparent ? 'transparent' : 'rgba(255,255,255,0.97)';
  const textColor = isTransparent ? '#fff' : '#171a20';
  const isLight = isTransparent;

  function goRoute(route: string) {
    navigate(route);
    setActiveMenu(null);
    setDrawerOpen(false);
    setExpandedMobile(null);
  }

  return (
    <>
      <style>{`
        @keyframes megaFadeIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes drawerSlideIn { from{transform:translateX(100%)} to{transform:translateX(0)} }
        * { box-sizing:border-box; margin:0; padding:0; }
        button { font-family:inherit; }
        .tesla-nav-btn { background:transparent; border:none; cursor:pointer; border-radius:20px; }
        .mobile-menu-item { border:none; cursor:pointer; background:transparent; font-family:inherit; width:100%; text-align:left; }
      `}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', background: headerBg,
        backdropFilter: !isTransparent ? 'blur(12px)' : 'none',
        transition: 'background .28s ease',
        boxShadow: !isTransparent ? '0 1px 0 rgba(0,0,0,.08)' : 'none',
      }}>
        {/* Logo */}
        <button onClick={() => goRoute('/')} style={{ display: 'flex', alignItems: 'center', padding: '4px 8px', borderRadius: '4px', background: 'transparent', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
          <TeslaLogo color={textColor} />
        </button>

        {/* DESKTOP NAV */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2px', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {navItems.map(item => (
              <div key={item.label} style={{ position: 'relative' }}
                onMouseEnter={() => item.megaMenu ? open(item.label) : undefined}
                onMouseLeave={item.megaMenu ? close : undefined}
              >
                <button className="tesla-nav-btn" style={{ padding: '8px 15px', fontSize: '14px', fontWeight: 500, color: textColor, background: 'transparent', border: 'none', cursor: 'pointer', display: 'block' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = isLight ? 'rgba(255,255,255,.14)' : 'rgba(0,0,0,.06)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  onClick={() => item.route ? goRoute(item.route) : item.megaMenu ? open(item.label) : undefined}
                >{item.label}</button>
              </div>
            ))}
          </nav>
        )}

        {/* DESKTOP RIGHT ICONS */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {[
              { label: 'Help', d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z', route: '/contact?subject=general' },
              { label: 'Globe', d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z', route: '/contact?subject=general' },
              { label: 'Account', d: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z', route: '/contact?subject=general' },
            ].map(({ label, d, route }) => (
              <button key={label} title={label} onClick={() => goRoute(route)} style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'background .18s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = isLight ? 'rgba(255,255,255,.14)' : 'rgba(0,0,0,.06)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill={textColor}><path d={d}/></svg>
              </button>
            ))}
          </div>
        )}

        {/* MOBILE RIGHT */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button onClick={() => goRoute('/contact?subject=general')} style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill={textColor}><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </button>
            <button onClick={() => setDrawerOpen(true)} style={{ width: '40px', height: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '8px', padding: '8px' }}>
              {[0,1,2].map(i => (
                <span key={i} style={{ display: 'block', width: '22px', height: '2px', background: textColor, borderRadius: '1px' }} />
              ))}
            </button>
          </div>
        )}
      </header>

      {/* DESKTOP MEGA MENU */}
      {!isMobile && activeMenu && (() => {
        const item = navItems.find(n => n.label === activeMenu);
        if (!item?.megaMenu) return null;
        return (
          <div style={{ position: 'fixed', top: '56px', left: 0, right: 0, background: '#fff', boxShadow: '0 8px 32px rgba(0,0,0,.12)', padding: '28px 48px 32px', zIndex: 999, display: 'flex', gap: '48px', animation: 'megaFadeIn .18s ease' }}
            onMouseEnter={cancelClose}
            onMouseLeave={close}
          >
            {item.megaMenu.featured.length > 0 && (
              <div style={{ display: 'flex', gap: '28px', flex: 1 }}>
                {item.megaMenu.featured.map(v => {
                  const slug = VEHICLE_SLUGS[v.name];
                  const energySlug = ENERGY_SLUGS[v.name];
                  const isCharging = v.name === 'Supercharger' || v.name === 'Home Charging';
                  const getRoute = () => {
                    if (slug) return `/vehicles/${slug}`;
                    if (energySlug) return `/energy/${energySlug}`;
                    if (isCharging) return '/charging';
                    return '/contact?subject=general';
                  };
                  return (
                    <div key={v.name} style={{ textAlign: 'center', minWidth: '100px' }}>
                      <div style={{ width: '130px', height: '80px', margin: '0 auto', borderRadius: '6px', overflow: 'hidden', background: '#f5f5f5', cursor: 'pointer' }}
                        onClick={() => goRoute(getRoute())}>
                        <img src={v.img} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .3s' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                        />
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '8px', color: '#171a20' }}>{v.name}</div>
                      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '5px' }}>
                        <button onClick={() => goRoute(getRoute())} style={{ fontSize: '12px', color: '#5c5e62', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px', padding: 0 }}>Learn</button>
                        {slug && <button onClick={() => goRoute(`/configure/${slug}`)} style={{ fontSize: '12px', color: '#5c5e62', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px', padding: 0 }}>Order</button>}
                        {energySlug && <button onClick={() => goRoute(`/contact?subject=energy`)} style={{ fontSize: '12px', color: '#5c5e62', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '2px', padding: 0 }}>Order</button>}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div style={{ minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '4px' }}>
              {item.megaMenu.links.map(link => (
                <button key={link.label} onClick={() => goRoute(link.route)} style={{ fontSize: '13px', color: link.route.includes('compare') || link.route === '/gallery' ? '#171a20' : '#171a20', padding: '2px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', fontWeight: link.route.includes('compare') || link.route === '/gallery' ? 600 : 400, transition: 'color .15s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#171a20'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = link.route.includes('compare') || link.route === '/gallery' ? '#171a20' : '#171a20'}
                >{link.label}</button>
              ))}
            </div>
          </div>
        );
      })()}

      {/* MOBILE DRAWER */}
      {isMobile && (
        <>
          <div onClick={() => setDrawerOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 1998, background: 'rgba(0,0,0,.45)', opacity: drawerOpen ? 1 : 0, pointerEvents: drawerOpen ? 'all' : 'none', transition: 'opacity .3s ease' }} />
          <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(340px, 88vw)', background: '#fff', zIndex: 1999, transform: drawerOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform .3s cubic-bezier(.4,0,.2,1)', display: 'flex', flexDirection: 'column', overflowY: 'auto', boxShadow: '-8px 0 32px rgba(0,0,0,.18)' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
              <button onClick={() => goRoute('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <TeslaLogo color="#171a20" />
              </button>
              <button onClick={() => setDrawerOpen(false)} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,.06)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#171a20" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Nav */}
            <div style={{ flex: 1, padding: '8px 0' }}>
              {navItems.map(item => (
                <div key={item.label}>
                  <button className="mobile-menu-item" onClick={() => {
                    if (item.route) { goRoute(item.route); return; }
                    if (item.megaMenu) setExpandedMobile(expandedMobile === item.label ? null : item.label);
                  }} style={{ padding: '14px 24px', fontSize: '15px', fontWeight: 600, color: '#171a20', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: expandedMobile === item.label ? 'rgba(0,0,0,.04)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
                    <span>{item.label}</span>
                    {item.megaMenu && (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#5c5e62" strokeWidth="2.5" strokeLinecap="round" style={{ transform: expandedMobile === item.label ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s' }}>
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                    )}
                  </button>

                  {item.megaMenu && expandedMobile === item.label && (
                    <div style={{ background: 'rgba(0,0,0,.02)', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
                      {/* Vehicle thumbnails */}
                      {item.megaMenu.featured.length > 0 && (
                        <div style={{ display: 'flex', gap: '10px', padding: '12px 24px', overflowX: 'auto', scrollbarWidth: 'none' }}>
                          {item.megaMenu.featured.map(v => {
                            const slug = VEHICLE_SLUGS[v.name];
                            return (
                              <button key={v.name} onClick={() => slug ? goRoute(`/vehicles/${slug}`) : goRoute('/contact?subject=general')} style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'center' }}>
                                <div style={{ width: '80px', height: '52px', borderRadius: '8px', overflow: 'hidden', background: '#f0f0f0' }}>
                                  <img src={v.img} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div style={{ fontSize: '11px', fontWeight: 600, color: '#171a20', marginTop: '5px' }}>{v.name}</div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                      {/* Text links */}
                      {item.megaMenu.links.map(link => (
                        <button key={link.label} onClick={() => goRoute(link.route)} style={{ display: 'block', width: '100%', padding: '11px 24px 11px 32px', fontSize: '14px', fontWeight: link.route.includes('compare') || link.route === '/gallery' ? 600 : 400, color: link.route.includes('compare') || link.route === '/gallery' ? '#171a20' : '#5c5e62', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', borderBottom: '1px solid rgba(0,0,0,.04)' }}>
                          {link.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ padding: '20px 24px', borderTop: '1px solid #f0f0f0', flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
                <button onClick={() => goRoute('/contact?subject=general')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#5c5e62', fontFamily: 'inherit' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="#5c5e62"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  Account
                </button>
                <button onClick={() => goRoute('/contact?subject=general')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#5c5e62', fontFamily: 'inherit' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="#5c5e62"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                  Language
                </button>
              </div>
              <button onClick={() => goRoute('/contact?subject=order')} style={{ width: '100%', padding: '13px', borderRadius: '8px', background: '#171a20', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, fontFamily: 'inherit' }}>Order a Tesla</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
