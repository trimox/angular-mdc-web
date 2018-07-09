import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcPortalService, PortalModule } from '@angular-mdc/web/portal';

import { MdcDialogConfig } from './dialog-config';
import { MdcDialogRef } from './dialog-ref';
import { MdcDialogContainer } from './dialog-container';
import { MdcDialogComponent } from './dialog.component';
import { MdcDialog } from './dialog.service';

import {
  MdcDialogBody,
  MdcDialogButton,
  MdcDialogFooter,
  MdcDialogHeader,
  MdcDialogHeaderTitle,
  MdcDialogSurface
} from './dialog-directives';

import {
  DIALOG_CONFIG,
  DIALOG_CONTAINER,
  DIALOG_REF
} from './dialog-injectors';

const DIALOG_DECLARATIONS = [
  MdcDialogBody,
  MdcDialogButton,
  MdcDialogComponent,
  MdcDialogContainer,
  MdcDialogFooter,
  MdcDialogHeader,
  MdcDialogHeaderTitle,
  MdcDialogSurface
];

@NgModule({
  imports: [CommonModule, PortalModule],
  exports: DIALOG_DECLARATIONS,
  declarations: DIALOG_DECLARATIONS,
  providers: [
    MdcPortalService,
    MdcDialog,
    { provide: DIALOG_REF, useValue: MdcDialogRef },
    { provide: DIALOG_CONTAINER, useValue: MdcDialogContainer },
    { provide: DIALOG_CONFIG, useValue: MdcDialogConfig }
  ],
  entryComponents: [MdcDialogContainer]
})
export class MdcDialogModule { }
