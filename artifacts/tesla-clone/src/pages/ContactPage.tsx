import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T, inputStyle, labelStyle } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { postContact } from '../lib/api';
import Footer from '../components/Footer';

const SUBJECTS = [
  { value: 'order', label: 'Place an Order' },
  { value: 'demo', label: 'Schedule a Demo Drive' },
  { value: 'service', label: 'Service & Support' },
  { value: 'charging', label: 'Charging Questions' },
  { value: 'careers', label: 'Careers' },
  { value: 'insurance', label: 'Insurance' },
  { value: 'energy', label: 'Energy / Solar' },
  { value: 'general', label: 'General Inquiry' },
];

const VEHICLES = [
  { value: '', label: 'Select a vehicle (optional)' },
  { value: 'model-s', label: 'Model S' },
  { value: 'model-3', label: 'Model 3' },
  { value: 'model-y', label: 'Model Y' },
  { value: 'model-x', label: 'Model X' },
  { value: 'cybertruck', label: 'Cybertruck' },
  { value: 'solar', label: 'Solar / Powerwall' },
];

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: searchParams.get('subject') || 'general',
    vehicle: searchParams.get('vehicle') || '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      setErrorMsg('Name, email, and message are required.');
      return;
    }
    setStatus('sending');
    setErrorMsg('');
    const res = await postContact(form);
    if (res.ok) setStatus('ok');
    else {
      setStatus('error');
      setErrorMsg(res.error);
    }
  };

  return (
    <PageShell>
      <TeslaHero eyebrow="Support" title="Contact" subtitle="Orders, service, charging, demo drives — we're here to help." isMobile={isMobile} minHeight="300px" />
      <section style={{ background: T.white, padding: isMobile ? '40px 16px 80px' : '48px 40px 96px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: isMobile ? '40px' : '64px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: T.dark, marginBottom: '24px' }}>Get in Touch</h2>
            {[
              { label: 'Customer Support', value: '1-888-518-3752' },
              { label: 'Roadside Assistance', value: '1-877-798-3752' },
              { label: 'Email', value: 'support@tesla.com' },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: T.gray, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{item.label}</div>
                <div style={{ fontSize: '15px', color: T.dark }}>{item.value}</div>
              </div>
            ))}
            <div style={{ marginTop: '32px', padding: '20px', background: T.grayBg, borderRadius: '4px' }}>
              <p style={{ fontSize: '14px', color: T.gray, lineHeight: 1.6 }}>
                This is an educational clone. Form submissions are handled by the edge API for demo purposes only.
              </p>
            </div>
          </div>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {status === 'ok' && (
              <div style={{ padding: '16px', background: T.grayBg, borderRadius: '4px', fontSize: '14px', color: T.dark }}>
                Message received. We'll get back to you shortly.
              </div>
            )}
            {status === 'error' && (
              <div style={{ padding: '16px', background: '#fef2f2', borderRadius: '4px', fontSize: '14px', color: T.red }}>{errorMsg}</div>
            )}
            <div>
              <label style={labelStyle}>Name *</label>
              <input style={inputStyle} value={form.name} onChange={(e) => update('name', e.target.value)} required autoComplete="name" />
            </div>
            <div>
              <label style={labelStyle}>Email *</label>
              <input type="email" style={inputStyle} value={form.email} onChange={(e) => update('email', e.target.value)} required autoComplete="email" />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input style={inputStyle} value={form.phone} onChange={(e) => update('phone', e.target.value)} autoComplete="tel" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Subject</label>
                <select style={{ ...inputStyle, appearance: 'none' }} value={form.subject} onChange={(e) => update('subject', e.target.value)}>
                  {SUBJECTS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Vehicle</label>
                <select style={{ ...inputStyle, appearance: 'none' }} value={form.vehicle} onChange={(e) => update('vehicle', e.target.value)}>
                  {VEHICLES.map((v) => (
                    <option key={v.value} value={v.value}>{v.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Message *</label>
              <textarea style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} value={form.message} onChange={(e) => update('message', e.target.value)} required />
            </div>
            <TeslaButton type="submit" variant="dark" size="lg" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </TeslaButton>
          </form>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
