import { useContext } from "react";
import { GameContext } from "../store/game-context.jsx";

export default function GameOver() {
  const { restart, winner, draw } = useContext(GameContext);

  return (
    <div id='game-over'>
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {draw && <p>It's a draw</p>}
      <p>
        <button onClick={restart}> Rematch </button>
      </p>
    </div>
  );
}
