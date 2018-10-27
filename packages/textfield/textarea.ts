import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { MdcTextField } from './text-field';

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
    [value]="value"
    (mousedown)="onInputInteraction($event)"
    (touchstart)="onInputInteraction($event)"
    (focus)="onFocus()"
    (change)="onChange($event)"
    (blur)="onBlur()"></textarea>
    <label mdcFloatingLabel [for]="id">{{label}}</label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcTextarea extends MdcTextField {
  @Input() rows: number;
  @Input() cols: number;
}
