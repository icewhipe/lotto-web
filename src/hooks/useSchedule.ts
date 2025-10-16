import { useState, useEffect } from 'react'
import { scheduleAPI } from '../services/api'

interface Schedule {
  id: string
  subject: {
    name: string
  }
  teacher: {
    user: {
      name: string
    }
  }
  dayOfWeek: number
  startTime: string
  endTime: string
  room: string
  type: string
}

export function useSchedule(groupId: string | undefined, dayOfWeek?: number) {
  const [schedule, setSchedule] = useState<Schedule[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!groupId) {
      setLoading(false)
      return
    }

    const fetchSchedule = async () => {
      try {
        setLoading(true)
        const response = await scheduleAPI.getGroupSchedule(groupId, dayOfWeek)
        
        if (response.success && response.data) {
          setSchedule(response.data.schedule || [])
        }
      } catch (err: any) {
        console.error('Failed to fetch schedule:', err)
        setError(err.message || 'Не удалось загрузить расписание')
      } finally {
        setLoading(false)
      }
    }

    fetchSchedule()
  }, [groupId, dayOfWeek])

  return { schedule, loading, error, refetch: () => {} }
}
