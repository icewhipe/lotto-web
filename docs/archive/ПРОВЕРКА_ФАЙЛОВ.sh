#!/bin/bash

echo "🔍 ПРОВЕРКА ФАЙЛОВ"
echo ""

cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

echo "1️⃣ Проверка GradesView.tsx:"
head -5 src/components/dashboard/GradesView.tsx
echo ""

echo "2️⃣ Проверка InDevelopmentOverlay существует?"
ls -la src/components/InDevelopmentOverlay.tsx 2>&1
echo ""

echo "3️⃣ Проверка git статус:"
git status
echo ""

echo "4️⃣ Последний коммит:"
git log --oneline -1
echo ""

echo "5️⃣ Что в GradesView (строка 40):"
sed -n '40p' src/components/dashboard/GradesView.tsx
echo ""

echo "✅ ОТПРАВЬ МНЕ ЭТОТ ВЫВОД!"
