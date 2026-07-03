const iconProps = {
  className: 'h-7 w-7',
  fill: 'none',
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

// Lucide-style line icons (consistent stroke family, no emoji)
const CarIcon = () => (
  <svg {...iconProps}>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
)
const GaugeIcon = () => (
  <svg {...iconProps}>
    <path d="m12 14 4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </svg>
)
const SofaIcon = () => (
  <svg {...iconProps}>
    <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
    <path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0Z" />
    <path d="M4 18v2" />
    <path d="M20 18v2" />
  </svg>
)
const GemIcon = () => (
  <svg {...iconProps}>
    <path d="M6 3h12l4 6-10 13L2 9Z" />
    <path d="M11 3 8 9l4 13 4-13-3-6" />
    <path d="M2 9h20" />
  </svg>
)
const WindIcon = () => (
  <svg {...iconProps}>
    <path d="M12.8 19.6A2 2 0 1 0 14 16H2" />
    <path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" />
    <path d="M9.8 4.4A2 2 0 1 1 11 8H2" />
  </svg>
)
const SparklesIcon = () => (
  <svg {...iconProps}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
  </svg>
)
const LightbulbIcon = () => (
  <svg {...iconProps}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
)
const DropletsIcon = () => (
  <svg {...iconProps}>
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 4.8 7 3.5c-.29 1.3-1.15 2.63-2.29 3.56S3 11.09 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
  </svg>
)
const ShieldIcon = () => (
  <svg {...iconProps}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const services = [
  {
    icon: CarIcon,
    title: 'Külső karosszéria tisztítás',
    description:
      'Az autó teljes külső felületét kézi mosással tisztítjuk meg, eltávolítva a port, szennyeződéseket és rovarmaradványokat. Külön figyelmet fordítunk a nehezen elérhető helyekre is.',
  },
  {
    icon: GaugeIcon,
    title: 'Belsőtér tisztítás',
    description:
      'A műszerfal, ajtókárpitok és egyéb belső felületek tisztítása és ápolása, amely magában foglalja a por eltávolítását és igény szerint a műanyag felületek ápolását is.',
  },
  {
    icon: SofaIcon,
    title: 'Kárpit tisztítás',
    description:
      'Az ülések, kárpitok és padlószőnyegek mélytisztítást kapnak, amely eltávolítja a makacs szennyeződéseket, foltokat és szagokat.',
  },
  {
    icon: GemIcon,
    title: 'Bőr tisztítás és ápolás',
    description:
      'A bőrfelületek tisztítása és ápolása prémium minőségű bőrtisztító és ápoló szerekkel, amelyek táplálják a bőrt, és védik a káros UV-sugaraktól a bőr felületét.',
  },
  {
    icon: WindIcon,
    title: 'Ózonos fertőtlenítés',
    description:
      'A légkondicionáló és szellőzőrendszer tisztítása, hogy a levegő friss és tiszta legyen, illetve átjárja a teljes belső teret, megszüntetve a kellemetlen szagokat.',
  },
  {
    icon: SparklesIcon,
    title: 'Polírozás',
    description:
      'A polírozás nem csupán esztétikai előnyöket kínál; ez egy olyan folyamat, amely során eltávolítjuk a fényezés felületén lévő apró karcolásokat, oxidációt és egyéb hibákat, ezáltal visszaállítva az autó eredeti fényét és mélységét.',
  },
  {
    icon: LightbulbIcon,
    title: 'Fényszóró polírozás',
    description:
      'A fényszórók idővel sárgulhatnak és mattulhatnak, ami rontja a látási viszonyokat. A felújítás során eltávolítjuk a szennyeződéseket, megszüntetjük a sárgult és matt felületeket, UV-védő bevonatot alkalmazunk a tartós védelem érdekében.',
  },
  {
    icon: DropletsIcon,
    title: 'Szélvédő bevonatozás',
    description:
      'Egy mélytisztítást követően speciális bevonatot viszünk fel a szélvédőre, amely taszítja a vizet és a szennyeződéseket, így esős időben is tisztább látást biztosít.',
  },
  {
    icon: ShieldIcon,
    title: 'Karosszéria bevonatozás',
    description:
      'A karosszéria bevonatolás és waxolás szolgáltatásunk célja, hogy autója fényezését megvédje a környezeti hatásoktól, miközben fokozza annak fényességét és megjelenését. A wax és a bevonat egyaránt védőréteget képez a fényezés felett, és vízlepergető hatást biztosít, így a felület könnyebben tisztítható.',
  },
]

function Services() {
  return (
    <section id="szolgaltatasok" className="bg-slate-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Szolgáltatásaink
          </h2>
          <p className="mt-4 text-base text-slate-500">
            Az árakról tájékozódjon a kapcsolati fülön található elérhetőségek egyikén.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-md"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-50 text-sky-700 transition-colors duration-300 group-hover:bg-sky-700 group-hover:text-white">
                <Icon />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
