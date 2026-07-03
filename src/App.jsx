import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen">
      <Navbar />

      <main>
        <Hero />

        <div className="relative z-10 overflow-hidden rounded-t-[2rem] bg-slate-50 shadow-[0_-24px_48px_rgba(0,0,0,0.18)] sm:rounded-t-[2.5rem]">
          <Services />
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default App
