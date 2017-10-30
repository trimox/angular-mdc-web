import { NgModule } from '@angular/core';

import {
  MdcDialog,
  MdcDialogBackdrop,
  MdcDialogBody,
  MdcDialogButton,
  MdcDialogFooter,
  MdcDialogHeader,
  MdcDialogHeaderTitle,
  MdcDialogSurface,
} from './dialog';

const DIALOG_COMPONENTS = [
  MdcDialog,
  MdcDialogBackdrop,
  MdcDialogBody,
  MdcDialogButton,
  MdcDialogFooter,
  MdcDialogHeader,
  MdcDialogHeaderTitle,
  MdcDialogSurface,
];

@NgModule({
  exports: DIALOG_COMPONENTS,
  declarations: DIALOG_COMPONENTS
})
export class MdcDialogModule { }

export * from './dialog';
