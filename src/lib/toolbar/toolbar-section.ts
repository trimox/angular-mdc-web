import {
  Component,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'mdc-toolbar-section',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class ToolbarSectionComponent {
  @Input() alignStart: boolean;
  @Input() alignEnd: boolean;
  @Input() shrinkToFit: boolean;
  @HostBinding('class') className: string = 'mdc-toolbar__section';
  @HostBinding('class.mdc-toolbar__section--align-start') get classAlignStart(): string {
    return this.alignStart ? 'mdc-toolbar__section--align-start' : '';
  }
  @HostBinding('class.mdc-toolbar__section--align-end') get classAlignEnd(): string {
    return this.alignEnd ? 'mdc-toolbar__section--align-end' : '';
  }
  @HostBinding('class.mdc-toolbar__section--shrink-to-fit') get classShrinkToFit(): string {
    return this.shrinkToFit ? 'mdc-toolbar__section--shrink-to-fit' : '';
  }
}