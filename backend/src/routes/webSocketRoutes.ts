import { Server, Socket } from 'socket.io'
import { SlotGameController } from '../ws-controllers/slotGameController'

export class WebSocketRoutes {
    constructor(
        private io: Server,
        private slotGameController: SlotGameController
    ) {}

    registerRoutes() {
        this.io.on('connection', (socket: Socket) => {
            // Slot game specific events
            socket.on('join-slot-game', (userData) =>
                this.slotGameController.handleJoinGame(socket, userData)
            )
            console.log('webSocketRoutes')
            socket.on('spin', (betAmount, balance, spinCount) =>
                this.slotGameController.handleSpin(
                    socket,
                    betAmount,
                    balance,
                    spinCount
                )
            )

            socket.on('disconnect', () =>
                this.slotGameController.handleDisconnect(socket)
            )

            socket.on('blackjack-game', (userData) => {})
            socket.on('deal', (dealerCards, playerCards, balance) => {})
            socket.on('disconnect', () => {})
        })
    }
}
