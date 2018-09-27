import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MdcButtonModule } from '@angular-mdc/web/button';

import { MdcSnackbarComponent } from './snackbar.component';
import { MdcSnackbarContainer } from './snackbar-container';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    MdcButtonModule
  ],
  exports: [MdcSnackbarContainer],
  declarations: [MdcSnackbarContainer, MdcSnackbarComponent],
  entryComponents: [MdcSnackbarContainer, MdcSnackbarComponent]
})
export class MdcSnackbarModule { }
