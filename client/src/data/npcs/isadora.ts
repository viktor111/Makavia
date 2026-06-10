/**
 * NPC Data: Lady Isadora Valerion
 * The Crimson Rose, Mistress of Secrets.
 * Marcelline's cousin and secret lover; commands the Crimson Veil spy network.
 */

import { NPC } from "../../types/npc";

const ISADORA_ID = "npc_isadora";

const Isadora: NPC = {
    id: ISADORA_ID,
    name: "Lady Isadora",
    title: "The Crimson Rose",
    portrait: "isadora.png",
    personality: ["defiant", "strategist", "watchful", "loyal to one"],
    romanceable: false,
};

export { Isadora, ISADORA_ID };
