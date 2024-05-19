import { createContext, useReducer } from "react";
import {
  INITIAL_GAME_BOARD,
  deriveActivePlayer,
  deriveGameBoard,
  deriveWinner,
} from "../gameUtil.js";

export const GameContext = createContext({
  gameTurns: [],
  name: {},
  gameBoard: INITIAL_GAME_BOARD,
  selectSquare: () => {},
  changeName: () => {},
  restart: () => {},
  draw: false,
  winner: " ",
  activePlayer: "X",
});

function gameProviderReducer(state, action) {
  if (action.type === "SELECT_SQUARE") {
    let currentPlayer = deriveActivePlayer(state.gameTurns);
    const newTurns = {
      ...state,
      gameTurns: [
        { ...action.payload, player: currentPlayer },
        ...state.gameTurns,
      ],
    };
    return newTurns;
  }
  if (action.type === "CHANGE_NAME") {
    const newName = { ...state };
    newName.playerName[action.payload.player] = action.payload.value;
    return newName;
  }

  if (action.type === "RESTART") {
    return { ...state, gameTurns: [] };
  }
}

export default function GameContextProvider({ children }) {
  const [gameState, gameDispatch] = useReducer(gameProviderReducer, {
    gameTurns: [],
    playerName: {
      X: "Player 1",
      O: "Player 2",
    },
  });

  function handleSelectSquare(rowIndex, colIndex) {
    gameDispatch({
      type: "SELECT_SQUARE",
      payload: { square: { row: rowIndex, col: colIndex } },
    });
  }

  function handleChangeName(player, value) {
    gameDispatch({
      type: "CHANGE_NAME",
      payload: { player, value },
    });
  }

  function handleRestart() {
    gameDispatch({ type: "RESTART" });
  }

  let activePlayer = deriveActivePlayer(gameState.gameTurns);
  const gameBoard = deriveGameBoard(gameState.gameTurns);
  const winner = deriveWinner(gameBoard, gameState.playerName);
  let isDraw = gameState.gameTurns.length === 9 && !winner;

  const ctxGame = {
    gameTurns: gameState.gameTurns,
    name: gameState.playerName,
    selectSquare: handleSelectSquare,
    changeName: handleChangeName,
    restart: handleRestart,
    gameBoard: gameBoard,
    draw: isDraw,
    winner: winner,
    activePlayer: activePlayer,
  };

  return (
    <GameContext.Provider value={ctxGame}>{children}</GameContext.Provider>
  );
}
