/**
 * Morality System
 * Tracks player alignment on a Good ↔ Evil spectrum.
 * Range: -100 (Villainous) to +100 (Heroic)
 */

enum MoralityTier {
    Villainous = "Villainous",  // -100 to -61
    Evil = "Evil",              // -60 to -21
    Neutral = "Neutral",        // -20 to +20
    Good = "Good",              // +21 to +60
    Heroic = "Heroic",          // +61 to +100
}

const MORALITY_MIN = -100;
const MORALITY_MAX = 100;

function clampMorality(value: number): number {
    return Math.max(MORALITY_MIN, Math.min(MORALITY_MAX, value));
}

function getMoralityTier(score: number): MoralityTier {
    if (score <= -61) return MoralityTier.Villainous;
    if (score <= -21) return MoralityTier.Evil;
    if (score <= 20) return MoralityTier.Neutral;
    if (score <= 60) return MoralityTier.Good;
    return MoralityTier.Heroic;
}

function getMoralityColor(tier: MoralityTier): string {
    switch (tier) {
        case MoralityTier.Villainous: return "#8b0000";  // Dark red
        case MoralityTier.Evil: return "#dc143c";        // Crimson
        case MoralityTier.Neutral: return "#888888";     // Gray
        case MoralityTier.Good: return "#4169e1";        // Royal blue
        case MoralityTier.Heroic: return "#ffd700";      // Gold
    }
}

function getMoralityLabel(tier: MoralityTier): string {
    switch (tier) {
        case MoralityTier.Villainous: return "Villainous";
        case MoralityTier.Evil: return "Wicked";
        case MoralityTier.Neutral: return "Neutral";
        case MoralityTier.Good: return "Virtuous";
        case MoralityTier.Heroic: return "Heroic";
    }
}

export {
    MoralityTier,
    MORALITY_MIN,
    MORALITY_MAX,
    clampMorality,
    getMoralityTier,
    getMoralityColor,
    getMoralityLabel,
};
