import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import InDevelopment from '../InDevelopment'

export default function AttendanceView() {
  // TODO: Интегрировать RFID систему и автоматическую отметку посещаемости
  return <InDevelopment 
    title="Посещаемость в разработке"
    description="Интеграция с RFID системой и автоматическая отметка посещаемости через турникеты. Скоро запуск!"
  />
}
