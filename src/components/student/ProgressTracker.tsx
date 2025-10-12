import { motion } from 'framer-motion'
import { TrendingUp, Target, Award, BookOpen } from 'lucide-react'
import InDevelopmentOverlay from '../InDevelopmentOverlay'

const mockProgress = [
  { subject: 'Математика', current: 4.5, goal: 5.0, progress: 90 },
  { subject: 'Информатика', current: 5.0, goal: 5.0, progress: 100 },
  { subject: 'История', current: 4.2, goal: 4.5, progress: 85 },
]

export default function ProgressTracker() {
  return (
    <div className="relative space-y-6">
      {/* Mock Content (Blurred) */}
      <div className="opacity-60 pointer-events-none">
        <div className="glass-effect rounded-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">Академический прогресс</h2>
          
          <div className="space-y-4">
            {mockProgress.map((item) => (
              <div key={item.subject}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{item.subject}</span>
                  <span className="text-sm">
                    <span className="text-violet-600 font-bold">{item.current}</span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="text-gray-500">{item.goal}</span>
                  </span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: TrendingUp, label: 'Динамика', value: '+0.3' },
            { icon: Target, label: 'Цели', value: '2/3' },
            { icon: Award, label: 'Достижения', value: '12' },
          ].map((stat) => (
            <div key={stat.label} className="glass-effect rounded-2xl p-4 text-center">
              <stat.icon className="w-8 h-8 mx-auto mb-2 text-violet-600" />
              <p className="text-2xl font-black mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Development Overlay */}
      <InDevelopmentOverlay 
        title="Прогресс в разработке"
        description="Скоро здесь будет полная аналитика: динамика оценок, график посещаемости, достижения и персональные цели."
      />
    </div>
  )
}
