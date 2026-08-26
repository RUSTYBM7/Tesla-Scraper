export interface RecallEntity {
  id: string;
  campaign: string;
  models: string[];
  date: string;
  status: 'Open' | 'Completed' | 'Informational';
  summary: string;
}

/** Educational sample data — not official Tesla recall records. */
export const RECALLS: RecallEntity[] = [
  { id: 'R-2024-01', campaign: 'Sample Software Update Notice', models: ['Model 3', 'Model Y'], date: '2024-06-01', status: 'Informational', summary: 'Illustrative over-the-air update category for educational UI only.' },
  { id: 'R-2023-12', campaign: 'Sample Seatbelt Inspection', models: ['Model S', 'Model X'], date: '2023-12-15', status: 'Open', summary: 'Demo campaign entry showing how owners might see status in an app-style list.' },
  { id: 'R-2023-08', campaign: 'Sample Charge Port Fix', models: ['Cybertruck'], date: '2023-08-20', status: 'Completed', summary: 'Example completed campaign for UI completeness.' },
];
