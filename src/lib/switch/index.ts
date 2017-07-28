import { NgModule } from '@angular/core';

import { SwitchComponent } from './switch.component';

@NgModule({
  exports: [SwitchComponent],
  declarations: [SwitchComponent],
})
export class SwitchModule { }

export * from './switch.component';
