import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const PREFS = [
  { id: 'vehicles', label: 'New Vehicle Releases', desc: 'Model updates, new trims & launches', icon: '🚗' },
  { id: 'software', label: 'Software Updates', desc: 'FSD improvements & feature releases', icon: '📱' },
  { id: 'energy', label: 'Energy & Sustainability', desc: 'Powerwall, Solar Roof & Megapack', icon: '⚡' },
  { id: 'charging', label: 'Charging Network', desc: 'New Supercharger locations & tips', icon: '🔌' },
  { id: 'events', label: 'Events & Test Drives', desc: 'Demo drives, shows & pop-ups near you', icon: '📅' },
  { id: 'offers', label: 'Exclusive Offers', desc: 'Referral programs & limited-time deals', icon: '🎁' },
];

const NEWSLETTER_PREVIEW_ARTICLES = [
  {
    tag: 'SOFTWARE UPDATE', tagColor: '#3e6ae1',
    title: 'FSD v13.2 Is Here — Smarter City Navigation',
    desc: 'The latest Full Self-Driving release brings dramatically improved intersection handling, smoother lane changes, and enhanced pedestrian detection.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    cta: 'Read More',
  },
  {
    tag: 'NEW MODEL', tagColor: '#e8223c',
    title: 'Model 3 Highland Now Available in New Colors',
    desc: 'Ultra Red and Stealth Grey join the lineup. Configure yours today with the updated interior options.',
    img: 'https://images.unsplash.com/photo-1571987502227-9231b837d92a?w=600&q=80',
    cta: 'Configure Now',
  },
  {
    tag: 'ENERGY', tagColor: '#27ae60',
    title: 'Powerwall 3 Ships to New Regions This Month',
    desc: 'Home energy storage is expanding — 13.5 kWh capacity, integrated solar inverter, and whole-home backup.',
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
    cta: 'Learn More',
  },
];

function NewsletterPreview({ view }: { view: 'desktop' | 'mobile' }) {
  const isMobile = view === 'mobile';
  return (
    <div style={{
      width: isMobile ? '375px' : '620px',
      maxWidth: '100%',
      margin: '0 auto',
      background: '#ffffff',
      borderRadius: isMobile ? '32px' : '16px',
      overflow: 'hidden',
      boxShadow: isMobile
        ? '0 0 0 8px #1a1a2e, 0 0 0 10px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.6)'
        : '0 24px 80px rgba(0,0,0,0.5)',
      transition: 'all 0.4s ease',
      fontFamily: 'Inter, -apple-system, sans-serif',
    }}>
      {/* Email client chrome */}
      {!isMobile && (
        <div style={{ background: '#f8f8f8', borderBottom: '1px solid #e0e0e0', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />)}
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', color: '#888', border: '1px solid #e0e0e0' }}>
            📧 Tesla Weekly — What's New in Your World
          </div>
        </div>
      )}
      {isMobile && (
        <div style={{ background: '#1a1a2e', padding: '12px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>9:41 AM</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>●●●●●</div>
        </div>
      )}

      {/* Email header */}
      <div style={{ background: '#171a20', padding: isMobile ? '28px 20px' : '36px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: isMobile ? '11px' : '12px', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginBottom: '12px' }}>TESLA</div>
        <h2 style={{ fontSize: isMobile ? '22px' : '30px', fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.5px' }}>
          What's New in Your World
        </h2>
        <p style={{ fontSize: isMobile ? '13px' : '14px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>Your weekly update · May 2, 2026</p>
      </div>

      {/* Articles */}
      <div style={{ background: '#f4f4f4', padding: isMobile ? '16px' : '24px 32px' }}>
        {NEWSLETTER_PREVIEW_ARTICLES.map((art, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <div style={{ height: isMobile ? '140px' : '180px', overflow: 'hidden', background: '#e0e0e0' }}>
              <img src={art.img} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: isMobile ? '16px' : '20px 24px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: art.tagColor, marginBottom: '8px' }}>{art.tag}</div>
              <h3 style={{ fontSize: isMobile ? '15px' : '18px', fontWeight: 700, color: '#171a20', margin: '0 0 8px', lineHeight: 1.3 }}>{art.title}</h3>
              <p style={{ fontSize: isMobile ? '12px' : '14px', color: '#5c5e62', margin: '0 0 14px', lineHeight: 1.55 }}>{art.desc}</p>
              <button style={{
                padding: isMobile ? '8px 18px' : '10px 22px', borderRadius: '20px',
                background: '#171a20', border: 'none', cursor: 'pointer',
                fontSize: isMobile ? '12px' : '13px', fontWeight: 600, color: '#fff',
              }}>{art.cta} →</button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ background: '#171a20', padding: isMobile ? '20px' : '28px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: isMobile ? '10px' : '11px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
          © 2026 Tesla, Inc. · 3500 Deer Creek Road, Palo Alto, CA 94304<br />
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Manage Preferences</span> ·{' '}
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Unsubscribe</span>
        </div>
      </div>
    </div>
  );
}

export default function NewsletterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedPrefs, setSelectedPrefs] = useState<Set<string>>(new Set(['vehicles', 'software', 'offers']));
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [previewView, setPreviewView] = useState<'desktop' | 'mobile'>('desktop');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [formVis, setFormVis] = useState(false);
  const [previewVis, setPreviewVis] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('tesla_newsletter_email');
    if (stored) { setAlreadySubscribed(true); setEmail(stored); }

    const obs1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFormVis(true); }, { threshold: 0.05 });
    const obs2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setPreviewVis(true); }, { threshold: 0.05 });
    if (formRef.current) obs1.observe(formRef.current);
    if (previewRef.current) obs2.observe(previewRef.current);
    return () => { obs1.disconnect(); obs2.disconnect(); };
  }, []);

  function togglePref(id: string) {
    setSelectedPrefs(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function validate() {
    if (!email.trim()) { setErrorMsg('Please enter your email address.'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErrorMsg('Please enter a valid email address.'); return false; }
    if (selectedPrefs.size === 0) { setErrorMsg('Please select at least one newsletter topic.'); return false; }
    setErrorMsg(''); return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1600));
    localStorage.setItem('tesla_newsletter_email', email);
    localStorage.setItem('tesla_newsletter_prefs', JSON.stringify([...selectedPrefs]));
    setStatus('success');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes checkPop { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
        @keyframes successGlow { 0%,100%{box-shadow:0 0 0 0 rgba(39,174,96,0)} 50%{box-shadow:0 0 40px 8px rgba(39,174,96,0.3)} }
        .pref-card:hover { border-color: rgba(62,106,225,0.5) !important; background: rgba(62,106,225,0.08) !important; }
        .nl-input:focus { outline: none; border-color: #3e6ae1 !important; box-shadow: 0 0 0 3px rgba(62,106,225,0.2); }
        @media (max-width: 768px) {
          .nl-hero-title { font-size: 36px !important; }
          .nl-grid { grid-template-columns: 1fr !important; }
          .pref-grid { grid-template-columns: 1fr !important; }
          .nl-preview-container { padding: 24px 12px !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <div style={{
        minHeight: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '120px 24px 80px',
        background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(62,106,225,0.18) 0%, transparent 70%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Animated rings */}
        {[280, 480, 680].map((size, i) => (
          <div key={i} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: `${size}px`, height: `${size}px`,
            borderRadius: '50%', border: '1px solid rgba(62,106,225,0.08)',
            transform: 'translate(-50%, -60%)', pointerEvents: 'none',
          }} />
        ))}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '24px', background: 'rgba(62,106,225,0.15)', border: '1px solid rgba(62,106,225,0.3)', marginBottom: '28px' }}>
            <span style={{ fontSize: '14px' }}>📬</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#3e6ae1', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Tesla Newsletter</span>
          </div>
          <h1 className="nl-hero-title" style={{ fontSize: '58px', fontWeight: 700, color: '#fff', letterSpacing: '-2px', lineHeight: 1.05, marginBottom: '20px' }}>
            Stay in the<br /><span style={{ background: 'linear-gradient(90deg, #3e6ae1, #7b9ff0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fast Lane</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.45)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
            Get the latest Tesla news, software updates, and exclusive offers — curated weekly, delivered to your inbox.
          </p>
          <div style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '36px', flexWrap: 'wrap' }}>
            {[['200K+', 'Subscribers'], ['Weekly', 'Delivery'], ['No Spam', 'Ever']].map(([val, label]) => (
              <div key={val} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff' }}>{val}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="nl-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: '1200px', margin: '0 auto', padding: '64px 24px', gap: '64px', alignItems: 'start' }}>

        {/* ── Signup form ── */}
        <div ref={formRef} style={{
          opacity: formVis ? 1 : 0, transform: formVis ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', animation: 'fadeUp 0.5s ease' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 28px',
                background: 'rgba(39,174,96,0.15)', border: '2px solid rgba(39,174,96,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'successGlow 2s ease infinite',
              }}>
                <svg style={{ animation: 'checkPop 0.4s ease 0.2s both' }} width="36" height="36" viewBox="0 0 24 24" fill="#27ae60">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>You're subscribed!</h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: '8px' }}>
                Welcome aboard, {name || 'Tesla fan'}. Your first newsletter arrives this Friday.
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', marginBottom: '36px' }}>
                Sent to <span style={{ color: '#3e6ae1' }}>{email}</span>
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/')} style={{
                  padding: '12px 28px', borderRadius: '24px', background: '#3e6ae1', border: 'none',
                  cursor: 'pointer', fontSize: '14px', fontWeight: 700, color: '#fff',
                }}>Back to Home</button>
                <button onClick={() => { setStatus('idle'); setAlreadySubscribed(true); }} style={{
                  padding: '12px 28px', borderRadius: '24px', background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
                  fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.7)',
                }}>View Preview ↓</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {alreadySubscribed && (
                <div style={{
                  padding: '14px 18px', borderRadius: '12px', marginBottom: '24px',
                  background: 'rgba(39,174,96,0.12)', border: '1px solid rgba(39,174,96,0.3)',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <span style={{ fontSize: '16px' }}>✅</span>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
                    You're already subscribed! Update your preferences below.
                  </span>
                </div>
              )}

              <h2 style={{ fontSize: '26px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                {alreadySubscribed ? 'Update Your Subscription' : 'Subscribe for Free'}
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '32px' }}>
                Unsubscribe anytime. We respect your inbox.
              </p>

              {/* Name input */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  First Name <span style={{ color: 'rgba(255,255,255,0.25)' }}>(optional)</span>
                </label>
                <input className="nl-input" type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Elon" style={{
                    width: '100%', padding: '14px 18px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.06)', border: '1.5px solid rgba(255,255,255,0.12)',
                    fontSize: '15px', color: '#fff', transition: 'border-color 0.2s, box-shadow 0.2s',
                  }} />
              </div>

              {/* Email input */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Email Address <span style={{ color: '#e8223c' }}>*</span>
                </label>
                <input className="nl-input" type="email" value={email} onChange={e => { setEmail(e.target.value); setErrorMsg(''); }}
                  placeholder="you@example.com" required style={{
                    width: '100%', padding: '14px 18px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.06)', border: `1.5px solid ${errorMsg ? '#e8223c' : 'rgba(255,255,255,0.12)'}`,
                    fontSize: '15px', color: '#fff', transition: 'border-color 0.2s, box-shadow 0.2s',
                  }} />
                {errorMsg && <p style={{ fontSize: '13px', color: '#e8223c', marginTop: '8px' }}>{errorMsg}</p>}
              </div>

              {/* Preferences */}
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '14px' }}>
                  I'm interested in
                </label>
                <div className="pref-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {PREFS.map(pref => {
                    const checked = selectedPrefs.has(pref.id);
                    return (
                      <button key={pref.id} type="button" className="pref-card" onClick={() => togglePref(pref.id)} style={{
                        padding: '14px 14px', borderRadius: '12px', textAlign: 'left', cursor: 'pointer',
                        background: checked ? 'rgba(62,106,225,0.12)' : 'rgba(255,255,255,0.04)',
                        border: `1.5px solid ${checked ? 'rgba(62,106,225,0.5)' : 'rgba(255,255,255,0.1)'}`,
                        transition: 'all 0.18s ease', display: 'flex', alignItems: 'flex-start', gap: '10px',
                      }}>
                        <div style={{
                          width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0, marginTop: '1px',
                          background: checked ? '#3e6ae1' : 'rgba(255,255,255,0.1)',
                          border: `1.5px solid ${checked ? '#3e6ae1' : 'rgba(255,255,255,0.2)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.18s',
                        }}>
                          {checked && <svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>}
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: checked ? '#fff' : 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>{pref.icon}</span> {pref.label}
                          </div>
                          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '3px', lineHeight: 1.4 }}>{pref.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={status === 'loading'} style={{
                width: '100%', padding: '16px', borderRadius: '14px',
                background: status === 'loading' ? 'rgba(62,106,225,0.6)' : '#3e6ae1',
                border: 'none', cursor: status === 'loading' ? 'default' : 'pointer',
                fontSize: '16px', fontWeight: 700, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                transition: 'background 0.2s, transform 0.15s',
                boxShadow: '0 8px 24px rgba(62,106,225,0.35)',
              }}
                onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'}
              >
                {status === 'loading' ? (
                  <>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.7s linear infinite' }} />
                    Subscribing…
                  </>
                ) : alreadySubscribed ? 'Update Preferences' : 'Subscribe — It\'s Free'}
              </button>

              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: '16px', lineHeight: 1.6 }}>
                By subscribing you agree to receive marketing emails from Tesla, Inc.<br />
                You can unsubscribe at any time. View our{' '}
                <span style={{ color: '#3e6ae1', cursor: 'pointer' }}>Privacy Policy</span>.
              </p>
            </form>
          )}
        </div>

        {/* ── Preview panel ── */}
        <div ref={previewRef} style={{
          opacity: previewVis ? 1 : 0, transform: previewVis ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.6s 0.15s ease, transform 0.6s 0.15s ease',
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Newsletter Preview</h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
              See exactly what lands in your inbox.
            </p>
            {/* Toggle */}
            <div style={{
              display: 'inline-flex', background: 'rgba(255,255,255,0.06)', borderRadius: '12px',
              padding: '4px', border: '1px solid rgba(255,255,255,0.1)',
            }}>
              {(['desktop', 'mobile'] as const).map(v => (
                <button key={v} onClick={() => setPreviewView(v)} style={{
                  padding: '8px 20px', borderRadius: '9px', border: 'none', cursor: 'pointer',
                  fontSize: '13px', fontWeight: 600, transition: 'all 0.2s',
                  background: previewView === v ? '#fff' : 'transparent',
                  color: previewView === v ? '#171a20' : 'rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  {v === 'desktop' ? '🖥' : '📱'} {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="nl-preview-container" style={{
            background: 'rgba(255,255,255,0.04)', borderRadius: '20px',
            padding: '32px 24px', border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            overflow: 'hidden',
            maxHeight: '680px', overflowY: 'auto',
          }}>
            <div style={{ transform: previewView === 'desktop' ? 'scale(0.72)' : 'scale(0.85)', transformOrigin: 'top center', transition: 'transform 0.4s ease' }}>
              <NewsletterPreview view={previewView} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div style={{ background: 'rgba(255,255,255,0.03)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '32px', textAlign: 'center' }}>
          {[
            { val: 'Every Friday', label: 'Delivery Schedule' },
            { val: '< 2 min', label: 'Read Time' },
            { val: '6 Topics', label: 'Customizable' },
            { val: 'Zero Ads', label: 'Clean & Focused' },
          ].map(({ val, label }) => (
            <div key={val}>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{val}</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Back nav ── */}
      <div style={{ textAlign: 'center', padding: '40px 24px' }}>
        <button onClick={() => navigate('/')} style={{
          padding: '12px 28px', borderRadius: '24px', background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)', cursor: 'pointer',
          fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.6)',
          transition: 'background 0.18s',
        }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.14)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'}
        >← Back to Home</button>
      </div>
    </div>
  );
}
