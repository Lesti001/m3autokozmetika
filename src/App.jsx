import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToHash from './components/ScrollToHash'
import Home from './pages/Home'
import Arlista from './pages/Arlista'
import Munkaink from './pages/Munkaink'

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arlista" element={<Arlista />} />
        <Route path="/munkaink" element={<Munkaink />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
