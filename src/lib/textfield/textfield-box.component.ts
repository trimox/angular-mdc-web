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
import { MdcRipple } from '../ripple/ripple.directive';
import { MdcTextfieldComponent } from './textfield.component';

export const MD_TEXTFIELD_BOX_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcTextfieldBoxComponent),
  multi: true
};

@Directive({
  selector: '[mdc-textfield-bottom-line], mdc-textfield-bottom-line'
})
export class MdcTextfieldBottomLineDirective {
  @HostBinding('class.mdc-textfield__bottom-line') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: 'mdc-textfield-box',
  template:
  `
  <input mdc-textfield-input
    [type]="type"
    [id]="id"
    [tabindex]="tabindex"
    [attr.maxlength]="maxlength"
    [disabled]="disabled"
    [required]="required"
    (blur)="onBlur()"
    (input)="onInput($event)"
    (focus)="onFocus()" />
  <mdc-textfield-label [attr.for]="id">{{label}}</mdc-textfield-label>
  <mdc-textfield-bottom-line></mdc-textfield-bottom-line>
  `,
  providers: [
    MD_TEXTFIELD_BOX_CONTROL_VALUE_ACCESSOR,
    MdcRipple,
  ]
})
export class MdcTextfieldBoxComponent extends MdcTextfieldComponent {
  @HostBinding('class.mdc-textfield--box') isHostClass = true;

  constructor(
    @Inject(Renderer2) _renderer: Renderer2,
    @Inject(ElementRef) _root: ElementRef,
    @Inject(EventRegistry) _registry: EventRegistry,
    private _ripple: MdcRipple) {
    super(_renderer, _root, _registry);
    this._ripple.init();
  }
}
