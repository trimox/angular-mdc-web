import { NgModule } from '@angular/core';

import {
  MdcSnackbarComponent,
  MdcSnackbarText,
  MdcSnackbarActionWrapper,
  MdcSnackbarActionButton,
} from './snackbar.component';

const SNACKBAR_COMPONENTS = [
  MdcSnackbarComponent,
  MdcSnackbarText,
  MdcSnackbarActionWrapper,
  MdcSnackbarActionButton,
];

@NgModule({
  exports: [SNACKBAR_COMPONENTS],
  declarations: [SNACKBAR_COMPONENTS],
})
export class MdcSnackbarModule { }

export * from './snackbar.component';
export * from './snackbar-message';
