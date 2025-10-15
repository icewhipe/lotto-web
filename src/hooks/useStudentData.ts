import { useState, useEffect } from 'react'
import { gradesAPI, scheduleAPI, attendanceAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

export interface Grade {
  id: string
  value: number
  type: string
  date: string
  comment?: string
  subject: {
    name: string
    code: string
  }
  teacher: {
    user: {
      name: string
    }
  }
}

export interface Schedule {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  room: string
  type: string
  subject: {
    name: string
  }
  teacher: {
    user: {
      name: string
    }
  }
}

export interface Attendance {
  id: string
  date: string
  status: string
  reason?: string
}

export function useStudentData() {
  const { user } = useAuth()
  const [grades, setGrades] = useState<Grade[]>([])
  const [schedule, setSchedule] = useState<Schedule[]>([])
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.role?.toLowerCase() === 'student') {
      loadStudentData()
    }
  }, [user])

  const loadStudentData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Получаем studentId из localStorage или API
      const studentData = localStorage.getItem('studentData')
      let studentId = studentData ? JSON.parse(studentData).id : null

      if (!studentId) {
        // Если нет в localStorage, пробуем получить из API
        const userEmail = user?.email
        if (userEmail) {
          // Временно используем email для поиска студента
          // В реальной системе это должно быть в user.studentId
          console.log('Loading data for:', userEmail)
        }
        setError('Student ID not found')
        return
      }

      // Загружаем данные параллельно
      const [gradesRes, scheduleRes, attendanceRes] = await Promise.all([
        gradesAPI.getStudentGrades(studentId).catch(() => ({ data: [] })),
        scheduleAPI.getGroupSchedule('group-id').catch(() => ({ data: [] })), // Нужен groupId
        attendanceAPI.getStudentAttendance(studentId).catch(() => ({ data: [] })),
      ])

      setGrades(gradesRes.data || [])
      setSchedule(scheduleRes.data || [])
      setAttendance(attendanceRes.data || [])
    } catch (err: any) {
      console.error('Error loading student data:', err)
      setError(err.message || 'Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }

  const refreshGrades = () => loadStudentData()

  return {
    grades,
    schedule,
    attendance,
    loading,
    error,
    refreshGrades,
  }
}
