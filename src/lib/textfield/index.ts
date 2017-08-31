import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdcTextfieldInputDirective } from './textfield-input.directive';
import {
  MdcTextfieldComponent,
  MdcTextfieldHelptextDirective,
  MdcTextfieldLabelDirective,
} from './textfield.component';
import {
  MdcTextfieldBoxComponent,
  MdcTextfieldBottomLineDirective,
} from './textfield-box.component';
import { MdcTextareaComponent } from './textarea.component';

const TEXTFIELD_COMPONENTS = [
  MdcTextfieldInputDirective,
  MdcTextfieldHelptextDirective,
  MdcTextfieldLabelDirective,
  MdcTextfieldComponent,
  MdcTextfieldBottomLineDirective,
  MdcTextareaComponent,
  MdcTextfieldBoxComponent,
];

@NgModule({
  imports: [FormsModule, CommonModule],
  exports: [TEXTFIELD_COMPONENTS],
  declarations: [TEXTFIELD_COMPONENTS],
})
export class MdcTextfieldModule { }

export * from './textfield.component';
export * from './textfield-input.directive';
export * from './textfield-box.component';
export * from './textarea.component';
