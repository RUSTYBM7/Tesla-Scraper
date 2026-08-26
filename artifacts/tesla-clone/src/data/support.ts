export interface SupportTopic {
  id: string;
  title: string;
  description: string;
  route: string;
}

export const SUPPORT_TOPICS: SupportTopic[] = [
  { id: 'service', title: 'Service & Repairs', description: 'Schedule service, body shop, and mobile service options.', route: '/contact?subject=service' },
  { id: 'roadside', title: 'Roadside Assistance', description: '24/7 support for flat tires, tow, and lockout scenarios.', route: '/roadside' },
  { id: 'charging', title: 'Charging Help', description: 'Home charging, Superchargers, and NACS adapters.', route: '/charging' },
  { id: 'software', title: 'Software & Updates', description: 'Over-the-air updates, app pairing, and connectivity.', route: '/contact?subject=general' },
  { id: 'orders', title: 'Orders & Delivery', description: 'Order status, financing questions, and delivery timing.', route: '/account' },
  { id: 'energy', title: 'Energy Support', description: 'Solar, Powerwall, and monitoring questions.', route: '/contact?subject=energy' },
];
