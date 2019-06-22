import {NgModule} from '@angular/core';

import {MdcFloatingLabelModule} from '@angular-mdc/web/floating-label';
import {MdcNotchedOutline} from './notched-outline';

@NgModule({
  imports: [MdcFloatingLabelModule],
  exports: [MdcNotchedOutline],
  declarations: [MdcNotchedOutline]
})
export class MdcNotchedOutlineModule { }
