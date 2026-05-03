import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => { const h = () => setM(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
}

const SUPERCHARGER_STATS = [
  { value: '50,000+', label: 'Superchargers Worldwide' },
  { value: '6,000+', label: 'Supercharger Stations' },
  { value: '15 min', label: 'Avg. to Add 200 Miles' },
  { value: '99.97%', label: 'Network Uptime' },
];

const HOME_OPTIONS = [
  {
    name: 'Wall Connector',
    speed: '44 miles of range per hour',
    price: '$350',
    desc: 'The fastest way to charge at home. The Wall Connector delivers up to 44 miles of range per hour and can be installed indoors or outdoors. Compatible with all Tesla vehicles and other electric vehicles with the J1772 adapter.',
    features: ['Up to 11.5 kW output', 'Wi-Fi enabled', 'Works with any electrician', 'Indoor/outdoor rated', 'Shares power between vehicles'],
  },
  {
    name: 'Mobile Connector',
    speed: 'Up to 30 miles of range per hour',
    price: '$230',
    desc: 'Charge anywhere with the Mobile Connector. Includes adapters for NEMA 5-15 and NEMA 14-50 outlets. Compact and portable — take it with you on road trips.',
    features: ['120V and 240V compatible', 'Multiple adapter support', 'Portable design', 'Includes carrying case', 'Suitable for travel'],
  },
];

const NACS_INFO = {
  title: 'The North American Charging Standard',
  body: 'Tesla\'s connector is now the official North American Charging Standard (NACS), adopted by the major U.S. automakers and the Society of Automotive Engineers (SAE). This means Tesla\'s charging network — the largest in North America — will be accessible to all EVs, further accelerating the transition to sustainable energy.',
};

export default function ChargingPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<'supercharger' | 'home'>('supercharger');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Hero */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#0a0a0a' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${BASE}tesla-supercharger-new.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center 50%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.4) 0%,rgba(0,0,0,.1) 50%,rgba(0,0,0,.7) 100%)' }} />
        <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, textAlign: 'center', animation: 'fadeUp .8s ease both', padding: '0 24px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', marginBottom: '16px' }}>Tesla Charging</p>
          <h1 style={{ fontSize: isMobile ? '40px' : '72px', fontWeight: 700, color: '#fff', letterSpacing: '-2px', lineHeight: 1.02, marginBottom: '16px' }}>Charging,<br/>Simplified.</h1>
          <p style={{ fontSize: isMobile ? '16px' : '20px', color: 'rgba(255,255,255,.65)', maxWidth: '500px', margin: '0 auto 48px' }}>The world's largest fast-charging network, plus seamless home charging — all managed from your Tesla app.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveTab('supercharger')} style={{ padding: '14px 36px', borderRadius: '4px', background: '#fff', color: '#171a20', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Find a Supercharger</button>
            <button onClick={() => setActiveTab('home')} style={{ padding: '14px 36px', borderRadius: '4px', background: 'rgba(255,255,255,.18)', color: '#fff', border: '1.5px solid rgba(255,255,255,.45)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', backdropFilter: 'blur(8px)' }}>Home Charging</button>
          </div>
        </div>
      </div>

      {/* Supercharger Stats */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${isMobile ? 2 : 4},1fr)`, gap: '1px', background: '#eee' }}>
          {SUPERCHARGER_STATS.map(s => (
            <div key={s.label} style={{ background: '#fff', padding: isMobile ? '24px 16px' : '36px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '22px' : '32px', fontWeight: 700, color: '#171a20', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#6e7180', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab selector */}
      <div style={{ background: '#f8f9fa', borderBottom: '1px solid #e5e7eb', padding: '0 24px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', gap: '0' }}>
          {(['supercharger', 'home'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '18px 28px', fontSize: '14px', fontWeight: 600, color: activeTab === tab ? '#171a20' : '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', borderBottom: activeTab === tab ? '2px solid #171a20' : '2px solid transparent', fontFamily: 'inherit', textTransform: 'capitalize', transition: 'color .15s' }}>
              {tab === 'supercharger' ? 'Supercharger' : 'Home Charging'}
            </button>
          ))}
        </div>
      </div>

      {/* Supercharger Content */}
      {activeTab === 'supercharger' && (
        <div>
          {/* Map placeholder */}
          <div style={{ background: '#1a1f2e', height: isMobile ? '280px' : '420px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${BASE}tesla-supercharger-new.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center 60%', opacity: 0.35 }} />
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '24px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              </div>
              <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>Find a Supercharger Near You</h3>
              <p style={{ color: 'rgba(255,255,255,.55)', fontSize: '14px', maxWidth: '360px', marginBottom: '24px' }}>With 6,000+ stations across North America, Europe, and Asia, you\'re never far from a fast charge.</p>
              <button onClick={() => navigate('/contact?subject=charging')} style={{ padding: '12px 32px', background: '#fff', color: '#171a20', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Open in Tesla App</button>
            </div>
          </div>

          <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '48px 20px' : '80px 40px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '32px', marginBottom: '64px' }}>
              {[
                { icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', title: 'Up to 250 kW', desc: 'V3 Superchargers can charge your Tesla at up to 250 kW — the fastest Tesla charging available today, adding up to 200 miles of range in just 15 minutes.' },
                { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title: 'Safe & Reliable', desc: 'Every Supercharger station has safety measures built in. The network operates at 99.97% uptime and Tesla constantly monitors and maintains stations worldwide.' },
                { icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 11.5 19.79 19.79 0 0 1 1 2.92 2 2 0 0 1 2.93 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.25-1.25a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z', title: 'Always Connected', desc: 'The Tesla app routes you to available Superchargers along your trip and even preconditions the battery while navigating for faster charging when you arrive.' },
                { icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 10m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0', title: 'Strategically Located', desc: 'Superchargers are placed along major highways and in city centers, near restaurants, shops, and hotels — so you can charge while you do the things you\'d do anyway.' },
              ].map(card => (
                <div key={card.title} style={{ display: 'flex', gap: '20px', padding: '28px', background: '#fff', borderRadius: '14px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#171a20" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={card.icon}/></svg>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#171a20', marginBottom: '8px' }}>{card.title}</h3>
                    <p style={{ fontSize: '14px', color: '#6e7180', lineHeight: 1.65 }}>{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* NACS Section */}
            <div style={{ background: '#0d1117', borderRadius: '20px', padding: isMobile ? '40px 24px' : '60px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.16em', color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', marginBottom: '16px' }}>Industry Standard</p>
              <h2 style={{ fontSize: isMobile ? '28px' : '44px', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: '16px' }}>{NACS_INFO.title}</h2>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.55)', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.75 }}>{NACS_INFO.body}</p>
              <button onClick={() => navigate('/contact?subject=charging')} style={{ padding: '14px 40px', background: '#fff', color: '#171a20', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Learn About NACS</button>
            </div>
          </div>
        </div>
      )}

      {/* Home Charging Content */}
      {activeTab === 'home' && (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '48px 20px' : '80px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: isMobile ? '32px' : '52px', fontWeight: 700, color: '#171a20', letterSpacing: '-1.5px', marginBottom: '12px' }}>Charge While You Sleep</h2>
            <p style={{ fontSize: '17px', color: '#6e7180', maxWidth: '480px', margin: '0 auto' }}>Most Tesla owners charge at home overnight and wake up to a full battery every morning.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px', marginBottom: '64px' }}>
            {HOME_OPTIONS.map(opt => (
              <div key={opt.name} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}>
                <div style={{ background: '#f8f9fa', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '64px', height: '100px', margin: '0 auto', background: '#171a20', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#171a20' }}>{opt.name}</h3>
                    <span style={{ fontSize: '18px', fontWeight: 700, color: '#171a20' }}>{opt.price}</span>
                  </div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#3e6ae1', marginBottom: '12px' }}>{opt.speed}</p>
                  <p style={{ fontSize: '14px', color: '#6e7180', lineHeight: 1.65, marginBottom: '20px' }}>{opt.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {opt.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#5c5e62' }}>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => navigate('/contact?subject=charging')} style={{ width: '100%', padding: '13px', background: '#171a20', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Order {opt.name}</button>
                </div>
              </div>
            ))}
          </div>

          {/* Charging tips */}
          <div style={{ background: '#f8f9fa', borderRadius: '16px', padding: isMobile ? '32px 24px' : '48px', marginBottom: '64px' }}>
            <h2 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 700, color: '#171a20', marginBottom: '24px' }}>Charging Tips</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '20px' }}>
              {[
                { tip: 'Set Charge Limit to 80%', desc: 'For daily driving, Tesla recommends keeping your battery between 20% and 80% to maximize battery longevity. Use 100% only before long trips.' },
                { tip: 'Schedule Charging Off-Peak', desc: 'Use Scheduled Charging in the Tesla app to charge overnight when electricity rates are lowest — typically between midnight and 6am.' },
                { tip: 'Precondition Your Battery', desc: 'Before long drives in cold weather, use the Tesla app to warm your battery while still plugged in to maximize range and Supercharger speed.' },
              ].map(t => (
                <div key={t.tip}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#171a20', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#171a20', marginBottom: '6px' }}>{t.tip}</h4>
                  <p style={{ fontSize: '13px', color: '#6e7180', lineHeight: 1.6 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#171a20', marginBottom: '12px' }}>Have questions about charging?</h3>
            <p style={{ fontSize: '15px', color: '#9ca3af', marginBottom: '28px' }}>Our team can help you choose the right charging solution for your home.</p>
            <button onClick={() => navigate('/contact?subject=charging')} style={{ padding: '15px 48px', background: '#171a20', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Get Charging Help</button>
          </div>
        </div>
      )}
    </div>
  );
}
