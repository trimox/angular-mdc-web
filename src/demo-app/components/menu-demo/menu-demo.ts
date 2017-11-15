import { Component, ViewChild } from '@angular/core';

import { MdcMenu, MdcMenuOpenFrom } from '../../../lib/menu';

@Component({
  selector: 'menu-demo',
  templateUrl: './menu-demo.html'
})
export class MenuDemo {
  selectedIndex = -1;
  openFrom: MdcMenuOpenFrom = 'topLeft';
  @ViewChild('menu') menu: MdcMenu;

  openMenu() {
    this.menu.open();
  }

  handleMenuSelect(event: { index: number, item: HTMLElement }) {
    this.selectedIndex = event.index;
  }
}
