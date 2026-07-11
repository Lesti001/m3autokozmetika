import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { beforeAfter, gallery, toThumb } from '../data/works'
import { useReveal, useRevealChildren } from '../hooks/useReveal'
import Lightbox from '../components/Lightbox'
import Footer from '../components/Footer'

// Full-resolution src lists for the lightboxes / marquee (grids use thumbnails).
const galleryImages = gallery.map((g) => g.src)
const beforeAfterImages = beforeAfter.map((b) => b.src)

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */
function WorksHero() {
  const imgRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const img = imgRef.current
    if (!img) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Direct style write in a passive scroll handler (no requestAnimationFrame,
    // which can stall) — cheap enough for a couple of transforms per event.
    const onScroll = () => {
      // 0 at top → 1 after scrolling one viewport.
      const progress = Math.min(window.scrollY / window.innerHeight, 1)
      // Photo zooms in as we leave it.
      img.style.transform = `scale(${1 + progress * 0.18})`
      // Text drifts up, shrinks and fades as we scroll past it.
      const content = contentRef.current
      if (content) {
        content.style.transform = `translateY(${progress * -40}px) scale(${1 - progress * 0.3})`
        content.style.opacity = String(1 - progress * 0.85)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-0 h-dvh w-full overflow-hidden bg-slate-950 pt-20">
      {/* Work photo (#14) fills the full sticky hero (below the navbar).
          object-top keeps the top of the frame; it zooms in on scroll. */}
      <div className="relative h-full w-full">
        <img
          ref={imgRef}
          src="/images/tomoritett/14.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full origin-center object-cover object-top will-change-transform"
        />
        {/* Legibility overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/25 to-slate-950/80" />

        {/* Centered content over the photo — drifts/shrinks/fades on scroll */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center will-change-transform"
        >
          <span className="animate-fade-up mb-6 inline-block rounded-full border border-sky-500/40 bg-sky-500/15 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-sky-200 backdrop-blur-sm sm:text-base">
            Referenciák
          </span>
          <h1
            className="animate-fade-up text-balance text-6xl font-bold tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.7)] sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ animationDelay: '0.1s' }}
          >
            Munkáink
          </h1>
        </div>

        {/* Scroll cue */}
        <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center sm:bottom-8">
          <svg
            className="animate-bounce-down h-6 w-6 text-white/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Marquee strip of before/after thumbnails                           */
/* ------------------------------------------------------------------ */
function MarqueeStrip({ images, onOpen }) {
  // Duplicate the list so the -50% translate loops seamlessly
  const row = [...images, ...images]
  return (
    <div className="pause-on-hover relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="animate-marquee flex w-max gap-5 sm:gap-6">
        {row.map((src, i) => (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => onOpen(images.indexOf(src))}
            className="group relative h-56 w-56 shrink-0 overflow-hidden rounded-2xl sm:h-72 sm:w-72 lg:h-80 lg:w-80"
            aria-label="Kép megnyitása"
          >
            <img
              src={toThumb(src)}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-slate-900/0 transition-colors duration-300 group-hover:bg-slate-900/20" />
          </button>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Before / After section — the dedicated element                     */
/* ------------------------------------------------------------------ */
const BA_STEP = 20

function BeforeAfterSection({ onOpen }) {
  const [shown, setShown] = useState(BA_STEP)
  const gridRef = useRevealChildren(shown)
  const [headRef, headVisible] = useReveal()
  const visibleImages = beforeAfter.slice(0, shown)

  return (
    <section id="elotte-utana" className="relative z-10 bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div
          ref={headRef}
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            headVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <span className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
            Előtte / Utána
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            A különbség, ami magáért beszél
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Minden kép egyetlen munkát mutat – bal/fent az érkezéskori állapot, jobb/lent az
            eredmény. Kattintson a nagyításhoz.
          </p>
        </div>
      </div>

      {/* Eye-candy marquee */}
      <div className="mt-12 mb-6 sm:mb-8">
        <MarqueeStrip images={beforeAfterImages.slice(0, 16)} onOpen={onOpen} />
      </div>

      <div className="mx-auto mt-20 max-w-7xl px-6 sm:mt-24 sm:px-8">
        <div
          ref={gridRef}
          className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5"
        >
          {visibleImages.map((item, i) => (
            <button
              key={item.src}
              type="button"
              data-reveal
              onClick={() => onOpen(i)}
              style={{ '--reveal-delay': `${(i % 3) * 90}ms`, aspectRatio: `${item.w} / ${item.h}` }}
              className="reveal group relative block w-full overflow-hidden rounded-2xl bg-slate-200 shadow-sm ring-1 ring-slate-900/5 transition-shadow duration-300 hover:shadow-xl"
            >
              <img
                src={toThumb(item.src)}
                alt={`Előtte / utána munka ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
              />
              {/* Gradient + badge overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute left-3 top-3 flex translate-y-[-8px] items-center gap-1.5 rounded-full bg-sky-600/90 px-3 py-1 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Előtte / Utána
              </div>
              <div className="absolute bottom-3 right-3 flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-white/90 text-slate-900 opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14zM11 8v6M8 11h6" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {shown < beforeAfter.length && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShown((n) => Math.min(n + BA_STEP, beforeAfter.length))}
              className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
            >
              Több munka betöltése
              <span className="text-slate-400 group-hover:text-sky-600">
                ({beforeAfter.length - shown})
              </span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* General gallery — masonry columns                                  */
/* ------------------------------------------------------------------ */
const G_STEP = 30

function GallerySection({ onOpen }) {
  const [shown, setShown] = useState(G_STEP)
  const gridRef = useRevealChildren(shown)
  const [headRef, headVisible] = useReveal()
  const visibleImages = gallery.slice(0, shown)

  return (
    <section id="galeria" className="relative z-10 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div
          ref={headRef}
          className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
            headVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <span className="inline-block rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
            Galéria
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Pillanatképek a műhelyből
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Részletek, folyamatok és a friss eredmények – kattintson bármelyikre a nagyításhoz.
          </p>
        </div>

        <div ref={gridRef} className="mt-14 columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
          {visibleImages.map((item, i) => (
            <button
              key={item.src}
              type="button"
              data-reveal
              onClick={() => onOpen(i)}
              style={{ '--reveal-delay': `${(i % 4) * 70}ms`, aspectRatio: `${item.w} / ${item.h}` }}
              className="reveal group relative block w-full overflow-hidden rounded-xl bg-slate-100 shadow-sm ring-1 ring-slate-900/5 transition-shadow duration-300 hover:shadow-lg"
            >
              <img
                src={toThumb(item.src)}
                alt={`Munka ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900 opacity-0 shadow transition-all duration-300 group-hover:opacity-100">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {shown < gallery.length && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShown((n) => Math.min(n + G_STEP, gallery.length))}
              className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
            >
              Több kép betöltése
              <span className="text-slate-400 group-hover:text-sky-600">({gallery.length - shown})</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* CTA                                                                */
/* ------------------------------------------------------------------ */
function WorksCTA() {
  const [ref, visible] = useReveal()
  return (
    <section className="relative z-10 bg-slate-50 px-6 pb-24 pt-4">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 animate-gradient px-8 py-14 text-center shadow-xl transition-all duration-700 sm:px-16 sm:py-16 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Legyen a következő az Ön autója
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Vegye fel velünk a kapcsolatot.
        </p>
        <Link
          to="/#kapcsolat"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-sky-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/30 transition hover:-translate-y-0.5 hover:bg-sky-500"
        >
          Kérjen ajánlatot
        </Link>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */
function Munkaink() {
  // Single lightbox shared by both galleries: { list, index }
  const [box, setBox] = useState({ list: null, index: null })
  const openBefore = (i) => setBox({ list: beforeAfterImages, index: i })
  const openGallery = (i) => setBox({ list: galleryImages, index: i })
  const close = () => setBox({ list: null, index: null })

  return (
    <main className="min-h-screen bg-white">
      <WorksHero />

      <div className="relative z-10 overflow-hidden rounded-t-[2rem] bg-slate-50 shadow-[0_-24px_48px_rgba(0,0,0,0.18)] sm:rounded-t-[2.5rem]">
        <BeforeAfterSection onOpen={openBefore} />
        <GallerySection onOpen={openGallery} />
        <WorksCTA />
        <Footer />
      </div>

      <Lightbox
        images={box.list || []}
        index={box.list ? box.index : null}
        onClose={close}
        onIndexChange={(i) => setBox((b) => ({ ...b, index: i }))}
      />
    </main>
  )
}

export default Munkaink
