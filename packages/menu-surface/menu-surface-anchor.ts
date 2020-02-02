import {
  Directive,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[mdcMenuSurfaceAnchor], mdc-menu-surface-anchor',
  host: {'class': 'mdc-menu-surface--anchor'}
})
export class MdcMenuSurfaceAnchor {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
