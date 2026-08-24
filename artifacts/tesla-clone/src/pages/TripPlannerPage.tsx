import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 768);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

const MODELS = [
  { name: 'Model 3 Long Range', range: 358, kw: 82 },
  { name: 'Model Y Long Range', range: 330, kw: 75 },
  { name: 'Model S Plaid',      range: 396, kw: 95 },
  { name: 'Model X Long Range', range: 348, kw: 90 },
  { name: 'Cybertruck AWD',     range: 340, kw: 123 },
];

const SUPERCHARGER_NAMES = [
  'Tesla Supercharger – Harris Ranch, CA',
  'Tesla Supercharger – Kettleman City, CA',
  'Tesla Supercharger – Tejon Ranch, CA',
  'Tesla Supercharger – Buttonwillow, CA',
  'Tesla Supercharger – Baker, CA',
  'Tesla Supercharger – Gallup, NM',
  'Tesla Supercharger – Amarillo, TX',
  'Tesla Supercharger – Oklahoma City, OK',
  'Tesla Supercharger – St. Louis, MO',
  'Tesla Supercharger – Indianapolis, IN',
  'Tesla Supercharger – Columbus, OH',
  'Tesla Supercharger – Cleveland, OH',
  'Tesla Supercharger – Erie, PA',
  'Tesla Supercharger – Albuquerque, NM',
  'Tesla Supercharger – Flagstaff, AZ',
  'Tesla Supercharger – Las Vegas, NV',
  'Tesla Supercharger – Barstow, CA',
  'Tesla Supercharger – Kingman, AZ',
  'Tesla Supercharger – Tucson, AZ',
  'Tesla Supercharger – El Paso, TX',
  'Tesla Supercharger – Forth Worth, TX',
  'Tesla Supercharger – Dallas, TX',
  'Tesla Supercharger – Nashville, TN',
  'Tesla Supercharger – Atlanta, GA',
  'Tesla Supercharger – Charlotte, NC',
  'Tesla Supercharger – Richmond, VA',
];

function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function hashStr(s: string) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
  return Math.abs(h);
}

interface LegResult {
  from: string;
  to: string;
  distance: number;
  driveTime: number;
  rangeUsed: number;
  arrivalCharge: number;
  isChargerStop: boolean;
  chargeAdded: number;
  chargeTime: number;
  kw: number;
}

function planRoute(origin: string, destination: string, modelIdx: number): { legs: LegResult[]; totalMiles: number; totalDrive: number; totalCharge: number } {
  const model = MODELS[modelIdx];
  const seed = hashStr(origin + destination);
  const rand = seededRand(seed);
  const totalMiles = Math.floor(rand() * 1600 + 250);
  const numStops = totalMiles < 400 ? 0 : totalMiles < 700 ? 1 : totalMiles < 1100 ? 2 : totalMiles < 1500 ? 3 : 4;
  const stopNames: string[] = [];
  const usedIdx = new Set<number>();
  for (let i = 0; i < numStops; i++) {
    let idx: number;
    do { idx = Math.floor(rand() * SUPERCHARGER_NAMES.length); } while (usedIdx.has(idx));
    usedIdx.add(idx);
    stopNames.push(SUPERCHARGER_NAMES[idx]);
  }
  const waypoints = [origin, ...stopNames, destination];
  const legs: LegResult[] = [];
  let totalDrive = 0;
  let totalCharge = 0;
  let currentCharge = 100;
  const segTotal = totalMiles;
  for (let i = 0; i < waypoints.length - 1; i++) {
    const fromWp = waypoints[i];
    const toWp = waypoints[i + 1];
    const frac = 0.7 + rand() * 0.6;
    const rawMiles = Math.round((segTotal / (waypoints.length - 1)) * frac);
    const segMiles = i === waypoints.length - 2 ? segTotal - legs.reduce((a, l) => a + l.distance, 0) : rawMiles;
    const driveTimeMins = Math.round((segMiles / 70) * 60);
    const pctUsed = Math.round((segMiles / model.range) * 100);
    const arrivalPct = Math.max(5, currentCharge - pctUsed);
    const isStop = i < waypoints.length - 2;
    let chargeAdded = 0, chargeTimeMins = 0, kw = 0;
    if (isStop) {
      const targetPct = 80;
      chargeAdded = targetPct - arrivalPct;
      kw = 250;
      const kwh = (chargeAdded / 100) * model.kw;
      chargeTimeMins = Math.round((kwh / kw) * 60);
      currentCharge = targetPct;
      totalCharge += chargeTimeMins;
    }
    totalDrive += driveTimeMins;
    legs.push({ from: fromWp, to: toWp, distance: segMiles, driveTime: driveTimeMins, rangeUsed: pctUsed, arrivalCharge: arrivalPct, isChargerStop: isStop, chargeAdded, chargeTime: chargeTimeMins, kw });
  }
  return { legs, totalMiles, totalDrive, totalCharge };
}

function fmtTime(mins: number) {
  const h = Math.floor(mins / 60), m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

const POPULAR = [
  { from: 'Los Angeles, CA', to: 'San Francisco, CA' },
  { from: 'New York, NY', to: 'Boston, MA' },
  { from: 'Chicago, IL', to: 'Detroit, MI' },
  { from: 'Miami, FL', to: 'Orlando, FL' },
  { from: 'Seattle, WA', to: 'Portland, OR' },
  { from: 'Las Vegas, NV', to: 'Los Angeles, CA' },
];

export default function TripPlannerPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [modelIdx, setModelIdx] = useState(1);
  const [startCharge, setStartCharge] = useState(90);
  const [result, setResult] = useState<ReturnType<typeof planRoute> | null>(null);
  const [loading, setLoading] = useState(false);
  const [planned, setPlanned] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  function handlePlan(e: React.FormEvent) {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(planRoute(origin.trim(), destination.trim(), modelIdx));
      setLoading(false);
      setPlanned(true);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }, 1100);
  }

  function handlePopular(f: string, t: string) {
    setOrigin(f);
    setDestination(t);
  }

  const totalTime = result ? result.totalDrive + result.totalCharge : 0;

  return (
    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif' }}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
        @keyframes legIn{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fillBar{from{width:0}to{width:var(--w)}}
      `}</style>

      {/* ── HERO ── */}
      <div style={{ position: 'relative', height: '100vh', minHeight: '640px', overflow: 'hidden', background: '#0a0a0a' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${BASE}hero-highway.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center 55%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,.52) 0%,rgba(0,0,0,.18) 40%,rgba(0,0,0,.72) 100%)' }} />

        <div style={{ position: 'absolute', top: '18%', left: 0, right: 0, padding: '0 24px', animation: 'fadeUp .9s ease both', textAlign: 'center' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(255,255,255,.55)', textTransform: 'uppercase', marginBottom: '14px' }}>Tesla Trip Planner</p>
          <h1 style={{ fontSize: isMobile ? '36px' : '68px', fontWeight: 700, color: '#fff', letterSpacing: '-2px', lineHeight: 1.02, marginBottom: '14px' }}>Plan Your Perfect<br/>Road Trip.</h1>
          <p style={{ fontSize: isMobile ? '15px' : '19px', color: 'rgba(255,255,255,.62)', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.55 }}>Enter your route and instantly see Supercharger stops, charging times, and range breakdowns for every leg.</p>

          {/* ── FORM CARD ── */}
          <form onSubmit={handlePlan} style={{ background: 'rgba(255,255,255,.97)', backdropFilter: 'blur(20px)', borderRadius: '16px', padding: isMobile ? '24px 20px' : '32px 36px', maxWidth: '720px', margin: '0 auto', boxShadow: '0 24px 60px rgba(0,0,0,.32)', textAlign: 'left' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#6e7180', textTransform: 'uppercase', display: 'block', marginBottom: '7px' }}>Starting Point</label>
                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="10" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
                  <input value={origin} onChange={e => setOrigin(e.target.value)} placeholder="e.g. Los Angeles, CA" required style={{ width: '100%', padding: '13px 14px 13px 38px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', color: '#171a20', outline: 'none', boxSizing: 'border-box', transition: 'border .15s' }} onFocus={e => e.currentTarget.style.border = '1.5px solid #171a20'} onBlur={e => e.currentTarget.style.border = '1.5px solid #e5e7eb'} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#6e7180', textTransform: 'uppercase', display: 'block', marginBottom: '7px' }}>Destination</label>
                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#e53935" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="10" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
                  <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="e.g. San Francisco, CA" required style={{ width: '100%', padding: '13px 14px 13px 38px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', color: '#171a20', outline: 'none', boxSizing: 'border-box', transition: 'border .15s' }} onFocus={e => e.currentTarget.style.border = '1.5px solid #171a20'} onBlur={e => e.currentTarget.style.border = '1.5px solid #e5e7eb'} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px', marginBottom: '22px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#6e7180', textTransform: 'uppercase', display: 'block', marginBottom: '7px' }}>Vehicle</label>
                <select value={modelIdx} onChange={e => setModelIdx(Number(e.target.value))} style={{ width: '100%', padding: '13px 14px', border: '1.5px solid #e5e7eb', borderRadius: '10px', fontSize: '14px', fontFamily: 'inherit', color: '#171a20', background: '#fff', outline: 'none', cursor: 'pointer', boxSizing: 'border-box' }}>
                  {MODELS.map((m, i) => <option key={m.name} value={i}>{m.name} ({m.range} mi range)</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#6e7180', textTransform: 'uppercase', display: 'block', marginBottom: '7px' }}>Starting Charge — <span style={{ color: startCharge >= 80 ? '#22c55e' : startCharge >= 50 ? '#5c5e62' : '#ef4444' }}>{startCharge}%</span></label>
                <input type="range" min={20} max={100} step={5} value={startCharge} onChange={e => setStartCharge(Number(e.target.value))} style={{ width: '100%', accentColor: '#171a20', cursor: 'pointer', marginTop: '10px' }} />
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', padding: '15px 0', background: loading ? '#9ca3af' : '#171a20', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'background .2s' }}>
              {loading ? (
                <>
                  <svg style={{ animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  Calculating Route…
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M13 6l6 6-6 6"/></svg>
                  Plan My Trip
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── POPULAR ROUTES ── */}
      {!planned && (
        <div style={{ background: '#f8f9fa', borderBottom: '1px solid #e5e7eb', padding: isMobile ? '32px 20px' : '48px 40px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px', textAlign: 'center' }}>Popular Routes</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3,1fr)', gap: '10px' }}>
              {POPULAR.map(p => (
                <button key={p.from + p.to} onClick={() => handlePopular(p.from, p.to)} style={{ padding: '14px 16px', background: '#fff', border: '1.5px solid #e5e7eb', borderRadius: '10px', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'border .15s,box-shadow .15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.border = '1.5px solid #171a20'; (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.border = '1.5px solid #e5e7eb'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                  <div style={{ fontSize: '12px', color: '#6e7180', marginBottom: '3px' }}>{p.from}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '6px', height: '1px', background: '#9ca3af' }} />
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#9ca3af" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    <div style={{ width: '6px', height: '1px', background: '#9ca3af' }} />
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#171a20' }}>{p.to}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {result && (
        <div ref={resultRef} style={{ background: '#fff', padding: isMobile ? '40px 20px' : '72px 40px' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>

            {/* Summary strip */}
            <div style={{ background: '#171a20', borderRadius: '16px', padding: isMobile ? '24px 20px' : '32px 40px', marginBottom: '48px', display: 'grid', gridTemplateColumns: `repeat(${isMobile ? 2 : 4},1fr)`, gap: '24px', animation: 'fadeUp .6s ease both' }}>
              {[
                { label: 'Total Distance', value: `${result.totalMiles} mi` },
                { label: 'Drive Time',     value: fmtTime(result.totalDrive) },
                { label: 'Charge Stops',   value: `${result.legs.filter(l => l.isChargerStop).length}` },
                { label: 'Total Trip Time', value: fmtTime(totalTime) },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,.45)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '6px' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Route header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: isMobile ? '20px' : '28px', fontWeight: 700, color: '#171a20', margin: 0 }}>
                  {origin} → {destination}
                </h2>
                <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 0', fontWeight: 500 }}>
                  {MODELS[modelIdx].name} · {startCharge}% starting charge · Charging to 80% at stops
                </p>
              </div>
            </div>

            {/* Route timeline */}
            <div style={{ position: 'relative' }}>
              {/* Vertical line */}
              <div style={{ position: 'absolute', left: isMobile ? '17px' : '21px', top: '28px', bottom: '28px', width: '2px', background: 'linear-gradient(180deg,#171a20 0%,#e5e7eb 100%)', zIndex: 0 }} />

              {result.legs.map((leg, idx) => {
                const isLast = idx === result.legs.length - 1;
                const chargePct = Math.min(100, Math.max(0, leg.arrivalCharge));
                const barColor = chargePct >= 50 ? '#22c55e' : chargePct >= 25 ? '#5c5e62' : '#ef4444';
                return (
                  <div key={idx} style={{ animation: `legIn .5s ease ${idx * 0.12}s both` }}>

                    {/* Origin node (first leg only) */}
                    {idx === 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                        <div style={{ width: isMobile ? '34px' : '42px', height: isMobile ? '34px' : '42px', borderRadius: '50%', background: '#171a20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, position: 'relative', border: '3px solid #fff', boxShadow: '0 0 0 2px #171a20' }}>
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
                        </div>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 700, color: '#171a20' }}>{origin}</div>
                          <div style={{ fontSize: '12px', color: '#9ca3af' }}>Departure · {startCharge}% charge</div>
                        </div>
                      </div>
                    )}

                    {/* Leg card */}
                    <div style={{ marginLeft: isMobile ? '17px' : '21px', paddingLeft: '28px', paddingBottom: '8px', position: 'relative' }}>
                      <div style={{ background: '#f8f9fa', border: '1px solid #e5e7eb', borderRadius: '14px', padding: isMobile ? '16px' : '20px 24px', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round"><path d="M3 12h18M13 6l6 6-6 6"/></svg>
                            <span style={{ fontSize: '13px', fontWeight: 600, color: '#171a20' }}>{leg.distance} miles</span>
                            <span style={{ color: '#d1d5db' }}>·</span>
                            <span style={{ fontSize: '13px', color: '#6e7180' }}>{fmtTime(leg.driveTime)} drive</span>
                          </div>
                          <div style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>Leg {idx + 1} of {result.legs.length}</div>
                        </div>

                        {/* Range bar */}
                        <div style={{ marginBottom: '4px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                            <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Battery on Arrival</span>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: barColor }}>{chargePct}%</span>
                          </div>
                          <div style={{ height: '6px', borderRadius: '99px', background: '#e5e7eb', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${chargePct}%`, background: barColor, borderRadius: '99px', transition: 'width .8s ease' }} />
                          </div>
                        </div>
                        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>
                          Uses ~{leg.rangeUsed}% · {Math.round((leg.distance / MODELS[modelIdx].range) * 100)}% of full range
                        </div>
                      </div>
                    </div>

                    {/* Supercharger stop node */}
                    {leg.isChargerStop && (
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '8px' }}>
                        <div style={{ width: isMobile ? '34px' : '42px', height: isMobile ? '34px' : '42px', borderRadius: '50%', background: '#fff', border: '2.5px solid #e5300a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, position: 'relative', boxShadow: '0 2px 8px rgba(229,48,10,.15)' }}>
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#e5300a" strokeWidth="2.2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        </div>
                        <div style={{ flex: 1, background: '#fff7f5', border: '1.5px solid #fecdc4', borderRadius: '14px', padding: isMobile ? '14px 16px' : '16px 20px' }}>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: '#171a20', marginBottom: '4px' }}>{leg.to}</div>
                          <div style={{ fontSize: '12px', color: '#6e7180', marginBottom: '10px' }}>Supercharger V3 · {leg.kw} kW · Charging {leg.arrivalCharge}% → {leg.arrivalCharge + leg.chargeAdded}%</div>
                          <div style={{ display: 'flex', gap: isMobile ? '12px' : '24px', flexWrap: 'wrap' }}>
                            <div>
                              <div style={{ fontSize: '18px', fontWeight: 700, color: '#e5300a' }}>{fmtTime(leg.chargeTime)}</div>
                              <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Charge Time</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '18px', fontWeight: 700, color: '#171a20' }}>{leg.chargeAdded}%</div>
                              <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Added</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '18px', fontWeight: 700, color: '#171a20' }}>{Math.round((leg.chargeAdded / 100) * MODELS[modelIdx].kw * 10) / 10} kWh</div>
                              <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Energy Added</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Destination node */}
                    {isLast && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                        <div style={{ width: isMobile ? '34px' : '42px', height: isMobile ? '34px' : '42px', borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, position: 'relative', border: '3px solid #fff', boxShadow: '0 0 0 2px #22c55e' }}>
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="#fff" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 700, color: '#171a20' }}>{destination}</div>
                          <div style={{ fontSize: '12px', color: '#22c55e', fontWeight: 600 }}>Arrived · {leg.arrivalCharge}% remaining · {fmtTime(totalTime)} total</div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div style={{ marginTop: '56px', padding: isMobile ? '32px 20px' : '48px 48px', background: '#171a20', borderRadius: '20px', textAlign: 'center', animation: 'fadeUp .6s ease .4s both' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(255,255,255,.4)', textTransform: 'uppercase', marginBottom: '12px' }}>Ready to go?</p>
              <h3 style={{ fontSize: isMobile ? '22px' : '30px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>Order Your {MODELS[modelIdx].name}</h3>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.5)', maxWidth: '400px', margin: '0 auto 28px', lineHeight: 1.6 }}>Every Tesla includes access to the largest fast-charging network in North America.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/configure/model-y')} style={{ padding: '13px 32px', background: '#fff', color: '#171a20', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Order Now</button>
                <button onClick={() => navigate('/charging')} style={{ padding: '13px 32px', background: 'rgba(255,255,255,.12)', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Explore Charging</button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── HOW IT WORKS (shown before result) ── */}
      {!planned && (
        <div style={{ padding: isMobile ? '60px 20px' : '100px 40px', background: '#fff' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '14px' }}>How It Works</p>
            <h2 style={{ fontSize: isMobile ? '28px' : '42px', fontWeight: 700, color: '#171a20', marginBottom: '16px' }}>Smart Planning,<br/>Seamless Travel.</h2>
            <p style={{ fontSize: '16px', color: '#6e7180', maxWidth: '520px', margin: '0 auto 64px', lineHeight: 1.65 }}>Tesla's trip planner automatically finds the optimal charging stops along your route, so you never worry about range.</p>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '32px' }}>
              {[
                { num: '01', icon: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z M12 11.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z', title: 'Enter Your Route', desc: 'Type any starting city and destination. Select your Tesla model and beginning charge level.' },
                { num: '02', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', title: 'See Supercharger Stops', desc: 'The planner identifies the best Supercharger stations along your route, optimized for speed and minimal detours.' },
                { num: '03', icon: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3', title: 'Hit the Road', desc: 'With every leg planned — distances, charge times, and arrival battery levels — you\'re ready to travel confidently.' },
              ].map(s => (
                <div key={s.num} style={{ background: '#f8f9fa', borderRadius: '16px', padding: '36px 28px', textAlign: 'left', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.12em', marginBottom: '20px' }}>{s.num}</div>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#171a20', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#171a20', marginBottom: '10px' }}>{s.title}</h3>
                  <p style={{ fontSize: '14px', color: '#6e7180', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── NETWORK STATS ── */}
      <div style={{ background: '#f8f9fa', borderTop: '1px solid #e5e7eb', padding: isMobile ? '48px 20px' : '72px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '12px' }}>The Network Behind Your Trip</p>
            <h2 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 700, color: '#171a20' }}>The World's Largest<br/>Fast-Charging Network.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: '1px', background: '#e5e7eb', borderRadius: '16px', overflow: 'hidden' }}>
            {[
              { value: '50,000+', label: 'Superchargers' },
              { value: '6,000+', label: 'Stations Globally' },
              { value: '250 kW', label: 'Peak Charge Rate' },
              { value: '99.97%', label: 'Network Uptime' },
            ].map(s => (
              <div key={s.label} style={{ background: '#fff', padding: isMobile ? '28px 16px' : '40px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: isMobile ? '22px' : '30px', fontWeight: 700, color: '#171a20' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '6px' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button onClick={() => navigate('/charging')} style={{ padding: '13px 36px', background: '#171a20', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Learn About Charging</button>
          </div>
        </div>
      </div>
    </div>
  );
}
