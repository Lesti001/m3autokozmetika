function Hero() {
  return (
    <section className="sticky top-0 z-0 h-dvh w-full overflow-hidden">
      <img
        src="/main_page.jpg"
        alt="M3 Autókozmetika műhely kívülről"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />

      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Prémium autóápolás
        </span>

        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
          Hozza el hozzánk autóját, és szeressen bele újra!
        </h1>

        <p className="mt-6 max-w-xl text-base text-white/80 sm:text-lg">
          Polírozás, belső tisztítás és fényezés-védelem – hogy autója újra olyan legyen, mint új korában.
        </p>

        <a
          href="#kapcsolat"
          className="mt-9 inline-flex items-center justify-center rounded-full bg-sky-700 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-700/25 transition hover:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
        >
          Kérjen ajánlatot
        </a>
      </div>
    </section>
  )
}

export default Hero
