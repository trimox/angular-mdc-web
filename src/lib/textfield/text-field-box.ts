import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostBinding,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { EventRegistry } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcLineRipple } from '@angular-mdc/web/line-ripple';
import { MdcTextField } from './text-field';

export const MDC_TEXTFIELD_BOX_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcTextFieldBox),
  multi: true
};

/**
 * @deprecated
 * @deletion-target 0.34.0
 */
@Component({
  moduleId: module.id,
  selector: 'mdc-text-field-box',
  exportAs: 'mdcTextFieldBox',
  template: `
  <input #input class="mdc-text-field__input"
    [id]="id"
    [tabindex]="tabIndex"
    [attr.maxlength]="maxlength"
    [disabled]="disabled"
    [required]="required"
    (blur)="onBlur()"
    (input)="onInput($event.target.value)" />
  <mdc-floating-label [attr.for]="id">{{label}}</mdc-floating-label>
  <mdc-line-ripple></mdc-line-ripple>
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
export class MdcTextFieldBox extends MdcTextField implements AfterContentInit {
  renderer: Renderer2;

  constructor(
    _changeDetectorRef: ChangeDetectorRef,
    _renderer: Renderer2,
    elementRef: ElementRef,
    _registry: EventRegistry,
    _ripple: MdcRipple) {

    super(_changeDetectorRef, _renderer, elementRef, _ripple, _registry);

    this.renderer = _renderer;
  }

  ngAfterContentInit() {
    this.setBox(true);
  }
}
