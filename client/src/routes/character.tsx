import React from 'react';
import { useGameContext } from '../context/game';

const Character: React.FC = () => {
    const { player, setPlayer } = useGameContext();

    return (
        <div>
            <h3>Character JSON FORMAT</h3>
            <pre>{JSON.stringify(player, null, 2)}</pre>
        </div>
    );
};

export default Character;