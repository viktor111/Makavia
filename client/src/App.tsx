import React, { useEffect } from 'react';
import './App.css';
import {
  Link,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import Root from './routes/root';
import StartGame from './routes/startGame';
import { useGameContext } from './context/game';
import { PlayerTestData } from './testData/playerTestData';
import Character from './routes/character';
import Fight from './routes/fight';
import Story from './routes/story';
import { EnemyGenerator } from './types/enemies';

function App() {
  const { setPlayer, setCurrentEnemy, player } = useGameContext();

  useEffect(() => {
    // Only initialize if player is not set (allows story mode to set its own player)
    if (!player) {
      const enemyGenerator = new EnemyGenerator();
      const newPlayer = PlayerTestData.generate();
      const enemy = enemyGenerator.generateEnemies(newPlayer.worldTier, 1)[0];
      setCurrentEnemy(enemy);
      setPlayer(newPlayer);
    }
  }, [setCurrentEnemy, setPlayer, player]);

  return (
    <>
      <nav className="mk-nav">
        <Link to="/" className="mk-brand">Makavia</Link>
        <div className="mk-nav__links">
          <NavLink to="/" end className="mk-nav__link">Home</NavLink>
          <NavLink to="/story" className="mk-nav__link">Story Mode</NavLink>
          <NavLink to="/fight" className="mk-nav__link">Dungeon</NavLink>
          <NavLink to="/character" className="mk-nav__link">Character</NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/start-game" element={<StartGame />} />
        <Route path="/character" element={<Character />} />
        <Route path="/fight" element={<Fight />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </>
  );
}

export default App;
