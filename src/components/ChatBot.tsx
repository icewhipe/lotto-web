import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

interface Message {
  text: string
  isBot: boolean
  timestamp: Date
}

const quickReplies = [
  'Как поступить?',
  'Какие специальности?',
  'Есть ли общежитие?',
  'Стоимость обучения',
  'Контакты',
]

const botResponses: { [key: string]: string } = {
  'как поступить': 'Для поступления нужны: паспорт, аттестат, 6 фото 3x4, медицинская справка. Прием с 20 июня до 15 августа. Подробнее в разделе "Поступающим".',
  'какие специальности': 'У нас 15+ специальностей: эксплуатация ЖД транспорта, автомобили, программирование, электроснабжение и др. Смотрите раздел "Специальности".',
  'общежитие': 'Да, есть общежитие для иногородних студентов. Комнаты на 2-3 человека. Все удобства в комнатах. Стоимость от 800 руб/месяц.',
  'стоимость': 'Обучение БЕСПЛАТНОЕ (бюджет). Есть стипендия от 2000 руб. для отличников. Платное отделение - от 35000 руб/год.',
  'контакты': 'Телефон: +7 (47391) 4-71-49, Email: lptt@mail.ru, Адрес: г. Лиски, ул. Титова, д. 10',
  'default': 'Извините, я не понял ваш вопрос. Попробуйте выбрать один из вариантов выше или обратитесь по телефону +7 (47391) 4-71-49',
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Привет! 👋 Я виртуальный помощник ЛПТТ. Чем могу помочь?',
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    // Add user message
    const userMessage: Message = {
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate bot typing
    setTimeout(() => {
      const response = getBotResponse(messageText)
      const botMessage: Message = {
        text: response,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response
      }
    }
    
    return botResponses.default
  }

  const handleQuickReply = (reply: string) => {
    handleSend(reply)
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle className="w-8 h-8" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] glass-effect rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Помощник ЛПТТ</h3>
                  <p className="text-xs text-white/80">Онлайн</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot
                        ? 'bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-gray-100'
                        : 'bg-gradient-to-r from-primary-500 to-purple-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString('ru', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-1.5 text-xs font-medium bg-white/50 dark:bg-gray-800/50 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors whitespace-nowrap"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Напишите сообщение..."
                  className="flex-1 px-4 py-2 bg-white/50 dark:bg-gray-800/50 rounded-full outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-purple-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-transform"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
