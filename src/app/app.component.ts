import { Component, OnInit } from '@angular/core';
import { INSPECT_MAX_BYTES } from 'buffer';
import { equal } from 'assert';

class RandomNumber {
  static within(n: number): number {
    return Math.floor(Math.random() * n);
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'game';




  noOfRow = null;
  noOfCol = null;
  row = [];
  col = [];
  SpritesPosition = [];
  SpritesPositionCopy = [];
  xCenter = null;
  yCenter = null;
  array2d: any;

  // board dimentions horizontalLine for height and verticalLine for width
  horizontalLine = [];
  verticalLine = [];
  height = null;
  width = null;
  // let xAxis and yAxis is the position of player
  xAxis = null;
  yAxis = null;

  // 1d array of enemy position 
  enemyPosition = [];
  // 2d array of rendom position of enemy 
  rendomPositionOfEnemy: any;

  totalMove = 0;
  ngOnInit() {

    this.gethorizontalLine();
  }

  gethorizontalLine() {
    this.height = prompt('enter the height of board');

    // check no is integer or not
    if ((!isNaN(this.height) && (this.height > 0))) {
      // no of row in board 
      this.horizontalLine = Array(parseInt(this.height)).fill(1).map((x, i) => i);
      // check the center point accourding to heigth
      if (this.height % 2 == 0) {
        this.yAxis = parseInt(this.height) / 2;
      } else {
        this.yAxis = (parseInt(this.height) - 1) / 2;
      }
      // create an  array of length equal to height of board enter by user
      this.rendomPositionOfEnemy = new Array(parseInt(this.height));


      this.getVerticalLine();

    } else {
      alert('Please enter the a +ve no greater then 0 ');

      this.gethorizontalLine();
    }
  }
  getVerticalLine() {
    this.width = prompt('enter the width of board');
    if ((!isNaN(this.width) && (this.width > 0))) {

      // tslint:disable-next-line: radix
      this.verticalLine = Array(parseInt(this.width)).fill(1).map((x, i) => i);
      // tslint:disable-next-line: radix
      for (let z = 0; z < parseInt(this.height); z++) {
        // tslint:disable-next-line: radix
        this.rendomPositionOfEnemy[z] = new Array(parseInt(this.width));

      }
      if (parseInt(this.width) % 2 == 0) {
        this.xAxis = parseInt(this.width) / 2;
      } else {
        this.xAxis = (parseInt(this.width) - 1) / 2;
      }

      this.setValueZero();

      // max no of enemy is equal to height enter by user
      while (this.enemyPosition.length < this.height) {

        // check the rendom position of enemy is not the same as position of player
        if (!((this.enemyPosition.length == this.yAxis) && (this.xAxis == this.within(parseInt(this.width))))) {

          // position of enemy in 1d array
          this.enemyPosition.push(this.within(parseInt(this.width)));
        }
      }

      // position of enemy in 2d array
      this.enemyPosition.forEach((ele, index) => {
        this.rendomPositionOfEnemy[index][ele] = 1;
      });



    } else {
      alert('Please enter the a +ve no greater then 0 ');

      this.getVerticalLine();
    }
  }


  // generate rendom no less  then n
  within(n: number): number {
    return Math.floor(Math.random() * n);
  }

  findNearestEnemy() {
    // tslint:disable-next-line: prefer-const
    let distance = [];
    this.rendomPositionOfEnemy.forEach((element, index) => {
      element.forEach((ele, ind) => {
        if (ele === 1) {
          // tslint:disable-next-line: max-line-length
          distance.push({ ind1: index, ind2: ind, val: this.convertNegToPos(this.yAxis - index) + this.convertNegToPos(this.xAxis - ind) });
          distance.sort((a, b) => {
            return a.val - b.val;
          });
        }
      });
    });

    return distance[0];
  }

  movePlayer() {
    if (this.findNearestEnemy()) {
      const nxtPoint = this.findNearestEnemy();
      this.totalMove = this.totalMove + nxtPoint.val;
      this.rendomPositionOfEnemy[nxtPoint.ind1][nxtPoint.ind2] = 0;


      this.yAxis = nxtPoint.ind1;
      this.xAxis = nxtPoint.ind2;
      setTimeout(() => {

        this.movePlayer();
      }, 1000);
    } else {
      alert(' Game over Total Move to kill enemy is ' + this.totalMove);
    }



  }

  // convert -ve no into +ve no
  convertNegToPos(n) {
    if (n < 0) {
      n = n * (-1);
    }
    // tslint:disable-next-line: radix
    return parseInt(n);
  }


  // set the value zero at every position 
  setValueZero() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.rendomPositionOfEnemy.length; i++) {
      for (let j = 0; j < this.rendomPositionOfEnemy[i].length; j++) {
        this.rendomPositionOfEnemy[i][j] = 0;

      }
    }

  }
}
