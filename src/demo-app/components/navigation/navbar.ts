import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { coreLinks, navigationLinks } from '../../navigation';
import { MdcTemporaryDrawerComponent } from '@angular-mdc/web';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.html'
})
export class Navbar {
  navLinks = navigationLinks;
  coreLinks = coreLinks;
  @ViewChild('drawer') drawer: MdcTemporaryDrawerComponent;

  constructor(public router: Router) { }

  handleMenuClick() {
    if (!this.drawer.isOpen()) {
      this.drawer.open();
    } else {
      this.drawer.close();
    }
  }
}
