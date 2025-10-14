#!/bin/bash

echo "🔍 ПОЛНАЯ ДИАГНОСТИКА"
echo ""

cd /Users/vasiliidyahenko/Documents/GitHub/lotto-web

echo "1️⃣ Текущий коммит:"
git log --oneline -1
echo ""

echo "2️⃣ Количество строк в файлах:"
echo "GradesView: $(wc -l < src/components/dashboard/GradesView.tsx) строк"
echo "ScheduleView: $(wc -l < src/components/dashboard/ScheduleView.tsx) строк"
echo "AttendanceView: $(wc -l < src/components/dashboard/AttendanceView.tsx) строк"
echo ""

echo "3️⃣ Первые 3 строки GradesView:"
head -3 src/components/dashboard/GradesView.tsx
echo ""

echo "4️⃣ Есть ли mock данные в GradesView?"
grep -c "mockGrades" src/components/dashboard/GradesView.tsx || echo "НЕТ mockGrades!"
echo ""

echo "5️⃣ Что импортирует GradesView?"
head -2 src/components/dashboard/GradesView.tsx
echo ""

echo "6️⃣ Сравнение с GitHub:"
git diff origin/feature/electronic-diary-optimization src/components/dashboard/GradesView.tsx | head -20
echo ""

echo "✅ ОТПРАВЬ МНЕ ВЕСЬ ЭТОТ ВЫВОД!"
