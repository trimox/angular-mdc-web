import { NgModule } from '@angular/core';
import {
  MdcButtonModule,
  MdcCardModule,
  MdcCheckboxModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcFabModule,
  MdcFormFieldModule,
  MdcIconModule,
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
  MdcToolbarModule,
  MdcSelectModule,
// } from '@angular-mdc/web';
} from '../lib/public_api';

@NgModule({
  exports: [
    MdcButtonModule,
    MdcCardModule,
    MdcCheckboxModule,
    MdcDialogModule,
    MdcDrawerModule,
    MdcFabModule,
    MdcFormFieldModule,
    MdcIconToggleModule,
    MdcLinearProgressModule,
    MdcListModule,
    MdcIconModule,
    MdcCoreModule,
    MdcMenuModule,
    MdcRadioModule,
    MdcSliderModule,
    MdcSnackbarModule,
    MdcSwitchModule,
    MdcTabModule,
    MdcTextfieldModule,
    MdcToolbarModule,
    MdcSelectModule,
  ]
})
export class DemoMaterialModule { }
