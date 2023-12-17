import { Ability, AbilityType } from "./abilities";
import { Attribute, AttributeEnum } from "./attributes";
import { PlayerClassEnum } from "./classes";
import { Enemy } from "./enemies";
import { Accessory, Armor, Item, ItemSlot, ItemType, Weapon } from "./items";
import { PlayerBackgroundEnum } from "./playerBackground";

class Player {
    name: string;
    age: number;
    background: PlayerBackgroundEnum;
    class: PlayerClassEnum;
    worldTier: number;
    gold: number;
    expiriance: number;
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

    inventory: Item[];

    equippedHead: string;
    equippedChest: string;
    equippedLegs: string;
    equippedFeet: string;
    equippedWeapon: string;
    equippedOffhand: string;
    equippedNeck: string;
    equppedRing: string;

    strength: Attribute;
    constitution: Attribute;
    intelligence: Attribute;
    charisma: Attribute;
    knowledge: Attribute;
    faith: Attribute;
    craftsmanship: Attribute;

    learnedAbilities: Ability[];

    constructor(name: string,
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
        equppedRing: string,
        learnedAbilities: Ability[],
        level: number,
        expiriance: number,
        gold: number,
        skillPoints: number,
        worldTier: number,
    ) {
        this.name = name;
        this.age = age;
        this.background = background;
        this.class = playerClass;

        this.worldTier = worldTier;
        this.gold = gold;
        this.expiriance = expiriance;
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

        this.armor = armor;
        this.damage = damage;

        this.equippedHead = equippedHead;
        this.equippedChest = equippedChest;
        this.equippedLegs = equippedLegs;
        this.equippedFeet = equippedFeet;
        this.equippedWeapon = equippedWeapon;
        this.equippedOffhand = equippedOffhand;
        this.equippedNeck = equippedNeck;
        this.equppedRing = equppedRing;

        this.strength = new Attribute(AttributeEnum.Strength, strength);
        this.constitution = new Attribute(AttributeEnum.Constitution, constitution);
        this.intelligence = new Attribute(AttributeEnum.Intelligence, intelligence);
        this.charisma = new Attribute(AttributeEnum.Charisma, charisma);
        this.knowledge = new Attribute(AttributeEnum.Knowledge, knowledge);
        this.faith = new Attribute(AttributeEnum.Faith, faith);
        this.craftsmanship = new Attribute(AttributeEnum.Craftsmanship, craftsmanship);

        this.learnedAbilities = learnedAbilities;

        this.addBonusForEquippedItems();
        this.addBonusToAttributesByBackgroudn();
    }

    addBonusForEquippedItems(): void {
        if (this.equippedHead) {
            let item = this.inventory.find(item => item.id === this.equippedHead);
            if (item) {
                this.updateArmorFromItem(item as Armor);
            }
        }
        if (this.equippedChest) {
            let item = this.inventory.find(item => item.id === this.equippedChest);
            if (item) {
                this.updateArmorFromItem(item as Armor);
            }
        }
        if (this.equippedLegs) {
            let item = this.inventory.find(item => item.id === this.equippedLegs);
            if (item) {
                this.updateArmorFromItem(item as Armor);
            }
        }
        if (this.equippedFeet) {
            let item = this.inventory.find(item => item.id === this.equippedFeet);
            if (item) {
                this.updateArmorFromItem(item as Armor);
            }
        }
        if (this.equippedWeapon) {
            let item = this.inventory.find(item => item.id === this.equippedWeapon);
            if (item) {
                this.updateDamageFromItem(item as Weapon, false);
            }
        }
        if (this.equippedOffhand) {
            let item = this.inventory.find(item => item.id === this.equippedOffhand);
            if (item) {
                this.updateDamageFromItem(item as Weapon, true);
            }
        }
        if (this.equippedNeck) {
            let item = this.inventory.find(item => item.id === this.equippedNeck);
            if (item) {
                this.updateAttributesFromAccessorie(item as Accessory);
            }
        }
        if (this.equppedRing) {
            let item = this.inventory.find(item => item.id === this.equppedRing);
            if (item) {
                this.updateAttributesFromAccessorie(item as Accessory);
            }
        }
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

    takeDamage(damage: number): void {
        const damgeToTake = damage - (this.armor / 2);
        this.health -= damgeToTake;
    }

    useAbility(ability: Ability, enemy: Enemy): void {
        ability.use(this, enemy);
        if (ability.type === AbilityType.Attack || ability.type === AbilityType.Special || ability.type === AbilityType.Curse) {

            if (enemy.isDead()) {
                this.gainExp(enemy.xpDrop);
                let droppedItem = enemy.dropItem();
                this.addItemToInventory(droppedItem);
            }
        }
    }

    gainExp(exp: number): void {
        this.expiriance += exp;
        if (this.expiriance >= 100) {
            this.levelUp();
        }
    }

    levelUp(): void {
        this.level++;
        this.expiriance = 0;
        this.skillPoints += 1;
    }

    isDead(): boolean {
        return this.health <= 0;
    }

    equipHead(itemId: string): void {
        if (this.equippedHead) {
            let item = this.inventory.find(item => item.id === this.equippedHead);
            if (item) {
                item.isEquipped = false;
            }
        }
        let item = this.inventory.find(item => item.id === itemId);
        if (item) {
            if (item.type === ItemType.Armor && item.slot === ItemSlot.Head) {
                this.equippedHead = item.id;
                this.updateArmorFromItem(item as Armor);
                item.isEquipped = true;
            }
            else {
                throw new Error("Item is not a head armor");
            }
        }
        else {
            throw new Error("Item not found");
        }
    }

    equipChest(itemId: string): void {
        if (this.equippedChest) {
            let item = this.inventory.find(item => item.id === this.equippedChest);
            if (item) {
                item.isEquipped = false;
            }
        }
        let item = this.inventory.find(item => item.id === itemId);
        if (item) {
            if (item.type === ItemType.Armor && item.slot === ItemSlot.Chest) {
                this.equippedChest = item.id;
                this.updateArmorFromItem(item as Armor);
                item.isEquipped = true;
            }
            else {
                throw new Error("Item is not a chest armor");
            }
        }
        else {
            throw new Error("Item not found");
        }
    }

    equipLegs(itemId: string): void {
        if (this.equippedLegs) {
            let item = this.inventory.find(item => item.id === this.equippedLegs);
            if (item) {
                item.isEquipped = false;
            }
        }
        let item = this.inventory.find(item => item.id === itemId);
        if (item) {
            if (item.type === ItemType.Armor && item.slot === ItemSlot.Legs) {
                this.equippedLegs = item.id;
                this.updateArmorFromItem(item as Armor);
                item.isEquipped = true;
            }
            else {
                throw new Error("Item is not a legs armor");
            }
        }
        else {
            throw new Error("Item not found");
        }
    }

    equipFeet(itemId: string): void {
        if (this.equippedFeet) {
            let item = this.inventory.find(item => item.id === this.equippedFeet);
            if (item) {
                item.isEquipped = false;
            }
        }
        let item = this.inventory.find(item => item.id === itemId);
        if (item) {
            if (item.type === ItemType.Armor && item.slot === ItemSlot.Feet) {
                this.equippedFeet = item.id;
                this.updateArmorFromItem(item as Armor);
                item.isEquipped = true;
            }
            else {
                throw new Error("Item is not a feet armor");
            }
        }
        else {
            throw new Error("Item not found");
        }
    }

    equipWeapon(itemId: string): void {
        if (this.equippedWeapon) {
            let item = this.inventory.find(item => item.id === this.equippedWeapon);
            if (item) {
                item.isEquipped = false;
            }
        }
        let item = this.inventory.find(item => item.id === itemId);
        if (item) {
            if (item.type === ItemType.Weapon && item.slot === ItemSlot.MainHand) {
                this.equippedWeapon = item.id;
                this.updateDamageFromItem(item as Weapon, false);
                item.isEquipped = true;
            }
            else {
                throw new Error("Item is not a weapon");
            }
        }
        else {
            throw new Error("Item not found");
        }
    }

    equipOffhand(itemId: string): void {
        if (this.equippedOffhand) {
            let item = this.inventory.find(item => item.id === this.equippedOffhand);
            if (item) {
                item.isEquipped = false;
            }
        }
        let item = this.inventory.find(item => item.id === itemId);
        if (item) {
            if (item.type === ItemType.Weapon && item.slot === ItemSlot.OffHand) {
                this.equippedOffhand = item.id;
                this.updateDamageFromItem(item as Weapon, true);
                item.isEquipped = true;
            }
            else {
                throw new Error("Item is not a weapon");
            }
        }
        else {
            throw new Error("Item not found");
        }
    }

    equipNeck(itemId: string): void {
        if (this.equippedNeck) {
            let item = this.inventory.find(item => item.id === this.equippedNeck);
            if (item) {
                item.isEquipped = false;
            }
        }
        let item = this.inventory.find(item => item.id === itemId);
        if (item) {
            if (item.type === ItemType.Accessory && item.slot === ItemSlot.Neck) {
                this.equippedNeck = item.id;
                this.updateAttributesFromAccessorie(item as Accessory);
                item.isEquipped = true;
            }
            else {
                throw new Error("Item is not a neck accessory");
            }
        }
        else {
            throw new Error("Item not found");
        }
    }

    equipRing(itemId: string): void {
        if (this.equppedRing) {
            let item = this.inventory.find(item => item.id === this.equppedRing);
            if (item) {
                item.isEquipped = false;
            }
        }
        let item = this.inventory.find(item => item.id === itemId);
        if (item) {
            if (item.type === ItemType.Accessory && item.slot === ItemSlot.Ring) {
                this.equppedRing = item.id;
                this.updateAttributesFromAccessorie(item as Accessory);
                item.isEquipped = true;
            }
            else {
                throw new Error("Item is not a ring accessory");
            }
        }
        else {
            throw new Error("Item not found");
        }
    }

    updateArmorFromItem(armor: Armor): void {
        this.armor += armor.armor;
    }

    updateDamageFromItem(weapon: Weapon, isOffHand: boolean): void {
        if (isOffHand) {
            this.damage += weapon.damage / 2;
        }
        else {
            this.damage += weapon.damage;
        }
    }

    updateAttributesFromAccessorie(accessory: Accessory): void {
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

    addItemToInventory(item: Item): void {
        this.inventory.push(item);
    }

    checkIfItemIsInInventory(item: Item): boolean {
        return this.inventory.includes(item);
    }

    getAttributes(): Attribute[] {
        return [this.strength, this.constitution, this.intelligence, this.charisma, this.knowledge, this.faith, this.craftsmanship];
    }

    addBonusToAttributesByBackgroudn(): void {
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
}

export { Player };