import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToolbarComponent } from './toolbar';
import { ToolbarRowComponent } from './toolbar-row';
import { ToolbarSectionComponent } from './toolbar-section';
import { ToolbarTitleDirective } from './toolbar-title';

const TOOLBAR_COMPONENTS = [
	ToolbarComponent,
	ToolbarRowComponent,
	ToolbarSectionComponent,
	ToolbarTitleDirective
];

@NgModule({
	imports: [CommonModule],
	exports: [TOOLBAR_COMPONENTS],
	declarations: [TOOLBAR_COMPONENTS],
})
export class ToolbarModule { }
