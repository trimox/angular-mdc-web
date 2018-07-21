import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MdcIconModule } from '@angular-mdc/web/icon';

import { MdcIconToggle } from './icon-toggle';

@NgModule({
  imports: [
    FormsModule,
    MdcIconModule
  ],
  exports: [
    MdcIconToggle,
    MdcIconModule,
  ],
  declarations: [MdcIconToggle]
})
export class MdcIconToggleModule { }
