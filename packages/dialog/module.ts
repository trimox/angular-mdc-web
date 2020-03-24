import {NgModule} from '@angular/core';

import {OverlayModule} from '@angular-mdc/web/overlay';
import {PortalModule} from '@angular/cdk/portal';

import {MdcButtonModule} from '@angular-mdc/web/button';
import {MdcDialogComponent} from './dialog.component';
import {MdcDialogPortal} from './dialog-portal';
import {MdcDialog} from './dialog';

import {
  MdcDialogAction,
  MdcDialogActions,
  MdcDialogButton,
  MdcDialogContainer,
  MdcDialogContent,
  MdcDialogScrim,
  MdcDialogSurface,
  MdcDialogTitle
} from './dialog-directives';

const DIALOG_DECLARATIONS = [
  MdcDialogAction,
  MdcDialogActions,
  MdcDialogButton,
  MdcDialogComponent,
  MdcDialogContainer,
  MdcDialogPortal,
  MdcDialogContent,
  MdcDialogScrim,
  MdcDialogSurface,
  MdcDialogSurface,
  MdcDialogTitle
];

@NgModule({
  imports: [
    OverlayModule,
    PortalModule,
    MdcButtonModule,
  ],
  exports: DIALOG_DECLARATIONS,
  declarations: DIALOG_DECLARATIONS,
  providers: [MdcDialog],
  entryComponents: [
    MdcDialogPortal,
    MdcDialogComponent
  ]
})
export class MdcDialogModule { }
