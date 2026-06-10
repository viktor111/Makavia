/**
 * NPC Data: Serenya Vale
 * Former tavern girl of the Copper Hen, now Kael's companion.
 * Carries an unawakened gift of foresight.
 */

import { NPC } from "../../types/npc";

const SERENYA_ID = "npc_serenya";

const Serenya: NPC = {
    id: SERENYA_ID,
    name: "Serenya",
    title: "Kael's Companion",
    portrait: "serenya.png",
    personality: ["shy", "perceptive", "quietly brave", "loyal"],
    romanceable: true,
};

export { Serenya, SERENYA_ID };
