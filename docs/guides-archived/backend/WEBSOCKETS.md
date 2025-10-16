# 📡 WebSockets

Real-time коммуникация через Socket.IO.

---

## 🔌 Подключение

### Client-side (JavaScript)

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-jwt-token',
  },
});

socket.on('connect', () => {
  console.log('✅ Connected to server');
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from server');
});
```

---

## 🏠 Комнаты (Rooms)

### Присоединиться к комнате

```javascript
socket.emit('join-room', 'room-id');
```

### Покинуть комнату

```javascript
socket.emit('leave-room', 'room-id');
```

### Типы комнат

| Room ID | Описание |
|---------|----------|
| `admin` | Администраторы |
| `group-${groupId}` | Группа студентов |
| `user-${userId}` | Личная комната пользователя |

---

## 🔔 События

### 1. RFID Scan

**От турникета к серверу:**
```javascript
socket.emit('rfid-scan', {
  cardNumber: '1234567890',
  turnstileId: 'turnstile-uuid',
  direction: 'IN',
  timestamp: new Date(),
});
```

**От сервера к клиентам (room: admin):**
```javascript
socket.on('rfid-scan-update', (data) => {
  console.log('New RFID scan:', data);
  // {
  //   cardNumber: '1234567890',
  //   user: { name: 'Иван Иванов' },
  //   status: 'GRANTED',
  //   turnstile: { name: 'Главный вход' },
  //   timestamp: '2025-01-15T08:30:00Z'
  // }
});
```

---

### 2. Turnstile Status

**Обновление статуса турникета:**
```javascript
socket.emit('turnstile-status', {
  turnstileId: 'turnstile-uuid',
  isActive: true,
  message: 'System online',
});
```

**Получение обновлений:**
```javascript
socket.on('turnstile-status-update', (data) => {
  console.log('Turnstile status:', data);
});
```

---

### 3. Chat Messages

**Отправить сообщение:**
```javascript
socket.emit('chat-message', {
  roomId: 'group-uuid',
  message: {
    id: 'msg-uuid',
    content: 'Hello!',
    senderId: 'user-uuid',
    timestamp: new Date(),
  },
});
```

**Получить сообщение:**
```javascript
socket.on('chat-message-received', (message) => {
  console.log('New message:', message);
  // Добавить в UI
});
```

---

### 4. Typing Indicator

**Показать индикатор печати:**
```javascript
socket.emit('typing', {
  roomId: 'group-uuid',
  userId: 'user-uuid',
});
```

**Получить индикатор:**
```javascript
socket.on('user-typing', ({ userId }) => {
  console.log(`User ${userId} is typing...`);
});
```

---

### 5. Notifications

**Получить уведомление:**
```javascript
socket.on('notification', (notification) => {
  console.log('New notification:', notification);
  // {
  //   type: 'grade' | 'schedule' | 'announcement',
  //   title: 'Новая оценка',
  //   message: 'Вам выставлена оценка 5 по математике',
  //   timestamp: '2025-01-15T14:00:00Z'
  // }
});
```

---

## 🚀 Примеры использования

### React Component

```typescript
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const Dashboard = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [rfidScans, setRfidScans] = useState<any[]>([]);

  useEffect(() => {
    // Connect to WebSocket
    const newSocket = io('http://localhost:3000', {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    setSocket(newSocket);

    // Join admin room
    newSocket.emit('join-room', 'admin');

    // Listen for RFID scans
    newSocket.on('rfid-scan-update', (data) => {
      setRfidScans((prev) => [data, ...prev].slice(0, 50));
    });

    // Cleanup
    return () => {
      newSocket.emit('leave-room', 'admin');
      newSocket.close();
    };
  }, []);

  return (
    <div>
      <h2>Real-time RFID Scans</h2>
      {rfidScans.map((scan, i) => (
        <div key={i}>
          {scan.user.name} - {scan.status} - {scan.timestamp}
        </div>
      ))}
    </div>
  );
};
```

---

### Server-side Broadcasting

```typescript
import { getIO, broadcastToRoom, sendNotificationToUser } from '../config/websocket';

// Отправить в комнату
broadcastToRoom('admin', 'rfid-scan-update', {
  cardNumber: '1234567890',
  status: 'GRANTED',
});

// Отправить пользователю
sendNotificationToUser('user-uuid', {
  type: 'grade',
  title: 'Новая оценка',
  message: 'Вам выставлена оценка 5',
});

// Отправить всем
const io = getIO();
io.emit('system-announcement', {
  message: 'Система будет недоступна 10 минут',
});
```

---

## 🔐 Аутентификация

### JWT Authentication

```javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-jwt-token',
  },
});

// Server-side middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  
  if (!token) {
    return next(new Error('Authentication error'));
  }

  try {
    const decoded = verifyToken(token);
    socket.data.user = decoded;
    next();
  } catch (error) {
    next(new Error('Invalid token'));
  }
});
```

---

## 📊 События (полный список)

### Client → Server

| Event | Описание | Data |
|-------|----------|------|
| `join-room` | Присоединиться к комнате | `roomId: string` |
| `leave-room` | Покинуть комнату | `roomId: string` |
| `rfid-scan` | RFID сканирование | `{ cardNumber, turnstileId, direction }` |
| `turnstile-status` | Статус турникета | `{ turnstileId, isActive, message }` |
| `chat-message` | Сообщение в чат | `{ roomId, message }` |
| `typing` | Индикатор печати | `{ roomId, userId }` |

### Server → Client

| Event | Описание | Data |
|-------|----------|------|
| `rfid-scan-update` | Новое сканирование | `{ cardNumber, user, status, turnstile, timestamp }` |
| `turnstile-status-update` | Обновление статуса турникета | `{ turnstileId, isActive, message }` |
| `chat-message-received` | Новое сообщение | `{ id, content, senderId, timestamp }` |
| `user-typing` | Пользователь печатает | `{ userId }` |
| `notification` | Уведомление | `{ type, title, message, timestamp }` |

---

## 🧪 Тестирование

```javascript
// Test connection
socket.on('connect', () => {
  console.log('✅ Connected:', socket.id);
  
  // Test join room
  socket.emit('join-room', 'test-room');
  
  // Test echo
  socket.emit('chat-message', {
    roomId: 'test-room',
    message: { content: 'Test message' },
  });
});

// Listen for response
socket.on('chat-message-received', (msg) => {
  console.log('✅ Received:', msg);
});
```

---

## 🔧 Troubleshooting

### Не подключается

```javascript
socket.on('connect_error', (error) => {
  console.error('Connection error:', error.message);
  // Проверьте CORS, токен, URL
});
```

### Не получает события

```javascript
// Убедитесь что присоединились к комнате
socket.emit('join-room', 'your-room-id');

// Проверьте что слушаете правильное событие
socket.on('correct-event-name', (data) => {
  console.log(data);
});
```

---

[← API Reference](./API.md) | [Database →](./DATABASE.md)
