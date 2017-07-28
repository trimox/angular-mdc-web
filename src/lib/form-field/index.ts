import { NgModule } from '@angular/core';

import { FormFieldDirective } from './form-field.directive';

@NgModule({
  exports: [FormFieldDirective],
  declarations: [FormFieldDirective]
})
export class FormFieldModule { }

export * from './form-field.directive';
