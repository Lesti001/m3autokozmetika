import { useEffect, useRef, useState } from 'react'

const MapPinIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
  </svg>
)

const MAPS_QUERY = 'Mogyoród, Homoktövis utca 3'

const details = [
  {
    icon: MapPinIcon,
    title: 'Telephelyünk',
    content: <p className="mt-1 text-sm leading-relaxed text-slate-600">Mogyoród, Homoktövis Utca 3.</p>,
  },
  {
    icon: PhoneIcon,
    title: 'Kapcsolat',
    content: (
      <a
        href="tel:+36205231244"
        className="mt-1 inline-block text-sm font-medium text-sky-600 transition hover:text-sky-700"
      >
        +36 20 523 1244
      </a>
    ),
  },
  {
    icon: ClockIcon,
    title: 'Nyitvatartásunk',
    content: (
      <p className="mt-1 text-sm leading-relaxed text-slate-600">
        Hétfő – Péntek
        <br />
        8:00 – 17:00
      </p>
    ),
  },
]

function Contact() {
  const [visible, setVisible] = useState(() => new Set())
  const itemsRef = useRef([])

  useEffect(() => {
    // Respect reduced-motion: reveal everything immediately, no animation
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(new Set(itemsRef.current.map((_, i) => i)))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const index = Number(entry.target.dataset.index)
          setVisible((prev) => new Set(prev).add(index))
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.2 },
    )

    itemsRef.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const reveal = (index) =>
    `transition-all duration-500 ease-out ${
      visible.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`

  return (
    <section id="kapcsolat" className="bg-slate-50 pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Kapcsolat</h2>
          <p className="mt-4 text-base text-slate-500">
            Keressen minket bizalommal telephelyünkön vagy telefonon.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            {details.map(({ icon: Icon, title, content }, index) => (
              <div
                key={title}
                ref={(el) => (itemsRef.current[index] = el)}
                data-index={index}
                className={reveal(index)}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-md">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700 transition-colors duration-300 group-hover:bg-sky-700 group-hover:text-white">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                    {content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            ref={(el) => (itemsRef.current[details.length] = el)}
            data-index={details.length}
            className={reveal(details.length)}
            style={{ transitionDelay: `${details.length * 100}ms` }}
          >
            <div className="h-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <iframe
                title="M3 Autókozmetika térkép – Mogyoród, Homoktövis Utca 3."
                src={`https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=15&output=embed`}
                width="100%"
                height="100%"
                className="min-h-[320px] w-full lg:min-h-full"
                style={{ border: 0 }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
