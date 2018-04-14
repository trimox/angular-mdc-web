import { Component, Renderer2 } from '@angular/core';

import { MdcIcon } from '@angular-mdc/web';

@Component({
  selector: 'icon-demo',
  templateUrl: './icon-demo.html'
})
export class IconDemo {
  constructor(private _renderer: Renderer2) { }

  alternateColors(icon: MdcIcon) {
    const demoIcon = 'demo-icon-custom-colors';

    icon.elementRef.nativeElement.classList.contains(demoIcon) ?
      this._renderer.removeClass(icon.elementRef.nativeElement, demoIcon)
      : this._renderer.addClass(icon.elementRef.nativeElement, demoIcon);
  }
}
