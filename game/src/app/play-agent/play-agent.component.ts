import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-play-agent',
  templateUrl: './play-agent.component.html',
  styleUrls: ['./play-agent.component.css']
})
export class PlayAgentComponent implements OnInit {

  constructor(private settings:SettingsService) { }
  wumpusCount:number = 5;
  pitCount:number = 5;
  goldCount:number = 2;
  arrows:number = 5;
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
  
  

 cellVisited = [
  [true,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false]
 ];

 nearDanger = [
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false],
  [false,false,false,false,false,false,false,false,false,false]
 ];

board = [
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S']
]

cboard = [
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S'],
  ['S','S','S','S','S','S','S','S','S','S']
]

knowledge = [
  ['S', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U'],
  ['U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U', 'U']
]

pitProbability = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
]

stenchProbability = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
]

contiguousRandomMoveCount = 0;
discoveredGold = 0;
wumpusKilled = 0;
totalMoves = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
]

  agentIndex = {
    row: 0,
    column: 0,
  }
  busy: boolean = false;

  audio = new Audio();
  wumpusAudio = new Audio();
  goldAudio = new Audio();
  monsterEndAudio = new Audio();
  pitEndAudio = new Audio();
  winAudio = new Audio();

  ngOnInit(): void {
   
    this.audio.volume = 0.1;
   // this.wumpusCount=this.settings.getwumpusCount();

    
    this.cellVisited[0][0] = true;
    this.audio.src = "../../assets/audio/bgMusic.mp3";
    this.audio.load();
    this.audio.play();


    if(this.settings.getIsUploaded()){
      this.board = this.settings.getBoard().split("\n").map(function(x){return x.split(" ")});
      //  this.board = JSON.parse(JSON.stringify(this.settings.getBoard()))
      for(var i=0;i<10;i++){
        this.board[i] = this.board[i][0].split(",");
      
        console.log(this.board[i]);
      }
      this.goldCount = 0;
      console.log(this.board);
      for(var i = 0; i<10; i++){
        for(var j = 0; j<10; j++){
          if(this.board[i][j].includes('G')){
            this.goldCount++;
          }
        }
      }
      console.log("ggoldCount"+this.goldCount);
      
    }
    else{
      this.init();
      this.wumpusCount=this.settings.getwumpusCount();
      this.pitCount=this.settings.getpitCount();
      this.goldCount=this.settings.getgoldCount();
      this.arrows = this.wumpusCount;
      
      
    }
  }

  init(){
    for(var i=0; i< this.wumpusCount; i++){
      let val = Math.floor(Math.random()*100);
      let col = val % 10;
      let row = Math.floor((val / 10) % 10);
      if(col<2 && row <2){
        i=i-1;
        continue;
      }
      if(this.board[row][col]=='W' || this.board[row][col]=='P'){
        i = i-1;
        continue;
      }
      //// console.log(row, col)
      this.board[row][col] = 'W';
      if(col != 0)
        this.board[row][col-1] = 'stench'
      if(col != 9)
        this.board[row][col+1] = 'stench'
      if(row != 0)
        this.board[row-1][col] = 'stench'
      if(row != 9)
        this.board[row+1][col] = 'stench'
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
      if(this.board[row][col]=='P' || this.board[row][col]=='W'){
        i = i-1;
        continue;
      }
      this.board[row][col] = 'P';
      if(col != 0)
        if(this.board[row][col-1] == 'stench')
          this.board[row][col-1] += 'breeze'
        else
          this.board[row][col-1] = 'breeze'
      if(col != 9)
        if(this.board[row][col+1] == 'stench')
          this.board[row][col+1] += 'breeze'
        else
          this.board[row][col+1] = 'breeze'
      if(row != 0)
        if(this.board[row-1][col] == 'stench')
          this.board[row-1][col] += 'breeze'
        else
          this.board[row-1][col] = 'breeze'
      if(row != 9)
        if(this.board[row+1][col] == 'stench')
          this.board[row+1][col] += 'breeze'
        else
          this.board[row+1][col] = 'breeze'
    }
    for(var i=0; i< this.goldCount; i++){

      let val = Math.floor(Math.random()*100);
      let col = val % 10;
      let row = Math.floor((val / 10) % 10);
      if(row <2 && col<2){
        i=i-1;
        continue;
      }
      if(this.board[row][col]=='W' || this.board[row][col]=='P'){
        i = i-1;
        continue;
      }
      this.board[row][col]+='G'


    }
    console.log(this.board);
  }

  removeDead(){
    if(this.board[this.agentIndex.row][this.agentIndex.column] ==='dead') this.board[this.agentIndex.row][this.agentIndex.column]='S';
  }

  @HostListener('document:keyup', ['$event'])
  changePosition(e:KeyboardEvent, row: number, col: number){
    if(e.key=="ArrowUp"){
      this.removeDead();
     // // console.log("Go Up");
      if(this.agentIndex.row>0){
        
        this.agentIndex.row--;
      }
    }
    else if(e.key=="ArrowDown"){
      this.removeDead();
     // // console.log("Go Down");
      if(this.agentIndex.row<9){
        this.agentIndex.row++;
      }
    }
    else if(e.key=="ArrowLeft"){this.removeDead();
     // // console.log("Go Left");
      if(this.agentIndex.column>0){
        this.agentIndex.column--;
      }
    }
    else if(e.key=="ArrowRight"){this.removeDead();
     // // // console.log("Go Right");
      if(this.agentIndex.column<9){
        this.agentIndex.column++;
      }
    }
    else if(e.key=="r"){this.removeDead();
       console.log("Go Right");
      if(this.arrows>0){
        console.log('ehllo')
        this.arrows--;
       if(this.agentIndex.column>0){
         this.agentIndex.column--;
         if(this.board[this.agentIndex.row][this.agentIndex.column] == 'W' )
         this.board[this.agentIndex.row][this.agentIndex.column] = 'dead';
       }
      }
     }
  

     else if(e.key=="u"){this.removeDead();
      // // // console.log("Go Right");
      if(this.arrows>0){
        this.arrows--;
       if(this.agentIndex.row>0){
         this.agentIndex.row--;
         if(this.board[this.agentIndex.row][this.agentIndex.column] == 'W' )
          this.board[this.agentIndex.row][this.agentIndex.column] = 'dead';
       }
      }
     }

     else if(e.key=="l"){this.removeDead();
      // // // console.log("Go Right");
      if(this.arrows>0){
        this.arrows--;
       if(this.agentIndex.column<9){
         this.agentIndex.column++;
         if(this.board[this.agentIndex.row][this.agentIndex.column] == 'W' )
         this.board[this.agentIndex.row][this.agentIndex.column] = 'dead'; };
       
      }
     }
     else if(e.key==="d"){this.removeDead();
       console.log("pressed");
       if(this.arrows>0){
        this.arrows--;
      // // // console.log("Go Right");
       if(this.agentIndex.row<9){
         this.agentIndex.row++;
         if(this.board[this.agentIndex.row][this.agentIndex.column] == 'W' )
         this.board[this.agentIndex.row][this.agentIndex.column] = 'dead';
       }
       }
     }

    this.checkCellState();

  }

  checkCellState(){
    if(this.cellVisited[this.agentIndex.row][this.agentIndex.column]===false){
      this.cellVisited[this.agentIndex.row][this.agentIndex.column]=true;
    }
    if(this.board[this.agentIndex.row][this.agentIndex.column].includes('P')){
      this.gameOver = true;
      this.gameOverLine = "You Lost";
    }
    if(this.board[this.agentIndex.row][this.agentIndex.column].includes('W')){
      this.gameOver = true;
      this.gameOverLine = "You Lost";
    }
    if(this.board[this.agentIndex.row][this.agentIndex.column].includes('G')){
      
      this.discoveredGold++;
      console.log(this.discoveredGold,this.goldCount);
      if(this.discoveredGold == this.goldCount){
      this.gameOver = true;
      this.gameOverLine = "You Win";
      }
    }
    
  }

  checkWhereAgentIs(row: number, column: number):boolean{
    if(this.agentIndex.row==row && this.agentIndex.column==column){
      return true;
    }
    return false;
  }

  counter(i: number) {
    return new Array(i);
  }
  checkDoorState(row: number, column: number):string{
    if(this.board[row][column].includes('G') && this.cellVisited[row][column]==true){
      return 'gold';
    }
    else if(this.board[row][column]=='S' && this.cellVisited[row][column]==false){
      return 'notvisited';
    }
    else if(this.board[row][column]=='S' && this.cellVisited[row][column]==true){
      return 'safe';
    }
    else if(this.board[row][column]=='W' && this.cellVisited[row][column]==true ){
      //// console.log('Wumpusss');
      return 'wumpus';
    }
    else if(this.board[row][column]=='P' && this.cellVisited[row][column]==true){
      //// console.log('Pittt');
      return 'pit';
    }
    else if(this.board[row][column].includes('stench') && this.cellVisited[row][column]==true){
      return 'stench';
    }
    else if(this.board[row][column].includes('breeze') && this.cellVisited[row][column]==true){
      return 'breeze';
    }
    else if(this.board[row][column].includes('dead') && this.cellVisited[row][column]==true ){
     console.log("hello");
     //this.board[row][column]='S';
      return 'dead';
    }
    
    
    return 'notvisited';
  }


    

    //If connect korte hobe
 
  // this.fileInit();


    //Cboard update hbar kotha
   
   
    
  }


 




