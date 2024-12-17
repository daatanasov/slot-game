import React, { useRef, useCallback, useEffect, useState } from 'react'
import * as PIXI from 'pixi.js'
import {
    Application,
    Assets,
    Texture,
    Container,
    BlurFilter,
    Sprite,
    Rectangle,
    Spritesheet,
} from 'pixi.js'
import { spriteMap, getSymbolPosition } from '../scripts/reels'
import { REEL_WIDTH, SYMBOL_SIZE, NUM_REELS, NUM_ROWS } from '../scripts/const'

interface ReelsRendererProps {
    grid: string[][]
    winningRows?: number[]
    spinning?: boolean
    onSpinComplete?: () => void
    // width: number | undefined
    // height: number | undefined
}

const atlasData = {
    frames: {
        j: {
            frame: { x: 0, y: -8, w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            sourceSize: { w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: SYMBOL_SIZE,
                h: SYMBOL_SIZE,
            },
        },
        a: {
            frame: { x: -160, y: -8, w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            sourceSize: { w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: SYMBOL_SIZE,
                h: SYMBOL_SIZE,
            },
        },
        d: {
            frame: { x: -320, y: -8, w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            sourceSize: { w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: SYMBOL_SIZE,
                h: SYMBOL_SIZE,
            },
        },
        k: {
            frame: { x: 0, y: -165, w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            sourceSize: { w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: SYMBOL_SIZE,
                h: SYMBOL_SIZE,
            },
        },
        w: {
            frame: { x: -160, y: -165, w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            sourceSize: { w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: SYMBOL_SIZE,
                h: SYMBOL_SIZE,
            },
        },
        q: {
            frame: { x: -320, y: -165, w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            sourceSize: { w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: SYMBOL_SIZE,
                h: SYMBOL_SIZE,
            },
        },
        empty: {
            frame: { x: 0, y: -100, w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            sourceSize: { w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: SYMBOL_SIZE,
                h: SYMBOL_SIZE,
            },
        },
    },
    meta: {
        image: '/images/sprites-reels.webp',
        // format: 'RGBA8888',
        size: { w: 463, h: 314 },
        scale: 0.7,
    },
}

const ReelsRenderer2: React.FC<ReelsRendererProps> = ({
    grid,
    winningRows,
    spinning,
    onSpinComplete,
    // width,
    // height,
}) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [app, setApp] = useState<Application | null>(null)
    const [reels, setReels] = useState<any[]>([])

    // console.log(height)
    // console.log(width)
    const init = useCallback(async () => {
        const canvas = canvasRef.current

        if (!canvas) return
        const pixiApp = new Application()
        await pixiApp.init({
            //  width, height, canvas
            // width,
            // height,
            resizeTo: canvas.parentElement || undefined,
            background: 'transparent',
            canvas,
        })

        const spriteTexture = await Assets.load('/images/sprites-reels.webp')
        const slotTextures = Texture.from('/images/sprites-reels.webp')
        // Build reels
        const reelsArray = []
        const reelContainer = new Container()
        // const generalSymbol = new Sprite(slotTextures)
        const generalSymbol = new Spritesheet(spriteTexture, atlasData)
        await generalSymbol.parse()
        console.log(generalSymbol)
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
            reel.blur.strengthX = 0
            reel.blur.strengthY = 0
            rc.filters = [reel.blur]
            for (let j = 0; j < NUM_ROWS; j++) {
                const symbolKey = grid[j % NUM_ROWS][i] || 'empty'
                // const { x, y } = spriteMap[symbolKey]
                // console.log(test)
                // console.log(generalSymbol)
                // const frame = new Rectangle(x, y, SYMBOL_SIZE, SYMBOL_SIZE)
                // console.log(frame)
                const symbolSprite = new Sprite(
                    new Texture(generalSymbol.textures['empty'])
                )
                symbolSprite.x = 100
                symbolSprite.y = 200
                console.log(symbolSprite)
                reel.symbols.push(symbolSprite)
                pixiApp.stage.addChild(symbolSprite)
                rc.addChild(symbolSprite)
            }
            reelsArray.push(reel)
        }
        setApp(pixiApp)
        setReels(reelsArray)
        return pixiApp
    }, [grid])
    useEffect(() => {
        let app: Application | undefined
        console.log(canvasRef)
        // Initialize the PIXI app
        init().then((initializedApp) => {
            app = initializedApp
        })
        // Cleanup function
        return () => {
            if (app) {
                app.stop()
                app.destroy(true, { children: true })
            }
        }
    }, [init])

    useEffect(() => {}, [])

    return <canvas ref={canvasRef} />
}
export default ReelsRenderer2
