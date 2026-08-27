import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeslaButton, TeslaHero, PageShell, T, inputStyle, labelStyle } from '../components/tesla-ui';
import { useIsMobile } from '../hooks/use-is-mobile';
import { LOCATIONS, type LocationEntity } from '../data/locations';
import Footer from '../components/Footer';

const TYPES: Array<LocationEntity['type'] | 'All'> = ['All', 'Store', 'Service', 'Supercharger', 'Body Shop', 'Destination'];

export default function LocationsPage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [type, setType] = useState<(typeof TYPES)[number]>('All');
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState<LocationEntity | null>(null);

  const list = useMemo(() => {
    return LOCATIONS.filter((l) => {
      if (type !== 'All' && l.type !== type) return false;
      if (q) {
        const s = `${l.name} ${l.city} ${l.state} ${l.zip} ${l.address}`.toLowerCase();
        if (!s.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [type, q]);

  return (
    <PageShell>
      <TeslaHero eyebrow="Find Us" title="Tesla Locations" subtitle="Stores, Service Centers, Superchargers, and more." isMobile={isMobile} minHeight="280px" />
      <section style={{ background: T.white, padding: isMobile ? '24px 12px 80px' : '32px 24px 96px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : selected ? '1fr 340px' : '1fr', gap: '20px' }}>
          <div>
            <div style={{ marginBottom: '12px' }}>
              <label style={labelStyle}>Search by city, state, or ZIP</label>
              <input style={inputStyle} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Austin, TX" />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  style={{
                    padding: '8px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: T.font,
                    border: `1px solid ${type === t ? T.dark : T.grayBorder}`,
                    background: type === t ? T.dark : T.white,
                    color: type === t ? T.white : T.dark,
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <p style={{ fontSize: '13px', color: T.gray, marginBottom: '12px' }}>{list.length} locations</p>

            {/* Map-style grid */}
            <div
              style={{
                height: isMobile ? 180 : 220,
                borderRadius: '4px',
                background: 'linear-gradient(160deg, #1a1f2e 0%, #2d3548 50%, #1a1f2e 100%)',
                marginBottom: '16px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {list.slice(0, 12).map((l, i) => (
                <button
                  key={l.id}
                  type="button"
                  title={l.name}
                  onClick={() => setSelected(l)}
                  style={{
                    position: 'absolute',
                    left: `${8 + ((l.lng + 125) / 55) * 84}%`,
                    top: `${12 + ((48 - l.lat) / 20) * 76}%`,
                    width: selected?.id === l.id ? 14 : 10,
                    height: selected?.id === l.id ? 14 : 10,
                    borderRadius: '50%',
                    background: selected?.id === l.id ? '#fff' : '#3e6ae1',
                    border: '2px solid #fff',
                    cursor: 'pointer',
                    padding: 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.35)',
                  }}
                />
              ))}
              <div style={{ position: 'absolute', bottom: 10, left: 12, fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Tesla network map</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {list.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setSelected(l)}
                  style={{
                    textAlign: 'left',
                    padding: '16px 18px',
                    background: selected?.id === l.id ? T.grayBg : T.white,
                    border: `1px solid ${selected?.id === l.id ? T.dark : T.grayBorder}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontFamily: T.font,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: T.dark }}>{l.name}</div>
                      <div style={{ fontSize: '13px', color: T.gray, marginTop: '4px' }}>{l.address} · {l.city}, {l.state} {l.zip}</div>
                      <div style={{ fontSize: '12px', color: T.gray, marginTop: '4px' }}>{l.hours}{l.stalls ? ` · ${l.stalls} stalls` : ''}</div>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: T.dark, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{l.type}</div>
                  </div>
                </button>
              ))}
              {list.length === 0 && <p style={{ textAlign: 'center', color: T.gray, padding: '32px' }}>No locations match your search.</p>}
            </div>
          </div>

          {selected && (
            <aside style={{ background: T.grayBg, borderRadius: '4px', padding: '24px', height: 'fit-content', position: isMobile ? 'relative' : 'sticky', top: 80 }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.gray, marginBottom: '8px' }}>{selected.type}</div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: T.dark, marginBottom: '12px' }}>{selected.name}</h2>
              <p style={{ fontSize: '14px', color: T.gray, lineHeight: 1.5, marginBottom: '8px' }}>{selected.address}<br />{selected.city}, {selected.state} {selected.zip}</p>
              <p style={{ fontSize: '14px', color: T.dark, marginBottom: '8px' }}>{selected.hours}</p>
              {selected.phone && <p style={{ fontSize: '14px', color: T.dark, marginBottom: '12px' }}>{selected.phone}</p>}
              {selected.stalls && <p style={{ fontSize: '13px', color: T.gray, marginBottom: '12px' }}>{selected.stalls} charging stalls</p>}
              {selected.amenities && selected.amenities.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {selected.amenities.map((a) => (
                    <span key={a} style={{ fontSize: '11px', padding: '4px 10px', background: T.white, borderRadius: '12px', color: T.dark }}>{a}</span>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(selected.type === 'Store' || selected.type === 'Service') && (
                  <TeslaButton variant="dark" fullWidth onClick={() => navigate('/demo-drive')}>Schedule Demo Drive</TeslaButton>
                )}
                {selected.type === 'Service' && (
                  <TeslaButton variant="outline-dark" fullWidth onClick={() => navigate('/contact?subject=service')}>Schedule Service</TeslaButton>
                )}
                <TeslaButton variant="outline-dark" fullWidth onClick={() => setSelected(null)}>Close</TeslaButton>
              </div>
            </aside>
          )}
        </div>
      </section>
      <Footer />
    </PageShell>
  );
}
