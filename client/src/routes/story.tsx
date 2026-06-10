/**
 * Story Mode Route
 * Main story experience with narrative, choices, and combat.
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/game';
import { StoryEngine } from '../types/storyEngine';
import { StoryNode, ChoiceNode, DialogueNode, NarrationNode, CombatNode, CheckpointNode, StoryChoice } from '../types/story';
import { NPC } from '../types/npc';
import { EnemyGenerator } from '../types/enemies';
import { PlayerTestData } from '../testData/playerTestData';

// Components
import DialogueBox from '../components/story/DialogueBox';
import ChoicePanel from '../components/story/ChoicePanel';
import NarratorBox from '../components/story/NarratorBox';
import MoralityIndicator from '../components/story/MoralityIndicator';
import CheckpointBox from '../components/story/CheckpointBox';

// Data
import { Chapter1, CHAPTER_1_ID } from '../data/chapters/chapter1';
import { Serenya, SERENYA_ID } from '../data/npcs/serenya';
import { Marcelline, MARCELLINE_ID } from '../data/npcs/marcelline';
import { Isadora, ISADORA_ID } from '../data/npcs/isadora';
import { Hobb, HOBB_ID } from '../data/npcs/hobb';
import { Fenwick, FENWICK_ID } from '../data/npcs/fenwick';
import { Caelis, CAELIS_ID } from '../data/npcs/caelis';

// NPC lookup
const NPC_LOOKUP: Record<string, NPC> = {
    [SERENYA_ID]: Serenya,
    [MARCELLINE_ID]: Marcelline,
    [ISADORA_ID]: Isadora,
    [HOBB_ID]: Hobb,
    [FENWICK_ID]: Fenwick,
    [CAELIS_ID]: Caelis,
};

const Story: React.FC = () => {
    const navigate = useNavigate();
    const {
        player,
        setPlayer,
        currentEnemy,
        setCurrentEnemy,
        storyState,
        updateStoryState,
        initializeStoryEngine,
        isInStoryCombat,
        setIsInStoryCombat,
        storyCombatWinNodeId,
        storyCombatLoseNodeId,
        setStoryCombatNodes,
        storyCombatResult,
        setStoryCombatResult,
    } = useGameContext();

    const engineRef = useRef<StoryEngine | null>(null);
    const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [availableChoices, setAvailableChoices] = useState<StoryChoice[]>([]);

    const syncStateFromEngine = useCallback((engine: StoryEngine) => {
        const newState = engine.getState();
        updateStoryState({
            moralityScore: newState.moralityScore,
            storyFlags: newState.storyFlags,
            npcRelationships: newState.npcRelationships,
            currentChapterId: newState.currentChapterId,
            currentNodeId: newState.currentNodeId,
            chaptersCompleted: newState.chaptersCompleted,
        });
    }, [updateStoryState]);

    // Initialize the story engine, then either resume the story where it left
    // off (the engine outlives this component via context), consume a pending
    // combat result, or start the first chapter fresh.
    useEffect(() => {
        if (isInitialized) return;

        // Initialize player if not set
        if (!player) {
            const newPlayer = PlayerTestData.generate();
            setPlayer(newPlayer);
        }

        const engine = initializeStoryEngine();
        engineRef.current = engine;

        // Registration is idempotent, safe to repeat on every mount
        engine.registerChapter(Chapter1);
        engine.registerNPCRelationship(SERENYA_ID, true);
        engine.registerNPCRelationship(MARCELLINE_ID, true);
        engine.registerNPCRelationship(ISADORA_ID, false);

        if (player) {
            engine.setPlayer(player);
        }

        if (isInStoryCombat) {
            // Returning from a story battle. The Return to Story button reports
            // an explicit result; if the battle was abandoned via the nav bar,
            // infer one from who is left standing (null means the battle never
            // ended, which re-shows the combat node so it can be retried).
            const result = storyCombatResult
                ?? (player && player.isDead() ? 'defeat' : null)
                ?? (currentEnemy && currentEnemy.isDead() ? 'victory' : null);
            if (result && player) {
                player.health = player.maxHealth;
            }
            const outcomeNodeId = result === 'victory' ? storyCombatWinNodeId
                : result === 'defeat' ? storyCombatLoseNodeId
                    : null;
            // A missing outcome node (e.g. a combat node with no lose branch)
            // falls back to the combat node itself: a retry.
            const nextNode = (outcomeNodeId ? engine.advanceToNode(outcomeNodeId) : null) ?? engine.getCurrentNode();
            setCurrentNode(nextNode);
            setIsInStoryCombat(false);
            setStoryCombatResult(null);
            setCurrentEnemy(null);
        } else if (engine.getCurrentNode()) {
            // The engine is already mid-story (user navigated away and back):
            // resume at the current node.
            setCurrentNode(engine.getCurrentNode());
        } else {
            setCurrentNode(engine.startChapter(CHAPTER_1_ID));
        }

        syncStateFromEngine(engine);
        setIsInitialized(true);
    }, [
        isInitialized,
        player,
        setPlayer,
        initializeStoryEngine,
        isInStoryCombat,
        setIsInStoryCombat,
        storyCombatResult,
        setStoryCombatResult,
        storyCombatWinNodeId,
        storyCombatLoseNodeId,
        currentEnemy,
        setCurrentEnemy,
        syncStateFromEngine,
    ]);

    // Update player reference when it changes
    useEffect(() => {
        if (engineRef.current && player) {
            engineRef.current.setPlayer(player);
        }
    }, [player]);

    const handleContinue = useCallback(() => {
        if (!engineRef.current || !currentNode) return;

        const nextNode = engineRef.current.advanceToNextNode();
        if (nextNode) {
            setCurrentNode(nextNode);
            syncStateFromEngine(engineRef.current);
        }
    }, [currentNode, syncStateFromEngine]);

    const handleChoice = useCallback((choice: StoryChoice) => {
        if (!engineRef.current) return;

        const nextNode = engineRef.current.selectChoice(choice);
        if (nextNode) {
            setCurrentNode(nextNode);
            syncStateFromEngine(engineRef.current);
        }
    }, [syncStateFromEngine]);

    const handleStartCombat = useCallback((combatNode: CombatNode) => {
        if (!player) return;

        // Story battles always start at full strength — the outcome decides a
        // narrative branch, so it must never be a sham fight at 0 HP.
        player.health = player.maxHealth;

        // Generate enemy based on type
        const enemyGenerator = new EnemyGenerator();
        const enemies = enemyGenerator.generateEnemies(player.worldTier, 1);
        const enemy = enemies[0];

        // Override name if specified
        if (combatNode.enemyNameOverride) {
            enemy.name = combatNode.enemyNameOverride;
        }

        // Set combat state
        setCurrentEnemy(enemy);
        setStoryCombatNodes(combatNode.winNodeId, combatNode.loseNodeId);
        setIsInStoryCombat(true);

        // Navigate to fight
        navigate('/fight');
    }, [player, setCurrentEnemy, setStoryCombatNodes, setIsInStoryCombat, navigate]);

    const handleNextChapter = useCallback((nextChapterId: string) => {
        if (!engineRef.current) return;

        engineRef.current.completeChapter();
        const startNode = engineRef.current.startChapter(nextChapterId);
        if (startNode) {
            setCurrentNode(startNode);
            syncStateFromEngine(engineRef.current);
        }
    }, [syncStateFromEngine]);

    // Update available choices when on a choice node
    useEffect(() => {
        if (currentNode?.type === 'choice' && engineRef.current) {
            const choiceNode = currentNode as ChoiceNode;
            const available = engineRef.current.getAvailableChoices(choiceNode.choices);
            setAvailableChoices(available);
        }
    }, [currentNode]);

    // Loading state
    if (!isInitialized || !currentNode) {
        return (
            <main className="mk-empty">
                <div className="mk-panel mk-rise" style={{ textAlign: 'center' }}>
                    <h2>Loading Story...</h2>
                    <p style={{ fontStyle: 'italic', color: 'var(--parchment-dim)' }}>Preparing your adventure</p>
                </div>
            </main>
        );
    }

    // Get current chapter info
    const currentChapter = engineRef.current?.getCurrentChapter();

    return (
        <div className="mk-story">
            {/* Header */}
            <header className="mk-story__head">
                <div>
                    <h1 className="mk-story__chapter">
                        {currentChapter?.title || 'Story Mode'}
                    </h1>
                    {player && (
                        <p className="mk-story__player">
                            {player.name} · Level {player.level} · {player.gold} Gold
                        </p>
                    )}
                </div>
                <MoralityIndicator score={storyState.moralityScore} compact />
            </header>

            {/* Main content area — keyed by node so each page rises from the ink */}
            <main className="mk-story__main">
                <div key={currentNode.id} className="mk-rise">
                    {/* Narration node */}
                    {currentNode.type === 'narration' && (
                        <NarratorBox
                            text={(currentNode as NarrationNode).text}
                            mood={(currentNode as NarrationNode).mood}
                            onContinue={handleContinue}
                        />
                    )}

                    {/* Dialogue node */}
                    {currentNode.type === 'dialogue' && (
                        <DialogueBox
                            speaker={NPC_LOOKUP[(currentNode as DialogueNode).speakerId] || null}
                            text={(currentNode as DialogueNode).text}
                            emotion={(currentNode as DialogueNode).emotion}
                            onContinue={handleContinue}
                        />
                    )}

                    {/* Choice node */}
                    {currentNode.type === 'choice' && (
                        <ChoicePanel
                            prompt={(currentNode as ChoiceNode).prompt}
                            choices={availableChoices}
                            onSelect={handleChoice}
                        />
                    )}

                    {/* Combat node */}
                    {currentNode.type === 'combat' && (
                        <div className="mk-combat-call mk-corners mk-corners--blood">
                            <h2>⚔ Combat</h2>
                            <p>{(currentNode as CombatNode).introText}</p>
                            <button
                                className="mk-btn mk-btn--blood"
                                onClick={() => handleStartCombat(currentNode as CombatNode)}
                            >
                                Begin Battle →
                            </button>
                        </div>
                    )}

                    {/* Checkpoint node */}
                    {currentNode.type === 'checkpoint' && (
                        <CheckpointBox
                            chapterTitle={currentChapter?.title || 'Chapter Complete'}
                            summary={(currentNode as CheckpointNode).summary}
                            onContinue={
                                (currentNode as CheckpointNode).nextChapterId
                                    ? () => handleNextChapter((currentNode as CheckpointNode).nextChapterId!)
                                    : undefined
                            }
                            isGameEnd={!(currentNode as CheckpointNode).nextChapterId}
                        />
                    )}
                </div>
            </main>

            {/* Footer with morality details */}
            <footer className="mk-story__foot">
                <MoralityIndicator score={storyState.moralityScore} />
            </footer>
        </div>
    );
};

export default Story;
