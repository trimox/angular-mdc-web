import { NgModule } from '@angular/core';

import { MdcButtonModule } from './button/index';
import { MdcCoreModule } from './core/index';
import { MdcCardModule } from './card/index';
import { MdcCheckboxModule } from './checkbox/index';
import { MdcDialogModule } from './dialog/index';
import { MdcDrawerModule } from './drawer/index';
import { MdcFabModule } from './fab/index';
import { MdcFormFieldModule } from './form-field/index';
import { MdcIconModule } from './icon/index';
import { MdcIconToggleModule } from './icon-toggle/index';
import { MdcLinearProgressModule } from './linear-progress/index';
import { MdcListModule } from './list/index';
import { MdcMenuModule } from './menu/index';
import { MdcRadioModule } from './radio/index';
import { MdcSelectModule } from './select/index';
import { MdcSliderModule } from './slider/index';
import { MdcSnackbarModule } from './snackbar/index';
import { MdcSwitchModule } from './switch/index';
import { MdcTabModule } from './tabs/index';
import { MdcTextfieldModule } from './textfield/index';
import { MdcToolbarModule } from './toolbar/index';

const MATERIAL_MODULES = [
  MdcButtonModule,
  MdcCardModule,
  MdcCoreModule,
  MdcCheckboxModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcFabModule,
  MdcFormFieldModule,
  MdcIconModule,
  MdcIconToggleModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcSelectModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTabModule,
  MdcTextfieldModule,
  MdcToolbarModule,
];

/** @deprecated Use public_api */
@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule { }
