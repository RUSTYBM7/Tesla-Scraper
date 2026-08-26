import { useMemo, useState } from 'react';
import { TeslaHero, PageShell, T, inputStyle, labelStyle } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { LOCATIONS, type LocationEntity } from '../data/locations';
import Footer from '../components/Footer';

const TYPES: Array<LocationEntity['type'] | 'All'> = ['All', 'Store', 'Service', 'Supercharger', 'Body Shop'];

export default function LocationsPage() {
  const isMobile = useIsMobile();
  const [type, setType] = useState<(typeof TYPES)[number]>('All');
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    return LOCATIONS.filter((l) => {
      if (type !== 'All' && l.type !== type) return false;
      if (q) {
        const s = `${l.name} ${l.city} ${l.state} ${l.address}`.toLowerCase();
        if (!s.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [type, q]);

  return (
    <PageShell>
      <TeslaHero eyebrow="Find Us" title="Locations" subtitle="Demo directory of stores, service centers, and Superchargers." isMobile={isMobile} minHeight="280px" />
      <section style={{ background: T.white, padding: isMobile ? '24px 16px 80px' : '32px 40px 96px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={labelStyle}>Search</label>
            <input style={inputStyle} value={q} onChange={(e) => setQ(e.target.value)} placeholder="City, state, or name" />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                style={{
                  padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600, cursor: 'pointer', fontFamily: T.font,
                  border: `1px solid ${type === t ? T.dark : T.grayBorder}`,
                  background: type === t ? T.dark : T.white,
                  color: type === t ? T.white : T.dark,
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: T.gray, marginBottom: '16px' }}>{list.length} locations</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {list.map((l) => (
              <div key={l.id} style={{ padding: '18px 20px', background: T.grayBg, borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: T.dark }}>{l.name}</div>
                    <div style={{ fontSize: '13px', color: T.gray, marginTop: '4px' }}>{l.address} · {l.city}, {l.state}</div>
                    <div style={{ fontSize: '13px', color: T.gray, marginTop: '4px' }}>{l.hours}</div>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: T.dark, alignSelf: 'flex-start' }}>{l.type}</div>
                </div>
              </div>
            ))}
            {list.length === 0 && <p style={{ textAlign: 'center', color: T.gray, padding: '32px' }}>No locations match your filters.</p>}
          </div>
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
