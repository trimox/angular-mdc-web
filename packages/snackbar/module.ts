import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {MdcButtonModule} from '@angular-mdc/web/button';

import {MdcSnackbarBase} from './snackbar-base';
import {MdcSnackbarContainer} from './snackbar-container';
import {MdcSnackbarComponent} from './snackbar.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule,
    MdcButtonModule
  ],
  exports: [MdcSnackbarContainer],
  declarations: [MdcSnackbarContainer, MdcSnackbarBase, MdcSnackbarComponent],
  entryComponents: [MdcSnackbarContainer, MdcSnackbarComponent, MdcSnackbarBase]
})
export class MdcSnackbarModule { }
