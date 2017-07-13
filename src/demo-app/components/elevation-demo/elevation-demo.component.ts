import {
  Component,
} from '@angular/core';

@Component({
  selector: 'elevation-demo',
  templateUrl: './elevation-demo.component.html'
})
export class ElevationDemoComponent {
  items = Array.from(Array(25), (x, i) => i);
}
