/**
 * NPC and Relationship System
 * Tracks NPCs and player's relationship with each.
 */

import { Guid } from "../helpers/guid";

enum RelationshipTier {
    Hostile = "Hostile",    // -100 to -51
    Cold = "Cold",          // -50 to -21
    Neutral = "Neutral",    // -20 to +20
    Friendly = "Friendly",  // +21 to +50
    Close = "Close",        // +51 to +80
    Romance = "Romance",    // +81 to +100 (if romance flag set)
    Rival = "Rival",        // +51 to +100 (if rival flag set)
}

interface NPCRelationship {
    npcId: string;
    affinity: number;          // -100 to +100
    hasMet: boolean;
    romanceAvailable: boolean;
    romanceActive: boolean;
    isRival: boolean;
}

interface NPC {
    id: string;
    name: string;
    title: string;            // e.g., "Knight of the Silver Order"
    portrait: string;         // Image filename
    personality: string[];    // Traits like "honorable", "stern"
    romanceable: boolean;
}

function createNPC(
    name: string,
    title: string,
    portrait: string,
    personality: string[],
    romanceable: boolean = false
): NPC {
    return {
        id: Guid.generateGUID(),
        name,
        title,
        portrait,
        personality,
        romanceable,
    };
}

function createRelationship(npcId: string, romanceAvailable: boolean = false): NPCRelationship {
    return {
        npcId,
        affinity: 0,
        hasMet: false,
        romanceAvailable,
        romanceActive: false,
        isRival: false,
    };
}

function getRelationshipTier(relationship: NPCRelationship): RelationshipTier {
    const { affinity, romanceActive, isRival } = relationship;

    if (affinity <= -51) return RelationshipTier.Hostile;
    if (affinity <= -21) return RelationshipTier.Cold;
    if (affinity <= 20) return RelationshipTier.Neutral;
    if (affinity <= 50) return RelationshipTier.Friendly;

    // High affinity branches
    if (romanceActive) return RelationshipTier.Romance;
    if (isRival) return RelationshipTier.Rival;
    return RelationshipTier.Close;
}

function clampAffinity(value: number): number {
    return Math.max(-100, Math.min(100, value));
}

function adjustAffinity(relationship: NPCRelationship, amount: number): NPCRelationship {
    return {
        ...relationship,
        affinity: clampAffinity(relationship.affinity + amount),
    };
}

export {
    RelationshipTier,
    createNPC,
    createRelationship,
    getRelationshipTier,
    clampAffinity,
    adjustAffinity,
};

export type { NPC, NPCRelationship };
