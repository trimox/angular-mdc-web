import { Component } from '@angular/core';

@Component({
  selector: 'chips-demo',
  templateUrl: './chips-demo.html'
})
export class ChipsDemo {
  onChipSetChange(event) {
    console.log(event)
  }
}
