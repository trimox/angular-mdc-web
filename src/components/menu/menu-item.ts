import {
  Directive,
  ElementRef,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[mdc-menu-item]'
})
export class MenuItemDirective {
  id: string;
  @Input() label: string;
  @Input() icon: string;
  @Input() disabled: boolean;
  @HostBinding('class') className: string = 'mdc-list-item';

  constructor(public root: ElementRef) { }
}