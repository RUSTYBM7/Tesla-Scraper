import { useNavigate } from 'react-router-dom';

export default function BottomBar() {
  const navigate = useNavigate();
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderTop: '1px solid rgba(0,0,0,0.06)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      gap: '12px', padding: '10px 24px',
      zIndex: 500,
    }}>
      <button onClick={() => navigate('/contact?subject=general')} style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        fontSize: '13px', fontWeight: 500, color: '#171a20',
        padding: '8px 20px', borderRadius: '6px',
        border: '1px solid rgba(0,0,0,0.12)',
        background: 'rgba(0,0,0,0.03)',
        transition: 'background 0.2s, border-color 0.2s',
        maxWidth: '380px', overflow: 'hidden', whiteSpace: 'nowrap',
        textOverflow: 'ellipsis', textDecoration: 'none', cursor: 'pointer', fontFamily: 'inherit',
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.07)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.2)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.03)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.12)'; }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#171a20" strokeWidth="1.8" strokeLinecap="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        <span>Ask a Question</span>
        <span style={{ color: '#5c5e62', fontWeight: 400, marginLeft: '2px' }}>&ldquo;What does the Tesla app do?&rdquo;</span>
      </button>
      <button onClick={() => navigate('/contact?subject=demo')} style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        fontSize: '13px', fontWeight: 500, color: '#171a20',
        padding: '8px 20px', borderRadius: '6px',
        border: '1px solid rgba(0,0,0,0.12)',
        background: 'rgba(0,0,0,0.03)',
        transition: 'background 0.2s, border-color 0.2s',
        textDecoration: 'none', cursor: 'pointer', fontFamily: 'inherit',
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.07)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.2)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.03)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.12)'; }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#3e6ae1" strokeWidth="1.8" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
        <span>Schedule a Drive Today</span>
      </button>
    </div>
  );
}
