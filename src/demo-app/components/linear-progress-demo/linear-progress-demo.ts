import { Component, Renderer2 } from '@angular/core';

import { MdcLinearProgress } from '@angular-mdc/web';

@Component({
  selector: 'linear-progress-demo',
  templateUrl: './linear-progress-demo.html'
})
export class LinearProgressDemo {
  constructor(private _renderer: Renderer2) { }

  alternateColors(input: MdcLinearProgress) {
    const demoInput = 'demo-linear-progress--custom';

    input.elementRef.nativeElement.classList.contains(demoInput) ?
      this._renderer.removeClass(input.elementRef.nativeElement, demoInput)
      : this._renderer.addClass(input.elementRef.nativeElement, demoInput);
  }
}
