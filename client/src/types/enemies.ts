import { Guid } from "../helpers/guid";
import { Ability, Fireball, Heal, Slash, Stab } from "./abilities";
import { Item, ItemGenerator } from "./items";
import { Player } from "./player";
import { WorldTierEnum } from "./worldTier";

class Enemy {
    id: string;
    name: string;
    health: number;
    damage: number;
    abilities: Ability[];
    image: string;
    isBoss: boolean;
    armor: number;
    dropTable: Item[];
    xpDrop: number;

    constructor(id: string,
        name: string,
        health: number,
        damage: number,
        abilities: Ability[],
        image: string,
        isBoss: boolean,
        armor: number,
        dropTable: Item[],
        xpDrop: number
        ) {
        this.id = id;
        this.name = name;
        this.health = health;
        this.damage = damage;
        this.abilities = abilities;
        this.image = image;
        this.isBoss = isBoss;
        this.armor = armor;
        this.dropTable = dropTable;
        this.xpDrop = xpDrop;
    }

    updateStatsBasedOnWorldTier(worldTier: WorldTierEnum) {
        let multiplier = 1;

        switch (worldTier) {
            case WorldTierEnum.Base:
                multiplier = 1;
                break;
            case WorldTierEnum.Advanced:
                multiplier = 1.5;
                break;
            case WorldTierEnum.Legendary:
                multiplier = 2;
                break;
            case WorldTierEnum.Mythical:
                multiplier = 2.5;
                break;
            case WorldTierEnum.Demonic:
                multiplier = 3;
                break;
            case WorldTierEnum.Hellish:
                multiplier = 3.5;
                break;
            case WorldTierEnum.Godlike:
                multiplier = 4;
                break;
        }

        this.health = Math.round(this.health * multiplier);
        this.damage = Math.round(this.damage * multiplier);
    }

    takeDamage(damage: number) {
        this.health -= damage - (this.armor / 2);
    }

    isDead() {
        return this.health <= 0;
    }

    useAbility(player: Player): { ability: Ability, abilityUseResult: number }{
        let ability = this.abilities[Math.floor(Math.random() * this.abilities.length)];
        let abilityUseResult = ability.useOnPlayer(player, this);

        return { ability, abilityUseResult };
    }

    dropItem(): Item {
        let item = this.dropTable[Math.floor(Math.random() * this.dropTable.length)];
        return item;
    }
}

class EnemyGenerator {
    generateEnemies(worldTier: WorldTierEnum, numberOfEnemies: number): Enemy[]{
        let healthMultiplier = 0;
        let damageMultiplier = 0;
        let armorMultiplier = 0;
        let xpMultiplier = 0;

        switch (worldTier) {
            case WorldTierEnum.Base:
                healthMultiplier = 1.1;
                damageMultiplier = 1.1;
                armorMultiplier = 1.1;
                xpMultiplier = 1.1;
                break;
            case WorldTierEnum.Advanced:
                healthMultiplier = 1.3;
                damageMultiplier = 1.3;
                armorMultiplier = 1.3;
                xpMultiplier = 1.1;
                break;
            case WorldTierEnum.Legendary:
                healthMultiplier = 2;
                damageMultiplier = 2;
                armorMultiplier = 2;
                xpMultiplier = 1.1;
                break;
            case WorldTierEnum.Mythical:
                healthMultiplier = 2.4;
                damageMultiplier = 2.4;
                armorMultiplier = 2.4;
                xpMultiplier = 1.1;
                break;
            case WorldTierEnum.Demonic:
                healthMultiplier = 3;
                damageMultiplier = 3;
                armorMultiplier = 3;
                xpMultiplier = 1.1;
                break;
            case WorldTierEnum.Hellish:
                healthMultiplier = 4;
                damageMultiplier = 4;
                armorMultiplier = 4;
                xpMultiplier = 1.1;
                break;
            case WorldTierEnum.Godlike:
                healthMultiplier = 5;
                damageMultiplier = 5;
                armorMultiplier = 5;
                xpMultiplier = 1.1;
                break;
        }

        let enemies: Enemy[] = [];

        for (let i = 0; i < numberOfEnemies; i++) {
            let enemy = this.generateEnemy(healthMultiplier, damageMultiplier, armorMultiplier, xpMultiplier, worldTier);
            enemies.push(enemy);
        }

        return enemies;
    }

    private generateEnemy(healthMultiplier: number, damageMultiplier: number, armorMultiplier: number, xpMultiplier: number, worldTier: WorldTierEnum): Enemy {
        let names = ["Goblin", "Bandit", "Wolf", "Spider", "Skeleton", "Zombie", "Orc", "Troll", "Giant", "Dragon"]

        const randomName = names[Math.floor(Math.random() * names.length)];

        let health = 0;
        let damage = 0;
        let armor = 0;
        let xpDrop = 0;
        let image = "";      

        let abilities: Ability[] = [];

        switch (randomName) {
            case "Goblin":
                health = 4
                damage = 2;
                armor = 1;
                xpDrop = 2;
                image = "goblin.png";
                abilities.push(new Slash());
                break;
            case "Bandit":
                health = 6
                damage = 3;
                armor = 1;
                xpDrop = 3;
                image = "bandit.png";
                abilities.push(new Slash());
                break;
            case "Wolf":
                health = 8
                damage = 4;
                armor = 0;
                xpDrop = 3;
                image = "wolf.png";
                abilities.push(new Slash());
                break;
            case "Spider":
                health = 10
                damage = 5;
                armor = 2;
                xpDrop = 4;
                image = "spider.png";
                abilities.push(new Slash());
                break;
            case "Skeleton":
                health = 12
                damage = 6;
                armor = 3;
                xpDrop = 5;
                image = "skeleton.png";
                abilities.push(new Slash(), new Stab());
                break;
            case "Zombie":
                health = 14
                damage = 7;
                armor = 4;
                xpDrop = 5;
                image = "zombie.png";
                abilities.push(new Slash(), new Heal());
                break;
            case "Orc":
                health = 16
                damage = 8;
                armor = 5;
                xpDrop = 6;
                image = "orc.png";
                abilities.push(new Slash(), new Stab());
                break;
            case "Troll":
                health = 18
                damage = 9;
                armor = 6;
                xpDrop = 6;
                image = "troll.png";
                abilities.push(new Slash(), new Stab(), new Fireball());
                break;
            case "Giant":
                health = 20
                damage = 10;
                armor = 7;
                xpDrop = 7;
                image = "giant.png";
                abilities.push(new Slash(), new Stab(), new Fireball());
                break;
            case "Dragon":  
                health = 22
                damage = 11;
                armor = 8;
                xpDrop = 10;
                image = "dragon.png";
                abilities.push(new Slash(), new Stab(), new Fireball(), new Heal());
                break;  
            }

        const guid = Guid.generateGUID();

        const itemTable = new ItemGenerator();

        const item1 = itemTable.generateItem(worldTier);
        const item2 = itemTable.generateItem(worldTier);
        const item3 = itemTable.generateItem(worldTier);
        const item4 = itemTable.generateItem(worldTier);
        const item5 = itemTable.generateItem(worldTier);

        let enemy = new Enemy(
            guid,
            randomName,
            health * healthMultiplier,
            damage * damageMultiplier,
            abilities,
            image,
            false,
            armor * armorMultiplier,
            [item1, item2, item3, item4, item5],
            xpDrop * xpMultiplier
        );

        return enemy;
    }
}

export { Enemy, EnemyGenerator };