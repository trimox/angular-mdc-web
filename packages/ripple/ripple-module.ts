import {NgModule} from '@angular/core';

import {
  MdcRippleComponent,
  MdcRippleDirective
} from './ripple';

@NgModule({
  exports: [MdcRippleComponent, MdcRippleDirective],
  declarations: [MdcRippleComponent, MdcRippleDirective],
})
export class MdcRippleModule { }
