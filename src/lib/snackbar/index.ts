import { NgModule } from '@angular/core';

import { MdcSnackbarComponent } from './snackbar.component';
import { MdcSnackbarTextDirective } from './snackbar-text.directive';
import { MdcSnackbarActionWrapperDirective } from './snackbar-action-wrapper.directive';
import { MdcSnackbarActionButtonDirective } from './snackbar-action-button.directive';

const SNACKBAR_COMPONENTS = [
  MdcSnackbarComponent,
  MdcSnackbarTextDirective,
  MdcSnackbarActionWrapperDirective,
  MdcSnackbarActionButtonDirective
];

@NgModule({
  exports: [SNACKBAR_COMPONENTS],
  declarations: [SNACKBAR_COMPONENTS],
})
export class MdcSnackbarModule { }

export * from './snackbar.component';
export * from './snackbar-message';
export * from './snackbar-text.directive';
export * from './snackbar-action-wrapper.directive';
export * from './snackbar-action-button.directive';
