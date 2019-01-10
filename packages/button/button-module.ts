import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MdcButton, MdcButtonLabel } from './button';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [MdcButton, MdcButtonLabel],
  declarations: [MdcButton, MdcButtonLabel]
})
export class MdcButtonModule { }
