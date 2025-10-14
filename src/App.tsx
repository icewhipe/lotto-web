import { useState, useEffect } from 'react'
import { useAuth } from './contexts/AuthContext'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import Dashboard from './components/Dashboard'
import PageLoader from './components/PageLoader'
import UnderConstruction from './components/UnderConstruction'

function App() {
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
    return <LoginPage 
      onBack={() => setShowLogin(false)} 
      onRegisterClick={() => {
        setShowLogin(false)
        setShowRegister(true)
      }}
    />
  }

  // Show main website - UNDER CONSTRUCTION
  return (
    <>
      <PageLoader />
      <UnderConstruction onLoginClick={() => setShowLogin(true)} />
    </>
  )
}

export default App
