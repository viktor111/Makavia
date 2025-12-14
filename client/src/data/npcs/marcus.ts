/**
 * NPC Data: Marcus
 * A mysterious merchant with questionable morals.
 */

import { NPC } from "../../types/npc";

const MARCUS_ID = "npc_marcus";

const Marcus: NPC = {
    id: MARCUS_ID,
    name: "Marcus",
    title: "Traveling Merchant",
    portrait: "marcus.png",
    personality: ["cunning", "greedy", "resourceful", "morally flexible"],
    romanceable: false,
};

export { Marcus, MARCUS_ID };
