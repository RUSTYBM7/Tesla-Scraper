const footerLinks = [
  { label: 'Tesla © 2025', href: '#' },
  { label: 'Privacy & Legal', href: '#' },
  { label: 'Vehicle Recalls', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'News', href: '#' },
  { label: 'Get Updates', href: '#' },
  { label: 'Locations', href: '#' },
];

export default function Footer() {
  return (
    <footer style={{
      background: '#fff',
      padding: '16px 48px 90px',
      borderTop: '1px solid #e5e5e5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '4px 20px',
    }}>
      {footerLinks.map((link) => (
        <a key={link.label} href={link.href} style={{
          fontSize: '12px',
          color: '#5c5e62',
          transition: 'color 0.15s',
          padding: '4px 2px',
          textDecoration: 'none',
        }}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#171a20'}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#5c5e62'}
        >
          {link.label}
        </a>
      ))}
      <div style={{ fontSize: '12px', color: '#5c5e62', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
        <svg viewBox="0 0 20 20" width="13" height="13" fill="none" stroke="#5c5e62" strokeWidth="1.5">
          <circle cx="10" cy="10" r="8.5" />
          <path d="M6.5 10c0-4.8 1.5-8.5 3.5-8.5s3.5 3.7 3.5 8.5-1.5 8.5-3.5 8.5S6.5 14.8 6.5 10z" />
          <line x1="1.5" y1="10" x2="18.5" y2="10" />
        </svg>
        United States
      </div>
    </footer>
  );
}
