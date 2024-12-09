'use client'

import React, { useState, useEffect } from 'react'

interface CasinoGameProps {
    gameUrl: string
    width?: string
    height?: string
}

const CasinoGame: React.FC<CasinoGameProps> = ({
    gameUrl,
    width = '100%',
    height = '600px',
}) => {
    const [connectionError, setConnectionError] = useState(false)
    const [formattedUrl, setFormattedUrl] = useState('')

    useEffect(() => {
        const normalizedUrl = 'http://localhost:3001'

        setFormattedUrl(normalizedUrl)
        fetch(normalizedUrl, { mode: 'no-cors' })
            .then(() => setConnectionError(false))
            .catch(() => {
                console.error('Failed to connect to game server')
                setConnectionError(true)
            })
    }, [gameUrl])

    if (connectionError) {
        return (
            <div className="bg-red-100 p-4 rounded">
                <h2 className="text-red-600 font-bold">
                    Game Server Connection Error
                </h2>
            </div>
        )
    }

    return (
        <iframe
            src={formattedUrl}
            width={width}
            height={height}
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups allow-forms"
            className="w-full"
        />
    )
}

export default CasinoGame
