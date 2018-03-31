import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';

import { MdcTextField } from '@angular-mdc/web';

@Component({
  selector: 'textfield-demo',
  templateUrl: './textfield-demo.html'
})
export class TextFieldDemo {
  demoForm: FormGroup;
  updateForm: FormGroup;
  username: string;
  prefilledText: string = 'Prefilled';

  @ViewChild('demoformInput') demoformInput: MdcTextField;

  constructor() {
    this.demoForm = new FormGroup({
      userName: new FormControl({ value: '', disabled: false }, Validators.required)
    });
  }

  submitForm() {
    console.log(this.demoForm)
    if (!this.demoForm.valid) {
      if (!this.demoformInput.valid) {
        this.demoformInput.setValid(false);
      }
      return;
    }

    this.demoformInput.setValid(true);
  }
}
