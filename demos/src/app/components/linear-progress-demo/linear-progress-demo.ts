import { Component } from '@angular/core';

import { MdcLinearProgress } from '@angular-mdc/web';

@Component({
  templateUrl: './linear-progress-demo.html'
})
export class LinearProgressDemo {
  alternateColors(input: MdcLinearProgress) {
    const demoInput = 'demo-linear-progress--custom';

    input.elementRef.nativeElement.classList.contains(demoInput) ?
      input.elementRef.nativeElement.classList.remove(demoInput)
      : input.elementRef.nativeElement.classList.add(demoInput);
  }
}
