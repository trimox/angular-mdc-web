import {NgModule} from '@angular/core';

import {
  MdcRippleDirective
} from './ripple';

@NgModule({
  exports: [MdcRippleDirective],
  declarations: [MdcRippleDirective]
})
export class MdcRippleModule { }
