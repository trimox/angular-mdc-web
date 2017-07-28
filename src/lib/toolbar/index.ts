import { NgModule } from '@angular/core';

import { ToolbarComponent } from './toolbar.component';
import { ToolbarRowDirective } from './toolbar-row.directive';
import { ToolbarSectionDirective } from './toolbar-section.directive';
import { ToolbarTitleDirective } from './toolbar-title.directive';
import { ToolbarFixedAdjustDirective } from './toolbar-fixed-adjust.directive';
import { ToolbarIconDirective } from './toolbar-icon.directive';
import { ToolbarIconMenuDirective } from './toolbar-icon-menu.directive';

const TOOLBAR_COMPONENTS = [
  ToolbarComponent,
  ToolbarRowDirective,
  ToolbarSectionDirective,
  ToolbarTitleDirective,
  ToolbarFixedAdjustDirective,
  ToolbarIconDirective,
  ToolbarIconMenuDirective
];

@NgModule({
  exports: [TOOLBAR_COMPONENTS],
  declarations: [TOOLBAR_COMPONENTS],
})
export class ToolbarModule { }

export * from './toolbar.component';
export * from './toolbar-row.directive';
export * from './toolbar-section.directive';
export * from './toolbar-title.directive';
export * from './toolbar-fixed-adjust.directive';
export * from './toolbar-icon.directive';
export * from './toolbar-icon-menu.directive';
