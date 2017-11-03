import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '../cdk/overlay/index';
import { PortalModule } from '../cdk/portal/portal-directives';

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
  ],
  exports: DIALOG_COMPONENTS,
  declarations: DIALOG_COMPONENTS,
  providers: [MdcDialog],
  entryComponents: [
    MdcDialogContainer,
  ],
})
export class MdcDialogModule { }

export * from './dialog';
export * from './dialog.component';
export * from './dialog-directives';
export * from './dialog-container';
export * from './dialog-config';
export * from './dialog-ref';
