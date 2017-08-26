import {
  Component,
  ViewChild
} from '@angular/core';

import { MenuComponent, MenuOpenFrom } from '../../../lib/public_api';

@Component({
  selector: 'menu-demo',
  templateUrl: './menu-demo.component.html'
})
export class MenuDemoComponent {
  selectedIndex = -1;
  focusedItemIndex = null;
  openingPoint: any = "topLeft";
  @ViewChild('menu') menu: MenuComponent;

  handleChange() {
    this.menu.openFrom = this.openingPoint;
  }

  showMenu() {
    this.menu.open(this.focusedItemIndex);
  }
  handleMenuSelect(event: { index: number, item: HTMLElement }) {
    this.selectedIndex = event.index;
  }
}
