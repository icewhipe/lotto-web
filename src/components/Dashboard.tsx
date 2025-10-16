import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import DashboardLayout from './dashboard/DashboardLayout'
import StudentDashboard from './dashboard/StudentDashboard'
import GradesView from './dashboard/GradesView'
import ScheduleView from './dashboard/ScheduleView'
import AttendanceView from './dashboard/AttendanceView'
import NotesExchange from './student/NotesExchange'
import ProgressTracker from './student/ProgressTracker'
import StudentChat from './student/StudentChat'
import TeacherDashboard from './dashboard/TeacherDashboard'
import DirectorDashboard from './dashboard/DirectorDashboard'
import ZavuchDashboard from './dashboard/ZavuchDashboard'
import AdminPanel from './admin/AdminPanel'
import UnderDevelopment from './UnderDevelopment'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { user } = useAuth()

  // Debug logging
  console.log('🔍 Dashboard render:', {
    user: user ? { name: user.name, role: user.role, email: user.email } : null,
    activeTab
  })

  if (!user) {
    console.warn('⚠️ Dashboard: user is null, returning null')
    return null
  }

  const renderContent = () => {
    console.log('🎨 Rendering content for:', { role: user.role, activeTab })
    // Common components for multiple roles
    if (activeTab === 'schedule') {
      return <ScheduleView />
    }

    // Student-specific views
    const userRole = user.role.toLowerCase()
    if (userRole === 'student' || userRole === 'parent') {
      console.log('✅ User is student/parent, activeTab:', activeTab)
              switch (activeTab) {
                case 'dashboard':
                  console.log('📱 Rendering StudentDashboard')
                  return <StudentDashboard onTabChange={setActiveTab} />
        case 'grades':
          console.log('📚 Rendering GradesView')
          return <GradesView />
        case 'attendance':
          console.log('📅 Rendering AttendanceView')
          return <AttendanceView />
        case 'notes':
          return <NotesExchange />
        case 'progress':
          return <ProgressTracker />
        case 'chat':
          return <StudentChat />
        case 'documents':
          return <UnderDevelopment isDark={false} sectionName="Документы" onBack={() => setActiveTab('dashboard')} />
        default:
          return <StudentDashboard />
      }
    }

    // Teacher-specific views
    if (userRole === 'teacher') {
      switch (activeTab) {
        case 'dashboard':
          return <TeacherDashboard />
        case 'journal':
          return (
            <div className="glass-effect rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-black mb-4">Электронный журнал</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Раздел в разработке
              </p>
            </div>
          )
        case 'groups':
          return (
            <div className="glass-effect rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-black mb-4">Мои группы</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Раздел в разработке
              </p>
            </div>
          )
        case 'reports':
          return (
            <div className="glass-effect rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-black mb-4">Отчеты</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Раздел в разработке
              </p>
            </div>
          )
        default:
          return null
      }
    }

    // Applicant-specific views
    if (userRole === 'applicant') {
      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-black mb-2">Панель абитуриента</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Отслеживайте статус вашего поступления
            </p>
          </div>
          <div className="glass-effect rounded-2xl p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Раздел в разработке
            </p>
          </div>
        </div>
      )
    }

    // Director views (highest priority) - БЕЗ DashboardLayout, вернётся снаружи
    if (userRole === 'director' || user.email === 'director@lptt.ru') {
      return <DirectorDashboard />
    }

    // Zavuch views - БЕЗ DashboardLayout, вернётся снаружи
    if (userRole === 'zavuch' || user.email === 'zavuch@lptt.ru') {
      return <ZavuchDashboard />
    }

    // Admin views - БЕЗ обёртки
    if (userRole === 'admin') {
      return <AdminPanel />
    }

    return null
  }

  // Admin gets full AdminPanel (without DashboardLayout)
  if (user.role.toLowerCase() === 'admin') {
    return renderContent()
  }

  // Director and Zavuch get DashboardLayout wrapper
  if (user.role.toLowerCase() === 'director' || user.email === 'director@lptt.ru' ||
      user.role.toLowerCase() === 'zavuch' || user.email === 'zavuch@lptt.ru') {
    return (
      <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </DashboardLayout>
    )
  }

  // Other roles get DashboardLayout wrapper
  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  )
}
