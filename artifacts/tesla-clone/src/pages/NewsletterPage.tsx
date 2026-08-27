import { useState, useEffect } from 'react';
import { TeslaButton, TeslaHero, PageShell, T, inputStyle, labelStyle } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { postNewsletter, getNewsletterStats } from '../lib/api';
import Footer from '../components/Footer';

const PREFS = [
  { id: 'vehicles', label: 'Vehicle Releases' },
  { id: 'software', label: 'Software Updates' },
  { id: 'energy', label: 'Energy & Solar' },
  { id: 'charging', label: 'Charging Network' },
  { id: 'events', label: 'Events & Drives' },
  { id: 'offers', label: 'Exclusive Offers' },
];

export default function NewsletterPage() {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [prefs, setPrefs] = useState<string[]>(['vehicles']);
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    getNewsletterStats().then((r) => {
      if (r.ok) setCount(r.data.count);
    });
  }, [status]);

  const togglePref = (id: string) => {
    setPrefs((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMsg('Enter a valid email address.');
      return;
    }
    setStatus('sending');
    setErrorMsg('');
    const res = await postNewsletter({ email, name, prefs });
    if (res.ok) {
      setStatus('ok');
      setEmail('');
      setName('');
    } else {
      setStatus('error');
      setErrorMsg(res.error);
    }
  };

  return (
    <PageShell>
      <TeslaHero
        eyebrow="Stay Updated"
        title="Newsletter"
        subtitle="Product launches, software updates, and energy news — no spam."
        isMobile={isMobile}
        minHeight="320px"
      />
      <section style={{ background: T.white, padding: isMobile ? '40px 16px 80px' : '48px 40px 96px' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          {count !== null && (
            <p style={{ fontSize: '13px', color: T.gray, marginBottom: '24px', textAlign: 'center' }}>
              {count.toLocaleString()} subscriber{count === 1 ? '' : 's'}
            </p>
          )}
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {status === 'ok' && (
              <div style={{ padding: '16px', background: T.grayBg, borderRadius: '4px', fontSize: '14px', color: T.dark }}>
                You're subscribed. Watch your inbox for the latest from Tesla.
              </div>
            )}
            {status === 'error' && (
              <div style={{ padding: '16px', background: '#fef2f2', borderRadius: '4px', fontSize: '14px', color: T.red }}>{errorMsg}</div>
            )}
            <div>
              <label style={labelStyle}>Email *</label>
              <input type="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div>
              <label style={labelStyle}>Name</label>
              <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            </div>
            <div>
              <label style={{ ...labelStyle, marginBottom: '12px' }}>Interests</label>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '10px' }}>
                {PREFS.map((p) => (
                  <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: T.dark, cursor: 'pointer' }}>
                    <input type="checkbox" checked={prefs.includes(p.id)} onChange={() => togglePref(p.id)} />
                    {p.label}
                  </label>
                ))}
              </div>
            </div>
            <TeslaButton type="submit" variant="dark" size="lg" disabled={status === 'sending'}>
              {status === 'sending' ? 'Subscribing…' : 'Subscribe'}
            </TeslaButton>
          </form>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
