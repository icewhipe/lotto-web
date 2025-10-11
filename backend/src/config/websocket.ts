import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

let io: Server;

export const initializeWebSocket = (httpServer: HttpServer): Server => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    // Присоединиться к комнате (группа, роль и т.д.)
    socket.on('join-room', (roomId: string) => {
      socket.join(roomId);
      console.log(`📍 Socket ${socket.id} joined room: ${roomId}`);
    });

    // Покинуть комнату
    socket.on('leave-room', (roomId: string) => {
      socket.leave(roomId);
      console.log(`📤 Socket ${socket.id} left room: ${roomId}`);
    });

    // RFID scan event (от турникета)
    socket.on('rfid-scan', (data) => {
      console.log('🔖 RFID Scan:', data);
      // Отправить всем в комнату "admin"
      io.to('admin').emit('rfid-scan-update', data);
    });

    // Turnstile status update
    socket.on('turnstile-status', (data) => {
      console.log('🚪 Turnstile Status:', data);
      io.to('admin').emit('turnstile-status-update', data);
    });

    // Chat message
    socket.on('chat-message', (data) => {
      const { roomId, message } = data;
      io.to(roomId).emit('chat-message-received', message);
    });

    // Typing indicator
    socket.on('typing', (data) => {
      const { roomId, userId } = data;
      socket.to(roomId).emit('user-typing', { userId });
    });

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error('WebSocket not initialized');
  }
  return io;
};

// Отправить уведомление конкретному пользователю
export const sendNotificationToUser = (userId: string, notification: any) => {
  if (io) {
    io.to(`user-${userId}`).emit('notification', notification);
  }
};

// Отправить обновление всем в комнате
export const broadcastToRoom = (roomId: string, event: string, data: any) => {
  if (io) {
    io.to(roomId).emit(event, data);
  }
};

// Отправить всем подключенным клиентам
export const broadcastToAll = (event: string, data: any) => {
  if (io) {
    io.emit(event, data);
  }
};
