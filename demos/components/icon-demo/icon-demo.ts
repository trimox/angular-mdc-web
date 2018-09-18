import { Component } from '@angular/core';

import { MdcIcon } from '@angular-mdc/web';

@Component({
  templateUrl: './icon-demo.html'
})
export class IconDemo {
  alternateColors(icon: MdcIcon) {
    const demoIcon = 'demo-icon-custom-colors';

    icon.elementRef.nativeElement.classList.contains(demoIcon) ?
      icon.elementRef.nativeElement.classList.remove(demoIcon)
      : icon.elementRef.nativeElement.classList.add(demoIcon);
  }
}
