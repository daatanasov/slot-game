import { Socket, Server } from 'socket.io'
import { SlotGameService } from '../services/slotGameService'

export class blackjackGameController {
    private connectedUsers: Map<string, any> = new Map()
    private slotGameService: SlotGameService

    constructor(private io: Server) {
        this.slotGameService = new SlotGameService()
    }

    handleJoinGame(socket: Socket, userData: any) {
        // Validate user and check if they can join the game
        const userValidation = this.validateUser(userData)
        if (userValidation.success) {
            // Store user connection
            this.connectedUsers.set(socket.id, {
                id: socket.id,
                userData: userValidation.userData,
                connectedAt: new Date(),
            })

            socket.emit('game-joined', {
                success: true,
                message: 'Joined slot game successfully',
                gameState: this.slotGameService.getInitialGameState(),
            })
        } else {
            socket.emit('game-joined', {
                success: false,
                message: userValidation.message,
            })
        }
    }

    handleSpin(
        socket: Socket,
        betAmount: number,
        balance: number,
        spinCount: number
    ) {
        const user = this.connectedUsers.get(socket.id)
        if (!user) {
            socket.emit('spin-result', {
                success: false,
                message: 'User not found',
            })
            return
        }

        const spinResult = this.slotGameService.processSpin(
            betAmount,
            balance,
            spinCount
        )

        socket.emit('spin-result', spinResult)
    }

    handleDisconnect(socket: Socket) {
        this.connectedUsers.delete(socket.id)
    }

    private validateUser(userData: any) {
        // Implement user validation logic
        if (!userData || !userData.userId) {
            return {
                success: false,
                message: 'Invalid user data',
            }
        }

        return {
            success: true,
            userData: userData,
        }
    }
}
