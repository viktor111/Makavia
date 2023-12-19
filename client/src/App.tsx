import React, { useEffect } from 'react';
import './App.css';
import {
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Root from './routes/root';
import StartGame from './routes/startGame';
import { useGameContext } from './context/game';
import { PlayerTestData } from './testData/playerTestData';
import Character from './routes/character';

function App() {
  const { player, setPlayer } = useGameContext();

  useEffect(() => {
    const player = PlayerTestData.generate();
    setPlayer(player);
  }, []);

  return (
    <>
    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/start-game" element={<StartGame />} />
      <Route path="/character" element={<Character />} />
    </Routes>

    <nav>
      <Link to="/">Home</Link>
      <Link to="/start-game">Start Game</Link>
      <Link to="/character">Character</Link>
    </nav>
    </>
  );
}

export default App;
