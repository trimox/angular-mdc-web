import { Component } from '@angular/core';

@Component({
  selector: 'toolbar-demo',
  templateUrl: './toolbar-demo.html'
})
export class ToolbarDemo {
  flexibleExpansionRatio: number;

  onToolbarChange(evt: number) {
    console.log(evt)
    this.flexibleExpansionRatio = evt;
  }
}
