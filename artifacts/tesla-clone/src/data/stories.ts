const BASE = import.meta.env.BASE_URL;

export interface StoryEntity {
  id: string;
  title: string;
  author: string;
  vehicle: string;
  excerpt: string;
  img: string;
}

export const STORIES: StoryEntity[] = [
  { id: '1', title: 'Coast to Coast on Superchargers', author: 'Alex R.', vehicle: 'Model 3', excerpt: 'Cross-country trip with minimal planning — the network made range anxiety a non-issue.', img: `${BASE}hero-highway.jpg` },
  { id: '2', title: 'Powerwall Through a Storm', author: 'Jordan M.', vehicle: 'Powerwall', excerpt: 'Three days offline; the home stayed powered while the neighborhood waited for the grid.', img: `${BASE}energy-powerwall.jpg` },
  { id: '3', title: 'Family Road Trip in Model Y', author: 'Sam K.', vehicle: 'Model Y', excerpt: 'Seven seats, quiet cabin, and destination charging at every hotel stop.', img: `${BASE}dl-hero-model-y.jpg` },
  { id: '4', title: 'Worksite Ready Cybertruck', author: 'Chris T.', vehicle: 'Cybertruck', excerpt: 'Towing, bed capacity, and onboard power changed how we move tools between sites.', img: `${BASE}Cybertruck-Main-Hero-Desktop.jpg` },
];
