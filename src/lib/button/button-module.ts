import { NgModule } from '@angular/core';

import { MdcIconModule } from '@angular-mdc/web/icon';

import { MdcButton } from './button';

@NgModule({
  imports: [
    MdcIconModule
  ],
  exports: [
    MdcButton
  ],
  declarations: [MdcButton],
})
export class MdcButtonModule { }
