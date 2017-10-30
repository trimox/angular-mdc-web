import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MdcCheckbox } from './checkbox';

@NgModule({
  imports: [FormsModule],
  exports: [MdcCheckbox],
  declarations: [MdcCheckbox]
})
export class MdcCheckboxModule { }

export * from './checkbox';
