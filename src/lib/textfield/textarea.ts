import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { EventRegistry } from '@angular-mdc/web/common';
import { MdcTextField } from './text-field';

export const MDC_TEXTAREA_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcTextarea),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'mdc-textarea',
  exportAs: 'mdcTextarea',
  template: `
  <textarea #input class="mdc-text-field__input"
    type="text"
    [id]="id"
    [rows]="rows"
    [cols]="cols"
    [tabindex]="tabIndex"
    [attr.maxlength]="maxlength"
    [disabled]="disabled"
    [required]="required"
    (blur)="onBlur()"
    (input)="onInput($event.target.value)"></textarea>
    <mdc-floating-label [attr.for]="id">{{label}}</mdc-floating-label>
  `,
  providers: [
    MDC_TEXTAREA_CONTROL_VALUE_ACCESSOR,
    EventRegistry
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcTextarea extends MdcTextField {
  @Input() rows: number;
  @Input() cols: number;
  @HostBinding('class.mdc-text-field--textarea') isHostClass = true;
}
