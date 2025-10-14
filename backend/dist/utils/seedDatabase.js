"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../config/database"));
async function seed() {
    console.log('🌱 Seeding database...');
    // Clear existing data
    await database_1.default.grade.deleteMany();
    await database_1.default.attendance.deleteMany();
    await database_1.default.schedule.deleteMany();
    await database_1.default.subject.deleteMany();
    await database_1.default.student.deleteMany();
    await database_1.default.teacher.deleteMany();
    await database_1.default.parent.deleteMany();
    await database_1.default.applicant.deleteMany();
    await database_1.default.group.deleteMany();
    await database_1.default.specialty.deleteMany();
    await database_1.default.user.deleteMany();
    console.log('✅ Cleared existing data');
    // Hash password
    const hashedPassword = await bcryptjs_1.default.hash('123456', 10);
    // Create users
    const studentUser = await database_1.default.user.create({
        data: {
            email: 'student@lptt.ru',
            password: hashedPassword,
            name: 'Иван Иванов',
            role: 'STUDENT',
        },
    });
    const teacherUser = await database_1.default.user.create({
        data: {
            email: 'teacher@lptt.ru',
            password: hashedPassword,
            name: 'Петров Владимир Викторович',
            role: 'TEACHER',
        },
    });
    const adminUser = await database_1.default.user.create({
        data: {
            email: 'admin@lptt.ru',
            password: hashedPassword,
            name: 'Администратор',
            role: 'ADMIN',
        },
    });
    console.log('✅ Created users');
    // Create specialty
    const specialty = await database_1.default.specialty.create({
        data: {
            name: 'Информационные системы',
            code: '09.02.07',
            description: 'Информационные системы и программирование',
            duration: '3 года',
        },
    });
    console.log('✅ Created specialty');
    // Create group
    const group = await database_1.default.group.create({
        data: {
            name: 'ИС-21',
            specialtyId: specialty.id,
            year: 2,
        },
    });
    console.log('✅ Created group');
    // Create teacher profile
    const teacher = await database_1.default.teacher.create({
        data: {
            userId: teacherUser.id,
            position: 'Преподаватель информатики',
            department: 'Информационные технологии',
        },
    });
    console.log('✅ Created teacher');
    // Create subjects (требуют specialtyId и teacherId)
    const mathSubject = await database_1.default.subject.create({
        data: {
            name: 'Математика',
            code: 'MATH-101',
            specialtyId: specialty.id,
            teacherId: teacher.id,
        },
    });
    const progSubject = await database_1.default.subject.create({
        data: {
            name: 'Программирование',
            code: 'PROG-101',
            specialtyId: specialty.id,
            teacherId: teacher.id,
        },
    });
    const dbSubject = await database_1.default.subject.create({
        data: {
            name: 'Базы данных',
            code: 'DB-101',
            specialtyId: specialty.id,
            teacherId: teacher.id,
        },
    });
    const engSubject = await database_1.default.subject.create({
        data: {
            name: 'Английский язык',
            code: 'ENG-101',
            specialtyId: specialty.id,
            teacherId: teacher.id,
        },
    });
    console.log('✅ Created subjects');
    // Create student profile
    const student = await database_1.default.student.create({
        data: {
            userId: studentUser.id,
            groupId: group.id,
            studentNumber: 'IS-21-001',
            enrollmentDate: new Date('2023-09-01'),
        },
    });
    console.log('✅ Created student');
    // Create schedule
    const schedule1 = await database_1.default.schedule.create({
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
    const schedule2 = await database_1.default.schedule.create({
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
    const schedule3 = await database_1.default.schedule.create({
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
    await database_1.default.grade.create({
        data: {
            studentId: student.id,
            subjectId: mathSubject.id,
            teacherId: teacher.id,
            value: 5,
            type: 'EXAM',
            date: new Date(),
        },
    });
    await database_1.default.grade.create({
        data: {
            studentId: student.id,
            subjectId: mathSubject.id,
            teacherId: teacher.id,
            value: 4,
            type: 'TEST',
            date: new Date(Date.now() - 86400000),
        },
    });
    await database_1.default.grade.create({
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
    await database_1.default.grade.create({
        data: {
            studentId: student.id,
            subjectId: progSubject.id,
            teacherId: teacher.id,
            value: 5,
            type: 'EXAM',
            date: new Date(Date.now() - 86400000),
        },
    });
    await database_1.default.grade.create({
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
    await database_1.default.attendance.create({
        data: {
            studentId: student.id,
            date: new Date(),
            status: 'PRESENT',
        },
    });
    await database_1.default.attendance.create({
        data: {
            studentId: student.id,
            date: new Date(Date.now() - 86400000),
            status: 'PRESENT',
        },
    });
    await database_1.default.attendance.create({
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
    await database_1.default.$disconnect();
});
//# sourceMappingURL=seedDatabase.js.map