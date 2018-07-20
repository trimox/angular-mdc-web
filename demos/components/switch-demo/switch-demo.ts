import { Component, Renderer2 } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, NgForm, Validators } from '@angular/forms';

import { MdcSwitch } from '@angular-mdc/web';

@Component({
  selector: 'switch-demo',
  templateUrl: './switch-demo.html'
})
export class SwitchDemo {
  constructor(private _renderer: Renderer2) { }

  isSwitchOn: boolean = true;

  alternateColors(input: MdcSwitch) {
    const demoInput = 'demo-switch--custom';

    input.elementRef.nativeElement.classList.contains(demoInput) ?
      this._renderer.removeClass(input.elementRef.nativeElement, demoInput)
      : this._renderer.addClass(input.elementRef.nativeElement, demoInput);
  }

  onChange(evt: Event): void {
    console.log(evt);
  }
}
