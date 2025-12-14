/**
 * Story Mode Route
 * Main story experience with narrative, choices, and combat.
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/game';
import { StoryEngine } from '../types/storyEngine';
import { StoryNode, ChoiceNode, DialogueNode, NarrationNode, CombatNode, CheckpointNode, StoryChoice } from '../types/story';
import { NPC, createRelationship } from '../types/npc';
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
import { Chapter2, CHAPTER_2_ID } from '../data/chapters/chapter2';
import { Chapter3, CHAPTER_3_ID } from '../data/chapters/chapter3';
import { Elena, ELENA_ID } from '../data/npcs/elena';
import { Marcus, MARCUS_ID } from '../data/npcs/marcus';

// NPC lookup
const NPC_LOOKUP: Record<string, NPC> = {
    [ELENA_ID]: Elena,
    [MARCUS_ID]: Marcus,
};

const Story: React.FC = () => {
    const navigate = useNavigate();
    const {
        player,
        setPlayer,
        setCurrentEnemy,
        storyState,
        updateStoryState,
        initializeStoryEngine,
        isInStoryCombat,
        setIsInStoryCombat,
        storyCombatWinNodeId,
        storyCombatLoseNodeId,
        setStoryCombatNodes,
    } = useGameContext();

    const engineRef = useRef<StoryEngine | null>(null);
    const [currentNode, setCurrentNode] = useState<StoryNode | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const [availableChoices, setAvailableChoices] = useState<StoryChoice[]>([]);

    // Initialize story engine and player
    useEffect(() => {
        if (isInitialized) return;

        // Initialize player if not set
        if (!player) {
            const newPlayer = PlayerTestData.generate();
            setPlayer(newPlayer);
        }

        // Initialize story engine
        const engine = initializeStoryEngine();
        engineRef.current = engine;

        // Register chapters
        engine.registerChapter(Chapter1);
        engine.registerChapter(Chapter2);
        engine.registerChapter(Chapter3);

        // Register NPC relationships
        engine.registerNPCRelationship(ELENA_ID, true);
        engine.registerNPCRelationship(MARCUS_ID, false);

        // Set player reference
        if (player) {
            engine.setPlayer(player);
        }

        // Start first chapter
        const startNode = engine.startChapter(CHAPTER_1_ID);
        if (startNode) {
            setCurrentNode(startNode);
            syncStateFromEngine(engine);
        }

        setIsInitialized(true);
    }, [player, setPlayer, initializeStoryEngine, isInitialized]);

    // Update player reference when it changes
    useEffect(() => {
        if (engineRef.current && player) {
            engineRef.current.setPlayer(player);
        }
    }, [player]);

    // Handle combat return
    useEffect(() => {
        if (isInStoryCombat && player && engineRef.current) {
            // Check if we're returning from combat
            const currentEnemy = engineRef.current.getState().currentNodeId;
            if (currentEnemy && player.isDead()) {
                // Player lost
                if (storyCombatLoseNodeId) {
                    const nextNode = engineRef.current.advanceToNode(storyCombatLoseNodeId);
                    setCurrentNode(nextNode);
                }
                setIsInStoryCombat(false);
            }
        }
    }, [player, isInStoryCombat, storyCombatLoseNodeId, setIsInStoryCombat]);

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

    const handleCombatReturn = useCallback((won: boolean) => {
        if (!engineRef.current) return;

        const nodeId = won ? storyCombatWinNodeId : storyCombatLoseNodeId;
        if (nodeId) {
            const nextNode = engineRef.current.advanceToNode(nodeId);
            if (nextNode) {
                setCurrentNode(nextNode);
                syncStateFromEngine(engineRef.current);
            }
        }

        setIsInStoryCombat(false);
    }, [storyCombatWinNodeId, storyCombatLoseNodeId, setIsInStoryCombat, syncStateFromEngine]);

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
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#0a0a1a',
                color: '#e0e6ed',
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Loading Story...</h2>
                    <p style={{ color: '#888' }}>Preparing your adventure</p>
                </div>
            </div>
        );
    }

    // Get current chapter info
    const currentChapter = engineRef.current?.getCurrentChapter();

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#0a0a1a',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
        }}>
            {/* Header */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
                backgroundColor: '#1a1a2e',
                borderRadius: '8px',
            }}>
                <div>
                    <h1 style={{ margin: 0, color: '#f0f4f8', fontSize: '1.5rem' }}>
                        {currentChapter?.title || 'Story Mode'}
                    </h1>
                    {player && (
                        <small style={{ color: '#888' }}>
                            {player.name} • Level {player.level} • {player.gold} Gold
                        </small>
                    )}
                </div>
                <MoralityIndicator score={storyState.moralityScore} compact />
            </header>

            {/* Main content area */}
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: '800px',
                margin: '0 auto',
                width: '100%',
            }}>
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
                    <div style={{
                        backgroundColor: '#1a1a2e',
                        borderRadius: '12px',
                        padding: '2rem',
                        textAlign: 'center',
                        border: '2px solid #dc143c',
                    }}>
                        <h2 style={{ color: '#dc143c', margin: '0 0 1rem 0' }}>⚔️ Combat!</h2>
                        <p style={{ color: '#e0e6ed', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                            {(currentNode as CombatNode).introText}
                        </p>
                        <button
                            onClick={() => handleStartCombat(currentNode as CombatNode)}
                            style={{
                                backgroundColor: '#dc143c',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                padding: '1rem 2rem',
                                cursor: 'pointer',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                            }}
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
            </main>

            {/* Footer with morality details */}
            <footer style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '1rem',
            }}>
                <MoralityIndicator score={storyState.moralityScore} />
            </footer>
        </div>
    );
};

export default Story;
