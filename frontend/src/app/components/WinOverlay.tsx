import React, { useEffect } from 'react'
import { Trophy, Star, Coins } from 'lucide-react'

interface WinOverlayProps {
    isVisible: boolean
    winAmount: number
    onClose: () => void
}

const WinOverlay: React.FC<WinOverlayProps> = ({
    isVisible,
    winAmount,
    onClose,
}) => {
    useEffect(() => {
        let timeoutId: NodeJS.Timeout
        if (isVisible) {
            timeoutId = setTimeout(onClose, 5000) // Auto-close after 5 seconds
        }
        return () => {
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [isVisible, onClose])

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="overlay-animation bg-gradient-to-br from-yellow-400 to-orange-500 p-8 rounded-2xl shadow-2xl text-center relative overflow-hidden">
                {/* Floating Stars */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="floating-star text-yellow-200 opacity-50"
                        >
                            <Star size={20} fill="currentColor" />
                        </div>
                    ))}
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center space-y-4">
                    <div className="trophy-animation">
                        <Trophy
                            size={80}
                            className="text-white"
                            fill="currentColor"
                        />
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-2">
                        Congratulations!
                    </h2>

                    <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-6 py-3 rounded-xl">
                        <Coins size={32} className="text-yellow-200" />
                        <span className="text-2xl font-bold text-white">
                            +${winAmount.toFixed(2)}
                        </span>
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-4 bg-white text-orange-500 px-6 py-2 rounded-full hover:bg-opacity-90 transition"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WinOverlay
