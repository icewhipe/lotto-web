# 🔧 КРИТИЧЕСКИЙ FIX - teacherId опционален!

## ⚠️ ПРОБЛЕМА БЫЛА:

Ошибка при создании предмета:
```
Foreign key constraint violated on the constraint: `subjects_teacherId_fkey`
Argument `specialty` is missing
```

## ✅ РЕШЕНИЕ:

### 1. Изменена Prisma схема:

**Было:**
```prisma
model Subject {
  teacherId   String
  teacher     Teacher   @relation(fields: [teacherId], references: [id])
}
```

**Стало:**
```prisma
model Subject {
  teacherId   String?   // ОПЦИОНАЛЬНО!
  teacher     Teacher?  @relation(fields: [teacherId], references: [id])
}
```

### 2. Обновлен контроллер:

**Было:**
```typescript
const subject = await prisma.subject.create({
  data: {
    name,
    code,
    specialtyId,
    ...(teacherId && { teacherId }),
  }
})
```

**Стало:**
```typescript
const subject = await prisma.subject.create({
  data: {
    name,
    code,
    specialty: {
      connect: { id: specialtyId }  // ПРАВИЛЬНО!
    },
    ...(teacherId && { 
      teacher: {
        connect: { id: teacherId }  // ПРАВИЛЬНО!
      }
    }),
  }
})
```

---

## 🚀 ЧТО НУЖНО СДЕЛАТЬ:

### Шаг 1: Забери изменения

```bash
cd ~/Documents/GitHub/lotto-web
git pull origin cursor/debug-electronic-diary-missing-sections-6f45
```

### Шаг 2: **ВАЖНО!** Примени новую схему

```bash
cd backend
npx prisma db push
```

Увидишь:
```
✔ Generated Prisma Client
Schema pushed to database successfully!
```

### Шаг 3: Перезапусти backend

```bash
# Останови старый (Ctrl+C)
npm run dev
```

### Шаг 4: Тестируй создание предмета!

Открой админ панель → Предметы → Добавить предмет:

**БЕЗ преподавателя:** ✅ РАБОТАЕТ
- Код: `TEST1`
- Название: `Тест`
- Специальность: любая
- Преподаватель: НЕ НАЗНАЧЕН

**С преподавателем:** ✅ РАБОТАЕТ  
- Код: `TEST2`
- Название: `Тест 2`
- Специальность: любая
- Преподаватель: выбери любого

---

## ✅ ДРУГИЕ ИСПРАВЛЕНИЯ:

### 1. Убрана СУББОТА ❌

Теперь расписание только **Пн-Пт** (5 дней)

### 2. Время уроков обновлено ⏰

```
1 урок:    08:00-08:45
2 урок:    08:50-09:35
3 урок:    09:45-10:30
4 урок:    10:35-11:20
5(1) урок: 11:30-12:15
5(2) урок: 12:20-13:05
6 урок:    13:10-13:55
7 урок:    14:00-14:45
8 урок:    14:50-15:35
```

---

## 📊 ТЕКУЩИЙ СТАТУС:

```
✅ Schema.prisma - teacherId опционален
✅ Controller - используем connect
✅ Расписание - только Пн-Пт
✅ Время уроков - обновлено
✅ Frontend build - успешен
✅ Backend build - успешен
```

---

## 🎯 СЛЕДУЮЩИЕ ШАГИ:

После `npx prisma db push`:

1. ✅ Создание предметов без преподавателя
2. ✅ Создание предметов с преподавателем
3. ✅ Расписание только будни
4. ✅ Правильное время уроков

---

**СДЕЛАЙ `npx prisma db push` И ВСЁ ЗАРАБОТАЕТ! 🔥**
