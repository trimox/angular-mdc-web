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

import { MdcCheckbox } from '../checkbox/checkbox';
import { MdcRadio } from '../radio/radio';
import { MdcSwitch } from '../switch/switch';

import { MDCFormFieldAdapter } from './adapter';
import { MDCFormFieldFoundation } from '@material/form-field';

@Directive({
  selector: 'mdc-form-field',
  providers: [EventRegistry],
})
export class MdcFormField implements AfterContentInit, OnDestroy {
  @Input() alignEnd: boolean = false;
  @HostBinding('class') get className(): string {
    return `mdc-form-field${this.alignEnd ? ' mdc-form-field--align-end' : ''}`;
  }
  @ContentChild(MdcCheckbox) inputCheckbox: MdcCheckbox;
  @ContentChild(MdcRadio) inputRadio: MdcRadio;
  @ContentChild(MdcSwitch) inputSwitch: MdcSwitch;

  private _mdcAdapter: MDCFormFieldAdapter = {
    registerInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen(this._renderer, type, handler, this.elementRef.nativeElement);
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
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterContentInit(): void {
    this._foundation.init();

    if (this.inputCheckbox) {
      let checkBoxLabel = this._renderer.nextSibling(this.inputCheckbox.elementRef.nativeElement);
      if (checkBoxLabel && checkBoxLabel.nextSibling) {
        if (checkBoxLabel.nextSibling.tagName === 'LABEL') {
          this._renderer.setAttribute(checkBoxLabel.nextSibling, 'for', this.inputCheckbox.inputId);
        }
      }
    } else if (this.inputRadio) {
      let radioLabel = this._renderer.nextSibling(this.inputRadio.elementRef.nativeElement);
      if (radioLabel && radioLabel.nextSibling) {
        if (radioLabel.nextSibling.tagName === 'LABEL') {
          this._renderer.setAttribute(radioLabel.nextSibling, 'for', this.inputRadio.inputId);
        }
      }
    } else if (this.inputSwitch) {
      let switchLabel = this._renderer.nextSibling(this.inputSwitch.elementRef.nativeElement);
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
