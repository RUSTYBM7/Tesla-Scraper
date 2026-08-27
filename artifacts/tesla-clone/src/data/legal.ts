export interface LegalSection {
  id: string;
  title: string;
  body: string;
}

export const LEGAL_SECTIONS: LegalSection[] = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    body: 'Tesla collects information to operate, improve, and personalize products and services. Information may include account details, vehicle telemetry, energy product data, website interactions, and communications with Tesla. We use this information to provide services, process transactions, improve safety and performance, and communicate updates. You may manage certain preferences in your Tesla Account and vehicle settings.',
  },
  {
    id: 'data',
    title: 'Data We Collect',
    body: 'Depending on how you interact with Tesla, we may process contact information, payment and financing details, vehicle identification and usage data, charging session information, app activity, device identifiers, and support correspondence. Vehicle cameras and sensors may process environmental data to support Autopilot and Full Self-Driving (Supervised) features under applicable settings and laws.',
  },
  {
    id: 'sharing',
    title: 'How We Share Information',
    body: 'Tesla may share information with service providers that support operations, payment processors, affiliated entities, and as required by law or to protect the rights, safety, and property of Tesla, our customers, or the public. We do not sell personal information.',
  },
  {
    id: 'rights',
    title: 'Your Rights',
    body: 'Depending on your jurisdiction, you may have rights to access, correct, delete, or restrict certain processing of personal information, and to opt out of certain communications. Submit requests through your Tesla Account or Contact Support. We will respond in accordance with applicable law.',
  },
  {
    id: 'terms',
    title: 'Terms of Use',
    body: 'By accessing Tesla websites, apps, and online services, you agree to these terms. Content is provided for informational purposes regarding Tesla products and services. Unauthorized scraping, interference, or misuse of services is prohibited. Product availability, pricing, and specifications may change.',
  },
  {
    id: 'vehicles',
    title: 'Vehicle & Product Terms',
    body: 'Vehicle purchases, leases, financing, energy products, and subscriptions are governed by the agreements presented at order and delivery. Features such as Autopilot and Full Self-Driving (Supervised) require an attentive driver and may vary by region, software version, and hardware configuration.',
  },
  {
    id: 'contact-legal',
    title: 'Contact',
    body: 'For privacy or legal inquiries, contact Tesla, Inc., 1 Tesla Road, Austin, TX 78725, or use the Contact page to reach Support. Additional regional notices may apply based on your location.',
  },
];
