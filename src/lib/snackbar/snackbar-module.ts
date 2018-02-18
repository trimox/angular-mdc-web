import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '@angular-mdc/web/overlay';
import { PortalModule } from '@angular-mdc/web/portal';

import { MdcSnackbar } from './snackbar';
import { MdcSnackbarContainer } from './snackbar-container';
import {
  MdcSnackbarComponent,
  MdcSnackbarText,
  MdcSnackbarActionWrapper,
} from './snackbar.component';

const SNACKBAR_DECLARATIONS = [
  MdcSnackbarComponent,
  MdcSnackbarContainer,
  MdcSnackbarText,
  MdcSnackbarActionWrapper,
];

@NgModule({
  imports: [
    OverlayModule,
    PortalModule,
    CommonModule,
  ],
  exports: [SNACKBAR_DECLARATIONS],
  declarations: [SNACKBAR_DECLARATIONS],
  providers: [MdcSnackbar],
  entryComponents: [
    MdcSnackbarContainer,
    MdcSnackbarComponent,
  ],
})
export class MdcSnackbarModule { }
