import { NgModule } from '@angular/core';

import { MdcRadioComponent } from './radio.component';

@NgModule({
  exports: [MdcRadioComponent],
  declarations: [MdcRadioComponent]
})
export class MdcRadioModule { }

export * from './radio.component';
