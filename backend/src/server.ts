import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const httpServer = createServer(app)

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  }
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
import routes from './routes'

app.use('/api', routes)

// Socket.IO handlers
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  
  socket.on('join_room', (groupId: string) => {
    socket.join(`group_${groupId}`)
    console.log(`User ${socket.id} joined room: group_${groupId}`)
  })
  
  socket.on('send_message', ({ groupId, message }) => {
    io.to(`group_${groupId}`).emit('new_message', {
      id: Date.now(),
      content: message,
      senderId: socket.id,
      timestamp: new Date()
    })
  })
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// Start server
const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📡 Socket.IO ready for real-time connections`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
})

export { app, io }
