import { Ability, AbilityEffectType, AbilityResolution } from "./abilities";
import { Attribute, AttributeEnum } from "./attributes";
import { PlayerClassEnum } from "./classes";
import { Enemy } from "./enemies";
import { Accessory, Armor, Item, ItemSlot, ItemType, Weapon } from "./items";
import { PlayerBackgroundEnum } from "./playerBackground";
import { WorldTierEnum } from "./worldTier";

const EXPERIENCE_PER_LEVEL = 100;

type PlayerAbilityOutcome = {
    resolution: AbilityResolution;
    experienceGained: number;
    leveledUp: boolean;
    droppedItem?: Item;
};

class Player {
    name: string;
    age: number;
    background: PlayerBackgroundEnum;
    class: PlayerClassEnum;
    worldTier: WorldTierEnum;
    gold: number;
    experience: number;
    level: number;
    skillPoints: number;

    health: number;
    maxHealth: number;
    mana: number;
    maxMana: number;
    stamina: number;
    maxStamina: number;
    piety: number;
    maxPiety: number;

    armor: number;
    damage: number;

    private baseArmor: number;
    private baseDamage: number;
    private baseAttributes!: Record<AttributeEnum, number>;

    inventory: Item[];

    equippedHead: string;
    equippedChest: string;
    equippedLegs: string;
    equippedFeet: string;
    equippedWeapon: string;
    equippedOffhand: string;
    equippedNeck: string;
    equippedRing: string;

    strength: Attribute;
    constitution: Attribute;
    intelligence: Attribute;
    charisma: Attribute;
    knowledge: Attribute;
    faith: Attribute;
    craftsmanship: Attribute;

    learnedAbilities: Ability[];

    constructor(
        name: string,
        age: number,
        background: PlayerBackgroundEnum,
        playerClass: PlayerClassEnum,
        strength: number,
        constitution: number,
        intelligence: number,
        charisma: number,
        knowledge: number,
        faith: number,
        craftsmanship: number,
        inventory: Item[],
        health: number,
        maxHealth: number,
        mana: number,
        maxMana: number,
        stamina: number,
        maxStamina: number,
        piety: number,
        maxPiety: number,
        armor: number,
        damage: number,
        equippedHead: string,
        equippedChest: string,
        equippedLegs: string,
        equippedFeet: string,
        equippedWeapon: string,
        equippedOffhand: string,
        equippedNeck: string,
        equippedRing: string,
        learnedAbilities: Ability[],
        level: number,
        experience: number,
        gold: number,
        skillPoints: number,
        worldTier: WorldTierEnum,
    ) {
        this.name = name;
        this.age = age;
        this.background = background;
        this.class = playerClass;

        this.worldTier = worldTier;
        this.gold = gold;
        this.experience = experience;
        this.level = level;
        this.skillPoints = skillPoints;

        this.inventory = inventory;

        this.health = health;
        this.maxHealth = maxHealth;
        this.mana = mana;
        this.maxMana = maxMana;
        this.stamina = stamina;
        this.maxStamina = maxStamina;
        this.piety = piety;
        this.maxPiety = maxPiety;

        this.baseArmor = armor;
        this.armor = armor;
        this.baseDamage = damage;
        this.damage = damage;

        this.equippedHead = equippedHead;
        this.equippedChest = equippedChest;
        this.equippedLegs = equippedLegs;
        this.equippedFeet = equippedFeet;
        this.equippedWeapon = equippedWeapon;
        this.equippedOffhand = equippedOffhand;
        this.equippedNeck = equippedNeck;
        this.equippedRing = equippedRing;

        this.strength = new Attribute(AttributeEnum.Strength, strength);
        this.constitution = new Attribute(AttributeEnum.Constitution, constitution);
        this.intelligence = new Attribute(AttributeEnum.Intelligence, intelligence);
        this.charisma = new Attribute(AttributeEnum.Charisma, charisma);
        this.knowledge = new Attribute(AttributeEnum.Knowledge, knowledge);
        this.faith = new Attribute(AttributeEnum.Faith, faith);
        this.craftsmanship = new Attribute(AttributeEnum.Craftsmanship, craftsmanship);

        this.learnedAbilities = learnedAbilities;

        this.applyBackgroundBonuses();
        this.captureBaseAttributes();
        this.applyEquipmentBonuses();
    }

    learnAbility(ability: Ability): void {
        if (this.skillPoints <= 0) {
            throw new Error("Not enough skill points");
        }
        if (this.level < ability.playerLevelRequired) {
            throw new Error("Player level is too low");
        }
        if (this.learnedAbilities.includes(ability)) {
            throw new Error("Ability already learned");
        }
        this.learnedAbilities.push(ability);
        ability.learn();
        this.skillPoints--;
    }

    takeDamage(rawDamage: number, armorPenetration: number = 0): number {
        const damageTaken = this.calculateMitigatedDamage(rawDamage, armorPenetration, this.armor);
        this.health = Math.max(0, this.health - damageTaken);
        return damageTaken;
    }

    heal(amount: number): number {
        if (amount <= 0) {
            return 0;
        }
        const previousHealth = this.health;
        this.health = Math.min(this.maxHealth, this.health + amount);
        return this.health - previousHealth;
    }

    adjustArmor(amount: number): void {
        this.armor = Math.max(0, this.armor + amount);
    }

    useAbility(ability: Ability, enemy: Enemy): PlayerAbilityOutcome {
        const resolution = ability.use(this, enemy);

        let experienceGained = 0;
        let leveledUp = false;
        let droppedItem: Item | undefined;

        if (resolution.effect === AbilityEffectType.Damage && resolution.target === "enemy" && enemy.isDead()) {
            experienceGained = enemy.xpDrop;
            leveledUp = this.gainExperience(experienceGained);
            droppedItem = enemy.dropItem();
            this.addItemToInventory(droppedItem);
        }

        return {
            resolution,
            experienceGained,
            leveledUp,
            droppedItem,
        };
    }

    gainExperience(experience: number): boolean {
        this.experience += experience;
        let leveledUp = false;

        while (this.experience >= EXPERIENCE_PER_LEVEL) {
            this.experience -= EXPERIENCE_PER_LEVEL;
            this.levelUp();
            leveledUp = true;
        }

        return leveledUp;
    }

    private levelUp(): void {
        this.level++;
        this.skillPoints += 1;
    }

    isDead(): boolean {
        return this.health <= 0;
    }

    equipHead(itemId: string): void {
        this.equippedHead = this.swapArmor(this.equippedHead, itemId, ItemSlot.Head);
        this.applyEquipmentBonuses();
    }

    equipChest(itemId: string): void {
        this.equippedChest = this.swapArmor(this.equippedChest, itemId, ItemSlot.Chest);
        this.applyEquipmentBonuses();
    }

    equipLegs(itemId: string): void {
        this.equippedLegs = this.swapArmor(this.equippedLegs, itemId, ItemSlot.Legs);
        this.applyEquipmentBonuses();
    }

    equipFeet(itemId: string): void {
        this.equippedFeet = this.swapArmor(this.equippedFeet, itemId, ItemSlot.Feet);
        this.applyEquipmentBonuses();
    }

    equipWeapon(itemId: string): void {
        this.equippedWeapon = this.swapWeapon(this.equippedWeapon, itemId, false);
        this.applyEquipmentBonuses();
    }

    equipOffhand(itemId: string): void {
        this.equippedOffhand = this.swapWeapon(this.equippedOffhand, itemId, true);
        this.applyEquipmentBonuses();
    }

    equipNeck(itemId: string): void {
        this.equippedNeck = this.swapAccessory(this.equippedNeck, itemId, ItemSlot.Neck);
        this.applyEquipmentBonuses();
    }

    equipRing(itemId: string): void {
        this.equippedRing = this.swapAccessory(this.equippedRing, itemId, ItemSlot.Ring);
        this.applyEquipmentBonuses();
    }

    addItemToInventory(item: Item): void {
        this.inventory.push(item);
    }

    checkIfItemIsInInventory(item: Item): boolean {
        return this.inventory.includes(item);
    }

    getAttributes(): Attribute[] {
        return [
            this.strength,
            this.constitution,
            this.intelligence,
            this.charisma,
            this.knowledge,
            this.faith,
            this.craftsmanship,
        ];
    }

    private swapArmor(currentItemId: string, newItemId: string, slot: ItemSlot): string {
        this.unequip(currentItemId);
        const item = this.findInventoryItem(newItemId);

        if (!item) {
            throw new Error("Item not found");
        }

        if (item.type !== ItemType.Armor || item.slot !== slot) {
            throw new Error("Item is not valid armor for this slot");
        }

        item.isEquipped = true;
        return item.id;
    }

    private swapWeapon(currentItemId: string, newItemId: string, isOffHand: boolean): string {
        this.unequip(currentItemId);
        const item = this.findInventoryItem(newItemId);

        if (!item) {
            throw new Error("Item not found");
        }

        if (item.type !== ItemType.Weapon) {
            throw new Error("Item is not a weapon");
        }

        if (isOffHand && item.slot !== ItemSlot.OffHand) {
            throw new Error("Weapon is not an off-hand weapon");
        }

        if (!isOffHand && item.slot !== ItemSlot.MainHand) {
            throw new Error("Weapon is not a main-hand weapon");
        }

        item.isEquipped = true;
        return item.id;
    }

    private swapAccessory(currentItemId: string, newItemId: string, slot: ItemSlot): string {
        this.unequip(currentItemId);
        const item = this.findInventoryItem(newItemId);

        if (!item) {
            throw new Error("Item not found");
        }

        if (item.type !== ItemType.Accessory || item.slot !== slot) {
            throw new Error("Item is not a valid accessory for this slot");
        }

        item.isEquipped = true;
        return item.id;
    }

    private unequip(itemId?: string): void {
        if (!itemId) {
            return;
        }

        const item = this.findInventoryItem(itemId);
        if (item) {
            item.isEquipped = false;
        }
    }

    private findInventoryItem(itemId: string): Item | undefined {
        return this.inventory.find(item => item.id === itemId);
    }

    private applyEquipmentBonuses(): void {
        this.inventory.forEach(item => {
            item.isEquipped = false;
        });

        this.armor = this.baseArmor;
        this.damage = this.baseDamage;
        this.resetAttributesToBase();

        this.applyArmorFromSlot(this.equippedHead, ItemSlot.Head);
        this.applyArmorFromSlot(this.equippedChest, ItemSlot.Chest);
        this.applyArmorFromSlot(this.equippedLegs, ItemSlot.Legs);
        this.applyArmorFromSlot(this.equippedFeet, ItemSlot.Feet);

        this.applyWeaponFromSlot(this.equippedWeapon, false);
        this.applyWeaponFromSlot(this.equippedOffhand, true);

        this.applyAccessoryFromSlot(this.equippedNeck, ItemSlot.Neck);
        this.applyAccessoryFromSlot(this.equippedRing, ItemSlot.Ring);
    }

    private applyArmorFromSlot(itemId: string | undefined, slot: ItemSlot): void {
        if (!itemId) {
            return;
        }

        const item = this.findInventoryItem(itemId);
        if (!item || item.type !== ItemType.Armor || item.slot !== slot) {
            return;
        }

        item.isEquipped = true;
        this.updateArmorFromItem(item as Armor);
    }

    private applyWeaponFromSlot(itemId: string | undefined, isOffHand: boolean): void {
        if (!itemId) {
            return;
        }

        const item = this.findInventoryItem(itemId);
        if (!item || item.type !== ItemType.Weapon) {
            return;
        }

        if (isOffHand && item.slot !== ItemSlot.OffHand) {
            return;
        }

        if (!isOffHand && item.slot !== ItemSlot.MainHand) {
            return;
        }

        item.isEquipped = true;
        this.updateDamageFromItem(item as Weapon, isOffHand);
    }

    private applyAccessoryFromSlot(itemId: string | undefined, slot: ItemSlot): void {
        if (!itemId) {
            return;
        }

        const item = this.findInventoryItem(itemId);
        if (!item || item.type !== ItemType.Accessory || item.slot !== slot) {
            return;
        }

        item.isEquipped = true;
        this.updateAttributesFromAccessory(item as Accessory);
    }

    private updateArmorFromItem(armor: Armor): void {
        this.armor += armor.armor;
    }

    private updateDamageFromItem(weapon: Weapon, isOffHand: boolean): void {
        if (isOffHand) {
            this.damage += weapon.damage / 2;
        } else {
            this.damage += weapon.damage;
        }
    }

    private updateAttributesFromAccessory(accessory: Accessory): void {
        switch (accessory.atributeToBoost) {
            case AttributeEnum.Strength:
                this.strength.value += accessory.atributeBonus;
                break;
            case AttributeEnum.Constitution:
                this.constitution.value += accessory.atributeBonus;
                break;
            case AttributeEnum.Intelligence:
                this.intelligence.value += accessory.atributeBonus;
                break;
            case AttributeEnum.Charisma:
                this.charisma.value += accessory.atributeBonus;
                break;
            case AttributeEnum.Knowledge:
                this.knowledge.value += accessory.atributeBonus;
                break;
            case AttributeEnum.Faith:
                this.faith.value += accessory.atributeBonus;
                break;
            case AttributeEnum.Craftsmanship:
                this.craftsmanship.value += accessory.atributeBonus;
                break;
        }
    }

    private captureBaseAttributes(): void {
        this.baseAttributes = {
            [AttributeEnum.Strength]: this.strength.value,
            [AttributeEnum.Constitution]: this.constitution.value,
            [AttributeEnum.Intelligence]: this.intelligence.value,
            [AttributeEnum.Charisma]: this.charisma.value,
            [AttributeEnum.Knowledge]: this.knowledge.value,
            [AttributeEnum.Faith]: this.faith.value,
            [AttributeEnum.Craftsmanship]: this.craftsmanship.value,
        };
    }

    private resetAttributesToBase(): void {
        this.strength.value = this.baseAttributes[AttributeEnum.Strength];
        this.constitution.value = this.baseAttributes[AttributeEnum.Constitution];
        this.intelligence.value = this.baseAttributes[AttributeEnum.Intelligence];
        this.charisma.value = this.baseAttributes[AttributeEnum.Charisma];
        this.knowledge.value = this.baseAttributes[AttributeEnum.Knowledge];
        this.faith.value = this.baseAttributes[AttributeEnum.Faith];
        this.craftsmanship.value = this.baseAttributes[AttributeEnum.Craftsmanship];
    }

    private applyBackgroundBonuses(): void {
        switch (this.background) {
            case PlayerBackgroundEnum.Traveler:
                this.intelligence.value += 2;
                this.charisma.value += 2;
                break;
            case PlayerBackgroundEnum.Criminal:
                this.charisma.value += 2;
                this.craftsmanship.value += 2;
                break;
            case PlayerBackgroundEnum.Soldier:
                this.strength.value += 2;
                this.constitution.value += 2;
                break;
            case PlayerBackgroundEnum.Noble:
                this.charisma.value += 2;
                this.knowledge.value += 2;
                break;
            case PlayerBackgroundEnum.Sage:
                this.intelligence.value += 2;
                this.knowledge.value += 2;
                break;
            case PlayerBackgroundEnum.Entertainer:
                this.charisma.value += 3;
                this.intelligence.value += 1;
                break;
            case PlayerBackgroundEnum.Hermit:
                this.knowledge.value += 1;
                this.intelligence.value += 3;
                break;
            case PlayerBackgroundEnum.Devout:
                this.faith.value += 3;
                this.charisma.value += 1;
                break;
        }
    }

    private calculateMitigatedDamage(rawDamage: number, armorPenetration: number, armor: number): number {
        const effectiveArmor = Math.max(0, armor * (1 - armorPenetration));
        const mitigationRatio = Math.min(effectiveArmor / 100, 0.9);
        const mitigated = rawDamage * (1 - mitigationRatio);
        return Math.max(0, mitigated);
    }
}

export { Player };
export type { PlayerAbilityOutcome };
