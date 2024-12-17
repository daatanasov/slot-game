import React, { useRef, useCallback, useEffect, useState } from 'react'
import {
    Application,
    Assets,
    Container,
    Sprite,
    Texture,
    BlurFilter,
} from 'pixi.js'
import * as PIXI from 'pixi.js'

interface ReelsRendererProps {
    grid?: string[][]
    winningRows?: number[]
    spinning?: boolean
    onSpinComplete?: () => void
}

const ReelsRenderer3: React.FC<ReelsRendererProps> = ({
    grid = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
    ],
    winningRows = [],
    spinning = false,
    onSpinComplete,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [app, setApp] = useState<Application | null>(null)
    const [reels, setReels] = useState<any[]>([])

    // Sprite mapping based on your existing SlotIcon component
    const spriteMap: Record<string, { x: number; y: number }> = {
        j: { x: 0, y: -8 },
        a: { x: -160, y: -8 },
        d: { x: -320, y: -8 },
        k: { x: 0, y: -165 },
        w: { x: -160, y: -165 },
        q: { x: -320, y: -165 },
        empty: { x: 0, y: -100 },
    }

    const REEL_WIDTH = 160
    const SYMBOL_SIZE = 160
    const NUM_REELS = 5
    const NUM_ROWS = 3

    const initPixi = useCallback(async () => {
        const canvas = canvasRef.current
        if (!canvas) return null

        // Create PIXI application
        const pixiApp = new Application()
        await pixiApp.init({
            width: REEL_WIDTH * NUM_REELS,
            height: SYMBOL_SIZE * NUM_ROWS,
            background: 'transparent',
            canvas,
        })

        // Load sprite sheet
        const spriteTexture = await Assets.load('/images/sprites-reels.webp')

        // Create reel container
        const reelContainer = new Container()
        pixiApp.stage.addChild(reelContainer)

        // Build reels
        const reelsArray = []
        for (let i = 0; i < NUM_REELS; i++) {
            const rc = new Container()
            rc.x = i * REEL_WIDTH
            reelContainer.addChild(rc)

            const reel = {
                container: rc,
                symbols: [] as Sprite[],
                position: 0,
                previousPosition: 0,
                blur: new BlurFilter(),
            }

            reel.blur.blurX = 0
            reel.blur.blurY = 0
            rc.filters = [reel.blur]

            // Create symbols for this reel
            for (let j = 0; j < NUM_ROWS + 1; j++) {
                const symbolKey = grid[j % NUM_ROWS][i] || 'empty'
                const { x, y } = spriteMap[symbolKey]

                const frame = new PIXI.Rectangle(
                    -x,
                    -y,
                    SYMBOL_SIZE,
                    SYMBOL_SIZE
                )
                const symbol = new Sprite(new Texture(spriteTexture))

                symbol.width = SYMBOL_SIZE
                symbol.height = SYMBOL_SIZE
                symbol.y = j * SYMBOL_SIZE
                reel.symbols.push(symbol)
                rc.addChild(symbol)
            }

            reelsArray.push(reel)
        }

        setApp(pixiApp)
        setReels(reelsArray)

        return pixiApp
    }, [grid])

    // Spin animation
    const startSpin = useCallback(() => {
        if (!app || reels.length === 0) return

        reels.forEach((reel, i) => {
            const target = reel.position + 10 + i * 5
            const time = 2500 + i * 600

            // Simple animation logic
            const startTime = Date.now()
            const animate = () => {
                const now = Date.now()
                const phase = Math.min(1, (now - startTime) / time)

                // Update reel position
                reel.position += 0.5 * (1 - phase)

                // Blur effect
                reel.blur.blurY = (reel.position - reel.previousPosition) * 8
                reel.previousPosition = reel.position

                // Update symbol positions
                reel.symbols.forEach((s: Sprite, j: number) => {
                    s.y =
                        ((reel.position + j) % reel.symbols.length) *
                            SYMBOL_SIZE -
                        SYMBOL_SIZE
                })

                if (phase < 1) {
                    requestAnimationFrame(animate)
                } else {
                    // Spin complete
                    onSpinComplete?.()
                }
            }

            requestAnimationFrame(animate)
        })
    }, [app, reels, onSpinComplete])

    // Initialize Pixi and handle spinning
    useEffect(() => {
        let pixiApp: Application | null = null

        // Initialize PIXI app
        initPixi().then((initializedApp) => {
            pixiApp = initializedApp
        })

        // Cleanup function
        return () => {
            if (pixiApp) {
                pixiApp.stop()
                pixiApp.destroy(true, { children: true })
            }
        }
    }, [initPixi])

    // Trigger spin when spinning prop changes
    useEffect(() => {
        if (spinning) {
            startSpin()
        }
    }, [spinning, startSpin])

    return <canvas ref={canvasRef} />
}

export default ReelsRenderer3
