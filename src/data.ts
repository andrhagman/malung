export type Attendee = {
  name: string
  nickname: string
  role: string
  description: string
  initials: string
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
    name: 'Namn kommer',
    nickname: 'Lägerchefen',
    role: 'Eld & logistik',
    description:
      'Vet var tändstickorna ligger och varför ingen annan bör röra dem.',
    initials: 'LC',
  },
  {
    name: 'Namn kommer',
    nickname: 'Kaptenen',
    role: 'Fiske & sjökort',
    description:
      'Har aldrig återvänt utan en historia. Fisk är mer varierande.',
    initials: 'KA',
  },
  {
    name: 'Namn kommer',
    nickname: 'Köksmästaren',
    role: 'Mat & proviant',
    description:
      'Lagar middag på gjutjärn och rena känslor. Recept är vägledning.',
    initials: 'KM',
  },
  {
    name: 'Namn kommer',
    nickname: 'Materialaren',
    role: 'Utrustning & överlevnad',
    description:
      'Tar med tre av allt och lånar ändå din kniv.',
    initials: 'MA',
  },
]

export const tripYears = [
  { year: '2026', note: 'Nästa kapitel börjar 30 juli', status: 'Snart' },
  { year: '2025', note: 'Bilder kommer när arkivet öppnas', status: 'Arkiv' },
  { year: '2024', note: 'Bilder kommer när arkivet öppnas', status: 'Arkiv' },
]
