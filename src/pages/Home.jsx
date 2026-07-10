import Hero from '../components/Hero'
import Services from '../components/Services'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className="relative min-h-screen">
      <main>
        <Hero />

        <div className="relative z-10 overflow-hidden rounded-t-[2rem] bg-slate-50 shadow-[0_-24px_48px_rgba(0,0,0,0.18)] sm:rounded-t-[2.5rem]">
          <Services />
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default Home
