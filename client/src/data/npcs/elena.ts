/**
 * NPC Data: Elena
 * A knight of the Silver Order who pursues the player.
 */

import { NPC } from "../../types/npc";

const ELENA_ID = "npc_elena";

const Elena: NPC = {
    id: ELENA_ID,
    name: "Elena",
    title: "Knight of the Silver Order",
    portrait: "elena.png",
    personality: ["honorable", "determined", "secretly romantic", "just"],
    romanceable: true,
};

export { Elena, ELENA_ID };
