import React, { useState } from 'react';
import { Turn, TurnType } from '../types/turn';
import { useGameContext } from '../context/game';
import { AbilityType } from '../types/abilities';

const Fight: React.FC = () => {
    const [turn, setTurn] = useState(new Turn(0, TurnType.Player));
    const { player, currentEnemy } = useGameContext();

    const [logs, setLogs] = useState<string[]>([]);

    const handleAbilityClick = (index: number) => {
        const ability = player?.learnedAbilities[index];
        if (ability) {
            if (currentEnemy) {
                let abilityUseResult = ability.use(player, currentEnemy);

                let log = `${player?.name} used ${ability.name} on ${currentEnemy?.name} for ${abilityUseResult}`;

                if(ability.type !== AbilityType.Attack && ability.type !== AbilityType.Curse) {
                    log = `${player?.name} used ${ability.name} on ${player?.name} for ${abilityUseResult}`;
                }

                let currentLogs = logs;
                currentLogs.push(log);

                if (currentEnemy.health <= 0) {
                    currentLogs.push(`${currentEnemy.name} has been defeated!`);
                    setLogs([...currentLogs]);
                    setTurn(new Turn(turn.count + 1, TurnType.End));
                    return;
                }

                setLogs([...currentLogs]);
            }
            
            setTurn(new Turn(turn.count + 1, TurnType.Enemy));

            setTimeout(() => {
                if (currentEnemy) {
                    const abilityUsed = currentEnemy.useAbility(player);
                    let log = `${currentEnemy.name} used ${abilityUsed.ability.name} on ${player?.name} for ${abilityUsed.abilityUseResult}`;
                    if(abilityUsed.ability.type !== AbilityType.Attack && abilityUsed.ability.type !== AbilityType.Curse) {
                        log = `${currentEnemy.name} used ${abilityUsed.ability.name} on ${currentEnemy.name} for ${abilityUsed.abilityUseResult}`;
                    }
                    let currentLogs = logs;
                    currentLogs.push(log);

                    if (player?.health <= 0) {
                        currentLogs.push(`${player?.name} has been defeated!`);
                        setLogs([...currentLogs]);
                        setTurn(new Turn(turn.count + 1, TurnType.End));
                        return;
                    }

                    setLogs([...currentLogs]);
                    setTurn(new Turn(turn.count + 1, TurnType.Player));
                }
            }, 1000);
        }       
    }

    return (
        <div>
            <h1>{player?.name} VS {currentEnemy?.name}</h1>
            <h2>{player?.name}'s HP: {player?.health}</h2>
            <h2>{currentEnemy?.name}'s HP: {currentEnemy?.health}</h2>
            <h2>Turn: {turn.count}</h2>
            <h2>Turn Type: {turn.type}</h2>
            {turn.type === TurnType.Player && player?.learnedAbilities.map((ability, index) => (
                <button key={index} onClick={() => handleAbilityClick(index)}>{ability.name}</button> 
            ))}
            {turn.type === TurnType.Enemy && player?.learnedAbilities.map((ability, index) => (
                <button key={index} disabled>{ability.name}</button> 
            ))}

            {turn.type === TurnType.End && (
                <h1>Fight concluded</h1>
            )}

            <div>
                {logs.map((log, index) => (
                    <p key={index}>{log}</p>
                ))}
            </div>
        </div>
    );
};

export default Fight;

