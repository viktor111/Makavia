import React, { useEffect, useRef, useState } from 'react';
import Button from '../components/button';
import { useGameContext } from '../context/game';
import { BattleEngine, BattleLogEntry } from '../types/battleEngine';
import { AbilityType } from '../types/abilities';
import { PlayerClassEnum } from '../types/classes';
import { Turn, TurnType } from '../types/turn';

const Fight: React.FC = () => {
    const { player, currentEnemy } = useGameContext();
    const engineRef = useRef<BattleEngine | null>(null);
    const enemyActionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [turn, setTurn] = useState<Turn | null>(null);
    const [logs, setLogs] = useState<BattleLogEntry[]>([]);
    const [isEnemyActing, setIsEnemyActing] = useState(false);
    const logContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (player && currentEnemy) {
            engineRef.current = new BattleEngine(player, currentEnemy);
            setTurn(new Turn(engineRef.current.getTurn().count, engineRef.current.getTurn().type));
            setLogs([]);
            setIsEnemyActing(false);
            if (enemyActionTimeout.current) {
                clearTimeout(enemyActionTimeout.current);
                enemyActionTimeout.current = null;
            }
        }
    }, [player, currentEnemy]);

    useEffect(() => {
        return () => {
            if (enemyActionTimeout.current) {
                clearTimeout(enemyActionTimeout.current);
            }
        };
    }, []);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [logs]);

    const handleAbilityClick = (index: number) => {
        const engine = engineRef.current;
        if (!engine || !player || !currentEnemy) {
            return;
        }

        if (!engine.canPlayerAct()) {
            return;
        }

        const result = engine.playerUseAbility(index);
        setLogs(prev => [...prev, ...result.logs]);
        setTurn(new Turn(engine.getTurn().count, engine.getTurn().type));

        if (result.battleEnded) {
            return;
        }

        setIsEnemyActing(true);
        enemyActionTimeout.current = setTimeout(() => {
            const enemyResult = engine.enemyTurn();
            setLogs(prev => [...prev, ...enemyResult.logs]);
            setTurn(new Turn(engine.getTurn().count, engine.getTurn().type));
            setIsEnemyActing(false);
            enemyActionTimeout.current = null;
        }, 800);
    };

    const renderAbilityButton = (index: number) => {
        if (!player) {
            return null;
        }

        const ability = player.learnedAbilities[index];
        if (!ability) {
            return null;
        }

        const isDisabled = !engineRef.current?.canPlayerAct() || isEnemyActing;
        const abilityTypeLabel = AbilityType[ability.type];

        return (
            <div key={ability.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <Button
                    label={ability.name}
                    onClick={() => handleAbilityClick(index)}
                    style={{
                        backgroundColor: '#2f3e46',
                        color: '#f0f4f8',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                        opacity: isDisabled ? 0.6 : 1,
                    }}
                    disabled={isDisabled}
                />
                <small style={{ color: '#546a7b' }}>{abilityTypeLabel}</small>
                <small style={{ color: '#78909c' }}>{ability.description}</small>
            </div>
        );
    };

    if (!player || !currentEnemy || !turn) {
        return (
            <div style={{ padding: '2rem' }}>
                <h2>Preparing battle…</h2>
            </div>
        );
    }

    const playerHealthPercent = player.maxHealth ? Math.round((player.health / player.maxHealth) * 100) : 0;
    const enemyHealthPercent = currentEnemy.maxHealth ? Math.round((currentEnemy.health / currentEnemy.maxHealth) * 100) : 0;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>{player.name} vs {currentEnemy.name}</h1>
                <div>
                    <span>Turn {turn.count} — </span>
                    <strong>{turn.type === TurnType.Player ? `${player.name}'s turn` : turn.type === TurnType.Enemy ? `${currentEnemy.name}'s turn` : 'Battle complete'}</strong>
                </div>
            </header>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <CombatantCard
                    title={player.name}
                    subtitle={`Level ${player.level} ${PlayerClassEnum[player.class]}`}
                    health={player.health}
                    maxHealth={player.maxHealth}
                    healthPercent={playerHealthPercent}
                    armor={player.armor}
                    damage={player.damage}
                />
                <CombatantCard
                    title={currentEnemy.name}
                    subtitle={currentEnemy.isBoss ? 'Boss' : 'Enemy'}
                    health={currentEnemy.health}
                    maxHealth={currentEnemy.maxHealth}
                    healthPercent={enemyHealthPercent}
                    armor={currentEnemy.armor}
                    damage={currentEnemy.damage}
                />
            </section>

            <section style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <h2>Abilities</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                    {player.learnedAbilities.map((_, index) => renderAbilityButton(index))}
                </div>
                {isEnemyActing && <em style={{ color: '#8d6f55' }}>{currentEnemy.name} is preparing an action…</em>}
            </section>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h2>Battle Log</h2>
                <div
                    ref={logContainerRef}
                    style={{
                        backgroundColor: '#0f1c2e',
                        color: '#e0e6ed',
                        borderRadius: '8px',
                        padding: '1rem',
                        maxHeight: '300px',
                        overflowY: 'auto',
                    }}
                >
                    {logs.length === 0 && <p>No actions yet. Choose an ability to begin.</p>}
                    {logs.map(entry => (
                        <p key={entry.id} style={{ margin: '0.25rem 0' }}>{entry.message}</p>
                    ))}
                </div>
            </section>

            {turn.type === TurnType.End && (
                <section style={{ padding: '1rem', borderRadius: '8px', backgroundColor: '#1b3a4b', color: '#f6f7f8' }}>
                    <h2>Fight concluded</h2>
                    <p>{player.isDead() ? `${currentEnemy.name} is victorious.` : `${player.name} stands triumphant.`}</p>
                </section>
            )}
        </div>
    );
};

type CombatantCardProps = {
    title: string;
    subtitle: string;
    health: number;
    maxHealth: number;
    healthPercent: number;
    armor: number;
    damage: number;
};

const CombatantCard: React.FC<CombatantCardProps> = ({ title, subtitle, health, maxHealth, healthPercent, armor, damage }) => {
    return (
        <div style={{
            backgroundColor: '#102a43',
            color: '#f0f4f8',
            borderRadius: '8px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
        }}>
            <div>
                <h3 style={{ margin: 0 }}>{title}</h3>
                <small style={{ color: '#829ab1' }}>{subtitle}</small>
            </div>
            <div>
                <strong>Health:</strong> {health} / {maxHealth}
                <HealthBar percent={Math.max(0, Math.min(100, healthPercent))} />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <span><strong>Armor:</strong> {Math.round(armor)}</span>
                <span><strong>Damage:</strong> {Math.round(damage)}</span>
            </div>
        </div>
    );
};

const HealthBar: React.FC<{ percent: number }> = ({ percent }) => (
    <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#243b53',
        borderRadius: '4px',
        marginTop: '0.25rem',
    }}>
        <div style={{
            width: `${percent}%`,
            height: '100%',
            borderRadius: '4px',
            background: 'linear-gradient(90deg, #3ba796, #5ed0c0)',
            transition: 'width 0.3s ease',
        }} />
    </div>
);

export default Fight;

