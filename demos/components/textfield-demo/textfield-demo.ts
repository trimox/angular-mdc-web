import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { MdcTextField, MdcIcon } from '@angular-mdc/web';

@Component({
  templateUrl: './textfield-demo.html'
})
export class TextFieldDemo {
  demoForm = new FormGroup({
    userName: new FormControl(
      { value: '', disabled: false }, [Validators.required])
  });

  updateForm: FormGroup;
  username: string;
  prefilledText: string = 'Prefilled';

  submitForm() {
    if (!this.demoForm.valid) {
      return;
    }
  }

  submitWeightForm(f: NgForm) {
    if (!f.valid) {
      return;
    }
  }

  resetWeightModel(f: NgForm) {
    f.reset();
  }

  alternateColors(input: MdcTextField) {
    if (!input.textarea) {
      const demoTextField = 'demo-text-field-custom-colors';

      input.elementRef.nativeElement.classList.contains(demoTextField) ?
        input.elementRef.nativeElement.classList.remove(demoTextField)
        : input.elementRef.nativeElement.classList.add(demoTextField);
    } else if (input.textarea) {
      const demoTextarea = 'demo-textarea';

      input.elementRef.nativeElement.classList.contains(demoTextarea) ?
        input.elementRef.nativeElement.classList.remove(demoTextarea)
        : input.elementRef.nativeElement.classList.add(demoTextarea);
    } else {
      const demoFullwidth = 'demo-fullwidth-input';

      input.elementRef.nativeElement.classList.contains(demoFullwidth) ?
        input.elementRef.nativeElement.classList.remove(demoFullwidth)
        : input.elementRef.nativeElement.classList.add(demoFullwidth);
    }
  }

  changeOutlinedIcon(textField: MdcTextField, icon?: MdcIcon) {
    icon ? icon.setIcon('face') : textField.leadingIcon.setIcon('cake');
  }
}
