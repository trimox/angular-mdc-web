import { NgModule } from '@angular/core';

import { OverlayModule } from './cdk/overlay/index';

import { MdcButtonModule } from './button/index';
import { MdcCardModule } from './card/index';
import { MdcCheckboxModule } from './checkbox/index';
import { MdcDialogModule } from './dialog/index';
import { MdcDrawerModule } from './drawer/index';
import { MdcElevationModule } from './elevation/index';
import { MdcFabModule } from './fab/index';
import { MdcFormFieldModule } from './form-field/index';
import { MdcIconToggleModule } from './icon-toggle/index';
import { MdcLinearProgressModule } from './linear-progress/index';
import { MdcListModule } from './list/index';
import { MdcMaterialIconModule } from './material-icon/index';
import { MdcMenuModule } from './menu/index';
import { MdcRadioModule } from './radio/index';
import { MdcSliderModule } from './slider/index';
import { MdcSnackbarModule } from './snackbar/index';
import { MdcSwitchModule } from './switch/index';
import { MdcTabModule } from './tabs/index';
import { MdcTextfieldModule } from './textfield/index';
import { MdcThemeModule } from './theme/index';
import { MdcToolbarModule } from './toolbar/index';
import { MdcTypographyModule } from './typography/index';

const MATERIAL_MODULES = [
  OverlayModule,
  MdcButtonModule,
  MdcCardModule,
  MdcCheckboxModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcFormFieldModule,
  MdcIconToggleModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcMaterialIconModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTabModule,
  MdcTextfieldModule,
  MdcThemeModule,
  MdcToolbarModule,
  MdcTypographyModule,
];

/** @deprecated Use public_api */
@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule { }
