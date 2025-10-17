import { PlayerClassEnum } from "./classes";
import { Player } from "./player";
import { Enemy } from "./enemies";

enum AbilityType {
    Attack,
    Defence,
    Blessing,
    Curse,
    Special,
    Passive,
}

enum AbilityEffectType {
    Damage = "damage",
    Heal = "heal",
    Buff = "buff",
}

type AbilityTarget = "player" | "enemy";

interface AbilityResolution {
    name: string;
    abilityType: AbilityType;
    effect: AbilityEffectType;
    amount: number;
    target: AbilityTarget;
    duration?: number;
    stat?: "armor";
}

abstract class Ability {
    name: string;
    type: AbilityType;
    description: string;
    isUnlocked: boolean;
    playerLevelRequired: number;
    abilityLevelRequired: number;
    image: string;
    playerClass: PlayerClassEnum;

    constructor(
        name: string,
        type: AbilityType,
        description: string,
        playerLevelRequired: number,
        abilityLevelRequired: number,
        image: string,
        isUnlocked: boolean,
        playerClass: PlayerClassEnum
    ) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.playerLevelRequired = playerLevelRequired;
        this.abilityLevelRequired = abilityLevelRequired;
        this.image = image;
        this.isUnlocked = isUnlocked;
        this.playerClass = playerClass;
    }

    learn(): void {
        this.isUnlocked = true;
    }

    protected createResolution(
        effect: AbilityEffectType,
        amount: number,
        target: AbilityTarget,
        duration?: number,
        stat?: "armor"
    ): AbilityResolution {
        return {
            name: this.name,
            abilityType: this.type,
            effect,
            amount,
            target,
            duration,
            stat,
        };
    }

    abstract use(player: Player, enemy: Enemy): AbilityResolution;
    abstract useOnPlayer(player: Player, enemy: Enemy): AbilityResolution;
}

class Slash extends Ability {
    constructor() {
        super(
            "Slash",
            AbilityType.Attack,
            "Slash your enemy with your sword",
            1,
            1,
            "slash.png",
            false,
            PlayerClassEnum.Warrior
        );
    }

    use(player: Player, enemy: Enemy): AbilityResolution {
        const rawDamage = player.damage + player.strength.value * 2;
        const dealt = enemy.takeDamage(rawDamage);
        return this.createResolution(AbilityEffectType.Damage, dealt, "enemy");
    }

    useOnPlayer(player: Player, enemy: Enemy): AbilityResolution {
        const rawDamage = enemy.damage * 2;
        const dealt = player.takeDamage(rawDamage);
        return this.createResolution(AbilityEffectType.Damage, dealt, "player");
    }
}

class Stab extends Ability {
    constructor() {
        super(
            "Stab",
            AbilityType.Attack,
            "Stab your enemy with your dagger",
            1,
            1,
            "stab.png",
            false,
            PlayerClassEnum.Rogue
        );
    }

    use(player: Player, enemy: Enemy): AbilityResolution {
        const rawDamage = player.damage + player.strength.value * 1.5;
        const dealt = enemy.takeDamage(rawDamage);
        return this.createResolution(AbilityEffectType.Damage, dealt, "enemy");
    }

    useOnPlayer(player: Player, enemy: Enemy): AbilityResolution {
        const rawDamage = enemy.damage * 2;
        const dealt = player.takeDamage(rawDamage);
        return this.createResolution(AbilityEffectType.Damage, dealt, "player");
    }
}

class Fireball extends Ability {
    constructor() {
        super(
            "Fireball",
            AbilityType.Attack,
            "Throw a fireball at your enemy",
            1,
            1,
            "fireball.png",
            false,
            PlayerClassEnum.Mage
        );
    }

    use(player: Player, enemy: Enemy): AbilityResolution {
        const rawDamage = player.intelligence.value * 2.5 + player.damage * 0.5;
        const dealt = enemy.takeDamage(rawDamage, 0.5);
        return this.createResolution(AbilityEffectType.Damage, dealt, "enemy");
    }

    useOnPlayer(player: Player, enemy: Enemy): AbilityResolution {
        const rawDamage = enemy.damage * 2.2;
        const dealt = player.takeDamage(rawDamage, 0.5);
        return this.createResolution(AbilityEffectType.Damage, dealt, "player");
    }
}

class Heal extends Ability {
    constructor() {
        super(
            "Heal",
            AbilityType.Blessing,
            "Heal yourself",
            2,
            1,
            "heal.png",
            false,
            PlayerClassEnum.Mage
        );
    }

    use(player: Player, enemy: Enemy): AbilityResolution {
        const healed = player.heal(player.faith.value * 2);
        return this.createResolution(AbilityEffectType.Heal, healed, "player");
    }

    useOnPlayer(player: Player, enemy: Enemy): AbilityResolution {
        const healed = enemy.heal(enemy.damage * 1.5);
        return this.createResolution(AbilityEffectType.Heal, healed, "enemy");
    }
}

class Poison extends Ability {
    constructor() {
        super(
            "Poison",
            AbilityType.Curse,
            "Poison your enemy for 2 turns",
            2,
            1,
            "poison.png",
            false,
            PlayerClassEnum.Rogue
        );
    }

    use(player: Player, enemy: Enemy): AbilityResolution {
        const rawDamage = player.faith.value * 2.5;
        const dealt = enemy.takeDamage(rawDamage, 0.25);
        return this.createResolution(AbilityEffectType.Damage, dealt, "enemy");
    }

    useOnPlayer(player: Player, enemy: Enemy): AbilityResolution {
        const rawDamage = enemy.damage * 1.8;
        const dealt = player.takeDamage(rawDamage, 0.25);
        return this.createResolution(AbilityEffectType.Damage, dealt, "player");
    }
}

class ArmorOfLight extends Ability {
    constructor() {
        super(
            "Armor of Light",
            AbilityType.Blessing,
            "Boost armor for 2 turns",
            2,
            1,
            "armor_of_light.png",
            false,
            PlayerClassEnum.Warrior
        );
    }

    use(player: Player, enemy: Enemy): AbilityResolution {
        return this.createResolution(AbilityEffectType.Buff, 10, "player", 2, "armor");
    }

    useOnPlayer(player: Player, enemy: Enemy): AbilityResolution {
        return this.createResolution(AbilityEffectType.Buff, 10, "enemy", 2, "armor");
    }
}

export {
    AbilityType,
    Ability,
    AbilityEffectType,
    Slash,
    Stab,
    Fireball,
    Heal,
    Poison,
    ArmorOfLight,
};

export type { AbilityResolution, AbilityTarget };
