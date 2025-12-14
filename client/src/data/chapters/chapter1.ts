/**
 * Chapter 1: The Knight's Pursuit
 * The player flees after a heist and encounters Elena, a knight.
 */

import { Chapter, StoryNode, createChapter } from "../../types/story";
import { ELENA_ID } from "../npcs/elena";
import { MoralityTier } from "../../types/morality";

const CHAPTER_1_ID = "chapter_1_knights_pursuit";

const chapter1Nodes: StoryNode[] = [
    // Opening narration
    {
        id: "c1_intro",
        type: "narration",
        text: "The night air burns in your lungs as you sprint through the Thornwood Forest. Behind you, the distant shouts of city guards fade into silence. The heist was a success—the merchant's strongbox sits heavy in your pack, filled with gold coins. But something feels wrong. The forest is too quiet.",
        mood: "tense",
        nextNodeId: "c1_rustle",
    },

    {
        id: "c1_rustle",
        type: "narration",
        text: "A branch snaps to your left. Then another. You're not alone.",
        mood: "tense",
        nextNodeId: "c1_elena_appears",
    },

    {
        id: "c1_elena_appears",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "Halt, thief! By the authority of the Silver Order, you are under arrest for crimes against the Crown!",
        emotion: "angry",
        nextNodeId: "c1_elena_steps",
    },

    {
        id: "c1_elena_steps",
        type: "narration",
        text: "A figure in gleaming silver armor steps from the shadows. Even in the dim moonlight, you can see she's formidable—a knight, sword drawn, blocking your only path forward.",
        mood: "tense",
        nextNodeId: "c1_first_choice",
    },

    // First major choice
    {
        id: "c1_first_choice",
        type: "choice",
        prompt: "The knight advances toward you. What do you do?",
        choices: [
            {
                id: "choice_surrender",
                label: "Raise your hands in surrender",
                nextNodeId: "c1_surrender",
                effects: [
                    { type: "morality", amount: 10 },
                    { type: "relationship", npcId: ELENA_ID, amount: 15 },
                ],
                tooltip: "A peaceful approach (+Good)",
            },
            {
                id: "choice_charm",
                label: "Try to talk your way out",
                nextNodeId: "c1_charm_attempt",
                effects: [
                    { type: "relationship", npcId: ELENA_ID, amount: 5 },
                ],
                tooltip: "Use your wits",
            },
            {
                id: "choice_attack",
                label: "Attack her before she can react",
                nextNodeId: "c1_attack_elena",
                effects: [
                    { type: "morality", amount: -20 },
                    { type: "flag", flag: "ATTACKED_ELENA", value: true },
                    { type: "relationship", npcId: ELENA_ID, amount: -40 },
                ],
                tooltip: "Violence solves everything... right? (+Evil)",
            },
            {
                id: "choice_flee",
                label: "Throw the strongbox and run",
                nextNodeId: "c1_flee_attempt",
                effects: [
                    { type: "morality", amount: -5 },
                    { type: "gold", amount: -50 },
                ],
                tooltip: "Sacrifice the loot to escape",
            },
        ],
        nextNodeId: null,
    },

    // Surrender path
    {
        id: "c1_surrender",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "...You surrender? Just like that? I expected more resistance from someone brazen enough to rob Lord Aldric.",
        emotion: "surprised",
        nextNodeId: "c1_surrender_2",
    },

    {
        id: "c1_surrender_2",
        type: "narration",
        text: "She hesitates, sword still raised. There's uncertainty in her eyes—this isn't how these encounters usually go.",
        mood: "neutral",
        nextNodeId: "c1_surrender_choice",
    },

    {
        id: "c1_surrender_choice",
        type: "choice",
        prompt: "She's off-balance. What do you say?",
        choices: [
            {
                id: "choice_honest",
                label: "\"I'm tired of running. I just want this over.\"",
                nextNodeId: "c1_honest_response",
                effects: [
                    { type: "morality", amount: 10 },
                    { type: "relationship", npcId: ELENA_ID, amount: 20 },
                    { type: "flag", flag: "HONEST_WITH_ELENA", value: true },
                ],
                tooltip: "Genuine honesty (+Good)",
            },
            {
                id: "choice_pity",
                label: "\"Please, I only steal to survive. Have mercy.\"",
                nextNodeId: "c1_pity_response",
                effects: [
                    { type: "relationship", npcId: ELENA_ID, amount: 10 },
                ],
                tooltip: "Appeal to her sympathy",
            },
        ],
        nextNodeId: null,
    },

    {
        id: "c1_honest_response",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "...There's something different about you. Most thieves would lie through their teeth right now.",
        emotion: "surprised",
        nextNodeId: "c1_elena_lowers_sword",
    },

    {
        id: "c1_pity_response",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "The law makes no exceptions for circumstance. But... I've seen what poverty does to people.",
        emotion: "sad",
        nextNodeId: "c1_elena_lowers_sword",
    },

    {
        id: "c1_elena_lowers_sword",
        type: "narration",
        text: "Slowly, almost imperceptibly, she lowers her sword a few inches. She's listening.",
        mood: "hopeful",
        nextNodeId: "c1_merchant_reveal",
    },

    // Charm path
    {
        id: "c1_charm_attempt",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "Save your silver tongue, thief. I've heard every excuse in the—",
        emotion: "angry",
        nextNodeId: "c1_charm_interrupt",
    },

    {
        id: "c1_charm_interrupt",
        type: "choice",
        prompt: "You interrupt her:",
        choices: [
            {
                id: "choice_compliment",
                label: "\"Has anyone told you that you're magnificent in moonlight?\"",
                nextNodeId: "c1_flirt_response",
                effects: [
                    { type: "relationship", npcId: ELENA_ID, amount: 10 },
                ],
                tooltip: "Risky flirtation",
            },
            {
                id: "choice_info",
                label: "\"Before you arrest me, you should know who I stole from.\"",
                nextNodeId: "c1_merchant_reveal",
                effects: [
                    { type: "flag", flag: "REVEALED_MERCHANT_CRIMES", value: true },
                ],
                tooltip: "Share what you know",
            },
        ],
        nextNodeId: null,
    },

    {
        id: "c1_flirt_response",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "I— What? That's— You can't just—",
        emotion: "surprised",
        nextNodeId: "c1_flirt_narration",
    },

    {
        id: "c1_flirt_narration",
        type: "narration",
        text: "Even in the darkness, you can see her cheeks flush. She's flustered—probably not something that happens often to a knight of her caliber.",
        mood: "romantic",
        nextNodeId: "c1_merchant_reveal",
    },

    // Merchant reveal (multiple paths converge here)
    {
        id: "c1_merchant_reveal",
        type: "choice",
        prompt: "This could be your chance to explain:",
        choices: [
            {
                id: "choice_tell_truth",
                label: "\"Lord Aldric is a slaver. That gold bought children.\"",
                nextNodeId: "c1_truth_about_aldric",
                effects: [
                    { type: "morality", amount: 15 },
                    { type: "flag", flag: "ALDRIC_EXPOSED", value: true },
                    { type: "relationship", npcId: ELENA_ID, amount: 25 },
                ],
                tooltip: "Reveal the truth (+Good)",
            },
            {
                id: "choice_lie",
                label: "\"He owed me money. This is just... reclaiming debt.\"",
                nextNodeId: "c1_lie_about_aldric",
                effects: [
                    { type: "morality", amount: -10 },
                    { type: "flag", flag: "LIED_TO_ELENA", value: true },
                ],
                tooltip: "A convenient lie (+Evil)",
            },
            {
                id: "choice_silent",
                label: "Say nothing. Let her decide.",
                nextNodeId: "c1_silent_choice",
                effects: [],
                tooltip: "Mysterious silence",
            },
        ],
        nextNodeId: null,
    },

    {
        id: "c1_truth_about_aldric",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "...What did you say? A slaver? Lord Aldric sits on the merchant council. He's donated to the Order!",
        emotion: "surprised",
        nextNodeId: "c1_elena_conflicted",
    },

    {
        id: "c1_lie_about_aldric",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "A debt? Convenient story. Even if true, vigilante justice isn't justice at all.",
        emotion: "angry",
        nextNodeId: "c1_elena_decision",
    },

    {
        id: "c1_silent_choice",
        type: "narration",
        text: "You hold her gaze in silence. Something passes between you—an understanding that words might ruin.",
        mood: "tense",
        nextNodeId: "c1_elena_decision",
    },

    {
        id: "c1_elena_conflicted",
        type: "narration",
        text: "You can see the war happening behind her eyes. Everything she believes in, every oath she swore—it's all being tested by three simple words.",
        mood: "tense",
        nextNodeId: "c1_elena_decision_good",
    },

    {
        id: "c1_elena_decision_good",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "If what you say is true... I need proof. And you're going to help me find it. Consider yourself in my custody—unofficially.",
        emotion: "neutral",
        nextNodeId: "c1_alliance_formed",
    },

    {
        id: "c1_alliance_formed",
        type: "narration",
        text: "She sheathes her sword. It's not trust—not yet. But it's a start.",
        mood: "hopeful",
        nextNodeId: "c1_checkpoint",
    },

    {
        id: "c1_elena_decision",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "I should arrest you. That's my duty. But something tells me there's more to this story. Against my better judgment... I'll give you one chance.",
        emotion: "neutral",
        nextNodeId: "c1_reluctant_alliance",
    },

    {
        id: "c1_reluctant_alliance",
        type: "narration",
        text: "She doesn't trust you. But she's willing to listen. For now, that's enough.",
        mood: "neutral",
        nextNodeId: "c1_checkpoint",
    },

    // Attack path
    {
        id: "c1_attack_elena",
        type: "narration",
        text: "You lunge forward, drawing your blade. If she wants a fight, she'll get one.",
        mood: "dark",
        nextNodeId: "c1_combat",
    },

    {
        id: "c1_combat",
        type: "combat",
        enemyType: "Knight",
        enemyNameOverride: "Elena, Silver Knight",
        isBoss: false,
        introText: "Elena raises her blade with practiced grace. This won't be easy.",
        winNodeId: "c1_defeat_elena",
        loseNodeId: "c1_defeated_by_elena",
        nextNodeId: null,
    },

    {
        id: "c1_defeat_elena",
        type: "narration",
        text: "Elena falls to one knee, breathing hard. Blood seeps from a wound on her arm. She looks up at you with a mixture of fury and... respect?",
        mood: "dark",
        nextNodeId: "c1_spare_or_kill",
    },

    {
        id: "c1_spare_or_kill",
        type: "choice",
        prompt: "She's at your mercy. What do you do?",
        choices: [
            {
                id: "choice_spare",
                label: "Spare her life and flee",
                nextNodeId: "c1_spare_elena",
                effects: [
                    { type: "morality", amount: 5 },
                    { type: "flag", flag: "SPARED_ELENA", value: true },
                    { type: "relationship", npcId: ELENA_ID, amount: 10 },
                ],
                tooltip: "Show mercy",
            },
            {
                id: "choice_kill",
                label: "End her. No witnesses.",
                nextNodeId: "c1_kill_elena",
                effects: [
                    { type: "morality", amount: -50 },
                    { type: "flag", flag: "KILLED_ELENA", value: true },
                    { type: "rivalryStart", npcId: ELENA_ID },
                ],
                tooltip: "Cold-blooded murder (+Very Evil)",
            },
        ],
        nextNodeId: null,
    },

    {
        id: "c1_spare_elena",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "Why? Why spare me?",
        emotion: "surprised",
        nextNodeId: "c1_spare_departure",
    },

    {
        id: "c1_spare_departure",
        type: "narration",
        text: "You don't answer. Some questions don't deserve explanations. You disappear into the night, leaving the wounded knight behind. Something tells you this isn't the last time you'll meet.",
        mood: "tense",
        nextNodeId: "c1_checkpoint",
    },

    {
        id: "c1_kill_elena",
        type: "narration",
        text: "Your blade finds its mark. The light fades from her eyes. The Silver Order will hunt you to the ends of the earth for this. But for now, the forest is silent.",
        mood: "dark",
        nextNodeId: "c1_checkpoint_dark",
    },

    {
        id: "c1_defeated_by_elena",
        type: "narration",
        text: "The world goes dark as Elena's pommel connects with your skull. When you wake, you're in chains. The dungeons of the Silver Order await.",
        mood: "dark",
        nextNodeId: "c1_checkpoint_captured",
    },

    // Flee path
    {
        id: "c1_flee_attempt",
        type: "narration",
        text: "You hurl the strongbox at her feet and sprint in the opposite direction. Gold coins scatter across the forest floor.",
        mood: "tense",
        nextNodeId: "c1_flee_result",
    },

    {
        id: "c1_flee_result",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "What— Stop! Damn it all!",
        emotion: "angry",
        nextNodeId: "c1_flee_escape",
    },

    {
        id: "c1_flee_escape",
        type: "narration",
        text: "You hear her curse behind you, but she doesn't pursue. Maybe she's conflicted. Maybe she saw something in you. Or maybe she just wanted the gold. Either way, you escape into the night—poorer, but free.",
        mood: "neutral",
        nextNodeId: "c1_checkpoint_fled",
    },

    // Chapter checkpoints
    {
        id: "c1_checkpoint",
        type: "checkpoint",
        chapterComplete: true,
        nextChapterId: "chapter_2_hidden_paths",
        summary: "You've encountered Elena, Knight of the Silver Order. An uneasy alliance forms in the shadows of Thornwood Forest.",
        nextNodeId: null,
    },

    {
        id: "c1_checkpoint_dark",
        type: "checkpoint",
        chapterComplete: true,
        nextChapterId: "chapter_2_hidden_paths",
        summary: "Elena lies dead by your hand. The Silver Order will remember. Your path grows darker.",
        nextNodeId: null,
    },

    {
        id: "c1_checkpoint_captured",
        type: "checkpoint",
        chapterComplete: true,
        nextChapterId: "chapter_2_hidden_paths",
        summary: "Defeated and captured, you await judgment in the dungeons. But even in chains, opportunity may arise.",
        nextNodeId: null,
    },

    {
        id: "c1_checkpoint_fled",
        type: "checkpoint",
        chapterComplete: true,
        nextChapterId: "chapter_2_hidden_paths",
        summary: "You escaped, but left the gold behind. The knight's face lingers in your memory. Something tells you this isn't over.",
        nextNodeId: null,
    },
];

const Chapter1: Chapter = createChapter(
    CHAPTER_1_ID,
    "The Knight's Pursuit",
    "A heist gone right, an escape gone wrong. In the darkness of Thornwood Forest, you encounter someone who will change everything.",
    chapter1Nodes,
    "c1_intro"
);

export { Chapter1, CHAPTER_1_ID };
