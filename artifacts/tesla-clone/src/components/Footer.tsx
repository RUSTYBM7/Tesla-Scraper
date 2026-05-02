const footerLinks = [
  { label: 'Tesla © 2024', href: '#' },
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
      padding: '16px 48px 80px',
      borderTop: '1px solid #e5e5e5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '8px 24px',
    }}>
      {footerLinks.map((link) => (
        <a key={link.label} href={link.href} style={{
          fontSize: '12px',
          color: '#5c5e62',
          transition: 'color 0.2s',
        }}
          onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = '#171a20'}
          onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = '#5c5e62'}
        >
          {link.label}
        </a>
      ))}
      <div style={{ fontSize: '12px', color: '#5c5e62', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <svg viewBox="0 0 16 16" width="12" height="12" fill="#5c5e62">
          <circle cx="8" cy="8" r="7" stroke="#5c5e62" strokeWidth="1.5" fill="none" />
          <path d="M8 4v4l2.5 1.5" stroke="#5c5e62" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
        United States
      </div>
    </footer>
  );
}
