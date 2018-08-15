import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { toBoolean } from '@angular-mdc/web/common';

@Component({
  moduleId: module.id,
  selector: '[mdcListDivider], mdc-list-divider',
  exportAs: 'mdcListDivider',
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
  private _inset: boolean;

  @Input()
  get padded(): boolean { return this._padded; }
  set padded(value: boolean) {
    this._padded = toBoolean(value);
  }
  private _padded: boolean;

  @HostBinding('class.mdc-list-divider') isHostClass = true;
  @HostBinding('attr.role') role: string = 'seperator';

  @HostBinding('class.mdc-list-divider--inset') get classInset(): string {
    return this.inset ? 'mdc-list-divider--inset' : '';
  }
  @HostBinding('class.mdc-list-divider--padded') get classPadded(): string {
    return this.padded ? 'mdc-list-divider--padded' : '';
  }

  constructor(public elementRef: ElementRef) { }
}
