import { NgModule } from '@angular/core';

import {
  SelectComponent,
  SelectedText,
} from './select.component';

@NgModule({
  exports: [SelectComponent],
  declarations: [SelectComponent],
})
export class SelectModule { }

export * from './select.component';
