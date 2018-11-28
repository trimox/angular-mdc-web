import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { toBoolean } from '@angular-mdc/web/common';

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
  get inset(): boolean { return this._inset; }
  set inset(value: boolean) {
    this._inset = toBoolean(value);
  }
  private _inset: boolean = false;

  @Input()
  get padded(): boolean { return this._padded; }
  set padded(value: boolean) {
    this._padded = toBoolean(value);
  }
  private _padded: boolean = false;

  constructor(public elementRef: ElementRef) { }
}
