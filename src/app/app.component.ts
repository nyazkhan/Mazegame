import { Component, OnInit } from '@angular/core';

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

  horizontalLine = null;


  ngOnInit() {

    this.gethorizontalLine();
  }

  gethorizontalLine() {
    this.noOfRow = prompt('enter the  no ROW');
    if ((!isNaN(this.noOfRow) && (this.noOfRow > 0))) {
      // tslint:disable-next-line: radix
      this.row = Array(parseInt(this.noOfRow)).fill(1).map((x, i) => i);
      if (this.noOfRow % 2 == 0) {
        // tslint:disable-next-line: radix
        this.yCenter = parseInt(this.noOfRow) / 2;
      } else {
        // tslint:disable-next-line: radix
        this.yCenter = (parseInt(this.noOfRow) - 1) / 2;
      }
      // tslint:disable-next-line: radix
      this.array2d = new Array(parseInt(this.noOfRow));


      this.getWidth();

    } else {
      alert('Please enter the a no ');

      this.gethorizontalLine();
    }
  }
  getWidth() {
    this.noOfCol = prompt('enter the no of  COl');
    if ((!isNaN(this.noOfCol) && (this.noOfCol > 0))) {
      // this.create2Darray(this.noOfRow, this.noOfCol);

      // tslint:disable-next-line: radix
      this.col = Array(parseInt(this.noOfCol)).fill(1).map((x, i) => i);
      // tslint:disable-next-line: radix
      for (let z = 0; z < parseInt(this.noOfRow); z++) {
        // tslint:disable-next-line: radix
        this.array2d[z] = new Array(parseInt(this.noOfCol));

      }
      console.log(this.array2d);

      if (parseInt(this.noOfCol) % 2 == 0) {
        this.xCenter = parseInt(this.noOfCol) / 2;
      } else {
        // tslint:disable-next-line: radix
        this.xCenter = (parseInt(this.noOfCol) - 1) / 2;
      }

      this.create2Darray();

      while (this.SpritesPosition.length < this.noOfRow) {
        // tslint:disable-next-line: radix
        if (!((this.SpritesPosition.length == this.yCenter) && (this.xCenter == this.within(parseInt(this.noOfCol))))) {

          // tslint:disable-next-line: radix
          this.SpritesPosition.push(this.within(parseInt(this.noOfCol)));
        }
      }

      console.log(this.SpritesPosition);

      this.SpritesPosition.forEach((ele, index) => {
        this.array2d[index][ele] = 1;
      });


      this.SpritesPositionCopy = this.SpritesPosition;
      console.log(this.array2d);
      console.log(this.yCenter + 'y  x ' + this.xCenter);

    } else {
      console.log(this.noOfCol + ' else');
      alert('Please enter the a +ve no greater then 0 ');

      this.getWidth();
    }
  }



  within(n: number): number {
    return Math.floor(Math.random() * n);
  }

  showStripe(i, j) {


    // tslint:disable-next-line: triple-equals
    if (this.array2d[i][j] == 1) {
      return true;

    } else {
      return false;

    }
  }


  findNextpoint() {
    let distance = [];
    this.array2d.forEach((element, index, arr) => {
      element.forEach((ele, ind) => {
        if (ele === 1) {
          // tslint:disable-next-line: max-line-length
          distance.push({ ind1: index, ind2: ind, val: this.convertNegToPos(this.yCenter - index) + this.convertNegToPos(this.xCenter - ind) });
          distance.sort((a, b) => {
            return a.val - b.val;
          });

          // arr[index][ind] = 0;
        }
      });
      // tslint:disable-next-line: no-bitwise
    });
    console.log(distance);
    console.log(' dist');

    console.log(this.SpritesPosition);
    console.log(' post');

    return distance[0];
  }

  moveObject() {
    const nxtPoint = this.findNextpoint();
    this.array2d[nxtPoint.ind1][nxtPoint.ind2] = 0;
    this.yCenter = nxtPoint.ind1;
    this.xCenter = nxtPoint.ind2;


  }


  convertNegToPos(n) {
    if (n < 0) {
      n = n * (-1);
    }
    // tslint:disable-next-line: radix
    return parseInt(n);
  }



  create2Darray() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.array2d.length; i++) {
      for (let j = 0; j < this.array2d[i].length; j++) {
        this.array2d[i][j] = 0;
        // console.log(this.array2d[i][j] + i + '  ' + j);

      }
    }

  }
}
