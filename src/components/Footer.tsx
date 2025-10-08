import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const footerLinks = {
  about: [
    { name: 'История', href: '#history' },
    { name: 'О техникуме', href: '#about' },
    { name: 'Преимущества', href: '#advantages' },
    { name: 'Достижения', href: '#achievements' },
  ],
  education: [
    { name: 'Специальности', href: '#programs' },
    { name: 'Преподаватели', href: '#staff' },
    { name: 'Галерея', href: '#gallery' },
    { name: 'Документы', href: '#documents' },
  ],
  students: [
    { name: 'Новости', href: '#news' },
    { name: 'Мероприятия', href: '#events' },
    { name: 'Поступающим', href: '#admissions' },
    { name: 'Контакты', href: '#contacts' },
  ],
}

const contacts = [
  '📞 +7 (47391) 4-71-49',
  '📧 lptt@mail.ru',
  '📍 г. Лиски, ул. Титова, 10',
]

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-20 pb-8">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <h3 className="text-4xl font-black gradient-text">ЛПТТ</h3>
            </motion.div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              Лискинский промышленно-транспортный техникум - ваш надежный путь к профессиональному успеху. 
              Более 65 лет готовим квалифицированных специалистов.
            </p>
            <div className="pt-4">
              <h4 className="font-bold mb-3 text-sm">Контакты</h4>
              <ul className="space-y-2">
                {contacts.map((contact) => (
                  <li
                    key={contact}
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    {contact}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* О техникуме */}
          <div>
            <h4 className="font-bold mb-4">О техникуме</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Образование */}
          <div>
            <h4 className="font-bold mb-4">Образование</h4>
            <ul className="space-y-2">
              {footerLinks.education.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Студентам */}
          <div>
            <h4 className="font-bold mb-4">Студентам</h4>
            <ul className="space-y-2">
              {footerLinks.students.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; 2025 ЛПТТ. Все права защищены.
          </p>
          <motion.p
            className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            Разработано с <Heart className="w-4 h-4 text-red-500 fill-red-500" /> для будущих специалистов
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
