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
    Graphics,
    FillGradient,
    Color,
} from 'pixi.js'
import { spriteMap, getSymbolPosition, atlasData } from '../scripts/reels'
import { REEL_WIDTH, SYMBOL_SIZE, NUM_REELS, NUM_ROWS } from '../scripts/const'

interface ReelsRendererProps {
    grid: string[][]
}

const ReelsRenderer: React.FC<ReelsRendererProps> = ({ grid }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    const init = useCallback(async () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const pixiApp = new Application()
        await pixiApp.init({
            backgroundAlpha: 0,
            resizeTo: canvas.parentElement || undefined,
            background: 'transparent',
            canvas,
        })

        await Assets.load('/images/sprites-reels.webp')
        const slotTexture = Texture.from('/images/sprites-reels.webp')
        const generalSymbol = new Spritesheet(slotTexture, atlasData)
        generalSymbol.parse()
        const reelContainer = new Container()
        const reels = []
        for (let i = 0; i < NUM_REELS; i++) {
            const rc = new Container()
            rc.x = i * REEL_WIDTH
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
            rc.scale = 0.75
            for (let j = 0; j < NUM_ROWS; j++) {
                const symbol = new Sprite(generalSymbol.textures.q)
                symbol.y = j * SYMBOL_SIZE
                symbol.scale.x = symbol.scale.y = Math.min(
                    SYMBOL_SIZE / symbol.width,
                    SYMBOL_SIZE / symbol.height
                )
                symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2)
                reel.symbols.push(symbol)
                rc.addChild(symbol)
                reelContainer.addChild(rc)
            }
            reels.push(reel)
        }

        pixiApp.stage.addChild(reelContainer)
        const margin = (pixiApp.screen.height - SYMBOL_SIZE * 3) / 2
        reelContainer.y = margin
        reelContainer.x = Math.round(pixiApp.screen.width - REEL_WIDTH * 5)
        const top = new Graphics()
            .rect(0, 0, pixiApp.screen.width, margin)
            .fill({ color: 0x0 })
        const bottom = new Graphics()
            .rect(0, SYMBOL_SIZE * 3 + margin, pixiApp.screen.width, margin)
            .fill({ color: 0x0 })
        const fill = new FillGradient(0, 0, 0, 36 * 1.7)

        const colors = [0xffffff, 0x00ff99].map((color) =>
            Color.shared.setValue(color).toNumber()
        )
        colors.forEach((number, index) => {
            const ratio = index / colors.length

            fill.addColorStop(ratio, number)
        })
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
export default ReelsRenderer
