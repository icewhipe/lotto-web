import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Smile, Paperclip } from 'lucide-react'

const mockMessages = [
  {
    id: 1,
    user: 'Иван Петров',
    message: 'Привет! Кто-нибудь знает, когда экзамен по математике?',
    time: '10:30',
    isMe: false,
  },
  {
    id: 2,
    user: 'Мария Сидорова',
    message: '15 октября, в 9:00',
    time: '10:32',
    isMe: false,
  },
  {
    id: 3,
    user: 'Вы',
    message: 'Спасибо! А кто-нибудь делился конспектами?',
    time: '10:35',
    isMe: true,
  },
  {
    id: 4,
    user: 'Алексей Иванов',
    message: 'Я скинул в раздел обмена конспектами, смотрите там',
    time: '10:37',
    isMe: false,
  },
]

const onlineUsers = [
  { name: 'Иван Петров', status: 'online' },
  { name: 'Мария Сидорова', status: 'online' },
  { name: 'Алексей Иванов', status: 'away' },
  { name: 'Дмитрий Козлов', status: 'offline' },
]

export default function StudentChat() {
  const [message, setMessage] = useState('')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black gradient-text">Студенческий чат</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Общайтесь с одногруппниками</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Online Users */}
        <div className="glass-effect rounded-3xl p-6">
          <h3 className="font-bold mb-4">Онлайн (3)</h3>
          <div className="space-y-3">
            {onlineUsers.map((user, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name[0]}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
                    user.status === 'online' ? 'bg-green-500' : user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{user.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{user.status}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat */}
        <div className="lg:col-span-3 glass-effect rounded-3xl overflow-hidden flex flex-col" style={{ height: '600px' }}>
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg">Общий чат группы</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">42 участника</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {mockMessages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}
              >
                {!msg.isMe && (
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {msg.user[0]}
                  </div>
                )}
                <div className={`flex-1 max-w-md ${msg.isMe ? 'flex flex-col items-end' : ''}`}>
                  {!msg.isMe && <div className="text-sm font-semibold mb-1">{msg.user}</div>}
                  <div className={`p-4 rounded-2xl ${
                    msg.isMe 
                      ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white' 
                      : 'bg-white/50 dark:bg-gray-800/50'
                  }`}>
                    <p>{msg.message}</p>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{msg.time}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <button className="p-3 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-3 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-xl transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Введите сообщение..."
                className="flex-1 px-4 py-3 bg-white/50 dark:bg-gray-800/50 rounded-xl outline-none focus:ring-2 focus:ring-primary-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-xl"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
