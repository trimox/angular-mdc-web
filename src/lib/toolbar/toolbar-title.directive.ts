import {
  Directive,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[mdc-toolbar-title], mdc-toolbar-title'
})
export class ToolbarTitleDirective {
  @HostBinding('class.mdc-toolbar__title') className: string = 'mdc-toolbar__title';
}