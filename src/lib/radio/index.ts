import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RadioComponent } from './radio.component';

@NgModule({
  imports: [FormsModule],
  exports: [RadioComponent],
  declarations: [RadioComponent]
})
export class RadioModule { }