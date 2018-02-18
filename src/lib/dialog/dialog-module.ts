import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '@angular-mdc/web/overlay';
import { PortalModule } from '@angular-mdc/web/portal';

import {
  MdcDialogBackdrop,
  MdcDialogBody,
  MdcDialogButton,
  MdcDialogFooter,
  MdcDialogHeader,
  MdcDialogHeaderTitle,
  MdcDialogSurface,
} from './dialog-directives';
import { MdcDialogComponent } from './dialog.component';
import { MdcDialogContainer } from './dialog-container';
import { MdcDialog } from './dialog';

const DIALOG_DECLARATIONS = [
  MdcDialogComponent,
  MdcDialogContainer,
  MdcDialogBackdrop,
  MdcDialogBody,
  MdcDialogButton,
  MdcDialogFooter,
  MdcDialogHeader,
  MdcDialogHeaderTitle,
  MdcDialogSurface,
];

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule
  ],
  exports: [
    DIALOG_DECLARATIONS
  ],
  declarations: DIALOG_DECLARATIONS,
  providers: [MdcDialog],
  entryComponents: [
    MdcDialogContainer,
    MdcDialogComponent
  ],
})
export class MdcDialogModule { }
