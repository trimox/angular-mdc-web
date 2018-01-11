import { Component, ViewChild } from '@angular/core';

import { MdcTemporaryDrawer } from '@angular-mdc/web';

@Component({
  selector: 'drawer-demo',
  templateUrl: './drawer-demo.html'
})
export class DrawerDemo {
  @ViewChild('temporary') temporaryDrawer: MdcTemporaryDrawer;

  handleTemporary() {
    this.temporaryDrawer.open();
  }
}
