import {
  Directive,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[mdc-switch-label]'
})
export class SwitchLabelDirective {
  @Input() id: string;
  @HostBinding('class') className: string = 'mdc-switch-label';
}