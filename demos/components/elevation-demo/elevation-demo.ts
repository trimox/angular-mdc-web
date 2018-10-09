import { Component } from '@angular/core';

@Component({
  templateUrl: './elevation-demo.html'
})
export class ElevationDemo {
  items = Array.from(Array(25), (x, i) => i);
}
