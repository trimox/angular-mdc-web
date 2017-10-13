import { NgModule } from '@angular/core';
import {
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
  MdcCoreModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTabModule,
  MdcTextfieldModule,
  MdcThemeModule,
  MdcToolbarModule,
  MdcRippleModule,
// } from '@angular-mdc/web';
} from '../lib/public_api';

@NgModule({
  exports: [
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
    MdcCoreModule,
    MdcMenuModule,
    MdcRadioModule,
    MdcSliderModule,
    MdcSnackbarModule,
    MdcSwitchModule,
    MdcTabModule,
    MdcTextfieldModule,
    MdcThemeModule,
    MdcToolbarModule,
    MdcRippleModule,
  ]
})
export class DemoMaterialModule { }
