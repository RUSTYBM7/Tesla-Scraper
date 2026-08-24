import { useNavigate } from 'react-router-dom';
import { TeslaButton, PageShell, T } from '../components/tesla-ui';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <PageShell>
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px' }}>
        <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: T.gray, marginBottom: '16px' }}>404</p>
        <h1 style={{ fontSize: '48px', fontWeight: 700, color: T.dark, letterSpacing: '-1.5px', marginBottom: '12px' }}>Page not found</h1>
        <p style={{ fontSize: '16px', color: T.gray, marginBottom: '32px', maxWidth: '400px' }}>The page you are looking for does not exist or has been moved.</p>
        <TeslaButton variant="dark" size="lg" onClick={() => navigate('/')}>Back to Home</TeslaButton>
      </div>
    </PageShell>
  );
}
