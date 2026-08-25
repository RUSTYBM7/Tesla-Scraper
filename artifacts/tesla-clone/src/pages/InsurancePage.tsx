import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T } from '../components/tesla-ui';
import Footer from '../components/Footer';

function useIsMobile() {
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

const STATS = [
  { value: '20–40%', label: 'Average savings vs. traditional insurers' },
  { value: 'Real-time', label: 'Safety Score monitoring' },
  { value: '< 1 min', label: 'to get a quote' },
  { value: '13+', label: 'States available' },
];

const STEPS = [
  { step: '01', title: 'Get a Quote in the App', desc: 'Open the Tesla app, enter basic details, and receive an instant quote — no long forms or agents.' },
  { step: '02', title: 'Your Safety Score Matters', desc: 'Rates are personalized using real-time driving data: forward collision warnings, hard braking, following distance, and more.' },
  { step: '03', title: 'Activate Your Policy', desc: 'Activate directly in the app. Coverage starts immediately. Manage claims, billing, and coverage from your phone.' },
  { step: '04', title: 'File Claims Seamlessly', desc: 'In many cases your vehicle can send collision data automatically. Tesla-trained technicians use genuine parts.' },
];

const COV = [
  { name: 'Liability', desc: 'Injuries or property damage to others if you are at fault.' },
  { name: 'Collision', desc: 'Repairs to your Tesla after a collision, regardless of fault.' },
  { name: 'Comprehensive', desc: 'Theft, vandalism, weather, animal strikes, and more.' },
  { name: 'Medical Payments', desc: 'Medical expenses for you and your passengers.' },
  { name: 'Uninsured Motorist', desc: 'Protection if you are hit by an underinsured driver.' },
  { name: 'Roadside Assistance', desc: '24/7 support anywhere in the U.S.' },
];

export default function InsurancePage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  return (
    <PageShell>
      <TeslaHero eyebrow="Tesla Insurance" title="Insurance Built for Tesla" subtitle="Personalized rates based on how you drive. Get a quote in under a minute." isMobile={isMobile}>
        <TeslaButton variant="light" size="lg" onClick={() => navigate('/contact?subject=insurance')}>Get a Quote</TeslaButton>
      </TeslaHero>
      <section style={{ background: T.white, padding: isMobile ? '48px 20px' : '64px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '16px' }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ textAlign: 'center', padding: '20px 12px' }}>
              <div style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 700, color: T.dark }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: T.gray, marginTop: '8px', lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background: T.grayBg, padding: isMobile ? '56px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 700, color: T.dark, textAlign: 'center', marginBottom: '48px', letterSpacing: '-0.5px' }}>How It Works</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {STEPS.map((s) => (
              <div key={s.step} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: T.grayLight, minWidth: '40px' }}>{s.step}</div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: T.dark, marginBottom: '6px' }}>{s.title}</h3>
                  <p style={{ fontSize: '15px', color: T.gray, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: T.white, padding: isMobile ? '56px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 700, color: T.dark, textAlign: 'center', marginBottom: '40px', letterSpacing: '-0.5px' }}>Coverage Options</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '20px' }}>
            {COV.map((c) => (
              <div key={c.name} style={{ padding: '24px', background: T.grayBg, borderRadius: '4px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: T.dark, marginBottom: '8px' }}>{c.name}</h4>
                <p style={{ fontSize: '13px', color: T.gray, lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: T.dark, padding: isMobile ? '56px 24px' : '72px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 700, color: T.white, marginBottom: '16px' }}>Ready for a Better Rate?</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', maxWidth: '480px', margin: '0 auto 32px' }}>Available in select states. Quote takes less than a minute.</p>
        <TeslaButton variant="light" size="lg" onClick={() => navigate('/contact?subject=insurance')}>Get a Quote</TeslaButton>
      </section>
      <Footer />
    </PageShell>
  );
}
