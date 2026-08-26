export interface LocationEntity {
  id: string;
  name: string;
  type: 'Store' | 'Service' | 'Supercharger' | 'Body Shop';
  city: string;
  state: string;
  address: string;
  hours: string;
}

export const LOCATIONS: LocationEntity[] = [
  { id: '1', name: 'Tesla Fremont Factory', type: 'Service', city: 'Fremont', state: 'CA', address: '45500 Fremont Blvd', hours: 'Mon–Sat 8am–6pm' },
  { id: '2', name: 'Tesla Palo Alto', type: 'Store', city: 'Palo Alto', state: 'CA', address: '1800 El Camino Real', hours: 'Daily 10am–7pm' },
  { id: '3', name: 'Tesla Austin Gigafactory', type: 'Service', city: 'Austin', state: 'TX', address: '13101 Tesla Rd', hours: 'Mon–Sat 8am–6pm' },
  { id: '4', name: 'Tesla Manhattan', type: 'Store', city: 'New York', state: 'NY', address: '459 W 14th St', hours: 'Daily 10am–8pm' },
  { id: '5', name: 'Tesla Miami Design Studio', type: 'Store', city: 'Miami', state: 'FL', address: '3390 Mary St', hours: 'Daily 10am–7pm' },
  { id: '6', name: 'Tesla Seattle', type: 'Store', city: 'Seattle', state: 'WA', address: '500 Yale Ave N', hours: 'Daily 10am–7pm' },
  { id: '7', name: 'Tesla Chicago Service', type: 'Service', city: 'Chicago', state: 'IL', address: '901 W Fulton Market', hours: 'Mon–Fri 8am–6pm' },
  { id: '8', name: 'Tesla Denver', type: 'Store', city: 'Denver', state: 'CO', address: '3000 E 1st Ave', hours: 'Daily 10am–7pm' },
  { id: '9', name: 'Supercharger — Bakersfield', type: 'Supercharger', city: 'Bakersfield', state: 'CA', address: 'I-5 Corridor', hours: '24/7' },
  { id: '10', name: 'Tesla Body Shop — LA', type: 'Body Shop', city: 'Los Angeles', state: 'CA', address: '8800 Washington Blvd', hours: 'Mon–Fri 8am–5pm' },
];
