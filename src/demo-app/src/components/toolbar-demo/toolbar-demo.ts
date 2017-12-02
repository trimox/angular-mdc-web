import {
  Component,
} from '@angular/core';

@Component({
  selector: 'toolbar-demo',
  templateUrl: './toolbar-demo.html'
})
export class ToolbarDemo {
  isFixed = false;
  isFlexible = false;
  isWaterfall = false;
  isFixedLastRow = false;
  flexibleExpansionRatio: number;

  handleToolbarChange(evt: number) {
    this.flexibleExpansionRatio = evt;
  }
}
