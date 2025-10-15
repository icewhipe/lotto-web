import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from './contexts/AuthContext'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Dashboard from './components/Dashboard'
import PageLoader from './components/PageLoader'
import UnderConstruction from './components/UnderConstruction'
import FullSite from './components/site/FullSite'

function App() {
  const [showFullSite, setShowFullSite] = useState(true) // Show new glassmorphic site by default
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    setIsDarkMode(shouldBeDark)
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newIsDark = !isDarkMode
    setIsDarkMode(newIsDark)
    
    if (newIsDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
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

  // Show Full Site (glassmorphic design)
  if (showFullSite) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="fullsite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FullSite 
            onNavigateToDiary={() => setShowLogin(true)}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        </motion.div>
      </AnimatePresence>
    )
  }

  // Show construction page (fallback)
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="construction"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <PageLoader />
        <UnderConstruction 
          onLoginClick={() => setShowLogin(true)}
          onNavigateToSite={() => setShowFullSite(true)}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default App
