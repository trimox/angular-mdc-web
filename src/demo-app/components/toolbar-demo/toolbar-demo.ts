import { Component } from '@angular/core';

@Component({
  selector: 'toolbar-demo',
  templateUrl: './toolbar-demo.html'
})
export class ToolbarDemo {
  flexibleExpansionRatio: number;

  handleToolbarChange(evt: number) {
    console.log(evt)
    this.flexibleExpansionRatio = evt;
  }
}
