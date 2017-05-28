import {
  Directive,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[mdc-checkbox-label]'
})
export class CheckboxLabelDirective {
  @HostBinding('class') className: string = 'mdc-checkbox-label';
  @Input() id: string;
}