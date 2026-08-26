import { useState } from 'react';
import { TeslaButton, TeslaHero, PageShell, T, inputStyle, labelStyle, TeslaBadge } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import Footer from '../components/Footer';

const MOCK_ORDERS: Record<string, { vehicle: string; status: string; steps: string[]; current: number }> = {
  'RN123456': { vehicle: 'Model Y Long Range', status: 'In Production', steps: ['Order Placed', 'In Production', 'Quality Check', 'Delivery'], current: 1 },
  'RN654321': { vehicle: 'Model 3 Performance', status: 'Ready for Delivery', steps: ['Order Placed', 'In Production', 'Quality Check', 'Delivery'], current: 3 },
};

export default function AccountPage() {
  const isMobile = useIsMobile();
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState<(typeof MOCK_ORDERS)[string] | null | 'none'>(null);

  const lookup = (e: React.FormEvent) => {
    e.preventDefault();
    const key = orderId.trim().toUpperCase();
    setResult(MOCK_ORDERS[key] || 'none');
  };

  return (
    <PageShell>
      <TeslaHero eyebrow="Account" title="Order Status" subtitle="Demo lookup only. Try RN123456 or RN654321." isMobile={isMobile} minHeight="280px" />
      <section style={{ background: T.white, padding: isMobile ? '40px 16px 80px' : '48px 40px 96px' }}>
        <form onSubmit={lookup} style={{ maxWidth: '480px', margin: '0 auto 40px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={labelStyle}>Order number</label>
            <input style={inputStyle} value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="RN123456" />
          </div>
          <TeslaButton type="submit" variant="dark">Look Up</TeslaButton>
        </form>
        {result === 'none' && (
          <p style={{ textAlign: 'center', color: T.gray, fontSize: '14px' }}>No demo order found for that number.</p>
        )}
        {result && result !== 'none' && (
          <div style={{ maxWidth: '560px', margin: '0 auto', padding: '24px', background: T.grayBg, borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', gap: '12px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 700, color: T.dark }}>{result.vehicle}</div>
                <div style={{ fontSize: '13px', color: T.gray, marginTop: '4px' }}>Order {orderId.trim().toUpperCase()}</div>
              </div>
              <TeslaBadge>{result.status}</TeslaBadge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {result.steps.map((step, i) => (
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: i <= result.current ? T.dark : T.grayLight, fontWeight: i === result.current ? 600 : 400 }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '50%', background: i <= result.current ? T.dark : T.grayBorder, color: '#fff', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </PageShell>
  );
}
