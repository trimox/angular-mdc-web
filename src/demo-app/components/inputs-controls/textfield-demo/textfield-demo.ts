import { Component, ViewChild, Renderer2 } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, NgForm, Validators } from '@angular/forms';

import { MdcTextField, MdcIcon } from '@angular-mdc/web';

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

  constructor(
    private _renderer: Renderer2) {

    this.demoForm = new FormGroup({
      userName: new FormControl({ value: '', disabled: false }, Validators.required)
    });
  }

  submitForm() {
    console.log(this.demoForm);

    if (!this.demoForm.valid) {
      if (!this.demoformInput.valid) {
        this.demoformInput.setValid(false);
      }
      return;
    }

    this.demoformInput.setValid(true);
  }

  submitWeightForm(f: NgForm) {
    console.log(f.value);
  }

  resetUserModel() {
    this.username = '';
  }

  resetWeightModel(f: NgForm) {
    f.reset();
  }

  alternateColors(input: MdcTextField) {
    if (!input.isTextarea()) {
      const demoTextField = 'demo-text-field-custom-colors';

      input.hasClass(demoTextField) ?
        this._renderer.removeClass(input.elementRef.nativeElement, demoTextField)
        : this._renderer.addClass(input.elementRef.nativeElement, demoTextField);
    } else if (input.isTextarea()) {
      const demoTextarea = 'demo-textarea';

      input.hasClass(demoTextarea) ?
        this._renderer.removeClass(input.elementRef.nativeElement, demoTextarea)
        : this._renderer.addClass(input.elementRef.nativeElement, demoTextarea);
    } else {
      const demoFullwidth = 'demo-fullwidth-input';

      input.hasClass(demoFullwidth) ?
        this._renderer.removeClass(input.elementRef.nativeElement, demoFullwidth)
        : this._renderer.addClass(input.elementRef.nativeElement, demoFullwidth);
    }
  }

  changeOutlinedIcon(textField: MdcTextField, icon?: MdcIcon) {
    icon ? icon.setIcon('face') : textField.setIconContent('cake');
  }
}
