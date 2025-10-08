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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { user } = useAuth()

  if (!user) return null

  const renderContent = () => {
    // Common components for multiple roles
    if (activeTab === 'schedule') {
      return <ScheduleView />
    }

    // Student-specific views
    if (user.role === 'student' || user.role === 'parent') {
      switch (activeTab) {
        case 'dashboard':
          return <StudentDashboard />
        case 'grades':
          return <GradesView />
        case 'attendance':
          return <AttendanceView />
        case 'notes':
          return <NotesExchange />
        case 'progress':
          return <ProgressTracker />
        case 'chat':
          return <StudentChat />
        case 'documents':
          return (
            <div className="glass-effect rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-black mb-4">Документы</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Раздел в разработке
              </p>
            </div>
          )
        default:
          return <StudentDashboard />
      }
    }

    // Teacher-specific views
    if (user.role === 'teacher') {
      switch (activeTab) {
        case 'dashboard':
          return (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-black mb-2">Панель преподавателя</h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Добро пожаловать, {user.name}
                </p>
              </div>
              <div className="glass-effect rounded-2xl p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Выберите раздел из меню слева
                </p>
              </div>
            </div>
          )
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
    if (user.role === 'applicant') {
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

    // Admin views
    if (user.role === 'admin') {
      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-black mb-2">Панель администратора</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Управление системой
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

    return null
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  )
}
