export interface EventEntity {
  id: string;
  title: string;
  date: string;
  city: string;
  state: string;
  type: 'Demo Drive' | 'Product Launch' | 'Community' | 'Virtual';
  description: string;
}

export const EVENTS: EventEntity[] = [
  { id: '1', title: 'Model Y Demo Day', date: '2026-09-12', city: 'Austin', state: 'TX', type: 'Demo Drive', description: 'Experience Model Y with Tesla advisors on site.' },
  { id: '2', title: 'Cybertruck Owner Meetup', date: '2026-09-20', city: 'Los Angeles', state: 'CA', type: 'Community', description: 'Connect with owners and explore accessories.' },
  { id: '3', title: 'Home Energy Workshop', date: '2026-10-02', city: 'Online', state: '', type: 'Virtual', description: 'Solar, Powerwall, and virtual power plant basics.' },
  { id: '4', title: 'FSD Supervised Showcase', date: '2026-10-15', city: 'San Jose', state: 'CA', type: 'Demo Drive', description: 'Supervised demos on local routes with safety staff.' },
  { id: '5', title: 'Tesla Shop Pop-up', date: '2026-10-28', city: 'Miami', state: 'FL', type: 'Product Launch', description: 'Apparel, lifestyle, and charging accessories.' },
];
