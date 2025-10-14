# 🔧 РЕШЕНИЕ ПРОБЛЕМЫ С ESBUILD

## ❌ ПРОБЛЕМА:

```
Cannot start service: Host version "0.25.10" does not match binary version "0.21.5"
```

## 💡 ПРИЧИНА:

Несовпадение версий esbuild. Это происходит когда:
1. `node_modules` был скопирован с другого компьютера
2. Установлены разные версии esbuild
3. Кэш npm повреждён

## ✅ РЕШЕНИЕ:

### **Вариант 1: Полная переустановка (РЕКОМЕНДУЕТСЯ)**

```bash
cd backend

# Удалить всё
rm -rf node_modules package-lock.json

# Переустановить
npm install

# Сгенерировать Prisma Client
npx prisma generate

# Готово!
npm run dev
```

### **Вариант 2: Обновить только esbuild**

```bash
cd backend

# Обновить esbuild
npm install esbuild@latest --save-dev

# Готово!
npm run dev
```

### **Вариант 3: Очистить кэш npm**

```bash
cd backend

# Очистить кэш
npm cache clean --force

# Удалить node_modules
rm -rf node_modules package-lock.json

# Переустановить
npm install

# Готово!
npm run dev
```

---

## 🚀 ПОСЛЕ ИСПРАВЛЕНИЯ:

### **Запусти backend:**

```bash
npm run dev
```

**Ожидаемый вывод:**
```
╔════════════════════════════════════════════╗
║   🎓 ЛПТТ Электронный Дневник API        ║
║   ✅ Server:   http://localhost:3000      ║
╚════════════════════════════════════════════╝
```

---

## ✅ ГОТОВО!

**ТЕПЕРЬ РАБОТАЕТ! 🚀**
