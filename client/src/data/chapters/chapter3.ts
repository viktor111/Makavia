/**
 * Chapter 3: Revelations
 * The truth about Aldric comes to light. Romance or rivalry with Elena reaches a climax.
 */

import { Chapter, StoryNode, createChapter } from "../../types/story";
import { ELENA_ID } from "../npcs/elena";
import { MARCUS_ID } from "../npcs/marcus";
import { MoralityTier } from "../../types/morality";

const CHAPTER_3_ID = "chapter_3_revelations";

const chapter3Nodes: StoryNode[] = [
    // Opening
    {
        id: "c3_intro",
        type: "narration",
        text: "The Velvet Serpent. A tavern on the edge of town where secrets are currency and everyone has something to hide. Tonight, truths will be revealed—and some lies will be buried forever.",
        mood: "tense",
        nextNodeId: "c3_tavern_interior",
    },

    {
        id: "c3_tavern_interior",
        type: "narration",
        text: "Smoke hangs heavy in the air. A bard plays a melancholy tune in the corner. The clientele keep their heads down—this isn't a place for friendly conversation.",
        mood: "dark",
        nextNodeId: "c3_back_room",
    },

    {
        id: "c3_back_room",
        type: "narration",
        text: "You find your way to a private room in the back. Evidence of Aldric's crimes is spread across the table: ledgers, letters, even a child's shackle. The weight of it all is staggering.",
        mood: "dark",
        nextNodeId: "c3_evidence_choice",
    },

    {
        id: "c3_evidence_choice",
        type: "choice",
        prompt: "The evidence is damning. But how to use it?",
        choices: [
            {
                id: "choice_give_elena",
                label: "Give it all to Elena for official prosecution",
                nextNodeId: "c3_elena_path",
                conditions: [
                    { type: "flag", flag: "ALLIED_WITH_ELENA", isSet: true },
                ],
                effects: [
                    { type: "morality", amount: 20 },
                    { type: "relationship", npcId: ELENA_ID, amount: 30 },
                ],
                tooltip: "Trust in justice (+Good)",
            },
            {
                id: "choice_give_elena_alt",
                label: "Seek out Elena and share what you've found",
                nextNodeId: "c3_elena_path",
                conditions: [
                    { type: "flag", flag: "KILLED_ELENA", isSet: false },
                    { type: "flag", flag: "ALLIED_WITH_ELENA", isSet: false },
                ],
                effects: [
                    { type: "morality", amount: 15 },
                    { type: "relationship", npcId: ELENA_ID, amount: 20 },
                    { type: "flag", flag: "SHARED_WITH_ELENA", value: true },
                ],
                tooltip: "Make amends (+Good)",
            },
            {
                id: "choice_sell_marcus",
                label: "Sell it to Marcus's buyer for maximum profit",
                nextNodeId: "c3_marcus_path",
                effects: [
                    { type: "morality", amount: -15 },
                    { type: "gold", amount: 200 },
                    { type: "flag", flag: "SOLD_EVIDENCE", value: true },
                ],
                tooltip: "Gold over justice (+Evil, +Gold)",
            },
            {
                id: "choice_blackmail",
                label: "Use it to blackmail Aldric directly",
                nextNodeId: "c3_blackmail_path",
                effects: [
                    { type: "morality", amount: -25 },
                    { type: "flag", flag: "BLACKMAILED_ALDRIC", value: true },
                ],
                tooltip: "Become the monster (+Very Evil)",
            },
            {
                id: "choice_destroy",
                label: "Burn it all. Some truths should stay buried.",
                nextNodeId: "c3_destroy_path",
                effects: [
                    { type: "morality", amount: -10 },
                    { type: "flag", flag: "DESTROYED_EVIDENCE", value: true },
                ],
                tooltip: "Nihilism (+Evil)",
            },
        ],
        nextNodeId: null,
    },

    // Elena path - Romance branch
    {
        id: "c3_elena_path",
        type: "narration",
        text: "The door opens, and Elena steps inside. She's out of armor, dressed simply—almost unrecognizable as the fierce knight who hunted you through the forest.",
        mood: "neutral",
        nextNodeId: "c3_elena_sees_evidence",
    },

    {
        id: "c3_elena_sees_evidence",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "Gods... I knew it was bad, but this... These are records of children sold. Families destroyed. All so one man could line his coffers.",
        emotion: "sad",
        nextNodeId: "c3_elena_emotional",
    },

    {
        id: "c3_elena_emotional",
        type: "narration",
        text: "Her hands tremble as she sets down the documents. For a moment, the unshakeable knight looks fragile, human.",
        mood: "neutral",
        nextNodeId: "c3_elena_thanks",
    },

    {
        id: "c3_elena_thanks",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "You could have sold this. You could have run. Why did you choose to trust me?",
        emotion: "sad",
        nextNodeId: "c3_romance_choice",
    },

    {
        id: "c3_romance_choice",
        type: "choice",
        prompt: "Elena looks at you with vulnerability in her eyes. This is a turning point.",
        choices: [
            {
                id: "choice_confess_feelings",
                label: "\"Because I've grown to care about you. More than I planned.\"",
                nextNodeId: "c3_romance_confession",
                conditions: [
                    { type: "relationship", npcId: ELENA_ID, min: 40 },
                ],
                effects: [
                    { type: "relationship", npcId: ELENA_ID, amount: 30 },
                    { type: "romanceStart", npcId: ELENA_ID },
                    { type: "flag", flag: "ROMANCE_ELENA", value: true },
                ],
                tooltip: "Confess your feelings (Romance)",
            },
            {
                id: "choice_respect",
                label: "\"Because you're the only person I've met who actually wants to do the right thing.\"",
                nextNodeId: "c3_respect_response",
                effects: [
                    { type: "morality", amount: 10 },
                    { type: "relationship", npcId: ELENA_ID, amount: 15 },
                ],
                tooltip: "Express respect (+Good)",
            },
            {
                id: "choice_practical",
                label: "\"Because I need powerful allies, and you're the best option.\"",
                nextNodeId: "c3_practical_response",
                effects: [
                    { type: "relationship", npcId: ELENA_ID, amount: -10 },
                ],
                tooltip: "Cold pragmatism",
            },
        ],
        nextNodeId: null,
    },

    {
        id: "c3_romance_confession",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "I... I've been trying to ignore it. A knight and a thief. It's absurd. Every rule I've ever followed says this is wrong.",
        emotion: "surprised",
        nextNodeId: "c3_romance_kiss",
    },

    {
        id: "c3_romance_kiss",
        type: "narration",
        text: "She steps closer. Her hand finds yours. In this dingy back room, surrounded by evidence of humanity's darkest impulses, something unexpectedly beautiful begins.",
        mood: "romantic",
        nextNodeId: "c3_romance_interrupted",
    },

    {
        id: "c3_romance_interrupted",
        type: "narration",
        text: "The moment is shattered by the crash of the tavern door. Shouts. Steel. Aldric's men have found you.",
        mood: "tense",
        nextNodeId: "c3_aldric_arrives",
    },

    {
        id: "c3_respect_response",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "That... means more than you know. I've spent my whole life trying to be worthy of this armor. Sometimes I wonder if anyone notices.",
        emotion: "happy",
        nextNodeId: "c3_preparation",
    },

    {
        id: "c3_practical_response",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "...Right. Of course. I shouldn't have expected anything else from someone in your profession.",
        emotion: "sad",
        nextNodeId: "c3_preparation",
    },

    {
        id: "c3_preparation",
        type: "narration",
        text: "Before either of you can say more, the tavern door crashes open. Aldric's men have found you.",
        mood: "tense",
        nextNodeId: "c3_aldric_arrives",
    },

    // Marcus path
    {
        id: "c3_marcus_path",
        type: "dialogue",
        speakerId: MARCUS_ID,
        text: "Excellent choice! My buyer will be very pleased. This information is worth a fortune to the right people. Or the wrong ones, depending on your perspective.",
        emotion: "happy",
        nextNodeId: "c3_marcus_buyer",
    },

    {
        id: "c3_marcus_buyer",
        type: "narration",
        text: "Marcus hands you a heavy pouch of gold. More money than you've ever held. But something feels wrong. His smile is too wide, his eyes too calculating.",
        mood: "dark",
        nextNodeId: "c3_marcus_betrayal",
    },

    {
        id: "c3_marcus_betrayal",
        type: "dialogue",
        speakerId: MARCUS_ID,
        text: "Oh, one small thing I forgot to mention—my buyer IS Lord Aldric. He's been looking for the evidence of his crimes. Now he can destroy it. And you... well, you know too much.",
        emotion: "happy",
        nextNodeId: "c3_marcus_fight",
    },

    {
        id: "c3_marcus_fight",
        type: "combat",
        enemyType: "Bandit",
        enemyNameOverride: "Marcus's Thugs",
        isBoss: false,
        introText: "Doors burst open. You've been set up.",
        winNodeId: "c3_survive_betrayal",
        loseNodeId: "c3_betrayal_death",
        nextNodeId: null,
    },

    {
        id: "c3_survive_betrayal",
        type: "narration",
        text: "You cut through Marcus's thugs, but the merchant himself has fled with the evidence. You've been played—and Aldric now has the means to cover his tracks forever.",
        mood: "dark",
        nextNodeId: "c3_checkpoint_betrayed",
    },

    {
        id: "c3_betrayal_death",
        type: "narration",
        text: "Marcus's thugs overwhelm you. The last thing you see is his mocking smile. Greed was your downfall.",
        mood: "dark",
        nextNodeId: "c3_checkpoint_death",
    },

    // Blackmail path
    {
        id: "c3_blackmail_path",
        type: "narration",
        text: "You send word to Lord Aldric: meet you alone, or his crimes go public. He agrees—but a man like Aldric doesn't become this powerful by playing fair.",
        mood: "dark",
        nextNodeId: "c3_aldric_meeting",
    },

    {
        id: "c3_aldric_meeting",
        type: "narration",
        text: "Aldric arrives with a chest of gold. He's older than you expected, with kind eyes that mask something rotten beneath. He smiles like a grandfather.",
        mood: "dark",
        nextNodeId: "c3_aldric_speaks",
    },

    {
        id: "c3_aldric_speaks",
        type: "dialogue",
        speakerId: MARCUS_ID,
        text: "So this is the famous thief. I respect ambition. Perhaps we're more alike than you think. Take the gold. Forget what you saw. We could be... partners.",
        emotion: "neutral",
        nextNodeId: "c3_aldric_offer",
    },

    {
        id: "c3_aldric_offer",
        type: "choice",
        prompt: "Aldric offers partnership in his criminal empire.",
        choices: [
            {
                id: "choice_accept_evil",
                label: "Accept his offer. Power is all that matters.",
                nextNodeId: "c3_join_aldric",
                effects: [
                    { type: "morality", amount: -40 },
                    { type: "gold", amount: 500 },
                    { type: "flag", flag: "JOINED_ALDRIC", value: true },
                ],
                tooltip: "Embrace villainy (+Very Evil, +Gold)",
            },
            {
                id: "choice_refuse_fight",
                label: "Refuse and fight",
                nextNodeId: "c3_aldric_fight",
                effects: [
                    { type: "morality", amount: 10 },
                ],
                tooltip: "You're not like him",
            },
        ],
        nextNodeId: null,
    },

    {
        id: "c3_join_aldric",
        type: "narration",
        text: "You shake hands with a monster. The gold is heavy in your pack. The weight on your soul is heavier. But power has its own seductions.",
        mood: "dark",
        nextNodeId: "c3_checkpoint_villain",
    },

    {
        id: "c3_aldric_fight",
        type: "combat",
        enemyType: "Knight",
        enemyNameOverride: "Lord Aldric's Bodyguard",
        isBoss: true,
        introText: "Aldric snaps his fingers. His personal guard steps forward—a mountain of steel and malice.",
        winNodeId: "c3_aldric_defeated",
        loseNodeId: "c3_aldric_wins",
        nextNodeId: null,
    },

    {
        id: "c3_aldric_defeated",
        type: "narration",
        text: "The bodyguard falls. Aldric flees into the night, but without his evidence, his empire will crumble. You've struck a blow for justice—even if no one will ever know your name.",
        mood: "hopeful",
        nextNodeId: "c3_checkpoint_hero",
    },

    {
        id: "c3_aldric_wins",
        type: "narration",
        text: "The bodyguard's blade finds its mark. Darkness takes you. Aldric will continue destroying lives. Your death means nothing.",
        mood: "dark",
        nextNodeId: "c3_checkpoint_death",
    },

    // Destroy evidence path
    {
        id: "c3_destroy_path",
        type: "narration",
        text: "You hold the flame to the documents. One by one, the crimes disappear into ash. The children will never get justice. The families will never know peace. And somehow, that feels easier than trying to fix anything.",
        mood: "dark",
        nextNodeId: "c3_nihilism",
    },

    {
        id: "c3_nihilism",
        type: "narration",
        text: "The room fills with smoke. When it clears, nothing remains but your own hollow reflection. You've become exactly what everyone expected of a thief—nothing.",
        mood: "dark",
        nextNodeId: "c3_checkpoint_empty",
    },

    // Aldric confrontation (from Elena romance path)
    {
        id: "c3_aldric_arrives",
        type: "narration",
        text: "The door splinters. Mercenaries flood in. And behind them, Lord Aldric himself, flanked by guards in gleaming armor.",
        mood: "tense",
        nextNodeId: "c3_final_stand_choice",
    },

    {
        id: "c3_final_stand_choice",
        type: "choice",
        prompt: "You're surrounded. Elena stands beside you.",
        choices: [
            {
                id: "choice_fight_together",
                label: "Fight together—back to back",
                nextNodeId: "c3_final_combat",
                effects: [
                    { type: "relationship", npcId: ELENA_ID, amount: 20 },
                ],
                tooltip: "Stand united",
            },
            {
                id: "choice_sacrifice_self",
                label: "Hold them off while Elena escapes with the evidence",
                nextNodeId: "c3_sacrifice",
                effects: [
                    { type: "morality", amount: 25 },
                    { type: "flag", flag: "SACRIFICED_FOR_ELENA", value: true },
                ],
                tooltip: "The ultimate sacrifice (+Good)",
            },
        ],
        nextNodeId: null,
    },

    {
        id: "c3_final_combat",
        type: "combat",
        enemyType: "Knight",
        enemyNameOverride: "Aldric's Elite Guards",
        isBoss: true,
        introText: "Side by side, thief and knight face impossible odds. If you're going to die, at least it'll be together.",
        winNodeId: "c3_victory",
        loseNodeId: "c3_defeat_together",
        nextNodeId: null,
    },

    {
        id: "c3_victory",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "We did it. WE DID IT! Aldric is fleeing—his men are broken. The evidence is safe. The magistrate will have everything he needs!",
        emotion: "happy",
        nextNodeId: "c3_victory_narration",
    },

    {
        id: "c3_victory_narration",
        type: "narration",
        text: "As dawn breaks over the Velvet Serpent, you realize something has changed. Not just in the world—but in yourself. Maybe a thief can be something more. Maybe a knight can be something less perfect. Together, you've proven that.",
        mood: "hopeful",
        nextNodeId: "c3_checkpoint_victory",
    },

    {
        id: "c3_defeat_together",
        type: "narration",
        text: "Overwhelmed by numbers, you fall side by side. But the evidence slips away in the chaos—carried by a barmaid Elena trusted. Your sacrifice wasn't in vain.",
        mood: "dark",
        nextNodeId: "c3_checkpoint_noble_death",
    },

    {
        id: "c3_sacrifice",
        type: "narration",
        text: "\"GO!\" you shout, pushing Elena toward the back exit. She hesitates—and in that moment, you see everything she feels for you written in her eyes.",
        mood: "tense",
        nextNodeId: "c3_sacrifice_dialogue",
    },

    {
        id: "c3_sacrifice_dialogue",
        type: "dialogue",
        speakerId: ELENA_ID,
        text: "I won't forget you. I won't let this be meaningless. I swear it.",
        emotion: "sad",
        nextNodeId: "c3_sacrifice_combat",
    },

    {
        id: "c3_sacrifice_combat",
        type: "combat",
        enemyType: "Soldier",
        enemyNameOverride: "Aldric's Mercenaries",
        isBoss: false,
        introText: "You plant your feet. They'll have to go through you.",
        winNodeId: "c3_sacrifice_survive",
        loseNodeId: "c3_sacrifice_death",
        nextNodeId: null,
    },

    {
        id: "c3_sacrifice_survive",
        type: "narration",
        text: "Against all odds, you survive. Bloodied, broken, but alive. Elena escaped with the evidence. Aldric's empire will crumble. And somehow, improbably, there might be a tomorrow.",
        mood: "hopeful",
        nextNodeId: "c3_checkpoint_survivor",
    },

    {
        id: "c3_sacrifice_death",
        type: "narration",
        text: "Your last thought is of Elena, running free with the truth in her hands. Your life mattered. In the end, that's more than most people get.",
        mood: "dark",
        nextNodeId: "c3_checkpoint_heroic_death",
    },

    // Chapter 3 Checkpoints
    {
        id: "c3_checkpoint_victory",
        type: "checkpoint",
        chapterComplete: true,
        summary: "Against all odds, you and Elena triumphed. Aldric will face justice, and a new chapter of your life begins—together.",
        nextNodeId: null,
    },

    {
        id: "c3_checkpoint_noble_death",
        type: "checkpoint",
        chapterComplete: true,
        summary: "You fell in battle, but your sacrifice ensured the truth would survive. Elena will carry on your legacy.",
        nextNodeId: null,
    },

    {
        id: "c3_checkpoint_survivor",
        type: "checkpoint",
        chapterComplete: true,
        summary: "You survived an impossible last stand. Wounded but free, you'll find Elena again. This story isn't over.",
        nextNodeId: null,
    },

    {
        id: "c3_checkpoint_heroic_death",
        type: "checkpoint",
        chapterComplete: true,
        summary: "You gave your life so Elena could escape with the evidence. A thief's redemption, written in blood.",
        nextNodeId: null,
    },

    {
        id: "c3_checkpoint_betrayed",
        type: "checkpoint",
        chapterComplete: true,
        summary: "Marcus played you. The evidence is gone, and Aldric remains untouchable. Greed has consequences.",
        nextNodeId: null,
    },

    {
        id: "c3_checkpoint_villain",
        type: "checkpoint",
        chapterComplete: true,
        summary: "You've joined Aldric's criminal empire. Power and gold are yours—but at what cost to your soul?",
        nextNodeId: null,
    },

    {
        id: "c3_checkpoint_hero",
        type: "checkpoint",
        chapterComplete: true,
        summary: "Aldric flees, his empire crumbling. You may be a thief, but tonight you were something more.",
        nextNodeId: null,
    },

    {
        id: "c3_checkpoint_death",
        type: "checkpoint",
        chapterComplete: true,
        summary: "Your story ends here. The world continues without you.",
        nextNodeId: null,
    },

    {
        id: "c3_checkpoint_empty",
        type: "checkpoint",
        chapterComplete: true,
        summary: "You destroyed the evidence. Justice dies. And somehow, you don't care anymore.",
        nextNodeId: null,
    },
];

const Chapter3: Chapter = createChapter(
    CHAPTER_3_ID,
    "Revelations",
    "The truth about Lord Aldric will be revealed. Alliances will be tested. And for some, this night will be their last.",
    chapter3Nodes,
    "c3_intro"
);

export { Chapter3, CHAPTER_3_ID };
