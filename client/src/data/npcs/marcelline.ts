/**
 * NPC Data: Lady Marcelline Valerion
 * Jewel of the Triad, Mistress of Indulgence.
 * Beautiful, brilliant, and dangerous — collects people the way others collect jewels.
 */

import { NPC } from "../../types/npc";

const MARCELLINE_ID = "npc_marcelline";

const Marcelline: NPC = {
    id: MARCELLINE_ID,
    name: "Lady Marcelline",
    title: "Jewel of the Triad",
    portrait: "marcelline.png",
    personality: ["indulgent", "wickedly intelligent", "seductive", "amoral"],
    romanceable: true,
};

export { Marcelline, MARCELLINE_ID };
