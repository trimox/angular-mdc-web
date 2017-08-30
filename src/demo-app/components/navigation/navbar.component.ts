import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { navigationLinks } from '../../common/navigation-links';
import { TemporaryDrawerComponent } from '../../../lib/public_api';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  navLinks = navigationLinks;
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
