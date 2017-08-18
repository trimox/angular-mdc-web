import { NgModule } from '@angular/core';

import {
  DialogBackdropDirective,
  DialogBodyDirective,
  DialogComponent,
  DialogFooterDirective,
  DialogHeaderDirective,
  DialogSurfaceDirective,
  DialogHeaderTitleDirective,
  DialogButtonAcceptDirective,
  DialogButtonCancelDirective,
  DialogButtonDirective,
} from './dialog.component';

const DIALOG_COMPONENTS = [
  DialogBackdropDirective,
  DialogBodyDirective,
  DialogComponent,
  DialogFooterDirective,
  DialogHeaderDirective,
  DialogSurfaceDirective,
  DialogHeaderTitleDirective,
  DialogButtonAcceptDirective,
  DialogButtonCancelDirective,
  DialogButtonDirective,
];

@NgModule({
  exports: DIALOG_COMPONENTS,
  declarations: DIALOG_COMPONENTS
})
export class DialogModule { }

export * from './dialog.component';
