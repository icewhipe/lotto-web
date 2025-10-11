import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import http from 'http';
import rateLimit from 'express-rate-limit';

// Load env variables
dotenv.config();

// Import configs
import { initializeWebSocket } from './config/websocket';
import { connectRedis } from './config/redis';

// Import routes
import authRoutes from './routes/auth.routes';
import rfidRoutes from './routes/rfid.routes';
import turnstileRoutes from './routes/turnstile.routes';
import gradesRoutes from './routes/grades.routes';
import scheduleRoutes from './routes/schedule.routes';

// Initialize express
const app: Express = express();
const PORT = process.env.PORT || 3000;

// Create HTTP server
const httpServer = http.createServer(app);

// Initialize WebSocket
const io = initializeWebSocket(httpServer);

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per 15 minutes
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Serve static files (uploads)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rfid', rfidRoutes);
app.use('/api/turnstiles', turnstileRoutes);
app.use('/api/grades', gradesRoutes);
app.use('/api/schedule', scheduleRoutes);

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'ЛПТТ Электронный Дневник API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      rfid: '/api/rfid',
      turnstiles: '/api/turnstiles',
      grades: '/api/grades',
      schedule: '/api/schedule',
      health: '/api/health',
    },
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// Error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('Error:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// Start server
const startServer = async () => {
  try {
    // Try to connect to Redis (optional)
    await connectRedis();

    // Start HTTP server
    httpServer.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════╗
║   🎓 ЛПТТ Электронный Дневник API        ║
║                                            ║
║   ✅ Server:   http://localhost:${PORT}     ║
║   📡 WebSocket: Connected                  ║
║   💾 Database:  PostgreSQL                 ║
║   📦 Redis:     Optional (for cache)       ║
║                                            ║
║   📚 API Docs:  /api                       ║
║   ❤️  Health:   /api/health                ║
╚════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received, shutting down gracefully...');
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Start the server
startServer();

export default app;
