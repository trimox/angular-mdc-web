import { NgModule } from '@angular/core';

import { MdcToolbarComponent } from './toolbar.component';
import { MdcToolbarRowDirective } from './toolbar-row.directive';
import { MdcToolbarSectionDirective } from './toolbar-section.directive';
import { MdcToolbarTitleDirective } from './toolbar-title.directive';
import { MdcToolbarFixedAdjustDirective } from './toolbar-fixed-adjust.directive';
import { MdcToolbarIcon } from './toolbar-icon.directive';
import { MdcToolbarIconMenu } from './toolbar-icon-menu.directive';

const TOOLBAR_COMPONENTS = [
  MdcToolbarComponent,
  MdcToolbarRowDirective,
  MdcToolbarSectionDirective,
  MdcToolbarTitleDirective,
  MdcToolbarFixedAdjustDirective,
  MdcToolbarIcon,
  MdcToolbarIconMenu
];

@NgModule({
  exports: [TOOLBAR_COMPONENTS],
  declarations: [TOOLBAR_COMPONENTS],
})
export class MdcToolbarModule { }

export * from './toolbar.component';
export * from './toolbar-row.directive';
export * from './toolbar-section.directive';
export * from './toolbar-title.directive';
export * from './toolbar-fixed-adjust.directive';
export * from './toolbar-icon.directive';
export * from './toolbar-icon-menu.directive';
