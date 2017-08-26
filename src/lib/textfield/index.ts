import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TextfieldInputDirective } from './textfield-input.directive';
import {
  TextfieldComponent,
  TextfieldHelptextDirective,
  TextfieldLabelDirective,
} from './textfield.component';
import {
  TextfieldBoxComponent,
  TextfieldBottomLineDirective,
} from './textfield-box.component';
import { TextareaComponent } from './textarea.component';

const TEXTFIELD_COMPONENTS = [
  TextfieldInputDirective,
  TextfieldHelptextDirective,
  TextfieldLabelDirective,
  TextfieldComponent,
  TextfieldBottomLineDirective,
  TextareaComponent,
  TextfieldBoxComponent,
];

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: [TEXTFIELD_COMPONENTS],
  declarations: [TEXTFIELD_COMPONENTS],
})
export class TextfieldModule { }

export * from './textfield.component';
export * from './textfield-input.directive';
export * from './textfield-box.component';
export * from './textarea.component';
