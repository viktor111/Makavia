/**
 * NPC Data: Master Hobb
 * Owner of the Copper Hen tavern in Valkenshire.
 * Serenya's former employer — and former tormentor.
 */

import { NPC } from "../../types/npc";

const HOBB_ID = "npc_hobb";

const Hobb: NPC = {
    id: HOBB_ID,
    name: "Master Hobb",
    title: "Keeper of the Copper Hen",
    portrait: "hobb.png",
    personality: ["petty", "greedy", "cowardly", "cruel to the weak"],
    romanceable: false,
};

export { Hobb, HOBB_ID };
