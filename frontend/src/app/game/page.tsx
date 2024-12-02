import Header from '../components/Header';
import GameBoard from '../components/GameBoard';

const Game = () => {
  return (
    <div>
      <Header />
      <main className="p-4">
        <GameBoard />
      </main>
    </div>
  );
};

export default Game;
