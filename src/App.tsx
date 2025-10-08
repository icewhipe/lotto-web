import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import Hero from './components/Hero'
import History from './components/History'
import About from './components/About'
import Advantages from './components/Advantages'
import Programs from './components/Programs'
import Gallery from './components/Gallery'
import Achievements from './components/Achievements'
import Staff from './components/Staff'
import Reviews from './components/Reviews'
import News from './components/News'
import Events from './components/Events'
import VirtualTour from './components/VirtualTour'
import Partners from './components/Partners'
import FAQ from './components/FAQ'
import Admissions from './components/Admissions'
import Documents from './components/Documents'
import FeedbackForm from './components/FeedbackForm'
import Contacts from './components/Contacts'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import ThemeToggle from './components/ThemeToggle'
import ChatBot from './components/ChatBot'

function App() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <SearchBar />
      <Navbar />
      <Hero />
      <History />
      <About />
      <Advantages />
      <Programs />
      <Gallery />
      <VirtualTour />
      <Achievements />
      <Staff />
      <Reviews />
      <News />
      <Events />
      <Partners />
      <FAQ />
      <Admissions />
      <Documents />
      <FeedbackForm />
      <Contacts />
      <Footer />
      <BackToTop />
      <ChatBot />
    </div>
  )
}

export default App
