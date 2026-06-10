# Makavia — Story Bible

> How the saga is structured. Companion to [LORE.md](LORE.md) and [CHARACTERS.md](CHARACTERS.md).
> Design rule: **Chapter 1 detonates every thread at once; the following ~100 chapters walk through the wreckage slowly.**

## The Protagonist

The player **is Kael Veyren** — the Black Swordsman, secretly Prince Kaelric Aldren. Like Geralt or Cloud, he is a fixed identity the player inhabits; future character creation customizes *build* (class leanings, attribute spread), not *who he is*. Prose addresses him as "you"; NPCs use epithets ("swordsman," "hunter") or "Kael." The player learns the truth of his blood at the same pace Kael does.

The morality axis is Kael's central question: does the last Aldren stay a code-bound hunter, or does Aldoria's rot teach him to be what the Triad already believes all men are?

## Chapter 1 — "Silk and Shadows"

One night, every thread. Kael and Serenya enter Valkenshire; a veiled courier (the Crimson Veil, though Kael doesn't know it) hires the Black Swordsman to find what has been taking guests from Lady Marcelline Valerion's lakeside fêtes. At the masquerade: Marcelline's seduction, Isadora's quiet recognition of the royal crest on Nightfang's guard, Serenya's first confirmed prophetic dream, and a highborn demon wearing a nobleman's face. Fight, romance, drama, humour — all of it, in one chapter, ending with the dream that says a name Kael doesn't recognize: *Kaelric*.

## The Thread Ledger

Every flag set in Chapter 1 is a debt the saga repays later. **Never set a flag without an entry here.**

| Flag (set in ch. 1) | The thread it opens | Planned payoff |
|---|---|---|
| `SERENYA_DREAM_BLOOD` | Serenya's precognition is real | Arc II: her gift grows; factions want her; the Stargazers can explain it |
| `ISADORA_SAW_THE_CREST` | The spymaster suspects who Kael is | Arc I–II: the Crimson Veil dossier; Isadora's leverage — or her secret gift to Marcelline |
| `NOTICED_ISADORA` | Kael clocked the watcher | Earlier access to the espionage storyline |
| `MARCELLINE_NIGHT` / `REFUSED_MARCELLINE` / `MARCELLINE_STUNG` | The shape of Marcelline's obsession | Every Marcelline chapter reads differently per branch; STUNG can grow into rivalry |
| `SPARRED_WITH_MARCELLINE` / `BLUNT_WITH_MARCELLINE` / `MARCELLINE_INTRIGUED` | The register of their first exchange | Sets how Marcelline plays him in later chapters: as a sparring partner, a curiosity, or a fortress to be sieged |
| `NOTICED_SERENYA` / `ALL_BUSINESS` | How Kael treated her at the masquerade | The temperature of the slow-burn; ALL_BUSINESS players get a colder Serenya arc that thaws later |
| `NO_QUARTER` | Kael refused the dying demon an audience | Counterpart of `HEARD_THE_CHOIR` — ch. 2 must introduce the Choir cold for these players (and for all defeat-path players) |
| `THANKED_SERENYA` / `PRIDE_WOUNDED` | Grace or pride in defeat | Serenya's confidence arc; PRIDE_WOUNDED echoes whenever Kael's legend is questioned |
| `DEMON_HINT_PATRON` / `HEARD_THE_CHOIR` | Demons were *invited* into Aldoria; something called "the Choir" | The saga's spine: who invited Nek'thurien in, and what is the Choir Below |
| `DEMON_BARGAIN` | Kael was willing to trade with darkness | Morality echo; demons remember a hunter who deals |
| `DEMON_ESCAPED` (lose path) | Caelis lives | He returns as a recurring antagonist who knows Kael's measure |
| `VALERION_PATRONAGE` / `INDEPENDENT` | Kael's economic leash | Determines who opens doors — and who owns him — in Valkenshire arcs. **Defeat path sets neither**: the offer is pending ("Heal. Then come see me") and ch. 2 must resolve it |
| `HEARD_THE_ECHO` | The King's Echo exists | Arc II recruitment hook; they seek the heir they don't know is standing in front of them |
| `SERENYA_STOOD_UP` / `SERENYA_SHELTERED` | Whether Serenya grows or is protected | Her arc: from shadow to person; affects her courage at every crisis |
| `HOBB_HUMILIATED` / `HOBB_COWED` | How Valkenshire's small folk speak of you | Reputation callbacks, comic and otherwise |
| `FENWICK_FOOLED` | A drunk lord believes you are an Askariyan duelist | Recurring comic relief; one day Fenwick's mistake saves your life |
| `BLACKTHORNE_NOTED` / `GREASED_THE_GATE` | How you entered the city | Blackthorne attention vs. a forger who knows your face |
| `SHIELDED_SERENYA` / `MET_THE_LUNGE` | Instinct at the moment of violence | Serenya remembers; so does the Choir. **Bargain-path only** — players who drew immediately set neither (their instinct was never tested; the demon never reached her) |
| `CONTRACT_FOR_GOLD` / `_FOR_PEOPLE` / `_FOR_SECRETS` | Why Kael really took the job | Tone of how NPCs read him; small dialogue variants |

## Saga Map (~100+ chapters in five arcs)

- **Arc I — The Hunter (ch. 1–15), Valkenshire.** The demon infestation contract; Marcelline's web tightens; Isadora's investigation; the Copper Hen as home base; Serenya's dreams sharpen. Slow reveal: the disappearances trace *upward*, into the Triad's orbit. Ends: Kael learns someone inside Aldoria is feeding it to Nek'thurien — and Isadora confirms (to herself alone) who he is.
- **Arc II — The Echo (ch. 16–35).** The King's Echo storyline; the Holy Light's pyres; Blackthorne crackdowns; Marcelline & Isadora's secret strains under politics. Serenya is endangered for her gift. Ends: Kael learns his own name.
- **Arc III — The Heir (ch. 36–60).** What does the rightful heir owe a rotten kingdom? Stonehelm embassy (the dwarves who kept his secret), Illythia return, Elarenwood. The Choir Below surfaces as the force that brokered the royal assassination.
- **Arc IV — The Triad (ch. 61–85).** Open play against (or beside) Ravenmourne, Valerion, Blackthorne. Marcelline must choose between the world she rules and the man she cannot own. Askariyah intervenes; Saladin's long game.
- **Arc V — The Choir (ch. 86–100+).** Nek'thurien moves openly; Vorgrim's legacy; the crown of fire from the dream, made literal. Every ledger entry comes due.

## Writing Rules for Chapters

1. Second person, present tense. NPC dialogue carries voice; narration carries atmosphere. Node texts 1–4 sentences.
2. Every chapter: at least one choice that costs something, one thread advanced, one thread *touched* (a sentence is enough).
3. Combat nodes always have both `winNodeId` and `loseNodeId` — defeat continues the story, it doesn't end it.
4. Flags: set only via choice effects (engine constraint). Update the ledger above when adding any.
5. Conditioned single-option choices are the branch-by-state mechanism (the engine filters by flags — use it for epilogue variants).
6. Moods/emotions must stay within the engine unions (`neutral|tense|romantic|dark|hopeful`; `neutral|angry|happy|sad|surprised|flirty`).
7. Intimacy is written with heat and cut with grace — escalation, then the candles burn down unattended. The aftermath carries the drama.
