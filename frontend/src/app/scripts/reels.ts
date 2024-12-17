import { SYMBOL_SIZE } from './const'

const spriteMap: Record<string, { x: number; y: number }> = {
    j: { x: 0, y: -8 },
    a: { x: -160, y: -8 },
    d: { x: -320, y: -8 },
    k: { x: 0, y: -165 },
    w: { x: -160, y: -165 },
    q: { x: -320, y: -165 },
    empty: { x: 0, y: -100 }, // Placeholder for empty cells
}

const getSymbolPosition = (symbol: string) => {
    const pos = spriteMap[symbol] || { x: 0, y: -100 }
    return pos
    // return new PIXI.Rectangle(pos.x, pos.y, 160, 160)
}

const atlasData = {
    frames: {
        j: {
            frame: { x: -20, y: 0, w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            sourceSize: { w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: SYMBOL_SIZE,
                h: SYMBOL_SIZE,
            },
        },
        a: {
            frame: { x: 160, y: 0, w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            sourceSize: { w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: SYMBOL_SIZE,
                h: SYMBOL_SIZE,
            },
        },
        d: {
            frame: { x: 320, y: 8, w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            sourceSize: { w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: SYMBOL_SIZE,
                h: SYMBOL_SIZE,
            },
        },
        k: {
            frame: { x: 0, y: 165, w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            sourceSize: { w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: SYMBOL_SIZE,
                h: SYMBOL_SIZE,
            },
        },
        w: {
            frame: { x: 160, y: 165, w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            sourceSize: { w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: SYMBOL_SIZE,
                h: SYMBOL_SIZE,
            },
        },
        q: {
            frame: { x: 320, y: 165, w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            sourceSize: { w: SYMBOL_SIZE, h: SYMBOL_SIZE },
            spriteSourceSize: {
                x: 0,
                y: 0,
                w: SYMBOL_SIZE,
                h: SYMBOL_SIZE,
            },
        },
        empty: {
            frame: { x: 0, y: 100, w: SYMBOL_SIZE, h: SYMBOL_SIZE },
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
        format: 'RGBA8888',
        size: { w: 463, h: 314 },
        scale: 0.7,
    },
}

export { spriteMap, getSymbolPosition, atlasData }
