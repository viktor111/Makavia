import { Guid } from "../helpers/guid";
import { Random } from "../helpers/random";
import { Attribute, AttributeEnum } from "./attributes";
import { WorldTierEnum } from "./worldTier";

type DropRates = {
    Common: number;
    Uncommon: number;
    Rare: number;
    Epic: number;
    Legendary: number;
    Mythical: number;
    Artifact: number;
};

enum ItemRarity {
    Common = 'Common',
    Uncommon = 'Uncommon',
    Rare = 'Rare',
    Epic = 'Epic',
    Legendary = 'Legendary',
    Mythical = 'Mythical',
    Artifact = 'Artifact',
}

enum ItemType {
    Weapon,
    Armor,
    Accessory,
}

enum WeaponType {
    Sword,
    Axe,
    Mace,
    Dagger,
    Spear,
    Bow,
    Crossbow,
    Staff,
    Wand,
    Shield,
}

enum ArmorType {
    Light,
    Medium,
    Heavy,
}

enum ItemSlot {
    Head,
    Chest,
    Legs,
    Feet,
    Hands,
    MainHand,
    OffHand,
    Ring,
    Neck,
}

enum ItemTier {
    Tier0 = 0,
    Tier1 = 1,
    Tier2 = 2,
    Tier3 = 3,
    Tier4 = 4,
    Tier5 = 5,
    Tier6 = 6,
    Tier7 = 7,
    Tier8 = 8,
    Tier9 = 9,
    Tier10 = 10,
    Tier11 = 11,
    Tier12 = 12,
    Tier13 = 13,
    Tier14 = 14,
    Tier15 = 15,
    Tier16 = 16,
    Tier17 = 17,
    Tier18 = 18,
    Tier19 = 19,
    Tier20 = 20,
    Tier21 = 21,
    Tier22 = 22,
    Tier23 = 23,
    Tier24 = 24,
    Tier25 = 25,
    Tier26 = 26,
    Tier27 = 27,
    Tier28 = 28,
    Tier29 = 29,
    Tier30 = 30,
    Tier31 = 31,
}

class Item {
    id: string;
    name: string;
    type: ItemType;
    rarity: ItemRarity;
    slot: ItemSlot;
    tier: ItemTier;
    description: string;
    isEquipped: boolean = false;
    dateCreated: Date = new Date();

    constructor(name: string, type: ItemType, rarity: ItemRarity, slot: ItemSlot, tier: ItemTier, description: string, isEquipped: boolean) {
        this.id = Guid.generateGUID();
        this.name = name;
        this.type = type;
        this.rarity = rarity;
        this.slot = slot;
        this.tier = tier;
        this.description = description;
        this.isEquipped = isEquipped;
    }
}

class Weapon extends Item {
    damage: number;
    weaponType: WeaponType;

    constructor(name: string, rarity: ItemRarity, slot: ItemSlot, tier: ItemTier, description: string, damage: number, weaponType: WeaponType, isEquipped: boolean) {
        super(name, ItemType.Weapon, rarity, slot, tier, description, isEquipped);
        this.damage = damage;
        this.weaponType = weaponType;
    }
}

class Armor extends Item {
    armor: number;
    armorType: ArmorType;

    constructor(name: string, rarity: ItemRarity, slot: ItemSlot, tier: ItemTier, description: string, armor: number, armorType: ArmorType, isEquipped: boolean) {
        super(name, ItemType.Armor, rarity, slot, tier, description, isEquipped);
        this.armor = armor;
        this.armorType = armorType;
    }
}

class Accessory extends Item {
    atributeBonus: number;
    atributeToBoost: AttributeEnum;

    constructor(name: string, rarity: ItemRarity, slot: ItemSlot, tier: ItemTier, description: string, atributeBonus: number, atributeToBoost: AttributeEnum, isEquipped: boolean) {
        super(name, ItemType.Accessory, rarity, slot, tier, description, isEquipped);
        this.atributeBonus = atributeBonus;
        this.atributeToBoost = atributeToBoost;
    }
}

class ItemGenerator {
   
    generateItem(worldTier: WorldTierEnum, itemSlot?: ItemSlot, itemType?: ItemType, armorType?: ArmorType, weaponType?: WeaponType): Item {
        let damageMultiplier = 1;
        let armorMultiplier = 1;
        let attributeBonusMultiplier = 1;

        let dropRates: DropRates = {
            Common: 0.001,
            Uncommon: 0.001,
            Rare: 0.005,
            Epic: 0.9,
            Legendary: 0.9,
            Mythical: 0.1,
            Artifact: 0.9
        };

        switch (worldTier) {
            case WorldTierEnum.Base:
                damageMultiplier = 1;
                armorMultiplier = 1;
                attributeBonusMultiplier = 1;
                dropRates.Common = 0.8;
                dropRates.Uncommon = 0.8;
                dropRates.Rare = 0.3;
                dropRates.Epic = 0.1;
                dropRates.Legendary = 0.001;
                dropRates.Mythical = 0.00001;
                dropRates.Artifact = 0.000001;
                break;
            case WorldTierEnum.Advanced:
                damageMultiplier = 1.5;
                armorMultiplier = 1.5;
                attributeBonusMultiplier = 1.5;
                dropRates.Common = 0.4;
                dropRates.Uncommon = 0.6;
                dropRates.Rare = 0.6;
                dropRates.Epic = 0.5;
                dropRates.Legendary = 0.1;
                dropRates.Mythical = 0.00001;
                dropRates.Artifact = 0.000001;
                break;
            case WorldTierEnum.Legendary:
                damageMultiplier = 2;
                armorMultiplier = 2;
                attributeBonusMultiplier = 2;
                dropRates.Common = 0.2;
                dropRates.Uncommon = 0.2;
                dropRates.Rare = 0.3;
                dropRates.Epic = 0.5;
                dropRates.Legendary = 0.2;
                dropRates.Mythical = 0.00001;
                dropRates.Artifact = 0.000001;
                break;
            case WorldTierEnum.Mythical:
                damageMultiplier = 2.5;
                armorMultiplier = 2.5;
                attributeBonusMultiplier = 2.5;
                dropRates.Common = 0.1;
                dropRates.Uncommon = 0.1;
                dropRates.Rare = 0.2;
                dropRates.Epic = 0.5;
                dropRates.Legendary = 0.4;
                dropRates.Mythical = 0.1;
                dropRates.Artifact = 0.000001;
                break;
            case WorldTierEnum.Demonic:
                damageMultiplier = 3;
                armorMultiplier = 3;
                attributeBonusMultiplier = 3;
                dropRates.Common = 0.1;
                dropRates.Uncommon = 0.1;
                dropRates.Rare = 0.2;
                dropRates.Epic = 0.5;
                dropRates.Legendary = 0.4;
                dropRates.Mythical = 0.3;
                dropRates.Artifact = 0.000001;
                break;
            case WorldTierEnum.Hellish:
                damageMultiplier = 3.5;
                armorMultiplier = 3.5;
                attributeBonusMultiplier = 3.5;
                dropRates.Common = 0.1;
                dropRates.Uncommon = 0.1;
                dropRates.Rare = 0.2;
                dropRates.Epic = 0.5;
                dropRates.Legendary = 0.4;
                dropRates.Mythical = 0.3;
                dropRates.Artifact = 0.1;
                break;
            case WorldTierEnum.Godlike:
                damageMultiplier = 4;
                armorMultiplier = 4;
                attributeBonusMultiplier = 4;
                dropRates.Common = 0.1;
                dropRates.Uncommon = 0.1;
                dropRates.Rare = 0.2;
                dropRates.Epic = 0.5;
                dropRates.Legendary = 0.4;
                dropRates.Mythical = 0.3;
                dropRates.Artifact = 0.2;
                break;
        }

        let cumulativeRates: DropRates = {
            Common: 0,
            Uncommon: 0,
            Rare: 0,
            Epic: 0,
            Legendary: 0,
            Mythical: 0,
            Artifact: 0
        };
        
        let sum = 0;
        for (const rarity in dropRates) {
            if (dropRates.hasOwnProperty(rarity)) {
                const key = rarity as keyof DropRates;
                sum += dropRates[key];
                cumulativeRates[key] = sum;
            }
        }

        let newItem: Item;

        if (!itemSlot) {
            itemSlot = this.randomItemSlot();
        }
        const tier = this.randomItemTier(worldTier);
        const itemRarity = this.determineItemRarity(cumulativeRates);
        if (itemType === undefined) {
            itemType = this.randomItemType();
            console.log(itemType);
        }
        const description = `A ${itemRarity} ${ItemType[itemType]} item`;

        switch (itemType) {
            case ItemType.Weapon:
                if (!weaponType) {
                    weaponType = this.randomWeaponType();
                }
                newItem = new Weapon(`${itemRarity.toString()}-${itemType.toString()}`, itemRarity, itemSlot, tier, description, this.calculateDamage(itemRarity, worldTier), weaponType, false);
                break;
            case ItemType.Armor:
                if (!armorType) {
                    armorType = this.randomArmorType();
                }
                newItem = new Armor(`${itemRarity.toString()}-${itemType.toString()}`, itemRarity, itemSlot, tier, description, this.calculateArmor(itemRarity, worldTier), armorType, false);
                break;
            case ItemType.Accessory:
                newItem = new Accessory(`${itemRarity.toString()}-${itemType.toString()}`, itemRarity, itemSlot, tier, description, this.calculateAttributeBonus(itemRarity, worldTier), this.randomAttribute(), false);
                break;
        }

        return newItem;
    }

    private calculateDamage(rarity: ItemRarity, worldTier: WorldTierEnum): number {
        let damage = 0;
        switch (rarity) {
            case ItemRarity.Common:
                damage = Math.round(1 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Uncommon:
                damage = Math.round(2 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Rare:
                damage = Math.round(3 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Epic:
                damage = Math.round(4 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Legendary:
                damage = Math.round(5 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Mythical:
                damage = Math.round(6 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Artifact:
                damage = Math.round(7 * this.calculateMultiplier(worldTier));
                break;
        }
        return damage;
    }

    private calculateArmor(rarity: ItemRarity, worldTier: WorldTierEnum): number {
        let armor = 0;
        switch (rarity) {
            case ItemRarity.Common:
                armor = Math.round(1 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Uncommon:
                armor = Math.round(2 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Rare:
                armor = Math.round(3 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Epic:
                armor = Math.round(4 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Legendary:
                armor = Math.round(5 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Mythical:
                armor = Math.round(6 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Artifact:
                armor = Math.round(7 * this.calculateMultiplier(worldTier));
                break;
        }
        return armor;
    }

    private calculateAttributeBonus(rarity: ItemRarity, worldTier: WorldTierEnum): number {
        let attributeBonus = 0;
        switch (rarity) {
            case ItemRarity.Common:
                attributeBonus = Math.round(1 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Uncommon:
                attributeBonus = Math.round(2 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Rare:
                attributeBonus = Math.round(3 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Epic:
                attributeBonus = Math.round(4 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Legendary:
                attributeBonus = Math.round(5 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Mythical:
                attributeBonus = Math.round(6 * this.calculateMultiplier(worldTier));
                break;
            case ItemRarity.Artifact:
                attributeBonus = Math.round(7 * this.calculateMultiplier(worldTier));
                break;
        }
        return attributeBonus;
    }

    private calculateMultiplier(worldTier: WorldTierEnum): number {
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
        return multiplier;
    }

    private randomItemType(): ItemType {
        const types = Object.values(ItemType).filter(value => typeof value === 'number') as ItemType[];
        return types[Math.floor(Math.random() * types.length)];
    }

    private randomItemSlot(): ItemSlot {
        const slots = Object.values(ItemSlot).filter(value => typeof value === 'number') as ItemSlot[];;
        return slots[Math.floor(Math.random() * slots.length)];
    }

    private randomItemTier(worldTier: WorldTierEnum): ItemTier {
        const tiers = Object.values(ItemTier).filter(value => typeof value === 'number') as ItemTier[];
        let tierNumber = 0;
        switch (worldTier) {
            case WorldTierEnum.Base:
                tierNumber = Random.getRandomNumberBetween(1, 3);
                break;
            case WorldTierEnum.Advanced:
                tierNumber = Random.getRandomNumberBetween(4, 6);
                break;
            case WorldTierEnum.Legendary:
                tierNumber = Random.getRandomNumberBetween(7, 9);
                break;
            case WorldTierEnum.Mythical:
                tierNumber = Random.getRandomNumberBetween(10, 12);
                break;
            case WorldTierEnum.Demonic:
                tierNumber = Random.getRandomNumberBetween(13, 15);
                break;
            case WorldTierEnum.Hellish:
                tierNumber = Random.getRandomNumberBetween(16, 30);
                break;
            case WorldTierEnum.Godlike:
                tierNumber = Random.getRandomNumberBetween(20, 30);
                break;
        }

        return tiers[tierNumber];
    }

    private randomArmorType(): ArmorType {
        const types = Object.values(ArmorType).filter(value => typeof value === 'number') as ArmorType[];
        return types[Math.floor(Math.random() * types.length)];
    }

    private randomWeaponType(): WeaponType {
        const types = Object.values(WeaponType).filter(value => typeof value === 'number') as WeaponType[];
        return types[Math.floor(Math.random() * types.length)];
    }

    private randomAttribute(): AttributeEnum {
        const attributes = Object.values(AttributeEnum).filter(value => typeof value === 'number') as AttributeEnum[];
        return attributes[Math.floor(Math.random() * attributes.length)];
    }

    private determineItemRarity(cumulativeRates: {[key in keyof typeof ItemRarity]: number}): ItemRarity {
        const randomValue = Math.random();
        for (const rarity in cumulativeRates) {
            if (cumulativeRates.hasOwnProperty(rarity)) {
                if (randomValue <= cumulativeRates[rarity as keyof typeof ItemRarity]) {
                    return this.mapKeyToEnum(rarity);
                }
            }
        }
        return this.determineItemRarity(cumulativeRates);
    }

    private mapKeyToEnum(key: string): ItemRarity {
        return ItemRarity[key as keyof typeof ItemRarity];
    }
}

export { ItemRarity, ItemType, WeaponType, ArmorType, ItemSlot, ItemTier, Item, Weapon, Armor, Accessory, ItemGenerator };
