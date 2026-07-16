export type Attendee = {
  name: string
  nickname: string
  role: string
  description: string
  initials: string
  image: string
}

export const activities = [
  {
    time: 'Torsdag',
    title: 'Bastu & bärs',
    text: 'Mjukstart.',
    items: ['800 grader'],
  },
  {
    time: 'Fredag',
    title: 'Bärs & Storön',
    text: 'Bastu på kvällen.',
    items: ['Roronoa Zoro', 'Plankton'],
  },
  {
    time: 'Lördag',
    title: 'Aktiviteter, bärs & bastu',
    text: 'Dagens tre grenar:',
    items: ['Par 3', 'Flygande Jakob', 'Quiz'],
  },
  {
    time: 'Söndag',
    title: 'Hemfärd',
    text: 'Städning, återställare och samma löfte som alltid: nästa år igen.',
  },
]

export const menu = [
  {
    day: 'Torsdag',
    meal: 'TBA',
    food: '',
  },
  {
    day: 'Fredag',
    meal: 'TBA',
    food: '',
  },
  {
    day: 'Lördag',
    meal: 'TBA',
    food: '',
  },
  {
    day: 'Söndag',
    meal: 'TBA',
    food: '',
  },
]

export const attendees: Attendee[] = [
  {
    name: 'Fredde',
    nickname: 'Choble',
    role: 'Aktivitetsansvarig',
    description:
      'Presentation och en högst tvivelaktig meritlista kommer snart.',
    initials: 'FC',
    image: './images/attendees/fredde-choble-soft.png',
  },
  {
    name: 'Payye',
    nickname: 'Malung 2026',
    role: 'Profil på väg',
    description:
      'Presentation och en högst tvivelaktig meritlista kommer snart.',
    initials: 'PA',
    image: './images/attendees/payye-soft.png',
  },
  {
    name: 'Fille',
    nickname: 'Malung 2026',
    role: 'Profil på väg',
    description:
      'Presentation och en högst tvivelaktig meritlista kommer snart.',
    initials: 'FI',
    image: './images/attendees/fille-soft.png',
  },
  {
    name: 'Hagge',
    nickname: 'Malung 2026',
    role: 'Kock',
    description:
      'Presentation och en högst tvivelaktig meritlista kommer snart.',
    initials: 'HA',
    image: './images/attendees/hagge-soft.png',
  },
  {
    name: 'Yavve',
    nickname: 'Malung 2026',
    role: 'Profil på väg',
    description:
      'Presentation och en högst tvivelaktig meritlista kommer snart.',
    initials: 'YA',
    image: './images/attendees/yavve-soft.png',
  },
]

export const tripYears = [
  { year: '2026', note: 'Nästa kapitel börjar 30 juli', status: 'Snart' },
  { year: '2025', note: 'Bilder kommer när arkivet öppnas', status: 'Arkiv' },
  {
    year: '2024',
    note: '26 bilder och 28 filmer från resan',
    status: 'Öppet',
    href: './archive-2024.html',
  },
]
