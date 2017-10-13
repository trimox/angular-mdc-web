import { Component, ViewChild } from '@angular/core';

import { MdcFabComponent } from '../../../../lib/public_api';

@Component({
  selector: 'fab-demo',
  templateUrl: './fab-demo.html'
})
export class FabDemo {
  @ViewChild('fab') fab: MdcFabComponent;
  isMini: boolean = false;
  isExited: boolean = false;
  isRippleDisabled: boolean = false;

  handleFabExitedClick(): void {
    this.isExited = !this.isExited;
    this.fab.toggleExited();
  }
}
