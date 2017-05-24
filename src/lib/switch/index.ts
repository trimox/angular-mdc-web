import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SwitchComponent } from './switch';
import { SwitchLabelDirective } from './switch-label';

const SWITCH_COMPONENTS = [
  SwitchComponent,
  SwitchLabelDirective
];

@NgModule({
  imports: [FormsModule],
  exports: [SWITCH_COMPONENTS],
  declarations: [SWITCH_COMPONENTS],
})
export class SwitchModule { }