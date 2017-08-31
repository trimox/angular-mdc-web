import { NgModule } from '@angular/core';

import {
  MdcDialogBackdropDirective,
  MdcDialogBodyDirective,
  MdcDialogComponent,
  MdcDialogFooterDirective,
  MdcDialogHeaderDirective,
  MdcDialogSurfaceDirective,
  MdcDialogHeaderTitleDirective,
  MdcDialogButtonDirective,
} from './dialog.component';

const DIALOG_COMPONENTS = [
  MdcDialogBackdropDirective,
  MdcDialogBodyDirective,
  MdcDialogComponent,
  MdcDialogFooterDirective,
  MdcDialogHeaderDirective,
  MdcDialogSurfaceDirective,
  MdcDialogHeaderTitleDirective,
  MdcDialogButtonDirective,
];

@NgModule({
  exports: DIALOG_COMPONENTS,
  declarations: DIALOG_COMPONENTS
})
export class MdcDialogModule { }

export * from './dialog.component';
