import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from './contexts/AuthContext'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Dashboard from './components/Dashboard'
import LiquidGlassTransition from './components/site/LiquidGlassTransition'
import EnhancedMainSite from './components/EnhancedMainSite'

function App() {
  const [showTransition, setShowTransition] = useState(true) // Show liquid glass transition first
  const [showFullSite, setShowFullSite] = useState(false) // Will show after transition
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const { isAuthenticated } = useAuth()

  // Theme management moved to MainSite component
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem('theme')
  //   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  //   
  //   const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
  //   setIsDarkMode(shouldBeDark)
  //   
  //   if (shouldBeDark) {
  //     document.documentElement.classList.add('dark')
  //   }
  // }, [])

  // Theme toggle moved to MainSite component
  // const toggleTheme = () => {
  //   const newIsDark = !isDarkMode
  //   setIsDarkMode(newIsDark)
  //   
  //   if (newIsDark) {
  //     document.documentElement.classList.add('dark')
  //     localStorage.setItem('theme', 'dark')
  //   } else {
  //     document.documentElement.classList.remove('dark')
  //     localStorage.setItem('theme', 'light')
  //   }
  // }

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
    return (
      <LoginPage 
        onBack={() => {
          setShowLogin(false)
          setShowFullSite(true)
        }} 
        onRegisterClick={() => {
          setShowLogin(false)
          setShowRegister(true)
        }}
      />
    )
  }

  // Show Liquid Glass Transition first, then Full Site
  if (showTransition) {
    return (
      <AnimatePresence mode="wait">
        <LiquidGlassTransition 
          onComplete={() => {
            sessionStorage.setItem('hasSeenTransition', 'true')
            setShowTransition(false)
            setShowFullSite(true)
          }}
        />
      </AnimatePresence>
    )
  }

  // Show Main Site (original old design) - instant after transition
  if (showFullSite) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="mainsite"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0 }}
        >
          <EnhancedMainSite 
            onNavigateToDiary={() => setShowLogin(true)}
          />
        </motion.div>
      </AnimatePresence>
    )
  }

  // Fallback - should never reach here, but just in case show Enhanced Main Site
  return (
    <EnhancedMainSite 
      onNavigateToDiary={() => setShowLogin(true)}
    />
  )
}

export default App
