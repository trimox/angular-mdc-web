import { Component } from '@angular/core';

@Component({
  selector: 'menu-demo',
  templateUrl: './menu-demo.html'
})
export class MenuDemo {
  selectedIndex = -1;
  anchorCorner: string = 'top-start';

  handleMenuSelect(event: { index: number, item: HTMLElement }) {
    this.selectedIndex = event.index;
  }
}
