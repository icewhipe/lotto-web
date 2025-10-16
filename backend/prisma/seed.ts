import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Начинаем заполнение базы данных...\n')

  // Очистка данных (если нужно)
  await prisma.grade.deleteMany()
  await prisma.attendance.deleteMany()
  await prisma.schedule.deleteMany()
  await prisma.subject.deleteMany()
  await prisma.student.deleteMany()
  await prisma.teacher.deleteMany()
  await prisma.parent.deleteMany()
  await prisma.group.deleteMany()
  await prisma.specialty.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ Старые данные очищены\n')

  // 1. СОЗДАНИЕ СПЕЦИАЛЬНОСТЕЙ
  console.log('📚 Создаём специальности...')
  const specialty1 = await prisma.specialty.create({
    data: {
      name: 'Информационные системы и программирование',
      code: '09.02.07',
      duration: '3 года 10 месяцев',
      description: 'Разработка программного обеспечения и информационных систем',
    },
  })

  const specialty2 = await prisma.specialty.create({
    data: {
      name: 'Техническое обслуживание и ремонт автомобильного транспорта',
      code: '23.02.03',
      duration: '3 года 10 месяцев',
      description: 'Обслуживание и ремонт автомобилей',
    },
  })

  console.log(`✅ Создано специальностей: 2\n`)

  // 2. СОЗДАНИЕ ГРУПП
  console.log('👥 Создаём группы...')
  const group1 = await prisma.group.create({
    data: {
      name: 'ИС-21',
      year: 2021,
      specialtyId: specialty1.id,
    },
  })

  const group2 = await prisma.group.create({
    data: {
      name: 'ИС-22',
      year: 2022,
      specialtyId: specialty1.id,
    },
  })

  const group3 = await prisma.group.create({
    data: {
      name: 'АТ-21',
      year: 2021,
      specialtyId: specialty2.id,
    },
  })

  console.log(`✅ Создано групп: 3\n`)

  // 3. СОЗДАНИЕ ПОЛЬЗОВАТЕЛЕЙ И ПРЕПОДАВАТЕЛЕЙ
  console.log('👨‍🏫 Создаём преподавателей...')
  
  const hashedPassword = await bcrypt.hash('123456', 10)

  const teacher1User = await prisma.user.create({
    data: {
      email: 'ivanova@lptt.ru',
      password: hashedPassword,
      name: 'Иванова Мария Петровна',
      role: 'TEACHER',
    },
  })

  const teacher1 = await prisma.teacher.create({
    data: {
      userId: teacher1User.id,
      position: 'Преподаватель математики',
      department: 'Математика и информатика',
    },
  })

  const teacher2User = await prisma.user.create({
    data: {
      email: 'petrov@lptt.ru',
      password: hashedPassword,
      name: 'Петров Алексей Сергеевич',
      role: 'TEACHER',
    },
  })

  const teacher2 = await prisma.teacher.create({
    data: {
      userId: teacher2User.id,
      position: 'Преподаватель информатики',
      department: 'Математика и информатика',
    },
  })

  const teacher3User = await prisma.user.create({
    data: {
      email: 'smirnova@lptt.ru',
      password: hashedPassword,
      name: 'Смирнова Елена Викторовна',
      role: 'TEACHER',
    },
  })

  const teacher3 = await prisma.teacher.create({
    data: {
      userId: teacher3User.id,
      position: 'Преподаватель истории',
      department: 'Гуманитарные науки',
    },
  })

  console.log(`✅ Создано преподавателей: 3\n`)

  // 4. СОЗДАНИЕ ПРЕДМЕТОВ
  console.log('📖 Создаём предметы...')
  
  const subject1 = await prisma.subject.create({
    data: {
      name: 'Математика',
      code: 'MATH-101',
      specialtyId: specialty1.id,
      teacherId: teacher1.id,
    },
  })

  const subject2 = await prisma.subject.create({
    data: {
      name: 'Информатика',
      code: 'INFO-101',
      specialtyId: specialty1.id,
      teacherId: teacher2.id,
    },
  })

  const subject3 = await prisma.subject.create({
    data: {
      name: 'История',
      code: 'HIST-101',
      specialtyId: specialty1.id,
      teacherId: teacher3.id,
    },
  })

  const subject4 = await prisma.subject.create({
    data: {
      name: 'Физика',
      code: 'PHYS-101',
      specialtyId: specialty1.id,
      teacherId: teacher1.id,
    },
  })

  const subject5 = await prisma.subject.create({
    data: {
      name: 'Английский язык',
      code: 'ENG-101',
      specialtyId: specialty1.id,
      teacherId: teacher3.id,
    },
  })

  console.log(`✅ Создано предметов: 5\n`)

  // 5. СОЗДАНИЕ СТУДЕНТОВ
  console.log('👨‍🎓 Создаём студентов...')

  const students = []
  const studentNames = [
    'Иванов Иван Иванович',
    'Петрова Анна Сергеевна',
    'Сидоров Дмитрий Александрович',
    'Козлова Мария Ивановна',
    'Новиков Алексей Петрович',
  ]

  for (let i = 0; i < 5; i++) {
    const userEmail = `student${i + 1}@lptt.ru`
    
    const user = await prisma.user.create({
      data: {
        email: userEmail,
        password: hashedPassword,
        name: studentNames[i],
        role: 'STUDENT',
      },
    })

    const student = await prisma.student.create({
      data: {
        userId: user.id,
        groupId: group1.id,
        studentNumber: `IS21-${String(i + 1).padStart(3, '0')}`,
        enrollmentDate: new Date('2021-09-01'),
      },
    })

    students.push(student)
  }

  console.log(`✅ Создано студентов: ${students.length}\n`)

  // 6. СОЗДАНИЕ РОДИТЕЛЕЙ
  console.log('👪 Создаём родителей...')

  const parent1User = await prisma.user.create({
    data: {
      email: 'parent1@lptt.ru',
      password: hashedPassword,
      name: 'Иванов Пётр Васильевич',
      role: 'PARENT',
    },
  })

  await prisma.parent.create({
    data: {
      userId: parent1User.id,
      childrenIds: [students[0].id],
      phone: '+7 (999) 123-45-67',
    },
  })

  console.log(`✅ Создано родителей: 1\n`)

  // 7. СОЗДАНИЕ РАСПИСАНИЯ
  console.log('📅 Создаём расписание...')

  const scheduleData = [
    // Понедельник
    { groupId: group1.id, subjectId: subject1.id, teacherId: teacher1.id, dayOfWeek: 1, startTime: '09:00', endTime: '10:30', room: '205', type: 'LECTURE' },
    { groupId: group1.id, subjectId: subject2.id, teacherId: teacher2.id, dayOfWeek: 1, startTime: '10:45', endTime: '12:15', room: '301', type: 'PRACTICE' },
    { groupId: group1.id, subjectId: subject3.id, teacherId: teacher3.id, dayOfWeek: 1, startTime: '12:30', endTime: '14:00', room: '102', type: 'LECTURE' },
    
    // Вторник
    { groupId: group1.id, subjectId: subject4.id, teacherId: teacher1.id, dayOfWeek: 2, startTime: '09:00', endTime: '10:30', room: '305', type: 'LECTURE' },
    { groupId: group1.id, subjectId: subject2.id, teacherId: teacher2.id, dayOfWeek: 2, startTime: '10:45', endTime: '12:15', room: '301', type: 'LAB' },
    { groupId: group1.id, subjectId: subject5.id, teacherId: teacher3.id, dayOfWeek: 2, startTime: '12:30', endTime: '14:00', room: '204', type: 'PRACTICE' },
    
    // Среда
    { groupId: group1.id, subjectId: subject1.id, teacherId: teacher1.id, dayOfWeek: 3, startTime: '09:00', endTime: '10:30', room: '205', type: 'PRACTICE' },
    { groupId: group1.id, subjectId: subject2.id, teacherId: teacher2.id, dayOfWeek: 3, startTime: '10:45', endTime: '12:15', room: '301', type: 'LECTURE' },
    
    // Четверг
    { groupId: group1.id, subjectId: subject3.id, teacherId: teacher3.id, dayOfWeek: 4, startTime: '09:00', endTime: '10:30', room: '102', type: 'LECTURE' },
    { groupId: group1.id, subjectId: subject4.id, teacherId: teacher1.id, dayOfWeek: 4, startTime: '10:45', endTime: '12:15', room: '305', type: 'LAB' },
    { groupId: group1.id, subjectId: subject5.id, teacherId: teacher3.id, dayOfWeek: 4, startTime: '12:30', endTime: '14:00', room: '204', type: 'PRACTICE' },
    
    // Пятница
    { groupId: group1.id, subjectId: subject1.id, teacherId: teacher1.id, dayOfWeek: 5, startTime: '09:00', endTime: '10:30', room: '205', type: 'LECTURE' },
    { groupId: group1.id, subjectId: subject2.id, teacherId: teacher2.id, dayOfWeek: 5, startTime: '10:45', endTime: '12:15', room: '301', type: 'PRACTICE' },
  ]

  for (const data of scheduleData) {
    await prisma.schedule.create({ data })
  }

  console.log(`✅ Создано записей расписания: ${scheduleData.length}\n`)

  // 8. СОЗДАНИЕ ОЦЕНОК
  console.log('📊 Создаём оценки...')

  const gradeTypes: Array<'EXAM' | 'TEST' | 'HOMEWORK' | 'CLASSWORK' | 'QUIZ' | 'PROJECT'> = ['EXAM', 'TEST', 'HOMEWORK', 'CLASSWORK', 'QUIZ', 'PROJECT']
  let gradeCount = 0

  for (const student of students) {
    // По каждому предмету 5-10 оценок
    const subjects = [subject1, subject2, subject3, subject4, subject5]
    
    for (const subject of subjects) {
      const numGrades = Math.floor(Math.random() * 6) + 5 // 5-10 оценок
      
      for (let i = 0; i < numGrades; i++) {
        const daysAgo = Math.floor(Math.random() * 60) // За последние 60 дней
        const date = new Date()
        date.setDate(date.getDate() - daysAgo)
        
        await prisma.grade.create({
          data: {
            studentId: student.id,
            subjectId: subject.id,
            teacherId: subject.teacherId,
            value: Math.floor(Math.random() * 3) + 3, // 3-5
            type: gradeTypes[Math.floor(Math.random() * gradeTypes.length)],
            date: date,
            comment: i % 3 === 0 ? 'Хорошая работа' : undefined,
          },
        })
        gradeCount++
      }
    }
  }

  console.log(`✅ Создано оценок: ${gradeCount}\n`)

  // 9. СОЗДАНИЕ ПОСЕЩАЕМОСТИ
  console.log('✅ Создаём записи посещаемости...')

  const statuses: Array<'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'> = ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED']
  let attendanceCount = 0

  for (const student of students) {
    // За последние 30 дней
    for (let day = 0; day < 30; day++) {
      const date = new Date()
      date.setDate(date.getDate() - day)
      
      // Пропускаем выходные
      if (date.getDay() === 0 || date.getDay() === 6) continue
      
      // 90% вероятность присутствия
      let status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED' = 'PRESENT'
      const rand = Math.random()
      
      if (rand > 0.95) status = 'ABSENT'
      else if (rand > 0.90) status = 'LATE'
      
      await prisma.attendance.create({
        data: {
          studentId: student.id,
          date: date,
          status: status,
          reason: status === 'ABSENT' ? 'Болезнь' : undefined,
        },
      })
      attendanceCount++
    }
  }

  console.log(`✅ Создано записей посещаемости: ${attendanceCount}\n`)

  // 10. СОЗДАНИЕ АДМИНА И ДИРЕКТОРА
  console.log('👔 Создаём администраторов...')

  await prisma.user.create({
    data: {
      email: 'admin@lptt.ru',
      password: hashedPassword,
      name: 'Администратор Системы',
      role: 'ADMIN',
    },
  })

  console.log(`✅ Создан админ\n`)

  console.log('═══════════════════════════════════════')
  console.log('🎉 БАЗА ДАННЫХ УСПЕШНО ЗАПОЛНЕНА!')
  console.log('═══════════════════════════════════════\n')

  console.log('📊 СТАТИСТИКА:')
  console.log(`   Специальности:    2`)
  console.log(`   Группы:           3`)
  console.log(`   Преподаватели:    3`)
  console.log(`   Предметы:         5`)
  console.log(`   Студенты:         ${students.length}`)
  console.log(`   Родители:         1`)
  console.log(`   Расписание:       ${scheduleData.length} пар`)
  console.log(`   Оценки:           ${gradeCount}`)
  console.log(`   Посещаемость:     ${attendanceCount}`)
  console.log('')
  console.log('🔑 ТЕСТОВЫЕ АККАУНТЫ (пароль: 123456):')
  console.log('   Студент:    student1@lptt.ru')
  console.log('   Преподаватель: ivanova@lptt.ru')
  console.log('   Родитель:   parent1@lptt.ru')
  console.log('   Админ:      admin@lptt.ru')
  console.log('')
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
