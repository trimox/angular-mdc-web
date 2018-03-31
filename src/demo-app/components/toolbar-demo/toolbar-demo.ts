import { Component } from '@angular/core';

@Component({
  selector: 'toolbar-demo',
  templateUrl: './toolbar-demo.html'
})
export class ToolbarDemo {
  flexibleExpansionRatio: number;

  onToolbarChange(evt: number) {
    this.flexibleExpansionRatio = evt;
  }
}
