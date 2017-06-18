import { NgModule } from '@angular/core';

import { ButtonModule } from './button';
import { CheckboxModule } from './checkbox';
import { FabModule } from './fab';
import { FormFieldModule } from './form-field';
import { LinearProgressModule } from './linear-progress';
import { MenuModule } from './menu';
import { RadioModule } from './radio';
import { RippleModule } from './ripple';
import { SnackbarModule } from './snackbar';
import { SwitchModule } from './switch';
import { TextfieldModule } from './textfield';
import { ToolbarModule } from './toolbar';
import { TypographyModule } from './typography';

export * from './button';
export * from './checkbox';
export * from './fab';
export * from './form-field';
export * from './linear-progress';
export * from './menu';
export * from './radio';
export * from './ripple';
export * from './snackbar';
export * from './switch';
export * from './textfield';
export * from './toolbar';
export * from './typography';

const MATERIAL_MODULES = [
	ButtonModule,
	CheckboxModule,
	FabModule,
	FormFieldModule,
	LinearProgressModule,
	MenuModule,
	RadioModule,
	RippleModule,
	SnackbarModule,
	SwitchModule,
	TextfieldModule,
	ToolbarModule,
	TypographyModule,
]

@NgModule({
	imports: [
		MATERIAL_MODULES
	],
	exports: [
		MATERIAL_MODULES
	]
})
export class MaterialModule { }