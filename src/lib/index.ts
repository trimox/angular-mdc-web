import { NgModule } from '@angular/core';

import { ButtonModule } from './button/index';
import { CardModule } from './card/index';
import { CheckboxModule } from './checkbox/index';
import { ElevationModule } from './elevation/index';
import { FabModule } from './fab/index';
import { FormFieldModule } from './form-field/index';
import { LinearProgressModule } from './linear-progress/index';
import { MaterialIconModule } from './material-icon/index';
import { MenuModule } from './menu/index';
import { RadioModule } from './radio/index';
import { RippleModule } from './ripple/index';
import { SnackbarModule } from './snackbar/index';
import { SwitchModule } from './switch/index';
import { TextfieldModule } from './textfield/index';
import { ThemeModule } from './theme/index';
import { ToolbarModule } from './toolbar/index';
import { TypographyModule } from './typography/index';

export * from './button/index';
export * from './card/index';
export * from './checkbox/index';
export * from './elevation/index';
export * from './fab/index';
export * from './form-field/index';
export * from './linear-progress/index';
export * from './material-icon/index';
export * from './menu/index';
export * from './radio/index';
export * from './ripple/index';
export * from './snackbar/index';
export * from './switch/index';
export * from './textfield/index';
export * from './theme/index';
export * from './toolbar/index';
export * from './typography/index';

const MATERIAL_MODULES = [
  ButtonModule,
  CardModule,
  CheckboxModule,
  ElevationModule,
  FabModule,
  FormFieldModule,
  LinearProgressModule,
  MaterialIconModule,
  MenuModule,
  RadioModule,
  RippleModule,
  SnackbarModule,
  SwitchModule,
  TextfieldModule,
  ThemeModule,
  ToolbarModule,
  TypographyModule,
];

@NgModule({
  imports: [
    MATERIAL_MODULES
  ],
  exports: [
    MATERIAL_MODULES
  ]
})
export class MaterialModule { }
