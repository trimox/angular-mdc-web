import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
  Provider,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { toBoolean } from '@angular-mdc/web/common';

export const MD_SWITCH_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcSwitch),
  multi: true
};

let nextUniqueId = 0;

@Component({
  moduleId: module.id,
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
  ],
  preserveWhitespaces: false,
})
export class MdcSwitch {
  private _uniqueId: string = `mdc-switch-${++nextUniqueId}`;
  private _disableRipple: boolean = false;

  @Input() id: string = this._uniqueId;
  @Input() name: string | null = null;
  @Input() checked: boolean = false;
  @Input() disabled: boolean;
  @Input() tabIndex: number = 0;
  @Output() change: EventEmitter<Event> = new EventEmitter<Event>();
  @HostBinding('class.mdc-switch') isHostClass = true;
  @ViewChild('inputEl') inputEl: ElementRef;

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => { };
  onTouched: () => any = () => { };

  get inputId(): string { return `${this.id || this._uniqueId}-input`; }
  @HostBinding('class.mdc-switch--disabled') get classDisabled(): string {
    return this.disabled ? 'mdc-switch--disabled' : '';
  }

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

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
