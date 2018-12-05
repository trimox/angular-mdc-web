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
    '[class.mdc-text-field--fullwidth]': 'fullwidth',
    '[class.mdc-text-field--invalid]': 'errorState'
  },
  template: `
  <textarea #input class="mdc-text-field__input"
    [id]="id"
    [rows]="rows"
    [cols]="cols"
    [tabindex]="tabIndex"
    [attr.aria-invalid]="errorState"
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
  <mdc-notched-outline [label]="label" [for]="id"></mdc-notched-outline>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcTextarea extends MdcTextField {
  @Input() rows?: number;
  @Input() cols?: number;
}
