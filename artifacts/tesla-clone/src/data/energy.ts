const BASE = import.meta.env.BASE_URL;

export interface EnergyProductEntity {
  slug: string;
  label: string;
  tagline: string;
  category: 'residential' | 'commercial' | 'utility';
  heroImg: string;
  menuImg: string;
  priceNote: string;
}

export const ENERGY_PRODUCTS: EnergyProductEntity[] = [
  { slug: 'solar-panels', label: 'Solar Panels', tagline: 'Convert sunlight into energy', category: 'residential', heroImg: `${BASE}energy-solar.jpg`, menuImg: `${BASE}menu-solar-hd.png`, priceNote: 'Custom quote' },
  { slug: 'solar-roof', label: 'Solar Roof', tagline: 'Looks Great. Generates Power.', category: 'residential', heroImg: `${BASE}energy-solar-roof.jpg`, menuImg: `${BASE}menu-solar-roof.png`, priceNote: 'Custom quote' },
  { slug: 'powerwall', label: 'Powerwall', tagline: 'Backup power for your home', category: 'residential', heroImg: `${BASE}energy-powerwall.jpg`, menuImg: `${BASE}menu-powerwall.png`, priceNote: 'From $9,300' },
  { slug: 'megapack', label: 'Megapack', tagline: 'Utility-scale energy storage', category: 'utility', heroImg: `${BASE}energy-megapack.jpg`, menuImg: `${BASE}menu-powerwall.png`, priceNote: 'Contact sales' },
];

export function getEnergyProduct(slug: string) {
  return ENERGY_PRODUCTS.find((p) => p.slug === slug);
}
