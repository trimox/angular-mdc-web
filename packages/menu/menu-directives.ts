import {
  Directive,
  ElementRef
} from '@angular/core';

@Directive({
  selector: '[mdcMenuSelectionGroup], mdc-menu-selection-group',
  host: {'class': 'mdc-menu__selection-group'},
  exportAs: 'mdcMenuSelectionGroup'
})
export class MdcMenuSelectionGroup {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Directive({
  selector: '[mdcMenuSelectionGroupIcon], mdc-menu-selection-group-icon',
  host: {'class': 'mdc-menu__selection-group-icon'},
  exportAs: 'mdcMenuSelectionGroupIcon'
})
export class MdcMenuSelectionGroupIcon {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
