import { motion } from 'framer-motion'
import { BookOpen, Calendar, TrendingUp, Award, Clock, AlertCircle } from 'lucide-react'
import InDevelopment from '../InDevelopment'

export default function StudentDashboard() {
  // TODO: Интегрировать useGrades и useSchedule после завершения backend интеграции
  return <InDevelopment 
    title="Дашборд студента в разработке"
    description="Backend API готов! Интеграция с реальными данными (оценки, расписание, посещаемость) находится в процессе разработки."
  />
}
