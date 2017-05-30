import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonModule } from './button';
import { CheckboxModule } from './checkbox';
import { FabModule } from './fab';
import { FormFieldModule } from './form-field';
import { MenuModule } from './menu';
import { RippleModule } from './ripple';
import { SnackbarModule } from './snackbar';
import { SwitchModule } from './switch';
import { TextfieldModule } from './textfield';
import { ToolbarModule } from './toolbar';

export * from './button';
export * from './checkbox';
export * from './fab';
export * from './form-field';
export * from './menu';
export * from './ripple';
export * from './snackbar';
export * from './switch';
export * from './textfield';
export * from './toolbar';

const MATERIAL_MODULES = [
	ButtonModule,
	CheckboxModule,
	FabModule,
	FormFieldModule,
	MenuModule,
	RippleModule,
	SnackbarModule,
	SwitchModule,
	TextfieldModule,
	ToolbarModule,
]

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MATERIAL_MODULES
	],
	exports: [
		MATERIAL_MODULES
	]
})
export class MaterialModule { }