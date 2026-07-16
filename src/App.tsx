import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  ArrowRight,
  Beer,
  Fish,
  Flame,
  MapPin,
  Menu as MenuIcon,
  Mountain,
  Trees,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { activities, attendees, menu, tripYears } from './data'

const tripDate = new Date('2026-07-30T12:00:00+02:00')
const backgroundTrack = `${import.meta.env.BASE_URL}audio/malung-2024.mp3`
const audioMutedStorageKey = 'malung-audio-muted'
const audioVolumeStorageKey = 'malung-audio-volume'
const audioTimeStorageKey = 'malung-audio-time'
const smoothEase = [0.22, 1, 0.36, 1] as const
const revealViewport = { once: true, amount: 0.15 } as const

type Countdown = {
  days: number
  hours: number
  minutes: number
  seconds: number
  hasStarted: boolean
}

function navigateWithinSite(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (
    event.button !== 0
    || event.metaKey
    || event.ctrlKey
    || event.shiftKey
    || event.altKey
  ) {
    return
  }

  const destination = new URL(href, window.location.href)
  const isCurrentDocument = (
    destination.pathname === window.location.pathname
    && destination.search === window.location.search
  )

  if (destination.origin !== window.location.origin) {
    return
  }

  if (isCurrentDocument && destination.hash !== window.location.hash) {
    return
  }

  event.preventDefault()

  if (isCurrentDocument) {
    return
  }

  window.history.pushState(
    null,
    '',
    `${destination.pathname}${destination.search}${destination.hash}`,
  )
  window.dispatchEvent(new PopStateEvent('popstate'))
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
    <a
      className="brand"
      href="./"
      aria-label="Malung startsida"
      onClick={(event) => navigateWithinSite(event, './')}
    >
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
    <motion.header
      className="site-header"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: smoothEase }}
    >
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
              <a
                href="./"
                onClick={(event) => {
                  closeMenu()
                  navigateWithinSite(event, './')
                }}
              >
                Start
              </a>
              <a
                href="./#aktiviteter"
                onClick={(event) => {
                  closeMenu()
                  navigateWithinSite(event, './#aktiviteter')
                }}
              >
                Årets plan
              </a>
              <a
                href="./#meny"
                onClick={(event) => {
                  closeMenu()
                  navigateWithinSite(event, './#meny')
                }}
              >
                Meny
              </a>
              <a
                className="nav-cta is-current"
                href="./attendees.html"
                onClick={(event) => {
                  closeMenu()
                  navigateWithinSite(event, './attendees.html')
                }}
              >
                Gänget
              </a>
            </>
          ) : (
            <>
              <a href="#aktiviteter" onClick={closeMenu}>Årets plan</a>
              <a href="#meny" onClick={closeMenu}>Meny</a>
              <a href="#arkiv" onClick={closeMenu}>Researkiv</a>
              <a
                className="nav-cta"
                href="./attendees.html"
                onClick={(event) => {
                  closeMenu()
                  navigateWithinSite(event, './attendees.html')
                }}
              >
                Gänget
              </a>
            </>
          )}
        </nav>
      </div>
    </motion.header>
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
    <motion.div
      className="countdown"
      aria-label="Nedräkning till Malung"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
      }}
    >
      {units.map(([label, value]) => (
        <motion.div
          className="countdown-unit"
          key={label}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <strong>{String(value).padStart(2, '0')}</strong>
          <span>{label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="topographic-lines" aria-hidden="true" />
          <motion.div
            className="hero-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, ease: smoothEase }}
            >
              <MapPin size={16} /> Malung, Dalarna
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.14, duration: 0.7, ease: smoothEase }}
            >
              UT I SKOGEN.
              <span>IN I DIMMAN.</span>
            </motion.h1>
            <motion.div
              className="hero-countdown"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.65, ease: smoothEase }}
            >
              <div className="hero-countdown-meta">
                <span>Nästa resa</span>
                <strong>Torsdag 30 juli 2026 · 12:00</strong>
              </div>
              <CountdownBlock />
            </motion.div>
            <motion.p
              className="hero-copy"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.34, ease: smoothEase }}
            >
              En årlig tradition med fiske, eld, kalla drycker och historier
              som blir bättre för varje gång de berättas.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, ease: smoothEase }}
            >
              <motion.a
                className="button button-primary"
                href="#aktiviteter"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Årets expedition <ArrowRight size={18} />
              </motion.a>
              <a className="text-link" href="#arkiv">Bläddra i arkivet</a>
            </motion.div>
          </motion.div>
          <motion.div
            className="trip-stamp"
            aria-label="30 juli 2026"
            initial={{ opacity: 0, scale: 0.82, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 7 }}
            transition={{ delay: 0.35, duration: 0.7, ease: smoothEase }}
          >
            <span>NÄSTA RESA</span>
            <strong>30</strong>
            <span>JULI 2026</span>
          </motion.div>
          <div className="landscape" aria-hidden="true">
            <Mountain className="mountain mountain-one" />
            <Mountain className="mountain mountain-two" />
            <Trees className="tree tree-one" />
            <Trees className="tree tree-two" />
          </div>
        </section>

        <motion.section
          className="schedule-section"
          id="aktiviteter"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, ease: smoothEase }}
        >
          <div className="section-intro">
            <div className="section-label light">
              <span>01</span>
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
              <motion.article
                className="schedule-row"
                key={activity.time}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  delay: index * 0.06,
                  duration: 0.55,
                  ease: smoothEase,
                }}
                whileHover={{ x: 6 }}
              >
                <span className="schedule-number">0{index + 1}</span>
                <p className="schedule-day">{activity.time}</p>
                <div>
                  <h3>{activity.title}</h3>
                  <p>{activity.text}</p>
                  {'items' in activity && activity.items && (
                    <ul className="activity-items">
                      {activity.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <ArrowRight aria-hidden="true" />
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="menu-section"
          id="meny"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, ease: smoothEase }}
        >
          <div className="menu-heading">
            <div>
              <div className="section-label">
                <span>02</span>
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
            {menu.map((item, index) => (
              <motion.div
                className="menu-row"
                key={item.day}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ delay: index * 0.06, ease: smoothEase }}
              >
                <p className="menu-day">{item.day}</p>
                <p className="menu-meal">{item.meal}</p>
                {item.food && <p>{item.food}</p>}
              </motion.div>
            ))}
          </div>
          <p className="menu-note">
            Menyn är preliminär. Väder, fångst och kockens dagsform har vetorätt.
          </p>
        </motion.section>

        <motion.section
          className="archive-section"
          id="arkiv"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, ease: smoothEase }}
        >
          <div className="archive-heading">
            <div className="section-label light">
              <span>03</span>
              <p>Researkiv</p>
            </div>
            <div>
              <p className="overline">Bevismaterial, sorterat efter år</p>
              <h2>ÅREN VI MINNS.<br />OCH NÅGRA VI INTE GÖR.</h2>
            </div>
          </div>
          <div className="year-list">
            {tripYears.map((trip, index) => (
              <motion.button
                className="year-row"
                type="button"
                key={trip.year}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ delay: index * 0.07, ease: smoothEase }}
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.995 }}
              >
                <span className="year-status">{trip.status}</span>
                <strong>{trip.year}</strong>
                <span>{trip.note}</span>
                <ArrowRight />
              </motion.button>
            ))}
          </div>
          <p className="archive-note">
            Fotoarkivet fylls på när bilderna är redo.
          </p>
        </motion.section>

        <motion.section
          className="crew-teaser"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.7, ease: smoothEase }}
        >
          <div className="crew-symbols" aria-hidden="true">
            <span><Fish /></span>
            <span><Beer /></span>
            <span><Flame /></span>
          </div>
          <div>
            <p className="overline">Samma gäng. Nya dåliga idéer.</p>
            <h2>MÄNNISKORNA BAKOM MYTEN</h2>
            <motion.a
              className="button button-primary"
              href="./attendees.html"
              onClick={(event) => navigateWithinSite(event, './attendees.html')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Möt deltagarna <ArrowRight size={18} />
            </motion.a>
          </div>
        </motion.section>
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
        <motion.div
          className="attendees-topbar"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <a
            className="back-link"
            href="./"
            onClick={(event) => navigateWithinSite(event, './')}
          >
            <ArrowLeft size={17} /> Tillbaka till lägret
          </a>
        </motion.div>
        <section className="attendee-list">
          {attendees.map((person, index) => (
            <motion.article
              className="attendee-row"
              key={`${person.nickname}-${index}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.05, ease: smoothEase }}
            >
              <div
                className="attendee-portrait"
                data-person={person.name.toLowerCase()}
              >
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
            </motion.article>
          ))}
        </section>
      </main>
      <Footer />
    </>
  )
}

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
    >
      <Brand />
      <p>Byggd för gänget. Inte för allmänheten.</p>
      <p>Malung · Dalarna · Sverige</p>
    </motion.footer>
  )
}

function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(
    () => window.localStorage.getItem(audioMutedStorageKey) === 'true',
  )
  const [volume, setVolume] = useState(() => {
    const savedVolume = Number(
      window.localStorage.getItem(audioVolumeStorageKey),
    )

    return Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 1
      ? savedVolume
      : 0.28
  })
  const initialVolumeRef = useRef(volume)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    audio.volume = initialVolumeRef.current

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const restorePlaybackTime = () => {
      const savedTime = Number(window.sessionStorage.getItem(audioTimeStorageKey))

      if (Number.isFinite(savedTime) && savedTime > 0 && savedTime < audio.duration) {
        audio.currentTime = savedTime
      }
    }
    const savePlaybackTime = () => {
      if (Number.isFinite(audio.currentTime) && audio.currentTime > 0) {
        window.sessionStorage.setItem(audioTimeStorageKey, String(audio.currentTime))
      }
    }
    const startAudio = () => {
      void audio.play().catch(() => {
        // Browsers may require a user interaction before starting audio.
      })
    }

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('loadedmetadata', restorePlaybackTime)
    window.addEventListener('pagehide', savePlaybackTime)

    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
      restorePlaybackTime()
    }

    startAudio()

    const startAfterInteraction = (event: Event) => {
      if (
        event.target instanceof Element
        && event.target.closest('.audio-controls')
      ) {
        return
      }

      startAudio()
      window.removeEventListener('pointerdown', startAfterInteraction)
      window.removeEventListener('keydown', startAfterInteraction)
    }

    window.addEventListener('pointerdown', startAfterInteraction)
    window.addEventListener('keydown', startAfterInteraction)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('loadedmetadata', restorePlaybackTime)
      window.removeEventListener('pagehide', savePlaybackTime)
      window.removeEventListener('pointerdown', startAfterInteraction)
      window.removeEventListener('keydown', startAfterInteraction)
      savePlaybackTime()
    }
  }, [])

  const toggleAudio = () => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (audio.paused) {
      setIsMuted(false)
      window.localStorage.setItem(audioMutedStorageKey, 'false')
      audio.muted = false
      void audio.play()
      return
    }

    setIsMuted((muted) => {
      const nextMuted = !muted
      window.localStorage.setItem(audioMutedStorageKey, String(nextMuted))
      return nextMuted
    })
  }

  const changeVolume = (nextVolume: number) => {
    const audio = audioRef.current

    if (!audio) {
      return
    }

    setVolume(nextVolume)
    audio.volume = nextVolume
    window.localStorage.setItem(audioVolumeStorageKey, String(nextVolume))

    if (isMuted && nextVolume > 0) {
      setIsMuted(false)
      audio.muted = false
      window.localStorage.setItem(audioMutedStorageKey, 'false')
    }

    if (audio.paused) {
      void audio.play()
    }
  }

  const label = !isPlaying
    ? 'Starta musik'
    : isMuted
      ? 'Slå på ljud'
      : 'Stäng av ljud'

  return (
    <>
      <audio
        ref={audioRef}
        src={backgroundTrack}
        autoPlay
        loop
        muted={isMuted}
        preload="auto"
      />
      <motion.div
        className="audio-controls"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.45, ease: smoothEase }}
      >
        <motion.button
          className="audio-control"
          type="button"
          aria-label={label}
          title={label}
          onClick={toggleAudio}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
        >
          {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          <span>
            {isPlaying ? (isMuted ? 'Ljud av' : 'Ljud på') : 'Spela musik'}
          </span>
        </motion.button>
        <label className="volume-control">
          <span className="visually-hidden">Volym</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            aria-label="Volym"
            onChange={(event) => changeVolume(Number(event.target.value))}
          />
          <output aria-hidden="true">{Math.round(volume * 100)}%</output>
        </label>
      </motion.div>
    </>
  )
}

export function App() {
  const [route, setRoute] = useState(
    () => `${window.location.pathname}${window.location.search}${window.location.hash}`,
  )
  const isAttendeesPage = window.location.pathname.endsWith('attendees.html')

  useEffect(() => {
    const updateRoute = () => {
      setRoute(
        `${window.location.pathname}${window.location.search}${window.location.hash}`,
      )
    }

    window.addEventListener('popstate', updateRoute)
    return () => window.removeEventListener('popstate', updateRoute)
  }, [])

  useEffect(() => {
    document.title = isAttendeesPage
      ? 'Gänget — Malung'
      : 'Malung — sedan någon gång'

    window.requestAnimationFrame(() => {
      if (window.location.hash) {
        document
          .getElementById(decodeURIComponent(window.location.hash.slice(1)))
          ?.scrollIntoView()
        return
      }

      window.scrollTo({ top: 0 })
    })
  }, [route, isAttendeesPage])

  return (
    <>
      {isAttendeesPage ? <AttendeesPage /> : <HomePage />}
      <BackgroundAudio />
    </>
  )
}
