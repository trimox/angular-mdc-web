import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TextfieldComponent } from './textfield.component';
import { TextfieldHelptextDirective } from './textfield-helptext.directive';

const TEXTFIELD_COMPONENTS = [
  TextfieldComponent,
  TextfieldHelptextDirective
];

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: [TEXTFIELD_COMPONENTS],
  declarations: [TEXTFIELD_COMPONENTS],
})
export class TextfieldModule { }
