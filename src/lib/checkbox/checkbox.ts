import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  Provider,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
  forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MDCCheckboxAdapter } from './checkbox-adapter';

import { Ripple } from '.././ripple/ripple';

const { MDCCheckboxFoundation } = require('@material/checkbox');
const MDC_CHECKBOX_STYLES = require('@material/checkbox/mdc-checkbox.scss');

export const MD_CHECKBOX_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true
};

type UnlistenerMap = WeakMap<EventListener, Function>;

@Component({
  selector: 'mdc-checkbox',
  templateUrl: './checkbox.html',
  styles: [String(MDC_CHECKBOX_STYLES)],
  encapsulation: ViewEncapsulation.None,
  providers: [
    MD_CHECKBOX_CONTROL_VALUE_ACCESSOR,
    Ripple
  ]
})
export class CheckboxComponent implements AfterViewInit, OnDestroy {
  @Input() checked: boolean = false;
  @Input() indeterminate: boolean = false;
  @Input() labelId: string;
  @Input() disabled: boolean;
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();
  @HostBinding('class') className: string = 'mdc-checkbox';
  @HostBinding('class.mdc-checkbox--disabled') get classDisabled(): string {
    if (this.disabled) {
      this._renderer.setAttribute(this.nativeCb.nativeElement, 'disabled', '');
    } else {
      this._renderer.removeAttribute(this.nativeCb.nativeElement, 'disabled');
    }
    return this.disabled ? 'mdc-checkbox--disabled' : '';
  }
  @ViewChild('nativeCb') nativeCb: ElementRef;

  onTouched: () => any = () => { };

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => { };
  private _unlisteners: Map<string, UnlistenerMap> = new Map<string, UnlistenerMap>();

  private _mdcAdapter: MDCCheckboxAdapter = {
    addClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.addClass(root.nativeElement, className);
    },
    removeClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.removeClass(root.nativeElement, className);
    },
    registerAnimationEndHandler: (handler: EventListener) => {
      if (this._root) {
        this.listen_('animationend', handler);
      }
    },
    deregisterAnimationEndHandler: (handler: EventListener) => {
      this.unlisten_('animationend', handler);
    },
    registerChangeHandler: (handler: EventListener) => {
      if (this._root) {
        this.listen_('change', handler, this.nativeCb);
      }
    },
    deregisterChangeHandler: (handler: EventListener) => {
      this.unlisten_('change', handler);
    },
    getNativeControl: () => {
      const { nativeCb } = this;
      if (!nativeCb) {
        throw new Error('Invalid state');
      }
      return nativeCb.nativeElement;
    },
    forceLayout: () => {
      if (this._root) {
        return this._root.nativeElement.offsetWidth;
      }
    },
    isAttachedToDOM: () => Boolean(this._root)
  };

  private _foundation: {
    init: Function,
    destroy: Function
  } = new MDCCheckboxFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef,
    private _ripple: Ripple) { }

  ngAfterViewInit() {
    this._foundation.init();
    this._ripple.unbounded = true;
  }
  ngOnDestroy() {
    this._foundation.destroy();
  }

  handleChange(evt: Event) {
    evt.stopPropagation();
    this._controlValueAccessorChangeFn((<any>evt.target).checked);
    this.change.emit(evt);
  }

  writeValue(value: any) {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
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