const BASE = import.meta.env.BASE_URL;

export interface VehicleEntity {
  slug: string;
  label: string;
  tagline: string;
  category: 'car' | 'truck' | 'suv';
  startingPrice: number;
  range: string;
  accel: string;
  topSpeed: string;
  seating: string;
  heroImg: string;
  menuImg: string;
}

export const VEHICLES: VehicleEntity[] = [
  { slug: 'model-s', label: 'Model S', tagline: 'Relentless Performance', category: 'car', startingPrice: 74990, range: '405 mi', accel: '3.1 s', topSpeed: '149 mph', seating: '5', heroImg: `${BASE}dl-hero-model-s.jpg`, menuImg: `${BASE}menu-model-s.png` },
  { slug: 'model-3', label: 'Model 3', tagline: 'Order. Drive. Enjoy.', category: 'car', startingPrice: 40240, range: '358 mi', accel: '4.2 s', topSpeed: '145 mph', seating: '5', heroImg: `${BASE}dl-hero-model-3.jpg`, menuImg: `${BASE}menu-model-3.png` },
  { slug: 'model-y', label: 'Model Y', tagline: "America's Best-Selling Vehicle", category: 'suv', startingPrice: 44990, range: '330 mi', accel: '4.8 s', topSpeed: '135 mph', seating: '5–7', heroImg: `${BASE}dl-hero-model-y.jpg`, menuImg: `${BASE}menu-model-y.jpg` },
  { slug: 'model-x', label: 'Model X', tagline: 'Beyond Ludicrous', category: 'suv', startingPrice: 79990, range: '348 mi', accel: '3.8 s', topSpeed: '149 mph', seating: '6–7', heroImg: `${BASE}dl-hero-model-x.jpg`, menuImg: `${BASE}menu-model-x.png` },
  { slug: 'cybertruck', label: 'Cybertruck', tagline: 'Built for Any Planet', category: 'truck', startingPrice: 79990, range: '340 mi', accel: '4.1 s', topSpeed: '112 mph', seating: '5', heroImg: `${BASE}Cybertruck-Main-Hero-Desktop.jpg`, menuImg: `${BASE}menu-cybertruck.png` },
];

export function getVehicle(slug: string) {
  return VEHICLES.find((v) => v.slug === slug);
}
