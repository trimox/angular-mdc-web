import {NgModule} from '@angular/core';

import {MdcMaterialIcons} from './material-icons';
import {MdcIcon} from './icon';

const ICON_DECLARATIONS = [
  MdcIcon,
  MdcMaterialIcons
];

@NgModule({
  exports: ICON_DECLARATIONS,
  declarations: ICON_DECLARATIONS
})
export class MdcIconModule { }
