import {
  AfterViewInit,
  Component,
  Directive,
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
import { EventRegistry } from '../common/event-registry';
import { toBoolean } from '../common/boolean-property';

import { MDCTextfieldAdapter } from './textfield-adapter';
import { MDCTextfieldFoundation } from '@material/textfield';

export const MD_TEXTFIELD_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextfieldComponent),
  multi: true
};

let nextElId_ = 0;

@Directive({
  selector: '[mdc-textfield-helptext]'
})
export class TextfieldHelptextDirective {
  @Input() id: string;
  @Input() persistent: boolean;
  @Input() validation: boolean;
  @HostBinding('class.mdc-textfield-helptext') isHostClass = true;
  @HostBinding('class.mdc-textfield-helptext--persistent') get classPersistent(): string {
    return this.persistent ? 'mdc-textfield-helptext--persistent' : '';
  }
  @HostBinding('class.mdc-textfield-helptext--validation-msg') get classValidation(): string {
    return this.validation ? 'mdc-textfield-helptext--validation-msg' : '';
  }

  constructor(public elementRef: ElementRef) { }
}

@Component({
  selector: 'mdc-textfield',
  template:
  `
  <textarea *ngIf="multiline"
    #input
    [rows]="rows"
    [cols]="cols"
    class="mdc-textfield__input"
    type="text"
    [attr.name]="name"
    [id]="inputId"
    [placeholder]="placeholder ? placeholder : ''"
    [tabindex]="tabindex"
    [maxlength]="maxlength"
    [attr.aria-label]="placeholder"
    (focus)="onFocus($event)"
    (blur)="onBlur($event)"
    (input)="onInput($event)"
    (keydown)="onKeyDown($event)"
    [(ngModel)]="value"
    [disabled]="disabled"
    [required]="required"></textarea>
  <input *ngIf="!multiline"
    #input
    class="mdc-textfield__input"
    [type]="type"
    [id]="id"
    [attr.name]="name"
    [(ngModel)]="value"
    [placeholder]="placeholder ? placeholder : ''"
    [tabindex]="tabindex"
    [maxlength]="maxlength"
    [disabled]="disabled"
    [required]="required"
    (focus)="onFocus($event)"
    (keydown)="onKeyDown($event)"
    (blur)="onBlur($event)"
    (input)="onInput($event)" />
  <label #inputlabel [attr.for]="id" class="mdc-textfield__label" *ngIf="!placeholder">{{label}}</label>
`,
  encapsulation: ViewEncapsulation.None,
  providers: [
    MD_TEXTFIELD_CONTROL_VALUE_ACCESSOR
  ],
})
export class TextfieldComponent implements AfterViewInit, OnDestroy {
  @Input() id: string = `mdc-textfield-${++nextElId_}`;
  get inputId(): string {
    return `input-${this.id}`;
  }
  @Input() name: string;
  @Input() type: string = 'text';
  @Input() value: string;
  @Input()
  get disabled() { return this._foundation.isDisabled(); }
  set disabled(value) {
    if (this.inputEl) {
      this._foundation.setDisabled(value);
    }
  }
  @Input() dense: boolean;
  @Input() required: boolean;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() tabindex: number;
  @Input() rows: number;
  @Input() cols: number;
  @Input() maxlength: number;
  @Input() fullwidth: boolean;
  @Input() multiline: boolean;
  @Output() focus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() input: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() keydown: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
  @HostBinding('class.mdc-textfield') isHostClass = true;
  @HostBinding('class.mdc-textfield--multiline') get classMultiline(): string {
    return this.multiline ? 'mdc-textfield--multiline' : '';
  }
  @HostBinding('class.mdc-textfield--fullwidth') get classFullwidth(): string {
    return this.fullwidth ? 'mdc-textfield--fullwidth' : '';
  }
  @HostBinding('class.mdc-textfield--dense') get classDense(): string {
    return this.dense ? 'mdc-textfield--dense' : '';
  }
  @ViewChild('input') public inputEl: ElementRef;
  @ViewChild('inputlabel') public inputLabel: ElementRef;
  @ViewChild(TextfieldHelptextDirective) helpText: TextfieldHelptextDirective;

  onTouched: () => any = () => { };

  private _controlValueAccessorChangeFn: (value: any) => void = (value) => { };

  private _mdcAdapter: MDCTextfieldAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this._root.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this._root.nativeElement, className);
    },
    addClassToLabel: (className: string) => {
      if (this.inputLabel) {
        if (this.label && !this.fullwidth) {
          this._renderer.addClass(this.inputLabel.nativeElement, className);
        }
      }
    },
    removeClassFromLabel: (className: string) => {
      if (this.inputLabel) {
        if (this.label && !this.fullwidth) {
          this._renderer.removeClass(this.inputLabel.nativeElement, className);
        }
      }
    },
    addClassToHelptext: (className: string) => {
      if (this.helpText) {
        this._renderer.addClass(this.helpText, className);
      }
    },
    removeClassFromHelptext: (className: string) => {
      if (this.helpText) {
        this._renderer.removeClass(this.helpText, className);
      }
    },
    registerInputFocusHandler: (handler: EventListener) => {
      if (this.inputEl) {
        this._registry.listen_(this._renderer, 'focus', handler, this.inputEl);
      }
    },
    deregisterInputFocusHandler: (handler: EventListener) => {
      this._registry.unlisten_('focus', handler);
    },
    registerInputBlurHandler: (handler: EventListener) => {
      if (this.inputEl) {
        this._registry.listen_(this._renderer, 'blur', handler, this.inputEl);
      }
    },
    deregisterInputBlurHandler: (handler: EventListener) => {
      this._registry.unlisten_('blur', handler);
    },
    registerInputInputHandler: (handler: EventListener) => {
      if (this.inputEl) {
        this._registry.listen_(this._renderer, 'input', handler, this.inputEl);
      }
    },
    deregisterInputInputHandler: (handler: EventListener) => {
      this._registry.unlisten_('input', handler);
    },
    registerInputKeydownHandler: (handler: EventListener) => {
      if (this.inputEl) {
        this._registry.listen_(this._renderer, 'keydown', handler, this.inputEl);
      }
    },
    deregisterInputKeydownHandler: (handler: EventListener) => {
      this._registry.unlisten_('keydown', handler);
    },
    setHelptextAttr: (name: string, value: string) => {
      if (this.helpText) {
        this._renderer.setAttribute(this.helpText.elementRef.nativeElement, name, value);
      }
    },
    removeHelptextAttr: (name: string) => {
      if (this.helpText) {
        this._renderer.removeAttribute(this.helpText.elementRef.nativeElement, name);
      }
    },
    helptextHasClass: (className: string) => {
      return this.helpText ? this.helpText.elementRef.nativeElement.classList.contains(className) : false;
    },
    getNativeInput: () => {
      return this.inputEl ? this.inputEl.nativeElement : null;
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    isDisabled: Function,
    setDisabled: Function,
  } = new MDCTextfieldFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit() {
    this._foundation.init();
  }

  ngOnDestroy() {
    this._foundation.destroy();
  }

  onFocus(evt: FocusEvent) {
    this.focus.emit(evt);
  }

  onBlur(evt: FocusEvent) {
    this._controlValueAccessorChangeFn((<any>evt.target).value);
    this.blur.emit(evt);
  }

  onInput(evt: Event) {
    evt.stopPropagation();
    this._controlValueAccessorChangeFn((<any>evt.target).value);
    this.input.emit(evt);
  }

  onKeyDown(evt: KeyboardEvent) {
    evt.stopPropagation();
    this.keydown.emit(evt);
  }

  writeValue(value: string) {
    if (value) {
      this.value = value;
      this._mdcAdapter.addClass('mdc-textfield--upgraded');
      if (!this.fullwidth) {
        this._mdcAdapter.addClassToLabel('mdc-textfield__label--float-above');
      }
    }
  }

  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
