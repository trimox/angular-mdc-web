import { NgModule } from '@angular/core';

import { RadioComponent } from './radio.component';

@NgModule({
  exports: [RadioComponent],
  declarations: [RadioComponent]
})
export class RadioModule { }

export * from './radio.component';
