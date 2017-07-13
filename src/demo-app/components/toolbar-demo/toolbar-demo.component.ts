import {
  Component,
} from '@angular/core';

@Component({
  selector: 'toolbar-demo',
  templateUrl: './toolbar-demo.component.html'
})
export class ToolbarDemoComponent {
  isFixed = false;
  isFlexible = false;
  isWaterfall = false;
  isFixedLastRow = false;
  flexibleExpansionRatio: number;

  handleToolbarChange(evt) {
    this.flexibleExpansionRatio = evt;
  }
}
