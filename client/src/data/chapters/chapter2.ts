/**
 * Chapter 2: Hidden Paths
 * The player navigates the aftermath of their encounter with Elena.
 * Branches based on Chapter 1 choices.
 */

import { Chapter, StoryNode, createChapter } from "../../types/story";
import { ELENA_ID } from "../npcs/elena";
import { MARCUS_ID } from "../npcs/marcus";
import { MoralityTier } from "../../types/morality";

const CHAPTER_2_ID = "chapter_2_hidden_paths";

const chapter2Nodes: StoryNode[] = [
    // Opening - branches based on Chapter 1 ending
    {
        id: "c2_intro",
        type: "narration",
        text: "Three days have passed. The forest gives way to rolling hills, and beyond them, the trading town of Millbrook emerges from the morning mist. A place to rest, resupply... and perhaps find answers.",
        mood: "neutral",
        nextNodeId: "c2_town_entrance",
    },

    {
        id: "c2_town_entrance",
        type: "narration",
        text: "The town gates are guarded, but not heavily. Merchants come and go freely. You pull your hood lower and blend with the crowd.",
        mood: "neutral",
        nextNodeId: "c2_market_square",
    },

    {
        id: "c2_market_square",
        type: "narration",
        text: "The market square bustles with activity. Vendors hawk their wares, children chase each other between stalls, and the smell of fresh bread fills the air. A normal day in a normal town—but you're far from normal.",
        mood: "neutral",
        nextNodeId: "c2_spot_marcus",
    },

    {
        id: "c2_spot_marcus",
        type: "narration",
        text: "A particular stall catches your eye. A merchant in fine clothes, too fine for this modest town, examines a golden pocket watch. His eyes dart around nervously—the look of someone who expects trouble.",
        mood: "neutral",
        nextNodeId: "c2_marcus_intro",
    },

    {
        id: "c2_marcus_intro",
        type: "dialogue",
        speakerId: MARCUS_ID,
        text: "Ah, a customer! Or perhaps... something else? I recognize that look in your eyes. The look of someone who operates outside the law.",
        emotion: "neutral",
        nextNodeId: "c2_marcus_offer",
    },

    {
        id: "c2_marcus_offer",
        type: "dialogue",
        speakerId: MARCUS_ID,
        text: "Marcus is my name. I deal in... specialty goods. Things that require discretion. Things that might interest someone of your... talents.",
        emotion: "neutral",
        nextNodeId: "c2_marcus_choice",
    },

    {
        id: "c2_marcus_choice",
        type: "choice",
        prompt: "The merchant clearly knows more than he should. How do you respond?",
        choices: [
            {
                id: "choice_interested",
                label: "\"What kind of specialty goods?\"",
                nextNodeId: "c2_marcus_explains",
                effects: [
                    { type: "relationship", npcId: MARCUS_ID, amount: 10 },
                ],
                tooltip: "Hear him out",
            },
            {
                id: "choice_suspicious",
                label: "\"How do you know what I am?\"",
                nextNodeId: "c2_marcus_spy",
                effects: [],
                tooltip: "Demand answers",
            },
            {
                id: "choice_threaten",
                label: "\"If you know what I am, you know what I can do.\"",
                nextNodeId: "c2_marcus_threat",
                effects: [
                    { type: "morality", amount: -5 },
                    { type: "relationship", npcId: MARCUS_ID, amount: -10 },
                ],
                tooltip: "Intimidate him (+Evil)",
            },
            {
                id: "choice_walk_away",
                label: "Walk away without a word",
                nextNodeId: "c2_walk_away",
                effects: [],
                tooltip: "You don't need this",
            },
        ],
        nextNodeId: null,
    },

    {
        id: "c2_marcus_explains",
        type: "dialogue",
        speakerId: MARCUS_ID,
        text: "I know about Lord Aldric. I know what he really is. And I know you took something from him—something he wants back desperately. I might know a buyer who pays triple market value for... information.",
        emotion: "neutral",
        nextNodeId: "c2_aldric_info_choice",
    },

    {
        id: "c2_marcus_spy",
        type: "dialogue",
        speakerId: MARCUS_ID,
        text: "Let's just say I have ears in many places. The Silver Order isn't the only organization interested in Aldric's activities. There are... others who would pay well for what you know.",
        emotion: "neutral",
        nextNodeId: "c2_aldric_info_choice",
    },

    {
        id: "c2_marcus_threat",
        type: "dialogue",
        speakerId: MARCUS_ID,
        text: "Easy, friend! I'm on no one's side but my own. That's exactly why I'm useful. I don't care about justice or law—only profit. And right now, you're sitting on a gold mine.",
        emotion: "surprised",
        nextNodeId: "c2_aldric_info_choice",
    },

    {
        id: "c2_walk_away",
        type: "narration",
        text: "You turn your back on the merchant. Some deals aren't worth making. As you walk, you hear him call out...",
        mood: "neutral",
        nextNodeId: "c2_marcus_final_offer",
    },

    {
        id: "c2_marcus_final_offer",
        type: "dialogue",
        speakerId: MARCUS_ID,
        text: "The Velvet Serpent inn, if you change your mind! Room at the top! Don't wait too long—Aldric's men are already in town!",
        emotion: "neutral",
        nextNodeId: "c2_aldric_warning",
    },

    // Aldric info choice branch
    {
        id: "c2_aldric_info_choice",
        type: "choice",
        prompt: "Marcus seems to know about Aldric's darker dealings.",
        choices: [
            {
                id: "choice_sell_info",
                label: "\"Who's buying? I might be selling.\"",
                nextNodeId: "c2_sell_info",
                effects: [
                    { type: "morality", amount: -10 },
                    { type: "gold", amount: 100 },
                    { type: "flag", flag: "SOLD_INFO_MARCUS", value: true },
                ],
                tooltip: "Profit over principles (+Evil, +Gold)",
            },
            {
                id: "choice_justice",
                label: "\"I don't want money. I want Aldric exposed.\"",
                nextNodeId: "c2_seek_justice",
                effects: [
                    { type: "morality", amount: 15 },
                    { type: "flag", flag: "SEEKING_JUSTICE", value: true },
                ],
                tooltip: "Do the right thing (+Good)",
            },
            {
                id: "choice_both",
                label: "\"Why not both? Expose him AND profit.\"",
                nextNodeId: "c2_grey_path",
                effects: [
                    { type: "gold", amount: 50 },
                    { type: "flag", flag: "GREY_PATH", value: true },
                ],
                tooltip: "Walk the middle road",
            },
        ],
        nextNodeId: null,
    },

    {
        id: "c2_sell_info",
        type: "dialogue",
        speakerId: MARCUS_ID,
        text: "I knew we'd understand each other. Here's a pouch of gold for your troubles. The full payment comes when my buyer verifies the information. Meet me at the Velvet Serpent tonight.",
        emotion: "happy",
        nextNodeId: "c2_commotion",
    },

    {
        id: "c2_seek_justice",
        type: "dialogue",
        speakerId: MARCUS_ID,
        text: "Justice? How... noble. And naive. But perhaps naivety has its uses. The magistrate here is honest—rare as that is. If you have proof, he might actually do something. Careful though. Aldric has friends everywhere.",
        emotion: "surprised",
        nextNodeId: "c2_commotion",
    },

    {
        id: "c2_grey_path",
        type: "dialogue",
        speakerId: MARCUS_ID,
        text: "A pragmatist! I like it. Here's some coin now—call it a gesture of good faith. We expose Aldric, crash his operation, and pick up the pieces. Everyone wins. Except him.",
        emotion: "happy",
        nextNodeId: "c2_commotion",
    },

    // Commotion - Elena arrives (if alive)
    {
        id: "c2_commotion",
        type: "narration",
        text: "A commotion erupts near the town gate. Horses, armor, the banner of the Silver Order. Someone important has arrived.",
        mood: "tense",
        nextNodeId: "c2_elena_check",
    },

    {
        id: "c2_aldric_warning",
        type: "narration",
        text: "You freeze. Aldric's men? How did they find you so quickly? You duck into an alley just as a commotion erupts at the town gate.",
        mood: "tense",
        nextNodeId: "c2_elena_check",
    },

    {
        id: "c2_elena_check",
        type: "choice",
        prompt: "Silver Order knights flood the square. At their head...",
        choices: [
            {
                id: "choice_elena_alive",
                label: "You recognize the knight from the forest",
                nextNodeId: "c2_elena_arrives",
                conditions: [
                    { type: "flag", flag: "KILLED_ELENA", isSet: false },
                ],
            },
            {
                id: "choice_elena_dead",
                label: "A knight you don't recognize leads them",
                nextNodeId: "c2_stranger_knight",
                conditions: [
                    { type: "flag", flag: "KILLED_ELENA", isSet: true },
                ],
            },
        ],
        nextNodeId: null,
    },

    {
        id: "c2_elena_arrives",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "Spread out! Search the town! I want every inn, every stable, every shadow checked!",
        emotion: "angry",
        nextNodeId: "c2_elena_searching",
    },

    {
        id: "c2_elena_searching",
        type: "narration",
        text: "She's looking for you. But is it to arrest you... or something else? Her eyes scan the crowd, and for a moment, they pass right over your hiding spot.",
        mood: "tense",
        nextNodeId: "c2_elena_hide_choice",
    },

    {
        id: "c2_elena_hide_choice",
        type: "choice",
        prompt: "Elena is searching. What do you do?",
        choices: [
            {
                id: "choice_reveal",
                label: "Step out and reveal yourself",
                nextNodeId: "c2_reveal_self",
                effects: [
                    { type: "relationship", npcId: ELENA_ID, amount: 15 },
                    { type: "flag", flag: "APPROACHED_ELENA", value: true },
                ],
                conditions: [
                    { type: "flag", flag: "ATTACKED_ELENA", isSet: false },
                ],
                tooltip: "Trust her",
            },
            {
                id: "choice_hide_and_watch",
                label: "Stay hidden and observe",
                nextNodeId: "c2_observe_elena",
                effects: [],
                tooltip: "Gather information first",
            },
            {
                id: "choice_escape_town",
                label: "Use the chaos to slip out of town",
                nextNodeId: "c2_escape_town",
                effects: [
                    { type: "flag", flag: "FLED_MILLBROOK", value: true },
                ],
                tooltip: "Avoid the confrontation",
            },
        ],
        nextNodeId: null,
    },

    {
        id: "c2_stranger_knight",
        type: "narration",
        text: "A knight you don't recognize leads them—older, battle-scarred, with cold eyes. A notice hangs from his belt: 'WANTED FOR MURDER OF KNIGHT ELENA VANCE.' Your face stares back from the parchment.",
        mood: "dark",
        nextNodeId: "c2_wanted_choice",
    },

    {
        id: "c2_wanted_choice",
        type: "choice",
        prompt: "Your crime has caught up with you. The entire Order hunts you now.",
        choices: [
            {
                id: "choice_fight_way_out",
                label: "Fight your way out of town",
                nextNodeId: "c2_fight_escape",
                effects: [
                    { type: "morality", amount: -10 },
                ],
                tooltip: "Violence is the only answer now",
            },
            {
                id: "choice_stealth_escape",
                label: "Find a hidden path out",
                nextNodeId: "c2_escape_town",
                effects: [],
                tooltip: "Avoid unnecessary bloodshed",
            },
        ],
        nextNodeId: null,
    },

    // Reveal yourself branch
    {
        id: "c2_reveal_self",
        type: "narration",
        text: "You step from the shadows. Several knights draw their swords, but Elena raises a hand to stop them.",
        mood: "tense",
        nextNodeId: "c2_elena_reunion",
    },

    {
        id: "c2_elena_reunion",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "You actually came to me. Either you're incredibly trusting... or you have something important to say.",
        emotion: "surprised",
        nextNodeId: "c2_elena_private",
    },

    {
        id: "c2_elena_private",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "Leave us. I'll question this one personally.",
        emotion: "neutral",
        nextNodeId: "c2_private_talk",
    },

    {
        id: "c2_private_talk",
        type: "narration",
        text: "She leads you into a quiet alley, away from curious eyes. Her hand rests on her sword, but she doesn't draw it.",
        mood: "neutral",
        nextNodeId: "c2_elena_real_talk",
    },

    {
        id: "c2_elena_real_talk",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "I've been investigating Aldric. The things I've found... you were right. He's worse than I imagined. Child slavery, extortion, even murder. But I can't move against him without proof that will hold in court.",
        emotion: "sad",
        nextNodeId: "c2_team_up_choice",
    },

    {
        id: "c2_team_up_choice",
        type: "choice",
        prompt: "Elena needs your help. She's risking everything.",
        choices: [
            {
                id: "choice_help_elena",
                label: "\"I'll help you bring him down. Together.\"",
                nextNodeId: "c2_alliance_elena",
                effects: [
                    { type: "morality", amount: 15 },
                    { type: "relationship", npcId: ELENA_ID, amount: 25 },
                    { type: "flag", flag: "ALLIED_WITH_ELENA", value: true },
                ],
                tooltip: "A true partnership (+Good)",
            },
            {
                id: "choice_demand_payment",
                label: "\"What's in it for me?\"",
                nextNodeId: "c2_payment_demand",
                effects: [
                    { type: "relationship", npcId: ELENA_ID, amount: -10 },
                ],
                tooltip: "Business is business",
            },
        ],
        nextNodeId: null,
    },

    {
        id: "c2_alliance_elena",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "I... thank you. I know trust doesn't come easily in your line of work. I won't forget this.",
        emotion: "happy",
        nextNodeId: "c2_checkpoint_alliance",
    },

    {
        id: "c2_payment_demand",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "...Of course. I should have expected that. Fine. The Order has a bounty fund. Help me get the evidence, and I'll make sure you're compensated.",
        emotion: "sad",
        nextNodeId: "c2_reluctant_team",
    },

    {
        id: "c2_reluctant_team",
        type: "narration",
        text: "It's not the partnership she hoped for. But it's better than nothing.",
        mood: "neutral",
        nextNodeId: "c2_checkpoint_alliance",
    },

    // Observe branch
    {
        id: "c2_observe_elena",
        type: "narration",
        text: "You watch from the shadows as Elena questions merchants and townsfolk. She's not just hunting—she's investigating. Something has changed since the forest.",
        mood: "neutral",
        nextNodeId: "c2_observe_continues",
    },

    {
        id: "c2_observe_continues",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "Has anyone seen a traveling merchant? Fine clothes, nervous disposition? He goes by the name Marcus.",
        emotion: "neutral",
        nextNodeId: "c2_marcus_hunted",
    },

    {
        id: "c2_marcus_hunted",
        type: "narration",
        text: "She's hunting Marcus too. Interesting. The merchant may be more connected to Aldric than he let on.",
        mood: "tense",
        nextNodeId: "c2_warn_marcus_choice",
    },

    {
        id: "c2_warn_marcus_choice",
        type: "choice",
        prompt: "Elena is looking for Marcus. What do you do?",
        choices: [
            {
                id: "choice_warn_marcus",
                label: "Find Marcus and warn him",
                nextNodeId: "c2_warn_marcus",
                effects: [
                    { type: "relationship", npcId: MARCUS_ID, amount: 20 },
                    { type: "morality", amount: -5 },
                ],
                tooltip: "Criminals stick together",
            },
            {
                id: "choice_let_play_out",
                label: "Let it play out and see what happens",
                nextNodeId: "c2_checkpoint_observer",
                effects: [],
                tooltip: "Stay out of it",
            },
        ],
        nextNodeId: null,
    },

    {
        id: "c2_warn_marcus",
        type: "dialogue",
        speakerId: MARCUS_ID,
        text: "The Silver Order? Looking for me? Well, well. It seems our mutual friend Aldric has more pull than I thought. I owe you one, friend. The Velvet Serpent has a back exit—meet me there after nightfall.",
        emotion: "surprised",
        nextNodeId: "c2_checkpoint_marcus",
    },

    // Escape branches
    {
        id: "c2_escape_town",
        type: "narration",
        text: "You slip through back alleys and over rooftops. By the time the knights finish their search, you're already in the hills beyond town. But you've left potential allies behind—and gained nothing.",
        mood: "neutral",
        nextNodeId: "c2_checkpoint_fled",
    },

    {
        id: "c2_fight_escape",
        type: "combat",
        enemyType: "Soldier",
        enemyNameOverride: "Silver Order Knight",
        isBoss: false,
        introText: "A knight blocks your path. There's no talking your way out of this one.",
        winNodeId: "c2_fight_escape_win",
        loseNodeId: "c2_fight_escape_lose",
        nextNodeId: null,
    },

    {
        id: "c2_fight_escape_win",
        type: "narration",
        text: "You cut down the knight and sprint for the town walls. More will follow—the Order never stops hunting cop-killers.",
        mood: "dark",
        nextNodeId: "c2_checkpoint_violent",
    },

    {
        id: "c2_fight_escape_lose",
        type: "narration",
        text: "Outnumbered and outmatched, you fall. The dungeons await once more.",
        mood: "dark",
        nextNodeId: "c2_checkpoint_captured",
    },

    // Chapter 2 Checkpoints
    {
        id: "c2_checkpoint_alliance",
        type: "checkpoint",
        chapterComplete: true,
        nextChapterId: "chapter_3_revelations",
        summary: "You've formed an alliance with Elena to bring down Lord Aldric. The hunt begins.",
        nextNodeId: null,
    },

    {
        id: "c2_checkpoint_marcus",
        type: "checkpoint",
        chapterComplete: true,
        nextChapterId: "chapter_3_revelations",
        summary: "You've aligned with Marcus the merchant. His connections run deep—but so do his secrets.",
        nextNodeId: null,
    },

    {
        id: "c2_checkpoint_observer",
        type: "checkpoint",
        chapterComplete: true,
        nextChapterId: "chapter_3_revelations",
        summary: "You watched from the shadows as events unfolded. Sometimes the best move is no move at all.",
        nextNodeId: null,
    },

    {
        id: "c2_checkpoint_fled",
        type: "checkpoint",
        chapterComplete: true,
        nextChapterId: "chapter_3_revelations",
        summary: "You escaped Millbrook, but at what cost? The truth about Aldric remains buried.",
        nextNodeId: null,
    },

    {
        id: "c2_checkpoint_violent",
        type: "checkpoint",
        chapterComplete: true,
        nextChapterId: "chapter_3_revelations",
        summary: "More blood on your hands. The Order's hunt intensifies. There's no going back now.",
        nextNodeId: null,
    },

    {
        id: "c2_checkpoint_captured",
        type: "checkpoint",
        chapterComplete: true,
        nextChapterId: "chapter_3_revelations",
        summary: "Captured once more. The dungeons are cold, but opportunity may yet arise.",
        nextNodeId: null,
    },
];

const Chapter2: Chapter = createChapter(
    CHAPTER_2_ID,
    "Hidden Paths",
    "In the trading town of Millbrook, old enemies and new allies wait. Your choices begin to shape your destiny.",
    chapter2Nodes,
    "c2_intro"
);

export { Chapter2, CHAPTER_2_ID };
