import {
  Component,
  ViewChild
} from '@angular/core';

import {
  TemporaryDrawerComponent,
  PersistentDrawerComponent
} from '@angular-mdc/web';

@Component({
  selector: 'drawer-demo',
  templateUrl: './drawer-demo.component.html'
})
export class DrawerDemoComponent {
  @ViewChild('temporary') temporaryDrawer: TemporaryDrawerComponent;
  @ViewChild('persistent') persistentDrawer: PersistentDrawerComponent;

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
