import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MdcCheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [FormsModule],
  exports: [MdcCheckboxComponent],
  declarations: [MdcCheckboxComponent]
})
export class MdcCheckboxModule { }

export * from './checkbox.component';
