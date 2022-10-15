export class Wumpus {
    world:string[][] = [];
    visibleWorld:string[][] = [];
    nearDanger:boolean[][] = [];
    visited:boolean[][] = [];
    pitProb:number[][] = [];
    stenchProb:number[][] = [];
    movesCount:number[][] = [];
    //knowledge:string[][] = [];
    goldCount = 0;
    wumpusCount:number = 5;
    pitCount:number = 5;


    constructor (){
        this.world = [];
        this.visibleWorld = [];
        this.nearDanger = [];
        this.pitProb = [];
        this.stenchProb = [];
        this.visited = [];
        this.movesCount = [];
        for(let i=0;i<10;i++){
            this.world[i] = [];
            this.visibleWorld[i] = [];
            this.nearDanger[i] = [];
            this.pitProb[i] = [];
            this.stenchProb[i] = [];
            this.visited[i] = [];
            this.movesCount[i] = [];
            //this.knowledge[i] = []
            for(let j=0;j<10;j++){
                this.world[i][j] = 'S';
                this.visibleWorld[i][j] = 'S';
                this.nearDanger[i][j] = false;
                this.pitProb[i][j] = 0.0;
                this.stenchProb[i][j] = 0.0;
                this.visited[i][j] = false;
                this.movesCount[i][j] = 0;
                //this.knowledge[i][j] = 'U';
            }
        }
        this.visited[0][0] = true;
        //this.knowledge[0][0] = 'S';

    }

    updateWorld():number{
        for(var i=0;i<10;i++){
            this.world[i] = this.world[i][0].split(",");
            console.log(this.world[i]);
          }
          this.goldCount = 0;
          console.log(this.world);
          for(var i = 0; i<10; i++){
            for(var j = 0; j<10; j++){
              if(this.world[i][j].includes('G')){
                this.goldCount++;
              }
            }
          }
          return this.goldCount;
    }

    initiateWorld(){
        for(var i=0; i< this.wumpusCount; i++){
          let val = Math.floor(Math.random()*100);
          let col = val % 10;
          let row = Math.floor((val / 10) % 10);
          if(col<2 && row <2){
            i=i-1;
            continue;
          }
          if(this.world[row][col]=='W' || this.world[row][col]=='P'){
            i = i-1;
            continue;
          }
         
          this.world[row][col] = 'W';
          if(col != 0)
            this.world[row][col-1] = 'stench'
          if(col != 9)
            this.world[row][col+1] = 'stench'
          if(row != 0)
            this.world[row-1][col] = 'stench'
          if(row != 9)
            this.world[row+1][col] = 'stench'
        }

        for(var i=0; i< this.pitCount; i++){
          
          let val = Math.floor(Math.random()*100);
          let col = val % 10;
          let row = Math.floor((val / 10) % 10);
          if(row <2 && col <2){
            i=i-1;
            continue;
          }
          //// console.log(row, col)
          if(this.world[row][col]=='P' || this.world[row][col]=='W'){
            i = i-1;
            continue;
          }
          this.world[row][col] = 'P';
          if(col != 0)
            if(this.world[row][col-1] == 'stench')
              this.world[row][col-1] += 'breeze'
            else
              this.world[row][col-1] = 'breeze'
          if(col != 9)
            if(this.world[row][col+1] == 'stench')
              this.world[row][col+1] += 'breeze'
            else
              this.world[row][col+1] = 'breeze'
          if(row != 0)
            if(this.world[row-1][col] == 'stench')
              this.world[row-1][col] += 'breeze'
            else
              this.world[row-1][col] = 'breeze'
          if(row != 9)
            if(this.world[row+1][col] == 'stench')
              this.world[row+1][col] += 'breeze'
            else
              this.world[row+1][col] = 'breeze'
        }
        for(var i=0; i< this.goldCount; i++){
    
          let val = Math.floor(Math.random()*100);
          let col = val % 10;
          let row = Math.floor((val / 10) % 10);
          if(row <2 && col<2){
            i=i-1;
            continue;
          }
          if(this.world[row][col]=='W' || this.world[row][col]=='P'){
            i = i-1;
            continue;
          }
          this.world[row][col]+='G'
    
        }
    
        this.visibleWorld = JSON.parse(JSON.stringify(this.world))
        console.log(this.world);
      }

}