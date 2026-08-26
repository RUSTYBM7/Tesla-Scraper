import { useState } from 'react';
import { TeslaButton, TeslaHero, PageShell, T, inputStyle, labelStyle } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { postContact } from '../lib/api';
import Footer from '../components/Footer';

export default function HostChargingPage() {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: '', email: '', phone: '', property: '', city: '', notes: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      setStatus('error');
      setErrorMsg('Name and email are required.');
      return;
    }
    setStatus('sending');
    const res = await postContact({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: 'charging',
      message: ['Host a Supercharger inquiry', `Property: ${form.property}`, `City: ${form.city}`, form.notes].filter(Boolean).join('\n'),
    });
    if (res.ok) setStatus('ok');
    else {
      setStatus('error');
      setErrorMsg(res.error);
    }
  };

  return (
    <PageShell>
      <TeslaHero eyebrow="Charging" title="Host a Supercharger" subtitle="Invite high-speed charging to your property. Demo inquiry form only." isMobile={isMobile} />
      <section style={{ background: T.white, padding: isMobile ? '40px 16px 80px' : '48px 40px 96px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '40px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: T.dark, marginBottom: '12px' }}>Why host</h2>
            <ul style={{ color: T.gray, fontSize: '15px', lineHeight: 1.8 }}>
              <li>· Attract customers who charge while they visit</li>
              <li>· Tesla manages installation and operations in many programs</li>
              <li>· Educational overview — not an official application portal</li>
            </ul>
          </div>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {status === 'ok' && <div style={{ padding: '16px', background: T.grayBg, borderRadius: '4px', fontSize: '14px' }}>Inquiry received (demo).</div>}
            {status === 'error' && <div style={{ padding: '16px', background: '#fef2f2', borderRadius: '4px', fontSize: '14px', color: T.red }}>{errorMsg}</div>}
            <div><label style={labelStyle}>Name *</label><input style={inputStyle} value={form.name} onChange={(e) => set('name', e.target.value)} required /></div>
            <div><label style={labelStyle}>Email *</label><input type="email" style={inputStyle} value={form.email} onChange={(e) => set('email', e.target.value)} required /></div>
            <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={form.phone} onChange={(e) => set('phone', e.target.value)} /></div>
            <div><label style={labelStyle}>Property type</label><input style={inputStyle} value={form.property} onChange={(e) => set('property', e.target.value)} placeholder="Retail, hotel, office…" /></div>
            <div><label style={labelStyle}>City</label><input style={inputStyle} value={form.city} onChange={(e) => set('city', e.target.value)} /></div>
            <div><label style={labelStyle}>Notes</label><textarea style={{ ...inputStyle, minHeight: '80px' }} value={form.notes} onChange={(e) => set('notes', e.target.value)} /></div>
            <TeslaButton type="submit" variant="dark" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Submit Inquiry'}</TeslaButton>
          </form>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
