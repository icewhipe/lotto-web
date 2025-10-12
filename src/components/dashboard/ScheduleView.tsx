import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, User } from 'lucide-react'
import InDevelopment from '../InDevelopment'

export default function ScheduleView() {
  // TODO: Интегрировать useSchedule hook для загрузки расписания
  return <InDevelopment 
    title="Расписание в разработке"
    description="Загрузка расписания из базы данных. Скоро вы сможете видеть своё актуальное расписание занятий!"
  />
}
