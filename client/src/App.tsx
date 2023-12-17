import React, { useEffect } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/root';
import StartGame from './routes/startGame';
import { useGameContext } from './context/game';
import { PlayerTestData } from './testData/playerTestData';
import Character from './routes/character';

let router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/start-game",
    element: <StartGame />,
  },
  {
    path: "/character",
    element: <Character />,
  }
]);


function App() {
  const { player, setPlayer } = useGameContext();

  useEffect(() => {
    const player = PlayerTestData.generate();
    setPlayer(player);
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
