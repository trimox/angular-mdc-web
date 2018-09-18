import { Component, ViewChild, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { MdcTextField, MdcIcon } from '@angular-mdc/web';

@Component({
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
      return;
    }
  }

  submitWeightForm(f: NgForm) {
    console.log(f.value);
  }

  resetTextFieldValue(input: MdcTextField) {
    input.setValue(null);
  }

  resetWeightModel(f: NgForm) {
    f.reset();
  }

  alternateColors(input: MdcTextField) {
    if (!input.textarea) {
      const demoTextField = 'demo-text-field-custom-colors';

      input.elementRef.nativeElement.classList.contains(demoTextField) ?
        this._renderer.removeClass(input.elementRef.nativeElement, demoTextField)
        : this._renderer.addClass(input.elementRef.nativeElement, demoTextField);
    } else if (input.textarea) {
      const demoTextarea = 'demo-textarea';

      input.elementRef.nativeElement.classList.contains(demoTextarea) ?
        this._renderer.removeClass(input.elementRef.nativeElement, demoTextarea)
        : this._renderer.addClass(input.elementRef.nativeElement, demoTextarea);
    } else {
      const demoFullwidth = 'demo-fullwidth-input';

      input.elementRef.nativeElement.classList.contains(demoFullwidth) ?
        this._renderer.removeClass(input.elementRef.nativeElement, demoFullwidth)
        : this._renderer.addClass(input.elementRef.nativeElement, demoFullwidth);
    }
  }

  changeOutlinedIcon(textField: MdcTextField, icon?: MdcIcon) {
    icon ? icon.setIcon('face') : textField.leadingIcon.setIcon('cake');
  }
}
