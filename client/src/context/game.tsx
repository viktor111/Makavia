import React, { createContext, useState, useContext } from 'react';
import { Player } from '../types/player';

interface GameContextProps {
    player: Player | null;
    setPlayer: (player: Player | null) => void;
}

export const GameContext = createContext<GameContextProps>({
    player: null,
    setPlayer: () => { },
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [player, setPlayer] = useState<Player | null>(null);

    return (
        <GameContext.Provider value={{ player, setPlayer }}>
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
