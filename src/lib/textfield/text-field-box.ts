import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EventRegistry } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcTextField } from './text-field';

export const MDC_TEXTFIELD_BOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcTextFieldBox),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'mdc-text-field-box',
  template: `
  <input #input class="mdc-text-field__input"
    [type]="type"
    [id]="id"
    [tabindex]="tabIndex"
    [attr.maxlength]="maxlength"
    [disabled]="disabled"
    [required]="required"
    (blur)="onBlur()"
    (input)="onInput($event.target.value)" />
  <mdc-text-field-label [attr.for]="id">{{label}}</mdc-text-field-label>
  <mdc-text-field-bottom-line></mdc-text-field-bottom-line>
  <ng-content select="mdc-icon"></ng-content>
  `,
  providers: [
    MDC_TEXTFIELD_BOX_CONTROL_VALUE_ACCESSOR,
    MdcRipple,
    EventRegistry,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcTextFieldBox extends MdcTextField implements OnInit {
  renderer: Renderer2;

  @HostBinding('class.mdc-text-field--box') isHostClass = true;

  constructor(
    @Inject(ChangeDetectorRef) _changeDetectorRef: ChangeDetectorRef,
    @Inject(Renderer2) _renderer: Renderer2,
    @Inject(ElementRef) elementRef: ElementRef,
    @Inject(EventRegistry) _registry: EventRegistry,
    private _ripple: MdcRipple) {

    super(_changeDetectorRef, _renderer, elementRef, _registry);

    this._ripple.init();
    this.renderer = _renderer;
  }

  ngOnInit(): void {
    this.updateIconState();
  }

  hasLeadingIcon(): boolean {
    return this.inputIcon ? this.inputIcon.elementRef.nativeElement.hasAttribute('leading') : false;
  }

  hasTrailingIcon(): boolean {
    return this.inputIcon ? this.inputIcon.elementRef.nativeElement.hasAttribute('trailing') : false;
  }

  updateIconState(): void {
    if (this.hasLeadingIcon()) {
      this.renderer.addClass(this.elementRef.nativeElement, 'mdc-text-field--with-leading-icon');
    } else if (this.hasTrailingIcon()) {
      this.renderer.addClass(this.elementRef.nativeElement, 'mdc-text-field--with-trailing-icon');
    }
  }
}
