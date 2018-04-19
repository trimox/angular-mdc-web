import { NgModule } from '@angular/core';

import { OverlayModule } from '@angular-mdc/web/overlay';
import { PortalModule } from '@angular-mdc/web/portal';

import { MdcSnackbar } from './snackbar';
import { MdcSnackbarContainer } from './snackbar-container';
import { MdcSnackbarComponent } from './snackbar.component';

const SNACKBAR_DECLARATIONS = [
  MdcSnackbarComponent,
  MdcSnackbarContainer
];

@NgModule({
  imports: [
    OverlayModule,
    PortalModule
  ],
  exports: SNACKBAR_DECLARATIONS,
  declarations: SNACKBAR_DECLARATIONS,
  providers: [MdcSnackbar],
  entryComponents: [
    MdcSnackbarContainer,
    MdcSnackbarComponent,
  ],
})
export class MdcSnackbarModule { }
