import { Component, ViewChild } from '@angular/core';

import { MdcFabComponent } from '@angular-mdc/web';

@Component({
  selector: 'fab-demo',
  templateUrl: './fab-demo.component.html'
})
export class FabDemoComponent {
  @ViewChild('fab') fab: MdcFabComponent;
  isMini: boolean = false;
  isExited: boolean = false;
  isRippleDisabled: boolean = false;

  handleFabExitedClick(): void {
    this.isExited = !this.isExited;
    this.fab.toggleExited();
  }
}
