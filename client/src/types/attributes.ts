enum AttributeEnum {
    Strength,
    Constitution,
    Intelligence,
    Charisma,
    Knowledge,
    Faith,
    Craftsmanship,
}

class Attribute {
    public attribute: AttributeEnum;
    public value: number;
    public description: string;
    
    constructor(attribute: AttributeEnum, value: number) {
        this.attribute = attribute;
        this.value = value;

        switch (attribute) {
            case AttributeEnum.Strength:
                this.description = "Strength is the measure of your physical power. It is used to determine how much damage you deal with physical attacks.";
                break;
            case AttributeEnum.Constitution:
                this.description = "Constitution is the measure of your physical endurance. It is used to determine how much damage you can take before you die.";
                break;
            case AttributeEnum.Intelligence:
                this.description = "Intelligence is the measure of your mental power. It is used to determine how much damage you deal with magical attacks.";
                break;
            case AttributeEnum.Charisma:
                this.description = "Charisma is the measure of your dialog skills. The higher your charisma is, the more likely you are to succeed in dialog challenges.";
                break;
            case AttributeEnum.Knowledge:
                this.description = "Knwoledge can be used to enchant items to higher levels and learn more spells.";
                break;
            case AttributeEnum.Faith:
                this.description = "Faith determines the power of blessings and curses you can cast.";
                break;
            case AttributeEnum.Craftsmanship:
                this.description = "Craftmanship determines the quality of items you can craft.";
                break;
        }
    }
}

export { AttributeEnum, Attribute};