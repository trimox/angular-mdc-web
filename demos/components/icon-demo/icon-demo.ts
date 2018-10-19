import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MdcIcon, MdcIconRegistry } from '@angular-mdc/web';

@Component({
  templateUrl: './icon-demo.html'
})
export class IconDemo {
  constructor(iconRegistry: MdcIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'thumbup', sanitizer.bypassSecurityTrustResourceUrl('/assets/thumbup-icon.svg'));
  }

  alternateColors(icon: MdcIcon) {
    const demoIcon = 'demo-icon-custom-colors';

    icon.elementRef.nativeElement.classList.contains(demoIcon) ?
      icon.elementRef.nativeElement.classList.remove(demoIcon)
      : icon.elementRef.nativeElement.classList.add(demoIcon);
  }
}
