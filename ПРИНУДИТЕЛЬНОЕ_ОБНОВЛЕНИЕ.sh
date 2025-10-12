#!/bin/bash

echo "💪 ПРИНУДИТЕЛЬНОЕ ОБНОВЛЕНИЕ ФАЙЛОВ!"
echo ""

cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

echo "1️⃣ Удаляю старые файлы..."
rm -f src/components/dashboard/GradesView.tsx
rm -f src/components/dashboard/AttendanceView.tsx
rm -f src/components/student/StudentChat.tsx
rm -f src/components/student/ProgressTracker.tsx
rm -f src/components/student/NotesExchange.tsx

echo "2️⃣ Скачиваю новые версии с GitHub..."
git checkout origin/feature/electronic-diary-optimization -- src/components/dashboard/GradesView.tsx
git checkout origin/feature/electronic-diary-optimization -- src/components/dashboard/AttendanceView.tsx
git checkout origin/feature/electronic-diary-optimization -- src/components/student/StudentChat.tsx
git checkout origin/feature-electronic-diary-optimization -- src/components/student/ProgressTracker.tsx
git checkout origin/feature-electronic-diary-optimization -- src/components/student/NotesExchange.tsx

echo "3️⃣ Проверяю..."
echo "GradesView: $(wc -l < src/components/dashboard/GradesView.tsx) строк (должно быть ~90)"
echo "ScheduleView: $(wc -l < src/components/dashboard/ScheduleView.tsx) строк (должно быть ~108)"

echo ""
echo "✅ ГОТОВО! Файлы обновлены!"
echo ""
echo "Теперь:"
echo "  npm start"
echo ""
echo "Cmd+Shift+R в браузере"
