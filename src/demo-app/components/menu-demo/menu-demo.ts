import {
  Component,
  ViewChild
} from '@angular/core';

import { MdcMenu } from '../../../lib/public_api';

@Component({
  selector: 'menu-demo',
  templateUrl: './menu-demo.html'
})
export class MenuDemo {
  selectedIndex = -1;
  openingPoint: string = "topLeft";
  @ViewChild('menu') menu: MdcMenu;

  showMenu() {
    this.menu.open();
  }
  handleMenuSelect(event: { index: number, item: HTMLElement }) {
    this.selectedIndex = event.index;
  }
}
