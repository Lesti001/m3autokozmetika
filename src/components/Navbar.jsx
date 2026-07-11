import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navItems } from '../navItems'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  // Only the home page has a full-height hero behind the navbar; elsewhere keep it solid.
  const isHome = location.pathname === '/'

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      // rAF-throttled: solid background once the light content reaches the navbar
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > window.innerHeight - 120)
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = !isHome || scrolled || isOpen

  // For in-page hash links: scroll on every click, even when the hash is already active
  // (react-router won't emit a navigation for an unchanged URL, so ScrollToHash wouldn't fire).
  const handleHashNav = (event, href) => {
    if (!href.includes('#')) return
    const [rawPath, id] = href.split('#')
    const targetPath = rawPath || '/'
    if (location.pathname !== targetPath) return // different page: let the router handle it
    const el = document.getElementById(id)
    if (!el) return
    event.preventDefault()
    el.scrollIntoView({ behavior: 'smooth' })
    window.history.replaceState(null, '', href)
    setIsOpen(false)
  }

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        solid
          ? 'border-b border-white/10 bg-slate-950/90 shadow-lg backdrop-blur-lg backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Kezdőlap" className="flex shrink-0 items-center gap-2.5">
          <img src="/icon.png" alt="M3 Autókozmetika" className="h-11 w-auto" />
          <span className="hidden text-lg font-semibold tracking-tight text-white sm:inline">M3 Autókozmetika</span>
        </Link>

        <ul className="hidden md:flex md:items-center md:gap-9">
          {navItems.map((item) =>
            item.label === 'Kapcsolat' ? (
              <li key={item.label} className="group relative">
                <Link
                  to={item.href}
                  onClick={(e) => handleHashNav(e, item.href)}
                  className="relative text-sm font-medium text-white/85 transition after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:text-white hover:after:w-full"
                >
                  {item.label}
                </Link>

                <div className="invisible absolute left-1/2 top-full z-40 w-64 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-xl backdrop-blur-lg">
                    <a
                      href="tel:+36301234567"
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-white/85 transition hover:bg-white/5 hover:text-white"
                    >
                      <svg className="h-5 w-5 shrink-0 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm font-medium">+36 20 523 1244</span>
                    </a>
                  </div>
                </div>
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  to={item.href}
                  onClick={(e) => handleHashNav(e, item.href)}
                  className="relative text-sm font-medium text-white/85 transition after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:text-white hover:after:w-full"
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="text-white md:hidden"
          aria-label={isOpen ? 'Menü bezárása' : 'Menü megnyitása'}
          aria-expanded={isOpen}
        >
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <ul className="flex flex-col items-center gap-4 pb-6 md:hidden">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                onClick={(e) => {
                  handleHashNav(e, item.href)
                  setIsOpen(false)
                }}
                className="text-white/90 transition hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
