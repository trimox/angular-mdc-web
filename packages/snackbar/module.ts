import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayModule} from '@angular-mdc/web/overlay';
import {PortalModule} from '@angular/cdk/portal';

import {MdcSnackbarComponent} from './snackbar.component';
import {MdcSnackbarContainer} from './snackbar-container';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
  ],
  exports: [MdcSnackbarContainer],
  declarations: [MdcSnackbarContainer, MdcSnackbarComponent],
  entryComponents: [MdcSnackbarContainer, MdcSnackbarComponent]
})
export class MdcSnackbarModule { }
