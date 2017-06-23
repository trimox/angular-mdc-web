import {
  Directive,
  Input,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[mdc-toolbar-title], mdc-toolbar-title'
})
export class ToolbarTitleDirective {
  @Input() id: string;
  @HostBinding('class.mdc-toolbar__title') className: string = 'mdc-toolbar__title';
}