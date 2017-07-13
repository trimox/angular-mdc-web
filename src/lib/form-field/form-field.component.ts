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

import { MDCFormField, MDCFormFieldFoundation } from '@material/form-field';

@Component({
  selector: 'mdc-form-field',
  template: '<ng-content></ng-content>',
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