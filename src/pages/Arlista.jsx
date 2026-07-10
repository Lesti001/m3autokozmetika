import Footer from '../components/Footer'

const CarWashIcon = () => (
  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
)

const SeatIcon = () => (
  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 4h9a2 2 0 0 1 2 2v7H7a2 2 0 0 1-2-2V4z" />
    <path d="M5 13a4 4 0 0 0 4 4h5" />
    <path d="M19 21v-3a3 3 0 0 0-3-3" />
    <path d="M5 21v-2" />
  </svg>
)

const featured = [
  {
    icon: CarWashIcon,
    title: 'Külső tisztítás',
    tiers: [
      { size: 'S', name: 'Kicsi autó', type: 'Hatchback', price: '6.990 Ft-tól' },
      { size: 'M', name: 'Közepes autó', type: 'Sedan', price: '8.990 Ft-tól' },
      { size: 'L', name: 'Nagy autó', type: 'Kombi', price: '11.990 Ft-tól' },
      { size: 'XL', name: 'SUV / Egyterű', type: '', price: '13.990 Ft-tól' },
    ],
  },
  {
    icon: SeatIcon,
    title: 'Belső tisztítás',
    tiers: [
      { size: 'S', name: 'Kicsi autó', type: 'Hatchback', price: '7.999 Ft-tól' },
      { size: 'M', name: 'Közepes autó', type: 'Sedan', price: '9.999 Ft-tól' },
      { size: 'L', name: 'Nagy autó', type: 'Kombi', price: '12.999 Ft-tól' },
      { size: 'XL', name: 'SUV / Egyterű', type: '', price: '14.999 Ft-tól' },
    ],
  },
]

const extras = [
  { service: 'Ózonos klíma és beltér fertőtlenítés', price: '9.999 Ft-tól' },
  { service: 'Bőr vegyszeres tisztítása', price: '5.999 Ft-tól / ülés' },
  { service: 'Bőr ápolás UV védelemmel', price: '1.999 Ft-tól / ülés' },
  { service: 'Külső műanyag elemek ápolása', price: '6.999 Ft-tól' },
  { service: 'Gumiabroncs ápolás', price: '2.999 Ft-tól' },
  { service: 'Motortér tisztítás', price: '4.999 Ft-tól' },
  { service: 'Motortér tisztítás műanyag ápolással', price: '7.999 Ft-tól' },
  {
    service: 'Teljeskörű vegyszeres tisztítás, borotválás, mosás, gumi ápolás, felni impregnálás',
    note: 'Leszerelt felni esetén.',
    price: '9.999 Ft-tól / 4 db',
  },
  {
    service: 'Első szélvédő + 2 visszapillantó tükör impregnálás',
    note: 'Vízlepergető hatást biztosít már 45–55 km/h sebességtől, tartóssága 3 hónap.',
    price: '8.999 Ft-tól',
  },
  {
    service: 'Az autó összes üvegfelülete + tetőablak impregnálás',
    note: 'Vízlepergető hatást biztosít már 45–55 km/h sebességtől, tartóssága 3 hónap.',
    price: '19.999 Ft-tól',
  },
  { service: 'Tartós Wax 12 hónap', price: '13.999 Ft-tól' },
  { service: 'Fényesítő polírozás', price: '39.999 Ft-tól' },
  { service: 'Két lépcsős polírozás', price: '59.999 Ft-tól' },
  { service: 'Korrekciós polírozás', price: '89.999 Ft-tól' },
  { service: 'Fényszóró polírozás', price: '6.999 Ft / db' },
]

const carpetElements = [
  { surface: 'Ülés', price: '3.999 Ft / db' },
  { surface: '5 db ülés', price: '7.999 Ft / db' },
  { surface: 'Padlókárpit', price: '39.999 Ft-tól' },
  { surface: 'Tetőkárpit', price: '14.999 Ft-tól' },
  { surface: 'Csomagtartó kárpit', price: '9.999 Ft-tól' },
]

// Keeps the amount on one line, but lets the "/ unit" suffix wrap below on narrow screens.
function Price({ value }) {
  const [amount, ...rest] = value.split(' / ')
  const unit = rest.join(' / ')
  return (
    <>
      <span className="whitespace-nowrap">{amount}</span>
      {unit && <span className="whitespace-nowrap"> / {unit}</span>}
    </>
  )
}

function Arlista() {
  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-36">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Árlista</h1>
        </div>

        {/* Kiemelt szolgáltatások */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {featured.map(({ icon: Icon, title, tiers }) => (
            <div key={title} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-700 text-white">
                  <Icon />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {tiers.map(({ size, name, type, price }) => (
                  <div
                    key={size}
                    className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-300 hover:border-sky-200 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-sky-100 px-2 text-sm font-bold text-sky-700">
                        {size}
                      </span>
                      <div className="leading-tight">
                        <p className="text-sm font-semibold text-slate-900">{name}</p>
                        {type && <p className="text-xs text-slate-500">{type}</p>}
                      </div>
                    </div>
                    <p className="mt-4 text-2xl font-bold tracking-tight text-sky-700">{price}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* További szolgáltatások – táblázat */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">További szolgáltatások</h2>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-4 py-4 text-base font-semibold sm:px-6">Szolgáltatás</th>
                  <th className="whitespace-nowrap px-4 py-4 text-right text-base font-semibold sm:px-6">Ár</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {extras.map(({ service, note, price }) => (
                  <tr key={service} className="align-top transition-colors hover:bg-slate-50">
                    <td className="px-4 py-4 sm:px-6">
                      <p className="text-base font-medium text-slate-800">{service}</p>
                      {note && <p className="mt-1 text-sm text-slate-500">{note}</p>}
                    </td>
                    <td className="px-4 py-4 text-right text-base font-semibold text-sky-700 sm:px-6">
                      <Price value={price} />
                    </td>
                  </tr>
                ))}

                {/* Kárpittisztítás csoport */}
                <tr className="bg-slate-100/70">
                  <td colSpan={2} className="px-4 py-3 text-sm font-bold uppercase tracking-wide text-slate-700 sm:px-6">
                    Kárpittisztítás
                  </td>
                </tr>
                <tr className="align-top transition-colors hover:bg-slate-50">
                  <td className="px-4 py-4 sm:px-6">
                    <p className="text-base font-medium text-slate-800">FULL kárpittisztítás</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4 text-right text-base font-semibold text-sky-700 sm:px-6">
                    59.999 Ft-tól
                  </td>
                </tr>
                <tr className="align-top">
                  <td colSpan={2} className="px-4 py-4 sm:px-6">
                    <p className="text-base font-medium text-slate-800">Elemenkénti kárpittisztítás</p>
                    <dl className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200">
                      {carpetElements.map(({ surface, price }) => (
                        <div key={surface} className="flex items-center justify-between gap-3 px-4 py-2.5">
                          <dt className="text-base text-slate-600">{surface}</dt>
                          <dd className="text-right text-base font-semibold text-sky-700">
                            <Price value={price} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

        {/* Figyelmeztetés */}
        <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm sm:p-8">
          <div className="flex gap-4">
            <svg
              className="mt-0.5 h-6 w-6 shrink-0 text-amber-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.008M10.29 3.86 1.82 18a1.5 1.5 0 0 0 1.29 2.25h17.78A1.5 1.5 0 0 0 22.18 18L13.71 3.86a1.5 1.5 0 0 0-2.42 0z" />
            </svg>
            <div className="space-y-3 text-sm leading-relaxed text-slate-700">
              <p className="font-semibold text-slate-900">Kedves Ügyfeleink!</p>
              <p>
                Felhívjuk szíves figyelmüket, hogy a feltüntetett árak kizárólag tájékoztató jellegűek, nagyban függnek
                az autó szennyezettségétől, méretétől. Állatszőr és extra szennyezettség esetén extra díjat számolhatunk
                fel!
              </p>
              <p>
                Jelenleg kizárólag készpénzes fizetést áll módunkban elfogadni! Szíves megértésüket kérjük!
              </p>
              <p>Az árváltoztatás jogát fenntartjuk!</p>
              <p className="font-semibold text-slate-900">
                Bejelentkezés – időpontfoglalás mindenképp szükséges telefonon, vagy személyesen!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Arlista
