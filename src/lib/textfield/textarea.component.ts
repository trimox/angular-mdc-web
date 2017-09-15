import {
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  Provider,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventRegistry } from '../common/event-registry';
import { MdcTextfieldComponent } from './textfield.component';

export const MD_TEXTAREA_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcTextareaComponent),
  multi: true
};

@Component({
  selector: 'mdc-textarea',
  template:
  `
  <textarea mdc-textfield-input
    type="text"
    [id]="id"
    [rows]="rows"
    [cols]="cols"
    [placeholder]="placeholder"
    [tabindex]="tabindex"
    [attr.maxlength]="maxlength"
    [disabled]="disabled"
    [required]="required"
    (blur)="onBlur()"
    (input)="onInput($event)"
    (focus)="onFocus()"></textarea>
    <mdc-textfield-label [attr.for]="id" *ngIf="label">{{label}}</mdc-textfield-label>
  `,
  providers: [
    MD_TEXTAREA_CONTROL_VALUE_ACCESSOR,
    EventRegistry
  ],
})
export class MdcTextareaComponent extends MdcTextfieldComponent {
  @Input() multiline: boolean;
  @Input() rows: number;
  @Input() cols: number;

  @HostBinding('class.mdc-textfield--multiline') get classMultiline(): string {
    return this.multiline ? 'mdc-textfield--multiline' : '';
  }

  constructor(
    @Inject(Renderer2) _renderer: Renderer2,
    @Inject(ElementRef) _root: ElementRef,
    @Inject(EventRegistry) _registry: EventRegistry) {
    super(_renderer, _root, _registry);
  }
}
