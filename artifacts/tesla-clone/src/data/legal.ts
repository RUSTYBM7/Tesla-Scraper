export interface LegalSection {
  id: string;
  title: string;
  body: string;
}

export const LEGAL_SECTIONS: LegalSection[] = [
  {
    id: 'disclaimer',
    title: 'Educational Disclaimer',
    body: 'This website is an independent educational clone created for learning modern UI, routing, and edge deployment. It is not affiliated with, endorsed by, or connected to Tesla, Inc. Names and product concepts are used for demonstration only.',
  },
  {
    id: 'privacy',
    title: 'Privacy (Demo)',
    body: 'Contact and newsletter forms may store submissions in Cloudflare KV for this demo environment. Do not submit real personal data you are not comfortable storing in a demonstration system. No data is sold. Logs may be cleared without notice.',
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: 'This demo does not set advertising cookies. Standard browser storage may be used for UI state only.',
  },
  {
    id: 'trademarks',
    title: 'Trademarks',
    body: 'Tesla, Model S, Model 3, Model X, Model Y, Cybertruck, Powerwall, Supercharger, and related marks are trademarks of their respective owners. Use here is for educational illustration.',
  },
];
