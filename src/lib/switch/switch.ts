import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnChanges,
  Output,
  Provider,
  Renderer2,
  SimpleChange,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { toBoolean } from '../common';
import { MdcRipple } from '../core/ripple/ripple.service';

export const MD_SWITCH_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcSwitch),
  multi: true
};

let nextUniqueId = 0;

@Component({
  selector: 'mdc-switch',
  host: {
    '[id]': 'id',
  },
  template:
  `
  <input type="checkbox"
    #inputEl
    class="mdc-switch__native-control"
    [id]="inputId"
    [name]="name"
    [tabIndex]="tabIndex"
    [attr.aria-label]="ariaLabel"
    [attr.aria-labelledby]="ariaLabelledby"
    [disabled]="disabled"
    [checked]="checked"
    (change)="onChange($event)"/>
  <div class="mdc-switch__background">
    <div class="mdc-switch__knob"></div>
  </div>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [
    MD_SWITCH_CONTROL_VALUE_ACCESSOR,
    MdcRipple,
  ]
})
export class MdcSwitch implements OnChanges {
  private _uniqueId: string = `mdc-switch-${++nextUniqueId}`;
  private _controlValueAccessorChangeFn: (value: any) => void = (value) => { };
  onTouched: () => any = () => { };

  @Input() id: string = this._uniqueId;
  get inputId(): string { return `${this.id || this._uniqueId}-input`; }
  @Input() name: string | null = null;
  @Input() checked: boolean = false;
  @Input() disabled: boolean;
  @Input() tabIndex: number = 0;
  @Input('aria-label') ariaLabel: string = '';
  @Input('aria-labelledby') ariaLabelledby: string | null = null;
  @Input()
  get disableRipple(): boolean { return this.ripple.disabled; }
  set disableRipple(value: boolean) {
    this.ripple.disabled = toBoolean(value);
  }
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();
  @HostBinding('class.mdc-switch') isHostClass = true;
  @HostBinding('class.mdc-switch--disabled') get classDisabled(): string {
    return this.disabled ? 'mdc-switch--disabled' : '';
  }
  @ViewChild('inputEl') inputEl: ElementRef;

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    public ripple: MdcRipple) {
    this.ripple.init(true);
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    let change = changes['disabled'];

    if (change) {
      this.ripple.disabled = toBoolean(change.currentValue);
    }
  }

  onChange(evt: Event): void {
    evt.stopPropagation();
    this.checked = this.inputEl.nativeElement.checked;
    this._controlValueAccessorChangeFn((<any>evt.target).checked);
    this.change.emit(evt);
  }

  writeValue(value: string): void {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  focus(): void {
    this.inputEl.nativeElement.focus();
  }
}
