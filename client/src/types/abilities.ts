import { PlayerClassEnum } from "./classes";
import { Player } from "./player";
import { Enemy } from "./enemies";

enum AbilityType {
    Attack,
    Defence,
    Belssing,
    Curse,
    Special,
    Passive,
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

    constructor(name: string,
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

    learn() {
        this.isUnlocked = true;
    }

    abstract use(player: Player, enemy: Enemy): void;
}

class Slash extends Ability {

    constructor() {
        super("Slash", AbilityType.Attack, "Slash your enemy with your sword", 1, 1, "slash.png", false, PlayerClassEnum.Warrior);
    }

    use(player: Player, enemy: Enemy) {
        let damage = player.strength.value * 2;
        enemy.health -= damage;
    }
}

class Stab extends Ability {

    constructor() {
        super("Stab", AbilityType.Attack, "Stab your enemy with your dagger", 1, 1, "stab.png", false, PlayerClassEnum.Rogue);
    }

    use(player: Player, enemy: Enemy) {
        let damage = player.strength.value * 2;
        enemy.health -= damage;
    }
}

class Fireball extends Ability {

    constructor() {
        super("Fireball", AbilityType.Attack, "Throw a fireball at your enemy", 1, 1, "fireball.png", false, PlayerClassEnum.Mage);
    }

    use(player: Player, enemy: Enemy) {
        let damage = player.intelligence.value * 2;
        enemy.health -= damage;
    }
}

class Heal extends Ability {

    constructor() {
        super("Heal", AbilityType.Belssing, "Heal yourself", 2, 1, "heal.png", false, PlayerClassEnum.Mage);
    }

    use(player: Player, enemy: Enemy) {
        let heal = player.faith.value * 2;
        player.health += heal;
    }
}

class Poison extends Ability {

    constructor() {
        super("Poison", AbilityType.Curse, "Poison your enemy for 2 turns", 2, 1, "poison.png", false, PlayerClassEnum.Rogue);
    }

    use(player: Player, enemy: Enemy) {
        let damage = player.faith.value * 2;
        enemy.health -= damage;
    }
}

class ArmorOfLight extends Ability {

    constructor() {
        super("Armor of Light", AbilityType.Belssing, "Boost armor for 2 tuns", 2, 1, "armor_of_light.png", false, PlayerClassEnum.Warrior);
    }

    use(player: Player, enemy: Enemy) {
        player.armor += 10;
    }
}

export { AbilityType, Ability, Slash, Stab, Fireball, Heal, Poison, ArmorOfLight };