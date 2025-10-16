import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
export declare const initializeWebSocket: (httpServer: HttpServer) => Server;
export declare const getIO: () => Server;
export declare const sendNotificationToUser: (userId: string, notification: any) => void;
export declare const broadcastToRoom: (roomId: string, event: string, data: any) => void;
export declare const broadcastToAll: (event: string, data: any) => void;
//# sourceMappingURL=websocket.d.ts.map