import {
  Directive,
  Input,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[mdc-toolbar-fixed-adjust], mdc-toolbar-fixed-adjust'
})
export class ToolbarFixedAdjustDirective {
  @Input() id: string;
  @HostBinding('class.mdc-toolbar-fixed-adjust') className: string = 'mdc-toolbar-fixed-adjust';
}