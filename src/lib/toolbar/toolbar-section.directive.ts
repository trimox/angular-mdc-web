import {
  Directive,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: 'mdc-toolbar-section'
})
export class ToolbarSectionDirective {
  @Input() alignStart: boolean;
  @Input() alignEnd: boolean;
  @Input() shrinkToFit: boolean;
  @HostBinding('class.mdc-toolbar__section') isHostClass = true;
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