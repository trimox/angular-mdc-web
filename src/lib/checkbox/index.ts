import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CheckboxComponent } from './checkbox.component';

@NgModule({
  imports: [FormsModule],
  exports: [CheckboxComponent],
  declarations: [CheckboxComponent]
})
export class CheckboxModule { }