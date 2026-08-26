import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BASE = import.meta.env.BASE_URL;

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 768);
  useEffect(() => { const h = () => setM(window.innerWidth < 768); window.addEventListener('resize', h); return () => window.removeEventListener('resize', h); }, []);
  return m;
}

interface EnergyProduct {
  title: string; tagline: string; subtitle: string;
  heroImg: string; heroPos: string; light: boolean;
  price: string; priceNote: string;
  stats: { value: string; unit: string; label: string }[];
  sections: { heading: string; body: string; img?: string }[];
  specs: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
}

const PRODUCTS: Record<string, EnergyProduct> = {
  'solar-panels': {
    title: 'Solar Panels', tagline: 'More Power. Lower Bills.', subtitle: 'Produce clean energy from the sun and reduce your monthly electricity bill.',
    heroImg: `${BASE}energy-solar.jpg`, heroPos: 'center 50%', light: true,
    price: 'Starting at $8,200', priceNote: 'After federal tax credit',
    stats: [
      { value: '400W', unit: '', label: 'Per Panel Output' },
      { value: '30', unit: 'yr', label: 'Panel Lifespan' },
      { value: '25', unit: 'yr', label: 'Power Warranty' },
      { value: '10', unit: 'yr', label: 'Product Warranty' },
    ],
    sections: [
      { heading: 'Made for Every Home', body: 'Tesla solar panels are built with high-efficiency cells that generate more electricity from less space. They\'re low-profile and sleek, designed to complement your home\'s aesthetics rather than detract from them. Every system is installed by Tesla-certified technicians to ensure reliability for decades.' },
      { heading: 'Real Savings, Every Month', body: 'On average, Tesla solar panel owners save $1,000–$1,500 per year on electricity. With net metering, excess energy your panels generate can be sold back to your utility company, further reducing your bill. Pair with Powerwall for maximum savings and backup power.' },
      { heading: 'Simple, Powerful App', body: 'Monitor your solar production, home energy usage, and Powerwall charge level in real time using the Tesla app. Set preferences for when to use solar, store, or sell energy — all from your phone.' },
    ],
    specs: [
      ['Panel Type', 'Monocrystalline Silicon'],
      ['Efficiency', 'Up to 21.5%'],
      ['Power Output', '400W per panel'],
      ['Temperature Coefficient', '-0.27% / °C'],
      ['System Warranty', '10-year product, 25-year performance'],
      ['Inverter', 'String inverter or microinverter'],
      ['Monitoring', 'Real-time via Tesla app'],
      ['Compatible with', 'Powerwall, Tesla vehicles'],
    ].map(([label, value]) => ({ label, value })),
    faqs: [
      { q: 'How long does installation take?', a: 'Most solar panel installations are completed in one day. The permitting process before installation typically takes 1–3 weeks depending on your local jurisdiction.' },
      { q: 'What happens during a power outage?', a: 'Solar panels alone do not provide backup power during outages. You need to pair solar with a Powerwall to keep your home powered when the grid goes down.' },
      { q: 'Is my roof suitable for solar?', a: 'Tesla\'s online design tool can assess your roof\'s solar potential using satellite imagery. A south-facing roof with minimal shading is ideal, though east and west orientations also work well.' },
      { q: 'What incentives are available?', a: 'The federal Residential Clean Energy Credit offers a 30% tax credit on the total cost of your solar system. Many states and utilities offer additional rebates and incentives.' },
    ],
  },
  'solar-roof': {
    title: 'Solar Roof', tagline: 'Looks Great. Generates Power.', subtitle: 'Replace your roof and power your home with beautiful solar tiles designed to last.',
    heroImg: `${BASE}energy-solar-roof.jpg`, heroPos: 'center 50%', light: false,
    price: 'Contact for Quote', priceNote: 'Pricing varies by roof size and complexity',
    stats: [
      { value: '22+', unit: 'yr', label: 'Tile Warranty' },
      { value: 'Class A', unit: '', label: 'Fire Rating' },
      { value: '1.75×', unit: '', label: 'Stronger than Standard Tile' },
      { value: '30%', unit: '', label: 'Federal Tax Credit' },
    ],
    sections: [
      { heading: 'The World\'s Most Beautiful Solar', body: 'Solar Roof is a fully integrated roofing and solar solution. The tempered glass solar tiles are engineered to be three times stronger than standard roofing tiles. They\'re virtually indistinguishable from conventional premium roofing materials from the street — but they\'re generating clean electricity for your home every day.' },
      { heading: 'Built for Decades of Performance', body: 'Solar Roof comes with a 25-year tile warranty, a 25-year weatherization warranty, and a 25-year power warranty — one of the most comprehensive warranties in the industry. The tiles are engineered to withstand 130 mph winds, hail up to 1.75" diameter, and Class A fire rating.' },
      { heading: 'Complete Energy Ecosystem', body: 'Pair Solar Roof with Powerwall to store excess energy during the day and use it at night or during outages. The Tesla app gives you full visibility into production, storage, and usage — helping you maximize your energy independence every single day.' },
    ],
    specs: [
      ['Tile Type', 'Tempered glass solar + non-solar tiles'],
      ['Efficiency', 'Up to 22%'],
      ['Wind Rating', '130 mph'],
      ['Fire Rating', 'Class A (highest)'],
      ['Hail Rating', 'Up to 1.75" diameter'],
      ['Tile Warranty', '25-year weatherization'],
      ['Power Warranty', '25-year'],
      ['Monitoring', 'Tesla app, real-time'],
    ].map(([label, value]) => ({ label, value })),
    faqs: [
      { q: 'Does Solar Roof replace my entire roof?', a: 'Yes. Solar Roof replaces your existing roof entirely with a combination of solar tiles and complementary non-solar tiles, integrated seamlessly.' },
      { q: 'How is Solar Roof priced?', a: 'Solar Roof pricing depends on your roof\'s size, pitch, complexity, and solar needs. Tesla provides a custom quote after assessing your home online and in person.' },
      { q: 'What is the installation process like?', a: 'Tesla\'s own installation teams handle the entire project — from removal of your old roof to installation and final activation. The process typically takes a few days for an average home.' },
      { q: 'Can I get Solar Roof on any home?', a: 'Tesla Solar Roof is available for most residential properties in the U.S. Steep roofs, historic homes, or very complex roof designs may require additional assessment.' },
    ],
  },
  'powerwall': {
    title: 'Powerwall', tagline: 'Never Lose Power Again.', subtitle: 'Store solar energy and keep your home powered through outages, peak rates, and beyond.',
    heroImg: `${BASE}energy-powerwall.jpg`, heroPos: 'center 50%', light: false,
    price: 'Starting at $9,200', priceNote: 'Before federal tax credit and installation',
    stats: [
      { value: '13.5', unit: 'kWh', label: 'Energy Capacity' },
      { value: '11.5', unit: 'kW', label: 'Peak Power Output' },
      { value: '100', unit: '%', label: 'Round-Trip Efficiency' },
      { value: '10', unit: 'yr', label: 'Warranty' },
    ],
    sections: [
      { heading: 'Whole-Home Backup', body: 'Powerwall detects outages and automatically becomes your home\'s main energy source within milliseconds — protecting your food, devices, lights, and medical equipment. Unlike a generator, it runs silently, without fumes, and is always ready. You can even stack multiple Powerwalls for extended backup.' },
      { heading: 'Time-Based Control', body: 'Tesla\'s time-based control feature charges Powerwall when electricity is cheapest (during off-peak hours or from solar) and discharges it when rates are highest, reducing your electricity bill. This feature works with Time-of-Use utility rates available in most U.S. states.' },
      { heading: 'Storm Watch Automatically Prepares You', body: 'When a severe weather event is forecast in your area, Powerwall automatically charges to full capacity so you\'re prepared before the storm arrives. Storm Watch integrates with real-time National Weather Service data and works without any action from you.' },
    ],
    specs: [
      ['Energy Capacity', '13.5 kWh (usable)'],
      ['Power (on-grid)', '11.5 kW peak / 7.6 kW continuous'],
      ['Power (off-grid)', '9.6 kW peak / 7.6 kW continuous'],
      ['Round-Trip Efficiency', '>90%'],
      ['Depth of Discharge', '100%'],
      ['Operating Temperature', '-20°C to 50°C'],
      ['Weight', '287 lb (130 kg)'],
      ['Dimensions', '45.3" × 29.6" × 5.75"'],
    ].map(([label, value]) => ({ label, value })),
    faqs: [
      { q: 'How many Powerwalls do I need?', a: 'The number of Powerwalls depends on your home\'s energy usage and goals. One Powerwall can power essential circuits; 2–4 can power most average homes through an extended outage.' },
      { q: 'Can Powerwall work without solar?', a: 'Yes. Powerwall can charge from the grid, making it useful for backup power or time-of-use rate optimization even without solar panels.' },
      { q: 'How long will it power my home?', a: 'A single Powerwall can power essential appliances (lights, outlets, fridge, Wi-Fi) for approximately 24 hours, or longer if you reduce consumption.' },
      { q: 'Is Powerwall eligible for tax credits?', a: 'Yes. When paired with solar, Powerwall qualifies for the 30% federal Residential Clean Energy Credit. Stand-alone Powerwall installations may also qualify under certain conditions.' },
    ],
  },
  'megapack': {
    title: 'Megapack', tagline: 'Energy Storage at Scale.', subtitle: 'Tesla\'s utility-scale battery system is transforming the grid — and the future of energy.',
    heroImg: `${BASE}energy-megapack.jpg`, heroPos: 'center 50%', light: true,
    price: 'Contact for Pricing', priceNote: 'Commercial and utility projects',
    stats: [
      { value: '3.9', unit: 'MWh', label: 'Energy per Unit' },
      { value: '97', unit: '%', label: 'Round-Trip Efficiency' },
      { value: '20+', unit: 'yr', label: 'Design Life' },
      { value: 'GWh', unit: '+', label: 'Deployed Globally' },
    ],
    sections: [
      { heading: 'Grid-Scale Energy Storage', body: 'Megapack is an extremely powerful battery system that enables utilities and energy companies to store renewable energy at massive scale. Each unit stores up to 3.9 MWh and can deliver up to 1.9 MW of power. A single Megapack project can replace the equivalent of a gas peaker plant — without emissions.' },
      { heading: 'Factory-Integrated, Field-Ready', body: 'Unlike traditional battery energy storage systems that must be assembled and wired on-site, Megapack arrives from the factory fully integrated and pre-tested, dramatically reducing installation time and cost. This enables project delivery in a fraction of the time of conventional power plants.' },
      { heading: 'Autobidder: AI-Powered Energy Trading', body: 'Tesla\'s Autobidder platform is a real-time energy trading and control technology that allows Megapack operators to optimize revenue by automatically buying and selling electricity in wholesale markets. Projects around the world use Autobidder to maximize returns while stabilizing their local grid.' },
    ],
    specs: [
      ['Energy per Unit', 'Up to 3.9 MWh'],
      ['Power per Unit', 'Up to 1.9 MW'],
      ['Round-Trip Efficiency', '~97%'],
      ['AC Coupling', 'Fully integrated'],
      ['Liquid Cooling', 'Advanced thermal management'],
      ['Communications', 'LTE, Ethernet, Wi-Fi'],
      ['Enclosure Rating', 'IP55'],
      ['Design Life', '20+ years'],
    ].map(([label, value]) => ({ label, value })),
    faqs: [
      { q: 'Who can buy a Megapack?', a: 'Megapack is designed for utilities, independent power producers, commercial real estate developers, and large industrial customers. Individual homeowners should consider Powerwall instead.' },
      { q: 'What is the minimum project size?', a: 'Tesla works with projects starting at approximately 10 MWh. Larger projects can involve thousands of Megapack units and hundreds of MWh or GWh of capacity.' },
      { q: 'Where is Megapack manufactured?', a: 'Megapack is manufactured at Tesla\'s Megafactory in Lathrop, California — the world\'s largest dedicated battery storage factory, with an annual capacity of 40 GWh.' },
      { q: 'What markets is Megapack available in?', a: 'Megapack is available globally, with deployments in the United States, Australia, United Kingdom, Germany, Japan, and many other countries.' },
    ],
  },
};

export default function EnergyPage() {
  const { product } = useParams<{ product: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeSpec, setActiveSpec] = useState<boolean>(false);
  const data = PRODUCTS[product || ''] || PRODUCTS['powerwall'] || Object.values(PRODUCTS)[0];

  useEffect(() => { window.scrollTo(0, 0); }, [product]);

  return (

    <div style={{ fontFamily: 'Inter, -apple-system, sans-serif' , paddingBottom: 'calc(var(--bottom-bar-height, 64px) + 24px)'}}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .faq-item{border-bottom:1px solid #e5e7eb;overflow:hidden}
        .section-block:nth-child(even){flex-direction:row-reverse}
      `}</style>

      {/* Hero */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#0d1117' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${data.heroImg})`, backgroundSize: 'cover', backgroundPosition: data.heroPos }} />
        <div style={{ position: 'absolute', inset: 0, background: data.light ? 'linear-gradient(180deg,rgba(0,0,0,.35) 0%,rgba(0,0,0,.1) 50%,rgba(0,0,0,.65) 100%)' : 'linear-gradient(180deg,rgba(0,0,0,.45) 0%,rgba(0,0,0,.2) 50%,rgba(0,0,0,.7) 100%)' }} />
        <div style={{ position: 'absolute', top: '18%', left: 0, right: 0, textAlign: 'center', animation: 'fadeUp .8s ease .1s both', padding: '0 24px' }}>
          <p style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,.65)', textTransform: 'uppercase', marginBottom: '16px' }}>Tesla Energy</p>
          <h1 style={{ fontSize: isMobile ? '42px' : '72px', fontWeight: 700, color: '#fff', letterSpacing: '-2px', lineHeight: 1.02, marginBottom: '16px' }}>{data.title}</h1>
          <p style={{ fontSize: isMobile ? '16px' : '20px', color: 'rgba(255,255,255,.75)', maxWidth: '540px', margin: '0 auto 12px' }}>{data.tagline}</p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.55)', maxWidth: '480px', margin: '0 auto' }}>{data.subtitle}</p>
        </div>
        <div style={{ position: 'absolute', bottom: '10%', left: 0, right: 0, textAlign: 'center', display: 'flex', gap: isMobile ? '10px' : '16px', justifyContent: 'center', flexWrap: 'wrap', padding: '0 24px', animation: 'fadeUp .8s ease .3s both' }}>
          <button onClick={() => navigate('/contact?subject=energy')} style={{ padding: '14px 40px', borderRadius: '4px', background: '#fff', color: '#171a20', border: 'none', fontSize: '14px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'opacity .2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.88'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
          >{data.title === 'Megapack' ? 'Contact Us' : 'Order Now'}</button>
          <button onClick={() => navigate('/contact?subject=energy')} style={{ padding: '14px 40px', borderRadius: '4px', background: 'rgba(255,255,255,.18)', color: '#fff', border: '1.5px solid rgba(255,255,255,.5)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', backdropFilter: 'blur(8px)', transition: 'background .2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.28)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.18)'}
          >Schedule a Consultation</button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: `repeat(${data.stats.length},1fr)`, gap: '1px', background: '#eee' }}>
          {data.stats.map((s, i) => (
            <div key={s.label} style={{ background: '#fff', padding: isMobile ? '20px 12px' : '32px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '24px' : '36px', fontWeight: 700, color: '#171a20', lineHeight: 1 }}>{s.value}<span style={{ fontSize: isMobile ? '14px' : '18px' }}>{s.unit}</span></div>
              <div style={{ fontSize: '12px', color: '#6e7180', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Price banner */}
      <div style={{ background: '#f8f9fa', borderBottom: '1px solid #eee', padding: '20px 24px', textAlign: 'center' }}>
        <span style={{ fontSize: '22px', fontWeight: 700, color: '#171a20' }}>{data.price}</span>
        <span style={{ fontSize: '13px', color: '#9ca3af', marginLeft: '12px' }}>{data.priceNote}</span>
      </div>

      {/* Content sections */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '48px 20px' : '80px 40px' }}>
        {data.sections.map((s, i) => (
          <div key={s.heading} style={{ display: 'flex', flexDirection: isMobile ? 'column' : i % 2 === 0 ? 'row' : 'row-reverse', gap: '60px', alignItems: 'center', marginBottom: isMobile ? '56px' : '96px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ fontSize: isMobile ? '28px' : '38px', fontWeight: 700, color: '#171a20', letterSpacing: '-1px', marginBottom: '18px', lineHeight: 1.15 }}>{s.heading}</h2>
              <p style={{ fontSize: '16px', color: '#5c5e62', lineHeight: 1.75 }}>{s.body}</p>
            </div>
            <div style={{ flex: 1, minWidth: 0, background: 'linear-gradient(135deg,#1a1f2e,#2d3748)', borderRadius: '20px', height: isMobile ? '220px' : '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <div style={{ textAlign: 'center', padding: '32px' }}>
                <div style={{ width: '64px', height: '64px', margin: '0 auto 16px', borderRadius: '50%', background: 'rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="1.5" strokeLinecap="round">
                    {i === 0 ? <><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></> : i === 1 ? <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></> : <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>}
                  </svg>
                </div>
                <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '13px' }}>Tesla {data.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Specs */}
      <div style={{ background: '#0d1117', padding: isMobile ? '48px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 700, color: '#fff', letterSpacing: '-1px', marginBottom: '8px', textAlign: 'center' }}>Specifications</h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,.45)', textAlign: 'center', marginBottom: '40px' }}>{data.title} technical details</p>
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)' }}>
            {data.specs.map((spec, i) => (
              <div key={spec.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 24px', background: i % 2 === 0 ? 'rgba(255,255,255,.03)' : 'transparent', borderBottom: i < data.specs.length - 1 ? '1px solid rgba(255,255,255,.06)' : 'none', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '14px', color: 'rgba(255,255,255,.5)' }}>{spec.label}</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff', textAlign: 'right' }}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ background: '#f8f9fa', padding: isMobile ? '48px 20px' : '80px 40px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 700, color: '#171a20', letterSpacing: '-1px', marginBottom: '8px', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: '15px', color: '#9ca3af', textAlign: 'center', marginBottom: '40px' }}>Everything you need to know about {data.title}</p>
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff' }}>
            {data.faqs.map((faq, i) => (
              <div key={faq.q} style={{ borderBottom: i < data.faqs.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
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

      {/* CTA */}
      <div style={{ background: '#171a20', padding: isMobile ? '60px 24px' : '100px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: isMobile ? '32px' : '52px', fontWeight: 700, color: '#fff', letterSpacing: '-1.5px', marginBottom: '16px' }}>Ready to Go Solar?</h2>
        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,.5)', maxWidth: '440px', margin: '0 auto 40px' }}>Join millions of Tesla owners who are generating their own clean energy at home.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/contact?subject=energy')} style={{ padding: '15px 48px', borderRadius: '8px', background: '#fff', color: '#171a20', border: 'none', fontSize: '15px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Get Started</button>
          <button onClick={() => navigate('/gallery')} style={{ padding: '15px 48px', borderRadius: '8px', background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,.3)', fontSize: '15px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>See Gallery</button>
        </div>
      </div>
    </div>
  );
}
