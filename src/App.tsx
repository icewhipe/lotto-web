import { useState, useEffect, lazy, Suspense } from 'react'
import { useAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LoadingSpinner from './components/LoadingSpinner'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Dashboard from './components/Dashboard'
import PageLoader from './components/PageLoader'

// Background effects
const FloatingOrbs = lazy(() => import('./components/FloatingOrbs'))
const ParticlesBackground = lazy(() => import('./components/ParticlesBackground'))

// Lazy load non-critical components
const History = lazy(() => import('./components/History'))
const About = lazy(() => import('./components/About'))
const Advantages = lazy(() => import('./components/Advantages'))
const Programs = lazy(() => import('./components/Programs'))
const Gallery = lazy(() => import('./components/Gallery'))
const Achievements = lazy(() => import('./components/Achievements'))
const Staff = lazy(() => import('./components/Staff'))
const Reviews = lazy(() => import('./components/Reviews'))
const News = lazy(() => import('./components/News'))
const Events = lazy(() => import('./components/Events'))
const VirtualTour = lazy(() => import('./components/VirtualTour'))
const Partners = lazy(() => import('./components/Partners'))
const FAQ = lazy(() => import('./components/FAQ'))
const Admissions = lazy(() => import('./components/Admissions'))
const Documents = lazy(() => import('./components/Documents'))
const FeedbackForm = lazy(() => import('./components/FeedbackForm'))
const Contacts = lazy(() => import('./components/Contacts'))
const Footer = lazy(() => import('./components/Footer'))
const BackToTop = lazy(() => import('./components/BackToTop'))
const ChatBot = lazy(() => import('./components/ChatBot'))

function App() {
  const [isDark, setIsDark] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const { isAuthenticated } = useAuth()

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
    // SUPER OPTIMIZED - instant switch, no lag
    const html = document.documentElement
    
    setIsDark(!isDark)
    if (!isDark) {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Show Dashboard if authenticated
  if (isAuthenticated) {
    return <Dashboard />
  }

  // Show Register Page if register button clicked
  if (showRegister) {
    return <RegisterPage onBack={() => {
      setShowRegister(false)
      setShowLogin(true)
    }} />
  }

  // Show Login Page if login button clicked
  if (showLogin) {
    return <LoginPage 
      onBack={() => setShowLogin(false)} 
      onRegisterClick={() => {
        setShowLogin(false)
        setShowRegister(true)
      }}
    />
  }

  // Show main website
  return (
    <>
      <PageLoader />
      <div className="min-h-screen overflow-x-hidden bg-white dark:bg-gray-950">
        <Navbar 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
          onLoginClick={() => setShowLogin(true)}
        />
        
        {/* Background Effects */}
        <Suspense fallback={null}>
          <FloatingOrbs />
          <ParticlesBackground />
        </Suspense>
        
        <Hero />
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
      </div>
    </>
  )
}

export default App
