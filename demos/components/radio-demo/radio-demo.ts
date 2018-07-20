import { Component, Renderer2 } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, NgForm, Validators } from '@angular/forms';

import { MdcRadio, MdcRadioChange } from '@angular-mdc/web';

@Component({
  selector: 'radio-demo',
  templateUrl: './radio-demo.html'
})
export class RadioDemo {
  favoriteFruit: string;

  constructor(private _renderer: Renderer2) { }

  alternateColors(input: MdcRadio) {
    const demoInput = 'demo-radio--custom';

    input.elementRef.nativeElement.classList.contains(demoInput) ?
      this._renderer.removeClass(input.elementRef.nativeElement, demoInput)
      : this._renderer.addClass(input.elementRef.nativeElement, demoInput);
  }

  onChange(evt: MdcRadioChange): void {
    console.log(evt);

    this.favoriteFruit = evt.checked ? evt.value : null;
  }

  resetModel(f: NgForm): void {
    f.reset();
  }
}
