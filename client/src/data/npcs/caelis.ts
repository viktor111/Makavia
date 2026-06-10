/**
 * NPC Data: Lord Caelis
 * A charming gentleman of leisure, recently arrived in Valkenshire society.
 * No one remembers being introduced to him. No one remembers him sweating, either.
 */

import { NPC } from "../../types/npc";

const CAELIS_ID = "npc_caelis";

const Caelis: NPC = {
    id: CAELIS_ID,
    name: "Lord Caelis",
    title: "Gentleman of Leisure",
    portrait: "caelis.png",
    personality: ["urbane", "patient", "hungry", "ancient"],
    romanceable: false,
};

export { Caelis, CAELIS_ID };
