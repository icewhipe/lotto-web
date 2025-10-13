import { useState } from 'react'
import { Send } from 'lucide-react'

export default function StudentChat() {
  const [message, setMessage] = useState('')
  
  const mockMessages = [
    { id: 1, user: 'Иван Петров', message: 'Привет! Кто знает когда экзамен?', time: '10:30', isOwn: false },
    { id: 2, user: 'Вы', message: 'Кажется в понедельник', time: '10:32', isOwn: true },
    { id: 3, user: 'Мария Смирнова', message: 'Точно! 15 числа', time: '10:35', isOwn: false },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black mb-2">Чат группы 💬</h1>
        <p className="text-gray-600 dark:text-gray-400">Демо-данные</p>
      </div>

      <div className="glass-effect rounded-2xl overflow-hidden h-[500px] flex flex-col">
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {mockMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[70%] p-4 rounded-2xl ${
                msg.isOwn 
                  ? 'bg-violet-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}>
                {!msg.isOwn && <p className="text-xs font-semibold mb-1 opacity-70">{msg.user}</p>}
                <p>{msg.message}</p>
                <p className="text-xs opacity-70 mt-1">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Написать сообщение..."
              className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800"
              disabled
            />
            <button className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold flex items-center gap-2" disabled>
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            💡 Демо-режим
          </p>
        </div>
      </div>
    </div>
  )
}
