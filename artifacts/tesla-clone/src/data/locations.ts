export interface LocationEntity {
  id: string;
  name: string;
  type: 'Store' | 'Service' | 'Supercharger' | 'Body Shop' | 'Destination';
  city: string;
  state: string;
  zip: string;
  address: string;
  hours: string;
  phone: string;
  stalls?: number;
  amenities?: string[];
  lat: number;
  lng: number;
}

export const LOCATIONS: LocationEntity[] = [
  { id: '1', name: 'Tesla Fremont', type: 'Service', city: 'Fremont', state: 'CA', zip: '94538', address: '45500 Fremont Blvd', hours: 'Mon–Sat 7am–7pm', phone: '510-516-9518', amenities: ['Mobile Service', 'Loaner'], lat: 37.492, lng: -121.944 },
  { id: '2', name: 'Tesla Palo Alto', type: 'Store', city: 'Palo Alto', state: 'CA', zip: '94306', address: '1800 El Camino Real', hours: 'Daily 10am–7pm', phone: '650-681-5100', amenities: ['Demo Drive', 'Retail'], lat: 37.441, lng: -122.143 },
  { id: '3', name: 'Giga Texas Experience Center', type: 'Store', city: 'Austin', state: 'TX', zip: '78725', address: '13101 Tesla Rd', hours: 'Daily 10am–7pm', phone: '512-516-8177', amenities: ['Demo Drive', 'Factory Tours'], lat: 30.221, lng: -97.618 },
  { id: '4', name: 'Tesla Chelsea', type: 'Store', city: 'New York', state: 'NY', zip: '10014', address: '459 W 14th St', hours: 'Daily 10am–8pm', phone: '212-399-9010', amenities: ['Demo Drive'], lat: 40.741, lng: -74.007 },
  { id: '5', name: 'Tesla Design Studio Miami', type: 'Store', city: 'Miami', state: 'FL', zip: '33133', address: '3390 Mary St', hours: 'Daily 10am–7pm', phone: '305-677-9225', amenities: ['Demo Drive', 'Retail'], lat: 25.728, lng: -80.238 },
  { id: '6', name: 'Tesla Seattle', type: 'Store', city: 'Seattle', state: 'WA', zip: '98109', address: '500 Yale Ave N', hours: 'Daily 10am–7pm', phone: '206-456-9800', amenities: ['Demo Drive'], lat: 47.623, lng: -122.330 },
  { id: '7', name: 'Tesla Service Chicago', type: 'Service', city: 'Chicago', state: 'IL', zip: '60607', address: '901 W Fulton Market', hours: 'Mon–Fri 7am–7pm', phone: '312-600-1800', amenities: ['Mobile Service', 'Body Shop Nearby'], lat: 41.886, lng: -87.650 },
  { id: '8', name: 'Tesla Denver Cherry Creek', type: 'Store', city: 'Denver', state: 'CO', zip: '80206', address: '3000 E 1st Ave', hours: 'Daily 10am–7pm', phone: '303-357-5000', amenities: ['Demo Drive'], lat: 39.718, lng: -104.950 },
  { id: '9', name: 'Supercharger Bakersfield North', type: 'Supercharger', city: 'Bakersfield', state: 'CA', zip: '93308', address: '2601 Camino Del Rio Ct', hours: '24/7', phone: '', stalls: 20, amenities: ['Restrooms Nearby', 'V3'], lat: 35.393, lng: -119.037 },
  { id: '10', name: 'Tesla Collision Center Los Angeles', type: 'Body Shop', city: 'Los Angeles', state: 'CA', zip: '90016', address: '8800 Washington Blvd', hours: 'Mon–Fri 7am–4pm', phone: '310-997-2000', amenities: ['OEM Parts', 'Insurance Partners'], lat: 34.029, lng: -118.382 },
  { id: '11', name: 'Supercharger Barstow Outlets', type: 'Supercharger', city: 'Barstow', state: 'CA', zip: '92311', address: '2796 Tanger Way', hours: '24/7', phone: '', stalls: 40, amenities: ['Shopping', 'Food', 'V3'], lat: 34.887, lng: -117.023 },
  { id: '12', name: 'Destination — Four Seasons Resort', type: 'Destination', city: 'Scottsdale', state: 'AZ', zip: '85255', address: '10600 E Crescent Moon Dr', hours: 'Guest access', phone: '', stalls: 6, amenities: ['Hotel', 'Destination Charging'], lat: 33.766, lng: -111.850 },
  { id: '13', name: 'Tesla Service Atlanta', type: 'Service', city: 'Atlanta', state: 'GA', zip: '30318', address: '1200 Marietta Blvd NW', hours: 'Mon–Sat 7am–7pm', phone: '404-480-1000', amenities: ['Mobile Service'], lat: 33.787, lng: -84.436 },
  { id: '14', name: 'Tesla Boston', type: 'Store', city: 'Boston', state: 'MA', zip: '02116', address: '800 Boylston St', hours: 'Daily 10am–8pm', phone: '617-297-1000', amenities: ['Demo Drive', 'Retail'], lat: 42.347, lng: -71.082 },
  { id: '15', name: 'Supercharger Dallas North', type: 'Supercharger', city: 'Dallas', state: 'TX', zip: '75240', address: '13331 Preston Rd', hours: '24/7', phone: '', stalls: 24, amenities: ['V4', 'Restrooms Nearby'], lat: 32.927, lng: -96.804 },
];
