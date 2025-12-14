import React, { createContext, useState, useContext, useRef, useCallback } from 'react';
import { Player } from '../types/player';
import { Enemy } from '../types/enemies';
import { StoryEngine, StoryState, createInitialStoryState } from '../types/storyEngine';
import { NPCRelationship } from '../types/npc';

interface GameContextProps {
    // Existing game state
    player: Player | null;
    currentEnemy: Enemy | null;
    setPlayer: (player: Player | null) => void;
    setCurrentEnemy: (enemy: Enemy | null) => void;

    // Story mode state
    storyState: StoryState;
    storyEngine: StoryEngine | null;
    initializeStoryEngine: () => StoryEngine;
    updateStoryState: (newState: Partial<StoryState>) => void;
    getMoralityScore: () => number;
    adjustMorality: (amount: number) => void;
    setFlag: (flag: string, value: boolean) => void;
    hasFlag: (flag: string) => boolean;
    getRelationship: (npcId: string) => NPCRelationship | null;

    // Story combat integration
    isInStoryCombat: boolean;
    setIsInStoryCombat: (value: boolean) => void;
    storyCombatWinNodeId: string | null;
    storyCombatLoseNodeId: string | null;
    setStoryCombatNodes: (winNodeId: string, loseNodeId: string | null) => void;
}

export const GameContext = createContext<GameContextProps>({
    player: null,
    currentEnemy: null,
    setPlayer: () => { },
    setCurrentEnemy: () => { },

    storyState: createInitialStoryState(),
    storyEngine: null,
    initializeStoryEngine: () => new StoryEngine(),
    updateStoryState: () => { },
    getMoralityScore: () => 0,
    adjustMorality: () => { },
    setFlag: () => { },
    hasFlag: () => false,
    getRelationship: () => null,

    isInStoryCombat: false,
    setIsInStoryCombat: () => { },
    storyCombatWinNodeId: null,
    storyCombatLoseNodeId: null,
    setStoryCombatNodes: () => { },
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [player, setPlayer] = useState<Player | null>(null);
    const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);

    // Story mode state
    const [storyState, setStoryState] = useState<StoryState>(createInitialStoryState());
    const storyEngineRef = useRef<StoryEngine | null>(null);

    // Story combat state
    const [isInStoryCombat, setIsInStoryCombat] = useState(false);
    const [storyCombatWinNodeId, setStoryCombatWinNodeId] = useState<string | null>(null);
    const [storyCombatLoseNodeId, setStoryCombatLoseNodeId] = useState<string | null>(null);

    const initializeStoryEngine = useCallback((): StoryEngine => {
        if (!storyEngineRef.current) {
            storyEngineRef.current = new StoryEngine(storyState);
        }
        return storyEngineRef.current;
    }, [storyState]);

    const updateStoryState = useCallback((newState: Partial<StoryState>) => {
        setStoryState(prev => ({ ...prev, ...newState }));
    }, []);

    const getMoralityScore = useCallback((): number => {
        return storyState.moralityScore;
    }, [storyState.moralityScore]);

    const adjustMorality = useCallback((amount: number) => {
        setStoryState(prev => ({
            ...prev,
            moralityScore: Math.max(-100, Math.min(100, prev.moralityScore + amount)),
        }));
    }, []);

    const setFlag = useCallback((flag: string, value: boolean) => {
        setStoryState(prev => {
            const newFlags = new Set(prev.storyFlags);
            if (value) {
                newFlags.add(flag);
            } else {
                newFlags.delete(flag);
            }
            return { ...prev, storyFlags: newFlags };
        });
    }, []);

    const hasFlag = useCallback((flag: string): boolean => {
        return storyState.storyFlags.has(flag);
    }, [storyState.storyFlags]);

    const getRelationship = useCallback((npcId: string): NPCRelationship | null => {
        return storyState.npcRelationships.get(npcId) || null;
    }, [storyState.npcRelationships]);

    const setStoryCombatNodes = useCallback((winNodeId: string, loseNodeId: string | null) => {
        setStoryCombatWinNodeId(winNodeId);
        setStoryCombatLoseNodeId(loseNodeId);
    }, []);

    return (
        <GameContext.Provider value={{
            player,
            setPlayer,
            currentEnemy,
            setCurrentEnemy,

            storyState,
            storyEngine: storyEngineRef.current,
            initializeStoryEngine,
            updateStoryState,
            getMoralityScore,
            adjustMorality,
            setFlag,
            hasFlag,
            getRelationship,

            isInStoryCombat,
            setIsInStoryCombat,
            storyCombatWinNodeId,
            storyCombatLoseNodeId,
            setStoryCombatNodes,
        }}>
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
