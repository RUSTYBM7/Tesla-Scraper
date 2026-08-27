import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TeslaButton, PageShell, T, inputStyle, labelStyle } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { postOrderInquiry } from '../lib/api';
import Footer from '../components/Footer';

const BASE = import.meta.env.BASE_URL;

type Config = {
  trim: string;
  color: string;
  wheels: string;
  interior: string;
  autopilot: string;
};

type ColorOpt = { id: string; name: string; price: number; hex: string; filter: string };

const CATALOG: Record<
  string,
  {
    label: string;
    img: string;
    trims: { id: string; name: string; price: number; range: string; accel: string }[];
    colors: ColorOpt[];
    wheels: { id: string; name: string; price: number }[];
    interiors: { id: string; name: string; price: number; swatch: string }[];
    autopilot: { id: string; name: string; price: number }[];
  }
> = {
  'model-3': {
    label: 'Model 3',
    img: `${BASE}dl-hero-model-3.jpg`,
    trims: [
      { id: 'rwd', name: 'Rear-Wheel Drive', price: 40240, range: '272 mi', accel: '5.8s' },
      { id: 'lr', name: 'Long Range AWD', price: 47740, range: '341 mi', accel: '4.2s' },
      { id: 'perf', name: 'Performance', price: 53240, range: '296 mi', accel: '2.9s' },
    ],
    colors: [
      { id: 'white', name: 'Pearl White Multi-Coat', price: 0, hex: '#f2f2f0', filter: 'brightness(1.08) saturate(0.9)' },
      { id: 'black', name: 'Solid Black', price: 1000, hex: '#1a1a1a', filter: 'brightness(0.45) contrast(1.1)' },
      { id: 'grey', name: 'Stealth Grey', price: 1500, hex: '#5c5c5c', filter: 'brightness(0.62) saturate(0.2)' },
      { id: 'blue', name: 'Deep Blue Metallic', price: 1000, hex: '#1a3a5c', filter: 'hue-rotate(195deg) saturate(1.4) brightness(0.55)' },
      { id: 'red', name: 'Ultra Red', price: 2000, hex: '#8b1a1a', filter: 'hue-rotate(340deg) saturate(2) brightness(0.65)' },
    ],
    wheels: [
      { id: '18', name: '18" Photon Wheels', price: 0 },
      { id: '19', name: '19" Nova Wheels', price: 1500 },
    ],
    interiors: [
      { id: 'black', name: 'All Black', price: 0, swatch: '#1a1a1a' },
      { id: 'white', name: 'Black and White', price: 1000, swatch: '#e8e6e1' },
    ],
    autopilot: [
      { id: 'ap', name: 'Autopilot', price: 0 },
      { id: 'fsd', name: 'Full Self-Driving (Supervised)', price: 8000 },
    ],
  },
  'model-y': {
    label: 'Model Y',
    img: `${BASE}dl-hero-model-y.jpg`,
    trims: [
      { id: 'rwd', name: 'Rear-Wheel Drive', price: 44990, range: '260 mi', accel: '5.9s' },
      { id: 'lr', name: 'Long Range AWD', price: 47990, range: '310 mi', accel: '4.8s' },
      { id: 'perf', name: 'Performance', price: 52490, range: '285 mi', accel: '3.5s' },
    ],
    colors: [
      { id: 'white', name: 'Pearl White Multi-Coat', price: 0, hex: '#f2f2f0', filter: 'brightness(1.08) saturate(0.9)' },
      { id: 'black', name: 'Solid Black', price: 1000, hex: '#1a1a1a', filter: 'brightness(0.45) contrast(1.1)' },
      { id: 'grey', name: 'Stealth Grey', price: 1500, hex: '#5c5c5c', filter: 'brightness(0.62) saturate(0.2)' },
      { id: 'red', name: 'Ultra Red', price: 2000, hex: '#8b1a1a', filter: 'hue-rotate(340deg) saturate(2) brightness(0.65)' },
    ],
    wheels: [
      { id: '19', name: '19" Gemini Wheels', price: 0 },
      { id: '20', name: '20" Induction Wheels', price: 2000 },
    ],
    interiors: [
      { id: 'black', name: 'All Black', price: 0, swatch: '#1a1a1a' },
      { id: 'white', name: 'Black and White', price: 1000, swatch: '#e8e6e1' },
    ],
    autopilot: [
      { id: 'ap', name: 'Autopilot', price: 0 },
      { id: 'fsd', name: 'Full Self-Driving (Supervised)', price: 8000 },
    ],
  },
  'model-s': {
    label: 'Model S',
    img: `${BASE}dl-hero-model-s.jpg`,
    trims: [
      { id: 'lr', name: 'Long Range', price: 74990, range: '405 mi', accel: '3.1s' },
      { id: 'plaid', name: 'Plaid', price: 89990, range: '359 mi', accel: '1.99s' },
    ],
    colors: [
      { id: 'white', name: 'Pearl White Multi-Coat', price: 0, hex: '#f2f2f0', filter: 'brightness(1.08)' },
      { id: 'black', name: 'Solid Black', price: 1500, hex: '#1a1a1a', filter: 'brightness(0.42)' },
      { id: 'red', name: 'Ultra Red', price: 2000, hex: '#8b1a1a', filter: 'hue-rotate(340deg) saturate(2) brightness(0.65)' },
    ],
    wheels: [
      { id: '19', name: '19" Tempest Wheels', price: 0 },
      { id: '21', name: '21" Arachnid Wheels', price: 4500 },
    ],
    interiors: [
      { id: 'black', name: 'All Black', price: 0, swatch: '#1a1a1a' },
      { id: 'white', name: 'Black and White', price: 2000, swatch: '#e8e6e1' },
      { id: 'cream', name: 'Cream', price: 2000, swatch: '#d4c4a8' },
    ],
    autopilot: [
      { id: 'ap', name: 'Autopilot', price: 0 },
      { id: 'fsd', name: 'Full Self-Driving (Supervised)', price: 8000 },
    ],
  },
  'model-x': {
    label: 'Model X',
    img: `${BASE}dl-hero-model-x.jpg`,
    trims: [
      { id: 'lr', name: 'Long Range', price: 79990, range: '348 mi', accel: '3.8s' },
      { id: 'plaid', name: 'Plaid', price: 94990, range: '333 mi', accel: '2.5s' },
    ],
    colors: [
      { id: 'white', name: 'Pearl White Multi-Coat', price: 0, hex: '#f2f2f0', filter: 'brightness(1.08)' },
      { id: 'black', name: 'Solid Black', price: 1500, hex: '#1a1a1a', filter: 'brightness(0.42)' },
      { id: 'grey', name: 'Stealth Grey', price: 1500, hex: '#5c5c5c', filter: 'brightness(0.62) saturate(0.2)' },
    ],
    wheels: [
      { id: '20', name: '20" Cyberstream Wheels', price: 0 },
      { id: '22', name: '22" Turbine Wheels', price: 5500 },
    ],
    interiors: [
      { id: 'black', name: 'All Black', price: 0, swatch: '#1a1a1a' },
      { id: 'white', name: 'Black and White', price: 2000, swatch: '#e8e6e1' },
      { id: 'cream', name: 'Cream', price: 2000, swatch: '#d4c4a8' },
    ],
    autopilot: [
      { id: 'ap', name: 'Autopilot', price: 0 },
      { id: 'fsd', name: 'Full Self-Driving (Supervised)', price: 8000 },
    ],
  },
  cybertruck: {
    label: 'Cybertruck',
    img: `${BASE}Cybertruck-Main-Hero-Desktop.jpg`,
    trims: [
      { id: 'awd', name: 'All-Wheel Drive', price: 79990, range: '340 mi', accel: '4.1s' },
      { id: 'beast', name: 'Cyberbeast', price: 99990, range: '320 mi', accel: '2.6s' },
    ],
    colors: [{ id: 'steel', name: 'Stainless Steel', price: 0, hex: '#c5c5c5', filter: 'brightness(1) saturate(0.3)' }],
    wheels: [
      { id: '20', name: '20" Cyber Wheels', price: 0 },
      { id: '20c', name: '20" Cyber Wheel + All-Terrain', price: 3500 },
    ],
    interiors: [
      { id: 'black', name: 'All Black', price: 0, swatch: '#1a1a1a' },
      { id: 'white', name: 'Black and White', price: 1000, swatch: '#e8e6e1' },
    ],
    autopilot: [
      { id: 'ap', name: 'Autopilot', price: 0 },
      { id: 'fsd', name: 'Full Self-Driving (Supervised)', price: 8000 },
    ],
  },
};

function pick(catalog: (typeof CATALOG)[string], cfg: Config) {
  const trim = catalog.trims.find((t) => t.id === cfg.trim) || catalog.trims[0];
  const color = catalog.colors.find((c) => c.id === cfg.color) || catalog.colors[0];
  const wheels = catalog.wheels.find((w) => w.id === cfg.wheels) || catalog.wheels[0];
  const interior = catalog.interiors.find((i) => i.id === cfg.interior) || catalog.interiors[0];
  const autopilot = catalog.autopilot.find((a) => a.id === cfg.autopilot) || catalog.autopilot[0];
  const total = trim.price + color.price + wheels.price + interior.price + autopilot.price;
  return { trim, color, wheels, interior, autopilot, total };
}

function OptionRow({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: { id: string; name: string; price: number }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: T.dark, marginBottom: '12px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map((o) => {
          const on = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '14px 16px', borderRadius: '4px', cursor: 'pointer', fontFamily: T.font, textAlign: 'left',
                border: `1px solid ${on ? T.dark : T.grayBorder}`,
                background: on ? T.grayBg : T.white,
              }}
            >
              <span style={{ fontSize: '15px', fontWeight: on ? 600 : 400, color: T.dark }}>{o.name}</span>
              <span style={{ fontSize: '14px', color: T.gray }}>{o.price === 0 ? 'Included' : `+$${o.price.toLocaleString()}`}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function ConfiguratorPage() {
  const { slug = 'model-3' } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const catalog = CATALOG[slug] || CATALOG['model-3'];
  const vehicleSlug = CATALOG[slug] ? slug : 'model-3';

  const [cfg, setCfg] = useState<Config>({
    trim: catalog.trims[0].id,
    color: catalog.colors[0].id,
    wheels: catalog.wheels[0].id,
    interior: catalog.interiors[0].id,
    autopilot: catalog.autopilot[0].id,
  });
  const [step, setStep] = useState<'build' | 'checkout'>('build');
  const [lead, setLead] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const c = CATALOG[slug] || CATALOG['model-3'];
    setCfg({
      trim: c.trims[0].id,
      color: c.colors[0].id,
      wheels: c.wheels[0].id,
      interior: c.interiors[0].id,
      autopilot: c.autopilot[0].id,
    });
    setStep('build');
    setStatus('idle');
    window.scrollTo(0, 0);
  }, [slug]);

  const selection = useMemo(() => pick(catalog, cfg), [catalog, cfg]);
  const set = (k: keyof Config, v: string) => setCfg((c) => ({ ...c, [k]: v }));

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.name || !lead.email) {
      setStatus('error');
      setErrorMsg('Name and email are required.');
      return;
    }
    setStatus('sending');
    const res = await postOrderInquiry({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      vehicle: vehicleSlug,
      trim: selection.trim.name,
      color: selection.color.name,
      wheels: selection.wheels.name,
      interior: selection.interior.name,
      autopilot: selection.autopilot.name,
      estimatedPrice: `$${selection.total.toLocaleString()}`,
    });
    if (res.ok) setStatus('ok');
    else {
      setStatus('error');
      setErrorMsg(res.error);
    }
  };

  return (
    <PageShell>
      <div style={{ background: T.dark, color: T.white, padding: isMobile ? '88px 20px 32px' : '100px 40px 40px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>Design Yours</p>
            <h1 style={{ fontSize: isMobile ? '32px' : '44px', fontWeight: 700, letterSpacing: '-1px' }}>{catalog.label}</h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>{selection.color.name}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>Estimated price</div>
            <div style={{ fontSize: '28px', fontWeight: 700 }}>${selection.total.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <section style={{ background: T.white, padding: isMobile ? '24px 16px 80px' : '40px 40px 96px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: isMobile ? '28px' : '48px' }}>
          <div>
            <div style={{ borderRadius: '4px', overflow: 'hidden', aspectRatio: '16/10', background: '#0f0f0f', marginBottom: '16px', position: 'relative' }}>
              <img
                src={catalog.img}
                alt={`${catalog.label} in ${selection.color.name}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: selection.color.filter,
                  transition: 'filter 0.45s ease',
                }}
              />
            </div>
            {/* Paint swatches under image */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
              {catalog.colors.map((c) => {
                const on = cfg.color === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={c.name}
                    title={`${c.name}${c.price ? ` (+$${c.price.toLocaleString()})` : ''}`}
                    onClick={() => set('color', c.id)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: c.hex,
                      border: on ? '2px solid #171a20' : '2px solid rgba(0,0,0,0.12)',
                      boxShadow: on ? '0 0 0 2px #fff, 0 0 0 4px #171a20' : 'inset 0 0 0 1px rgba(0,0,0,0.08)',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  />
                );
              })}
            </div>
            <p style={{ textAlign: 'center', fontSize: '13px', color: T.gray, marginBottom: '16px' }}>
              {selection.color.name}
              {selection.color.price > 0 ? ` · +$${selection.color.price.toLocaleString()}` : ' · Included'}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {Object.keys(CATALOG).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => navigate(`/configure/${s}`)}
                  style={{
                    padding: '8px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: T.font,
                    border: `1px solid ${s === vehicleSlug ? T.dark : T.grayBorder}`,
                    background: s === vehicleSlug ? T.dark : T.white,
                    color: s === vehicleSlug ? T.white : T.dark,
                  }}
                >
                  {CATALOG[s].label}
                </button>
              ))}
            </div>
          </div>

          <div>
            {step === 'build' && (
              <>
                <OptionRow title="Trim" options={catalog.trims.map((t) => ({ id: t.id, name: `${t.name} · ${t.range}`, price: t.price - catalog.trims[0].price }))} value={cfg.trim} onChange={(id) => set('trim', id)} />

                <div style={{ marginBottom: '28px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: T.dark, marginBottom: '12px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Paint</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {catalog.colors.map((c) => {
                      const on = cfg.color === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => set('color', c.id)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'space-between',
                            padding: '12px 16px', borderRadius: '4px', cursor: 'pointer', fontFamily: T.font, textAlign: 'left',
                            border: `1px solid ${on ? T.dark : T.grayBorder}`,
                            background: on ? T.grayBg : T.white,
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ width: 22, height: 22, borderRadius: '50%', background: c.hex, border: '1px solid rgba(0,0,0,0.15)', flexShrink: 0 }} />
                            <span style={{ fontSize: '15px', fontWeight: on ? 600 : 400, color: T.dark }}>{c.name}</span>
                          </span>
                          <span style={{ fontSize: '14px', color: T.gray }}>{c.price === 0 ? 'Included' : `+$${c.price.toLocaleString()}`}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <OptionRow title="Wheels" options={catalog.wheels} value={cfg.wheels} onChange={(id) => set('wheels', id)} />

                <div style={{ marginBottom: '28px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: T.dark, marginBottom: '12px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Interior</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {catalog.interiors.map((c) => {
                      const on = cfg.interior === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => set('interior', c.id)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'space-between',
                            padding: '12px 16px', borderRadius: '4px', cursor: 'pointer', fontFamily: T.font,
                            border: `1px solid ${on ? T.dark : T.grayBorder}`,
                            background: on ? T.grayBg : T.white,
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ width: 22, height: 22, borderRadius: '4px', background: c.swatch, border: '1px solid rgba(0,0,0,0.15)' }} />
                            <span style={{ fontSize: '15px', fontWeight: on ? 600 : 400, color: T.dark }}>{c.name}</span>
                          </span>
                          <span style={{ fontSize: '14px', color: T.gray }}>{c.price === 0 ? 'Included' : `+$${c.price.toLocaleString()}`}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <OptionRow title="Autopilot" options={catalog.autopilot} value={cfg.autopilot} onChange={(id) => set('autopilot', id)} />

                <div style={{ borderTop: `1px solid ${T.grayBorder}`, paddingTop: '20px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: T.gray }}>
                    <span>{selection.trim.name}</span><span>${selection.trim.price.toLocaleString()}</span>
                  </div>
                  {selection.color.price > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: T.gray }}><span>{selection.color.name}</span><span>${selection.color.price.toLocaleString()}</span></div>}
                  {selection.wheels.price > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: T.gray }}><span>{selection.wheels.name}</span><span>${selection.wheels.price.toLocaleString()}</span></div>}
                  {selection.interior.price > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: T.gray }}><span>{selection.interior.name}</span><span>${selection.interior.price.toLocaleString()}</span></div>}
                  {selection.autopilot.price > 0 && <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: T.gray }}><span>{selection.autopilot.name}</span><span>${selection.autopilot.price.toLocaleString()}</span></div>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '18px', fontWeight: 700, color: T.dark }}>
                    <span>Total</span><span>${selection.total.toLocaleString()}</span>
                  </div>
                  <div style={{ marginTop: '20px' }}>
                    <TeslaButton variant="dark" size="lg" fullWidth onClick={() => setStep('checkout')}>Continue to Payment</TeslaButton>
                  </div>
                </div>
              </>
            )}

            {step === 'checkout' && (
              <form onSubmit={submitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: T.dark, marginBottom: '4px' }}>Order</h2>
                <p style={{ fontSize: '14px', color: T.gray, marginBottom: '8px' }}>
                  {catalog.label} · {selection.trim.name} · {selection.color.name} · ${selection.total.toLocaleString()}
                </p>
                {status === 'ok' && (
                  <div style={{ padding: '16px', background: T.grayBg, borderRadius: '4px', fontSize: '14px', color: T.dark }}>
                    Order request received. A Tesla Advisor will follow up shortly.
                  </div>
                )}
                {status === 'error' && (
                  <div style={{ padding: '16px', background: '#fef2f2', borderRadius: '4px', fontSize: '14px', color: T.red }}>{errorMsg}</div>
                )}
                {status !== 'ok' && (
                  <>
                    <div>
                      <label style={labelStyle}>Name *</label>
                      <input style={inputStyle} value={lead.name} onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))} required />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input type="email" style={inputStyle} value={lead.email} onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))} required />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone</label>
                      <input style={inputStyle} value={lead.phone} onChange={(e) => setLead((l) => ({ ...l, phone: e.target.value }))} />
                    </div>
                    <TeslaButton type="submit" variant="dark" size="lg" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Submitting…' : 'Place Order'}
                    </TeslaButton>
                  </>
                )}
                <TeslaButton type="button" variant="outline-dark" onClick={() => { setStep('build'); setStatus('idle'); }}>
                  Edit Design
                </TeslaButton>
              </form>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
