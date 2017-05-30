import {
  Component,
  HostBinding,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'mdc-toolbar-row',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class ToolbarRowComponent {
  @HostBinding('class') className: string = 'mdc-toolbar__row';
}