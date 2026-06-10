/**
 * Chapter 1: Silk and Shadows
 *
 * Kael Veyren comes back to Aldoria — the kingdom he only ever passes through —
 * and is hired to find what has been taking guests from Lady Marcelline
 * Valerion's lakeside fêtes. One night, every thread: see docs/STORY.md.
 */

import { Chapter, StoryNode, createChapter } from "../../types/story";
import { CHAMBERS_HEAT_1, CHAMBERS_HEAT_2 } from "./chapter1Intimate";
import { SERENYA_ID } from "../npcs/serenya";
import { MARCELLINE_ID } from "../npcs/marcelline";
import { ISADORA_ID } from "../npcs/isadora";
import { HOBB_ID } from "../npcs/hobb";
import { FENWICK_ID } from "../npcs/fenwick";
import { CAELIS_ID } from "../npcs/caelis";

const CHAPTER_1_ID = "chapter_1_silk_and_shadows";

const chapter1Nodes: StoryNode[] = [
    // ============================================================
    // ACT 1 — The road, the Copper Hen, the contract
    // ============================================================
    {
        id: "c1_intro",
        type: "narration",
        text: "Aldoria has only ever seen you pass through — a night's hunt here, a road crossed before dawn there, never long enough to be remembered. This time you've come to stay a while, and the kingdom greets you the way it says goodbye to everyone: with walls. Valkenshire rises out of the dusk ahead, marble towers gilded by a dying sun, and beneath the gilt — you can smell it from the road — something gone soft with rot.",
        mood: "neutral",
        nextNodeId: "c1_gates",
    },
    {
        id: "c1_gates",
        type: "narration",
        text: "Blackthorne soldiers hold the gate, ebony armor wreathed in crimson thorns. They wave a silk merchant's caravan through without a glance and turn out a farmer's cart down to the seed sacks. The thorns on their pauldrons are polished. The farmer's daughter is crying.",
        mood: "tense",
        nextNodeId: "c1_serenya_gates",
    },
    {
        id: "c1_serenya_gates",
        type: "dialogue",
        speakerId: SERENYA_ID,
        text: "Keep your hood up. They look at people the way Hobb used to look at the till — like everything's theirs and some of it's just temporarily missing. I rehearsed our story. I have it completely memorized. Mostly memorized.",
        emotion: "neutral",
        nextNodeId: "c1_gate_choice",
    },
    {
        id: "c1_gate_choice",
        type: "choice",
        prompt: "The sergeant crooks two fingers. Your turn at the gate.",
        choices: [
            {
                id: "choice_gate_papers",
                label: "Hand over the travel papers you bought in Emberfall",
                nextNodeId: "c1_gate_papers",
                effects: [
                    { type: "gold", amount: -15 },
                    { type: "flag", flag: "GREASED_THE_GATE", value: true },
                ],
                tooltip: "Forged papers, and the forger knows your face (-15 gold)",
            },
            {
                id: "choice_gate_truth",
                label: "The truth, more or less: a sellsword and his assistant",
                nextNodeId: "c1_gate_truth",
                effects: [],
                tooltip: "Honesty, carefully trimmed",
            },
            {
                id: "choice_gate_stare",
                label: "Say nothing. Let him look at the sword and decide how much he wants to know.",
                nextNodeId: "c1_gate_stare",
                effects: [
                    { type: "flag", flag: "BLACKTHORNE_NOTED", value: true },
                ],
                tooltip: "Memorable. Blackthorne keeps lists.",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_gate_papers",
        type: "narration",
        text: "The papers vanish into the sergeant's glove along with the coins folded inside them. He doesn't read either. In Aldoria, you're learning, documents are just a polite shape for money to travel in.",
        mood: "neutral",
        nextNodeId: "c1_streets",
    },
    {
        id: "c1_gate_truth",
        type: "dialogue",
        speakerId: SERENYA_ID,
        text: "A sellsword, sir, yes — and I'm his... niece? Assistant. Assistant-niece. We're in textiles. He guards the textiles. There are no textiles currently, it's an off season for them—",
        emotion: "surprised",
        nextNodeId: "c1_gate_truth_2",
    },
    {
        id: "c1_gate_truth_2",
        type: "narration",
        text: "The sergeant looks at her, then at you, then visibly decides that whatever this is, it isn't worth the paperwork. He waves you through. Serenya exhales like a woman surfacing from deep water and whispers, 'Nailed it.'",
        mood: "neutral",
        nextNodeId: "c1_streets",
    },
    {
        id: "c1_gate_stare",
        type: "narration",
        text: "The sergeant's eyes travel from your hood to the greatsword's wrapped hilt and back. Something older than curiosity tells him to wave you through. He does — but he watches you walk the whole length of the gate tunnel, and at the far end you hear charcoal scratch on a duty slate.",
        mood: "tense",
        nextNodeId: "c1_streets",
    },
    {
        id: "c1_streets",
        type: "narration",
        text: "Valkenshire wears its marble like a court gown over a fever. Three sigils share the skyline on banners of state — Ravenmourne's quill, Valerion's rose, Blackthorne's thorns: the Triad, spoken of in the tone men reserve for weather. In one square the ash of yesterday's Holy Light pyre is still warm; nobody looks at it, everybody walks around it. And low on a doorpost, half scrubbed away, someone has chalked a small crown.",
        mood: "dark",
        nextNodeId: "c1_copper_hen",
    },
    {
        id: "c1_copper_hen",
        type: "narration",
        text: "Then a battered sign on a crooked post: a copper hen, wings spread mid-squawk. You know this sign. Eighteen months ago, on a night you were only passing through, two mercenaries dragged a girl into the alley behind it — and you did what you're for. Serenya stops walking so suddenly that a porter curses his way around her. Five years of her life happened under that sign. So did the night it ended.",
        mood: "neutral",
        nextNodeId: "c1_serenya_past",
    },
    {
        id: "c1_serenya_past",
        type: "dialogue",
        speakerId: SERENYA_ID,
        text: "I used to dream about walking back in here. In the dream I'm taller, and I'm wearing a clean cloak, and Hobb drops a whole tray of mugs when he sees me. ... Twenty steps from that door is where you found me, you know. First person who ever stood between me and the world, and it happened behind the worst tavern in Valkenshire. I don't know if this place is cursed or lucky. The beds are cheap, though. I know exactly how cheap. I washed them.",
        emotion: "sad",
        nextNodeId: "c1_hen_choice",
    },
    {
        id: "c1_hen_choice",
        type: "choice",
        prompt: "Her hand is on the strap of her satchel, knuckles pale.",
        choices: [
            {
                id: "choice_hen_enter",
                label: "Walk in together. She doesn't face it alone.",
                nextNodeId: "c1_hen_inside",
                effects: [],
                tooltip: "Some doors are better opened than avoided",
            },
            {
                id: "choice_hen_avoid",
                label: "Find another inn. She owes this place nothing.",
                nextNodeId: "c1_gull_inn",
                effects: [
                    { type: "relationship", npcId: SERENYA_ID, amount: 10 },
                    { type: "flag", flag: "SERENYA_SHELTERED", value: true },
                    { type: "morality", amount: 5 },
                ],
                tooltip: "Spare her the ghosts",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_hen_inside",
        type: "narration",
        text: "The Copper Hen smells of spilled ale and old grease, and the man behind the bar still has the same wet little eyes. Master Hobb needs three full seconds to place the young woman in the doorway. Then his face does something complicated — surprise, calculation, and the particular sneer of a small man rediscovering someone he used to be allowed to kick.",
        mood: "tense",
        nextNodeId: "c1_hobb",
    },
    {
        id: "c1_hobb",
        type: "dialogue",
        speakerId: HOBB_ID,
        text: "Well, scrape me sideways. The mouse returns. Come crawling back for your old room, girl? It's taken — but the scullery's short a pair of hands, if you've kept any humility in that... whatever this costume is. And who's the hedge-knight, your bodyguard? Hah!",
        emotion: "angry",
        nextNodeId: "c1_hobb_choice",
    },
    {
        id: "c1_hobb_choice",
        type: "choice",
        prompt: "Serenya has gone very still beside you.",
        choices: [
            {
                id: "choice_hobb_silent",
                label: "Stay silent. Let Serenya answer him.",
                nextNodeId: "c1_serenya_stand",
                effects: [
                    { type: "relationship", npcId: SERENYA_ID, amount: 15 },
                    { type: "flag", flag: "SERENYA_STOOD_UP", value: true },
                    { type: "morality", amount: 5 },
                ],
                tooltip: "This is her fight, and she's ready (+Good)",
            },
            {
                id: "choice_hobb_menace",
                label: "Set the greatsword on the bar. Slowly. Ask about room rates.",
                nextNodeId: "c1_hobb_cowed",
                effects: [
                    { type: "flag", flag: "HOBB_COWED", value: true },
                ],
                tooltip: "No threats. Just physics.",
            },
            {
                id: "choice_hobb_gold",
                label: "Drop a purse on the bar: 'Apologize to her. Count the coins while you do it.'",
                nextNodeId: "c1_hobb_grovel",
                effects: [
                    { type: "gold", amount: -20 },
                    { type: "morality", amount: -10 },
                    { type: "flag", flag: "HOBB_HUMILIATED", value: true },
                ],
                tooltip: "Buy his dignity and burn it in front of him (-20 gold, +Evil)",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_serenya_stand",
        type: "dialogue",
        speakerId: SERENYA_ID,
        text: "Two rooms, Master Hobb. The good ones, over the kitchen, where the chimney keeps them warm — I know the Hen better than you do, I cleaned every corner you've never looked at. And you'll speak to me like a paying guest, because that's what I am now.",
        emotion: "angry",
        nextNodeId: "c1_stand_after",
    },
    {
        id: "c1_stand_after",
        type: "narration",
        text: "Silence. Somewhere in the taproom a dart hits a board. Hobb opens his mouth, looks at her — actually looks, maybe for the first time in five years — and reaches for the room keys. Serenya's hands only start shaking after his back is turned, and she's smiling while they do.",
        mood: "hopeful",
        nextNodeId: "c1_night",
    },
    {
        id: "c1_hobb_cowed",
        type: "narration",
        text: "Nightfang's wrapped bulk settles onto the bar with a sound like a falling tombstone. You ask about room rates in the tone of a man asking about weather. Hobb's sneer dies somewhere behind his teeth, and the rates turn out to be astonishingly reasonable.",
        mood: "tense",
        nextNodeId: "c1_night",
    },
    {
        id: "c1_hobb_grovel",
        type: "narration",
        text: "Coin is the only sermon Hobb has ever believed. He apologizes — eyes on the purse, voice like curdled milk — and the taproom watches a man eat his own pride for silver. Serenya gets her apology. She doesn't look like someone who won.",
        mood: "dark",
        nextNodeId: "c1_night",
    },
    {
        id: "c1_gull_inn",
        type: "narration",
        text: "The Gull & Lantern, two streets over, is smaller and cleaner and smells of lamp oil instead of grief. In the corner, an old soldier with a Blackthorne brand burned over — deliberately, by the look of the scar — mutters into his cup about the old days. About the murdered king. About something he calls 'the echo.'",
        mood: "neutral",
        nextNodeId: "c1_soldier_choice",
    },
    {
        id: "c1_soldier_choice",
        type: "choice",
        prompt: "The old man's muttering rises and falls like a tide.",
        choices: [
            {
                id: "choice_soldier_listen",
                label: "Buy him a drink and sit down within earshot",
                nextNodeId: "c1_soldier_echo",
                effects: [
                    { type: "gold", amount: -2 },
                    { type: "flag", flag: "HEARD_THE_ECHO", value: true },
                ],
                tooltip: "Old soldiers remember old kings (-2 gold)",
            },
            {
                id: "choice_soldier_ignore",
                label: "Let him drink in peace. Dead kings are dangerous conversation.",
                nextNodeId: "c1_night",
                effects: [],
                tooltip: "You've survived this long by not listening",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_soldier_echo",
        type: "narration",
        text: "For the price of an ale, you learn this: twenty-nine years ago the king and queen and all their children burned, the Triad wept at the funeral and divided the kingdom before the ash cooled — and somewhere in the poor quarters, people still chalk a small crown on doorposts and call themselves the King's Echo. The old man taps the table. 'An echo means the voice ain't finished,' he says, and falls asleep sitting up.",
        mood: "tense",
        nextNodeId: "c1_night",
    },
    {
        id: "c1_night",
        type: "narration",
        text: "Midnight finds the city quieter and somehow heavier, as if the marble is listening. You take first watch out of habit no bed has ever cured. Through one warped windowpane the rooftops of the capital fall away in ranks of slate and moonlight. That's when Serenya starts whimpering in her sleep.",
        mood: "dark",
        nextNodeId: "c1_dream",
    },
    {
        id: "c1_dream",
        type: "dialogue",
        speakerId: SERENYA_ID,
        text: "Blood. There was blood on blue silk — a whole room of blue silk, like being inside a wave — and a woman with golden eyes was laughing, and you were there, Kael. You were smiling. Not your real smile. It frightened me more than the blood did.",
        emotion: "sad",
        nextNodeId: "c1_dream_choice",
    },
    {
        id: "c1_dream_choice",
        type: "choice",
        prompt: "She's awake now, knees drawn up, looking at you like the answer matters.",
        choices: [
            {
                id: "choice_dream_stay",
                label: "Sit with her until she sleeps again",
                nextNodeId: "c1_dream_stay",
                effects: [
                    { type: "relationship", npcId: SERENYA_ID, amount: 10 },
                    { type: "flag", flag: "SERENYA_DREAM_BLOOD", value: true },
                    { type: "morality", amount: 5 },
                ],
                tooltip: "The watch can wait (+Good)",
            },
            {
                id: "choice_dream_dismiss",
                label: "\"Dreams are just the day's mud settling. Sleep.\"",
                nextNodeId: "c1_dream_dismiss",
                effects: [
                    { type: "relationship", npcId: SERENYA_ID, amount: -5 },
                    { type: "flag", flag: "SERENYA_DREAM_BLOOD", value: true },
                ],
                tooltip: "Comfort, the way a whetstone comforts",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_dream_stay",
        type: "narration",
        text: "You sit on the floor beside her cot, back against the frame, and tell her about the constellations over Illythia until her breathing slows. Before sleep takes her she murmurs, 'You never smile like that. I checked.' You keep watch the rest of the night and don't examine why.",
        mood: "romantic",
        nextNodeId: "c1_courier",
    },
    {
        id: "c1_dream_dismiss",
        type: "narration",
        text: "She nods the way people nod when they've decided not to argue, and turns to the wall. You listen to her pretend to sleep for an hour. The dream stays in the room anyway, sitting in the corner like an uninvited guest.",
        mood: "neutral",
        nextNodeId: "c1_courier",
    },
    {
        id: "c1_courier",
        type: "narration",
        text: "Dawn brings fog off the lake and a knock that isn't Hobb's. A woman in a traveling veil stands in the corridor — posture wrong for a servant, hands wrong for a merchant — and offers a letter sealed in crimson wax with no sigil at all. 'For the one they call the Black Swordsman,' she says, and is gone before the name finishes echoing.",
        mood: "neutral",
        nextNodeId: "c1_letter",
    },
    {
        id: "c1_letter",
        type: "narration",
        text: "The letter is brief and beautifully penned. Three guests have vanished from fêtes at the Valerion Estate this season. The City Watch has been paid not to notice; the family must not be embarrassed; the matter requires a professional with discretion and a strong stomach. Enclosed: an invitation to tonight's masquerade, and a purse heavy enough to make Serenya's eyes go perfectly round.",
        mood: "neutral",
        nextNodeId: "c1_contract_choice",
    },
    {
        id: "c1_contract_choice",
        type: "choice",
        prompt: "Serenya reads over your shoulder, lips moving. 'That's more than Hobb makes in a year. Who loses three guests and calls a swordsman instead of a priest?'",
        choices: [
            {
                id: "choice_contract_gold",
                label: "Take the job for the purse. Gold doesn't ask questions back.",
                nextNodeId: "c1_contract_taken",
                effects: [
                    { type: "gold", amount: 100 },
                    { type: "flag", flag: "CONTRACT_FOR_GOLD", value: true },
                ],
                tooltip: "+100 gold, no illusions",
            },
            {
                id: "choice_contract_people",
                label: "Take it because people are vanishing and nobody else is looking",
                nextNodeId: "c1_contract_taken",
                effects: [
                    { type: "gold", amount: 100 },
                    { type: "morality", amount: 10 },
                    { type: "flag", flag: "CONTRACT_FOR_PEOPLE", value: true },
                ],
                tooltip: "Someone should (+Good, +100 gold)",
            },
            {
                id: "choice_contract_secrets",
                label: "Take it because a letter with no sigil is a secret wearing a courier",
                nextNodeId: "c1_contract_taken",
                effects: [
                    { type: "gold", amount: 100 },
                    { type: "flag", flag: "CONTRACT_FOR_SECRETS", value: true },
                ],
                tooltip: "Someone powerful is hiding behind that wax (+100 gold)",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_contract_taken",
        type: "narration",
        text: "Which is how — twelve hours, one rattling carriage ride east, and a windswept jetty later — you own formal blacks, Serenya owns a gown the color of forest moss, and a gilded launch is carrying you both across Trillune Lake toward a palace made of light. 'I read a book on noble etiquette once,' she says, practicing a curtsy that nearly capsizes the boat. 'Well. Most of a book. The first chapter. Twice.'",
        mood: "neutral",
        nextNodeId: "c1_estate",
    },

    // ============================================================
    // ACT 2 — The Palace of Silk and Shadows
    // ============================================================
    {
        id: "c1_estate",
        type: "narration",
        text: "The Valerion Estate doesn't sit on the shore so much as recline on it. White marble veined with gold, gardens cut into labyrinths, statues you take for lovers until the second glance finds the knife. They call it the Palace of Silk and Shadows. From the water, at dusk, with a hundred windows burning — you understand both halves of the name at once.",
        mood: "romantic",
        nextNodeId: "c1_gown",
    },
    {
        id: "c1_gown",
        type: "dialogue",
        speakerId: SERENYA_ID,
        text: "The book said a lady's curtsy should be 'a falling leaf, arrested.' I've been practicing and mine is more of a... startled duck, recovering. Do I look — is this — I've never worn anything that didn't used to be someone else's.",
        emotion: "happy",
        nextNodeId: "c1_gown_choice",
    },
    {
        id: "c1_gown_choice",
        type: "choice",
        prompt: "She smooths the moss-green silk for the fifth time, waiting for a verdict.",
        choices: [
            {
                id: "choice_gown_warm",
                label: "\"You look like you were born to this. The duck is a bonus.\"",
                nextNodeId: "c1_gown_warm",
                effects: [
                    { type: "relationship", npcId: SERENYA_ID, amount: 10 },
                    { type: "flag", flag: "NOTICED_SERENYA", value: true },
                ],
                tooltip: "Mean it",
            },
            {
                id: "choice_gown_cool",
                label: "\"You look inconspicuous. Stay close, count the exits.\"",
                nextNodeId: "c1_gown_cool",
                effects: [
                    { type: "flag", flag: "ALL_BUSINESS", value: true },
                ],
                tooltip: "There's a job tonight",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_gown_warm",
        type: "narration",
        text: "The blush takes her face the way dawn takes the lake — all at once, and nowhere to hide. She turns to the water anyway, and the boatman politely studies the horizon. For one moment the job, the city, and the dream of blood all wait outside the boat.",
        mood: "romantic",
        nextNodeId: "c1_ballroom",
    },
    {
        id: "c1_gown_cool",
        type: "narration",
        text: "She nods, businesslike, and starts counting exits before the boat has even docked — but something in her shoulders folds down a quarter inch, like a candle deciding to burn smaller. You file it away with all the other things you've decided not to feel tonight.",
        mood: "neutral",
        nextNodeId: "c1_ballroom",
    },
    {
        id: "c1_ballroom",
        type: "narration",
        text: "The Sapphire Ballroom is a wave you walk into: blue silk walls threaded with silver, floors of dark wood inlaid with gold, windows so vast the dancers seem to waltz on the lake itself. Masks everywhere — feathers, gilt, lacquer. And under the perfume and candle-wax, your hunter's sense closes around one wrong fact like a hand around a wasp: somewhere in this room of warm bodies, something isn't sweating.",
        mood: "tense",
        nextNodeId: "c1_fenwick",
    },
    {
        id: "c1_fenwick",
        type: "dialogue",
        speakerId: FENWICK_ID,
        text: "By the Light's own garters — it's HIM! Azhar the Crimson Blade! The duelist of the Emerald Oasis! I saw you behead a sand-wyrm at the Emperor's jubilee — or my cousin did, which is the same thing — your secret is SAFE with me, maestro, I am a TOMB—",
        emotion: "happy",
        nextNodeId: "c1_fenwick_choice",
    },
    {
        id: "c1_fenwick_choice",
        type: "choice",
        prompt: "A florid lord sloshing his fourth wine has pinned you against a pillar of admiration. Several masks are turning this way.",
        choices: [
            {
                id: "choice_fenwick_play",
                label: "Adopt a terrible Askariyan accent: \"The wyrm... had it coming.\"",
                nextNodeId: "c1_fenwick_fooled",
                effects: [
                    { type: "flag", flag: "FENWICK_FOOLED", value: true },
                ],
                tooltip: "Become the legend. What could go wrong.",
            },
            {
                id: "choice_fenwick_honest",
                label: "\"You have the wrong man. I've never beheaded anything at a jubilee.\"",
                nextNodeId: "c1_fenwick_honest",
                effects: [],
                tooltip: "Technically true",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_fenwick_fooled",
        type: "narration",
        text: "Lord Fenwick's delight could power a lighthouse. Within minutes you have been introduced to half the eastern terrace as 'Maestro Azhar, who kills wyrms and is too modest to discuss it,' and Serenya has had to leave twice to laugh into a curtain. You now own a reputation. It is not yours, but it opens doors.",
        mood: "neutral",
        nextNodeId: "c1_marcelline_enters",
    },
    {
        id: "c1_fenwick_honest",
        type: "narration",
        text: "Fenwick absorbs this, sways, and arrives at an even better conclusion: 'Of course you haven't. Of COURSE. Forgive me.' He taps his nose with the solemnity of a conspirator, spills wine on a passing baroness, and toasts 'to honest men at dishonest parties.' Despite everything, you find you almost like him.",
        mood: "neutral",
        nextNodeId: "c1_marcelline_enters",
    },
    {
        id: "c1_marcelline_enters",
        type: "narration",
        text: "Then the room changes pressure. No announcement, no fanfare — just a woman in crimson descending the grand stair, and three hundred people rearranging themselves around her like iron filings discovering a magnet. Black hair under gold-threaded veils. A smile that has clearly never once been nervous. Her amber eyes sweep the ballroom, find you against your pillar — and stop.",
        mood: "romantic",
        nextNodeId: "c1_marcelline_first",
    },
    {
        id: "c1_marcelline_first",
        type: "dialogue",
        speakerId: MARCELLINE_ID,
        text: "Three hundred guests in costume jewels and dancing shoes, and one man standing like a drawn blade someone left among the ornaments. You're not drinking my wine, you're not wearing a mask, and you've placed yourself where you can see every door. Either you're the most boring man in Aldoria... or the only interesting one. Convince me, swordsman.",
        emotion: "flirty",
        nextNodeId: "c1_wit_choice",
    },
    {
        id: "c1_wit_choice",
        type: "choice",
        prompt: "Lady Marcelline Valerion waits, wine glass tilted, enjoying your appraisal of her exactly as much as her own of you.",
        choices: [
            {
                id: "choice_wit_spar",
                label: "\"Boring men don't get studied from balconies for an hour first, my lady.\"",
                nextNodeId: "c1_wit_spar",
                effects: [
                    { type: "relationship", npcId: MARCELLINE_ID, amount: 15 },
                    { type: "flag", flag: "SPARRED_WITH_MARCELLINE", value: true },
                ],
                tooltip: "Play her game. Win a round.",
            },
            {
                id: "choice_wit_blunt",
                label: "\"I'm working.\"",
                nextNodeId: "c1_wit_blunt",
                effects: [
                    { type: "relationship", npcId: MARCELLINE_ID, amount: 10 },
                    { type: "flag", flag: "BLUNT_WITH_MARCELLINE", value: true },
                ],
                tooltip: "Two words. Let her do the rest.",
            },
            {
                id: "choice_wit_cold",
                label: "Incline your head, say nothing, and keep watching the doors",
                nextNodeId: "c1_wit_cold",
                effects: [
                    { type: "relationship", npcId: MARCELLINE_ID, amount: 5 },
                    { type: "flag", flag: "MARCELLINE_INTRIGUED", value: true },
                ],
                tooltip: "Indifference. She's never been served that before.",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_wit_spar",
        type: "dialogue",
        speakerId: MARCELLINE_ID,
        text: "An hour and a quarter, but who's counting. Oh, I like you. Do you know how long it's been since anyone in this room said something to me that wasn't pre-chewed? Careful, swordsman — I collect interesting things, and I'm told I'm terrible about returning them.",
        emotion: "flirty",
        nextNodeId: "c1_isadora_watch",
    },
    {
        id: "c1_wit_blunt",
        type: "dialogue",
        speakerId: MARCELLINE_ID,
        text: "Working. Two words, no bow, no title. Men usually spend their first sentence to me lying — and here you are, not bothering. How exotic. Whatever you're hunting at my party, swordsman, I almost hope it takes all night to find.",
        emotion: "flirty",
        nextNodeId: "c1_isadora_watch",
    },
    {
        id: "c1_wit_cold",
        type: "dialogue",
        speakerId: MARCELLINE_ID,
        text: "Silence. To my face. In my own ballroom. The last man who managed that owed me forty thousand crowns and fainted shortly after. You're not going to faint, are you? No... no, I don't believe you are. How thoroughly annoying of you to be the most interesting thing at my party without even speaking.",
        emotion: "neutral",
        nextNodeId: "c1_isadora_watch",
    },
    {
        id: "c1_isadora_watch",
        type: "narration",
        text: "Across the room, half-shadowed by a colonnade, a woman with auburn-red curls and a glass of untouched wine is watching you — not the way women watch men at parties, but the way appraisers watch ledgers. Caught at it, she only smiles, slow and inviting, and somehow the smile is the more frightening instrument. Once, briefly, by some fraction no appraiser would permit, her eyes find Marcelline across the ballroom and soften. Then she crosses the floor with a directness no one else in this room would dare.",
        mood: "tense",
        nextNodeId: "c1_isadora_dlg",
    },
    {
        id: "c1_isadora_dlg",
        type: "dialogue",
        speakerId: ISADORA_ID,
        text: "Lady Isadora Valerion. You'll forgive me for skipping the dance of introductions — I find them inefficient. That sword on your back is dwarven steel, master-forged, and the guard-work is... old-fashioned. Stonehelm hasn't cut that pattern in, oh, thirty years. Wherever did a wandering sellsword come by an antique like that?",
        emotion: "neutral",
        nextNodeId: "c1_isadora_choice",
    },
    {
        id: "c1_isadora_choice",
        type: "choice",
        prompt: "Her green eyes are polite, pleasant, and completely without mercy. The question is a scalpel dressed as small talk.",
        choices: [
            {
                id: "choice_isadora_deflect",
                label: "Shift the scabbard out of her sightline: \"Won it in a card game.\"",
                nextNodeId: "c1_isadora_late",
                effects: [
                    { type: "flag", flag: "ISADORA_SAW_THE_CREST", value: true },
                ],
                tooltip: "Too late. She's already seen what she's seen.",
            },
            {
                id: "choice_isadora_let",
                label: "Let her look — and study her right back",
                nextNodeId: "c1_isadora_seen",
                effects: [
                    { type: "flag", flag: "ISADORA_SAW_THE_CREST", value: true },
                    { type: "flag", flag: "NOTICED_ISADORA", value: true },
                    { type: "relationship", npcId: ISADORA_ID, amount: 10 },
                ],
                tooltip: "Spies respect being spotted",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_isadora_late",
        type: "narration",
        text: "A card game. Mm. She smiles the smile of a woman filing a document in a very large cabinet, curtsies a precise quarter-inch, and withdraws. You have the distinct sensation of having been weighed, measured, and cross-referenced. Whatever she saw in Nightfang's guard, she took it with her.",
        mood: "tense",
        nextNodeId: "c1_gallery",
    },
    {
        id: "c1_isadora_seen",
        type: "dialogue",
        speakerId: ISADORA_ID,
        text: "...You're watching my hands instead of my neckline, you've already marked the two guards who aren't really guards, and you knew I was following you before I crossed the room. How refreshing. Keep your card-game sword, swordsman. We'll talk again when fewer people are wearing masks. Some of us wear them better than others.",
        emotion: "surprised",
        nextNodeId: "c1_gallery",
    },
    {
        id: "c1_gallery",
        type: "narration",
        text: "Later, Marcelline reclaims you with two fingers on your sleeve and steers you into a circular chamber off the Grand Hall, its dome ribbed like the inside of a shell. She stands you on one side, crosses to the other, and from thirty feet away her whisper arrives at your ear like a kiss: 'The Whispering Gallery. Everything in Aldoria whispers, swordsman. I simply built a room that's honest about it.'",
        mood: "romantic",
        nextNodeId: "c1_gallery_dlg",
    },
    {
        id: "c1_gallery_dlg",
        type: "dialogue",
        speakerId: MARCELLINE_ID,
        text: "Now — let's not insult each other. A sealed letter, a heavy purse, the famous Black Swordsman at my little party. Three of my guests have stopped existing, someone in my own house hired you behind my back, and I want the thing that's hunting in my home dead more than you want to be paid. So. Shall we discuss your employment somewhere with... thicker walls? My chambers have excellent walls.",
        emotion: "flirty",
        nextNodeId: "c1_invite_choice",
    },
    {
        id: "c1_invite_choice",
        type: "choice",
        prompt: "The invitation hangs in the gallery's curved air, every layer of it deliberate. Across the ballroom, through the doors, you can see Serenya by the fountain, laughing at something Fenwick said.",
        choices: [
            {
                id: "choice_invite_accept",
                label: "Accept. Walls that thick deserve inspecting.",
                nextNodeId: "c1_chambers_1",
                effects: [
                    { type: "relationship", npcId: MARCELLINE_ID, amount: 25 },
                    { type: "romanceStart", npcId: MARCELLINE_ID },
                    { type: "flag", flag: "MARCELLINE_NIGHT", value: true },
                    { type: "relationship", npcId: SERENYA_ID, amount: -10 },
                ],
                tooltip: "Play with fire in its own palace. Serenya will know.",
            },
            {
                id: "choice_invite_grace",
                label: "\"Another night, my lady — when nothing is hunting your guests.\"",
                nextNodeId: "c1_decline_grace",
                effects: [
                    { type: "relationship", npcId: MARCELLINE_ID, amount: 10 },
                    { type: "flag", flag: "REFUSED_MARCELLINE", value: true },
                ],
                tooltip: "A refusal she'll savor like a promise",
            },
            {
                id: "choice_invite_cold",
                label: "\"I inspect walls for a fee, my lady. The fee's been paid. By someone else.\"",
                nextNodeId: "c1_decline_cold",
                effects: [
                    { type: "relationship", npcId: MARCELLINE_ID, amount: -5 },
                    { type: "flag", flag: "MARCELLINE_STUNG", value: true },
                ],
                tooltip: "Sting her. Women like Marcelline keep score.",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_chambers_1",
        type: "narration",
        text: "Her chambers are reached through a door that pretends to be paneling, down a corridor where the candles are the color of honey. Velvet, mahogany, Askariyan silk in heaps like crushed sunsets — and in one corner, a tall mirror in a frame of silver thorns that she steers you past without quite seeming to. She pours wine you both ignore. 'The thing about being feared by everyone,' she says, closing the distance, 'is that no one ever surprises you. Surprise me, swordsman.'",
        mood: "romantic",
        nextNodeId: "c1_chambers_2",
    },
    {
        id: "c1_chambers_2",
        type: "dialogue",
        speakerId: MARCELLINE_ID,
        text: "Gods. You kiss like you fight, don't you — all patience and then all at once. No, don't answer. Don't say anything at all. Every man in Aldoria talks to me and every word is a transaction. You're the first thing in years that feels like weather instead.",
        emotion: "flirty",
        nextNodeId: "c1_chambers_3",
    },
    {
        // Text lives in chapter1Intimate.ts — that file is Viktor's to rewrite.
        id: "c1_chambers_3",
        type: "narration",
        text: CHAMBERS_HEAT_1,
        mood: "romantic",
        nextNodeId: "c1_chambers_4",
    },
    {
        // Text lives in chapter1Intimate.ts — that file is Viktor's to rewrite.
        id: "c1_chambers_4",
        type: "narration",
        text: CHAMBERS_HEAT_2,
        mood: "romantic",
        nextNodeId: "c1_chambers_after",
    },
    {
        id: "c1_chambers_after",
        type: "narration",
        text: "Near midnight she sleeps like a sated cat in the ruins of silk — and the mask slips. Her brow tightens; her hand searches the sheet for something that isn't there. '...don't let them burn it, Issy,' she murmurs, in a voice ten years younger than her own. '...not the garden...'",
        mood: "dark",
        nextNodeId: "c1_chambers_wake",
    },
    {
        id: "c1_chambers_wake",
        type: "dialogue",
        speakerId: MARCELLINE_ID,
        text: "Going back to your post, soldier? How dutiful. Mm. I haven't decided yet whether I'm keeping you.",
        emotion: "flirty",
        nextNodeId: "c1_scream",
    },
    {
        id: "c1_decline_grace",
        type: "dialogue",
        speakerId: MARCELLINE_ID,
        text: "Another night. I can't remember the last time a man told me no and made it sound like a gift on layaway. Very well, swordsman — hunt my monster first. But understand the house rules: I collect debts, I charge interest, and I have never once forgotten an IOU.",
        emotion: "flirty",
        nextNodeId: "c1_serenya_warn",
    },
    {
        id: "c1_decline_cold",
        type: "dialogue",
        speakerId: MARCELLINE_ID,
        text: "...The fee. Has been paid. By someone else. — Do you know, I once bankrupted a viscount for interrupting me. You've just done something so much worse, and I find I can't decide whether to ruin you or give you a key to the east wing. What a genuinely irritating man you are. Go. Hunt. We will revisit this.",
        emotion: "neutral",
        nextNodeId: "c1_serenya_warn",
    },
    {
        id: "c1_serenya_warn",
        type: "dialogue",
        speakerId: SERENYA_ID,
        text: "Kael. Kael — the walls. I didn't see it before because of all the people, but the walls, the blue silk, it's the room from my dream. The wave I was inside. The blood was HERE, Kael, it's tonight, it's—",
        emotion: "surprised",
        nextNodeId: "c1_scream",
    },

    // ============================================================
    // ACT 3 — The unmasking
    // ============================================================
    {
        id: "c1_scream",
        type: "narration",
        text: "A scream from the lake terrace — high, bright, and cut short the way thread is cut: cleanly, by something sharp, mid-note. The music stumbles. You're moving before the echo dies — out through walls of blue silk, the inside of the wave Serenya dreamed — past three hundred masks deciding whether to be curious or afraid.",
        mood: "dark",
        nextNodeId: "c1_terrace",
    },
    {
        id: "c1_terrace",
        type: "narration",
        text: "On the terrace, by the rose wall: a young lord folded against the balustrade, gray as fireplace ash, eyes open and dry as paper. And standing over him, adjusting one glove, the guest this party knows as Lord Caelis — the one you'd already marked across the ballroom, the one who wasn't sweating — and who is, your every hunter's instinct screams at once, not breathing either, and not remotely a lord.",
        mood: "dark",
        nextNodeId: "c1_caelis_dlg",
    },
    {
        id: "c1_caelis_dlg",
        type: "dialogue",
        speakerId: CAELIS_ID,
        text: "Ah. The hunter. I did wonder which of us would smell the other first — these parties are SO fragrant. Do keep your voice down; the herd startles easily, and I've only had the one course. The vintage here is exquisite, you know. The guests... more so.",
        emotion: "neutral",
        nextNodeId: "c1_demon_choice",
    },
    {
        id: "c1_demon_choice",
        type: "choice",
        prompt: "The thing wearing Lord Caelis smiles wider than a mouth should go. Behind you, guests are beginning to drift toward the terrace doors.",
        choices: [
            {
                id: "choice_demon_draw",
                label: "Draw Nightfang. The conversation is over.",
                nextNodeId: "c1_combat",
                effects: [
                    { type: "morality", amount: 5 },
                    { type: "relationship", npcId: SERENYA_ID, amount: 5 },
                ],
                tooltip: "You know what it is. You know what you're for. (+Good)",
            },
            {
                id: "choice_demon_listen",
                label: "Let it talk. Dead demons answer no questions.",
                nextNodeId: "c1_caelis_bargain",
                effects: [
                    { type: "flag", flag: "DEMON_HINT_PATRON", value: true },
                ],
                tooltip: "Why is a highborn demon at an Aldorian party?",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_caelis_bargain",
        type: "dialogue",
        speakerId: CAELIS_ID,
        text: "He LISTENS! Oh, marvelous — most of your kind lead with the sword and die mid-lunge. Then listen well, hunter: I did not slip into this kingdom. I was INVITED. We all were. Doors opened from the inside, roads cleared, names provided — ask yourself who profits when the herd thins, and ask it in a whisper. Now. Professional courtesy: you walk away, I finish my evening, and I'll even tell you which of your dance partners tonight signs the invitations.",
        emotion: "surprised",
        nextNodeId: "c1_bargain_choice",
    },
    {
        id: "c1_bargain_choice",
        type: "choice",
        prompt: "The dead lord's eyes stare past you both. Inside, the music has entirely stopped.",
        choices: [
            {
                id: "choice_bargain_take",
                label: "Take the bargain. The name is worth one night's mercy.",
                nextNodeId: "c1_bargain_taken",
                effects: [
                    { type: "morality", amount: -15 },
                    { type: "flag", flag: "DEMON_BARGAIN", value: true },
                ],
                tooltip: "Trade a corpse for a clue (+Evil)",
            },
            {
                id: "choice_bargain_refuse",
                label: "\"I don't take the diner's word on who set the table. Draw.\"",
                nextNodeId: "c1_combat",
                effects: [
                    { type: "morality", amount: 5 },
                ],
                tooltip: "The information dies with it — but so does it (+Good)",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_bargain_taken",
        type: "narration",
        text: "You step aside. The demon inclines its borrowed head with grotesque courtesy — 'A pleasure doing business with a realist' — and takes two unhurried steps toward the garden stair. Which is when Serenya, arriving breathless at the terrace door, looks at Lord Caelis and starts to scream.",
        mood: "dark",
        nextNodeId: "c1_serenya_scream",
    },
    {
        id: "c1_serenya_scream",
        type: "dialogue",
        speakerId: SERENYA_ID,
        text: "ITS FACE — Kael, it's the face from my dream, the one underneath, the OPEN one — it lies, IT LIES, the name it promised you is a lie, it comes back, in the dream it always comes back — KAEL—",
        emotion: "surprised",
        nextNodeId: "c1_caelis_turns",
    },
    {
        id: "c1_caelis_turns",
        type: "narration",
        text: "The demon stops. Turns. Looks at the small girl in moss-green silk who has just named the face beneath its face — a face she could only have seen in a dream — and every trace of the urbane lord drains away like paint in rain. 'Now THAT,' it says, in a voice like wet stone grinding, 'is a rare vintage indeed.' It comes for her the way cold comes through an opened door — all at once, from everywhere.",
        mood: "dark",
        nextNodeId: "c1_gift_choice",
    },
    {
        id: "c1_gift_choice",
        type: "choice",
        prompt: "Twenty feet between the demon and Serenya. Ten between it and you.",
        choices: [
            {
                id: "choice_gift_shield",
                label: "Throw yourself between them — shield her with your body",
                nextNodeId: "c1_combat",
                effects: [
                    { type: "relationship", npcId: SERENYA_ID, amount: 15 },
                    { type: "flag", flag: "SHIELDED_SERENYA", value: true },
                ],
                tooltip: "Whatever else happens, it doesn't touch her",
            },
            {
                id: "choice_gift_lunge",
                label: "Draw and meet its lunge head-on",
                nextNodeId: "c1_combat",
                effects: [
                    { type: "flag", flag: "MET_THE_LUNGE", value: true },
                ],
                tooltip: "The best shield is a blade in its path",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_combat",
        type: "combat",
        enemyType: "Demon",
        enemyNameOverride: "Lord Caelis, Highborn of Nek'thurien",
        isBoss: true,
        introText: "The flesh-mask splits along seams no tailor cut. What unfolds out of Lord Caelis's evening coat is taller, wrong-jointed, crowned in horn — and its eyes burn the red of a banked fire. Nightfang clears its sheath with a sound like the night inhaling. The runes along the obsidian blade wake, eager. They remember this work.",
        winNodeId: "c1_demon_slain",
        loseNodeId: "c1_demon_lose",
        nextNodeId: null,
    },

    // --- Victory branch ---
    {
        id: "c1_demon_slain",
        type: "narration",
        text: "It dies the way highborn demons die — disbelieving. Nightfang's edge takes it through the collar of its stolen coat, and the body comes apart into the demon's truth: ash, ichor black as lamp oil spreading between the marble joints, and a smell like a snuffed century. Behind you, three hundred of Aldoria's finest discover their screaming voices all at once.",
        mood: "dark",
        nextNodeId: "c1_finish_choice",
    },
    {
        id: "c1_finish_choice",
        type: "choice",
        prompt: "The thing is not quite finished dying. Its remaining eye tracks you, and the ruin of its mouth is trying to shape words.",
        choices: [
            {
                id: "choice_finish_ask",
                label: "Kneel. Demand answers while it still has a voice.",
                nextNodeId: "c1_dying_words",
                effects: [
                    { type: "flag", flag: "HEARD_THE_CHOIR", value: true },
                ],
                tooltip: "Dying things spend their last coins on truth",
            },
            {
                id: "choice_finish_silent",
                label: "Let it die without an audience",
                nextNodeId: "c1_marcelline_after",
                effects: [
                    { type: "flag", flag: "NO_QUARTER", value: true },
                ],
                tooltip: "You don't owe it your attention",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_dying_words",
        type: "dialogue",
        speakerId: CAELIS_ID,
        text: "You think you've ended something, little knife. I am the least of what was invited in. Under the silk... under the marble... the Choir is already singing. And oh, hunter — they know your name.",
        emotion: "neutral",
        nextNodeId: "c1_choir_hush",
    },
    {
        id: "c1_choir_hush",
        type: "narration",
        text: "The body lets go of its shape all at once, like a fist opening — ash where a lord was standing, and the word name still hanging in the air. For three full heartbeats the Palace of Silk and Shadows is the quietest place in Aldoria: three hundred people listening, without knowing for what.",
        mood: "dark",
        nextNodeId: "c1_marcelline_after",
    },
    {
        id: "c1_marcelline_after",
        type: "dialogue",
        speakerId: MARCELLINE_ID,
        text: "Well. There's ichor on my terrace, a dead viscount by my roses, half the peerage has fainted into the other half — you have, in one evening, RUINED the most exclusive party in Aldoria. ... Do it again sometime. I haven't felt anything that interesting at one of these in years.",
        emotion: "flirty",
        nextNodeId: "c1_isadora_after",
    },
    {
        id: "c1_isadora_after",
        type: "narration",
        text: "Past her shoulder, at the colonnade, Lady Isadora stands with her untouched wine, watching the ash settle. She writes nothing down. She is the kind of woman who has never once needed to. Her eyes move from the demon's remains to Nightfang's guard — to the worn crest you've never been able to name — and then, briefly, terribly, to your face. Then she smiles at nothing and is gone.",
        mood: "tense",
        nextNodeId: "c1_patron_choice",
    },
    {
        id: "c1_patron_choice",
        type: "choice",
        prompt: "Marcelline turns back to you, and the playfulness drops away like a veil; underneath it is the most dangerous woman in Aldoria, making an offer.",
        choices: [
            {
                id: "choice_patron_yes",
                label: "Accept Marcelline's patronage — hunt whatever let this thing in among her guests, on her coin",
                nextNodeId: "c1_patron_yes",
                effects: [
                    { type: "flag", flag: "VALERION_PATRONAGE", value: true },
                    { type: "relationship", npcId: MARCELLINE_ID, amount: 10 },
                    { type: "gold", amount: 200 },
                ],
                tooltip: "Her gold opens every door in Valkenshire. Her gold owns what it touches. (+200 gold)",
            },
            {
                id: "choice_patron_no",
                label: "\"I work for the dead guest, my lady. Not the living hostess.\"",
                nextNodeId: "c1_patron_no",
                effects: [
                    { type: "flag", flag: "INDEPENDENT", value: true },
                    { type: "relationship", npcId: MARCELLINE_ID, amount: 10 },
                ],
                tooltip: "Stay your own man. She'll find that fascinating too — everything about you seems to work that way.",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_patron_yes",
        type: "dialogue",
        speakerId: MARCELLINE_ID,
        text: "Sensible. The terms: my coin, my doors, my name when you need it — and you report what you find to me before anyone else breathing. Welcome to my payroll, swordsman. Do try to remain interesting; I've had to bury so many disappointments.",
        emotion: "happy",
        nextNodeId: "c1_dawn",
    },
    {
        id: "c1_patron_no",
        type: "dialogue",
        speakerId: MARCELLINE_ID,
        text: "Independence. How expensive. Keep it while you can, swordsman — this city has a way of itemizing everything eventually, and I do love an auction. Until then, consider my doors... ajar. That's more than the King of Stonehelm gets.",
        emotion: "flirty",
        nextNodeId: "c1_dawn",
    },
    {
        id: "c1_dawn",
        type: "narration",
        text: "Dawn comes up gray and gold over Trillune Lake, and the launch carries you back across water scattered with drowned confetti and one floating mask, toward the jetty where a Valerion carriage already waits — her hospitality, or her surveillance, or in this house most likely both. Somewhere behind you: a courier with no sigil, a spymaster with your sword's measurements, and three vanished guests who finally have an explanation no one will believe.",
        mood: "neutral",
        nextNodeId: "c1_dawn_route",
    },
    {
        id: "c1_dawn_route",
        type: "choice",
        prompt: "Serenya sits in the bow, moss-green silk traded for her old wool cloak, watching the water.",
        choices: [
            {
                id: "choice_dawn_hurt",
                label: "Sit beside her",
                nextNodeId: "c1_dawn_hurt",
                conditions: [
                    { type: "flag", flag: "MARCELLINE_NIGHT", isSet: true },
                ],
                effects: [],
            },
            {
                id: "choice_dawn_warm",
                label: "Sit beside her",
                nextNodeId: "c1_dawn_warm",
                conditions: [
                    { type: "flag", flag: "MARCELLINE_NIGHT", isSet: false },
                ],
                effects: [],
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_dawn_hurt",
        type: "dialogue",
        speakerId: SERENYA_ID,
        text: "You disappeared, in the middle. I dreamed a demon and then stood in a doorway and watched it come true, and a drunk lord taught me a dice game, and you were just... gone. Behind her hidden door. ... Did you find what you were looking for in there, Kael? Because I looked for you. First. Before I screamed.",
        emotion: "sad",
        nextNodeId: "c1_dream_sting",
    },
    {
        id: "c1_dawn_warm",
        type: "dialogue",
        speakerId: SERENYA_ID,
        text: "I saw through a demon's face tonight and I'm not shaking. I keep waiting to shake and it isn't coming. Maybe it's the company. ... Next party, I pick the inn, the gown stays, and you teach me where the exits are BEFORE the screaming starts. Deal?",
        emotion: "happy",
        nextNodeId: "c1_dream_sting",
    },
    {
        id: "c1_dream_sting",
        type: "narration",
        text: "That night, in your narrow rented room, the old dream finds you again: marble halls you've never walked, a woman's voice singing low, a crown going into the fire petal by petal like a golden rose. But this time, for the first time in a lifetime of dreaming it, the voice sings a name through the smoke. Kaelric. You wake at dawn with your hand on Nightfang's hilt and no memory of whose name that is.",
        mood: "dark",
        nextNodeId: "c1_checkpoint_silk",
    },
    {
        id: "c1_checkpoint_silk",
        type: "checkpoint",
        chapterComplete: true,
        summary: "A demon is dead on the Triad's finest terrace, and every thread in Aldoria now has your scent: Marcelline's amber eyes, Isadora's quiet ledger, Serenya's dreaming gift — and a name sung through the smoke of an old dream. Kaelric. The hunt has only begun.",
        nextNodeId: null,
    },

    // --- Defeat branch ---
    {
        id: "c1_demon_lose",
        type: "narration",
        text: "It is faster than anything you have ever fought. A talon you never see opens your shoulder to the bone, the marble comes up to meet you, and the world goes white at the edges — and then Serenya is there, tiny and furious, throwing herself between you and four centuries of hunger with nothing in her hands but a stolen carving knife. Standing between you and the world, the way you once stood for her.",
        mood: "dark",
        nextNodeId: "c1_lose_guards",
    },
    {
        id: "c1_lose_guards",
        type: "narration",
        text: "What saves you both is the house itself: Valerion guards flooding the terrace with crossbows, Marcelline's voice cracking across the chaos like a whip. The demon weighs the odds with a connoisseur's regret — exposed, outnumbered, its evening thoroughly spoiled. 'Another night, little knight,' it murmurs, and goes over the balustrade into the black water of Trillune Lake without a splash.",
        mood: "dark",
        nextNodeId: "c1_lose_choice",
    },
    {
        id: "c1_lose_choice",
        type: "choice",
        prompt: "Serenya kneels over you on the bloody marble, hands pressed to your shoulder, repeating your name like it can hold the wound shut.",
        choices: [
            {
                id: "choice_lose_thanks",
                label: "\"Thank you. A carving knife. You're completely mad.\"",
                nextNodeId: "c1_lose_serenya",
                effects: [
                    { type: "flag", flag: "DEMON_ESCAPED", value: true },
                    { type: "flag", flag: "THANKED_SERENYA", value: true },
                    { type: "relationship", npcId: SERENYA_ID, amount: 15 },
                ],
                tooltip: "She stood between you and a demon",
            },
            {
                id: "choice_lose_pride",
                label: "\"I had him.\"",
                nextNodeId: "c1_lose_serenya",
                effects: [
                    { type: "flag", flag: "DEMON_ESCAPED", value: true },
                    { type: "flag", flag: "PRIDE_WOUNDED", value: true },
                ],
                tooltip: "You did not have him",
            },
        ],
        nextNodeId: null,
    },
    {
        id: "c1_lose_serenya",
        type: "dialogue",
        speakerId: SERENYA_ID,
        text: "Don't talk. Bandages first, legends after. I dreamed its real face, Kael, and tonight the dream looked back at me — and it knows something about you, it kept... smiling at your sword. Hold still. You're allowed to lose one fight, you know. The book says even the great duelists lost one fight. Chapter one. I read chapter one.",
        emotion: "sad",
        nextNodeId: "c1_lose_marcelline",
    },
    {
        id: "c1_lose_marcelline",
        type: "dialogue",
        speakerId: MARCELLINE_ID,
        text: "My terrace is ruined, my guests are traumatized, my monster is in my lake, and my mysterious swordsman is leaking on the marble. And yet — you drew on a highborn demon in front of three hundred witnesses, and you're still breathing. Even broken blades interest me, swordsman... provided they cut something first. Heal. Then come see me. We have unfinished business, you and I — several kinds.",
        emotion: "flirty",
        nextNodeId: "c1_dawn_lose",
    },
    {
        id: "c1_dawn_lose",
        type: "narration",
        text: "Dawn comes up gray over Trillune Lake as Serenya helps you into the boat, your shoulder packed and burning. Somewhere under that flat silver water, something with your measure taken is swimming patiently toward tomorrow. Lady Isadora watches your boat go from the highest balcony, and you're almost sure the thing in her hand is not a wine glass anymore, but a small black notebook.",
        mood: "dark",
        nextNodeId: "c1_sting_lose",
    },
    {
        id: "c1_sting_lose",
        type: "narration",
        text: "That night, fevered in your narrow rented room, the old dream finds you again: marble halls, a woman's voice singing low, a crown going into the fire petal by petal. And this time the voice sings a name through the smoke — Kaelric — and the demon's voice answers it from the dark water, laughing, as if it knew the name first. You wake at dawn with your hand on Nightfang's hilt.",
        mood: "dark",
        nextNodeId: "c1_checkpoint_blooded",
    },
    {
        id: "c1_checkpoint_blooded",
        type: "checkpoint",
        chapterComplete: true,
        summary: "The demon escaped into Trillune Lake with your measure taken, and you escaped with your life — barely — because a tavern girl with a carving knife refused to watch you die. Marcelline's interest survived your defeat; Isadora's notebook has begun; and an old dream finally said its name. Kaelric. Heal fast. It's coming back.",
        nextNodeId: null,
    },
];

const Chapter1: Chapter = createChapter(
    CHAPTER_1_ID,
    "Silk and Shadows",
    "Ten years away, and Aldoria welcomes the Black Swordsman home with a contract, a masquerade, and a guest list that includes something that doesn't sweat. One night at the Palace of Silk and Shadows — and every thread of your fate pulled taut at once.",
    chapter1Nodes,
    "c1_intro"
);

export { Chapter1, CHAPTER_1_ID };
