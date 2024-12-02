export const spinReels = () => {
    const symbols = ['🍒', '7️⃣', '🔔', '🍋', '🍉'];
    const reels = symbols.map(() => symbols[Math.floor(Math.random() * symbols.length)]);
    const isWin = reels.every((r) => r === reels[0]);
  
    return {
      reels,
      isWin,
      payout: isWin ? 50 : 0,
    };
  };
  