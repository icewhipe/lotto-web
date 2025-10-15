import { useState, useEffect } from 'react'
import { teacherAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

export interface TeacherSchedule {
  id: string
  dayOfWeek: number
  startTime: string
  endTime: string
  room: string
  type: string
  subject: {
    name: string
  }
  group: {
    name: string
  }
}

export interface TeacherStudent {
  id: string
  user: {
    name: string
    email: string
  }
  group: {
    name: string
  }
  studentNumber: string
}

export interface TeacherGroup {
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
}

export function useTeacherDashboard() {
  const { user } = useAuth()
  const [schedule, setSchedule] = useState<TeacherSchedule[]>([])
  const [students, setStudents] = useState<TeacherStudent[]>([])
  const [groups, setGroups] = useState<TeacherGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.role === 'teacher') {
      loadTeacherData()
    }
  }, [user])

  const loadTeacherData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Загружаем данные параллельно
      const [scheduleRes, studentsRes, groupsRes] = await Promise.all([
        teacherAPI.getSchedule().catch(() => ({ success: false, data: [] })),
        teacherAPI.getStudents().catch(() => ({ success: false, data: [] })),
        teacherAPI.getGroups().catch(() => ({ success: false, data: [] })),
      ])

      if (scheduleRes.success && scheduleRes.data) {
        setSchedule(Array.isArray(scheduleRes.data) ? scheduleRes.data : scheduleRes.data.schedule || [])
      }

      if (studentsRes.success && studentsRes.data) {
        setStudents(Array.isArray(studentsRes.data) ? studentsRes.data : studentsRes.data.students || [])
      }

      if (groupsRes.success && groupsRes.data) {
        setGroups(Array.isArray(groupsRes.data) ? groupsRes.data : groupsRes.data.groups || [])
      }
    } catch (err: any) {
      console.error('Error loading teacher data:', err)
      setError(err.message || 'Ошибка загрузки данных')
      toast.error('Ошибка загрузки данных преподавателя')
    } finally {
      setLoading(false)
    }
  }

  const createGrade = async (data: {
    studentId: string
    subjectId: string
    value: number
    type: string
    comment?: string
  }) => {
    try {
      const response = await teacherAPI.createGrade(data)
      if (response.success) {
        toast.success('Оценка выставлена!')
        return true
      }
      return false
    } catch (error) {
      console.error('Error creating grade:', error)
      toast.error('Ошибка выставления оценки')
      return false
    }
  }

  const markAttendance = async (data: {
    studentId: string
    date: string
    status: string
    reason?: string
  }) => {
    try {
      const response = await teacherAPI.markAttendance(data)
      if (response.success) {
        toast.success('Посещаемость отмечена!')
        return true
      }
      return false
    } catch (error) {
      console.error('Error marking attendance:', error)
      toast.error('Ошибка отметки посещаемости')
      return false
    }
  }

  const refresh = () => loadTeacherData()

  return {
    schedule,
    students,
    groups,
    loading,
    error,
    createGrade,
    markAttendance,
    refresh,
  }
}
