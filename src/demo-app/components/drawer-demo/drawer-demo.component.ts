import {
  Component,
  ViewChild
} from '@angular/core';

import {
  MdcTemporaryDrawerComponent,
  MdcPersistentDrawerComponent
} from '../../../lib/public_api';

@Component({
  selector: 'drawer-demo',
  templateUrl: './drawer-demo.component.html'
})
export class DrawerDemoComponent {
  @ViewChild('temporary') temporaryDrawer: MdcTemporaryDrawerComponent;
  @ViewChild('persistent') persistentDrawer: MdcPersistentDrawerComponent;

  handleTemporary() {
    this.temporaryDrawer.open();
  }
  handlePersistent() {
    if (!this.persistentDrawer.isOpen()) {
      this.persistentDrawer.open();
    } else {
      this.persistentDrawer.close();
    }
  }
}
