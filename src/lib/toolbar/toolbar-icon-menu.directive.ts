import {
  Directive,
  HostBinding
} from '@angular/core';

@Directive({
  selector: 'a[mdc-toolbar-icon-menu], span[mdc-toolbar-icon-menu], button[mdc-toolbar-icon-menu]'
})
export class ToolbarIconMenuDirective {
  @HostBinding('class.mdc-toolbar__icon--menu') className: string = 'mdc-toolbar__icon--menu';
}
