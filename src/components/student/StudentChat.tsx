import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Smile, Paperclip } from 'lucide-react'
import InDevelopmentOverlay from '../InDevelopmentOverlay'

const mockMessages = [
  { id: 1, user: 'Иван Петров', message: 'Привет! Кто-нибудь знает, когда экзамен?', time: '10:30', isOwn: false },
  { id: 2, user: 'Вы', message: 'Кажется, в следующий понедельник', time: '10:32', isOwn: true },
  { id: 3, user: 'Мария Иванова', message: 'Точно! 15 числа', time: '10:33', isOwn: false },
]

export default function StudentChat() {
  const [message, setMessage] = useState('')

  return (
    <div className="space-y-6 relative h-[600px]">
      {/* Mock Content (Blurred) */}
      <div className="opacity-60 pointer-events-none h-full flex flex-col">
        <div className="glass-effect rounded-t-2xl p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">Чат группы ИС-21</h2>
          <p className="text-sm text-gray-500">25 участников • 3 онлайн</p>
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {mockMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-3 rounded-2xl ${
                msg.isOwn 
                  ? 'bg-violet-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}>
                {!msg.isOwn && <p className="text-xs font-semibold mb-1">{msg.user}</p>}
                <p className="text-sm">{msg.message}</p>
                <p className="text-xs opacity-70 mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-effect rounded-b-2xl p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Написать сообщение..."
              className="flex-1 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800"
            />
            <button className="p-2 rounded-xl bg-violet-600 text-white">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Development Overlay */}
      <InDevelopmentOverlay 
        title="Чат в разработке"
        description="WebSocket интеграция для real-time сообщений. Socket.IO готов на backend! Скоро групповые и личные чаты."
      />
    </div>
  )
}
