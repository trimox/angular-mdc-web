import { NgModule } from '@angular/core';

import { FormFieldDirective } from './form-field.directive';

@NgModule({
  exports: [FormFieldDirective],
  declarations: [FormFieldDirective]
})
export class FormFieldModule { }
