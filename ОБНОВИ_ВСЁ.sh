#!/bin/bash

echo "🚀 АВТОМАТИЧЕСКОЕ ОБНОВЛЕНИЕ"
echo ""

cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

echo "1️⃣ Останавливаю процессы..."
lsof -ti:5173 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null
sleep 2

echo "2️⃣ Забираю обновления..."
git fetch origin
git reset --hard origin/feature/electronic-diary-optimization

echo "3️⃣ Удаляю кэш..."
rm -rf node_modules/.vite
rm -rf dist

echo "4️⃣ Проверяю файлы..."
echo "GradesView строк: $(wc -l < src/components/dashboard/GradesView.tsx)"
echo "ScheduleView строк: $(wc -l < src/components/dashboard/ScheduleView.tsx)"

echo ""
echo "✅ ГОТОВО!"
echo ""
echo "Теперь запусти:"
echo "  npm start"
echo ""
echo "Затем в браузере:"
echo "  Cmd + Shift + R"
