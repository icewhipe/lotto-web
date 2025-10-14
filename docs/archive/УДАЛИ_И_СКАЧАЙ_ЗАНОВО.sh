#!/bin/bash

echo "💣 УДАЛЯЮ СТАРЫЕ ФАЙЛЫ И СКАЧИВАЮ ЗАНОВО!"
echo ""

cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

echo "1️⃣ Удаляю старые компоненты..."
rm -rf src/components/dashboard/
rm -rf src/components/student/
rm -f src/components/InDevelopment.tsx
rm -f src/components/InDevelopmentOverlay.tsx

echo "2️⃣ Скачиваю новые версии с GitHub..."
git checkout origin/feature/electronic-diary-optimization -- src/components/dashboard/
git checkout origin/feature/electronic-diary-optimization -- src/components/student/
git checkout origin/feature/electronic-diary-optimization -- src/components/InDevelopment.tsx
git checkout origin/feature/electronic-diary-optimization -- src/components/InDevelopmentOverlay.tsx

echo "3️⃣ Проверяю количество строк..."
wc -l src/components/dashboard/GradesView.tsx
echo "Должно быть: 96"
echo ""

echo "4️⃣ Удаляю кэш..."
rm -rf node_modules/.vite

echo ""
echo "✅ ГОТОВО!"
echo ""
echo "Теперь запусти:"
echo "  npm start"
echo ""
echo "Затем Cmd+Shift+R в браузере"
