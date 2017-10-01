import {
  Component,
  ViewChild
} from '@angular/core';

import {
  MdcTemporaryDrawerComponent,
  MdcPersistentDrawerComponent
} from '@angular-mdc/web';

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
    !this.persistentDrawer.isOpen() ? this.persistentDrawer.open() : this.persistentDrawer.close();
  }
}
