import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ButtonModule } from './button';
import { FabModule } from './fab';
import { FormFieldModule } from './form-field';
import { MenuModule } from './menu';
import { SnackbarModule } from './snackbar';
import { SwitchModule } from './switch';
import { TextfieldModule } from './textfield';
import { RippleModule } from './ripple';

export * from './button';
export * from './fab';
export * from './form-field';
export * from './menu';
export * from './snackbar';
export * from './switch';
export * from './textfield';
export * from './ripple';

const MATERIAL_MODULES = [
	ButtonModule,
	FabModule,
	FormFieldModule,
	MenuModule,
	SnackbarModule,
	SwitchModule,
	TextfieldModule,
	RippleModule,
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