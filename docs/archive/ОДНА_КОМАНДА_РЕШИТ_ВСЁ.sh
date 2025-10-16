#!/bin/bash

echo "🚀 ПОЛНЫЙ СБРОС И ОБНОВЛЕНИЕ"
echo ""

cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

echo "1️⃣ Отмена локальных изменений..."
git reset --hard HEAD
git clean -fd

echo "2️⃣ Забираем последнюю версию..."
git fetch origin
git reset --hard origin/feature/electronic-diary-optimization

echo "3️⃣ Удаляем кэш..."
rm -rf node_modules/.vite

echo ""
echo "✅ ГОТОВО! Теперь запусти:"
echo "   npm start"
echo ""
echo "Затем в браузере: Cmd + Shift + R"
