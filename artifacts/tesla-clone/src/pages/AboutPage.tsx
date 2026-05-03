import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => { const h = () => setM(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
}

const MILESTONES = [
  { year: '2003', event: 'Tesla founded by Martin Eberhard and Marc Tarpenning in San Carlos, CA. Elon Musk joined as chairman of the board and lead investor.' },
  { year: '2008', event: 'Tesla Roadster becomes the first highway-legal EV to use lithium-ion battery cells and the first to achieve more than 200 miles of range per charge.' },
  { year: '2012', event: 'Model S launches — the first premium electric sedan. It receives the highest safety score ever recorded by NHTSA and wins Motor Trend Car of the Year.' },
  { year: '2015', event: 'Model X debuts with iconic Falcon Wing doors. Tesla launches Autopilot hardware suite across all vehicles, beginning the journey to full self-driving.' },
  { year: '2017', event: 'Model 3 reservation event draws 325,000 orders in 24 hours. The Gigafactory Nevada opens, producing battery cells at unprecedented scale.' },
  { year: '2019', event: 'Model Y unveiled. Tesla becomes the most valuable U.S. automaker by market cap. Gigafactory Shanghai begins production — completing in just 168 days.' },
  { year: '2020', event: 'Tesla joins the S&P 500. Cybertruck unveil sparks global conversation. Annual deliveries surpass 500,000 vehicles. Powerwall demand surges globally.' },
  { year: '2021', event: 'Tesla delivers 936,172 vehicles — exceeding all prior years combined. Gigafactory Berlin and Gigafactory Texas both begin production.' },
  { year: '2023', event: 'Model Y becomes the best-selling car in the world — the first EV to achieve this. Tesla\'s NACS connector adopted as the official North American standard.' },
  { year: '2024', event: 'Cybertruck deliveries begin. Tesla\'s FSD (Supervised) V12 neural net reaches 1 billion miles. Megafactory Lathrop produces 40 GWh of Megapack annually.' },
];

const STATS = [
  { value: '6M+', label: 'Vehicles Delivered' },
  { value: '50,000+', label: 'Superchargers Globally' },
  { value: '14', label: 'Gigafactories & Plants' },
  { value: '127,855', label: 'Team Members Worldwide' },
];

const LEADERSHIP = [
  { name: 'Elon Musk', title: 'CEO & Product Architect', desc: 'Drives Tesla\'s mission, product vision, and technology roadmap. Also leads SpaceX and X.' },
  { name: 'Vaibhav Taneja', title: 'Chief Financial Officer', desc: 'Oversees global financial operations, investor relations, and Tesla\'s accounting organization.' },
  { name: 'Lars Moravy', title: 'VP of Vehicle Engineering', desc: 'Leads the engineering teams responsible for Model S, 3, X, Y, Cybertruck, and future vehicles.' },
  { name: 'Drew Baglino', title: 'SVP, Powertrain & Energy', desc: 'Oversees battery technology, powertrain development, and Tesla Energy products.' },
];

const VALUES = [
  { title: 'Accelerate Sustainable Energy', desc: 'Our mission is to accelerate the world\'s transition to sustainable energy through electric vehicles, solar, and energy storage — at every scale.' },
  { title: 'First Principles Thinking', desc: 'We solve engineering problems from the ground up, not from industry convention. If the best solution doesn\'t exist, we invent it.' },
  { title: 'Vertical Integration', desc: 'Tesla designs, manufactures, and sells its own vehicles, energy products, software, and charging infrastructure — enabling faster innovation.' },
  { title: 'Open Source Patents', desc: 'In 2014, Tesla released all its patents in the spirit of advancing the electric vehicle movement. We believe the more companies building EVs, the better.' },
];

export default function AboutPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Hero */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#0d1117' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${BASE}dl-hero-model-s.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center 40%', opacity: 0.6 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.3) 50%,rgba(0,0,0,.75) 100%)' }} />
        <div style={{ position: 'absolute', top: '22%', left: 0, right: 0, textAlign: 'center', animation: 'fadeUp .8s ease both', padding: '0 24px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,.5)', textTransform: 'uppercase', marginBottom: '20px' }}>About Tesla</p>
          <h1 style={{ fontSize: isMobile ? '38px' : '68px', fontWeight: 700, color: '#fff', letterSpacing: '-2px', lineHeight: 1.05, marginBottom: '20px' }}>Accelerating the World's<br/>Transition to Sustainable Energy</h1>
          <p style={{ fontSize: isMobile ? '16px' : '20px', color: 'rgba(255,255,255,.6)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.65 }}>Tesla designs and manufactures electric vehicles, battery energy storage, solar panels, and integrated renewable energy products.</p>
        </div>
      </div>

      {/* Mission */}
      <div style={{ background: '#fff', padding: isMobile ? '60px 24px' : '100px 40px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '48px', fontWeight: 700, color: '#171a20', letterSpacing: '-1.5px', marginBottom: '24px', lineHeight: 1.1 }}>Our Mission</h2>
          <p style={{ fontSize: isMobile ? '18px' : '24px', color: '#374151', lineHeight: 1.7, fontWeight: 400, fontStyle: 'italic', borderLeft: '4px solid #171a20', paddingLeft: '24px', textAlign: 'left', marginBottom: '32px' }}>
            "Tesla's mission is to accelerate the world's transition to sustainable energy."
          </p>
          <p style={{ fontSize: '16px', color: '#6e7180', lineHeight: 1.75 }}>
            Tesla was founded in 2003 by a group of engineers who wanted to prove that people didn't need to compromise to drive electric — that electric vehicles can be better, quicker, and more fun to drive than gasoline cars. Today, Tesla builds not just all-electric vehicles but also infinitely scalable clean energy generation and storage products. Tesla believes the faster the world stops relying on fossil fuels and moves towards a zero-emission future, the better.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: '#0d1117', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '1px', background: 'rgba(255,255,255,.08)' }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background: '#0d1117', padding: isMobile ? '28px 16px' : '44px 24px', textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '28px' : '44px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div style={{ background: '#f8f9fa', padding: isMobile ? '60px 24px' : '100px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: isMobile ? '30px' : '48px', fontWeight: 700, color: '#171a20', letterSpacing: '-1.5px', marginBottom: '12px' }}>How We Think</h2>
            <p style={{ fontSize: '16px', color: '#6e7180' }}>The principles that guide everything we build.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
            {VALUES.map((v, i) => (
              <div key={v.title} style={{ background: '#fff', borderRadius: '16px', padding: '32px', border: '1px solid #e5e7eb', display: 'flex', gap: '20px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#171a20', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px', fontWeight: 700 }}>{i + 1}</div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#171a20', marginBottom: '10px' }}>{v.title}</h3>
                  <p style={{ fontSize: '14px', color: '#6e7180', lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ background: '#fff', padding: isMobile ? '60px 24px' : '100px 40px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: isMobile ? '30px' : '48px', fontWeight: 700, color: '#171a20', letterSpacing: '-1.5px', marginBottom: '12px' }}>Our Story</h2>
            <p style={{ fontSize: '16px', color: '#6e7180' }}>Two decades of innovation that changed the automotive industry forever.</p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: isMobile ? '20px' : '60px', top: 0, bottom: 0, width: '2px', background: '#e5e7eb' }} />
            {MILESTONES.map((m, i) => (
              <div key={m.year} style={{ display: 'flex', gap: isMobile ? '28px' : '40px', marginBottom: '36px', position: 'relative', paddingLeft: isMobile ? '48px' : '100px', alignItems: 'flex-start' }}>
                <div style={{ position: 'absolute', left: isMobile ? '8px' : '48px', width: '26px', height: '26px', borderRadius: '50%', background: '#171a20', border: '3px solid #fff', boxShadow: '0 0 0 3px #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', top: '0', flexShrink: 0 }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />
                </div>
                <div style={{ position: 'absolute', left: isMobile ? '0' : '0', top: '0', fontSize: '13px', fontWeight: 700, color: '#9ca3af', width: isMobile ? '40px' : '92px', textAlign: 'right', paddingRight: isMobile ? '0' : '16px' }}>
                  {!isMobile && m.year}
                </div>
                <div style={{ flex: 1, background: '#f8f9fa', borderRadius: '12px', padding: '16px 20px' }}>
                  {isMobile && <div style={{ fontSize: '12px', fontWeight: 700, color: '#3e6ae1', marginBottom: '6px' }}>{m.year}</div>}
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.65 }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div style={{ background: '#f8f9fa', padding: isMobile ? '60px 24px' : '100px 40px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: isMobile ? '30px' : '48px', fontWeight: 700, color: '#171a20', letterSpacing: '-1.5px', marginBottom: '12px' }}>Leadership</h2>
            <p style={{ fontSize: '16px', color: '#6e7180' }}>The team driving Tesla's mission forward.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '20px' }}>
            {LEADERSHIP.map(l => (
              <div key={l.name} style={{ background: '#fff', borderRadius: '14px', padding: '24px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg,#0d1117,#2d3240)', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '22px', fontWeight: 700, color: '#fff' }}>{l.name.charAt(0)}</span>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#171a20', marginBottom: '4px' }}>{l.name}</h3>
                <p style={{ fontSize: '12px', color: '#3e6ae1', fontWeight: 600, marginBottom: '8px' }}>{l.title}</p>
                <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.55 }}>{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gigafactories */}
      <div style={{ background: '#0d1117', padding: isMobile ? '60px 24px' : '100px 40px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? '30px' : '48px', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', marginBottom: '12px' }}>Built Around the World</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.5)', marginBottom: '48px', maxWidth: '480px', margin: '0 auto 48px' }}>Tesla operates manufacturing facilities on four continents, enabling global delivery and local production.</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3,1fr)', gap: '16px' }}>
            {[
              { name: 'Gigafactory Nevada', loc: 'Sparks, Nevada, USA', made: 'Battery cells, Powerwall, Megapack' },
              { name: 'Gigafactory Buffalo', loc: 'Buffalo, New York, USA', made: 'Solar Roof, Wall Connectors' },
              { name: 'Gigafactory Shanghai', loc: 'Shanghai, China', made: 'Model 3, Model Y (APAC)' },
              { name: 'Gigafactory Berlin', loc: 'Grünheide, Germany', made: 'Model Y (Europe)' },
              { name: 'Gigafactory Texas', loc: 'Austin, Texas, USA', made: 'Cybertruck, Model Y (US)' },
              { name: 'Megafactory Lathrop', loc: 'Lathrop, California, USA', made: 'Megapack (40 GWh/year)' },
            ].map(g => (
              <div key={g.name} style={{ background: 'rgba(255,255,255,.04)', borderRadius: '12px', padding: '20px', border: '1px solid rgba(255,255,255,.07)', textAlign: 'left' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{g.name}</h4>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,.4)', marginBottom: '8px' }}>{g.loc}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,.6)' }}>{g.made}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: '#fff', padding: isMobile ? '60px 24px' : '100px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: isMobile ? '28px' : '44px', fontWeight: 700, color: '#171a20', letterSpacing: '-1.5px', marginBottom: '12px' }}>Join Us on the Mission</h2>
        <p style={{ fontSize: '16px', color: '#6e7180', maxWidth: '440px', margin: '0 auto 36px' }}>Whether as a customer, employee, or investor — there are many ways to be part of the sustainable energy revolution.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/careers')} style={{ padding: '15px 48px', background: '#171a20', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>View Careers</button>
          <button onClick={() => navigate('/contact?subject=general')} style={{ padding: '15px 48px', background: '#fff', color: '#374151', border: '1.5px solid #d1d5db', borderRadius: '8px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Contact Us</button>
        </div>
      </div>
    </div>
  );
}
