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
      console.log(enemy);
      setCurrentEnemy(enemy);
      setPlayer(newPlayer);
    }
  }, [setCurrentEnemy, setPlayer, player]);

  return (
    <>
      <nav style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        backgroundColor: '#1a1a2e',
        borderBottom: '1px solid #2a2a4e',
      }}>
        <Link to="/" style={{ color: '#e0e6ed', textDecoration: 'none' }}>Home</Link>
        <Link to="/story" style={{ color: '#ffd700', textDecoration: 'none', fontWeight: 'bold' }}>📖 Story Mode</Link>
        <Link to="/fight" style={{ color: '#e0e6ed', textDecoration: 'none' }}>⚔️ Dungeon</Link>
        <Link to="/character" style={{ color: '#e0e6ed', textDecoration: 'none' }}>👤 Character</Link>
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
