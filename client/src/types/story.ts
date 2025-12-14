/**
 * Story Mode Types
 * Defines the structure for chapters, nodes, choices, and conditions.
 */

import { MoralityTier } from "./morality";
import { RelationshipTier } from "./npc";

// Node types
type StoryNodeType = "narration" | "dialogue" | "choice" | "combat" | "checkpoint";

// Base node structure
interface BaseStoryNode {
    id: string;
    type: StoryNodeType;
    nextNodeId: string | null;  // null = end of chapter
}

// Narration node - scene descriptions
interface NarrationNode extends BaseStoryNode {
    type: "narration";
    text: string;
    mood?: "neutral" | "tense" | "romantic" | "dark" | "hopeful";
}

// Dialogue node - NPC speaks
interface DialogueNode extends BaseStoryNode {
    type: "dialogue";
    speakerId: string;
    text: string;
    emotion?: "neutral" | "angry" | "happy" | "sad" | "surprised" | "flirty";
}

// Choice node - player makes a decision
interface ChoiceNode extends BaseStoryNode {
    type: "choice";
    prompt?: string;  // Optional prompt before choices
    choices: StoryChoice[];
}

// Combat node - triggers battle
interface CombatNode extends BaseStoryNode {
    type: "combat";
    enemyType: string;         // e.g., "Knight", "Bandit" - will be generated
    enemyNameOverride?: string; // Optional custom name
    isBoss: boolean;
    introText: string;
    winNodeId: string;
    loseNodeId: string | null;  // null = game over
}

// Checkpoint node - marks story progress
interface CheckpointNode extends BaseStoryNode {
    type: "checkpoint";
    chapterComplete: boolean;
    nextChapterId?: string;
    summary: string;
}

// Union type for all nodes
type StoryNode = NarrationNode | DialogueNode | ChoiceNode | CombatNode | CheckpointNode;

// Choice structure
interface StoryChoice {
    id: string;
    label: string;
    nextNodeId: string;
    conditions?: ChoiceCondition[];   // Must all be true to show choice
    effects?: ChoiceEffect[];         // Applied when choice is selected
    tooltip?: string;                 // Hint about consequences
}

// Conditions for choices
type ChoiceCondition =
    | { type: "morality"; min?: number; max?: number }
    | { type: "moralityTier"; tier: MoralityTier; isNot?: boolean }
    | { type: "flag"; flag: string; isSet: boolean }
    | { type: "relationship"; npcId: string; min?: number; max?: number }
    | { type: "relationshipTier"; npcId: string; tier: RelationshipTier; isNot?: boolean }
    | { type: "attribute"; attribute: string; min: number };

// Effects from choices
type ChoiceEffect =
    | { type: "morality"; amount: number }
    | { type: "flag"; flag: string; value: boolean }
    | { type: "relationship"; npcId: string; amount: number }
    | { type: "romanceStart"; npcId: string }
    | { type: "rivalryStart"; npcId: string }
    | { type: "gold"; amount: number };

// Chapter structure
interface Chapter {
    id: string;
    title: string;
    description: string;
    nodes: Map<string, StoryNode>;
    startNodeId: string;
    requiredFlags?: string[];  // Flags needed to unlock this chapter
}

// Helper to create a chapter from an array of nodes
function createChapter(
    id: string,
    title: string,
    description: string,
    nodes: StoryNode[],
    startNodeId: string,
    requiredFlags?: string[]
): Chapter {
    const nodeMap = new Map<string, StoryNode>();
    nodes.forEach(node => nodeMap.set(node.id, node));

    return {
        id,
        title,
        description,
        nodes: nodeMap,
        startNodeId,
        requiredFlags,
    };
}

export {
    createChapter,
};

export type {
    StoryNodeType,
    StoryNode,
    NarrationNode,
    DialogueNode,
    ChoiceNode,
    CombatNode,
    CheckpointNode,
    StoryChoice,
    ChoiceCondition,
    ChoiceEffect,
    Chapter,
};
