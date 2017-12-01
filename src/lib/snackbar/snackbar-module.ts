import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule, PortalModule } from '@angular-mdc/web/cdk';

import { MdcSnackbar } from './snackbar';
import { MdcSnackbarContainer } from './snackbar-container';
import {
  MdcSnackbarComponent,
  MdcSnackbarText,
  MdcSnackbarActionWrapper,
} from './snackbar.component';

const SNACKBAR_COMPONENTS = [
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
  exports: [SNACKBAR_COMPONENTS],
  declarations: [SNACKBAR_COMPONENTS],
  providers: [MdcSnackbar],
  entryComponents: [
    MdcSnackbarContainer,
    MdcSnackbarComponent,
  ],
})
export class MdcSnackbarModule { }
