import { WINNING_COMBINATIONS } from "./winning-combinations.js";

//check the initial active player
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  // dito naman yung unang turn. kung O ba o X  //initial active player
  return currentPlayer;
}

// checking who's winner
function deriveWinner(gameBoard, name) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = name[firstSquareSymbol];
    }
  }
  return winner;
}

// default gameBoard
export const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// new GameBoard
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((arr) => [...arr])];

  for (const gameTurn of gameTurns) {
    const { square, player } = gameTurn;
    const { row, col } = square;
    gameBoard[row][col] = player;
    // dito binabago yung mga context ng Button X or O
  }
  return gameBoard;
}

export { deriveActivePlayer, deriveWinner, deriveGameBoard };
