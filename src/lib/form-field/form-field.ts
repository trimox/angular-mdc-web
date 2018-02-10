import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { EventRegistry, toBoolean } from '@angular-mdc/web/common';

import { MdcCheckbox } from '@angular-mdc/web/checkbox';
import { MdcRadio } from '@angular-mdc/web/radio';
import { MdcSwitch } from '@angular-mdc/web/switch';

import { MDCFormFieldAdapter } from '@material/form-field/adapter';
import { MDCFormFieldFoundation } from '@material/form-field';

@Component({
  selector: 'mdc-form-field',
  template: '<ng-content></ng-content>',
  providers: [EventRegistry],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  exportAs: 'mdcFormField'
})
export class MdcFormField implements AfterContentInit, OnDestroy {
  private _alignEnd: boolean = false;

  @Input()
  get alignEnd(): boolean { return this._alignEnd; }
  set alignEnd(value: boolean) {
    this._alignEnd = toBoolean(value);
  }
  @HostBinding('class.mdc-form-field') isHostClass = true;
  @HostBinding('class.mdc-form-field--align-end') get classAlignEnd(): string {
    return this.alignEnd ? 'mdc-form-field--align-end' : '';
  }
  @ContentChild(MdcCheckbox) inputCheckbox: MdcCheckbox;
  @ContentChild(MdcRadio) inputRadio: MdcRadio;
  @ContentChild(MdcSwitch) inputSwitch: MdcSwitch;

  private _mdcAdapter: MDCFormFieldAdapter = {
    registerInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen(type, handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten(type, handler);
    },
    activateInputRipple: () => {
      if (this.inputCheckbox) {
        if (!this.inputCheckbox.disabled) {
          this.inputCheckbox.ripple.activate();
        }
      } else if (this.inputRadio) {
        if (!this.inputRadio.disabled) {
          this.inputRadio.ripple.activate();
        }
      }
    },
    deactivateInputRipple: () => {
      if (this.inputCheckbox) {
        this.inputCheckbox.ripple.deactivate();
      } else if (this.inputRadio) {
        this.inputRadio.ripple.deactivate();
      }
    }
  };

  private _foundation: {
    init(): void,
    destroy(): void
  } = new MDCFormFieldFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterContentInit(): void {
    this._foundation.init();

    if (this.inputCheckbox) {
      const checkBoxLabel = this._renderer.nextSibling(this.inputCheckbox.elementRef.nativeElement);
      if (checkBoxLabel && checkBoxLabel.nextSibling) {
        if (checkBoxLabel.nextSibling.tagName === 'LABEL') {
          this._renderer.setAttribute(checkBoxLabel.nextSibling, 'for', this.inputCheckbox.inputId);
        }
      }
    } else if (this.inputRadio) {
      const radioLabel = this._renderer.nextSibling(this.inputRadio.elementRef.nativeElement);
      if (radioLabel && radioLabel.nextSibling) {
        if (radioLabel.nextSibling.tagName === 'LABEL') {
          this._renderer.setAttribute(radioLabel.nextSibling, 'for', this.inputRadio.inputId);
        }
      }
    } else if (this.inputSwitch) {
      const switchLabel = this._renderer.nextSibling(this.inputSwitch.elementRef.nativeElement);
      if (switchLabel && switchLabel.nextSibling) {
        if (switchLabel.nextSibling.tagName === 'LABEL') {
          this._renderer.setAttribute(switchLabel.nextSibling, 'for', this.inputSwitch.inputId);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }
}
