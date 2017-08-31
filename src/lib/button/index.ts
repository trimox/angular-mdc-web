import { NgModule } from '@angular/core';

import { MdcButtonComponent } from './button.component';

@NgModule({
  exports: [MdcButtonComponent],
  declarations: [MdcButtonComponent],
})
export class MdcButtonModule { }

export * from './button.component';
