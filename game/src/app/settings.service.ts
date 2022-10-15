import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  boardFile!:string
  isUploaded:boolean = false;
  wumpusCount: number = 5;
  pitCount: number = 5;
  goldCount: number = 2;
  difficulty!: number

  getIsUploaded():boolean{
    return this.isUploaded;
  }
  getBoard(): string {
    return this.boardFile;
  }
  getwumpusCount(): number {
    return this.wumpusCount;
  }

  getpitCount(): number {
    return this.pitCount;
  }
  getgoldCount(): number {
    return this.goldCount;
  }
 
  setBoard(boardFile: string) {
    this.boardFile = boardFile;
  }
  setwumpusCount(wumpusCount: number){
    this.wumpusCount = wumpusCount;
  }
  setIsUploaded(i:boolean){
    this.isUploaded = true;
  }


  setpitCount(pitCount: number){
    this.pitCount = pitCount;
  }
  setgoldCount(goldCount: number){
    this.goldCount = goldCount;
  }


  constructor() { }
}
