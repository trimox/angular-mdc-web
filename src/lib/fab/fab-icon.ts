import { Directive, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[mdc-fab-icon]'
})
export class FabIconDirective {
  @Input() id: string;
  @HostBinding('class') className: string = 'mdc-fab__icon';
}