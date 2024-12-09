const SlotIcon = ({
    icon,
    winningRows,
    rowIndex,
}: {
    icon: string
    winningRows: number[]
    rowIndex: number
}) => {
    const spriteMap: Record<string, { x: number; y: number }> = {
        j: { x: 0, y: -8 },
        a: { x: -160, y: -8 },
        d: { x: -320, y: -8 },
        k: { x: 0, y: -165 },
        w: { x: -160, y: -165 },
        q: { x: -320, y: -165 },
        empty: { x: 0, y: -100 }, // Placeholder for empty cells
    }

    const { x, y } = spriteMap[icon] || spriteMap['empty']
    const isWinningRow = winningRows.some((a) =>
        a.toString().includes(rowIndex.toString())
    )

    return (
        <div
            className={`slot-icon relative w-full h-full overflow-hidden ${
                isWinningRow ? 'animate' : ''
            }`}
            style={{
                backgroundImage: isWinningRow
                    ? "url('/images/sprites-reels-animation.webp')"
                    : "url('/images/sprites-reels.webp')",
                backgroundPosition: `${x}px ${y}px`,
            }}
        ></div>
    )
}

export default SlotIcon
