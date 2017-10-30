import { NgModule } from '@angular/core';

import { MdcFormField } from './form-field';

@NgModule({
  exports: [MdcFormField],
  declarations: [MdcFormField]
})
export class MdcFormFieldModule { }

export * from './form-field';
