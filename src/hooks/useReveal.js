import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Returns [ref, visible] and flips `visible` true the first time the element
 * reaches the viewport. Pure geometry on scroll/resize (no IntersectionObserver)
 * so it can never leave content stranded if the observer doesn't fire.
 * Reduced-motion users get `visible` immediately.
 *
 * @param {object} [opts]
 * @param {number} [opts.ratio=0.92] fraction of the viewport height that acts as the trigger line
 * @returns {[React.RefObject, boolean]} [ref, isVisible]
 */
export function useReveal({ ratio = 0.92 } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      setVisible(true)
      return
    }

    const inView = () => el.getBoundingClientRect().top < window.innerHeight * ratio

    let timer = null
    const cleanup = () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // setTimeout throttle (trailing) — independent of the rendering pipeline,
    // so it fires even where requestAnimationFrame is stalled.
    const onScroll = () => {
      if (timer) return
      timer = setTimeout(() => {
        timer = null
        if (inView()) {
          setVisible(true)
          cleanup()
        }
      }, 80)
    }

    if (inView()) {
      setVisible(true)
      return
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return cleanup
  }, [ratio])

  return [ref, visible]
}

/**
 * Reveals every `[data-reveal]` child as it enters the viewport by adding
 * `is-visible` directly on the DOM node (no re-render). Pure scroll/resize
 * geometry throttled with setTimeout — deliberately NOT IntersectionObserver,
 * which proved unreliable here (zero-height targets / observer never firing left
 * images stranded at opacity:0). Newly mounted children — e.g. after "load
 * more" — are picked up when `dep` changes. Pair with `.reveal` / `.reveal-scale`.
 *
 * @param {*} [dep] value that changes when children are added (e.g. visible count)
 * @returns {React.RefObject} ref to spread onto the container
 */
export function useRevealChildren(dep) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const reduce = prefersReducedMotion()

    // Reveal every child currently within (or above) the viewport. Returns the
    // number of children still waiting below the fold. Pure geometry — no
    // IntersectionObserver, so it can never silently strand an image hidden.
    const revealInView = () => {
      const trigger = window.innerHeight * 0.92
      let remaining = 0
      container.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => {
        if (reduce || el.getBoundingClientRect().top < trigger) el.classList.add('is-visible')
        else remaining += 1
      })
      return remaining
    }

    if (revealInView() === 0 || reduce) return

    let timer = null
    const cleanup = () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // setTimeout throttle (trailing) — independent of the rendering pipeline.
    const onScroll = () => {
      if (timer) return
      timer = setTimeout(() => {
        timer = null
        if (revealInView() === 0) cleanup()
      }, 80)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return cleanup
  }, [dep])

  return containerRef
}
