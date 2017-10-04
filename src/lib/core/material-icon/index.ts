import { NgModule } from '@angular/core';

import { MdcMaterialIcon } from './material-icon.directive';

@NgModule({
  exports: [MdcMaterialIcon],
  declarations: [MdcMaterialIcon],
})
export class MdcMaterialIconModule { }

export * from './material-icon.directive';
