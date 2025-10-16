import { useState, useEffect } from 'react'
import { gradesAPI } from '../services/api'

interface Grade {
  id: string
  subject: {
    name: string
  }
  value: number
  type: string
  date: string
  comment?: string
  teacher: {
    user: {
      name: string
    }
  }
}

export function useGrades(studentId: string | undefined) {
  const [grades, setGrades] = useState<Grade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [average, setAverage] = useState<number>(0)

  useEffect(() => {
    if (!studentId) {
      setLoading(false)
      return
    }

    const fetchGrades = async () => {
      try {
        setLoading(true)
        const response = await gradesAPI.getStudentGrades(studentId)
        
        if (response.success && response.data) {
          setGrades(response.data.grades || [])
          setAverage(response.data.average || 0)
        }
      } catch (err: any) {
        console.error('Failed to fetch grades:', err)
        setError(err.message || 'Не удалось загрузить оценки')
      } finally {
        setLoading(false)
      }
    }

    fetchGrades()
  }, [studentId])

  return { grades, loading, error, average, refetch: () => {} }
}
