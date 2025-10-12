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
import AdminPanel from './admin/AdminPanel'

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
          return <InDevelopment title="Документы в разработке" description="Здесь будут доступны ваши документы: справки, зачётная книжка, расписание сессии." />
        default:
          return <StudentDashboard />
      }
    }

    // Teacher-specific views
    if (user.role === 'teacher') {
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
      return <AdminPanel />
    }
    
    // Director views (if you add this role)
    if (user.email === 'director@lptt.ru') {
      return (
        <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
          <DirectorDashboard />
        </DashboardLayout>
      )
    }

    return null
  }

  // Admin gets full AdminPanel
  if (user.role === 'admin') {
    return renderContent()
  }

  // Other roles get DashboardLayout wrapper
  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  )
}
