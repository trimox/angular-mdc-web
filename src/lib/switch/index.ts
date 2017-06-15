import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SwitchComponent } from './switch.component';

@NgModule({
  imports: [FormsModule],
  exports: [SwitchComponent],
  declarations: [SwitchComponent],
})
export class SwitchModule { }