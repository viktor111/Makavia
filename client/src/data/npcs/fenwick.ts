/**
 * NPC Data: Lord Fenwick Duvall
 * A minor noble of boundless wealth, bottomless thirst, and negligible judgment.
 * Comic relief with surprisingly good connections.
 */

import { NPC } from "../../types/npc";

const FENWICK_ID = "npc_fenwick";

const Fenwick: NPC = {
    id: FENWICK_ID,
    name: "Lord Fenwick",
    title: "Minor Noble, Major Nuisance",
    portrait: "fenwick.png",
    personality: ["drunk", "friendly", "oblivious", "harmless"],
    romanceable: false,
};

export { Fenwick, FENWICK_ID };
