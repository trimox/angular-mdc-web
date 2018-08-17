import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';

import { MdcFormFieldControl } from './form-field-control';
import { MDCFormFieldAdapter } from '@material/form-field/adapter';
import { MDCFormFieldFoundation } from '@material/form-field';

@Component({
  moduleId: module.id,
  selector: 'mdc-form-field',
  exportAs: 'mdcFormField',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcFormField implements AfterContentInit, OnDestroy {
  private _label: HTMLElement;

  @Input()
  get alignEnd(): boolean { return this._alignEnd; }
  set alignEnd(value: boolean) {
    this._alignEnd = toBoolean(value);
  }
  private _alignEnd: boolean;

  @HostBinding('class.mdc-form-field') isHostClass = true;
  @HostBinding('class.mdc-form-field--align-end') get classAlignEnd(): string {
    return this.alignEnd ? 'mdc-form-field--align-end' : '';
  }

  @ContentChild(MdcFormFieldControl) input: MdcFormFieldControl<any>;

  private _mdcAdapter: MDCFormFieldAdapter = {
    registerInteractionHandler: (type: string, handler: EventListener) => this._label.addEventListener(type, handler),
    deregisterInteractionHandler: (type: string, handler: EventListener) => this._label.removeEventListener(type, handler),
    activateInputRipple: () => {
      if (this.input && this.input.ripple) {
        this.input.ripple.activate();
      }
    },
    deactivateInputRipple: () => {
      if (this.input && this.input.ripple) {
        this.input.ripple.deactivate();
      }
    }
  };

  private _foundation: {
    init(): void,
    destroy(): void
  };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) { }

  ngAfterContentInit(): void {
    if (this.input) {
      const formControl = this.input.elementRef.nativeElement;

      if (formControl.nextElementSibling) {
        if (formControl.nextElementSibling.tagName === 'LABEL') {
          this._label = formControl.nextElementSibling;

          this._label.setAttribute('for', this.input.inputId);

          this._foundation = new MDCFormFieldFoundation(this._mdcAdapter);
          this._foundation.init();
          this._changeDetectorRef.markForCheck();
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  setInput(input: any): void {
    if (this.input !== input) {
      this.input = input;

      this._changeDetectorRef.markForCheck();
    }
  }
}
