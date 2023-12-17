enum WorldTierEnum {
    Base = 0,
    Advanced = 1,
    Legendary = 2,
    Mythical = 3,
    Demonic = 4, 
    Hellish = 5,
    Godlike = 6,
}

class WorldTier {
    description: string;
    tier: WorldTierEnum;

    constructor(tier: WorldTierEnum) {
        this.tier = tier;

        switch (tier) {
            case WorldTierEnum.Base:
                this.description = "Here you start your journey. You will find gear with a quiality of 1-3. With some luck you might find uncommon items.";
                break;
            case WorldTierEnum.Advanced:
                this.description = "Gear with a quiality of 4-6 can be found. You might also discover epic items now.";
                break;
            case WorldTierEnum.Legendary:
                this.description = "Gear with a quiality of 7-9 can be found. You might also discover some legendary items.";
                break;
            case WorldTierEnum.Mythical:
                this.description = "Gear with a quiality of 10-12 can be found. You might also discover some mythical items. And legendary items are more common.";
                break;
            case WorldTierEnum.Demonic:
                this.description = "Gear with a quiality of 13-15 can be found. Legendary and mythical items are more common.";
                break;
            case WorldTierEnum.Hellish:
                this.description = "Gear with quality 15+ can be found. It is now possile to craft legendary items.";
                break;
            case WorldTierEnum.Godlike:
                this.description = "Gear with quality 20+ can be found. Artifact items are now available.";
                break;
        }
    }
}

export {
    WorldTierEnum,
    WorldTier
}