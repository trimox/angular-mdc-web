import { Component, Renderer2 } from '@angular/core';

import { MdcSwitch } from '@angular-mdc/web';

@Component({
  selector: 'switch-demo',
  templateUrl: './switch-demo.html'
})
export class SwitchDemo {
  constructor(private _renderer: Renderer2) { }

  isSwitchOn: boolean = true;

  alternateColors(input: MdcSwitch) {
    const demoSwitch = 'demo-switch--custom';

    input.elementRef.nativeElement.classList.contains(demoSwitch) ?
      this._renderer.removeClass(input.elementRef.nativeElement, demoSwitch)
      : this._renderer.addClass(input.elementRef.nativeElement, demoSwitch);
  }
}
