/**
 * Story Engine
 * Core logic for navigating chapters, evaluating conditions, and applying effects.
 */

import { Player } from "./player";
import { Chapter, StoryNode, ChoiceCondition, ChoiceEffect, StoryChoice } from "./story";
import { clampMorality, getMoralityTier, MoralityTier } from "./morality";
import { NPCRelationship, getRelationshipTier, clampAffinity, RelationshipTier } from "./npc";

interface StoryState {
    moralityScore: number;
    storyFlags: Set<string>;
    npcRelationships: Map<string, NPCRelationship>;
    currentChapterId: string | null;
    currentNodeId: string | null;
    chaptersCompleted: string[];
}

function createInitialStoryState(): StoryState {
    return {
        moralityScore: 0,
        storyFlags: new Set(),
        npcRelationships: new Map(),
        currentChapterId: null,
        currentNodeId: null,
        chaptersCompleted: [],
    };
}

class StoryEngine {
    private state: StoryState;
    private chapters: Map<string, Chapter>;
    private player: Player | null;

    constructor(initialState?: StoryState) {
        this.state = initialState || createInitialStoryState();
        this.chapters = new Map();
        this.player = null;
    }

    setPlayer(player: Player): void {
        this.player = player;
    }

    getState(): StoryState {
        return { ...this.state };
    }

    getMoralityScore(): number {
        return this.state.moralityScore;
    }

    getMoralityTier(): MoralityTier {
        return getMoralityTier(this.state.moralityScore);
    }

    registerChapter(chapter: Chapter): void {
        this.chapters.set(chapter.id, chapter);
    }

    startChapter(chapterId: string): StoryNode | null {
        const chapter = this.chapters.get(chapterId);
        if (!chapter) {
            console.error(`Chapter not found: ${chapterId}`);
            return null;
        }

        // Check required flags
        if (chapter.requiredFlags) {
            for (const flag of chapter.requiredFlags) {
                if (!this.state.storyFlags.has(flag)) {
                    console.error(`Missing required flag: ${flag}`);
                    return null;
                }
            }
        }

        this.state.currentChapterId = chapterId;
        this.state.currentNodeId = chapter.startNodeId;

        return this.getCurrentNode();
    }

    getCurrentNode(): StoryNode | null {
        if (!this.state.currentChapterId || !this.state.currentNodeId) {
            return null;
        }

        const chapter = this.chapters.get(this.state.currentChapterId);
        if (!chapter) return null;

        return chapter.nodes.get(this.state.currentNodeId) || null;
    }

    getCurrentChapter(): Chapter | null {
        if (!this.state.currentChapterId) return null;
        return this.chapters.get(this.state.currentChapterId) || null;
    }

    advanceToNode(nodeId: string): StoryNode | null {
        if (!this.state.currentChapterId) return null;

        const chapter = this.chapters.get(this.state.currentChapterId);
        if (!chapter) return null;

        const node = chapter.nodes.get(nodeId);
        if (!node) {
            console.error(`Node not found: ${nodeId}`);
            return null;
        }

        this.state.currentNodeId = nodeId;
        return node;
    }

    advanceToNextNode(): StoryNode | null {
        const currentNode = this.getCurrentNode();
        if (!currentNode || !currentNode.nextNodeId) {
            return null;
        }

        return this.advanceToNode(currentNode.nextNodeId);
    }

    getAvailableChoices(choices: StoryChoice[]): StoryChoice[] {
        return choices.filter(choice => {
            if (!choice.conditions || choice.conditions.length === 0) {
                return true;
            }
            return choice.conditions.every(cond => this.evaluateCondition(cond));
        });
    }

    selectChoice(choice: StoryChoice): StoryNode | null {
        // Apply effects
        if (choice.effects) {
            choice.effects.forEach(effect => this.applyEffect(effect));
        }

        // Advance to next node
        return this.advanceToNode(choice.nextNodeId);
    }

    evaluateCondition(condition: ChoiceCondition): boolean {
        switch (condition.type) {
            case "morality":
                const score = this.state.moralityScore;
                if (condition.min !== undefined && score < condition.min) return false;
                if (condition.max !== undefined && score > condition.max) return false;
                return true;

            case "moralityTier":
                const tier = getMoralityTier(this.state.moralityScore);
                const matches = tier === condition.tier;
                return condition.isNot ? !matches : matches;

            case "flag":
                const hasFlag = this.state.storyFlags.has(condition.flag);
                return condition.isSet ? hasFlag : !hasFlag;

            case "relationship":
                const rel = this.state.npcRelationships.get(condition.npcId);
                if (!rel) return false;
                if (condition.min !== undefined && rel.affinity < condition.min) return false;
                if (condition.max !== undefined && rel.affinity > condition.max) return false;
                return true;

            case "relationshipTier":
                const relationship = this.state.npcRelationships.get(condition.npcId);
                if (!relationship) return false;
                const relTier = getRelationshipTier(relationship);
                const tierMatches = relTier === condition.tier;
                return condition.isNot ? !tierMatches : tierMatches;

            case "attribute":
                if (!this.player) return false;
                const attrs = this.player.getAttributes();
                const attr = attrs.find(a => a.attribute.toString().toLowerCase() === condition.attribute.toLowerCase());
                return attr ? attr.value >= condition.min : false;

            default:
                return true;
        }
    }

    applyEffect(effect: ChoiceEffect): void {
        switch (effect.type) {
            case "morality":
                this.state.moralityScore = clampMorality(this.state.moralityScore + effect.amount);
                break;

            case "flag":
                if (effect.value) {
                    this.state.storyFlags.add(effect.flag);
                } else {
                    this.state.storyFlags.delete(effect.flag);
                }
                break;

            case "relationship":
                const rel = this.state.npcRelationships.get(effect.npcId);
                if (rel) {
                    rel.affinity = clampAffinity(rel.affinity + effect.amount);
                    rel.hasMet = true;
                }
                break;

            case "romanceStart":
                const romRel = this.state.npcRelationships.get(effect.npcId);
                if (romRel && romRel.romanceAvailable) {
                    romRel.romanceActive = true;
                    romRel.isRival = false;
                }
                break;

            case "rivalryStart":
                const rivRel = this.state.npcRelationships.get(effect.npcId);
                if (rivRel) {
                    rivRel.isRival = true;
                    rivRel.romanceActive = false;
                }
                break;

            case "gold":
                if (this.player) {
                    this.player.gold = Math.max(0, this.player.gold + effect.amount);
                }
                break;
        }
    }

    registerNPCRelationship(npcId: string, romanceAvailable: boolean = false): void {
        if (!this.state.npcRelationships.has(npcId)) {
            this.state.npcRelationships.set(npcId, {
                npcId,
                affinity: 0,
                hasMet: false,
                romanceAvailable,
                romanceActive: false,
                isRival: false,
            });
        }
    }

    getRelationship(npcId: string): NPCRelationship | null {
        return this.state.npcRelationships.get(npcId) || null;
    }

    hasFlag(flag: string): boolean {
        return this.state.storyFlags.has(flag);
    }

    completeChapter(): void {
        if (this.state.currentChapterId && !this.state.chaptersCompleted.includes(this.state.currentChapterId)) {
            this.state.chaptersCompleted.push(this.state.currentChapterId);
        }
    }

    isChapterCompleted(chapterId: string): boolean {
        return this.state.chaptersCompleted.includes(chapterId);
    }

    getCompletedChapters(): string[] {
        return [...this.state.chaptersCompleted];
    }
}

export { StoryEngine, createInitialStoryState };
export type { StoryState };
