#!/bin/bash

echo "💀 УБИВАЮ ВСЁ И ПЕРЕЗАПУСКАЮ!"
echo ""

cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

echo "1️⃣ Убиваю все процессы..."
lsof -ti:5173 | xargs kill -9 2>/dev/null
lsof -ti:3000 | xargs kill -9 2>/dev/null
pkill -f "vite" 2>/dev/null
pkill -f "tsx" 2>/dev/null

sleep 2

echo "2️⃣ Удаляю кэши..."
rm -rf node_modules/.vite
rm -rf .vite
rm -rf dist

echo "3️⃣ Проверяю файлы..."
wc -l src/components/InDevelopment.tsx
wc -l src/components/dashboard/GradesView.tsx

echo ""
echo "✅ ГОТОВО! Теперь запусти:"
echo "   npm start"
echo ""
echo "Подожди пока запустится ПОЛНОСТЬЮ!"
echo "Затем в браузере: Cmd+Shift+R"
