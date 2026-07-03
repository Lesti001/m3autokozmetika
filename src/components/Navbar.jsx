import { useEffect, useState } from 'react'
import { navItems } from '../navItems'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  const solid = scrolled || isOpen

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        solid
          ? 'border-b border-white/10 bg-slate-950/90 shadow-lg backdrop-blur-lg backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#" aria-label="Kezdőlap" className="shrink-0">
          <img src="/icon.png" alt="M3 Autókozmetika" className="h-11 w-auto" />
        </a>

        <ul className="hidden md:flex md:items-center md:gap-9">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="relative text-sm font-medium text-white/85 transition after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:bg-sky-500 after:transition-all after:duration-300 hover:text-white hover:after:w-full"
              >
                {item.label}
              </a>
            </li>
          ))}
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
              <a
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-white/90 transition hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
