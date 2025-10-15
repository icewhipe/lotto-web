import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from './contexts/AuthContext'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Dashboard from './components/Dashboard'
import PageLoader from './components/PageLoader'
import UnderConstruction from './components/UnderConstruction'
import MainSite from './components/MainSite'

function App() {
  const [showMainSite, setShowMainSite] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark')
    }
  }, [])

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
          setShowMainSite(false)
        }} 
        onRegisterClick={() => {
          setShowLogin(false)
          setShowRegister(true)
        }}
      />
    )
  }

  // Show Main Site (new design)
  if (showMainSite) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="mainsite"
          initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.95 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <MainSite onNavigateToDiary={() => setShowLogin(true)} />
        </motion.div>
      </AnimatePresence>
    )
  }

  // Show main website - UNDER CONSTRUCTION
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
          onNavigateToSite={() => setShowMainSite(true)}
        />
      </motion.div>
    </AnimatePresence>
  )
}

export default App
