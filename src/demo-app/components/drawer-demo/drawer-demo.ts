import {
  Component,
  ViewChild
} from '@angular/core';

// import { MdcTemporaryDrawer, MdcPersistentDrawer } from '@angular-mdc/web';
import { MdcTemporaryDrawer, MdcPersistentDrawer } from '../../../lib/public_api';

@Component({
  selector: 'drawer-demo',
  templateUrl: './drawer-demo.html'
})
export class DrawerDemo {
  @ViewChild('temporary') temporaryDrawer: MdcTemporaryDrawer;
  @ViewChild('persistent') persistentDrawer: MdcPersistentDrawer;

  handleTemporary() {
    this.temporaryDrawer.open();
  }
  handlePersistent() {
    !this.persistentDrawer.isOpen() ? this.persistentDrawer.open() : this.persistentDrawer.close();
  }
}
