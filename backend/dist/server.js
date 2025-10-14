"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Load env variables
dotenv_1.default.config();
// Import configs
const websocket_1 = require("./config/websocket");
const redis_1 = require("./config/redis");
// Import routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const registration_routes_1 = __importDefault(require("./routes/registration.routes"));
const rfid_routes_1 = __importDefault(require("./routes/rfid.routes"));
const turnstile_routes_1 = __importDefault(require("./routes/turnstile.routes"));
const grades_routes_1 = __importDefault(require("./routes/grades.routes"));
const schedule_routes_1 = __importDefault(require("./routes/schedule.routes"));
const attendance_routes_1 = __importDefault(require("./routes/attendance.routes"));
// Initialize express
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Create HTTP server
const httpServer = http_1.default.createServer(app);
// Initialize WebSocket
const io = (0, websocket_1.initializeWebSocket)(httpServer);
// Middleware
app.use((0, helmet_1.default)()); // Security headers
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests per 15 minutes
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);
// Serve static files (uploads)
app.use('/uploads', express_1.default.static('uploads'));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/registration', registration_routes_1.default);
app.use('/api/rfid', rfid_routes_1.default);
app.use('/api/turnstiles', turnstile_routes_1.default);
app.use('/api/grades', grades_routes_1.default);
app.use('/api/schedule', schedule_routes_1.default);
app.use('/api/attendance', attendance_routes_1.default);
// Health check
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
    });
});
// Root endpoint
app.get('/', (req, res) => {
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
            attendance: '/api/attendance',
            health: '/api/health',
        },
    });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found',
    });
});
// Error handler
app.use((err, req, res, next) => {
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
        await (0, redis_1.connectRedis)();
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
    }
    catch (error) {
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
exports.default = app;
//# sourceMappingURL=server.js.map