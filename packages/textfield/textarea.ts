import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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
  host: {
    'class': 'mdc-text-field',
    '[class.mdc-text-field--textarea]': 'true',
    '[class.mdc-text-field--dense]': 'dense',
  },
  template: `
  <textarea #input class="mdc-text-field__input"
    [id]="id"
    [rows]="rows"
    [cols]="cols"
    [tabindex]="tabIndex"
    [attr.maxlength]="maxlength"
    [attr.minlength]="minlength"
    [disabled]="disabled"
    [required]="required"
    (mousedown)="onInputInteraction($event)"
    (touchstart)="onInputInteraction($event)"
    (focus)="onFocus()"
    (input)="onInput($event.target.value)"
    (change)="onChange($event)"
    (blur)="onBlur()"></textarea>
    <label mdcFloatingLabel [for]="id">{{label}}</label>
  `,
  providers: [MDC_TEXTAREA_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcTextarea extends MdcTextField {
  @Input() rows: number;
  @Input() cols: number;
}
