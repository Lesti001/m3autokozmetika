import { useCallback, useEffect } from 'react'

/**
 * Full-screen image viewer with keyboard + swipe-free arrow navigation.
 * Controlled: parent owns `index` (null = closed) and the `images` list.
 */
function Lightbox({ images, index, onClose, onIndexChange }) {
  const open = index !== null && index >= 0

  const go = useCallback(
    (dir) => {
      if (!open) return
      const next = (index + dir + images.length) % images.length
      onIndexChange(next)
    },
    [open, index, images.length, onIndexChange],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    // Lock body scroll while the overlay is open
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, go, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Képnézegető"
    >
      {/* Counter */}
      <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur">
        {index + 1} / {images.length}
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Bezárás"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:rotate-90 sm:right-6 sm:top-6"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          go(-1)
        }}
        aria-label="Előző kép"
        className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:-translate-x-0.5 sm:left-6"
      >
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Image */}
      <img
        key={images[index]}
        src={images[index]}
        alt=""
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-up max-h-full max-w-full rounded-xl object-contain shadow-2xl"
      />

      {/* Next */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          go(1)
        }}
        aria-label="Következő kép"
        className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:translate-x-0.5 sm:right-6"
      >
        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default Lightbox
