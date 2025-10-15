import { useState, useEffect } from 'react'
import { gradesAPI, scheduleAPI, attendanceAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

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

export function useStudentDashboard() {
  const { user } = useAuth()
  const [grades, setGrades] = useState<Grade[]>([])
  const [schedule, setSchedule] = useState<Schedule[]>([])
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [studentId, setStudentId] = useState<string | null>(null)
  const [groupId, setGroupId] = useState<string | null>(null)

  useEffect(() => {
    if (user?.role === 'student') {
      loadStudentData()
    }
  }, [user])

  const loadStudentData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Получаем данные студента из localStorage
      const userData = localStorage.getItem('user')
      if (!userData) {
        throw new Error('User data not found')
      }

      const parsedUser = JSON.parse(userData)
      console.log('Loading data for user:', parsedUser)

      // Попытка получить studentId
      let studId = parsedUser.studentId || parsedUser.id
      let grpId = parsedUser.groupId

      // Если нет studentId, пробуем найти через API
      if (!studId) {
        console.warn('No studentId found, using userId:', parsedUser.id)
        studId = parsedUser.id
      }

      setStudentId(studId)
      setGroupId(grpId)

      // Загружаем данные параллельно
      const [gradesRes, scheduleRes, attendanceRes] = await Promise.all([
        gradesAPI.getStudentGrades(studId).catch((err) => {
          console.error('Error loading grades:', err)
          return { success: false, data: [] }
        }),
        grpId
          ? scheduleAPI.getGroupSchedule(grpId).catch((err) => {
              console.error('Error loading schedule:', err)
              return { success: false, data: [] }
            })
          : Promise.resolve({ success: false, data: [] }),
        attendanceAPI.getStudentAttendance(studId).catch((err) => {
          console.error('Error loading attendance:', err)
          return { success: false, data: [] }
        }),
      ])

      console.log('Grades response:', gradesRes)
      console.log('Schedule response:', scheduleRes)
      console.log('Attendance response:', attendanceRes)

      if (gradesRes.success && gradesRes.data) {
        setGrades(Array.isArray(gradesRes.data) ? gradesRes.data : gradesRes.data.grades || [])
      }

      if (scheduleRes.success && scheduleRes.data) {
        setSchedule(Array.isArray(scheduleRes.data) ? scheduleRes.data : scheduleRes.data.schedule || [])
      }

      if (attendanceRes.success && attendanceRes.data) {
        setAttendance(Array.isArray(attendanceRes.data) ? attendanceRes.data : attendanceRes.data.attendance || [])
      }
    } catch (err: any) {
      console.error('Error loading student data:', err)
      setError(err.message || 'Ошибка загрузки данных')
      toast.error('Ошибка загрузки данных студента')
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => loadStudentData()

  return {
    grades,
    schedule,
    attendance,
    loading,
    error,
    studentId,
    groupId,
    refresh,
  }
}
