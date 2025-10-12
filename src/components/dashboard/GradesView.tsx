import { motion } from 'framer-motion'
import { TrendingUp, BookOpen } from 'lucide-react'
import InDevelopment from '../InDevelopment'

export default function GradesView() {
  // TODO: Интегрировать useGrades hook для загрузки реальных оценок
  return <InDevelopment 
    title="Оценки в разработке"
    description="Интеграция с backend API для отображения ваших реальных оценок. Скоро будет доступна полная статистика по всем предметам!"
  />
}
