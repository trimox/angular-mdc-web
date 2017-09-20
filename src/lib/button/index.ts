import { NgModule } from '@angular/core';

import {
  MdcButtonComponent,
  MdcIconButton,
} from './button.component';

const BUTTON_COMPONENTS = [
  MdcButtonComponent,
  MdcIconButton
];

@NgModule({
  exports: [BUTTON_COMPONENTS],
  declarations: [BUTTON_COMPONENTS],
})
export class MdcButtonModule { }

export * from './button.component';
