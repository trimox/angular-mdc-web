import {NgModule} from '@angular/core';

import {MdcTopAppBarModule} from '@angular-mdc/web/top-app-bar';
import {MdcCircularProgressModule} from '@angular-mdc/web/circular-progress';
import {MdcIconModule} from '@angular-mdc/web/icon';
import {MdcDrawerModule} from '@angular-mdc/web/drawer';
import {MdcListModule} from '@angular-mdc/web/list';
import {MdcButtonModule} from '@angular-mdc/web/button';
import {MdcTabBarModule} from '@angular-mdc/web/tab-bar';
import {MdcSnackbarModule} from '@angular-mdc/web/snackbar';
import {MdcDialogModule} from '@angular-mdc/web/dialog';
import {MdcCardModule} from '@angular-mdc/web/card';
import {MdcCheckboxModule} from '@angular-mdc/web/checkbox';
import {MdcChipsModule} from '@angular-mdc/web/chips';
import {MDCDataTableModule} from '@angular-mdc/web/data-table';
import {MdcFabModule} from '@angular-mdc/web/fab';
import {MdcElevationModule} from '@angular-mdc/web/elevation';
import {MdcIconButtonModule} from '@angular-mdc/web/icon-button';
import {MdcImageListModule} from '@angular-mdc/web/image-list';
import {MdcLinearProgressModule} from '@angular-mdc/web/linear-progress';
import {MdcMenuModule} from '@angular-mdc/web/menu';
import {MdcRadioModule} from '@angular-mdc/web/radio';
import {MdcRippleModule} from '@angular-mdc/web/ripple';
import {MdcSelectModule} from '@angular-mdc/web/select';
import {MdcSliderModule} from '@angular-mdc/web/slider';
import {MdcSwitchModule} from '@angular-mdc/web/switch';
import {MdcTextFieldModule} from '@angular-mdc/web/textfield';
import {MdcTypographyModule} from '@angular-mdc/web/typography';

const MDC_MODULES = [
  MdcButtonModule,
  MdcCardModule,
  MdcCheckboxModule,
  MdcChipsModule,
  MdcCircularProgressModule,
  MDCDataTableModule,
  MdcDialogModule,
  MdcDrawerModule,
  MdcElevationModule,
  MdcFabModule,
  MdcIconButtonModule,
  MdcIconModule,
  MdcImageListModule,
  MdcLinearProgressModule,
  MdcListModule,
  MdcMenuModule,
  MdcRadioModule,
  MdcRippleModule,
  MdcSelectModule,
  MdcSliderModule,
  MdcSnackbarModule,
  MdcSwitchModule,
  MdcTabBarModule,
  MdcTextFieldModule,
  MdcTopAppBarModule,
  MdcTypographyModule
];

@NgModule({
  exports: [MDC_MODULES]
})
export class MaterialModule {}
