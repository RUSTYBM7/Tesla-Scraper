import { useState } from 'react';
import { TeslaButton, TeslaHero, PageShell, T, inputStyle, labelStyle } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { postContact } from '../lib/api';
import Footer from '../components/Footer';

const PROPERTY_TYPES = ['Retail', 'Hotel / Hospitality', 'Office / Workplace', 'Municipal', 'Parking Structure', 'Travel Plaza', 'Other'];
const POWER = ['Under 500 kW available', '500 kW – 1 MW', '1–5 MW', '5+ MW', 'Unknown'];

export default function HostChargingPage() {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    property: 'Retail', address: '', city: '', state: '', zip: '',
    power: 'Unknown', stalls: '8', parking: '', notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async () => {
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
      message: [
        'Host a Supercharger application',
        `Company: ${form.company}`,
        `Property: ${form.property}`,
        `Address: ${form.address}, ${form.city}, ${form.state} ${form.zip}`,
        `Power: ${form.power}`,
        `Desired stalls: ${form.stalls}`,
        `Parking: ${form.parking}`,
        form.notes,
      ].filter(Boolean).join('\n'),
    });
    if (res.ok) setStatus('ok');
    else {
      setStatus('error');
      setErrorMsg(res.error);
    }
  };

  return (
    <PageShell>
      <TeslaHero
        eyebrow="Supercharger"
        title="Host a Supercharger"
        subtitle="Bring high-power charging to your property and attract Tesla drivers."
        isMobile={isMobile}
      />

      <section style={{ background: T.white, padding: isMobile ? '40px 16px' : '48px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '20px', marginBottom: '48px' }}>
          {[
            { t: 'Attract Customers', d: 'Drivers often spend 15–30 minutes nearby while charging.' },
            { t: 'Tesla Operates', d: 'Site assessment, equipment, and network operations handled by Tesla.' },
            { t: 'Future-Ready', d: 'V3 and V4 hardware with power sharing and occupancy management.' },
          ].map((c) => (
            <div key={c.t} style={{ padding: '24px', background: T.grayBg, borderRadius: '4px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: T.dark, marginBottom: '8px' }}>{c.t}</h3>
              <p style={{ fontSize: '14px', color: T.gray, lineHeight: 1.6 }}>{c.d}</p>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', justifyContent: 'center' }}>
            {['Contact', 'Site', 'Power', 'Review'].map((label, i) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 700,
                  background: i <= step ? T.dark : T.grayBorder,
                  color: i <= step ? '#fff' : T.gray,
                }}>{i + 1}</div>
                {!isMobile && <span style={{ fontSize: '13px', color: i === step ? T.dark : T.gray, fontWeight: i === step ? 600 : 400 }}>{label}</span>}
              </div>
            ))}
          </div>

          {status === 'ok' && (
            <div style={{ padding: '24px', background: T.grayBg, borderRadius: '4px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: T.dark, marginBottom: '8px' }}>Application received</h3>
              <p style={{ fontSize: '14px', color: T.gray }}>A Tesla site development specialist will review your location and follow up.</p>
            </div>
          )}

          {status !== 'ok' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {status === 'error' && <div style={{ padding: '14px', background: '#fef2f2', borderRadius: '4px', fontSize: '14px', color: T.red }}>{errorMsg}</div>}

              {step === 0 && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px' }}>
                    <div><label style={labelStyle}>Full name *</label><input style={inputStyle} value={form.name} onChange={(e) => set('name', e.target.value)} /></div>
                    <div><label style={labelStyle}>Email *</label><input type="email" style={inputStyle} value={form.email} onChange={(e) => set('email', e.target.value)} /></div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px' }}>
                    <div><label style={labelStyle}>Phone</label><input style={inputStyle} value={form.phone} onChange={(e) => set('phone', e.target.value)} /></div>
                    <div><label style={labelStyle}>Company</label><input style={inputStyle} value={form.company} onChange={(e) => set('company', e.target.value)} /></div>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <div>
                    <label style={labelStyle}>Property type</label>
                    <select style={{ ...inputStyle, appearance: 'none' }} value={form.property} onChange={(e) => set('property', e.target.value)}>
                      {PROPERTY_TYPES.map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div><label style={labelStyle}>Street address</label><input style={inputStyle} value={form.address} onChange={(e) => set('address', e.target.value)} /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr', gap: '14px' }}>
                    <div><label style={labelStyle}>City</label><input style={inputStyle} value={form.city} onChange={(e) => set('city', e.target.value)} /></div>
                    <div><label style={labelStyle}>State</label><input style={inputStyle} value={form.state} onChange={(e) => set('state', e.target.value)} /></div>
                    <div><label style={labelStyle}>ZIP</label><input style={inputStyle} value={form.zip} onChange={(e) => set('zip', e.target.value)} /></div>
                  </div>
                  <div><label style={labelStyle}>Parking capacity</label><input style={inputStyle} value={form.parking} onChange={(e) => set('parking', e.target.value)} placeholder="e.g. 200 spaces" /></div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label style={labelStyle}>Available electrical capacity</label>
                    <select style={{ ...inputStyle, appearance: 'none' }} value={form.power} onChange={(e) => set('power', e.target.value)}>
                      {POWER.map((p) => <option key={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Desired stalls</label>
                    <select style={{ ...inputStyle, appearance: 'none' }} value={form.stalls} onChange={(e) => set('stalls', e.target.value)}>
                      {['4', '8', '12', '16', '20+'].map((n) => <option key={n}>{n}</option>)}
                    </select>
                  </div>
                  <div><label style={labelStyle}>Additional notes</label><textarea style={{ ...inputStyle, minHeight: '100px' }} value={form.notes} onChange={(e) => set('notes', e.target.value)} /></div>
                </>
              )}

              {step === 3 && (
                <div style={{ background: T.grayBg, borderRadius: '4px', padding: '20px', fontSize: '14px', color: T.dark, lineHeight: 1.7 }}>
                  <div><strong>{form.name}</strong> · {form.email} · {form.phone}</div>
                  <div>{form.company}</div>
                  <div style={{ marginTop: '12px' }}>{form.property} · {form.address}, {form.city}, {form.state} {form.zip}</div>
                  <div>Power: {form.power} · Stalls: {form.stalls} · Parking: {form.parking || '—'}</div>
                  {form.notes && <div style={{ marginTop: '8px', color: T.gray }}>{form.notes}</div>}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                {step > 0 && (
                  <TeslaButton type="button" variant="outline-dark" onClick={() => setStep((s) => s - 1)}>Back</TeslaButton>
                )}
                {step < 3 && (
                  <TeslaButton type="button" variant="dark" onClick={() => setStep((s) => s + 1)}>Continue</TeslaButton>
                )}
                {step === 3 && (
                  <TeslaButton type="button" variant="dark" disabled={status === 'sending'} onClick={submit}>
                    {status === 'sending' ? 'Submitting…' : 'Submit Application'}
                  </TeslaButton>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
