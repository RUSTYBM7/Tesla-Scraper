import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter, -apple-system, sans-serif', background: '#f8f8f8',
    }}>
      <div style={{ fontSize: '72px', fontWeight: 700, color: '#171a20', lineHeight: 1 }}>404</div>
      <div style={{ fontSize: '20px', color: '#5c5e62', marginTop: '12px', marginBottom: '32px' }}>
        Page not found
      </div>
      <button onClick={() => navigate('/')} style={{
        padding: '12px 36px', borderRadius: '4px', fontSize: '14px', fontWeight: 500,
        background: '#171a20', color: '#fff', border: 'none', cursor: 'pointer',
        transition: 'background .2s',
      }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#2a2d35'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#171a20'}
      >
        Back to Home
      </button>
    </div>
  );
}
