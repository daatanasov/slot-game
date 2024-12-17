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

const ReelsRenderer4: React.FC<ReelsRendererProps> = ({ grid }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const init = useCallback(async () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const pixiApp = new Application()
        await pixiApp.init({
            //  width, height, canvas
            // width,
            // height,
            backgroundAlpha: 0,
            resizeTo: canvas.parentElement || undefined,
            background: 'transparent',
            canvas,
        })

        await Assets.load('/images/sprites-reels.webp')

        const slotTexture = Texture.from('/images/sprites-reels.webp')
        const reelContainer = new Container()
        const rc = new Container()
        rc.x = 1 * REEL_WIDTH
        const symbol = new Sprite(slotTexture)
        rc.addChild(symbol)
        reelContainer.addChild(rc)
        pixiApp.stage.addChild(reelContainer)
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

    return <canvas ref={canvasRef} />
}
export default ReelsRenderer4
