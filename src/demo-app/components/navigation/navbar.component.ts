import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { TemporaryDrawerComponent } from '@angular-mdc/web';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  navItems = [
    { name: 'Home', route: 'home-demo', icon: 'home' },
    { name: 'Button', route: 'button-demo', icon: 'code' },
    { name: 'Card', route: 'card-demo', icon: 'credit_card' },
    { name: 'Checkbox', route: 'checkbox-demo', icon: 'check_box' },
    { name: 'Drawer', route: 'drawer-demo', icon: 'code' },
    { name: 'Elevation', route: 'elevation-demo', icon: 'code' },
    { name: 'Floating Action Button (FAB)', route: 'fab-demo', icon: 'code' },
    { name: 'Linear-Progress', route: 'linear-progress-demo', icon: 'linear_scale' },
    { name: 'List', route: 'list-demo', icon: 'list' },
    { name: 'Menu', route: 'menu-demo', icon: 'menu' },
    { name: 'Radio Button', route: 'radio-demo', icon: 'radio_button_checked' },
    { name: 'Ripple', route: 'ripple', icon: 'aspect_ratio' },
    { name: 'Snackbar', route: 'snackbar-demo', icon: 'info_outline' },
    { name: 'Switch', route: 'switch-demo', icon: 'wb_incandescent' },
    { name: 'Textfield', route: 'textfield-demo', icon: 'input' },
    { name: 'Toolbar', route: 'toolbar-demo', icon: 'code' },
    { name: 'Typography', route: 'typography-demo', icon: 'text_fields' }
  ];

  @ViewChild('drawer') drawer: TemporaryDrawerComponent;

  constructor(public router: Router) { }

  handleMenuClick() {
    if (!this.drawer.isOpen()) {
      this.drawer.open();
    } else {
      this.drawer.close();
    }
  }
}
