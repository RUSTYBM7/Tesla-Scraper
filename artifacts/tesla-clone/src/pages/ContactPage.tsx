import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SUBJECTS = [
  { value: 'order', label: 'Place an Order' },
  { value: 'demo', label: 'Schedule a Demo Drive' },
  { value: 'service', label: 'Service & Support' },
  { value: 'charging', label: 'Charging Questions' },
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

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#5c5e62" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;
}
function MailIcon() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#5c5e62" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
}
function MapPinIcon() {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#5c5e62" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
}

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const formRef = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  const initialSubject = searchParams.get('subject') || 'general';
  const initialVehicle = searchParams.get('vehicle') || '';

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: initialSubject, vehicle: initialVehicle, message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.04 });
    if (formRef.current) obs.observe(formRef.current);
    return () => obs.disconnect();
  }, []);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    try {
      await fetch(`${BASE}api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    } catch { /* optimistic */ }
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
  }

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })); }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', borderRadius: '10px', fontSize: '15px',
    fontFamily: 'Inter, sans-serif', outline: 'none', transition: 'border-color .2s, box-shadow .2s',
    background: '#fff', color: '#171a20',
  };

  const contactInfo = [
    { Icon: PhoneIcon, label: 'Call Us', value: '(509) 892-7090', sub: 'Mon–Fri, 8am–8pm PT' },
    { Icon: MailIcon, label: 'Email Support', value: 'support@teslaofficial.site', sub: 'Response within 24 hours' },
    { Icon: MapPinIcon, label: 'Find a Location', value: 'teslaofficial.site', sub: 'Stores & Service Centers' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes checkPop { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
        .ct-input:focus { border-color:#171a20!important; box-shadow:0 0 0 3px rgba(23,26,32,.1)!important; }
        .ct-input-err { border-color:#e8223c!important; }
      `}</style>

      {/* Hero */}
      <div style={{ background: '#171a20', paddingTop: '100px', paddingBottom: '64px', textAlign: 'center', backgroundImage: `url(${BASE}tesla-interior-fsd.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center 60%', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(23,26,32,.85) 0%,rgba(23,26,32,.72) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.16em', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', marginBottom: '14px' }}>Get in Touch</p>
          <h1 style={{ fontSize: isMobile ? '36px' : '52px', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', marginBottom: '14px' }}>Contact Us</h1>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,.55)', maxWidth: '480px', margin: '0 auto' }}>Order a vehicle, schedule a demo drive, or ask us anything.</p>
        </div>
      </div>

      {/* Contact info bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: isMobile ? '20px' : '28px 48px', display: 'flex', gap: isMobile ? '20px' : '56px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {contactInfo.map(({ Icon, label, value, sub }) => (
            <div key={label} style={{ textAlign: 'center', minWidth: '140px' }}>
              <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}><Icon /></div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#5c5e62', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '3px' }}>{label}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#171a20' }}>{value}</div>
              <div style={{ fontSize: '11px', color: '#9a9a9a', marginTop: '2px' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: isMobile ? '40px 20px 80px' : '56px 24px 100px' }}>
        <div ref={formRef} style={{ background: '#fff', borderRadius: '20px', padding: isMobile ? '28px 20px' : '48px', boxShadow: '0 4px 40px rgba(0,0,0,.08)', opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)', transition: 'opacity .6s ease, transform .6s ease' }}>

          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '48px 20px', animation: 'fadeUp .5s ease' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', margin: '0 auto 24px', background: 'rgba(39,174,96,.1)', border: '2px solid rgba(39,174,96,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'checkPop .4s ease' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#27ae60"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#171a20', marginBottom: '10px' }}>Message Sent</h2>
              <p style={{ fontSize: '15px', color: '#5c5e62', lineHeight: 1.65, marginBottom: '6px' }}>Thank you, {form.name}. We will get back to you at <span style={{ color: '#171a20', fontWeight: 600 }}>{form.email}</span> within 24 hours.</p>
              <p style={{ fontSize: '13px', color: '#9a9a9a', marginBottom: '36px' }}>For urgent matters, call (509) 892-7090.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/')} style={{ padding: '13px 28px', borderRadius: '10px', background: '#171a20', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: '#fff', fontFamily: 'inherit' }}>Back to Home</button>
                <button onClick={() => setStatus('idle')} style={{ padding: '13px 28px', borderRadius: '10px', background: '#f4f4f4', border: '1.5px solid #e0e0e0', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: '#171a20', fontFamily: 'inherit' }}>Send Another</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 700, color: '#171a20', marginBottom: '6px' }}>Send Us a Message</h2>
              <p style={{ fontSize: '14px', color: '#9a9a9a', marginBottom: '32px' }}>Fields marked <span style={{ color: '#e8223c' }}>*</span> are required.</p>

              {/* Subject chips */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#5c5e62', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '10px' }}>Subject <span style={{ color: '#e8223c' }}>*</span></label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {SUBJECTS.map(s => (
                    <button key={s.value} type="button" onClick={() => set('subject', s.value)} style={{ padding: '8px 16px', borderRadius: '24px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .18s', background: form.subject === s.value ? '#171a20' : '#f4f4f4', color: form.subject === s.value ? '#fff' : '#5c5e62', border: form.subject === s.value ? '1.5px solid #171a20' : '1.5px solid #e0e0e0' }}>{s.label}</button>
                  ))}
                </div>
              </div>

              {/* Name + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#5c5e62', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '8px' }}>Full Name <span style={{ color: '#e8223c' }}>*</span></label>
                  <input className={`ct-input${errors.name ? ' ct-input-err' : ''}`} type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="John Smith" style={{ ...inputStyle, border: `1.5px solid ${errors.name ? '#e8223c' : '#e0e0e0'}` }} />
                  {errors.name && <p style={{ fontSize: '12px', color: '#e8223c', marginTop: '5px' }}>{errors.name}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#5c5e62', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '8px' }}>Email <span style={{ color: '#e8223c' }}>*</span></label>
                  <input className={`ct-input${errors.email ? ' ct-input-err' : ''}`} type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" style={{ ...inputStyle, border: `1.5px solid ${errors.email ? '#e8223c' : '#e0e0e0'}` }} />
                  {errors.email && <p style={{ fontSize: '12px', color: '#e8223c', marginTop: '5px' }}>{errors.email}</p>}
                </div>
              </div>

              {/* Phone + Vehicle */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#5c5e62', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '8px' }}>Phone <span style={{ fontSize: '11px', fontWeight: 400, color: '#9a9a9a', textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                  <input className="ct-input" type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+1 (509) 892-7090" style={{ ...inputStyle, border: '1.5px solid #e0e0e0' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#5c5e62', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '8px' }}>Vehicle Interest</label>
                  <select className="ct-input" value={form.vehicle} onChange={e => set('vehicle', e.target.value)} style={{ ...inputStyle, border: '1.5px solid #e0e0e0', cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%235c5e62' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}>
                    {VEHICLES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#5c5e62', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '8px' }}>Message <span style={{ color: '#e8223c' }}>*</span></label>
                <textarea className={`ct-input${errors.message ? ' ct-input-err' : ''}`} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us how we can help..." rows={5} style={{ ...inputStyle, resize: 'vertical', minHeight: '120px', border: `1.5px solid ${errors.message ? '#e8223c' : '#e0e0e0'}` }} />
                {errors.message && <p style={{ fontSize: '12px', color: '#e8223c', marginTop: '5px' }}>{errors.message}</p>}
              </div>

              <button type="submit" disabled={status === 'loading'} style={{ width: '100%', padding: '16px', borderRadius: '12px', background: '#171a20', border: 'none', cursor: status === 'loading' ? 'default' : 'pointer', fontSize: '15px', fontWeight: 700, color: '#fff', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: status === 'loading' ? 0.8 : 1, transition: 'background .2s' }}
                onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.background = '#2a2d35'; }}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#171a20'}
              >
                {status === 'loading'
                  ? <><div style={{ width: '17px', height: '17px', borderRadius: '50%', border: '2.5px solid rgba(255,255,255,.3)', borderTopColor: '#fff', animation: 'spin .7s linear infinite' }} />Sending...</>
                  : 'Send Message'}
              </button>
              <p style={{ fontSize: '12px', color: '#9a9a9a', textAlign: 'center', marginTop: '14px', lineHeight: 1.6 }}>
                By submitting you agree to our <span style={{ color: '#171a20', cursor: 'pointer', textDecoration: 'underline' }}>Privacy Policy</span>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
