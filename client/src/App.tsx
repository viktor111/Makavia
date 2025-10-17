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
import Fight from './routes/fight';
import { EnemyGenerator } from './types/enemies';

function App() {
  const { setPlayer, setCurrentEnemy } = useGameContext();
  
  useEffect(() => {
    const enemyGenerator = new EnemyGenerator();
    const player = PlayerTestData.generate();
    const enemy = enemyGenerator.generateEnemies(player.worldTier, 1)[0];
    console.log(enemy);
    setCurrentEnemy(enemy);
    setPlayer(player);
  }, [setCurrentEnemy, setPlayer]);

  return (
    <>
     <nav>
      <Link to="/">Home</Link>
      <Link to="/start-game">Start Game</Link>
      <Link to="/character">Character</Link>
      <Link to="/fight">Fight</Link>
    </nav>

    <Routes>
      <Route path="/" element={<Root />} />
      <Route path="/start-game" element={<StartGame />} />
      <Route path="/character" element={<Character />} />
      <Route path="/fight" element={<Fight />} />
    </Routes>
    </>
  );
}

export default App;
