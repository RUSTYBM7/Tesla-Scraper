import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const HIDDEN_PATHS = ['/configure/', '/contact', '/demo-drive', '/newsletter'];

/**
 * Fixed bottom action bar — Ask a Question + Schedule a Drive.
 * Hides on form-heavy routes so it does not cover CTAs; respects safe-area.
 * Scroll: hide on scroll down (past 80px), show on scroll up — lastY via ref (stable listener).
 */
export default function BottomBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 640
  );

  const pathHidden = HIDDEN_PATHS.some(
    (p) => location.pathname === p || location.pathname.startsWith(p)
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Reset bar visible + scroll baseline on route change
  useEffect(() => {
    setVisible(true);
    lastYRef.current = typeof window !== 'undefined' ? window.scrollY : 0;
  }, [location.pathname]);

  useEffect(() => {
    if (pathHidden) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const prev = lastYRef.current;
        if (y > prev + 12 && y > 80) setVisible(false);
        else if (y < prev - 8) setVisible(true);
        lastYRef.current = y;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathHidden]);

  if (pathHidden) return null;

  const btnBase: import('react').CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: isMobile ? '12px' : '13px',
    fontWeight: 600,
    color: '#171a20',
    padding: isMobile ? '10px 14px' : '10px 20px',
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0,0.12)',
    background: 'rgba(0,0,0,0.03)',
    transition: 'background 0.15s, border-color 0.15s, opacity 0.15s',
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
    flex: isMobile ? 1 : undefined,
  };

  return (
    <div
      role="region"
      aria-label="Quick actions"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 500,
        transform: visible ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform 0.25s ease',
        background: 'rgba(255,255,255,0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(0,0,0,0.08)',
        padding: '10px 16px',
        paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: isMobile ? '8px' : '12px',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.04)',
      }}
    >
      <button
        type="button"
        aria-label="Ask a question"
        onClick={() => navigate('/contact?subject=general')}
        style={{
          ...btnBase,
          maxWidth: isMobile ? undefined : '420px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0,0,0,0.07)';
          e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
          e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)';
        }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#171a20" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        <span>Ask a Question</span>
        {!isMobile && (
          <span style={{ color: '#5c5e62', fontWeight: 400, marginLeft: '2px' }}>
            &ldquo;What does the Tesla app do?&rdquo;
          </span>
        )}
      </button>

      <button
        type="button"
        aria-label="Schedule a demo drive"
        onClick={() => navigate('/demo-drive')}
        style={{
          ...btnBase,
          background: '#171a20',
          color: '#fff',
          border: '1px solid #171a20',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#171a20';
        }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
        <span>{isMobile ? 'Demo Drive' : 'Schedule a Drive Today'}</span>
      </button>
    </div>
  );
}
