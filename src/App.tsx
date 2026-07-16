import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Beer,
  CalendarDays,
  Fish,
  Flame,
  MapPin,
  Menu as MenuIcon,
  Mountain,
  Trees,
  X,
} from 'lucide-react'
import { activities, attendees, menu, tripYears } from './data'

const tripDate = new Date('2026-07-30T12:00:00+02:00')

type Countdown = {
  days: number
  hours: number
  minutes: number
  seconds: number
  hasStarted: boolean
}

function getCountdown(): Countdown {
  const distance = tripDate.getTime() - Date.now()

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, hasStarted: true }
  }

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
    hasStarted: false,
  }
}

function Brand() {
  return (
    <a className="brand" href="./" aria-label="Malung startsida">
      <span className="brand-mark">
        <Trees size={24} strokeWidth={1.8} />
      </span>
      <span>
        <strong>MALUNG</strong>
        <small>SEDAN NÅGON GÅNG</small>
      </span>
    </a>
  )
}

function Header({ attendeesPage = false }: { attendeesPage?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <button
          className="menu-button"
          type="button"
          aria-label={isOpen ? 'Stäng meny' : 'Öppna meny'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X /> : <MenuIcon />}
        </button>
        <nav className={isOpen ? 'main-nav is-open' : 'main-nav'}>
          {attendeesPage ? (
            <>
              <a href="./" onClick={closeMenu}>Start</a>
              <a href="./#aktiviteter" onClick={closeMenu}>Årets plan</a>
              <a href="./#meny" onClick={closeMenu}>Meny</a>
              <a className="nav-cta is-current" href="./attendees.html" onClick={closeMenu}>
                Gänget
              </a>
            </>
          ) : (
            <>
              <a href="#aktiviteter" onClick={closeMenu}>Årets plan</a>
              <a href="#meny" onClick={closeMenu}>Meny</a>
              <a href="#arkiv" onClick={closeMenu}>Researkiv</a>
              <a className="nav-cta" href="./attendees.html" onClick={closeMenu}>
                Gänget
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

function CountdownBlock() {
  const [countdown, setCountdown] = useState(getCountdown)

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  if (countdown.hasStarted) {
    return (
      <div className="countdown-started">
        <Flame size={28} />
        Malung är igång
      </div>
    )
  }

  const units = [
    ['Dagar', countdown.days],
    ['Timmar', countdown.hours],
    ['Minuter', countdown.minutes],
    ['Sekunder', countdown.seconds],
  ]

  return (
    <div className="countdown" aria-label="Nedräkning till Malung">
      {units.map(([label, value]) => (
        <div className="countdown-unit" key={label}>
          <strong>{String(value).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="topographic-lines" aria-hidden="true" />
          <div className="hero-inner">
            <p className="eyebrow"><MapPin size={16} /> Malung, Dalarna</p>
            <h1>
              UT I SKOGEN.
              <span>IN I DIMMAN.</span>
            </h1>
            <p className="hero-copy">
              En årlig tradition med fiske, eld, kalla drycker och historier
              som blir bättre för varje gång de berättas.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#aktiviteter">
                Årets expedition <ArrowRight size={18} />
              </a>
              <a className="text-link" href="#arkiv">Bläddra i arkivet</a>
            </div>
          </div>
          <div className="trip-stamp" aria-label="30 juli 2026">
            <span>NÄSTA RESA</span>
            <strong>30</strong>
            <span>JULI 2026</span>
          </div>
          <div className="landscape" aria-hidden="true">
            <Mountain className="mountain mountain-one" />
            <Mountain className="mountain mountain-two" />
            <Trees className="tree tree-one" />
            <Trees className="tree tree-two" />
          </div>
        </section>

        <section className="countdown-section" id="nedrakning">
          <div className="section-label">
            <span>01</span>
            <p>Nedräkning</p>
          </div>
          <div>
            <p className="overline">Torsdag 30 juli 2026 · 12:00</p>
            <h2>NÄR ASFALT BLIR GRUSVÄG</h2>
            <CountdownBlock />
          </div>
        </section>

        <section className="schedule-section" id="aktiviteter">
          <div className="section-intro">
            <div className="section-label light">
              <span>02</span>
              <p>Årets plan</p>
            </div>
            <div>
              <p className="overline">Expedition 2026</p>
              <h2>FYRA DAGAR.<br />INGEN BRÅDSKA.</h2>
            </div>
            <p className="intro-copy">
              Planen är tillräckligt tydlig för att packa efter och tillräckligt
              lös för att något oväntat ska kunna hända.
            </p>
          </div>
          <div className="schedule-list">
            {activities.map((activity, index) => (
              <article className="schedule-row" key={activity.time}>
                <span className="schedule-number">0{index + 1}</span>
                <p className="schedule-day">{activity.time}</p>
                <div>
                  <h3>{activity.title}</h3>
                  <p>{activity.text}</p>
                </div>
                <ArrowRight aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="menu-section" id="meny">
          <div className="menu-heading">
            <div>
              <div className="section-label">
                <span>03</span>
                <p>Årets meny</p>
              </div>
              <p className="overline">Öppen eld. Tung panna.</p>
              <h2>MAT SMAKAR BÄTTRE UTE</h2>
            </div>
            <div className="menu-icons" aria-hidden="true">
              <Fish />
              <Flame />
              <Beer />
            </div>
          </div>
          <div className="menu-list">
            {menu.map((item) => (
              <div className="menu-row" key={item.day}>
                <p className="menu-day">{item.day}</p>
                <p className="menu-meal">{item.meal}</p>
                <p>{item.food}</p>
              </div>
            ))}
          </div>
          <p className="menu-note">
            Menyn är preliminär. Väder, fångst och kockens dagsform har vetorätt.
          </p>
        </section>

        <section className="archive-section" id="arkiv">
          <div className="archive-heading">
            <div className="section-label light">
              <span>04</span>
              <p>Researkiv</p>
            </div>
            <div>
              <p className="overline">Bevismaterial, sorterat efter år</p>
              <h2>ÅREN VI MINNS.<br />OCH NÅGRA VI INTE GÖR.</h2>
            </div>
          </div>
          <div className="year-list">
            {tripYears.map((trip) => (
              <button className="year-row" type="button" key={trip.year}>
                <span className="year-status">{trip.status}</span>
                <strong>{trip.year}</strong>
                <span>{trip.note}</span>
                <ArrowRight />
              </button>
            ))}
          </div>
          <p className="archive-note">
            Fotoarkivet fylls på när bilderna är redo.
          </p>
        </section>

        <section className="crew-teaser">
          <div className="crew-symbols" aria-hidden="true">
            <span><Fish /></span>
            <span><Beer /></span>
            <span><Flame /></span>
          </div>
          <div>
            <p className="overline">Samma gäng. Nya dåliga idéer.</p>
            <h2>MÄNNISKORNA BAKOM MYTEN</h2>
            <a className="button button-primary" href="./attendees.html">
              Möt deltagarna <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function AttendeesPage() {
  return (
    <>
      <Header attendeesPage />
      <main className="attendees-page">
        <section className="attendees-hero">
          <div className="topographic-lines" aria-hidden="true" />
          <a className="back-link" href="./"><ArrowLeft size={17} /> Tillbaka till lägret</a>
          <p className="eyebrow">Deltagarregister · 2026</p>
          <h1>GÄNGET</h1>
          <p>
            Olika spetskompetenser. Samma omdöme. Fem män på väg mot skog,
            fiske och beslut som sällan behöver dokumenteras.
          </p>
        </section>
        <section className="attendee-list">
          {attendees.map((person, index) => (
            <article className="attendee-row" key={`${person.nickname}-${index}`}>
              <div className="attendee-portrait">
                <span aria-hidden="true">{person.initials}</span>
                <img src={person.image} alt={`Porträtt av ${person.name}`} />
              </div>
              <span className="attendee-number">0{index + 1}</span>
              <div className="attendee-name">
                <p>{person.nickname}</p>
                <h2>{person.name}</h2>
              </div>
              <div className="attendee-role">
                <p>Ansvarsområde</p>
                <strong>{person.role}</strong>
              </div>
              <p className="attendee-description">{person.description}</p>
            </article>
          ))}
        </section>
        <section className="attendee-callout">
          <CalendarDays />
          <div>
            <p className="overline">Laguppställning 2026</p>
            <h2>FEM MAN STARKA</h2>
          </div>
          <p>Roller, presentationer och övriga komprometterande detaljer fylls på senare.</p>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Footer() {
  return (
    <footer>
      <Brand />
      <p>Byggd för gänget. Inte för allmänheten.</p>
      <p>Malung · Dalarna · Sverige</p>
    </footer>
  )
}

export function App() {
  const isAttendeesPage = window.location.pathname.endsWith('attendees.html')
  return isAttendeesPage ? <AttendeesPage /> : <HomePage />
}
