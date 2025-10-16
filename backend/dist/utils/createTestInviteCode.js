"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../config/database"));
async function createTestInviteCode() {
    console.log('🔑 Creating test invite code...');
    // Находим первую группу и первого админа
    const group = await database_1.default.group.findFirst();
    const admin = await database_1.default.user.findFirst({
        where: { role: 'ADMIN' }
    });
    if (!group) {
        console.error('❌ No groups found! Run seed first.');
        return;
    }
    if (!admin) {
        console.error('❌ No admin found! Run seed first.');
        return;
    }
    // Создаём тестовый код
    const code = await database_1.default.inviteCode.create({
        data: {
            code: `TEST-${group.name}-2024-001`,
            groupId: group.id,
            createdBy: admin.id,
            expiresAt: new Date('2025-12-31'),
            isActive: true,
            maxUses: 1,
            currentUses: 0,
        },
        include: {
            group: {
                include: {
                    specialty: true,
                },
            },
        },
    });
    console.log('✅ Test invite code created!');
    console.log('\n📋 Code details:');
    console.log(`Code: ${code.code}`);
    console.log(`Group: ${code.group.name}`);
    console.log(`Specialty: ${code.group.specialty.name}`);
    console.log(`Expires: ${code.expiresAt}`);
    console.log('\n💡 Use this code on registration page!');
}
createTestInviteCode()
    .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
})
    .finally(async () => {
    await database_1.default.$disconnect();
});
//# sourceMappingURL=createTestInviteCode.js.map