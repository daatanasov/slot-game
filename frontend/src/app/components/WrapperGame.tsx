'use client'
import CasinoGame from './CasionoGame'

const WrapperGame = () => {
    return (
        <div>
            <CasinoGame gameUrl="http://localhost:3001/slot-game" />
        </div>
    )
}

export default WrapperGame
