import * as express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import * as cors from 'cors'
import { SlotGameController } from './ws-controllers/slotGameController'

export class WebSocketServer {
    private app: express.Application
    private httpServer: ReturnType<typeof createServer>
    private io: Server
    private slotGameController: SlotGameController

    constructor(port: number) {
        this.app = express()
        this.httpServer = createServer(this.app)

        this.io = new Server(this.httpServer, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization'],
            },
        })

        this.slotGameController = new SlotGameController(this.io)
        this.initializeMiddleware()
        this.setupWebSocketRoutes()
        this.startServer(port)
    }

    private initializeMiddleware() {
        this.app.use(cors())
        this.app.use(express.json())
    }

    private setupWebSocketRoutes() {
        this.io.on('connection', (socket) => {
            console.log('New user connected:', socket.id)
            // Slot game routes
            socket.on('join-slot-game', (userData) =>
                this.slotGameController.handleJoinGame(socket, userData)
            )
            socket.on('spin', (betAmount, balance, spinCount) =>
                this.slotGameController.handleSpin(
                    socket,
                    betAmount,
                    balance,
                    spinCount
                )
            )

            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id)
                this.slotGameController.handleDisconnect(socket)
            })
        })
    }

    private startServer(port: number) {
        this.httpServer.listen(port, () => {
            console.log(`Slot Game WebSocket Server running on port ${port}`)
        })
    }
}

// Initialize the server on port 8080
export const websocketServer = new WebSocketServer(8080)
