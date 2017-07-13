import {
  Component,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'menu-demo',
  templateUrl: './menu-demo.component.html'
})
export class MenuDemoComponent {
  selectedIndex = -1;
  focusedItemIndex = null;
  openingPoint = "TOP_LEFT";
  @ViewChild('menu') menu: any;

  handleChange() {
    this.menu.openFrom = this.openingPoint;    
  }

  showMenu() {
    this.menu.open(this.focusedItemIndex);
  }
  handleMenuSelect(event: number) {
    this.selectedIndex = event;
  }
}
