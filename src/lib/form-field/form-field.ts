import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { MDCFormFieldAdapter } from './form-field-adapter';

const { MDCFormFieldFoundation } = require('@material/form-field');
const MDC_FORM_FIELD_STYLES = require('@material/form-field/mdc-form-field.scss');

type UnlistenerMap = WeakMap<EventListener, Function>;

@Component({
  selector: 'mdc-form-field',
  styles: [String(MDC_FORM_FIELD_STYLES)],
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class FormFieldComponent implements AfterViewInit, OnDestroy {
  @Input() alignEnd: boolean = false;
  @HostBinding('class') get className(): string {
    return `mdc-form-field${this.alignEnd ? ' mdc-form-field--align-end' : ''}`;
  }

  private _unlisteners: Map<string, UnlistenerMap> = new Map<string, UnlistenerMap>();

  private _mdcAdapter: MDCFormFieldAdapter = {
    registerInteractionHandler: (type: string, handler: EventListener) => {
      if (this._root) {
        this.listen_(type, handler);
      }
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this.unlisten_(type, handler);
    },
    activateInputRipple: () => { }, /* TODO */
    deactivateInputRipple: () => { } /* TODO */
  }

  private _foundation: { init: Function, destroy: Function } = new MDCFormFieldFoundation(this._mdcAdapter);

  constructor(private _renderer: Renderer2, private _root: ElementRef) { }

  ngAfterViewInit() {
    this._foundation.init();
  }
  ngOnDestroy() {
    this._foundation.destroy();
  }

  listen_(type: string, listener: EventListener, ref: ElementRef = this._root) {
    if (!this._unlisteners.has(type)) {
      this._unlisteners.set(type, new WeakMap<EventListener, Function>());
    }
    const unlistener = this._renderer.listen(ref.nativeElement, type, listener);
    this._unlisteners.get(type).set(listener, unlistener);
  }

  unlisten_(type: string, listener: EventListener) {
    if (!this._unlisteners.has(type)) {
      return;
    }
    const unlisteners = this._unlisteners.get(type);
    if (!unlisteners.has(listener)) {
      return;
    }
    unlisteners.get(listener)();
    unlisteners.delete(listener);
  }
}