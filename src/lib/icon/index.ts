import { NgModule } from '@angular/core';

import { MdcIcon } from './icon.component';

@NgModule({
  exports: [MdcIcon],
  declarations: [MdcIcon],
})
export class MdcIconModule { }

export * from './icon.component';
