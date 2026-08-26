import { CSSProperties, ReactNode } from 'react';

export const T = {
  dark: '#171a20',
  black: '#000000',
  white: '#ffffff',
  gray: '#5c5e62',
  grayLight: '#8e8e8e',
  grayBg: '#f4f4f4',
  grayBorder: '#e8e8e8',
  red: '#e82127',
  font: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
} as const;

export function TeslaButton({
  children, onClick, variant = 'dark', size = 'md', fullWidth = false, style, type = 'button', disabled,
}: {
  children: ReactNode; onClick?: () => void;
  variant?: 'dark' | 'light' | 'outline-dark' | 'outline-light';
  size?: 'sm' | 'md' | 'lg'; fullWidth?: boolean; style?: CSSProperties;
  type?: 'button' | 'submit'; disabled?: boolean;
}) {
  const sizes = {
    sm: { padding: '8px 20px', fontSize: '12px', minWidth: '120px' },
    md: { padding: '10px 28px', fontSize: '14px', minWidth: '160px' },
    lg: { padding: '12px 36px', fontSize: '15px', minWidth: '200px' },
  };
  const variants: Record<string, CSSProperties> = {
    dark: { background: T.dark, color: T.white, border: `2px solid ${T.dark}` },
    light: { background: T.white, color: T.dark, border: `2px solid ${T.white}` },
    'outline-dark': { background: 'transparent', color: T.dark, border: `2px solid ${T.dark}` },
    'outline-light': { background: 'transparent', color: T.white, border: `2px solid ${T.white}` },
  };
  return (
    <button type={type} disabled={disabled} onClick={onClick}
      style={{ ...sizes[size], ...variants[variant], borderRadius: '4px', fontWeight: 600, letterSpacing: '0.02em',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, fontFamily: T.font,
        transition: 'opacity 0.15s, background 0.15s, color 0.15s', width: fullWidth ? '100%' : undefined,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style }}
      onMouseEnter={(e) => {
        if (disabled) return;
        const el = e.currentTarget;
        if (variant === 'dark') el.style.background = '#000';
        if (variant === 'outline-dark') { el.style.background = T.dark; el.style.color = T.white; }
        if (variant === 'outline-light') { el.style.background = T.white; el.style.color = T.dark; }
        if (variant === 'light') el.style.background = '#f4f4f4';
      }}
      onMouseLeave={(e) => { if (disabled) return; Object.assign(e.currentTarget.style, variants[variant]); }}
    >{children}</button>
  );
}

export function TeslaHero({ title, subtitle, eyebrow, children, bg = 'dark', minHeight = '420px', isMobile }: {
  title: ReactNode; subtitle?: ReactNode; eyebrow?: string; children?: ReactNode;
  bg?: 'dark' | 'light' | 'image'; minHeight?: string; isMobile?: boolean;
}) {
  const isDark = bg === 'dark' || bg === 'image';
  return (
    <section style={{
      background: bg === 'dark' ? T.dark : bg === 'light' ? T.white : T.dark,
      color: isDark ? T.white : T.dark,
      padding: isMobile ? '100px 24px 64px' : '140px 40px 80px',
      textAlign: 'center', minHeight, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', position: 'relative',
    }}>
      {eyebrow && <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
        color: isDark ? 'rgba(255,255,255,0.45)' : T.gray, marginBottom: '16px' }}>{eyebrow}</p>}
      <h1 style={{ fontSize: isMobile ? '36px' : '56px', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: 1.05,
        marginBottom: subtitle ? '16px' : '0', color: isDark ? T.white : T.dark }}>{title}</h1>
      {subtitle && <p style={{ fontSize: isMobile ? '15px' : '18px', color: isDark ? 'rgba(255,255,255,0.55)' : T.gray,
        maxWidth: '540px', lineHeight: 1.6, marginBottom: children ? '36px' : '0' }}>{subtitle}</p>}
      {children}
    </section>
  );
}

export function TeslaBadge({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span style={{ display: 'inline-block', padding: '4px 10px', fontSize: '11px', fontWeight: 600,
      letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '2px',
      background: dark ? 'rgba(255,255,255,0.12)' : T.grayBg, color: dark ? T.white : T.dark }}>{children}</span>
  );
}

export function PageShell({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <main style={{ paddingTop: 'var(--header-height, 56px)', paddingBottom: 'calc(var(--bottom-bar-height, 64px) + env(safe-area-inset-bottom, 0px) + 16px)', minHeight: '100vh', ...style }}>{children}</main>;
}

export const inputStyle: CSSProperties = {
  width: '100%', padding: '12px 16px', fontSize: '15px', fontFamily: T.font,
  border: `1px solid ${T.grayBorder}`, borderRadius: '4px', background: T.white, color: T.dark,
  outline: 'none', boxSizing: 'border-box',
};

export const labelStyle: CSSProperties = {
  display: 'block', fontSize: '13px', fontWeight: 600, color: T.dark, marginBottom: '6px', letterSpacing: '0.01em',
};
