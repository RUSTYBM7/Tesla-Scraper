import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => { const h = () => setM(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
}

const RATINGS = [
  { model: 'Model S', org: 'NHTSA', stars: 5, year: '2022', details: '5 stars in all categories' },
  { model: 'Model 3', org: 'NHTSA', stars: 5, year: '2023', details: '5 stars in all categories' },
  { model: 'Model Y', org: 'NHTSA', stars: 5, year: '2023', details: '5 stars in all categories' },
  { model: 'Model X', org: 'NHTSA', stars: 5, year: '2022', details: '5 stars in all categories' },
  { model: 'Cybertruck', org: 'NHTSA', stars: 5, year: '2024', details: '5 stars in all categories' },
];

const FEATURES = [
  {
    category: 'Structural',
    items: [
      { title: 'Ultra-Rigid Body', desc: 'Tesla\'s body structure is engineered to provide exceptional rigidity. The Model Y has the lowest probability of injury of any vehicle ever tested by NHTSA.' },
      { title: 'Energy-Absorbing Crumple Zones', desc: 'The front and rear crumple zones absorb and redistribute impact energy away from the passenger cabin, reducing occupant injury risk.' },
      { title: 'Low Center of Gravity', desc: 'The floor-mounted battery pack gives all Tesla vehicles an exceptionally low center of gravity, significantly reducing rollover risk compared to traditional ICE vehicles.' },
    ],
  },
  {
    category: 'Occupant Protection',
    items: [
      { title: 'Advanced Airbag System', desc: 'Multiple front, side, and curtain airbags deploy to protect all occupants. The system uses advanced sensors to determine crash severity and occupant position.' },
      { title: 'Pre-Safe Technology', desc: 'Tesla vehicles brace for impact before a collision occurs — tensioning seat belts and adjusting head restraints — to better protect occupants during a crash.' },
      { title: 'HVAC as Safety System', desc: 'The HVAC system draws in filtered air in emergency situations, providing clean air to occupants even in the presence of external hazards.' },
    ],
  },
  {
    category: 'Active Safety',
    items: [
      { title: 'Automatic Emergency Braking', desc: 'Standard on all Tesla vehicles, AEB can detect obstacles and apply the brakes automatically when a collision is imminent and the driver hasn\'t responded.' },
      { title: 'Blind Spot Monitoring', desc: 'Tesla\'s camera and ultrasonic sensor array provides 360-degree awareness, alerting drivers to vehicles in their blind spots and during lane changes.' },
      { title: 'Forward Collision Warning', desc: 'The system provides visual, audio, and haptic warnings when it detects a vehicle ahead and calculates that the closing speed poses a collision risk.' },
    ],
  },
];

const AUTOPILOT_STATS = [
  { value: '1 in 6.13M', label: 'Miles per Autopilot-involved accident' },
  { value: '1 in 978K', label: 'Miles per accident, all Tesla' },
  { value: '1 in 530K', label: 'NHTSA reported accident rate' },
  { value: '~40%', label: 'Reduction in crash rate with Autopilot' },
];

export default function SafetyPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState('Structural');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const activeFeat = FEATURES.find(f => f.category === activeCategory)!;

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Hero */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#0a0a0a' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${BASE}dl-hero-model-s.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center 45%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.5) 0%,rgba(0,0,0,.2) 50%,rgba(0,0,0,.7) 100%)' }} />
        <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, textAlign: 'center', animation: 'fadeUp .8s ease both', padding: '0 24px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,.6)', textTransform: 'uppercase', marginBottom: '16px' }}>Tesla Safety</p>
          <h1 style={{ fontSize: isMobile ? '40px' : '72px', fontWeight: 700, color: '#fff', letterSpacing: '-2px', lineHeight: 1.02, marginBottom: '16px' }}>Designed to<br/>Protect Everyone</h1>
          <p style={{ fontSize: isMobile ? '16px' : '20px', color: 'rgba(255,255,255,.65)', maxWidth: '540px', margin: '0 auto' }}>Every Tesla earns the highest safety ratings. We engineer safety into every component, from the ground up.</p>
        </div>
        <div style={{ position: 'absolute', bottom: '10%', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', padding: '0 24px', animation: 'fadeUp .8s ease .3s both' }}>
          {[{ v: '5★', l: 'NHTSA Rating' }, { v: 'IIHS', l: 'Top Safety Pick+' }, { v: '#1', l: 'Lowest Injury Probability' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '22px' : '30px', fontWeight: 700, color: '#fff' }}>{s.v}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.5)', marginTop: '2px' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* NHTSA Ratings */}
      <div style={{ background: '#fff', padding: isMobile ? '48px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: isMobile ? '30px' : '48px', fontWeight: 700, color: '#171a20', letterSpacing: '-1.5px', marginBottom: '12px' }}>NHTSA 5-Star Ratings</h2>
            <p style={{ fontSize: '16px', color: '#6e7180', maxWidth: '480px', margin: '0 auto' }}>Every Tesla vehicle has received the highest possible safety rating from the National Highway Traffic Safety Administration.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(5,1fr)', gap: '16px' }}>
            {RATINGS.map(r => (
              <div key={r.model} style={{ background: '#0d1117', borderRadius: '14px', padding: '24px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{r.model}</div>
                <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginBottom: '10px' }}>
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" width="16" height="16" fill="#5c5e62"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.4)', marginBottom: '4px' }}>{r.org} {r.year}</div>
                <div style={{ fontSize: '11px', color: '#22c55e', fontWeight: 600 }}>{r.details}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Features */}
      <div style={{ background: '#f8f9fa', padding: isMobile ? '48px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: isMobile ? '30px' : '48px', fontWeight: 700, color: '#171a20', letterSpacing: '-1.5px', marginBottom: '12px' }}>Safety by Design</h2>
            <p style={{ fontSize: '16px', color: '#6e7180' }}>Multiple layers of active and passive protection, engineered from the ground up.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
            {FEATURES.map(f => (
              <button key={f.category} onClick={() => setActiveCategory(f.category)} style={{ padding: '10px 24px', borderRadius: '24px', border: activeCategory === f.category ? '2px solid #171a20' : '1px solid #d1d5db', background: activeCategory === f.category ? '#171a20' : '#fff', color: activeCategory === f.category ? '#fff' : '#374151', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .18s' }}>
                {f.category}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '20px' }}>
            {activeFeat.items.map(item => (
              <div key={item.title} style={{ background: '#fff', borderRadius: '14px', padding: '28px', border: '1px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f4f4f4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#171a20" strokeWidth="2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#171a20', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: '#6e7180', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Autopilot Safety Stats */}
      <div style={{ background: '#0d1117', padding: isMobile ? '48px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? '30px' : '48px', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', marginBottom: '12px' }}>Autopilot Safety Data</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.5)', maxWidth: '520px', margin: '0 auto 48px', lineHeight: 1.7 }}>Tesla publishes real-world safety data every quarter. The numbers consistently show that Autopilot makes Tesla vehicles safer than the average human driver.</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '1px', background: 'rgba(255,255,255,.08)', borderRadius: '12px', overflow: 'hidden' }}>
            {AUTOPILOT_STATS.map(s => (
              <div key={s.label} style={{ background: '#0d1117', padding: '32px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: isMobile ? '18px' : '24px', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '8px' }}>{s.value}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)', lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,.25)', marginTop: '20px' }}>Data from Tesla Vehicle Safety Report Q4 2024. Comparisons based on NHTSA data.</p>
        </div>
      </div>

      {/* Pedestrian & Cyclist Safety */}
      <div style={{ background: '#fff', padding: isMobile ? '48px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '60px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: 700, color: '#171a20', letterSpacing: '-1px', marginBottom: '16px', lineHeight: 1.15 }}>Protecting Everyone<br/>on the Road</h2>
            <p style={{ fontSize: '15px', color: '#6e7180', lineHeight: 1.75, marginBottom: '16px' }}>Tesla vehicles aren't just designed to protect the people inside — they're designed to minimize harm to pedestrians and cyclists in the event of a collision.</p>
            <p style={{ fontSize: '15px', color: '#6e7180', lineHeight: 1.75, marginBottom: '24px' }}>All Tesla vehicles include automatic pedestrian and cyclist detection as part of the standard Autopilot hardware suite. The system can detect vulnerable road users and apply emergency braking before a collision occurs.</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Pedestrian AEB active at all speeds', 'Cyclist detection and protection', 'Forward and reverse collision avoidance', 'Speed-adaptive warning systems'].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#374151' }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flex: 1, background: 'linear-gradient(135deg,#f8f9fa,#e5e7eb)', borderRadius: '20px', height: isMobile ? '220px' : '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#171a20" strokeWidth="1.2" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '12px' }}>360° Safety Coverage</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: '#171a20', padding: isMobile ? '60px 24px' : '100px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: isMobile ? '30px' : '48px', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', marginBottom: '16px' }}>Experience the Safest Cars Ever Made</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.5)', maxWidth: '440px', margin: '0 auto 40px' }}>Schedule a Demo Drive and experience Tesla safety firsthand.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/contact?subject=demo')} style={{ padding: '15px 48px', background: '#fff', color: '#171a20', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Schedule a Demo Drive</button>
          <button onClick={() => navigate('/compare')} style={{ padding: '15px 48px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Compare Models</button>
        </div>
      </div>
    </div>
  );
}
