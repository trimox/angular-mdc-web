import { NgModule } from '@angular/core';

import { MdcIcon } from './icon';

@NgModule({
  exports: [MdcIcon],
  declarations: [MdcIcon],
})
export class MdcIconModule { }

export * from './icon';
