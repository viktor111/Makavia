import { Ability, ArmorOfLight, Heal, Slash } from "../types/abilities";
import { Attribute, AttributeEnum } from "../types/attributes";
import { PlayerClassEnum } from "../types/classes";
import { Item, ItemGenerator, ItemSlot, ItemType } from "../types/items";
import { Player } from "../types/player";
import { PlayerBackgroundEnum } from "../types/playerBackground";
import { WorldTierEnum } from "../types/worldTier";

class PlayerTestData {
    static generate(): Player {
        const name: string = "Test Player";
        const age: number = 20;
        const background: PlayerBackgroundEnum = PlayerBackgroundEnum.Noble;
        const playerClass: PlayerClassEnum = PlayerClassEnum.Warrior;
        const worldTier: WorldTierEnum = WorldTierEnum.Hellish;
        const gold: number = 100;
        const experience: number = 10;
        const level: number = 2;
        const skillPoints: number = 2;

        const health: number = 100;
        const maxHealth: number = 100;
        const mana: number = 100;
        const maxMana: number = 100;
        const stamina: number = 100;
        const maxStamina: number = 100;
        const piety: number = 100;
        const maxPiety: number = 100;

        const armor: number = 10;
        const damage: number = 10;

        const itemGenerator = new ItemGenerator();
        const headPiece: Item = itemGenerator.generateItem(worldTier, ItemSlot.Head, ItemType.Armor);
        const chestPiece: Item = itemGenerator.generateItem(worldTier, ItemSlot.Chest, ItemType.Armor);
        const legPiece: Item = itemGenerator.generateItem(worldTier, ItemSlot.Legs, ItemType.Armor);
        const feetPiece: Item = itemGenerator.generateItem(worldTier, ItemSlot.Feet, ItemType.Armor);
        const mainHandPiece: Item = itemGenerator.generateItem(worldTier, ItemSlot.MainHand, ItemType.Weapon);
        const offHandPiece: Item = itemGenerator.generateItem(worldTier, ItemSlot.OffHand, ItemType.Weapon);
        const neckPiece: Item = itemGenerator.generateItem(worldTier, ItemSlot.Neck, ItemType.Accessory);
        const ringPiece: Item = itemGenerator.generateItem(worldTier, ItemSlot.Ring, ItemType.Accessory);

        const inventory: Item[] = [headPiece, chestPiece, legPiece, feetPiece, mainHandPiece, offHandPiece, neckPiece, ringPiece];

        const equippedHead: string = headPiece.id;
        const equippedChest: string = chestPiece.id;
        const equippedLegs: string = legPiece.id;
        const equippedFeet: string = feetPiece.id;
        const equippedWeapon: string = mainHandPiece.id;
        const equippedOffhand: string = offHandPiece.id;
        const equippedNeck: string = neckPiece.id;
        const equippedRing: string = ringPiece.id;

        const strength: Attribute = new Attribute(AttributeEnum.Strength, 10);
        const constitution: Attribute = new Attribute(AttributeEnum.Constitution, 10);
        const intelligence: Attribute = new Attribute(AttributeEnum.Intelligence, 10);
        const charisma: Attribute = new Attribute(AttributeEnum.Charisma, 10);
        const knowledge: Attribute = new Attribute(AttributeEnum.Knowledge, 10);
        const faith: Attribute = new Attribute(AttributeEnum.Faith, 10);
        const craftsmanship: Attribute = new Attribute(AttributeEnum.Craftsmanship, 10);

        const learnedAbilities: Ability[] = [new Slash(), new Heal(), new ArmorOfLight()];
        const player = new Player(
            name,
            age,
            background,
            playerClass,
            strength.value,
            constitution.value,
            intelligence.value,
            charisma.value,
            knowledge.value,
            faith.value,
            craftsmanship.value,
            inventory,
            health,
            maxHealth,
            mana,
            maxMana,
            stamina,
            maxStamina,
            piety,
            maxPiety,
            armor,
            damage,
            equippedHead,
            equippedChest,
            equippedLegs,
            equippedFeet,
            equippedWeapon,
            equippedOffhand,
            equippedNeck,
            equippedRing,
            learnedAbilities,
            level,
            experience,
            gold,
            skillPoints,
            worldTier,
        );

        return player;
    }
}

export { PlayerTestData };
