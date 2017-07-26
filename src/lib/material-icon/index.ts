import { NgModule } from '@angular/core';

import { MaterialIcon } from './material-icon.directive';

@NgModule({
  exports: [MaterialIcon],
  declarations: [MaterialIcon],
})
export class MaterialIconModule { }

export * from './material-icon.directive';
