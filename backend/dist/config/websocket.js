"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastToAll = exports.broadcastToRoom = exports.sendNotificationToUser = exports.getIO = exports.initializeWebSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const initializeWebSocket = (httpServer) => {
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    io.on('connection', (socket) => {
        console.log(`✅ Client connected: ${socket.id}`);
        // Присоединиться к комнате (группа, роль и т.д.)
        socket.on('join-room', (roomId) => {
            socket.join(roomId);
            console.log(`📍 Socket ${socket.id} joined room: ${roomId}`);
        });
        // Покинуть комнату
        socket.on('leave-room', (roomId) => {
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
exports.initializeWebSocket = initializeWebSocket;
const getIO = () => {
    if (!io) {
        throw new Error('WebSocket not initialized');
    }
    return io;
};
exports.getIO = getIO;
// Отправить уведомление конкретному пользователю
const sendNotificationToUser = (userId, notification) => {
    if (io) {
        io.to(`user-${userId}`).emit('notification', notification);
    }
};
exports.sendNotificationToUser = sendNotificationToUser;
// Отправить обновление всем в комнате
const broadcastToRoom = (roomId, event, data) => {
    if (io) {
        io.to(roomId).emit(event, data);
    }
};
exports.broadcastToRoom = broadcastToRoom;
// Отправить всем подключенным клиентам
const broadcastToAll = (event, data) => {
    if (io) {
        io.emit(event, data);
    }
};
exports.broadcastToAll = broadcastToAll;
//# sourceMappingURL=websocket.js.map