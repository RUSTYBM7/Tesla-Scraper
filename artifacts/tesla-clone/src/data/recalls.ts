export interface RecallEntity {
  id: string;
  campaign: string;
  models: string[];
  date: string;
  status: 'Open' | 'Completed' | 'Informational';
  summary: string;
}

export const RECALLS: RecallEntity[] = [
  { id: '23V-085', campaign: 'Autopilot Full Self-Driving Software', models: ['Model 3', 'Model Y', 'Model S', 'Model X'], date: '2023-02-16', status: 'Completed', summary: 'Software updates refine certain Full Self-Driving (Supervised) behaviors. Install the latest firmware when prompted.' },
  { id: '23V-609', campaign: 'Seatbelt Pretensioner Inspection', models: ['Model S', 'Model X'], date: '2023-09-05', status: 'Open', summary: 'Owners will be notified to schedule an inspection of seatbelt pretensioner components where applicable.' },
  { id: '24V-112', campaign: 'Charge Port Door Alignment', models: ['Cybertruck'], date: '2024-03-12', status: 'Open', summary: 'Service procedure to ensure charge port door latches and seals correctly under all conditions.' },
];
