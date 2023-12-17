enum PlayerBackgroundEnum {
    Traveler,
    Criminal,
    Soldier,
    Noble,
    Sage,
    Entertainer,
    Hermit,
    Devout,
}

class PlayerBackground {
    public background: PlayerBackgroundEnum;
    public description: string;

    constructor(background: PlayerBackgroundEnum) {
        this.background = background;

        this.description = PlayerBackground.getDescriptionForBackground(background);
    }

    public static getDescriptionForBackground(background: PlayerBackgroundEnum): string {
        switch (background) {
            case PlayerBackgroundEnum.Traveler:
                return "You are a seasoned traveler. Having left your home at a young age, you've wandered through diverse lands, gaining a deep understanding of the world and its myriad cultures. Your journey has sharpened your survival skills and gifted you with tales as numerous as the stars.";
            case PlayerBackgroundEnum.Criminal:
                return "A fugitive from justice, you've found refuge in the shadows of Makavia. Your past may be checkered, but the skills you've honed - stealth, cunning, and a certain moral flexibility - could prove invaluable. Here, in this new land, you might just find redemption, or perhaps a deeper descent into the underworld.";
            case PlayerBackgroundEnum.Soldier:
                return "Discipline and valor define your past as a soldier. From the clash of steel to the camaraderie of your unit, you've experienced the rigors of battle and the burden of command. Your tactical acumen and combat prowess make you a formidable force on any battlefield.";
            case PlayerBackgroundEnum.Noble:
                return "Born into privilege and power, you've walked the gilded halls of nobility all your life. Your upbringing has granted you not just wealth but a sophisticated understanding of courtly intrigue and politics. Yet, beneath the luxurious facade, you yearn for a life beyond the confines of aristocratic expectations.";
            case PlayerBackgroundEnum.Sage:
                return "Wisdom and knowledge are your constant companions. As a sage, you've dedicated your life to the pursuit of learning, delving into ancient texts and unraveling the mysteries of the universe. Your vast intellect and insight are your greatest assets, guiding you through the world's complexities.";
            case PlayerBackgroundEnum.Entertainer:
                return "Your life has been a tapestry of performances, from the humblest of street corners to the grandest of stages. Your art, be it music, storytelling, or theater, has the power to captivate and inspire. You've brought joy and wonder to many, but the life of an entertainer is as unpredictable as it is thrilling.";
            case PlayerBackgroundEnum.Hermit:
                return "Solitude has been your sole companion for years. In the quiet embrace of seclusion, you've found a deeper understanding of yourself and the world around you. This life of contemplation has endowed you with unique insights, though your social skills may need some refinement after years of isolation.";
            case PlayerBackgroundEnum.Devout:
                return "You've devoted your life to the service of a deity or pantheon. Through prayer and ritual, you've gained extraordinary powers to heal the sick, smite the wicked, and raise the dead. Your faith is unwavering, and you're driven by a sense of purpose and duty to your god and their teachings.";
        }
    }
}

export {
    PlayerBackgroundEnum,
    PlayerBackground
}