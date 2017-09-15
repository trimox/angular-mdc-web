import {
  AfterContentInit,
  Directive,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { EventRegistry } from '../common/event-registry';

import { MdcCheckboxComponent } from '../checkbox/checkbox.component';
import { MdcRadioComponent } from '../radio/radio.component';
import { MdcSwitchComponent } from '../switch/switch.component';

import { MDCFormFieldAdapter } from './form-field-adapter';
import { MDCFormFieldFoundation } from '@material/form-field';

@Directive({
  selector: 'mdc-form-field',
  providers: [EventRegistry],
})
export class MdcFormFieldDirective implements AfterContentInit, OnDestroy {
  @Input() alignEnd: boolean = false;
  @HostBinding('class') get className(): string {
    return `mdc-form-field${this.alignEnd ? ' mdc-form-field--align-end' : ''}`;
  }
  @ContentChild(MdcCheckboxComponent) inputCheckbox: MdcCheckboxComponent;
  @ContentChild(MdcRadioComponent) inputRadio: MdcRadioComponent;
  @ContentChild(MdcSwitchComponent) inputSwitch: MdcSwitchComponent;

  private _mdcAdapter: MDCFormFieldAdapter = {
    registerInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen_(this._renderer, type, handler, this._root);
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten_(type, handler);
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
      } else if (this.inputSwitch) {
        if (!this.inputSwitch.disabled) {
          this.inputSwitch.ripple.activate();
        }
      }
    },
    deactivateInputRipple: () => {
      if (this.inputCheckbox) {
        this.inputCheckbox.ripple.deactivate();
      } else if (this.inputRadio) {
        this.inputRadio.ripple.deactivate();
      } else if (this.inputSwitch) {
        this.inputSwitch.ripple.deactivate();
      }
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function
  } = new MDCFormFieldFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterContentInit() {
    this._foundation.init();

    if (this.inputCheckbox) {
      let checkBoxLabel = this._renderer.nextSibling(this.inputCheckbox.root.nativeElement);
      if (checkBoxLabel && checkBoxLabel.nextSibling) {
        if (checkBoxLabel.nextSibling.tagName === 'LABEL') {
          this._renderer.setAttribute(checkBoxLabel.nextSibling, 'for', this.inputCheckbox.inputId);
        }
      }
    } else if (this.inputRadio) {
      let radioLabel = this._renderer.nextSibling(this.inputRadio.root.nativeElement);
      if (radioLabel && radioLabel.nextSibling) {
        if (radioLabel.nextSibling.tagName === 'LABEL') {
          this._renderer.setAttribute(radioLabel.nextSibling, 'for', this.inputRadio.inputId);
        }
      }
    } else if (this.inputSwitch) {
      let switchLabel = this._renderer.nextSibling(this.inputSwitch.root.nativeElement);
      if (switchLabel && switchLabel.nextSibling) {
        if (switchLabel.nextSibling.tagName === 'LABEL') {
          this._renderer.setAttribute(switchLabel.nextSibling, 'for', this.inputSwitch.inputId);
        }
      }
    }
  }

  ngOnDestroy() {
    this._foundation.destroy();
  }
}
