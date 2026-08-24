import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => { const h = () => setM(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
}

const STATS = [
  { value: '20-40%', label: 'Average Savings vs. Traditional Insurers' },
  { value: 'Real-Time', label: 'Safety Score Monitoring' },
  { value: '< 1 min', label: 'to Get a Quote' },
  { value: '13+', label: 'States Available' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Get a Quote in the App', desc: 'Open the Tesla app and navigate to Insurance. Enter basic details and get an instant quote — no long forms, no agents, no waiting.' },
  { step: '02', title: 'Your Safety Score Matters', desc: 'Tesla Insurance uses real-time driving data from your vehicle to personalize your rate. Safe drivers pay less. Your Safety Score reflects forward collision warnings, hard braking, unsafe following distance, and other metrics.' },
  { step: '03', title: 'Activate Your Policy', desc: 'Once you\'re happy with your quote, activate your policy directly in the Tesla app. Coverage begins immediately. You can manage everything — claims, billing, coverage — from your phone.' },
  { step: '04', title: 'File Claims Seamlessly', desc: 'Tesla Insurance integrates directly with the Tesla network. In many cases, your vehicle can send collision data automatically. Tesla-trained repair technicians handle your claim using genuine Tesla parts.' },
];

const COVERAGE = [
  { name: 'Liability Coverage', desc: 'Protects you financially if you\'re responsible for injuries or property damage to others in an accident.' },
  { name: 'Collision Coverage', desc: 'Pays for repairs to your Tesla after a collision, regardless of who is at fault.' },
  { name: 'Comprehensive Coverage', desc: 'Covers non-collision damage: theft, vandalism, weather events, animal strikes, and more.' },
  { name: 'Medical Payments', desc: 'Covers medical expenses for you and your passengers after an accident.' },
  { name: 'Uninsured Motorist', desc: 'Protects you if you\'re hit by a driver with insufficient or no insurance coverage.' },
  { name: 'Roadside Assistance', desc: 'Complements your Tesla vehicle coverage with 24/7 roadside support anywhere in the U.S.' },
];

const FAQS = [
  { q: 'How does Safety Score affect my premium?', a: 'Your Safety Score is calculated based on five factors: forward collision warnings per 1,000 miles, hard braking, aggressive turning, unsafe following distance, and forced Autopilot disengagements. A higher Safety Score (max 100) translates to lower monthly premiums. Scores are recalculated monthly.' },
  { q: 'In which states is Tesla Insurance available?', a: 'Tesla Insurance is currently available in Arizona, California, Colorado, Illinois, Maryland, Minnesota, Nevada, Ohio, Oregon, Texas, Utah, Virginia, and Washington. More states are added regularly.' },
  { q: 'Can I keep my current insurer and switch later?', a: 'Yes. You can get a Tesla Insurance quote at any time and compare it to your current policy. Switching is straightforward and can be done entirely through the Tesla app.' },
  { q: 'Does Tesla Insurance cover Autopilot-assisted driving?', a: 'Yes. Tesla Insurance covers your vehicle regardless of whether Autopilot or Full Self-Driving (Supervised) is active at the time of an incident.' },
  { q: 'How are claims handled?', a: 'Claims can be filed directly in the Tesla app. Tesla Insurance coordinates with Tesla Service Centers and Collision Centers to ensure repairs are done with genuine Tesla parts and trained technicians, preserving your vehicle\'s safety and performance.' },
  { q: 'What happens if my Safety Score drops?', a: 'Your Safety Score is monitored monthly. If it drops significantly, your premium may increase at the next billing cycle. You\'ll receive in-app notifications with suggestions to improve your score.' },
];

export default function InsurancePage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [quoteForm, setQuoteForm] = useState({ vehicle: 'Model 3', zip: '', name: '' });
  const [quoteSent, setQuoteSent] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Hero */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#0d1117' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${BASE}dl-hero-model-3.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center 45%', opacity: 0.55 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,.2) 50%,rgba(0,0,0,.8) 100%)' }} />
        <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, textAlign: 'center', animation: 'fadeUp .8s ease both', padding: '0 24px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', marginBottom: '16px' }}>Tesla Insurance</p>
          <h1 style={{ fontSize: isMobile ? '40px' : '72px', fontWeight: 700, color: '#fff', letterSpacing: '-2px', lineHeight: 1.02, marginBottom: '16px' }}>Insurance Built<br/>for Teslas</h1>
          <p style={{ fontSize: isMobile ? '16px' : '20px', color: 'rgba(255,255,255,.6)', maxWidth: '540px', margin: '0 auto 48px', lineHeight: 1.65 }}>Real-time premium personalization based on how you actually drive. Better rates. Seamless claims. All in the Tesla app.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => document.getElementById('get-quote')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '15px 44px', background: '#fff', color: '#171a20', border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Get a Quote</button>
            <button onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} style={{ padding: '15px 44px', background: 'rgba(255,255,255,.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,.4)', borderRadius: '6px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', backdropFilter: 'blur(8px)' }}>How It Works</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '1px', background: '#eee' }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background: '#fff', padding: isMobile ? '24px 16px' : '36px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: 700, color: '#171a20', lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#6e7180', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div id="how-it-works" style={{ background: '#f8f9fa', padding: isMobile ? '60px 24px' : '100px 40px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: isMobile ? '30px' : '48px', fontWeight: 700, color: '#171a20', letterSpacing: '-1.5px', marginBottom: '12px' }}>How Tesla Insurance Works</h2>
            <p style={{ fontSize: '16px', color: '#6e7180' }}>Built from the ground up for Tesla owners.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
            {HOW_IT_WORKS.map(step => (
              <div key={step.step} style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #e5e7eb', display: 'flex', gap: '20px' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#e5e7eb', lineHeight: 1, flexShrink: 0, width: '48px' }}>{step.step}</div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#171a20', marginBottom: '10px' }}>{step.title}</h3>
                  <p style={{ fontSize: '14px', color: '#6e7180', lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Score Explainer */}
      <div style={{ background: '#0d1117', padding: isMobile ? '60px 24px' : '100px 40px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '60px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.16em', color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', marginBottom: '16px' }}>Real-Time Personalization</p>
            <h2 style={{ fontSize: isMobile ? '28px' : '44px', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: '16px', lineHeight: 1.15 }}>Your Safety Score<br/>Determines Your Rate</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.55)', lineHeight: 1.75, marginBottom: '24px' }}>Traditional insurers guess your risk based on demographics. Tesla Insurance knows how you actually drive — using real data from your vehicle, updated monthly.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { factor: 'Forward Collision Warnings', weight: 'Most impactful' },
                { factor: 'Hard Braking Events', weight: 'High impact' },
                { factor: 'Aggressive Turning', weight: 'Medium impact' },
                { factor: 'Unsafe Following Distance', weight: 'High impact' },
                { factor: 'Forced Autopilot Disengagements', weight: 'Medium impact' },
              ].map(f => (
                <div key={f.factor} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,.7)' }}>{f.factor}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: f.weight === 'Most impactful' ? '#5c5e62' : f.weight === 'High impact' ? '#ef4444' : '#171a20', background: f.weight === 'Most impactful' ? 'rgba(245,158,11,.12)' : f.weight === 'High impact' ? 'rgba(239,68,68,.12)' : 'rgba(62,106,225,.12)', padding: '3px 8px', borderRadius: '8px' }}>{f.weight}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: isMobile ? '200px' : '260px', height: isMobile ? '200px' : '260px', borderRadius: '50%', border: '4px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle,rgba(62,106,225,.15) 0%,transparent 70%)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: isMobile ? '56px' : '72px', fontWeight: 800, color: '#22c55e', lineHeight: 1 }}>98</div>
                <div style={{ fontSize: '14px', color: 'rgba(255,255,255,.4)', marginTop: '4px' }}>Safety Score</div>
                <div style={{ fontSize: '12px', color: '#22c55e', marginTop: '6px', fontWeight: 600 }}>Excellent Driver</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coverage */}
      <div style={{ background: '#fff', padding: isMobile ? '60px 24px' : '100px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: isMobile ? '30px' : '48px', fontWeight: 700, color: '#171a20', letterSpacing: '-1.5px', marginBottom: '12px' }}>Comprehensive Coverage</h2>
            <p style={{ fontSize: '16px', color: '#6e7180' }}>Everything you need in one policy, managed in one app.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '20px' }}>
            {COVERAGE.map(c => (
              <div key={c.name} style={{ background: '#f8f9fa', borderRadius: '14px', padding: '24px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#171a20' }}>{c.name}</h4>
                </div>
                <p style={{ fontSize: '13px', color: '#6e7180', lineHeight: 1.65, marginLeft: '28px' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Get Quote Form */}
      <div id="get-quote" style={{ background: '#f8f9fa', padding: isMobile ? '60px 24px' : '100px 40px' }}>
        <div style={{ maxWidth: '540px', margin: '0 auto', background: '#fff', borderRadius: '20px', padding: isMobile ? '32px 24px' : '52px', border: '1px solid #e5e7eb', boxShadow: '0 4px 24px rgba(0,0,0,.08)' }}>
          <h2 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 700, color: '#171a20', letterSpacing: '-1px', marginBottom: '8px', textAlign: 'center' }}>Get Your Quote</h2>
          <p style={{ fontSize: '14px', color: '#9ca3af', textAlign: 'center', marginBottom: '32px' }}>Takes less than 60 seconds. No spam, ever.</p>
          {!quoteSent ? (
            <form onSubmit={e => { e.preventDefault(); setQuoteSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Your Name</label>
                <input value={quoteForm.name} onChange={e => setQuoteForm(p => ({ ...p, name: e.target.value }))} placeholder="First & Last Name" required style={{ width: '100%', padding: '13px 16px', borderRadius: '8px', border: '1.5px solid #d1d5db', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', transition: 'border-color .15s' }} onFocus={e => e.target.style.borderColor = '#171a20'} onBlur={e => e.target.style.borderColor = '#d1d5db'} />
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>Your Tesla Vehicle</label>
                <select value={quoteForm.vehicle} onChange={e => setQuoteForm(p => ({ ...p, vehicle: e.target.value }))} style={{ width: '100%', padding: '13px 16px', borderRadius: '8px', border: '1.5px solid #d1d5db', fontSize: '14px', fontFamily: 'inherit', outline: 'none', background: '#fff', cursor: 'pointer', boxSizing: 'border-box' }}>
                  {['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck'].map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '6px' }}>ZIP Code</label>
                <input value={quoteForm.zip} onChange={e => setQuoteForm(p => ({ ...p, zip: e.target.value }))} placeholder="90210" maxLength={5} required style={{ width: '100%', padding: '13px 16px', borderRadius: '8px', border: '1.5px solid #d1d5db', fontSize: '14px', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', transition: 'border-color .15s' }} onFocus={e => e.target.style.borderColor = '#171a20'} onBlur={e => e.target.style.borderColor = '#d1d5db'} />
              </div>
              <button type="submit" style={{ padding: '15px', background: '#171a20', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginTop: '8px', transition: 'background .18s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#2d3240'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#171a20'}
              >Get My Quote →</button>
              <p style={{ fontSize: '12px', color: '#d1d5db', textAlign: 'center', margin: 0 }}>Available in select states. Terms and conditions apply.</p>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#171a20', marginBottom: '10px' }}>Quote Requested!</h3>
              <p style={{ fontSize: '15px', color: '#6e7180', marginBottom: '24px', lineHeight: 1.65 }}>A Tesla Insurance advisor will contact you at your registered email within 24 hours with your personalized rate.</p>
              <button onClick={() => navigate('/')} style={{ padding: '13px 32px', background: '#171a20', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Back to Home</button>
            </div>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: '#fff', padding: isMobile ? '60px 24px' : '100px 40px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: isMobile ? '28px' : '44px', fontWeight: 700, color: '#171a20', letterSpacing: '-1.5px', marginBottom: '10px' }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
            {FAQS.map((faq, i) => (
              <div key={faq.q} style={{ borderBottom: i < FAQS.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', fontFamily: 'inherit', textAlign: 'left' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: '#171a20', lineHeight: 1.4 }}>{faq.q}</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform .2s' }}><polyline points="6,9 12,15 18,9"/></svg>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', fontSize: '14px', color: '#6e7180', lineHeight: 1.7 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
