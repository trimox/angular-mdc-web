import { Component, ViewChild } from '@angular/core';

import { navigationLinks } from './index';
import { MdcTemporaryDrawerComponent } from '../../lib/public_api';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.html',
})
export class AppToolbar {
  navLinks = navigationLinks;
  isFixed: boolean = true;
  @ViewChild('drawer') drawer: MdcTemporaryDrawerComponent;

  toggleDrawer() {
    this.drawer.open();
  }
}
