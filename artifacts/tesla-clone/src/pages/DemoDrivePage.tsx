import { useState } from 'react';
import { TeslaButton, TeslaHero, PageShell, T, inputStyle, labelStyle } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { postContact } from '../lib/api';
import Footer from '../components/Footer';

const VEHICLES = ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'];

export default function DemoDrivePage() {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: '', email: '', phone: '', vehicle: 'Model 3', date: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

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
      subject: 'demo',
      vehicle: form.vehicle.toLowerCase().replace(' ', '-'),
      message: [`Demo drive request`, `Preferred vehicle: ${form.vehicle}`, form.date && `Preferred date: ${form.date}`, form.message].filter(Boolean).join('\n'),
    });
    if (res.ok) setStatus('ok');
    else {
      setStatus('error');
      setErrorMsg(res.error);
    }
  };

  return (
    <PageShell>
      <TeslaHero eyebrow="Experience" title="Schedule a Demo Drive" subtitle="Choose a vehicle and preferred date. A Tesla Advisor will confirm your appointment." isMobile={isMobile} minHeight="300px" />
      <section style={{ background: T.white, padding: isMobile ? '40px 16px 80px' : '48px 40px 96px' }}>
        <form onSubmit={submit} style={{ maxWidth: '520px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {status === 'ok' && <div style={{ padding: '16px', background: T.grayBg, borderRadius: '4px', fontSize: '14px' }}>Request received. (Demo only.)</div>}
          {status === 'error' && <div style={{ padding: '16px', background: '#fef2f2', borderRadius: '4px', fontSize: '14px', color: T.red }}>{errorMsg}</div>}
          <div><label style={labelStyle}>Name *</label><input style={inputStyle} value={form.name} onChange={(e) => update('name', e.target.value)} required /></div>
          <div><label style={labelStyle}>Email *</label><input type="email" style={inputStyle} value={form.email} onChange={(e) => update('email', e.target.value)} required /></div>
          <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={form.phone} onChange={(e) => update('phone', e.target.value)} /></div>
          <div>
            <label style={labelStyle}>Vehicle</label>
            <select style={{ ...inputStyle, appearance: 'none' }} value={form.vehicle} onChange={(e) => update('vehicle', e.target.value)}>
              {VEHICLES.map((v) => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div><label style={labelStyle}>Preferred date</label><input type="date" style={inputStyle} value={form.date} onChange={(e) => update('date', e.target.value)} /></div>
          <div><label style={labelStyle}>Notes</label><textarea style={{ ...inputStyle, minHeight: '90px' }} value={form.message} onChange={(e) => update('message', e.target.value)} /></div>
          <TeslaButton type="submit" variant="dark" size="lg" disabled={status === 'sending'}>{status === 'sending' ? 'Submitting…' : 'Request Demo Drive'}</TeslaButton>
        </form>
      </section>
      <Footer />
    </PageShell>
  );
}
