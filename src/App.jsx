import GameBoard from "./components/Gameboard.jsx";
import Player from "./components/Player.jsx";
import Log from "./components/Log.jsx";

import GameOver from "./components/GameOver.jsx";
import { useContext } from "react";
import { GameContext } from "./store/game-context.jsx";

function App() {
  const { name, winner, draw, changeName, activePlayer } =
    useContext(GameContext);

  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            name={name.X}
            symbol='X'
            isActive={activePlayer === "X"}
            handleChangeName={changeName}
          />
          <Player
            name={name.O}
            symbol='O'
            isActive={activePlayer === "O"}
            handleChangeName={changeName}
          />
        </ol>
        {(winner || draw) && <GameOver />}
        <GameBoard />
      </div>
      <Log />
    </main>
  );
}

export default App;
