import {
  Directive,
  HostBinding
} from '@angular/core';

@Directive({
  selector: 'a[mdc-toolbar-icon], span[mdc-toolbar-icon], button[mdc-toolbar-icon]'
})
export class ToolbarIconDirective {
  @HostBinding('class.mdc-toolbar__icon') className: string = 'mdc-toolbar__icon';
}
