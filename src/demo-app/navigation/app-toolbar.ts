import { Component, ViewChild } from '@angular/core';

import { navigationLinks } from './index';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.html',
})
export class AppToolbar {
  navLinks = navigationLinks;
  isFixed: boolean = true;
  @ViewChild('drawer') drawer: any;

  toggleDrawer() {
    this.drawer.open();
  }
}
