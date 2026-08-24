import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T, inputStyle } from '../components/tesla-ui';
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

const DEPTS = [
  { name: 'Vehicle Engineering', openings: 1240 },
  { name: 'Software & AI', openings: 890 },
  { name: 'Manufacturing', openings: 2100 },
  { name: 'Energy', openings: 420 },
  { name: 'Sales & Service', openings: 1680 },
  { name: 'Design', openings: 180 },
  { name: 'Operations', openings: 740 },
  { name: 'Autopilot', openings: 310 },
];

const JOBS = [
  { title: 'Senior Autopilot Engineer', loc: 'Palo Alto, CA', dept: 'Software & AI' },
  { title: 'Battery Cell Engineer', loc: 'Austin, TX', dept: 'Vehicle Engineering' },
  { title: 'Production Associate', loc: 'Fremont, CA', dept: 'Manufacturing' },
  { title: 'Service Technician', loc: 'Multiple Locations', dept: 'Sales & Service' },
  { title: 'Powerwall Installer', loc: 'Nationwide', dept: 'Energy' },
  { title: 'UI/UX Designer', loc: 'Palo Alto, CA', dept: 'Design' },
];

const BENS = [
  { title: 'Competitive Equity', desc: 'Meaningful ownership through stock options and ESPP.' },
  { title: 'Health & Wellness', desc: 'Medical, dental, vision, and mental health support.' },
  { title: 'Paid Time Off', desc: 'Flexible PTO and paid parental leave.' },
  { title: 'Career Growth', desc: 'Rapid responsibility in a high-velocity environment.' },
];

export default function CareersPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [q, setQ] = useState('');

  return (
    <PageShell>
      <TeslaHero
        eyebrow="Tesla Careers"
        title={<>Build What<br />Comes Next</>}
        subtitle="Join a team of relentless innovators accelerating the world's transition to sustainable energy."
        isMobile={isMobile}
        minHeight={isMobile ? '380px' : '480px'}
      >
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '520px', width: '100%' }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search jobs..."
            style={{
              ...inputStyle,
              flex: 1,
              minWidth: '200px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
            }}
          />
          <TeslaButton variant="light" onClick={() => navigate('/contact?subject=careers')}>
            Browse All Jobs
          </TeslaButton>
        </div>
      </TeslaHero>

      <section style={{ background: T.white, padding: isMobile ? '56px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 700, color: T.dark, letterSpacing: '-1px', marginBottom: '10px' }}>
              Find Your Team
            </h2>
            <p style={{ fontSize: '16px', color: T.gray }}>We hire across every discipline.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '12px' }}>
            {DEPTS.map((d) => (
              <button
                key={d.name}
                onClick={() => navigate('/contact?subject=careers')}
                style={{
                  background: T.grayBg,
                  borderRadius: '4px',
                  padding: '24px 20px',
                  textAlign: 'left',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: T.font,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#eaeaea'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = T.grayBg; }}
              >
                <div style={{ fontSize: '15px', fontWeight: 600, color: T.dark, marginBottom: '4px' }}>{d.name}</div>
                <div style={{ fontSize: '13px', color: T.gray }}>{d.openings.toLocaleString()} openings</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: T.grayBg, padding: isMobile ? '56px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 700, color: T.dark, letterSpacing: '-1px', marginBottom: '32px', textAlign: 'center' }}>
            Featured Roles
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: T.grayBorder }}>
            {JOBS.map((job) => (
              <button
                key={job.title}
                onClick={() => navigate('/contact?subject=careers')}
                style={{
                  background: T.white,
                  padding: isMobile ? '20px 16px' : '24px 28px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: T.font,
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#fafafa'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = T.white; }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: 600, color: T.dark }}>{job.title}</div>
                  <div style={{ fontSize: '13px', color: T.gray, marginTop: '4px' }}>{job.dept} · {job.loc}</div>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: T.dark, whiteSpace: 'nowrap' }}>Apply →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: T.dark, padding: isMobile ? '56px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 700, color: T.white, letterSpacing: '-1px', marginBottom: '40px', textAlign: 'center' }}>
            Why Tesla
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '24px' }}>
            {BENS.map((b) => (
              <div key={b.title}>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: T.white, marginBottom: '8px' }}>{b.title}</h4>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: T.white, padding: isMobile ? '56px 24px' : '80px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 700, color: T.dark, letterSpacing: '-1px', marginBottom: '16px' }}>
            The Tesla Mindset
          </h2>
          <p style={{ fontSize: '16px', color: T.gray, lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 40px' }}>
            We do not hire people to do a job. We hire people to solve problems that have not been solved before.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '16px', marginBottom: '48px' }}>
            {[
              { s: '127K+', l: 'Employees' },
              { s: '7,500+', l: 'Open Roles' },
              { s: '30+', l: 'Countries' },
              { s: '#1', l: 'EV Maker' },
            ].map((x) => (
              <div key={x.l} style={{ padding: '24px 12px', background: T.grayBg, borderRadius: '4px' }}>
                <div style={{ fontSize: '28px', fontWeight: 700, color: T.dark }}>{x.s}</div>
                <div style={{ fontSize: '12px', color: T.gray, marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{x.l}</div>
              </div>
            ))}
          </div>
          <TeslaButton variant="dark" size="lg" onClick={() => navigate('/contact?subject=careers')}>
            Join the Team
          </TeslaButton>
        </div>
      </section>

      <Footer />
    </PageShell>
  );
}
