import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  HostBinding,
  Provider,
  Renderer2,
  ViewEncapsulation,
  ViewChild,
  forwardRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { Ripple } from '.././ripple/ripple';

const MDC_SWITCH_STYLES = require('@material/switch/mdc-switch.scss');

export const MD_SWITCH_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitchComponent),
  multi: true
};

type UnlistenerMap = WeakMap<EventListener, Function>;

@Component({
  selector: 'mdc-switch',
  styles: [String(MDC_SWITCH_STYLES)],
  templateUrl: './switch.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MD_SWITCH_CONTROL_VALUE_ACCESSOR,
    Ripple
  ]
})
export class SwitchComponent {
  @Input() id: string;
  @Input() checked: boolean;
  @Input() labelId: string;
  @Input() disabled: boolean;
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();
  @HostBinding('class') className: string = 'mdc-switch';
  @HostBinding('class.mdc-switch--disabled') get classDisabled(): string {
    if (this.disabled) {
      this._renderer.setAttribute(this.nativeCb.nativeElement, 'disabled', '');
    } else {
      this._renderer.removeAttribute(this.nativeCb.nativeElement, 'disabled');
    }
    return this.disabled ? 'mdc-switch--disabled' : '';
  }
  @ViewChild('nativeCb') nativeCb: ElementRef;

  onTouched: () => any = () => { };

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => { };
  private _unlisteners: Map<string, UnlistenerMap> = new Map<string, UnlistenerMap>();

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef, private _ripple: Ripple) {
  }

  handleChange(evt: Event) {
    evt.stopPropagation();
    this._controlValueAccessorChangeFn((<any>evt.target).checked);
    this.change.emit(evt);
  }

  writeValue(value: string) {
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