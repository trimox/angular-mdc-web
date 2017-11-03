import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '../cdk/overlay/index';
import { PortalModule } from '../cdk/portal/portal-directives';

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

export * from './snackbar';
export * from './snackbar-container';
export * from './snackbar-config';
export * from './snackbar-ref';
export * from './snackbar.component';
