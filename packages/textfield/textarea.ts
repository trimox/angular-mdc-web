import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {MdcCharacterCounter} from '@angular-mdc/web/form-field';
import {MdcTextField} from './text-field';

@Component({
  moduleId: module.id,
  selector: 'mdc-textarea',
  exportAs: 'mdcTextarea',
  host: {
    'class': 'mdc-text-field',
    '[class.mdc-text-field--textarea]': 'true',
    '[class.mdc-text-field--no-label]': '!label',
    '[class.mdc-text-field--fullwidth]': 'fullwidth',
    '[class.mdc-text-field--invalid]': 'errorState'
  },
  template: `
  <div mdcCharacterCounter *ngIf="characterCounter"></div>
  <textarea #inputElement class="mdc-text-field__input"
    [id]="id"
    [rows]="rows"
    [cols]="cols"
    [tabindex]="tabIndex"
    [attr.name]="name"
    [attr.aria-invalid]="errorState"
    [attr.maxlength]="maxlength"
    [attr.minlength]="minlength"
    [disabled]="disabled"
    [required]="required"
    [readonly]="readonly"
    (mousedown)="onInputInteraction($event)"
    (touchstart)="onInputInteraction($event)"
    (focus)="onFocus()"
    (input)="onInput($event)"
    (change)="onChange($event)"
    (blur)="onBlur()"></textarea>
  <mdc-notched-outline [label]="label" [for]="id"></mdc-notched-outline>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcTextarea extends MdcTextField {
  @Input() rows?: number;
  @Input() cols?: number;

  @ViewChild(MdcCharacterCounter, {static: false}) _characterCounterElement!: MdcCharacterCounter;

  protected characterCounterFoundation(): any {
    return this._characterCounterElement?.getDefaultFoundation() ?? undefined;
  }
}
