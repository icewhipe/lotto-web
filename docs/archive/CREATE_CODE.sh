#!/bin/bash

# Простой скрипт для создания тестового кода через curl

echo "🔑 Создаём тестовый код приглашения..."
echo ""

# 1. Логинимся как админ
echo "📝 Шаг 1: Вход как админ..."
TOKEN=$(curl -s -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@lptt.ru","password":"123456"}' \
  | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ Не удалось войти как админ!"
  echo "Проверь что backend запущен и админ существует (npm run seed)"
  exit 1
fi

echo "✅ Админ токен получен"
echo ""

# 2. Получаем ID группы
echo "📝 Шаг 2: Получаем ID группы..."
echo "Открой Prisma Studio для получения groupId:"
echo "  cd backend && npx prisma studio"
echo "  Скопируй ID группы ИС-21"
echo ""
read -p "Введи groupId: " GROUP_ID

if [ -z "$GROUP_ID" ]; then
  echo "❌ groupId обязателен!"
  exit 1
fi

# 3. Генерируем коды
echo "📝 Шаг 3: Генерируем коды..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/registration/invite-codes/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"groupId\":\"$GROUP_ID\",\"count\":5,\"expiresInDays\":30}")

echo "✅ Ответ от сервера:"
echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
echo ""
echo "🎉 Готово! Используй коды для регистрации!"
