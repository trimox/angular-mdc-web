import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarComponent } from './toolbar.component';
import { ToolbarRowDirective } from './toolbar-row.directive';
import { ToolbarSectionDirective } from './toolbar-section.directive';
import { ToolbarTitleDirective } from './toolbar-title.directive';
import { ToolbarIconDirective } from './toolbar-icon.directive';
import { ToolbarIconMenuDirective } from './toolbar-icon-menu.directive';

const TOOLBAR_COMPONENTS = [
  ToolbarComponent,
  ToolbarRowDirective,
  ToolbarSectionDirective,
  ToolbarTitleDirective,
  ToolbarIconDirective,
  ToolbarIconMenuDirective
];

@NgModule({
  imports: [CommonModule],
  exports: [TOOLBAR_COMPONENTS],
  declarations: [TOOLBAR_COMPONENTS],
})
export class ToolbarModule { }
