import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { MdcRadio, MdcRadioChange, MdcRadioGroup } from '@angular-mdc/web';

@Component({
  templateUrl: './radio-demo.html'
})
export class RadioDemo {
  favoriteFruit: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  alternateColors(input: MdcRadio) {
    const demoInput = 'demo-radio--custom';

    input.elementRef.nativeElement.classList.contains(demoInput) ?
      input.elementRef.nativeElement.classList.remove(demoInput)
      : input.elementRef.nativeElement.classList.add(demoInput);
  }
}
