import { NgModule } from '@angular/core';

import { ButtonModule } from './button/index';
import { CardModule } from './card/index';
import { CheckboxModule } from './checkbox/index';
import { DialogModule } from './dialog/index';
import { DrawerModule } from './drawer/index';
import { ElevationModule } from './elevation/index';
import { FabModule } from './fab/index';
import { FormFieldModule } from './form-field/index';
import { IconToggleModule } from './icon-toggle/index';
import { LinearProgressModule } from './linear-progress/index';
import { ListModule } from './list/index';
import { MaterialIconModule } from './material-icon/index';
import { MenuModule } from './menu/index';
import { RadioModule } from './radio/index';
import { RippleModule } from './ripple/index';
import { SnackbarModule } from './snackbar/index';
import { SwitchModule } from './switch/index';
import { TabModule } from './tabs/index';
import { TextfieldModule } from './textfield/index';
import { ThemeModule } from './theme/index';
import { ToolbarModule } from './toolbar/index';
import { TypographyModule } from './typography/index';

const MATERIAL_MODULES = [
  ButtonModule,
  CardModule,
  CheckboxModule,
  DialogModule,
  DrawerModule,
  ElevationModule,
  FabModule,
  FormFieldModule,
  IconToggleModule,
  LinearProgressModule,
  ListModule,
  MaterialIconModule,
  MenuModule,
  RadioModule,
  RippleModule,
  SnackbarModule,
  SwitchModule,
  TabModule,
  TextfieldModule,
  ThemeModule,
  ToolbarModule,
  TypographyModule,
];

/** @deprecated Use public_api */
@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule { }
