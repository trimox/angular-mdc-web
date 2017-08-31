import { NgModule } from '@angular/core';

import { MdcFormFieldDirective } from './form-field.directive';

@NgModule({
  exports: [MdcFormFieldDirective],
  declarations: [MdcFormFieldDirective]
})
export class MdcFormFieldModule { }

export * from './form-field.directive';
