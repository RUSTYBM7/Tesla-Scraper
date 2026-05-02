export default function BottomBar() {
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(8px)',
      borderTop: '1px solid rgba(0,0,0,0.08)',
      display: 'flex', justifyContent: 'center', gap: '24px',
      padding: '12px 24px',
      zIndex: 100,
    }}>
      <a href="#" style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        fontSize: '13px', fontWeight: 500, color: '#171a20',
        padding: '6px 16px', borderRadius: '4px',
        border: '1px solid rgba(0,0,0,0.15)',
        background: 'rgba(0,0,0,0.04)',
        transition: 'background 0.2s',
      }}
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.08)'}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.04)'}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#171a20">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
          <path d="M6 9.5h12v1H6zM6 12.5h8v1H6z" />
        </svg>
        Ask a Question &nbsp;<span style={{ color: '#5c5e62', fontWeight: 400 }}>"What does the Tesla app do?"</span>
      </a>
      <a href="#" style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        fontSize: '13px', fontWeight: 500, color: '#171a20',
        padding: '6px 16px', borderRadius: '4px',
        border: '1px solid rgba(0,0,0,0.15)',
        background: 'rgba(0,0,0,0.04)',
        transition: 'background 0.2s',
      }}
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.08)'}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.04)'}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#3e6ae1">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#3e6ae1" strokeWidth="2" />
          <path d="M12 7v5l3 3" stroke="#3e6ae1" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
        Schedule a Drive Today
      </a>
    </div>
  );
}
