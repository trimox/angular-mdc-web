import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MdcFloatingLabelModule} from '@angular-mdc/web/floating-label';
import {MdcNotchedOutline} from './notched-outline';

@NgModule({
  imports: [CommonModule, MdcFloatingLabelModule],
  exports: [MdcNotchedOutline],
  declarations: [MdcNotchedOutline]
})
export class MdcNotchedOutlineModule { }
