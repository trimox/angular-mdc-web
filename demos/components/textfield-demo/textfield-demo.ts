import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MdcTextField } from '@angular-mdc/web';

class Directions {
  dt: number;
}

@Component({
  templateUrl: './textfield-demo.html'
})
export class TextFieldDemo {
  demoForm = new FormGroup({
    username: new FormControl(
      { value: '', disabled: false }, [Validators.required])
  });

  waypoint = new Directions();

  updateForm: FormGroup;
  username: string;
  prefilledText: string = 'Prefilled';

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
}
