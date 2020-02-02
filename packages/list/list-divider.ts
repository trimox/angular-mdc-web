import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';

@Component({
  moduleId: module.id,
  selector: '[mdcListDivider], mdc-list-divider',
  exportAs: 'mdcListDivider',
  host: {
    'role': 'separator',
    'class': 'mdc-list-divider',
    '[class.mdc-list-divider--inset]': 'inset',
    '[class.mdc-list-divider--padded]': 'padded'
  },
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcListDivider {
  @Input()
  get inset(): boolean {
    return this._inset;
  }
  set inset(value: boolean) {
    this._inset = coerceBooleanProperty(value);
  }
  private _inset = false;

  @Input()
  get padded(): boolean {
    return this._padded;
  }
  set padded(value: boolean) {
    this._padded = coerceBooleanProperty(value);
  }
  private _padded = false;

  constructor(public elementRef: ElementRef) {}
}
