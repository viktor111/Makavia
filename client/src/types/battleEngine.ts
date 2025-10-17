import { Guid } from "../helpers/guid";
import { Turn, TurnType } from "./turn";
import { AbilityEffectType, AbilityResolution } from "./abilities";
import { Enemy } from "./enemies";
import { Item } from "./items";
import { Player, PlayerAbilityOutcome } from "./player";

type BattleActor = "player" | "enemy";

type BattleLogEntry = {
    id: string;
    turn: number;
    message: string;
};

type BattleStepResult = {
    logs: BattleLogEntry[];
    resolution: AbilityResolution;
    battleEnded: boolean;
    experienceGained?: number;
    leveledUp?: boolean;
    lootDropped?: Item;
};

type ActiveBuff = {
    id: string;
    target: BattleActor;
    stat: "armor";
    amount: number;
    remainingTurns: number;
};

class BattleEngine {
    private readonly player: Player;
    private readonly enemy: Enemy;
    private readonly turn: Turn;
    private battleEnded: boolean = false;
    private readonly logs: BattleLogEntry[] = [];
    private readonly activeBuffs: ActiveBuff[] = [];

    constructor(player: Player, enemy: Enemy) {
        this.player = player;
        this.enemy = enemy;
        this.turn = new Turn(0, TurnType.Player);
    }

    getTurn(): Turn {
        return this.turn;
    }

    getLogs(): BattleLogEntry[] {
        return [...this.logs];
    }

    getPlayer(): Player {
        return this.player;
    }

    getEnemy(): Enemy {
        return this.enemy;
    }

    hasEnded(): boolean {
        return this.battleEnded;
    }

    canPlayerAct(): boolean {
        return !this.battleEnded && this.turn.type === TurnType.Player;
    }

    playerUseAbility(abilityIndex: number): BattleStepResult {
        if (!this.canPlayerAct()) {
            throw new Error("It is not the player's turn");
        }

        const ability = this.player.learnedAbilities[abilityIndex];
        if (!ability) {
            throw new Error("Ability not found");
        }

        const outcome: PlayerAbilityOutcome = this.player.useAbility(ability, this.enemy);

        const stepLogs: BattleLogEntry[] = [
            this.createAbilityLog("player", outcome.resolution),
        ];

        if (outcome.experienceGained > 0) {
            stepLogs.push(this.createLog(`${this.player.name} gained ${outcome.experienceGained} experience.`));
        }

        if (outcome.leveledUp) {
            stepLogs.push(this.createLog(`${this.player.name} leveled up to ${this.player.level}!`));
        }

        let lootDropped: Item | undefined;
        if (outcome.droppedItem) {
            lootDropped = outcome.droppedItem;
            stepLogs.push(this.createLog(`${this.player.name} looted ${outcome.droppedItem.name}.`));
        }

        this.applyResolutionEffects(outcome.resolution, stepLogs);

        if (this.enemy.isDead()) {
            this.battleEnded = true;
            this.turn.increaseCount();
            this.turn.type = TurnType.End;
            stepLogs.push(this.createLog(`${this.enemy.name} has been defeated!`));
        } else {
            stepLogs.push(...this.reduceBuffDurations());
            this.advanceTurn(TurnType.Enemy);
        }

        this.logs.push(...stepLogs);

        return {
            logs: stepLogs,
            resolution: outcome.resolution,
            battleEnded: this.battleEnded,
            experienceGained: outcome.experienceGained,
            leveledUp: outcome.leveledUp,
            lootDropped,
        };
    }

    enemyTurn(): BattleStepResult {
        if (this.battleEnded) {
            throw new Error("Battle already ended");
        }

        if (this.turn.type !== TurnType.Enemy) {
            throw new Error("It is not the enemy's turn");
        }

        const resolution = this.enemy.useAbility(this.player);
        const stepLogs: BattleLogEntry[] = [this.createAbilityLog("enemy", resolution)];

        this.applyResolutionEffects(resolution, stepLogs);

        if (this.player.isDead()) {
            this.battleEnded = true;
            this.turn.increaseCount();
            this.turn.type = TurnType.End;
            stepLogs.push(this.createLog(`${this.player.name} has been defeated!`));
        } else {
            stepLogs.push(...this.reduceBuffDurations());
            this.advanceTurn(TurnType.Player);
        }

        this.logs.push(...stepLogs);

        return {
            logs: stepLogs,
            resolution,
            battleEnded: this.battleEnded,
        };
    }

    private advanceTurn(nextTurn: TurnType): void {
        this.turn.increaseCount();
        this.turn.type = nextTurn;
    }

    private applyResolutionEffects(resolution: AbilityResolution, stepLogs: BattleLogEntry[]): void {
        if (resolution.effect === AbilityEffectType.Buff && resolution.duration && resolution.stat) {
            this.applyBuff(resolution, stepLogs);
        }
    }

    private applyBuff(resolution: AbilityResolution, stepLogs: BattleLogEntry[]): void {
        const { amount, target, duration, stat } = resolution;
        if (!duration || !stat) {
            return;
        }

        if (stat === "armor") {
            if (target === "player") {
                this.player.adjustArmor(amount);
            } else {
                this.enemy.adjustArmor(amount);
            }
        }

        const buff: ActiveBuff = {
            id: Guid.generateGUID(),
            target,
            stat,
            amount,
            remainingTurns: duration,
        };

        this.activeBuffs.push(buff);

        const targetName = target === "player" ? this.player.name : this.enemy.name;
        stepLogs.push(this.createLog(`${targetName} gains ${amount} ${stat} for ${duration} turns.`));
    }

    private reduceBuffDurations(): BattleLogEntry[] {
        const expirationLogs: BattleLogEntry[] = [];

        for (let i = this.activeBuffs.length - 1; i >= 0; i--) {
            const buff = this.activeBuffs[i];
            buff.remainingTurns -= 1;

            if (buff.remainingTurns <= 0) {
                if (buff.stat === "armor") {
                    if (buff.target === "player") {
                        this.player.adjustArmor(-buff.amount);
                    } else {
                        this.enemy.adjustArmor(-buff.amount);
                    }
                }

                const targetName = buff.target === "player" ? this.player.name : this.enemy.name;
                expirationLogs.push(this.createLog(`${targetName}'s ${buff.stat} buff fades.`));
                this.activeBuffs.splice(i, 1);
            }
        }

        return expirationLogs;
    }

    private createAbilityLog(actor: BattleActor, resolution: AbilityResolution): BattleLogEntry {
        const actorName = actor === "player" ? this.player.name : this.enemy.name;
        const targetName = resolution.target === "player" ? this.player.name : this.enemy.name;
        let message: string;

        switch (resolution.effect) {
            case AbilityEffectType.Damage:
                message = `${actorName} used ${resolution.name} on ${targetName} for ${Math.round(resolution.amount)} damage.`;
                break;
            case AbilityEffectType.Heal:
                message = `${actorName} used ${resolution.name} and healed ${targetName} for ${Math.round(resolution.amount)} health.`;
                break;
            case AbilityEffectType.Buff:
                message = `${actorName} used ${resolution.name} on ${targetName}.`;
                break;
            default:
                message = `${actorName} used ${resolution.name}.`;
        }

        return this.createLog(message);
    }

    private createLog(message: string): BattleLogEntry {
        return {
            id: Guid.generateGUID(),
            turn: this.turn.count,
            message,
        };
    }
}

export type { BattleLogEntry, BattleStepResult };
export { BattleEngine };
