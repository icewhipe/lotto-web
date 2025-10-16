import { useState, useEffect } from 'react'
import { directorAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

export interface Analytics {
  totalStudents: number
  totalTeachers: number
  totalGroups: number
  averageGrade: number
  attendanceRate: number
}

export interface PerformanceReport {
  groups: Array<{
    id: string
    name: string
    averageGrade: number
    studentsCount: number
  }>
}

export interface AttendanceReport {
  groups: Array<{
    id: string
    name: string
    attendanceRate: number
    studentsCount: number
  }>
}

export interface GroupOverview {
  id: string
  name: string
  year: number
  specialty: {
    name: string
    code: string
  }
  _count: {
    students: number
  }
  stats: {
    averageGrade: number
    attendanceRate: number
  }
}

export function useDirectorDashboard() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [performanceReport, setPerformanceReport] = useState<PerformanceReport | null>(null)
  const [attendanceReport, setAttendanceReport] = useState<AttendanceReport | null>(null)
  const [groupsOverview, setGroupsOverview] = useState<GroupOverview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.role === 'director' || user?.role === 'zavuch') {
      loadDirectorData()
    }
  }, [user])

  const loadDirectorData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Загружаем данные параллельно
      const [analyticsRes, performanceRes, attendanceRes, groupsRes] = await Promise.all([
        directorAPI.getAnalytics().catch(() => ({ success: false, data: null })),
        directorAPI.getPerformanceReport().catch(() => ({ success: false, data: null })),
        directorAPI.getAttendanceReport().catch(() => ({ success: false, data: null })),
        directorAPI.getGroupsOverview().catch(() => ({ success: false, data: [] })),
      ])

      if (analyticsRes.success && analyticsRes.data) {
        setAnalytics(analyticsRes.data)
      }

      if (performanceRes.success && performanceRes.data) {
        setPerformanceReport(performanceRes.data)
      }

      if (attendanceRes.success && attendanceRes.data) {
        setAttendanceReport(attendanceRes.data)
      }

      if (groupsRes.success && groupsRes.data) {
        setGroupsOverview(Array.isArray(groupsRes.data) ? groupsRes.data : groupsRes.data.groups || [])
      }
    } catch (err: any) {
      console.error('Error loading director data:', err)
      setError(err.message || 'Ошибка загрузки данных')
      toast.error('Ошибка загрузки аналитики')
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => loadDirectorData()

  return {
    analytics,
    performanceReport,
    attendanceReport,
    groupsOverview,
    loading,
    error,
    refresh,
  }
}
