import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => { const h = () => setM(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
}

const DEPARTMENTS = [
  { name: 'Engineering', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', openings: 2840, color: '#3e6ae1' },
  { name: 'Manufacturing', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1v5m4 0H9', openings: 1620, color: '#22c55e' },
  { name: 'Energy', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', openings: 440, color: '#f59e0b' },
  { name: 'Software', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', openings: 980, color: '#8b5cf6' },
  { name: 'Design', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z', openings: 215, color: '#e8223c' },
  { name: 'Sales & Delivery', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0', openings: 760, color: '#06b6d4' },
  { name: 'Finance & Legal', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', openings: 180, color: '#10b981' },
  { name: 'Operations', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', openings: 530, color: '#f97316' },
];

const BENEFITS = [
  { title: 'Competitive Compensation', desc: 'Market-leading salaries, equity grants, and performance bonuses. We compensate for the impact you create.' },
  { title: 'Health & Wellness', desc: 'Comprehensive medical, dental, and vision plans. Employee Assistance Program and mental health resources.' },
  { title: 'Equity Ownership', desc: 'Tesla RSUs from day one. We believe the people building Tesla should own a piece of it.' },
  { title: 'Mission-Driven Work', desc: 'Every role at Tesla directly contributes to the world\'s transition to sustainable energy. Your work matters.' },
  { title: 'Career Growth', desc: 'Fast-moving environment with internal mobility. We promote from within and invest in your development.' },
  { title: 'Free Charging', desc: 'Monthly Supercharging credits for Tesla vehicle owners. Employee pricing on Tesla products.' },
  { title: 'Parental Leave', desc: 'Paid leave for all new parents — birth, adoption, or fostering. We support growing families.' },
  { title: 'Learning & Development', desc: 'Tuition assistance, online learning subscriptions, and internal training programs across all disciplines.' },
];

const FEATURED_JOBS = [
  { title: 'Senior Autopilot Software Engineer', team: 'Engineering · AI & Autopilot', loc: 'Palo Alto, CA', type: 'Full-time', level: 'Senior' },
  { title: 'Cell Manufacturing Process Engineer', team: 'Manufacturing · Battery', loc: 'Sparks, NV', type: 'Full-time', level: 'Mid-level' },
  { title: 'Vehicle Design Lead — Exterior', team: 'Design · Vehicle Design', loc: 'Hawthorne, CA', type: 'Full-time', level: 'Lead' },
  { title: 'Energy Software Engineer — Grid Systems', team: 'Energy · Software', loc: 'Austin, TX', type: 'Full-time', level: 'Mid-level' },
  { title: 'Service Technician — High Voltage Systems', team: 'Service · Technical', loc: 'Multiple Locations', type: 'Full-time', level: 'Entry' },
  { title: 'Gigafactory Production Supervisor', team: 'Manufacturing · Operations', loc: 'Austin, TX', type: 'Full-time', level: 'Mid-level' },
  { title: 'Financial Analyst — Vehicle Finance', team: 'Finance · FP&A', loc: 'Fremont, CA', type: 'Full-time', level: 'Mid-level' },
  { title: 'FSD Product Manager', team: 'Software · Product', loc: 'Palo Alto, CA', type: 'Full-time', level: 'Senior' },
];

const LOCATIONS = ['All Locations', 'Palo Alto, CA', 'Fremont, CA', 'Austin, TX', 'Sparks, NV', 'Hawthorne, CA', 'Multiple Locations'];

export default function CareersPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState('All Locations');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filteredJobs = FEATURED_JOBS.filter(j => {
    const matchesLoc = activeFilter === 'All Locations' || j.loc === activeFilter;
    const matchesSearch = !searchQuery || j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.team.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLoc && matchesSearch;
  });

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0d1117 0%,#1a2744 100%)', padding: isMobile ? '100px 24px 80px' : '140px 40px 100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%,rgba(62,106,225,.18) 0%,transparent 70%)' }} />
        <div style={{ position: 'relative' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', marginBottom: '16px' }}>Tesla Careers</p>
          <h1 style={{ fontSize: isMobile ? '38px' : '72px', fontWeight: 700, color: '#fff', letterSpacing: '-2px', marginBottom: '20px', lineHeight: 1.03 }}>Build What<br/>Comes Next</h1>
          <p style={{ fontSize: isMobile ? '16px' : '20px', color: 'rgba(255,255,255,.55)', maxWidth: '520px', margin: '0 auto 48px', lineHeight: 1.65 }}>Join a team of relentless innovators working to accelerate the world's transition to sustainable energy. Over 7,500 open positions worldwide.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '540px', margin: '0 auto' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search jobs..." style={{ width: '100%', padding: '14px 20px 14px 44px', borderRadius: '8px', border: 'none', fontSize: '15px', fontFamily: 'inherit', background: 'rgba(255,255,255,.1)', color: '#fff', outline: 'none', boxSizing: 'border-box', backdropFilter: 'blur(8px)' }} />
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="2" strokeLinecap="round" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <button onClick={() => navigate('/contact?subject=careers')} style={{ padding: '14px 28px', background: '#fff', color: '#171a20', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Browse All Jobs</button>
          </div>
        </div>
      </div>

      {/* Departments */}
      <div style={{ background: '#fff', padding: isMobile ? '48px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: isMobile ? '28px' : '44px', fontWeight: 700, color: '#171a20', letterSpacing: '-1.5px', marginBottom: '10px' }}>Find Your Team</h2>
            <p style={{ fontSize: '16px', color: '#6e7180' }}>We hire across every discipline. Find where your skills can make the biggest impact.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '16px' }}>
            {DEPARTMENTS.map(d => (
              <button key={d.name} onClick={() => navigate('/contact?subject=careers')} style={{ background: '#f8f9fa', borderRadius: '14px', padding: '24px 20px', textAlign: 'left', border: '1px solid #e5e7eb', cursor: 'pointer', fontFamily: 'inherit', transition: 'all .18s', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,.1)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#f8f9fa'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: d.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={d.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d.icon}/></svg>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#171a20', marginBottom: '4px' }}>{d.name}</div>
                <div style={{ fontSize: '13px', color: '#9ca3af' }}>{d.openings.toLocaleString()} openings</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Jobs */}
      <div style={{ background: '#f8f9fa', padding: isMobile ? '48px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: isMobile ? '28px' : '44px', fontWeight: 700, color: '#171a20', letterSpacing: '-1.5px', marginBottom: '8px' }}>Featured Openings</h2>
              <p style={{ fontSize: '15px', color: '#6e7180' }}>Hand-picked roles from across the company.</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {LOCATIONS.slice(0, isMobile ? 3 : LOCATIONS.length).map(loc => (
                <button key={loc} onClick={() => setActiveFilter(loc)} style={{ padding: '7px 16px', borderRadius: '20px', border: activeFilter === loc ? '2px solid #171a20' : '1px solid #d1d5db', background: activeFilter === loc ? '#171a20' : '#fff', color: activeFilter === loc ? '#fff' : '#374151', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .15s', whiteSpace: 'nowrap' }}>{loc}</button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredJobs.map(job => (
              <div key={job.title} style={{ background: '#fff', borderRadius: '12px', padding: '20px 24px', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', cursor: 'pointer', transition: 'box-shadow .18s, border-color .18s' }}
                onClick={() => navigate('/contact?subject=careers')}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,.08)'; (e.currentTarget as HTMLElement).style.borderColor = '#171a20'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb'; }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#171a20', marginBottom: '4px' }}>{job.title}</h3>
                  <p style={{ fontSize: '13px', color: '#6e7180' }}>{job.team} · {job.loc}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                  <span style={{ background: '#f0fdf4', color: '#16a34a', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px' }}>{job.level}</span>
                  <span style={{ background: '#f0f4ff', color: '#3e6ae1', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px' }}>{job.type}</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"><polyline points="9,18 15,12 9,6"/></svg>
                </div>
              </div>
            ))}
            {filteredJobs.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>No jobs match your search. <button onClick={() => { setActiveFilter('All Locations'); setSearchQuery(''); }} style={{ color: '#3e6ae1', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Clear filters</button></div>
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <button onClick={() => navigate('/contact?subject=careers')} style={{ padding: '14px 40px', background: '#171a20', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>View All 7,500+ Jobs</button>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div style={{ background: '#0d1117', padding: isMobile ? '60px 24px' : '100px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: isMobile ? '28px' : '44px', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', marginBottom: '10px' }}>Benefits at Tesla</h2>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.4)' }}>We invest in the people who are building the future.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4,1fr)', gap: '16px' }}>
            {BENEFITS.map(b => (
              <div key={b.title} style={{ background: 'rgba(255,255,255,.04)', borderRadius: '14px', padding: '24px', border: '1px solid rgba(255,255,255,.06)' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>{b.title}</h4>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.45)', lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Culture */}
      <div style={{ background: '#fff', padding: isMobile ? '60px 24px' : '100px 40px' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '60px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: 700, color: '#171a20', letterSpacing: '-1px', marginBottom: '16px', lineHeight: 1.15 }}>The Tesla Mindset</h2>
            <p style={{ fontSize: '15px', color: '#6e7180', lineHeight: 1.75, marginBottom: '16px' }}>We don't hire people to do a job. We hire people to solve problems that haven't been solved before. Tesla moves at a pace unlike any other company — and that's intentional.</p>
            <p style={{ fontSize: '15px', color: '#6e7180', lineHeight: 1.75, marginBottom: '28px' }}>Every engineer, designer, and operator at Tesla has direct impact. There's no bureaucracy to slow you down. If you see a problem, you fix it. If you have a better idea, you build it.</p>
            <button onClick={() => navigate('/contact?subject=careers')} style={{ padding: '14px 36px', background: '#171a20', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Join the Team</button>
          </div>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { stat: '127K+', label: 'Employees' },
              { stat: '7,500+', label: 'Open Roles' },
              { stat: '30+', label: 'Countries' },
              { stat: '#1', label: 'EV Manufacturer' },
            ].map(s => (
              <div key={s.label} style={{ background: '#f8f9fa', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 700, color: '#171a20', lineHeight: 1 }}>{s.stat}</div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
