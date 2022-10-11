import { Component, OnInit } from '@angular/core';
import { Wumpus } from '../wumpus';



@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css']
})
export class GamepageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
     let wumpus = new Wumpus();
        wumpus.reStart();

        $(window).keypress(function (e) {
            if (e.keyCode === 0 || e.keyCode === 32) {
                e.preventDefault();
                //console.log(JSON.stringify(wumpus));
                var dir = wumpus.move();
                wumpus.handMove(dir);
            }
        });

        var timer = function () {
            if (!wumpus.gameOver) {
                var dir = wumpus.move();
                wumpus.handMove(dir);
            }
        };

        $("#startGame").click(function () {
            setInterval(timer, 800);
        });
    
  }

}
