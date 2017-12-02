import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule, PortalModule } from '@angular-mdc/web/cdk';
import { MdcButtonModule } from '@angular-mdc/web/button';

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

const DIALOG_COMPONENTS = [
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
    OverlayModule,
    PortalModule,
    CommonModule,
    MdcButtonModule,
  ],
  exports: [
    DIALOG_COMPONENTS
  ],
  declarations: DIALOG_COMPONENTS,
  providers: [MdcDialog],
  entryComponents: [
    MdcDialogContainer,
    MdcDialogComponent,
  ],
})
export class MdcDialogModule { }
