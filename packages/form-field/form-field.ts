import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';

import { MdcFormFieldControl } from './form-field-control';
import { MDCFormFieldFoundation } from '@material/form-field/index';

@Component({
  moduleId: module.id,
  selector: 'mdc-form-field',
  exportAs: 'mdcFormField',
  host: {
    'class': 'mdc-form-field',
    '[class.mdc-form-field--align-end]': 'alignEnd'
  },
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

  @ContentChild(MdcFormFieldControl) input: MdcFormFieldControl<any>;

  createAdapter() {
    return {
      registerInteractionHandler: (type: string, handler: EventListener) => this._label.addEventListener(type, handler),
      deregisterInteractionHandler: (type: string, handler: EventListener) => this._label.removeEventListener(type, handler),
      activateInputRipple: () => {
        if (this.input && this.input.ripple) {
          this.input.ripple.activateRipple();
        }
      },
      deactivateInputRipple: () => {
        if (this.input && this.input.ripple) {
          this.input.ripple.deactivateRipple();
        }
      }
    };
  }

  private _foundation: {
    init(): void,
    destroy(): void
  };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>) { }

  ngAfterContentInit(): void {
    if (this.input) {
      const formControl = this.input.elementRef.nativeElement;

      if (formControl.nextElementSibling) {
        if (formControl.nextElementSibling.tagName === 'LABEL') {
          this._label = formControl.nextElementSibling;

          this._label.setAttribute('for', this.input.inputId);

          this._foundation = new MDCFormFieldFoundation(this.createAdapter());
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
}
