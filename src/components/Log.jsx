import { useContext } from "react";
import { GameContext } from "../store/game-context.jsx";

export default function Log() {
  const { gameTurns } = useContext(GameContext);
  return (
    <ol id='log'>
      {gameTurns.map((turn, turnsIndex) => (
        <li key={turnsIndex}>
          {turn.player} selected {turn.square.row}, {turn.square.col}
        </li>
      ))}
    </ol>
  );
}
