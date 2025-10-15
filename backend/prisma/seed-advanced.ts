import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Конфигурация seed
const CONFIG = {
  studentsPerGroup: 25,
  groups: [
    { name: 'ИС-21', specialty: 'Информационные системы', year: 2021 },
    { name: 'ИС-22', specialty: 'Информационные системы', year: 2022 },
    { name: 'ИС-23', specialty: 'Информационные системы', year: 2023 },
    { name: 'АТ-21', specialty: 'Автомобильный транспорт', year: 2021 },
    { name: 'АТ-22', specialty: 'Автомобильный транспорт', year: 2022 },
  ],
  password: '123456',
}

// Имена для генерации
const FIRST_NAMES_MALE = [
  'Александр', 'Дмитрий', 'Максим', 'Иван', 'Артём', 'Михаил', 'Даниил', 'Егор',
  'Андрей', 'Никита', 'Илья', 'Владислав', 'Кирилл', 'Тимофей', 'Роман', 'Павел',
  'Сергей', 'Константин', 'Денис', 'Виктор', 'Антон', 'Олег', 'Вадим', 'Игорь',
]

const FIRST_NAMES_FEMALE = [
  'Анастасия', 'Мария', 'Дарья', 'Екатерина', 'Полина', 'Алина', 'Виктория', 'Елизавета',
  'Ксения', 'Валерия', 'Арина', 'Софья', 'Анна', 'Карина', 'Диана', 'Милана',
]

const LAST_NAMES = [
  'Иванов', 'Петров', 'Сидоров', 'Смирнов', 'Козлов', 'Новиков', 'Морозов', 'Волков',
  'Соколов', 'Лебедев', 'Семёнов', 'Егоров', 'Павлов', 'Фёдоров', 'Михайлов', 'Алексеев',
  'Дмитриев', 'Кузнецов', 'Васильев', 'Попов', 'Соловьёв', 'Тарасов', 'Белов', 'Орлов',
]

const PATRONYMICS = [
  'Александрович', 'Дмитриевич', 'Максимович', 'Иванович', 'Артёмович', 'Михайлович',
  'Сергеевич', 'Андреевич', 'Владимирович', 'Николаевич', 'Павлович', 'Олегович',
]

const PATRONYMICS_FEMALE = [
  'Александровна', 'Дмитриевна', 'Максимовна', 'Ивановна', 'Артёмовна', 'Михайловна',
  'Сергеевна', 'Андреевна', 'Владимировна', 'Николаевна', 'Павловна', 'Олеговна',
]

const SUBJECTS = [
  { name: 'Математика', code: 'MATH' },
  { name: 'Информатика', code: 'INFO' },
  { name: 'Программирование', code: 'PROG' },
  { name: 'Базы данных', code: 'DB' },
  { name: 'Веб-разработка', code: 'WEB' },
  { name: 'Физика', code: 'PHYS' },
  { name: 'История', code: 'HIST' },
  { name: 'Русский язык', code: 'RUS' },
  { name: 'Английский язык', code: 'ENG' },
  { name: 'Физическая культура', code: 'PE' },
]

const TEACHERS = [
  { name: 'Иванова Мария Петровна', email: 'ivanova@lptt.ru', subjects: ['Математика', 'Физика'] },
  { name: 'Петров Алексей Сергеевич', email: 'petrov@lptt.ru', subjects: ['Информатика', 'Программирование'] },
  { name: 'Смирнова Елена Викторовна', email: 'smirnova@lptt.ru', subjects: ['История', 'Русский язык'] },
  { name: 'Козлов Дмитрий Александрович', email: 'kozlov@lptt.ru', subjects: ['Базы данных', 'Веб-разработка'] },
  { name: 'Новикова Ольга Ивановна', email: 'novikova@lptt.ru', subjects: ['Английский язык'] },
  { name: 'Морозов Сергей Николаевич', email: 'morozov@lptt.ru', subjects: ['Физическая культура'] },
]

// Утилиты
const randomItem = <T,>(array: T[]): T => array[Math.floor(Math.random() * array.length)]
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
const randomGrade = () => randomInt(3, 5)

function generateFullName(isMale: boolean): { firstName: string; lastName: string; patronymic: string; fullName: string } {
  const firstName = randomItem(isMale ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE)
  const lastName = randomItem(LAST_NAMES)
  const patronymic = randomItem(isMale ? PATRONYMICS : PATRONYMICS_FEMALE)
  
  const lastNameWithSuffix = isMale ? lastName : lastName + 'а'
  const fullName = `${lastNameWithSuffix} ${firstName} ${patronymic}`
  
  return { firstName, lastName: lastNameWithSuffix, patronymic, fullName }
}

function generateEmail(fullName: string, index: number): string {
  const translitMap: { [key: string]: string } = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  }
  
  const parts = fullName.toLowerCase().split(' ')
  let email = parts[0] // Фамилия
  
  for (const char of email) {
    if (translitMap[char]) {
      email = email.replace(char, translitMap[char])
    }
  }
  
  return `${email}${index}@lptt.ru`
}

async function main() {
  console.log('🌱 Начинаем РАСШИРЕННОЕ заполнение базы данных...\n')

  const hashedPassword = await bcrypt.hash(CONFIG.password, 10)

  // ====================================
  // 1. ОЧИСТКА БАЗЫ ДАННЫХ
  // ====================================
  console.log('🗑️  Очистка базы данных...')
  
  await prisma.attendance.deleteMany()
  await prisma.grade.deleteMany()
  await prisma.schedule.deleteMany()
  await prisma.subject.deleteMany()
  await prisma.student.deleteMany()
  await prisma.teacher.deleteMany()
  await prisma.parent.deleteMany()
  await prisma.applicant.deleteMany()
  await prisma.group.deleteMany()
  await prisma.specialty.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ База данных очищена\n')

  // ====================================
  // 2. СОЗДАНИЕ АДМИНИСТРАЦИИ
  // ====================================
  console.log('👔 Создание администрации...')

  // Директор
  const directorUser = await prisma.user.create({
    data: {
      email: 'director@lptt.ru',
      password: hashedPassword,
      name: 'Соколов Владимир Петрович',
      role: 'ADMIN',
    },
  })
  console.log('✅ Директор: director@lptt.ru')

  // Завуч
  const zavuchUser = await prisma.user.create({
    data: {
      email: 'zavuch@lptt.ru',
      password: hashedPassword,
      name: 'Волкова Светлана Ивановна',
      role: 'ADMIN',
    },
  })
  console.log('✅ Завуч: zavuch@lptt.ru')

  // Администратор системы
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@lptt.ru',
      password: hashedPassword,
      name: 'Администратор Системы',
      role: 'ADMIN',
    },
  })
  console.log('✅ Админ: admin@lptt.ru\n')

  // ====================================
  // 3. СОЗДАНИЕ СПЕЦИАЛЬНОСТЕЙ
  // ====================================
  console.log('📚 Создание специальностей...')

  const specialty1 = await prisma.specialty.create({
    data: {
      name: 'Информационные системы и программирование',
      code: 'ИС',
      duration: '3 года 10 месяцев',
      description: 'Разработка программного обеспечения и информационных систем',
    },
  })

  const specialty2 = await prisma.specialty.create({
    data: {
      name: 'Техническое обслуживание и ремонт автомобильного транспорта',
      code: 'АТ',
      duration: '3 года 10 месяцев',
      description: 'Обслуживание и ремонт автомобилей',
    },
  })

  const specialty3 = await prisma.specialty.create({
    data: {
      name: 'Электроснабжение',
      code: 'ЭС',
      duration: '3 года 10 месяцев',
      description: 'Электрические системы и сети',
    },
  })

  console.log(`✅ Создано специальностей: 3\n`)

  // ====================================
  // 4. СОЗДАНИЕ ГРУПП
  // ====================================
  console.log('👥 Создание групп...')

  const groups = []
  
  for (const groupConfig of CONFIG.groups) {
    const specialty = groupConfig.specialty.includes('Информационные') ? specialty1 : specialty2
    
    const group = await prisma.group.create({
      data: {
        name: groupConfig.name,
        specialtyId: specialty.id,
        year: groupConfig.year,
      },
    })
    
    groups.push(group)
    console.log(`✅ Группа: ${group.name}`)
  }

  console.log(`\n✅ Создано групп: ${groups.length}\n`)

  // ====================================
  // 5. СОЗДАНИЕ ПРЕПОДАВАТЕЛЕЙ
  // ====================================
  console.log('👨‍🏫 Создание преподавателей...')

  const teachers = []
  
  for (const teacherData of TEACHERS) {
    const user = await prisma.user.create({
      data: {
        email: teacherData.email,
        password: hashedPassword,
        name: teacherData.name,
        role: 'TEACHER',
      },
    })

    const teacher = await prisma.teacher.create({
      data: {
        userId: user.id,
        position: 'Преподаватель',
        department: 'Кафедра общеобразовательных дисциплин',
      },
    })

    teachers.push({ ...teacher, subjects: teacherData.subjects, user })
    console.log(`✅ ${teacherData.name}`)
  }

  console.log(`\n✅ Создано преподавателей: ${teachers.length}\n`)

  // ====================================
  // 6. СОЗДАНИЕ ПРЕДМЕТОВ
  // ====================================
  console.log('📖 Создание предметов...')

  const subjects = []
  
  for (const subjectData of SUBJECTS) {
    // Найдём преподавателя для этого предмета
    const teacher = teachers.find(t => t.subjects.includes(subjectData.name))
    
    if (teacher) {
      const subject = await prisma.subject.create({
        data: {
          name: subjectData.name,
          code: subjectData.code,
          specialtyId: specialty1.id,
          teacherId: teacher.id,
        },
      })

      subjects.push(subject)
      console.log(`✅ ${subjectData.name} (${teacher.user.name})`)
    }
  }

  console.log(`\n✅ Создано предметов: ${subjects.length}\n`)

  // ====================================
  // 7. СОЗДАНИЕ СТУДЕНТОВ (100+)
  // ====================================
  console.log('👨‍🎓 Создание студентов...')

  const allStudents = []
  let studentCounter = 1

  for (const group of groups) {
    console.log(`\n📋 Группа ${group.name}:`)
    
    for (let i = 0; i < CONFIG.studentsPerGroup; i++) {
      const isMale = Math.random() > 0.5
      const { fullName } = generateFullName(isMale)
      const email = generateEmail(fullName, studentCounter)

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: fullName,
          role: 'STUDENT',
        },
      })

      const enrollmentDate = new Date(group.year, 8, 1) // 1 сентября года поступления
      
      const student = await prisma.student.create({
        data: {
          userId: user.id,
          groupId: group.id,
          studentNumber: `${group.name}-${String(i + 1).padStart(2, '0')}`,
          enrollmentDate,
        },
      })

      allStudents.push(student)
      studentCounter++

      if ((i + 1) % 5 === 0) {
        process.stdout.write(`✅ ${i + 1}/${CONFIG.studentsPerGroup} `)
      }
    }
    
    console.log(`\n✅ Группа ${group.name}: ${CONFIG.studentsPerGroup} студентов`)
  }

  console.log(`\n✅ ВСЕГО создано студентов: ${allStudents.length}\n`)

  // ====================================
  // 8. СОЗДАНИЕ РОДИТЕЛЕЙ
  // ====================================
  console.log('👨‍👩‍👧 Создание родителей...')

  const parents = []
  let parentCounter = 1

  // Создадим родителя для каждого 3-го студента
  for (let i = 0; i < allStudents.length; i += 3) {
    const student = allStudents[i]
    const studentUser = await prisma.user.findUnique({ where: { id: student.userId } })
    
    if (studentUser) {
      const { fullName } = generateFullName(true)
      const email = `parent${parentCounter}@lptt.ru`

      const parentUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: fullName,
          role: 'PARENT',
        },
      })

      const parent = await prisma.parent.create({
        data: {
          userId: parentUser.id,
          childrenIds: [student.id],
        },
      })

      parents.push(parent)
      parentCounter++

      if (parentCounter % 10 === 0) {
        console.log(`✅ Создано родителей: ${parentCounter}`)
      }
    }
  }

  console.log(`\n✅ ВСЕГО создано родителей: ${parents.length}\n`)

  // ====================================
  // 9. СОЗДАНИЕ РАСПИСАНИЯ
  // ====================================
  console.log('📅 Создание расписания...')

  const days = [1, 2, 3, 4, 5, 6] // 1 = Понедельник, 6 = Суббота
  const lessonTimes = [
    { start: '09:00', end: '10:30' },
    { start: '10:45', end: '12:15' },
    { start: '12:30', end: '14:00' },
    { start: '14:15', end: '15:45' },
  ]

  let scheduleCount = 0

  for (const group of groups) {
    for (const day of days) {
      const lessonsPerDay = randomInt(2, 4)
      
      for (let i = 0; i < lessonsPerDay; i++) {
        const subject = randomItem(subjects)
        const teacher = await prisma.teacher.findUnique({ where: { id: subject.teacherId } })
        
        if (teacher) {
          await prisma.schedule.create({
            data: {
              groupId: group.id,
              subjectId: subject.id,
              teacherId: teacher.id,
              dayOfWeek: day,
              startTime: lessonTimes[i].start,
              endTime: lessonTimes[i].end,
              room: `${randomInt(100, 500)}`,
              type: randomItem(['LECTURE', 'PRACTICE', 'LAB']),
            },
          })
          
          scheduleCount++
        }
      }
    }
  }

  console.log(`✅ Создано записей расписания: ${scheduleCount}\n`)

  // ====================================
  // 10. СОЗДАНИЕ ОЦЕНОК
  // ====================================
  console.log('📝 Создание оценок...')

  const gradeTypes = ['EXAM', 'TEST', 'HOMEWORK', 'CLASSWORK', 'QUIZ', 'PROJECT']
  let gradeCount = 0

  for (const student of allStudents) {
    const gradesPerStudent = randomInt(15, 25)
    
    for (let i = 0; i < gradesPerStudent; i++) {
      const subject = randomItem(subjects)
      const teacher = await prisma.teacher.findUnique({ where: { id: subject.teacherId } })
      
      if (teacher) {
        const daysAgo = randomInt(1, 60)
        const date = new Date()
        date.setDate(date.getDate() - daysAgo)

        await prisma.grade.create({
          data: {
            studentId: student.id,
            subjectId: subject.id,
            teacherId: teacher.id,
            value: randomGrade(),
            type: randomItem(gradeTypes),
            date,
          },
        })
        
        gradeCount++
      }
    }
  }

  console.log(`✅ Создано оценок: ${gradeCount}\n`)

  // ====================================
  // 11. СОЗДАНИЕ ПОСЕЩАЕМОСТИ
  // ====================================
  console.log('✅ Создание записей посещаемости...')

  let attendanceCount = 0

  for (const student of allStudents) {
    const daysToCreate = randomInt(15, 30)
    
    for (let i = 0; i < daysToCreate; i++) {
      const daysAgo = randomInt(1, 45)
      const date = new Date()
      date.setDate(date.getDate() - daysAgo)

      const random = Math.random()
      let status: 'PRESENT' | 'ABSENT' | 'LATE' = 'PRESENT'
      
      if (random < 0.05) status = 'ABSENT'
      else if (random < 0.10) status = 'LATE'

      await prisma.attendance.create({
        data: {
          studentId: student.id,
          date,
          lessonNumber: randomInt(1, 4),
          status,
        },
      })
      
      attendanceCount++
    }
  }

  console.log(`✅ Создано записей посещаемости: ${attendanceCount}\n`)

  // ====================================
  // ИТОГИ
  // ====================================
  console.log('\n' + '='.repeat(60))
  console.log('🎉 БАЗА ДАННЫХ УСПЕШНО ЗАПОЛНЕНА!')
  console.log('='.repeat(60) + '\n')

  console.log('📊 СТАТИСТИКА:')
  console.log(`   Администрация:       3 (Директор, Завуч, Админ)`)
  console.log(`   Специальности:       3`)
  console.log(`   Группы:              ${groups.length}`)
  console.log(`   Преподаватели:       ${teachers.length}`)
  console.log(`   Предметы:            ${subjects.length}`)
  console.log(`   Студенты:            ${allStudents.length}`)
  console.log(`   Родители:            ${parents.length}`)
  console.log(`   Расписание:          ${scheduleCount} пар`)
  console.log(`   Оценки:              ${gradeCount}`)
  console.log(`   Посещаемость:        ${attendanceCount}`)

  console.log('\n🔑 ТЕСТОВЫЕ АККАУНТЫ (пароль: 123456):\n')
  console.log('   👔 АДМИНИСТРАЦИЯ:')
  console.log('      Директор:        director@lptt.ru')
  console.log('      Завуч:           zavuch@lptt.ru')
  console.log('      Админ:           admin@lptt.ru')
  
  console.log('\n   👨‍🏫 ПРЕПОДАВАТЕЛИ:')
  TEACHERS.forEach(t => console.log(`      ${t.name.split(' ')[0]}:${' '.repeat(20 - t.name.split(' ')[0].length)}${t.email}`))
  
  console.log('\n   👨‍🎓 СТУДЕНТЫ (примеры):')
  const sampleStudents = allStudents.slice(0, 3)
  for (const student of sampleStudents) {
    const user = await prisma.user.findUnique({ where: { id: student.userId } })
    const group = await prisma.group.findUnique({ where: { id: student.groupId } })
    if (user && group) {
      console.log(`      ${user.email} (${group.name})`)
    }
  }
  
  console.log('\n   👨‍👩‍👧 РОДИТЕЛИ (примеры):')
  const sampleParents = parents.slice(0, 3)
  for (const parent of sampleParents) {
    const user = await prisma.user.findUnique({ where: { id: parent.userId } })
    if (user) {
      console.log(`      ${user.email}`)
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('✅ ГОТОВО! Теперь можно запускать приложение!')
  console.log('='.repeat(60))
}

main()
  .catch((e) => {
    console.error('❌ ОШИБКА:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
