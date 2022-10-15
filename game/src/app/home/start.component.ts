import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }


  goNextPage(){
    console.log("play");
    this.router.navigate(['play']);
  }
  goPlayerAgent(){
    this.router.navigate(['play-agent'])
  }
  goSettings(){
    console.log("set");
    this.router.navigate(['settings']);
  }
}
