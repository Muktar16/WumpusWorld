import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Wumpus } from '../wumpus';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor(private settings:SettingsService) { }

  wumpus = new Wumpus();

  dangerloopcount=0;
  wumpusCount:number = 5;
  pitCount:number = 5;
  goldCount:number = 2;
  point = 0;
  UP = 0;
  DOWN = 1;
  LEFT = 2;
  RIGHT = 3;
  shootDirection !: number;
  moveDirection !: number;
  gridSize = 10;
  gameOver = false;
  youWin = false;
  youLose = false;
  gameOverLine= "";
  cheatOn = false;
  contiguousRandomMoveCount = 0;
  discoveredGold = 0;
  wumpusKilled = 0;
  busy: boolean = false;
  agentIndex = {
    row: 0,
    column: 0,
  }
  audio = new Audio();

  ngOnInit(): void {

    this.wumpus.visited[0][0] = true;
    this.audio.src = "../../assets/audio/bgMusic.mp3";
    this.audio.load();
    this.audio.play();

    if(this.settings.getIsUploaded()){
      this.wumpus.world = this.settings.getBoard().split("\n").map(function(x){return x.split(" ")});
      this.goldCount = this.wumpus.updateWorld();
    }
    else{
      this.wumpus.initiateWorld();
      this.wumpusCount=this.settings.getwumpusCount();
      this.pitCount=this.settings.getpitCount();
      this.goldCount=this.settings.getgoldCount();
    }
    
   
    this.audio.volume = 0.1;

    var nextMove: number = -1;
    const timeout = setTimeout(()=>{
      nextMove = this.getNextMove();
      if(nextMove == this.UP) this.agentIndex.column++;
      else if(nextMove == this.DOWN)  this.agentIndex.column--;
      else if(nextMove == this.LEFT)  this.agentIndex.row--;
      else if(nextMove == this.RIGHT) this.agentIndex.row++;
    }, 800); 

    const interval = setInterval(() => {
      nextMove = this.getNextMove();
      if(nextMove == -2){
        this.agentIndex.column=0;
        this.agentIndex.row=0;
      }
      if(nextMove == this.UP) this.agentIndex.column++;
      else if(nextMove == this.DOWN)  this.agentIndex.column--;
      else if(nextMove == this.LEFT)  this.agentIndex.row--;
      else if(nextMove == this.RIGHT) this.agentIndex.row++;
    }, 300)
    
  }

  counter(i: number) {
    return new Array(i);
  }

  
  getNextMove(){
    this.calculateBreezeAndStench();
    if(this.gameOver || this.busy){
      return -1;
    }

    if(this.wumpus.world[this.agentIndex.row][this.agentIndex.column].includes('G')){
      this.dangerloopcount = 0;
      this.audio.src = "../../assets/audio/goldFound.mp3";
      this.audio.load();
      this.audio.play();

      this.busy = true;
      this.discoveredGold+=1;
      this.point+=1000;
      setTimeout(() => {
        this.wumpus.world[this.agentIndex.row][this.agentIndex.column]=this.wumpus.world[this.agentIndex.row][this.agentIndex.column].replace('G','');
        
        this.busy= false;
        console.log('gold: ', this.discoveredGold)
      }, 2000);
        
      if(this.discoveredGold == this.goldCount){
        console.log("Discovered gold "+this.discoveredGold)
        console.log("total gold "+this.goldCount)

        this.gameOver = true;
        console.log(this.gameOver);
        this.gameOverLine = "Congrats! You Win";
        this.youWin = true;
        this.audio.src = "../../assets/audio/win.mp3";
        this.audio.load();
        this.audio.play();
        return -1;
      }
    }
    else if(this.wumpus.world[this.agentIndex.row][this.agentIndex.column] == 'W' || this.wumpus.world[this.agentIndex.row][this.agentIndex.column] == 'P'){
      this.dangerloopcount = 0;
      this.point -= 10000;
      this.gameOver = true;
      this.youLose = true;
      this.gameOverLine = "Game Over! You Lose";
      if(this.wumpus.world[this.agentIndex.row][this.agentIndex.column] == 'W'){
        this.audio.src = "../../assets/audio/monster.wav";
        this.audio.load();
        this.audio.play();
      }
      else{
        this.audio.src = "../../assets/audio/pit.wav";
        this.audio.load();
        this.audio.play();
      }
      return -1;
    }

    //when we are close to wumpus
    else if(this.wumpusCount > this.wumpusKilled && this.isWumpusClose()){
      this.dangerloopcount = 0;
      console.log('shoot');
      this.wumpusKilled += 1;
      if(this.shootDirection == this.UP){
        this.wumpus.world[this.agentIndex.row][this.agentIndex.column+1] = this.wumpus.world[this.agentIndex.row][this.agentIndex.column+1].replace('W', '');
        if(this.wumpus.world[this.agentIndex.row][this.agentIndex.column+1] == ''){
          this.wumpus.world[this.agentIndex.row][this.agentIndex.column+1] = 'S'
        }
        this.removeStench(this.agentIndex.row, this.agentIndex.column+1);
      }else if(this.shootDirection == this.DOWN){
        this.wumpus.world[this.agentIndex.row][this.agentIndex.column-1] = this.wumpus.world[this.agentIndex.row][this.agentIndex.column-1].replace('W', '');
        if(this.wumpus.world[this.agentIndex.row][this.agentIndex.column-1] == ''){
          this.wumpus.world[this.agentIndex.row][this.agentIndex.column-1] = 'S'
        }
        this.removeStench(this.agentIndex.row, this.agentIndex.column-1);
      }else if(this.shootDirection == this.LEFT){
        this.wumpus.world[this.agentIndex.row-1][this.agentIndex.column] = this.wumpus.world[this.agentIndex.row-1][this.agentIndex.column].replace('W', '');
        if(this.wumpus.world[this.agentIndex.row-1][this.agentIndex.column] == ''){
          this.wumpus.world[this.agentIndex.row-1][this.agentIndex.column] = 'S'
        }
        this.removeStench(this.agentIndex.row-1, this.agentIndex.column);
      }else if(this.shootDirection == this.RIGHT){
        this.wumpus.world[this.agentIndex.row+1][this.agentIndex.column] = this.wumpus.world[this.agentIndex.row+1][this.agentIndex.column].replace('W', '');
        if(this.wumpus.world[this.agentIndex.row+1][this.agentIndex.column] == ''){
          this.wumpus.world[this.agentIndex.row+1][this.agentIndex.column] = 'S'
        }
        this.removeStench(this.agentIndex.row+1, this.agentIndex.column);
      }
      
      this.audio.src = "../../assets/audio/wumpusKill.mp3";
      this.audio.load();
      this.audio.play();
      return -1;
    }
    
    else if(this.areWeInPitLoop()){
      this.dangerloopcount = 0;
       console.log("pit loop");
      if (this.agentIndex.row != 9 && this.wumpus.pitProb[this.agentIndex.row + 1][this.agentIndex.column] < 0.50) {
        this.contiguousRandomMoveCount = 0;
        return this.RIGHT;
      } else if (this.agentIndex.column != 9 && this.wumpus.pitProb[this.agentIndex.row][this.agentIndex.column+1] < 0.50) {
        this.contiguousRandomMoveCount = 0;
        return this.UP;
      } else if (this.agentIndex.row != 0 && this.wumpus.pitProb[this.agentIndex.row - 1][this.agentIndex.column] < 0.50) {
        this.contiguousRandomMoveCount = 0;
        return this.LEFT;
      } else if (this.agentIndex.column != 0 && this.wumpus.pitProb[this.agentIndex.row][this.agentIndex.column-1] < 0.50) {
        this.contiguousRandomMoveCount = 0;
        return this.DOWN;
      }
    }
    else if (this.isItDangerCell()) {
      this.dangerloopcount++;
      console.log("danger space");
      // if left is safe, move there
      if (this.agentIndex.row != 0 && this.wumpus.visited[this.agentIndex.row - 1][this.agentIndex.column]) {
          this.wumpus.movesCount[this.agentIndex.row - 1][this.agentIndex.column]++;
          return this.LEFT;
      }
      // if down is safe, move there
      else if (this.agentIndex.column != 0 && this.wumpus.visited[this.agentIndex.row][this.agentIndex.column - 1]) {
          this.wumpus.movesCount[this.agentIndex.row][this.agentIndex.column - 1]++;
          return this.DOWN;
      }
      // if right is safe, move there
      else if (this.agentIndex.row != 9 && this.wumpus.visited[this.agentIndex.row + 1][this.agentIndex.column]) {
        this.wumpus.movesCount[this.agentIndex.row + 1][this.agentIndex.column]++;
        return this.RIGHT;
      }
      // if up is safe, move there
      else if (this.agentIndex.column != 9 && this.wumpus.visited[this.agentIndex.row][this.agentIndex.column + 1]) {
        this.wumpus.movesCount[this.agentIndex.row][this.agentIndex.column + 1]++;
        return this.UP;
      }

      else{
        if(this.dangerloopcount>50) return this.rand(0,3);

        if (this.agentIndex.column != 9 && this.wumpus.pitProb[this.agentIndex.row ][this.agentIndex.column+1]+this.wumpus.stenchProb[this.agentIndex.row ][this.agentIndex.column+1] < 0.50) {
          
          return this.RIGHT;
        } else if (this.agentIndex.row != 0 && this.wumpus.pitProb[this.agentIndex.row - 1][this.agentIndex.column]+this.wumpus.stenchProb[this.agentIndex.row-1 ][this.agentIndex.column]  < 0.50) {
          
          return this.UP;
        } else if (this.agentIndex.column != 0 && this.wumpus.pitProb[this.agentIndex.row ][this.agentIndex.column-1] + this.wumpus.stenchProb[this.agentIndex.row ][this.agentIndex.column-1]< 0.50) {
          
          return this.LEFT;
        } else if (this.agentIndex.row != 9 && this.wumpus.pitProb[this.agentIndex.row+1][this.agentIndex.column]+ this.wumpus.stenchProb[this.agentIndex.row+1 ][this.agentIndex.column] < 0.50) {
          
          return this.DOWN;
        }
        //else return this.rand(0,3);
      }
    }
    else if (!this.isItDangerCell()) {
      this.dangerloopcount = 0;
      console.log("free space");
      // if right is not visited, move there
      if (this.agentIndex.row != 9 && !this.wumpus.visited[this.agentIndex.row + 1][this.agentIndex.column]) {
          this.wumpus.visited[this.agentIndex.row + 1][this.agentIndex.column] = true;
          this.wumpus.movesCount[this.agentIndex.row + 1][this.agentIndex.column]++;
          return this.RIGHT;
      }
      // if up is not visited, move there
      else if (this.agentIndex.column != 9 && !this.wumpus.visited[this.agentIndex.row][this.agentIndex.column + 1]) {
        this.wumpus.visited[this.agentIndex.row][this.agentIndex.column+1] = true;
        this.wumpus.movesCount[this.agentIndex.row][this.agentIndex.column+1]++;
        return this.UP;
      }
      // if left is not visited, move there
      else if (this.agentIndex.row != 0 && !this.wumpus.visited[this.agentIndex.row - 1][this.agentIndex.column]) {
        this.wumpus.visited[this.agentIndex.row - 1][this.agentIndex.column] = true;
        this.wumpus.movesCount[this.agentIndex.row - 1][this.agentIndex.column]++;
        return this.LEFT;
      }
      // if down is not visited, move there
      else if (this.agentIndex.column != 0 && !this.wumpus.visited[this.agentIndex.row][this.agentIndex.column - 1]) {
        this.wumpus.visited[this.agentIndex.row][this.agentIndex.column-1] = true;
        this.wumpus.movesCount[this.agentIndex.row][this.agentIndex.column-1]++;
        return this.DOWN;
      }
      // if all neighbor have been visited, choose random direction
      else {
          console.log("free neighbor");
          while (true) {
              switch (this.rand(1, 4)) {
                  //if selected, move right
                  case 1:
                      if (this.agentIndex.row != 9) {
                          this.wumpus.movesCount[this.agentIndex.row + 1][this.agentIndex.column]++;
                          
                          this.contiguousRandomMoveCount++;
                          return this.RIGHT;
                      }
                      break;
                  //if selected, move up
                  case 2:
                      if (this.agentIndex.column != 9) {
                        this.wumpus.movesCount[this.agentIndex.row][this.agentIndex.column+1]++;
                          
                        this.contiguousRandomMoveCount++;
                        return this.UP;
                      }
                      break;
                  //if selected, move left
                  case 3:
                      if (this.agentIndex.row != 0) {
                        this.wumpus.movesCount[this.agentIndex.row - 1][this.agentIndex.column]++;
                          
                        this.contiguousRandomMoveCount++;
                        return this.LEFT;
                      }
                      break;
                  //if selected, move down
                  case 4:
                      if (this.agentIndex.column != 0) {
                        this.wumpus.movesCount[this.agentIndex.row][this.agentIndex.column - 1]++;
                        this.contiguousRandomMoveCount++;
                        return this.DOWN;
                      }
                      break;
              }
          }
      }
  }
    return -1;

  }

  rand(min:number, max:number) {
    if (min == max)
        return min;

    var date = new Date();
    var count = date.getMilliseconds() % 10;

    for (var i = 0; i <= count; ++i)
        Math.random();

    if (min > max) {
        min ^= max;
        max ^= min;
        min ^= max;
    }

    return Math.floor((Math.random() * (max - min + 1)) + min);
}

  areWeInPitLoop() {
    if (this.contiguousRandomMoveCount > 0 
      && this.wumpus.movesCount[this.agentIndex.row][this.agentIndex.column] > 1 
      && this.wumpus.world[this.agentIndex.row][this.agentIndex.column].includes('breeze'))
        return true;
    else return false;
  }


  isItDangerCell(){
    if(this.wumpus.world[this.agentIndex.row][this.agentIndex.column].includes('breeze') || this.wumpus.world[this.agentIndex.row][this.agentIndex.column].includes('stench')){
      return true;
    }
    return false;
  }

  isWumpusClose(){
    if(this.agentIndex.column!=9 && this.wumpus.stenchProb[this.agentIndex.row][this.agentIndex.column+1]>0.5){
      this.shootDirection = this.UP;
      return true;
    }
    if(this.agentIndex.column!=0 && this.wumpus.stenchProb[this.agentIndex.row][this.agentIndex.column-1]>0.5){
      this.shootDirection = this.DOWN;
      return true;
    }
    if(this.agentIndex.row!=9 && this.wumpus.stenchProb[this.agentIndex.row+1][this.agentIndex.column]>0.5){
      this.shootDirection = this.RIGHT;
      return true;
    }
    if(this.agentIndex.row!=0 && this.wumpus.stenchProb[this.agentIndex.row-1][this.agentIndex.column]>0.5){
      this.shootDirection = this.LEFT;
      return true;
    }
    return false;
  }

  calculateBreezeAndStench(){
    if(!this.wumpus.nearDanger[this.agentIndex.row][this.agentIndex.column]){
      if(this.wumpus.world[this.agentIndex.row][this.agentIndex.column].includes('breeze')){
        this.updatePitProb();
      }

      if(this.wumpus.world[this.agentIndex.row][this.agentIndex.column].includes('stench')){
        this.updateStenchProb();
      }
    }
  }

  updatePitProb(){
    if(this.agentIndex.column!=9 && !this.wumpus.visited[this.agentIndex.row][this.agentIndex.column+1])
      {this.wumpus.pitProb[this.agentIndex.row][this.agentIndex.column+1]+=0.25}
    if(this.agentIndex.row!=0 && !this.wumpus.visited[this.agentIndex.row-1][this.agentIndex.column])
      {this.wumpus.pitProb[this.agentIndex.row-1][this.agentIndex.column]+=0.25}
    if(this.agentIndex.row!=9 && !this.wumpus.visited[this.agentIndex.row+1][this.agentIndex.column])
      {this.wumpus.pitProb[this.agentIndex.row+1][this.agentIndex.column]+=0.25}
    if(this.agentIndex.column!=0 && !this.wumpus.visited[this.agentIndex.row][this.agentIndex.column-1])
      {this.wumpus.pitProb[this.agentIndex.row][this.agentIndex.column-1]+=0.25}  

    this.wumpus.nearDanger[this.agentIndex.row][this.agentIndex.column] = true;
  }

  updateStenchProb(){
    if(this.agentIndex.column!=9 && !this.wumpus.visited[this.agentIndex.row][this.agentIndex.column+1])
      {this.wumpus.stenchProb[this.agentIndex.row][this.agentIndex.column+1]+=0.25}
    if(this.agentIndex.row!=0 && !this.wumpus.visited[this.agentIndex.row-1][this.agentIndex.column])
      {this.wumpus.stenchProb[this.agentIndex.row-1][this.agentIndex.column]+=0.25}
    if(this.agentIndex.row!=9 && !this.wumpus.visited[this.agentIndex.row+1][this.agentIndex.column])
      {this.wumpus.stenchProb[this.agentIndex.row+1][this.agentIndex.column]+=0.25}
    if(this.agentIndex.column!=0 && !this.wumpus.visited[this.agentIndex.row][this.agentIndex.column-1])
      {this.wumpus.stenchProb[this.agentIndex.row][this.agentIndex.column-1]+=0.25}

    this.wumpus.nearDanger[this.agentIndex.row][this.agentIndex.column] = true;  
  }

  checkWhereAgentIs(row: number, column: number):boolean{
    if(this.agentIndex.row==row && this.agentIndex.column==column){
      return true;
    }
    return false;
  }

  checkCheatDoorState(row: number, column: number):string{
    //let demoBoard=this.wumpus.visibleWorld;
    if(this.wumpus.world[row][column].includes('G')) return 'gold';
    else if(this.wumpus.world[row][column]=='W') return 'wumpus';
    else if(this.wumpus.world[row][column]=='P')  return 'pit';
    else if(this.wumpus.world[row][column].includes('stench'))  return 'stench';
    else if(this.wumpus.world[row][column].includes('breeze'))  return 'breeze';
    else if(this.wumpus.world[row][column]=='S')  return 'safe';
    return 'safe';
  }

  checkDoorState(row: number, column: number):string{
    if(this.wumpus.world[row][column].includes('G') && this.wumpus.visited[row][column]==true)  return 'gold';
    else if(this.wumpus.world[row][column]=='S' && this.wumpus.visited[row][column]==false) return 'notvisited';
    else if(this.wumpus.world[row][column]=='S' && this.wumpus.visited[row][column]==true)  return 'safe';
    else if(this.wumpus.world[row][column]=='W' && this.wumpus.visited[row][column]==true ) return 'wumpus';
    else if(this.wumpus.world[row][column]=='P' && this.wumpus.visited[row][column]==true)  return 'pit';
    else if(this.wumpus.world[row][column].includes('stench') && this.wumpus.visited[row][column]==true)  return 'stench';
    else if(this.wumpus.world[row][column].includes('breeze') && this.wumpus.visited[row][column]==true)  return 'breeze';
    return 'notvisited';
  }

  

  removeStench(row: number, column: number){
    console.log('calleddd')
    if(row!=0){
      this.wumpus.world[row-1][column] = this.wumpus.world[row-1][column].replace('stench', 'S');
      this.wumpus.stenchProb[this.agentIndex.row-1][this.agentIndex.column] = 0.0
    }
    if(row!=9){
      this.wumpus.world[row+1][column] = this.wumpus.world[row+1][column].replace('stench', 'S');
      this.wumpus.stenchProb[this.agentIndex.row+1][this.agentIndex.column] = 0.0
      
    }
    if(column!=0){
      this.wumpus.world[row][column-1] = this.wumpus.world[row][column-1].replace('stench', 'S');
      this.wumpus.stenchProb[this.agentIndex.row][this.agentIndex.column-1] = 0.0
    
    }
    if(column!=9){
      this.wumpus.world[row][column+1] = this.wumpus.world[row][column+1].replace('stench', 'S');
      this.wumpus.stenchProb[this.agentIndex.row][this.agentIndex.column+1] = 0.0
    }
  }

 
  changePosition(e:KeyboardEvent, row: number, col: number){

    if(e.key=="ArrowUp" && this.agentIndex.row>0) this.agentIndex.row--;
    else if(e.key=="ArrowDown" && this.agentIndex.row<9)  this.agentIndex.row++;
    else if(e.key=="ArrowLeft" && this.agentIndex.column>0) this.agentIndex.column--;
    else if(e.key=="ArrowRight" && this.agentIndex.column<9)  this.agentIndex.column++;
    this.checkCellState();
  }

  checkCellState(){
    if(this.wumpus.visited[this.agentIndex.row][this.agentIndex.column]===false){
      this.wumpus.visited[this.agentIndex.row][this.agentIndex.column]=true;
    }
  }

  changeCheatMode(){
    if(this.cheatOn) this.cheatOn = false;
    else  this.cheatOn = true;
  }

}
