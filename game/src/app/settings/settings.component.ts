import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public router: Router, private settings: SettingsService) { }
  fileContent: string = "";
  sliderGrid= "10x10";
  sliderPit = 1;
  sliderWumpus = 1;
  sliderGold = 1;
  sliderRisk = "Easy";

  gridSelected = false;
  pitSelected =false;
  wumpusSelected = false;
  goldSelected = false;
  riskSelected = false;

  ngOnInit(): void {
    // fetch('game\board.txt')
    // .then(response => response.text())
    // .then(data => {
    //   // Do something with your data
    //   console.log(data);
    // });
  }

  public  onChange = (event: Event) => {
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
    //  self.fileContent = fileReader.result;
   //  console.log(fileReader.result) ;
     const fileContent=fileReader.result;

    }
    fileReader.readAsText(file);
    this.router.navigate(['play']);
    /** do something with the file **/
  };


  file:any;
  fileUploaded!:boolean;
  fileInput:any;
fileChanged(e:any) {
    this.file = e.target.files[0];
    this.fileUploaded= true;
    let fileReader: FileReader = new FileReader();
    
    fileReader.onloadend = (e)=> {
    //  self.fileContent = fileReader.result;
   //  console.log(fileReader.result) ;
   if(fileReader.result){
    const fileContent=fileReader.result.toString();
    console.log(JSON.parse(JSON.stringify(fileContent)));

    this.fileInput = JSON.parse(JSON.stringify(fileContent))
   }
    }
    fileReader.readAsText(this.file);
}
    // public onChange(fileList: FileList): void {
    //   let file = fileList[0];
      // let fileReader: FileReader = new FileReader();
      // let self = this;
      // fileReader.onloadend = function(x) {
      // //  self.fileContent = fileReader.result;
      //  console.log(fileReader.result) ;

      // }
      // fileReader.readAsText(file);
    // }

  

 

  pits(e: any){
    this.sliderPit = e.target.value;
    console.log(this.sliderPit);
  }

  gold(e: any){
    this.sliderGold = e.target.value;
    console.log(this.sliderGold);
  }

  wumpus(e: any){
    this.sliderWumpus = e.target.value;
    console.log(this.sliderWumpus);
  }

  // risk(e: any){
  //   if(e.target.value==1){
  //     this.sliderRisk = "Easy";
  //   }
  //   else if(e.target.value==2){
  //     this.sliderRisk = "Medium";
  //   }
  //   else{
  //     this.sliderRisk = "Hard";
  //   }
  //   console.log(this.sliderRisk);
  // }

  


  onSave(){
    if(this.fileUploaded){
      console.log(this.fileInput);
      this.settings.setBoard(this.fileInput);
      this.settings.setIsUploaded(true);

    }
    
   
    //console.log("hello",typeof(fileReader.readAsText(this.file)));
    this.settings.setgoldCount(this.sliderGold);
    this.settings.setpitCount(this.sliderPit);
    this.settings.setwumpusCount(this.sliderWumpus);
    // ?
    this.router.navigate(['']);
  
  }

}
  

