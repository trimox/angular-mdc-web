import {
  AfterViewInit,
  ContentChild,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { MDCFormFieldAdapter } from './form-field-adapter';
import { CheckboxComponent } from '.././checkbox/checkbox.component';

const { MDCFormField, MDCFormFieldFoundation } = require('@material/form-field');
const MDC_FORM_FIELD_STYLES = require('@material/form-field/mdc-form-field.scss');

@Component({
  selector: 'mdc-form-field',
  template: '<ng-content></ng-content>',
  styles: [String(MDC_FORM_FIELD_STYLES)],
})
export class FormFieldComponent implements AfterViewInit, OnDestroy {
  input: any;
  @Input() alignEnd: boolean = false;
  @HostBinding('class') get className(): string {
    return `mdc-form-field${this.alignEnd ? ' mdc-form-field--align-end' : ''}`;
  }

  private _mdcAdapter: MDCFormFieldAdapter = {
    registerInteractionHandler: (type: string, handler: EventListener) => {
      /* TODO */
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      /* TODO */
    },
    activateInputRipple: () => {
      /* TODO */
    },
    deactivateInputRipple: () => {
      /* TODO */
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function
  } = new MDCFormFieldFoundation(this._mdcAdapter);

  constructor(private _renderer: Renderer2, private _root: ElementRef) { }

  ngAfterViewInit() {
    this._foundation.init();
  }
  ngOnDestroy() {
    this._foundation.destroy();
  }
}