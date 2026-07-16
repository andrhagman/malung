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
    title: 'Inryckning & basläger',
    text: 'Ankomst, eldstart och den traditionsenliga första kalla.',
  },
  {
    time: 'Fredag',
    title: 'Fiskeexpedition',
    text: 'Tidig start, kaffe i termos och en helt rimlig mängd optimism.',
  },
  {
    time: 'Lördag',
    title: 'Vildmarkskamp',
    text: 'Grenar avslöjas på plats. Värdighet är inte en förutsättning.',
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
    meal: 'Eldstart',
    food: 'Kolbulle, lingon och något kallt ur ån',
  },
  {
    day: 'Fredag',
    meal: 'Efter fisket',
    food: 'Fångsten — eller reservplanen från charken',
  },
  {
    day: 'Lördag',
    meal: 'Långmiddag',
    food: 'Helgrillat, potatis och sås under fritt ansvar',
  },
  {
    day: 'Söndag',
    meal: 'Återställning',
    food: 'Kaffe, ägg och det som fortfarande går att steka',
  },
]

export const attendees: Attendee[] = [
  {
    name: 'Fredde',
    nickname: 'Choble',
    role: 'Profil på väg',
    description:
      'Presentation och en högst tvivelaktig meritlista kommer snart.',
    initials: 'FC',
    image: './images/attendees/fredde-choble.png',
  },
  {
    name: 'Payye',
    nickname: 'Malung 2026',
    role: 'Profil på väg',
    description:
      'Presentation och en högst tvivelaktig meritlista kommer snart.',
    initials: 'PA',
    image: './images/attendees/payye.png',
  },
  {
    name: 'Fille',
    nickname: 'Malung 2026',
    role: 'Profil på väg',
    description:
      'Presentation och en högst tvivelaktig meritlista kommer snart.',
    initials: 'FI',
    image: './images/attendees/fille.png',
  },
  {
    name: 'Hagge',
    nickname: 'Malung 2026',
    role: 'Profil på väg',
    description:
      'Presentation och en högst tvivelaktig meritlista kommer snart.',
    initials: 'HA',
    image: './images/attendees/hagge.png',
  },
  {
    name: 'Yavve',
    nickname: 'Malung 2026',
    role: 'Profil på väg',
    description:
      'Presentation och en högst tvivelaktig meritlista kommer snart.',
    initials: 'YA',
    image: './images/attendees/yavve.png',
  },
]

export const tripYears = [
  { year: '2026', note: 'Nästa kapitel börjar 30 juli', status: 'Snart' },
  { year: '2025', note: 'Bilder kommer när arkivet öppnas', status: 'Arkiv' },
  { year: '2024', note: 'Bilder kommer när arkivet öppnas', status: 'Arkiv' },
]
