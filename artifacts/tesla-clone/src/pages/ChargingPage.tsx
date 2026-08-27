import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T, inputStyle, labelStyle } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import Footer from '../components/Footer';

const BASE = import.meta.env.BASE_URL;

const OPTIONS = [
  {
    id: 'home',
    title: 'Home Charging',
    desc: 'Install a Wall Connector for the fastest home charging experience. Most owners charge overnight and wake up to a full battery.',
    img: `${BASE}charging.jpg`,
    specs: [
      { label: 'Power', value: 'Up to 48A' },
      { label: 'Range / hr', value: 'Up to 44 mi' },
      { label: 'Connector', value: 'NACS' },
      { label: 'Install', value: 'Hardwired' },
    ],
  },
  {
    id: 'supercharger',
    title: 'Supercharger Network',
    desc: 'Access thousands of Superchargers for long-distance travel. Newer stalls can add significant range in about 15 minutes.',
    img: `${BASE}tesla-supercharger-new.jpg`,
    specs: [
      { label: 'Peak rate', value: 'Up to 250 kW' },
      { label: 'Stalls', value: '50,000+' },
      { label: 'Idle fees', value: 'After full' },
      { label: 'Access', value: 'Tesla app' },
    ],
  },
  {
    id: 'destination',
    title: 'Destination Charging',
    desc: 'Charge while you shop, dine, or stay overnight at hotels, restaurants, and workplaces equipped with Tesla destination connectors.',
    img: `${BASE}tesla-supercharger3.jpg`,
    specs: [
      { label: 'Typical rate', value: 'Level 2' },
      { label: 'Best for', value: 'Dwell time' },
      { label: 'Find', value: 'In-car / app' },
      { label: 'Payment', value: 'App billing' },
    ],
  },
];

const VEHICLE_RATES: Record<string, { homeKw: number; peakKw: number; usableKwh: number }> = {
  'Model 3': { homeKw: 11, peakKw: 250, usableKwh: 75 },
  'Model Y': { homeKw: 11, peakKw: 250, usableKwh: 75 },
  'Model S': { homeKw: 11.5, peakKw: 250, usableKwh: 100 },
  'Model X': { homeKw: 11.5, peakKw: 250, usableKwh: 100 },
  Cybertruck: { homeKw: 11.5, peakKw: 250, usableKwh: 120 },
};

export default function ChargingPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [vehicle, setVehicle] = useState('Model 3');
  const [startPct, setStartPct] = useState(20);
  const [endPct, setEndPct] = useState(80);
  const [location, setLocation] = useState<'home' | 'supercharger'>('home');

  const calc = useMemo(() => {
    const v = VEHICLE_RATES[vehicle];
    const kwhNeeded = v.usableKwh * ((endPct - startPct) / 100);
    const kw = location === 'home' ? v.homeKw : Math.min(v.peakKw * 0.55, 150); // realistic avg session rate
    const hours = kwhNeeded / kw;
    const mins = Math.round(hours * 60);
    return { kwhNeeded: kwhNeeded.toFixed(1), mins, hours: hours.toFixed(1) };
  }, [vehicle, startPct, endPct, location]);

  return (
    <PageShell>
      <TeslaHero
        eyebrow="Charging"
        title="Charge Anywhere"
        subtitle="Home, Supercharger, and Destination options designed around how you drive."
        isMobile={isMobile}
      />

      <section style={{ background: T.white, padding: isMobile ? '40px 16px' : '48px 40px' }} id="calculator">
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: '16px', marginBottom: '56px' }}>
          {[
            { v: '50,000+', l: 'Superchargers worldwide' },
            { v: '~15 min', l: 'for meaningful highway range' },
            { v: 'NACS', l: 'North American standard' },
          ].map((s) => (
            <div key={s.l} style={{ textAlign: 'center', padding: '28px 16px', background: T.grayBg, borderRadius: '4px' }}>
              <div style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 700, color: T.dark }}>{s.v}</div>
              <div style={{ fontSize: '13px', color: T.gray, marginTop: '8px' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Calculator */}
        <div style={{ maxWidth: '720px', margin: '0 auto 64px', padding: isMobile ? '24px' : '32px', background: T.grayBg, borderRadius: '4px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: T.dark, marginBottom: '20px', textAlign: 'center' }}>Charging Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={labelStyle}>Vehicle</label>
              <select style={{ ...inputStyle, appearance: 'none' }} value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                {Object.keys(VEHICLE_RATES).map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Location</label>
              <select style={{ ...inputStyle, appearance: 'none' }} value={location} onChange={(e) => setLocation(e.target.value as 'home' | 'supercharger')}>
                <option value="home">Home (Wall Connector)</option>
                <option value="supercharger">Supercharger</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Start charge ({startPct}%)</label>
              <input type="range" min={0} max={90} value={startPct} onChange={(e) => setStartPct(Math.min(Number(e.target.value), endPct - 5))} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={labelStyle}>End charge ({endPct}%)</label>
              <input type="range" min={10} max={100} value={endPct} onChange={(e) => setEndPct(Math.max(Number(e.target.value), startPct + 5))} style={{ width: '100%' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'center' }}>
            <div style={{ background: T.white, padding: '16px', borderRadius: '4px' }}>
              <div style={{ fontSize: '12px', color: T.gray, marginBottom: '4px' }}>Energy</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: T.dark }}>{calc.kwhNeeded} kWh</div>
            </div>
            <div style={{ background: T.white, padding: '16px', borderRadius: '4px' }}>
              <div style={{ fontSize: '12px', color: T.gray, marginBottom: '4px' }}>Estimated time</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: T.dark }}>{calc.mins < 90 ? `${calc.mins} min` : `${calc.hours} hr`}</div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '56px' }} id="nacs">
          {OPTIONS.map((o, i) => (
            <div key={o.id} id={o.id} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '20px' : '48px', alignItems: 'center' }}>
              <div style={{ order: isMobile ? 0 : i % 2 === 1 ? 1 : 0, borderRadius: '4px', overflow: 'hidden', aspectRatio: '16/10', background: T.grayBg }}>
                <img src={o.img} alt={o.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <h2 style={{ fontSize: isMobile ? '24px' : '32px', fontWeight: 700, color: T.dark, marginBottom: '12px' }}>{o.title}</h2>
                <p style={{ fontSize: '15px', color: T.gray, lineHeight: 1.7, marginBottom: '20px' }}>{o.desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {o.specs.map((s) => (
                    <div key={s.label} style={{ padding: '12px', background: T.grayBg, borderRadius: '4px' }}>
                      <div style={{ fontSize: '11px', color: T.gray, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: T.dark, marginTop: '4px' }}>{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: T.grayBg, padding: isMobile ? '48px 20px' : '64px 40px' }} id="wall-connector">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: 700, color: T.dark, marginBottom: '12px' }}>Wall Connector</h2>
          <p style={{ fontSize: '15px', color: T.gray, lineHeight: 1.7, marginBottom: '24px' }}>
            Wi‑Fi connected, up to 44 miles of range per hour of charge, and Power Sharing for multiple connectors on one circuit.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <TeslaButton variant="dark" size="lg" onClick={() => navigate('/shop')}>Shop Wall Connector</TeslaButton>
            <TeslaButton variant="outline-dark" size="lg" onClick={() => navigate('/contact?subject=charging')}>Installation Help</TeslaButton>
          </div>
        </div>
      </section>

      <section style={{ background: T.dark, padding: isMobile ? '48px 24px' : '64px 40px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <TeslaButton variant="light" size="lg" onClick={() => navigate('/trip-planner')}>Trip Planner</TeslaButton>
          <TeslaButton variant="outline-light" size="lg" onClick={() => navigate('/host-charging')}>Host a Supercharger</TeslaButton>
          <TeslaButton variant="outline-light" size="lg" onClick={() => navigate('/locations')}>Find Charging</TeslaButton>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
