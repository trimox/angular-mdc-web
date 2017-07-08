import { NgModule } from '@angular/core';

import { SnackbarComponent } from './snackbar.component';
import { SnackbarTextDirective } from './snackbar-text.directive';
import { SnackbarActionWrapperDirective } from './snackbar-action-wrapper.directive';
import { SnackbarActionButtonDirective } from './snackbar-action-button.directive';

const SNACKBAR_COMPONENTS = [
  SnackbarComponent,
  SnackbarTextDirective,
  SnackbarActionWrapperDirective,
  SnackbarActionButtonDirective
];

@NgModule({
  exports: [SNACKBAR_COMPONENTS],
  declarations: [SNACKBAR_COMPONENTS],
})
export class SnackbarModule { }
