import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button';
import { useGameContext } from '../context/game';
import { BattleEngine, BattleLogEntry } from '../types/battleEngine';
import { AbilityType } from '../types/abilities';
import { PlayerClassEnum } from '../types/classes';
import { Turn, TurnType } from '../types/turn';
import { EnemyGenerator } from '../types/enemies';

const Fight: React.FC = () => {
    const navigate = useNavigate();
    const {
        player,
        currentEnemy,
        setCurrentEnemy,
        isInStoryCombat,
        setStoryCombatResult,
    } = useGameContext();
    const engineRef = useRef<BattleEngine | null>(null);
    const enemyActionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [turn, setTurn] = useState<Turn | null>(null);
    const [logs, setLogs] = useState<BattleLogEntry[]>([]);
    const [isEnemyActing, setIsEnemyActing] = useState(false);
    const logContainerRef = useRef<HTMLDivElement | null>(null);
    const [battleOutcome, setBattleOutcome] = useState<'pending' | 'victory' | 'defeat'>('pending');

    // Dungeon mode: make sure there is an enemy to fight (story mode sets its own
    // before navigating here, and the previous one is cleared after a story battle).
    useEffect(() => {
        if (player && !currentEnemy && !isInStoryCombat) {
            const enemyGenerator = new EnemyGenerator();
            setCurrentEnemy(enemyGenerator.generateEnemies(player.worldTier, 1)[0]);
        }
    }, [player, currentEnemy, isInStoryCombat, setCurrentEnemy]);

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
            // Track battle outcome for story mode integration
            setBattleOutcome(currentEnemy.isDead() ? 'victory' : 'defeat');
            return;
        }

        setIsEnemyActing(true);
        enemyActionTimeout.current = setTimeout(() => {
            const enemyResult = engine.enemyTurn();
            setLogs(prev => [...prev, ...enemyResult.logs]);
            setTurn(new Turn(engine.getTurn().count, engine.getTurn().type));
            setIsEnemyActing(false);
            enemyActionTimeout.current = null;

            // Track defeat if player dies
            if (enemyResult.battleEnded && player.isDead()) {
                setBattleOutcome('defeat');
            }
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
            <div key={ability.name} className="mk-ability">
                <Button
                    label={ability.name}
                    onClick={() => handleAbilityClick(index)}
                    disabled={isDisabled}
                />
                <span className="mk-label mk-ability__type">{abilityTypeLabel}</span>
                <span className="mk-ability__desc">{ability.description}</span>
            </div>
        );
    };

    if (!player || !currentEnemy || !turn) {
        return (
            <main className="mk-empty">
                <div className="mk-panel mk-rise">
                    <h2>Preparing battle…</h2>
                </div>
            </main>
        );
    }

    const playerHealthPercent = player.maxHealth ? Math.round((player.health / player.maxHealth) * 100) : 0;
    const enemyHealthPercent = currentEnemy.maxHealth ? Math.round((currentEnemy.health / currentEnemy.maxHealth) * 100) : 0;

    return (
        <main className="mk-fight">
            <header className="mk-fight__head mk-rise">
                <h1 className="mk-fight__title">{player.name} vs {currentEnemy.name}</h1>
                <div className="mk-turn">
                    Turn {turn.count} — <strong>
                        {turn.type === TurnType.Player
                            ? `${player.name}'s turn`
                            : turn.type === TurnType.Enemy
                                ? `${currentEnemy.name}'s turn`
                                : 'Battle complete'}
                    </strong>
                </div>
            </header>

            <section className="mk-arena mk-rise-2">
                <CombatantCard
                    title={player.name}
                    subtitle={`Level ${player.level} ${PlayerClassEnum[player.class]}`}
                    health={player.health}
                    maxHealth={player.maxHealth}
                    healthPercent={playerHealthPercent}
                    armor={player.armor}
                    damage={player.damage}
                />
                <span className="mk-versus" aria-hidden="true">⚔</span>
                <CombatantCard
                    title={currentEnemy.name}
                    subtitle={currentEnemy.isBoss ? 'Boss' : 'Enemy'}
                    health={currentEnemy.health}
                    maxHealth={currentEnemy.maxHealth}
                    healthPercent={enemyHealthPercent}
                    armor={currentEnemy.armor}
                    damage={currentEnemy.damage}
                    isFoe
                />
            </section>

            <section className="mk-rise-3">
                <h2 className="mk-label" style={{ fontSize: '0.8rem', marginBottom: '0.9rem' }}>Abilities</h2>
                <div className="mk-abilities">
                    {player.learnedAbilities.map((_, index) => renderAbilityButton(index))}
                </div>
                {isEnemyActing && <em className="mk-acting">{currentEnemy.name} is preparing an action…</em>}
            </section>

            <section className="mk-rise-4">
                <h2 className="mk-label" style={{ fontSize: '0.8rem', marginBottom: '0.9rem' }}>Battle Log</h2>
                <div ref={logContainerRef} className="mk-log">
                    {logs.length === 0 && <p>No actions yet. Choose an ability to begin.</p>}
                    {logs.map(entry => (
                        <p key={entry.id}>{entry.message}</p>
                    ))}
                </div>
            </section>

            {turn.type === TurnType.End && (
                <section className={`mk-panel mk-banner mk-rise ${battleOutcome === 'victory' ? 'mk-corners mk-banner--victory' : 'mk-corners mk-corners--blood mk-banner--defeat'}`}>
                    <h2>{battleOutcome === 'victory' ? '🏆 Victory!' : '💀 Defeat'}</h2>
                    <p>{player.isDead() ? `${currentEnemy.name} is victorious.` : `${player.name} stands triumphant.`}</p>

                    {isInStoryCombat && (
                        <button
                            className="mk-btn mk-btn--primary"
                            style={{ marginTop: '1rem' }}
                            onClick={() => {
                                setStoryCombatResult(currentEnemy.isDead() ? 'victory' : 'defeat');
                                navigate('/story');
                            }}
                        >
                            Return to Story →
                        </button>
                    )}
                </section>
            )}
        </main>
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
    isFoe?: boolean;
};

const CombatantCard: React.FC<CombatantCardProps> = ({ title, subtitle, health, maxHealth, healthPercent, armor, damage, isFoe }) => {
    return (
        <div className={`mk-panel mk-card mk-corners ${isFoe ? 'mk-corners--blood' : ''}`}>
            <div>
                <h3 className="mk-card__name">{title}</h3>
                <span className="mk-card__sub">{subtitle}</span>
            </div>
            <div>
                <div className="mk-card__hp">
                    <span className="mk-label">Health</span>
                    <span>{Math.round(health)} / {Math.round(maxHealth)}</span>
                </div>
                <div className="mk-bar" style={{ marginTop: '0.35rem' }}>
                    <div
                        className="mk-bar__fill"
                        style={{ width: `${Math.max(0, Math.min(100, healthPercent))}%` }}
                    />
                </div>
            </div>
            <div className="mk-card__stats">
                <span className="mk-chip"><span className="mk-label">Armor</span> {Math.round(armor)}</span>
                <span className="mk-chip"><span className="mk-label">Damage</span> {Math.round(damage)}</span>
            </div>
        </div>
    );
};

export default Fight;
