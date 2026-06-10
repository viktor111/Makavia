/**
 * Chapter graph validation.
 * Every registered chapter must be a closed, fully reachable node graph:
 * no dangling references, no orphan nodes, no effects on unregistered NPCs.
 * Add every new chapter to REGISTERED_CHAPTERS — this suite is the safety
 * net that lets the saga grow to 100+ chapters without silent breaks.
 */

import { Chapter, StoryNode, StoryChoice } from '../../types/story';
import { Chapter1 } from './chapter1';
import { SERENYA_ID } from '../npcs/serenya';
import { MARCELLINE_ID } from '../npcs/marcelline';
import { ISADORA_ID } from '../npcs/isadora';

const REGISTERED_CHAPTERS: Chapter[] = [Chapter1];
const REGISTERED_CHAPTER_IDS = new Set(REGISTERED_CHAPTERS.map(c => c.id));
const RELATIONSHIP_NPC_IDS = new Set([SERENYA_ID, MARCELLINE_ID, ISADORA_ID]);

const outgoingNodeIds = (node: StoryNode): string[] => {
    const targets: (string | null | undefined)[] = [node.nextNodeId];
    if (node.type === 'choice') {
        node.choices.forEach((choice: StoryChoice) => targets.push(choice.nextNodeId));
    }
    if (node.type === 'combat') {
        targets.push(node.winNodeId, node.loseNodeId);
    }
    return targets.filter((t): t is string => typeof t === 'string' && t.length > 0);
};

describe.each(REGISTERED_CHAPTERS.map(c => [c.title, c] as const))('chapter graph: %s', (_title, chapter) => {
    const nodeIds = new Set(chapter.nodes.keys());

    test('start node exists', () => {
        expect(nodeIds.has(chapter.startNodeId)).toBe(true);
    });

    test('every node reference resolves', () => {
        const dangling: string[] = [];
        chapter.nodes.forEach(node => {
            outgoingNodeIds(node).forEach(target => {
                if (!nodeIds.has(target)) {
                    dangling.push(`${node.id} -> ${target}`);
                }
            });
        });
        expect(dangling).toEqual([]);
    });

    test('every node is reachable from the start', () => {
        const reached = new Set<string>();
        const queue = [chapter.startNodeId];
        while (queue.length > 0) {
            const id = queue.pop()!;
            if (reached.has(id)) continue;
            reached.add(id);
            const node = chapter.nodes.get(id);
            if (node) queue.push(...outgoingNodeIds(node));
        }
        const orphans = Array.from(nodeIds).filter(id => !reached.has(id));
        expect(orphans).toEqual([]);
    });

    test('the chapter can actually end (a checkpoint is reachable)', () => {
        const checkpoints = Array.from(chapter.nodes.values()).filter(n => n.type === 'checkpoint');
        expect(checkpoints.length).toBeGreaterThan(0);
    });

    test('combat nodes keep the story alive on both outcomes', () => {
        chapter.nodes.forEach(node => {
            if (node.type === 'combat') {
                expect(nodeIds.has(node.winNodeId)).toBe(true);
                // loseNodeId may be null (game over) but if set it must resolve
                if (node.loseNodeId !== null) {
                    expect(nodeIds.has(node.loseNodeId)).toBe(true);
                }
            }
        });
    });

    test('relationship effects only touch registered NPCs', () => {
        const unknown: string[] = [];
        chapter.nodes.forEach(node => {
            if (node.type !== 'choice') return;
            node.choices.forEach(choice => {
                (choice.effects ?? []).forEach(effect => {
                    if (
                        (effect.type === 'relationship' ||
                            effect.type === 'romanceStart' ||
                            effect.type === 'rivalryStart') &&
                        !RELATIONSHIP_NPC_IDS.has(effect.npcId)
                    ) {
                        unknown.push(`${node.id}/${choice.id}: ${effect.npcId}`);
                    }
                });
            });
        });
        expect(unknown).toEqual([]);
    });

    test('checkpoint chapter links point at registered chapters', () => {
        const broken: string[] = [];
        chapter.nodes.forEach(node => {
            if (node.type === 'checkpoint' && node.nextChapterId && !REGISTERED_CHAPTER_IDS.has(node.nextChapterId)) {
                broken.push(`${node.id} -> ${node.nextChapterId}`);
            }
        });
        expect(broken).toEqual([]);
    });

    test('choice nodes can never strand the player (some choice is always visible)', () => {
        // A choice node where every option is flag-gated could strand the player
        // if no flag combination satisfies any option. Enforce the simple safe rule:
        // conditioned options must be exhaustive over their flag (isSet true + false)
        // or be accompanied by at least one unconditioned option.
        const risky: string[] = [];
        chapter.nodes.forEach(node => {
            if (node.type !== 'choice') return;
            const unconditioned = node.choices.some(c => !c.conditions || c.conditions.length === 0);
            if (unconditioned) return;
            const flagConds = node.choices.flatMap(c => (c.conditions ?? []).filter(cond => cond.type === 'flag'));
            const flags = new Set(flagConds.map(c => c.type === 'flag' ? c.flag : ''));
            const exhaustive = Array.from(flags).every(flag => {
                const wantsSet = node.choices.some(c =>
                    (c.conditions ?? []).some(cond => cond.type === 'flag' && cond.flag === flag && cond.isSet === true));
                const wantsUnset = node.choices.some(c =>
                    (c.conditions ?? []).some(cond => cond.type === 'flag' && cond.flag === flag && cond.isSet === false));
                return wantsSet && wantsUnset;
            });
            if (!exhaustive) risky.push(node.id);
        });
        expect(risky).toEqual([]);
    });
});
