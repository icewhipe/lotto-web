import bcrypt from 'bcryptjs';
import prisma from '../config/database';

async function seed() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.grade.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.parent.deleteMany();
  await prisma.applicant.deleteMany();
  await prisma.group.deleteMany();
  await prisma.specialty.deleteMany();
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
    },
  });

  console.log('✅ Created specialty');

  // Create group
  const group = await prisma.group.create({
    data: {
      name: 'ИС-21',
      specialtyId: specialty.id,
      year: 2,
    },
  });

  console.log('✅ Created group');

  // Create teacher profile
  const teacher = await prisma.teacher.create({
    data: {
      userId: teacherUser.id,
      position: 'Преподаватель информатики',
      department: 'Информационные технологии',
    },
  });

  console.log('✅ Created teacher');

  // Create subjects (требуют specialtyId и teacherId)
  const mathSubject = await prisma.subject.create({
    data: {
      name: 'Математика',
      code: 'MATH-101',
      specialtyId: specialty.id,
      teacherId: teacher.id,
    },
  });

  const progSubject = await prisma.subject.create({
    data: {
      name: 'Программирование',
      code: 'PROG-101',
      specialtyId: specialty.id,
      teacherId: teacher.id,
    },
  });

  const dbSubject = await prisma.subject.create({
    data: {
      name: 'Базы данных',
      code: 'DB-101',
      specialtyId: specialty.id,
      teacherId: teacher.id,
    },
  });

  const engSubject = await prisma.subject.create({
    data: {
      name: 'Английский язык',
      code: 'ENG-101',
      specialtyId: specialty.id,
      teacherId: teacher.id,
    },
  });

  console.log('✅ Created subjects');

  // Create student profile
  const student = await prisma.student.create({
    data: {
      userId: studentUser.id,
      groupId: group.id,
      studentNumber: 'IS-21-001',
      enrollmentDate: new Date('2023-09-01'),
    },
  });

  console.log('✅ Created student');

  // Create schedule
  const schedule1 = await prisma.schedule.create({
    data: {
      groupId: group.id,
      subjectId: mathSubject.id,
      teacherId: teacher.id,
      dayOfWeek: 1, // Monday
      startTime: '09:00',
      endTime: '10:30',
      room: '205',
      type: 'LECTURE',
    },
  });

  const schedule2 = await prisma.schedule.create({
    data: {
      groupId: group.id,
      subjectId: progSubject.id,
      teacherId: teacher.id,
      dayOfWeek: 1,
      startTime: '10:45',
      endTime: '12:15',
      room: '301',
      type: 'PRACTICE',
    },
  });

  const schedule3 = await prisma.schedule.create({
    data: {
      groupId: group.id,
      subjectId: dbSubject.id,
      teacherId: teacher.id,
      dayOfWeek: 1,
      startTime: '12:30',
      endTime: '14:00',
      room: '302',
      type: 'PRACTICE',
    },
  });

  console.log('✅ Created schedule');

  // Create grades
  await prisma.grade.create({
    data: {
      studentId: student.id,
      subjectId: mathSubject.id,
      teacherId: teacher.id,
      value: 5,
      type: 'EXAM',
      date: new Date(),
    },
  });

  await prisma.grade.create({
    data: {
      studentId: student.id,
      subjectId: mathSubject.id,
      teacherId: teacher.id,
      value: 4,
      type: 'TEST',
      date: new Date(Date.now() - 86400000),
    },
  });

  await prisma.grade.create({
    data: {
      studentId: student.id,
      subjectId: progSubject.id,
      teacherId: teacher.id,
      value: 5,
      type: 'HOMEWORK',
      date: new Date(),
      comment: 'Отличная работа!',
    },
  });

  await prisma.grade.create({
    data: {
      studentId: student.id,
      subjectId: progSubject.id,
      teacherId: teacher.id,
      value: 5,
      type: 'EXAM',
      date: new Date(Date.now() - 86400000),
    },
  });

  await prisma.grade.create({
    data: {
      studentId: student.id,
      subjectId: dbSubject.id,
      teacherId: teacher.id,
      value: 4,
      type: 'TEST',
      date: new Date(Date.now() - 172800000),
    },
  });

  console.log('✅ Created grades');

  // Create attendance records
  await prisma.attendance.create({
    data: {
      studentId: student.id,
      date: new Date(),
      status: 'PRESENT',
    },
  });

  await prisma.attendance.create({
    data: {
      studentId: student.id,
      date: new Date(Date.now() - 86400000),
      status: 'PRESENT',
    },
  });

  await prisma.attendance.create({
    data: {
      studentId: student.id,
      date: new Date(Date.now() - 172800000),
      status: 'PRESENT',
    },
  });

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
