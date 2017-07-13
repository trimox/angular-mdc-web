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
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule { }
