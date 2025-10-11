import bcrypt from 'bcryptjs';
import prisma from '../config/database';

async function seed() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.grade.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.applicant.deleteMany();
  await prisma.group.deleteMany();
  await prisma.specialty.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleared existing data');

  // Hash password
  const hashedPassword = await bcrypt.hash('123456', 10);

  // Create users
  const studentUser = await prisma.user.create({
    data: {
      email: 'student@lptt.ru',
      password: hashedPassword,
      name: 'Иван Иванов',
      role: 'STUDENT',
    },
  });

  const teacherUser = await prisma.user.create({
    data: {
      email: 'teacher@lptt.ru',
      password: hashedPassword,
      name: 'Петров Владимир Викторович',
      role: 'TEACHER',
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@lptt.ru',
      password: hashedPassword,
      name: 'Администратор',
      role: 'ADMIN',
    },
  });

  console.log('✅ Created users');

  // Create specialty
  const specialty = await prisma.specialty.create({
    data: {
      name: 'Информационные системы',
      code: '09.02.07',
      description: 'Информационные системы и программирование',
      duration: '3 года',
      form: 'full-time',
    },
  });

  console.log('✅ Created specialty');

  // Create group
  const group = await prisma.group.create({
    data: {
      name: 'ИС-21',
      specialtyId: specialty.id,
      year: 2,
      studentsCount: 25,
    },
  });

  console.log('✅ Created group');

  // Create subjects
  const subjects = await prisma.subject.createMany({
    data: [
      { name: 'Математика', description: 'Высшая математика' },
      { name: 'Программирование', description: 'Основы программирования' },
      { name: 'Базы данных', description: 'Базы данных и SQL' },
      { name: 'Английский язык', description: 'Английский язык' },
    ],
  });

  const subjectsList = await prisma.subject.findMany();
  console.log('✅ Created subjects');

  // Create teacher
  const teacher = await prisma.teacher.create({
    data: {
      userId: teacherUser.id,
      subject: 'Программирование',
      education: 'МГУ, Прикладная математика',
      experience: 10,
    },
  });

  console.log('✅ Created teacher');

  // Create student
  const student = await prisma.student.create({
    data: {
      userId: studentUser.id,
      groupId: group.id,
      enrollmentDate: new Date('2023-09-01'),
      studentId: 'IS-21-001',
    },
  });

  console.log('✅ Created student');

  // Create schedule
  const scheduleData = [
    {
      groupId: group.id,
      subjectId: subjectsList[0].id,
      teacherId: teacher.id,
      dayOfWeek: 1, // Monday
      startTime: '09:00',
      endTime: '10:30',
      room: '205',
      type: 'lecture' as const,
    },
    {
      groupId: group.id,
      subjectId: subjectsList[1].id,
      teacherId: teacher.id,
      dayOfWeek: 1,
      startTime: '10:45',
      endTime: '12:15',
      room: '301',
      type: 'practice' as const,
    },
    {
      groupId: group.id,
      subjectId: subjectsList[2].id,
      teacherId: teacher.id,
      dayOfWeek: 1,
      startTime: '12:30',
      endTime: '14:00',
      room: 'Спортзал',
      type: 'practice' as const,
    },
  ];

  await prisma.schedule.createMany({ data: scheduleData });
  console.log('✅ Created schedule');

  // Create grades
  const gradesData = [
    {
      studentId: student.id,
      subjectId: subjectsList[0].id,
      teacherId: teacher.id,
      value: 5,
      type: 'exam' as const,
      date: new Date(),
    },
    {
      studentId: student.id,
      subjectId: subjectsList[0].id,
      teacherId: teacher.id,
      value: 4,
      type: 'test' as const,
      date: new Date(Date.now() - 86400000),
    },
    {
      studentId: student.id,
      subjectId: subjectsList[1].id,
      teacherId: teacher.id,
      value: 5,
      type: 'homework' as const,
      date: new Date(),
      comment: 'Отличная работа!',
    },
    {
      studentId: student.id,
      subjectId: subjectsList[1].id,
      teacherId: teacher.id,
      value: 5,
      type: 'exam' as const,
      date: new Date(Date.now() - 86400000),
    },
    {
      studentId: student.id,
      subjectId: subjectsList[2].id,
      teacherId: teacher.id,
      value: 4,
      type: 'test' as const,
      date: new Date(Date.now() - 172800000),
    },
  ];

  await prisma.grade.createMany({ data: gradesData });
  console.log('✅ Created grades');

  // Create attendance records
  const scheduleRecords = await prisma.schedule.findMany();
  
  for (const scheduleItem of scheduleRecords) {
    await prisma.attendance.create({
      data: {
        studentId: student.id,
        scheduleId: scheduleItem.id,
        date: new Date(),
        status: 'PRESENT',
      },
    });
  }

  console.log('✅ Created attendance records');

  console.log('🎉 Database seeded successfully!');
  console.log('\n📝 Test credentials:');
  console.log('Student: student@lptt.ru / 123456');
  console.log('Teacher: teacher@lptt.ru / 123456');
  console.log('Admin: admin@lptt.ru / 123456');
}

seed()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
