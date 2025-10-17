enum TurnType {
    Player = "player",
    Enemy = "enemy",
    End = "end"
}

class Turn {
    count: number;
    type: TurnType;

    constructor(count: number, type: TurnType) {
        this.count = count;
        this.type = type;
    }

    public increaseCount(): void {
        this.count++;
    }
}

export {
    TurnType,
    Turn
}