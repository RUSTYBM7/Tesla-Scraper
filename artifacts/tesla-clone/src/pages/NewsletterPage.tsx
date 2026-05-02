import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* ──────────────────────────────────────────────────────────
   EMAIL TEMPLATE DEFINITIONS
────────────────────────────────────────────────────────── */
const EMAIL_TYPES = [
  { id: 'welcome',    icon: '🎉', label: 'Welcome Email',       freq: 'On sign-up' },
  { id: 'newsletter', icon: '📰', label: 'Weekly Newsletter',   freq: '3× per week' },
  { id: 'purchase',   icon: '✅', label: 'Purchase Confirm',    freq: 'After order' },
  { id: 'cart',       icon: '🛒', label: 'Cart Reminder',       freq: '24 hrs after' },
  { id: 'feedback',   icon: '⭐', label: 'Feedback Request',    freq: '7 days post-delivery' },
  { id: 'weekly',     icon: '📊', label: 'Weekly Check-in',     freq: 'Every Monday' },
];

const PREFS = [
  { id: 'vehicles', label: 'Vehicle Releases', icon: '🚗' },
  { id: 'software', label: 'Software Updates', icon: '📱' },
  { id: 'energy',   label: 'Energy & Solar',   icon: '⚡' },
  { id: 'charging', label: 'Charging Network', icon: '🔌' },
  { id: 'events',   label: 'Events & Drives',  icon: '📅' },
  { id: 'offers',   label: 'Exclusive Offers', icon: '🎁' },
];

/* ── Shared email shell ── */
function EmailShell({ subject, children, isMobile }: { subject: string; children: React.ReactNode; isMobile: boolean }) {
  const w = isMobile ? 375 : 600;
  return (
    <div style={{
      width: `${w}px`, maxWidth: '100%', fontFamily: 'Inter, -apple-system, sans-serif',
      background: '#fff',
      borderRadius: isMobile ? '36px' : '12px',
      overflow: 'hidden',
      boxShadow: isMobile
        ? '0 0 0 8px #1a1a2a, 0 0 0 10px rgba(255,255,255,.08), 0 32px 80px rgba(0,0,0,.6)'
        : '0 20px 60px rgba(0,0,0,.45)',
      transition: 'all 0.35s ease',
    }}>
      {/* Desktop browser chrome */}
      {!isMobile && (
        <div style={{ background: '#f0f0f0', borderBottom: '1px solid #ddd', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: '5px', padding: '4px 10px', fontSize: '11px', color: '#888', border: '1px solid #ddd' }}>
            📧 {subject}
          </div>
        </div>
      )}
      {/* Mobile status bar */}
      {isMobile && (
        <div style={{ background: '#0f0f1a', padding: '12px 16px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,.4)' }}>9:41</span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.4)' }}>●●●●●</span>
        </div>
      )}
      {children}
    </div>
  );
}

function TeslaEmailHeader({ dark = true, tagline }: { dark?: boolean; tagline?: string }) {
  return (
    <div style={{ background: dark ? '#171a20' : '#fff', padding: '28px 32px 20px', textAlign: 'center', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,.08)' : '#eee'}` }}>
      <div style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.22em', color: dark ? '#fff' : '#171a20', marginBottom: tagline ? '6px' : 0 }}>TESLA</div>
      {tagline && <div style={{ fontSize: '12px', color: dark ? 'rgba(255,255,255,.4)' : '#888' }}>{tagline}</div>}
    </div>
  );
}

function EmailBtn({ label, color = '#171a20' }: { label: string; color?: string }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <span style={{ display: 'inline-block', padding: '12px 32px', borderRadius: '4px', background: color, color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>{label}</span>
    </div>
  );
}

function EmailFooter() {
  return (
    <div style={{ background: '#f8f8f8', borderTop: '1px solid #eee', padding: '20px 32px', textAlign: 'center' }}>
      <div style={{ fontSize: '11px', color: '#aaa', lineHeight: 1.7 }}>
        © 2026 Tesla, Inc. · 3500 Deer Creek Road, Palo Alto, CA 94304<br />
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Manage Preferences</span> · <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Unsubscribe</span>
      </div>
    </div>
  );
}

/* ── 1. Welcome email ── */
function WelcomeEmail({ isMobile }: { isMobile: boolean }) {
  return (
    <EmailShell subject="Welcome to Tesla — You're In" isMobile={isMobile}>
      <TeslaEmailHeader tagline="Membership Confirmed" />
      <div style={{ padding: '32px 32px 8px', textAlign: 'center' }}>
        <div style={{ fontSize: '36px', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ fontSize: isMobile ? '20px' : '26px', fontWeight: 700, color: '#171a20', marginBottom: '12px', lineHeight: 1.2 }}>Welcome to the Tesla Community</h2>
        <p style={{ fontSize: '14px', color: '#5c5e62', lineHeight: 1.65, marginBottom: '8px' }}>
          Your account is ready. You can now configure your vehicle, track your order, manage charging, and access your software updates — all in one place.
        </p>
        <EmailBtn label="Go to My Tesla" color="#3e6ae1" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '28px' }}>
          {[{ icon: '🚗', title: 'Configure', desc: 'Build your Tesla' }, { icon: '⚡', title: 'Charging', desc: 'Find Superchargers' }, { icon: '📱', title: 'App', desc: 'Download the app' }].map(x => (
            <div key={x.title} style={{ background: '#f8f8f8', borderRadius: '10px', padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', marginBottom: '6px' }}>{x.icon}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#171a20' }}>{x.title}</div>
              <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>{x.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '24px 32px', background: '#171a20', margin: '24px 0 0' }}>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.6)', textAlign: 'center' }}>
          Questions? Visit <span style={{ color: '#3e6ae1' }}>tesla.com/support</span> or call 1-877-798-3752
        </div>
      </div>
      <EmailFooter />
    </EmailShell>
  );
}

/* ── 2. Newsletter ── */
function NewsletterEmail({ isMobile }: { isMobile: boolean }) {
  const articles = [
    { tag: 'SOFTWARE', color: '#3e6ae1', title: 'FSD v13.2 Arrives — Smarter City Driving', desc: 'Dramatically improved intersection handling, pedestrian awareness, and smoother highway transitions.', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70' },
    { tag: 'MODEL NEWS', color: '#e8223c', title: 'Model Y Gets New Interior Option', desc: 'A new all-black interior package is now available across all Model Y trims.', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&q=70' },
    { tag: 'ENERGY', color: '#27ae60', title: 'Powerwall 3 Now Ships to 12 New States', desc: 'Home energy storage is expanding. Whole-home backup with integrated solar inverter.', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=70' },
  ];
  return (
    <EmailShell subject="Tesla Weekly — What's New This Week" isMobile={isMobile}>
      <TeslaEmailHeader dark tagline={`Week of May 2, 2026`} />
      <div style={{ padding: '24px 24px 8px' }}>
        <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 700, color: '#171a20', marginBottom: '20px', textAlign: 'center' }}>What's New in Your World</h2>
        {articles.map((a, i) => (
          <div key={i} style={{ marginBottom: '16px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #eee' }}>
            <div style={{ height: isMobile ? '120px' : '150px', backgroundImage: `url(${a.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: a.color, marginBottom: '5px' }}>{a.tag}</div>
              <div style={{ fontSize: isMobile ? '13px' : '15px', fontWeight: 700, color: '#171a20', marginBottom: '6px', lineHeight: 1.3 }}>{a.title}</div>
              <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.5, marginBottom: '10px' }}>{a.desc}</div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: a.color, cursor: 'pointer' }}>Read More →</span>
            </div>
          </div>
        ))}
      </div>
      <EmailFooter />
    </EmailShell>
  );
}

/* ── 3. Purchase confirmation ── */
function PurchaseEmail({ isMobile }: { isMobile: boolean }) {
  return (
    <EmailShell subject="Order Confirmed — Your Tesla Model Y is On Its Way" isMobile={isMobile}>
      <TeslaEmailHeader tagline="Order Confirmation" />
      <div style={{ padding: '28px 28px 8px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(39,174,96,.1)', border: '2px solid rgba(39,174,96,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', fontSize: '22px' }}>✅</div>
          <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 700, color: '#171a20', marginBottom: '6px' }}>Your Order is Confirmed!</h2>
          <p style={{ fontSize: '13px', color: '#888' }}>Order #TES-2026-048291</p>
        </div>
        {/* Order details */}
        <div style={{ background: '#f8f8f8', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ background: '#171a20', padding: '14px 18px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>Model Y Long Range AWD</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)', marginTop: '2px' }}>Deep Blue Metallic · 19" Gemini Wheels</div>
          </div>
          {[
            ['Vehicle Price', '$54,990'],
            ['Destination & Doc Fee', '$1,390'],
            ['Federal Tax Credit', '−$7,500'],
            ['Est. Delivery', 'Jun 12 – Jun 28, 2026'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 18px', borderBottom: '1px solid #eee', fontSize: '13px' }}>
              <span style={{ color: '#5c5e62' }}>{k}</span>
              <span style={{ fontWeight: 600, color: k.includes('Credit') ? '#27ae60' : '#171a20' }}>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 18px', fontSize: '15px', fontWeight: 700, color: '#171a20' }}>
            <span>Total Due at Delivery</span>
            <span>$48,880</span>
          </div>
        </div>
        {/* Next steps */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#171a20', marginBottom: '12px' }}>Next Steps</div>
          {[
            { n: '1', t: 'Upload your documents', d: 'Driver\'s license & proof of insurance' },
            { n: '2', t: 'Complete financing', d: 'Finalize your loan or lease terms' },
            { n: '3', t: 'Schedule delivery', d: 'We\'ll confirm your delivery date soon' },
          ].map(x => (
            <div key={x.n} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#3e6ae1', color: '#fff', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{x.n}</div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#171a20' }}>{x.t}</div>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{x.d}</div>
              </div>
            </div>
          ))}
        </div>
        <EmailBtn label="Manage My Order" color="#3e6ae1" />
      </div>
      <EmailFooter />
    </EmailShell>
  );
}

/* ── 4. Cart reminder ── */
function CartEmail({ isMobile }: { isMobile: boolean }) {
  return (
    <EmailShell subject="You left something behind — Your Model 3 is waiting" isMobile={isMobile}>
      <TeslaEmailHeader tagline="Saved Configuration" />
      <div style={{ padding: '28px 28px 8px', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '14px' }}>🛒</div>
        <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 700, color: '#171a20', marginBottom: '8px', lineHeight: 1.2 }}>Your Model 3 is Still Waiting</h2>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px', lineHeight: 1.6 }}>
          You saved a configuration 2 days ago. Complete your order before pricing changes.
        </p>
        <div style={{ background: '#f8f8f8', borderRadius: '12px', padding: '18px', marginBottom: '16px', textAlign: 'left' }}>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#171a20', marginBottom: '10px' }}>Your Saved Build</div>
          {[['Model', 'Model 3 Performance AWD'], ['Color', 'Ultra Red'], ['Interior', 'Black'], ['Wheels', '20" Überturbine'], ['Price', '$53,240']].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #eee', fontSize: '13px' }}>
              <span style={{ color: '#888' }}>{k}</span>
              <span style={{ fontWeight: k === 'Price' ? 700 : 500, color: '#171a20' }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(232,34,60,.06)', border: '1px solid rgba(232,34,60,.2)', borderRadius: '8px', padding: '12px', marginBottom: '16px', fontSize: '13px', color: '#e8223c', fontWeight: 500 }}>
          ⏰ Your saved pricing expires in 5 days
        </div>
        <EmailBtn label="Continue Building →" color="#e8223c" />
        <div style={{ marginTop: '16px', fontSize: '12px', color: '#aaa' }}>
          Not interested? <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Clear my cart</span>
        </div>
      </div>
      <EmailFooter />
    </EmailShell>
  );
}

/* ── 5. Feedback ── */
function FeedbackEmail({ isMobile }: { isMobile: boolean }) {
  const [rating, setRating] = useState(0);
  const [hov, setHov] = useState(0);
  return (
    <EmailShell subject="How's your new Tesla? Share your experience" isMobile={isMobile}>
      <TeslaEmailHeader tagline="We'd love to hear from you" />
      <div style={{ padding: '28px 28px 8px', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '14px' }}>⭐</div>
        <h2 style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 700, color: '#171a20', marginBottom: '8px' }}>Welcome to the Tesla Family!</h2>
        <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.65, marginBottom: '24px' }}>
          It's been one week since your Model Y was delivered. How's the experience been? Your feedback helps us improve for every Tesla owner.
        </p>
        {/* Star rating */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#171a20', marginBottom: '12px' }}>Rate your delivery experience</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {[1,2,3,4,5].map(n => (
              <button key={n} onClick={() => setRating(n)} onMouseEnter={() => setHov(n)} onMouseLeave={() => setHov(0)}
                style={{ fontSize: '28px', background: 'none', border: 'none', cursor: 'pointer', transition: 'transform .15s', transform: (hov||rating) >= n ? 'scale(1.2)' : 'scale(1)' }}>
                {(hov||rating) >= n ? '⭐' : '☆'}
              </button>
            ))}
          </div>
          {rating > 0 && <div style={{ fontSize: '13px', color: '#27ae60', fontWeight: 600, marginTop: '10px' }}>{['','Poor','Fair','Good','Great','Excellent!'][rating]}</div>}
        </div>
        <div style={{ background: '#f8f8f8', borderRadius: '10px', padding: '16px', marginBottom: '16px', textAlign: 'left' }}>
          {['Overall delivery experience', 'Vehicle condition on arrival', 'Staff helpfulness'].map(q => (
            <div key={q} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee', fontSize: '12px', color: '#5c5e62' }}>
              <span>{q}</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1,2,3,4,5].map(n => <span key={n} style={{ fontSize: '14px', cursor: 'pointer' }}>☆</span>)}
              </div>
            </div>
          ))}
        </div>
        <EmailBtn label="Share Your Full Review" color="#171a20" />
      </div>
      <EmailFooter />
    </EmailShell>
  );
}

/* ── 6. Weekly check-in ── */
function WeeklyEmail({ isMobile }: { isMobile: boolean }) {
  return (
    <EmailShell subject="Your Tesla Weekly Report — Week of May 2" isMobile={isMobile}>
      <TeslaEmailHeader dark tagline="Your Weekly Report · Model Y" />
      <div style={{ padding: '24px 24px 8px' }}>
        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
          {[
            { icon: '🛣', val: '312', unit: 'miles driven' },
            { icon: '⚡', val: '98', unit: 'kWh used' },
            { icon: '🌱', val: '67', unit: 'lbs CO₂ saved' },
          ].map(s => (
            <div key={s.unit} style={{ background: '#f8f8f8', borderRadius: '10px', padding: '14px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: '20px', marginBottom: '6px' }}>{s.icon}</div>
              <div style={{ fontSize: isMobile ? '18px' : '22px', fontWeight: 700, color: '#171a20', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>{s.unit}</div>
            </div>
          ))}
        </div>
        {/* Charging summary */}
        <div style={{ background: '#171a20', borderRadius: '10px', padding: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Charging This Week</div>
          {[{ l: 'Home Charging', v: '68%', pct: 68 }, { l: 'Supercharger', v: '32%', pct: 32 }].map(c => (
            <div key={c.l} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,.6)', marginBottom: '5px' }}>
                <span>{c.l}</span><span>{c.v}</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,.15)', borderRadius: '2px' }}>
                <div style={{ height: '100%', background: '#3e6ae1', borderRadius: '2px', width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
        {/* Feature spotlight */}
        <div style={{ border: '1px solid #eee', borderRadius: '10px', padding: '16px', marginBottom: '12px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#3e6ae1', letterSpacing: '0.1em', marginBottom: '6px' }}>FEATURE SPOTLIGHT</div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#171a20', marginBottom: '5px' }}>Did you try Sentry Mode this week?</div>
          <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.55 }}>Sentry Mode recorded 3 events near your vehicle. Review recordings in the Tesla app.</div>
          <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 600, color: '#3e6ae1', cursor: 'pointer' }}>View in App →</div>
        </div>
      </div>
      <EmailFooter />
    </EmailShell>
  );
}

const EMAIL_PREVIEWS: Record<string, React.FC<{ isMobile: boolean }>> = {
  welcome: WelcomeEmail, newsletter: NewsletterEmail, purchase: PurchaseEmail,
  cart: CartEmail, feedback: FeedbackEmail, weekly: WeeklyEmail,
};

/* ──────────────────────────────────────────────────────────
   MAIN PAGE
────────────────────────────────────────────────────────── */
export default function NewsletterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedPrefs, setSelectedPrefs] = useState<Set<string>>(new Set(['vehicles', 'software', 'offers']));
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeEmailType, setActiveEmailType] = useState('welcome');
  const [previewView, setPreviewView] = useState<'desktop' | 'mobile'>('desktop');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [formVis, setFormVis] = useState(false);
  const [previewVis, setPreviewVis] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('tesla_newsletter_email');
    if (stored) { setAlreadySubscribed(true); setEmail(stored); }
    const obs1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFormVis(true); }, { threshold: 0.04 });
    const obs2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) setPreviewVis(true); }, { threshold: 0.04 });
    if (formRef.current) obs1.observe(formRef.current);
    if (previewRef.current) obs2.observe(previewRef.current);
    return () => { obs1.disconnect(); obs2.disconnect(); };
  }, []);

  function togglePref(id: string) {
    setSelectedPrefs(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErrorMsg('Please enter a valid email address.'); return; }
    if (selectedPrefs.size === 0) { setErrorMsg('Please select at least one topic.'); return; }
    setErrorMsg(''); setStatus('loading');
    await new Promise(r => setTimeout(r, 1500));
    localStorage.setItem('tesla_newsletter_email', email);
    localStorage.setItem('tesla_newsletter_prefs', JSON.stringify([...selectedPrefs]));
    setStatus('success');
  }

  const PreviewComponent = EMAIL_PREVIEWS[activeEmailType];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes checkPop { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.2)} 100%{transform:scale(1);opacity:1} }
        .nl-input { background:rgba(255,255,255,.06); border:1.5px solid rgba(255,255,255,.12); color:#fff; font-family:inherit; }
        .nl-input:focus { outline:none; border-color:#3e6ae1; box-shadow:0 0 0 3px rgba(62,106,225,.2); }
        .pref-card:hover { border-color:rgba(62,106,225,.5)!important; background:rgba(62,106,225,.08)!important; }
        .etype-btn:hover { background:rgba(255,255,255,.08)!important; }
        @media(max-width:900px){
          .nl-main-grid { grid-template-columns:1fr!important; }
          .nl-hero-title { font-size:36px!important; letter-spacing:-1px!important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <div style={{
        padding: '120px 24px 72px', textAlign: 'center',
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(62,106,225,.2) 0%,transparent 70%)',
        borderBottom: '1px solid rgba(255,255,255,.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        {[300,500,700].map(s => (
          <div key={s} style={{ position:'absolute', top:'50%', left:'50%', width:s, height:s, borderRadius:'50%', border:'1px solid rgba(62,106,225,.07)', transform:'translate(-50%,-65%)', pointerEvents:'none' }} />
        ))}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'6px 16px', borderRadius:'24px', background:'rgba(62,106,225,.15)', border:'1px solid rgba(62,106,225,.3)', marginBottom:'24px' }}>
            <span>📬</span>
            <span style={{ fontSize:'12px', fontWeight:600, color:'#3e6ae1', letterSpacing:'0.08em', textTransform:'uppercase' }}>Tesla Communications</span>
          </div>
          <h1 className="nl-hero-title" style={{ fontSize:'54px', fontWeight:700, color:'#fff', letterSpacing:'-2px', lineHeight:1.05, marginBottom:'18px' }}>
            Stay in the{' '}
            <span style={{ background:'linear-gradient(90deg,#3e6ae1,#7b9ff0)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Fast Lane</span>
          </h1>
          <p style={{ fontSize:'17px', color:'rgba(255,255,255,.45)', maxWidth:'460px', margin:'0 auto 40px', lineHeight:1.65 }}>
            Personalized Tesla updates — from software releases and new models to your weekly driving stats.
          </p>
          <div style={{ display:'flex', gap:'36px', justifyContent:'center', flexWrap:'wrap' }}>
            {[['6 Email Types','Curated for you'],['200K+','Subscribers'],['Unsubscribe','Anytime']].map(([v,l]) => (
              <div key={v}><div style={{ fontSize:'18px', fontWeight:700, color:'#fff' }}>{v}</div><div style={{ fontSize:'12px', color:'rgba(255,255,255,.35)', marginTop:'3px' }}>{l}</div></div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Email type tabs ── */}
      <div style={{ background:'rgba(255,255,255,.03)', borderBottom:'1px solid rgba(255,255,255,.06)', padding:'0 24px', overflowX:'auto' }}>
        <div style={{ display:'flex', gap:'4px', maxWidth:'1200px', margin:'0 auto', minWidth:'max-content' }}>
          {EMAIL_TYPES.map(et => (
            <button key={et.id} className="etype-btn" onClick={() => setActiveEmailType(et.id)} style={{
              padding:'14px 18px', border:'none', cursor:'pointer', fontFamily:'inherit',
              background: activeEmailType === et.id ? 'rgba(62,106,225,.12)' : 'transparent',
              borderBottom: activeEmailType === et.id ? '2px solid #3e6ae1' : '2px solid transparent',
              transition:'all .18s',
            }}>
              <div style={{ fontSize:'18px', marginBottom:'3px' }}>{et.icon}</div>
              <div style={{ fontSize:'12px', fontWeight:600, color: activeEmailType === et.id ? '#3e6ae1' : 'rgba(255,255,255,.55)', whiteSpace:'nowrap' }}>{et.label}</div>
              <div style={{ fontSize:'10px', color:'rgba(255,255,255,.3)', marginTop:'2px' }}>{et.freq}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Main grid: form + preview ── */}
      <div className="nl-main-grid" style={{ display:'grid', gridTemplateColumns:'420px 1fr', maxWidth:'1200px', margin:'0 auto', padding:'56px 24px 80px', gap:'56px', alignItems:'start' }}>

        {/* ── Sign-up form ── */}
        <div ref={formRef} style={{ opacity: formVis ? 1 : 0, transform: formVis ? 'translateY(0)' : 'translateY(28px)', transition:'opacity .6s ease, transform .6s ease' }}>
          {status === 'success' ? (
            <div style={{ textAlign:'center', padding:'48px 20px', animation:'fadeUp .5s ease' }}>
              <div style={{ width:'72px', height:'72px', borderRadius:'50%', margin:'0 auto 24px', background:'rgba(39,174,96,.12)', border:'2px solid rgba(39,174,96,.35)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg style={{ animation:'checkPop .4s ease .1s both' }} width="32" height="32" viewBox="0 0 24 24" fill="#27ae60"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </div>
              <h2 style={{ fontSize:'26px', fontWeight:700, color:'#fff', marginBottom:'10px' }}>You're subscribed!</h2>
              <p style={{ fontSize:'15px', color:'rgba(255,255,255,.5)', lineHeight:1.6, marginBottom:'6px' }}>Welcome{name ? `, ${name}` : ''}! Your first email is on its way.</p>
              <p style={{ fontSize:'13px', color:'rgba(255,255,255,.3)', marginBottom:'32px' }}>Sent to <span style={{ color:'#3e6ae1' }}>{email}</span></p>
              <div style={{ display:'flex', gap:'12px', justifyContent:'center', flexWrap:'wrap' }}>
                <button onClick={() => navigate('/')} style={{ padding:'12px 28px', borderRadius:'24px', background:'#3e6ae1', border:'none', cursor:'pointer', fontSize:'14px', fontWeight:700, color:'#fff' }}>Back to Home</button>
                <button onClick={() => setStatus('idle')} style={{ padding:'12px 28px', borderRadius:'24px', background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.15)', cursor:'pointer', fontSize:'14px', fontWeight:600, color:'rgba(255,255,255,.7)' }}>Edit Preferences</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {alreadySubscribed && (
                <div style={{ padding:'12px 16px', borderRadius:'10px', marginBottom:'20px', background:'rgba(39,174,96,.1)', border:'1px solid rgba(39,174,96,.25)', display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', color:'rgba(255,255,255,.7)' }}>
                  ✅ Already subscribed — update your preferences below.
                </div>
              )}
              <h2 style={{ fontSize:'24px', fontWeight:700, color:'#fff', marginBottom:'6px' }}>
                {alreadySubscribed ? 'Update Subscription' : 'Subscribe for Free'}
              </h2>
              <p style={{ fontSize:'13px', color:'rgba(255,255,255,.4)', marginBottom:'28px' }}>Unsubscribe anytime. No spam, ever.</p>

              {/* Name */}
              <div style={{ marginBottom:'14px' }}>
                <label style={{ display:'block', fontSize:'11px', fontWeight:600, color:'rgba(255,255,255,.45)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'7px' }}>First Name <span style={{ color:'rgba(255,255,255,.2)' }}>(optional)</span></label>
                <input className="nl-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Elon"
                  style={{ width:'100%', padding:'13px 16px', borderRadius:'10px', fontSize:'15px', transition:'border-color .2s, box-shadow .2s' }} />
              </div>

              {/* Email */}
              <div style={{ marginBottom:'24px' }}>
                <label style={{ display:'block', fontSize:'11px', fontWeight:600, color:'rgba(255,255,255,.45)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'7px' }}>Email <span style={{ color:'#e8223c' }}>*</span></label>
                <input className="nl-input" type="email" value={email} onChange={e => { setEmail(e.target.value); setErrorMsg(''); }} placeholder="you@example.com" required
                  style={{ width:'100%', padding:'13px 16px', borderRadius:'10px', fontSize:'15px', borderColor: errorMsg ? '#e8223c' : undefined, transition:'border-color .2s, box-shadow .2s' }} />
                {errorMsg && <p style={{ fontSize:'12px', color:'#e8223c', marginTop:'6px' }}>{errorMsg}</p>}
              </div>

              {/* Preferences */}
              <div style={{ marginBottom:'28px' }}>
                <label style={{ display:'block', fontSize:'11px', fontWeight:600, color:'rgba(255,255,255,.45)', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'12px' }}>Email Interests</label>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
                  {PREFS.map(p => {
                    const on = selectedPrefs.has(p.id);
                    return (
                      <button key={p.id} type="button" className="pref-card" onClick={() => togglePref(p.id)} style={{
                        padding:'11px 12px', borderRadius:'10px', textAlign:'left', cursor:'pointer',
                        background: on ? 'rgba(62,106,225,.12)' : 'rgba(255,255,255,.04)',
                        border: `1.5px solid ${on ? 'rgba(62,106,225,.5)' : 'rgba(255,255,255,.1)'}`,
                        transition:'all .18s', display:'flex', alignItems:'center', gap:'8px',
                      }}>
                        <div style={{ width:'16px', height:'16px', borderRadius:'3px', flexShrink:0, background: on ? '#3e6ae1' : 'rgba(255,255,255,.1)', border:`1.5px solid ${on ? '#3e6ae1' : 'rgba(255,255,255,.2)'}`, display:'flex', alignItems:'center', justifyContent:'center', transition:'all .18s' }}>
                          {on && <svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>}
                        </div>
                        <div>
                          <div style={{ fontSize:'12px', fontWeight:600, color: on ? '#fff' : 'rgba(255,255,255,.6)', display:'flex', alignItems:'center', gap:'4px' }}>
                            <span>{p.icon}</span> {p.label}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button type="submit" disabled={status === 'loading'} style={{
                width:'100%', padding:'15px', borderRadius:'12px',
                background: status === 'loading' ? 'rgba(62,106,225,.6)' : '#3e6ae1',
                border:'none', cursor: status === 'loading' ? 'default' : 'pointer',
                fontSize:'15px', fontWeight:700, color:'#fff', fontFamily:'inherit',
                display:'flex', alignItems:'center', justifyContent:'center', gap:'10px',
                boxShadow:'0 8px 24px rgba(62,106,225,.35)', transition:'background .2s, transform .15s',
              }}
                onMouseEnter={e => { if (status !== 'loading') (e.currentTarget as HTMLElement).style.transform='translateY(-2px)'; }}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform='translateY(0)'}
              >
                {status === 'loading'
                  ? <><div style={{ width:'17px', height:'17px', borderRadius:'50%', border:'2.5px solid rgba(255,255,255,.3)', borderTopColor:'#fff', animation:'spin .7s linear infinite' }} />Subscribing…</>
                  : alreadySubscribed ? 'Update Preferences' : "Subscribe — It's Free"}
              </button>
              <p style={{ fontSize:'11px', color:'rgba(255,255,255,.22)', textAlign:'center', marginTop:'14px', lineHeight:1.6 }}>
                By subscribing you agree to Tesla's <span style={{ color:'#3e6ae1', cursor:'pointer' }}>Privacy Policy</span>. Unsubscribe at any time.
              </p>
            </form>
          )}
        </div>

        {/* ── Email preview panel ── */}
        <div ref={previewRef} style={{ opacity: previewVis ? 1 : 0, transform: previewVis ? 'translateY(0)' : 'translateY(28px)', transition:'opacity .6s .15s ease, transform .6s .15s ease' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px', flexWrap:'wrap', gap:'12px' }}>
            <div>
              <h3 style={{ fontSize:'17px', fontWeight:700, color:'#fff', marginBottom:'3px' }}>Email Preview</h3>
              <p style={{ fontSize:'13px', color:'rgba(255,255,255,.35)' }}>
                {EMAIL_TYPES.find(t => t.id === activeEmailType)?.label} · {EMAIL_TYPES.find(t => t.id === activeEmailType)?.freq}
              </p>
            </div>
            {/* Desktop/Mobile toggle */}
            <div style={{ display:'inline-flex', background:'rgba(255,255,255,.06)', borderRadius:'10px', padding:'3px', border:'1px solid rgba(255,255,255,.1)' }}>
              {(['desktop','mobile'] as const).map(v => (
                <button key={v} onClick={() => setPreviewView(v)} style={{
                  padding:'7px 18px', borderRadius:'8px', border:'none', cursor:'pointer', fontFamily:'inherit',
                  fontSize:'12px', fontWeight:600, transition:'all .18s',
                  background: previewView === v ? '#fff' : 'transparent',
                  color: previewView === v ? '#171a20' : 'rgba(255,255,255,.4)',
                }}>
                  {v === 'desktop' ? '🖥 Desktop' : '📱 Mobile'}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            background:'rgba(255,255,255,.03)', borderRadius:'18px', border:'1px solid rgba(255,255,255,.08)',
            padding:'28px 20px', overflowY:'auto', maxHeight:'680px',
            display:'flex', justifyContent:'center', alignItems:'flex-start',
          }}>
            <div style={{ transform: previewView === 'desktop' ? 'scale(0.68)' : 'scale(0.82)', transformOrigin:'top center', transition:'transform .35s ease' }}>
              <PreviewComponent isMobile={previewView === 'mobile'} />
            </div>
          </div>

          {/* Stats bar */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginTop:'20px' }}>
            {[['Every Friday','Main Digest'],['3× / week','News Emails'],['On-event','Transactional'],['Zero Ads','Always']].map(([v,l]) => (
              <div key={v} style={{ background:'rgba(255,255,255,.04)', borderRadius:'10px', padding:'14px 12px', textAlign:'center', border:'1px solid rgba(255,255,255,.07)' }}>
                <div style={{ fontSize:'14px', fontWeight:700, color:'#fff', marginBottom:'3px' }}>{v}</div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,.3)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Back */}
      <div style={{ textAlign:'center', paddingBottom:'48px' }}>
        <button onClick={() => navigate('/')} style={{ padding:'12px 28px', borderRadius:'24px', background:'rgba(255,255,255,.07)', border:'1px solid rgba(255,255,255,.12)', cursor:'pointer', fontSize:'14px', fontWeight:600, color:'rgba(255,255,255,.55)', fontFamily:'inherit', transition:'background .18s' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,.13)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,.07)'}
        >← Back to Home</button>
      </div>
    </div>
  );
}
