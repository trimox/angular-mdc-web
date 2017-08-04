import {
  Component,
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  Inject,
  Provider,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventRegistry } from '../common/event-registry';
import { Ripple } from '../ripple/ripple.directive';
import { TextfieldComponent, TextfieldLabelDirective } from './textfield.component';

export const MD_TEXTFIELDBOX_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextfieldBoxComponent),
  multi: true
};


@Component({
  selector: 'mdc-textfield-box',
  template:
  `
  <input #input class="mdc-textfield__input"
  [type]="type"
  [id]="id"
  [attr.name]="name"
  [(ngModel)]="value"
  [tabindex]="tabindex"
  [maxlength]="maxlength"
  [disabled]="disabled"
  [required]="required"
  (focus)="onFocus($event)"
  (keydown)="onKeyDown($event)"
  (blur)="onBlur($event)"
  (input)="onInput($event)" />
  <label #inputlabel [attr.for]="id" class="mdc-textfield__label">{{label}}</label>
  <div class="mdc-textfield__bottom-line"></div>
  `,
  providers: [
    MD_TEXTFIELDBOX_CONTROL_VALUE_ACCESSOR,
    Ripple,
  ]
})
export class TextfieldBoxComponent extends TextfieldComponent {
  @HostBinding('class.mdc-textfield--box') isHostClass = true;

  constructor(
    @Inject(Renderer2) _renderer: Renderer2,
    @Inject(ElementRef) _root: ElementRef,
    @Inject(EventRegistry) _registry: EventRegistry,
    private _ripple: Ripple) {
    super(_renderer, _root, _registry);
    this._ripple.init();
  }
}
