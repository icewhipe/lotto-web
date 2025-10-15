import { useState, useEffect } from 'react'
import { parentAPI } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

export interface Child {
  id: string
  user: {
    name: string
    email: string
  }
  group: {
    name: string
    specialty: {
      name: string
    }
  }
  studentNumber: string
}

export interface ChildGrade {
  id: string
  value: number
  type: string
  date: string
  comment?: string
  subject: {
    name: string
  }
  teacher: {
    user: {
      name: string
    }
  }
}

export interface ChildAttendance {
  id: string
  date: string
  status: string
  reason?: string
}

export interface ChildSchedule {
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

export function useParentDashboard() {
  const { user } = useAuth()
  const [children, setChildren] = useState<Child[]>([])
  const [selectedChild, setSelectedChild] = useState<string | null>(null)
  const [childGrades, setChildGrades] = useState<ChildGrade[]>([])
  const [childAttendance, setChildAttendance] = useState<ChildAttendance[]>([])
  const [childSchedule, setChildSchedule] = useState<ChildSchedule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user?.role === 'parent') {
      loadChildren()
    }
  }, [user])

  useEffect(() => {
    if (selectedChild) {
      loadChildData(selectedChild)
    }
  }, [selectedChild])

  const loadChildren = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await parentAPI.getChildren()

      if (response.success && response.data) {
        const childrenData = Array.isArray(response.data) ? response.data : response.data.children || []
        setChildren(childrenData)
        
        // Auto-select first child
        if (childrenData.length > 0 && !selectedChild) {
          setSelectedChild(childrenData[0].id)
        }
      }
    } catch (err: any) {
      console.error('Error loading children:', err)
      setError(err.message || 'Ошибка загрузки данных')
      toast.error('Ошибка загрузки данных детей')
    } finally {
      setLoading(false)
    }
  }

  const loadChildData = async (childId: string) => {
    try {
      setLoading(true)

      const [gradesRes, attendanceRes, scheduleRes] = await Promise.all([
        parentAPI.getChildGrades(childId).catch(() => ({ success: false, data: [] })),
        parentAPI.getChildAttendance(childId).catch(() => ({ success: false, data: [] })),
        parentAPI.getChildSchedule(childId).catch(() => ({ success: false, data: [] })),
      ])

      if (gradesRes.success && gradesRes.data) {
        setChildGrades(Array.isArray(gradesRes.data) ? gradesRes.data : gradesRes.data.grades || [])
      }

      if (attendanceRes.success && attendanceRes.data) {
        setChildAttendance(Array.isArray(attendanceRes.data) ? attendanceRes.data : attendanceRes.data.attendance || [])
      }

      if (scheduleRes.success && scheduleRes.data) {
        setChildSchedule(Array.isArray(scheduleRes.data) ? scheduleRes.data : scheduleRes.data.schedule || [])
      }
    } catch (err: any) {
      console.error('Error loading child data:', err)
      toast.error('Ошибка загрузки данных ребёнка')
    } finally {
      setLoading(false)
    }
  }

  const selectChild = (childId: string) => {
    setSelectedChild(childId)
  }

  const refresh = () => {
    loadChildren()
    if (selectedChild) {
      loadChildData(selectedChild)
    }
  }

  return {
    children,
    selectedChild,
    childGrades,
    childAttendance,
    childSchedule,
    loading,
    error,
    selectChild,
    refresh,
  }
}
