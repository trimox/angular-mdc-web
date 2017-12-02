import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';

import { navigationLinks } from './index';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppToolbar {
  navLinks = navigationLinks;
  isFixed: boolean = true;
  @ViewChild('drawer') drawer: any;

  constructor(public media: ObservableMedia) { }

  toggleDrawer() {
    this.drawer.open();
  }
}
