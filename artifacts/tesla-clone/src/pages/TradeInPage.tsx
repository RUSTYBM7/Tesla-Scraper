import { useState } from 'react';
import { TeslaButton, TeslaHero, PageShell, T, inputStyle, labelStyle } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { postContact } from '../lib/api';
import { VEHICLES } from '../data/vehicles';
import Footer from '../components/Footer';

export default function TradeInPage() {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({ name: '', email: '', phone: '', year: '', make: 'Tesla', model: 'Model 3', miles: '', condition: 'Good', notes: '' });
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
      subject: 'tradein',
      vehicle: form.model.toLowerCase().replace(/\s+/g, '-'),
      message: ['Trade-in estimate request', `${form.year} ${form.make} ${form.model}`, `Miles: ${form.miles}`, `Condition: ${form.condition}`, form.notes].filter(Boolean).join('\n'),
    });
    if (res.ok) setStatus('ok');
    else {
      setStatus('error');
      setErrorMsg(res.error);
    }
  };

  return (
    <PageShell>
      <TeslaHero eyebrow="Trade-In" title="Get an Estimate" subtitle="Educational demo form. Estimates are not binding and no vehicle is purchased through this site." isMobile={isMobile} />
      <section style={{ background: T.white, padding: isMobile ? '40px 16px 80px' : '48px 40px 96px' }}>
        <form onSubmit={submit} style={{ maxWidth: '560px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {status === 'ok' && <div style={{ padding: '16px', background: T.grayBg, borderRadius: '4px', fontSize: '14px' }}>Request received (demo only).</div>}
          {status === 'error' && <div style={{ padding: '16px', background: '#fef2f2', borderRadius: '4px', fontSize: '14px', color: T.red }}>{errorMsg}</div>}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px' }}>
            <div><label style={labelStyle}>Name *</label><input style={inputStyle} value={form.name} onChange={(e) => set('name', e.target.value)} required /></div>
            <div><label style={labelStyle}>Email *</label><input type="email" style={inputStyle} value={form.email} onChange={(e) => set('email', e.target.value)} required /></div>
          </div>
          <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={form.phone} onChange={(e) => set('phone', e.target.value)} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '14px' }}>
            <div><label style={labelStyle}>Year</label><input style={inputStyle} value={form.year} onChange={(e) => set('year', e.target.value)} placeholder="2022" /></div>
            <div><label style={labelStyle}>Make</label><input style={inputStyle} value={form.make} onChange={(e) => set('make', e.target.value)} /></div>
            <div>
              <label style={labelStyle}>Model</label>
              <select style={{ ...inputStyle, appearance: 'none' }} value={form.model} onChange={(e) => set('model', e.target.value)}>
                {VEHICLES.map((v) => <option key={v.slug}>{v.label}</option>)}
                <option>Other</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px' }}>
            <div><label style={labelStyle}>Miles</label><input style={inputStyle} value={form.miles} onChange={(e) => set('miles', e.target.value)} /></div>
            <div>
              <label style={labelStyle}>Condition</label>
              <select style={{ ...inputStyle, appearance: 'none' }} value={form.condition} onChange={(e) => set('condition', e.target.value)}>
                {['Excellent', 'Good', 'Fair', 'Poor'].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div><label style={labelStyle}>Notes</label><textarea style={{ ...inputStyle, minHeight: '90px' }} value={form.notes} onChange={(e) => set('notes', e.target.value)} /></div>
          <TeslaButton type="submit" variant="dark" size="lg" disabled={status === 'sending'}>{status === 'sending' ? 'Submitting…' : 'Request Estimate'}</TeslaButton>
        </form>
      </section>
      <Footer />
    </PageShell>
  );
}
