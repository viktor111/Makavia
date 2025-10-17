import React, { createContext, useState, useContext } from 'react';
import { Player } from '../types/player';
import { Enemy } from '../types/enemies';

interface GameContextProps {
    player: Player | null;
    currentEnemy: Enemy | null;
    setPlayer: (player: Player | null) => void;
    setCurrentEnemy: (enemy: Enemy | null) => void;
}

export const GameContext = createContext<GameContextProps>({
    player: null,
    currentEnemy: null,
    setPlayer: () => { },
    setCurrentEnemy: () => { },
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [player, setPlayer] = useState<Player | null>(null);
    const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);

    return (
        <GameContext.Provider value={{ player, setPlayer, currentEnemy, setCurrentEnemy}}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameContext must be used within a GameProvider');
    }
    return context;
};
