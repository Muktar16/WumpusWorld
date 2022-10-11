export class CellVisited {
    x:number;
    y:number;
    pitChance:any;
    wumpusChance:any;
    visitedNum:any;
    nearDanger:boolean;

    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;

        this.pitChance = 0;
        this.wumpusChance = 0;
        this.visitedNum = 0;
        this.nearDanger = false;
    }
}
