import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  TextfieldComponent,
  TextfieldHelptextDirective,
} from './textfield.component';
import { TextfieldBoxComponent } from './textfield-box.component';

const TEXTFIELD_COMPONENTS = [
  TextfieldComponent,
  TextfieldHelptextDirective,
  TextfieldBoxComponent,
];

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: [TEXTFIELD_COMPONENTS],
  declarations: [TEXTFIELD_COMPONENTS],
})
export class TextfieldModule { }

export * from './textfield.component';
export * from './textfield-box.component';
