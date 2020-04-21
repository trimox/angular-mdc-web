import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ContentChildren,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  Provider,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Subscription} from 'rxjs';
import {startWith} from 'rxjs/operators';

import {MDCRippleFoundation, MDCRippleAdapter} from '@material/ripple';

import {MDCComponent} from '@angular-mdc/web/base';
import {MdcRipple, MDCRippleCapableSurface} from '@angular-mdc/web/ripple';
import {MdcIcon} from '@angular-mdc/web/icon';

import {MDCIconButtonToggleFoundation, MDCIconButtonToggleAdapter} from '@material/icon-button';

export const MDC_ICON_BUTTON_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MdcIconButton),
  multi: true
};

/** Change event object emitted by MdcIconButton. */
export class MdcIconButtonChange {
  constructor(
    public source: MdcIconButton,
    public value: any) {}
}

let nextUniqueId = 0;

@Directive({
  selector: '[mdcIconOn]',
  host: {'class': 'mdc-icon-button__icon--on'}
})
export class MdcIconOn {}

@Component({
  selector: '[mdc-icon-button], button[mdcIconButton], a[mdcIconButton]',
  exportAs: 'mdcIconButton',
  host: {
    '[id]': 'id',
    'class': 'mdc-icon-button',
    '[class.mdc-icon-button--on]': 'on',
    '[attr.aria-pressed]': '!!labelOn && !!labelOff ? undefined : "false"',
    '[attr.data-aria-label-on]': 'labelOn',
    '[attr.data-aria-label-off]': 'labelOff',
    '(click)': 'handleClick()'
  },
  template: `
  <mdc-icon *ngIf="icon">{{icon}}</mdc-icon>
  <ng-content></ng-content>`
  ,
  providers: [
    MDC_ICON_BUTTON_CONTROL_VALUE_ACCESSOR,
    MdcRipple
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcIconButton extends MDCComponent<MDCIconButtonToggleFoundation> implements
  AfterContentInit, AfterViewInit, ControlValueAccessor, OnDestroy, MDCRippleCapableSurface {
  private _uniqueId: string = `mdc-icon-button-${++nextUniqueId}`;

  _root!: Element;

  @Input() id: string = this._uniqueId;
  get inputId(): string {
    return `${this.id || this._uniqueId}`;
  }

  @Input() name: string | null = null;
  @Input() icon: string | null = null;

  /* Set aria label on state. */
  @Input() labelOn?: string = undefined;

  /* Set aria label off state. */
  @Input() labelOff?: string = undefined;

  @Input()
  get on(): boolean {
    return this._on;
  }
  set on(value: boolean) {
    this.setOn(value);
  }
  private _on: boolean = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this.setDisabled(value);
  }
  private _disabled: boolean = false;

  @Output() readonly change: EventEmitter<MdcIconButtonChange> =
    new EventEmitter<MdcIconButtonChange>();

  @ContentChildren(MdcIcon, {descendants: true}) icons!: QueryList<MdcIcon>;

  /** Subscription to changes in icons. */
  private _changeSubscription: Subscription | null = null;

  _onChange: (value: any) => void = () => {};
  _onTouched = () => {};

  getDefaultFoundation() {
    const adapter: MDCIconButtonToggleAdapter = {
      addClass: (className: string) => this._root.classList.add(className),
      removeClass: (className: string) => this._root.classList.remove(className),
      hasClass: (className: string) => this._root.classList.contains(className),
      getAttr: (attrName: string) => this._root.getAttribute(attrName),
      setAttr: (name: string, value: string) => this._root.setAttribute(name, value),
      notifyChange: (evtData: {isOn: boolean}) => {
        this.change.emit(new MdcIconButtonChange(this, evtData.isOn));
        this._onChange(this._foundation.isOn());
      }
    };
    return new MDCIconButtonToggleFoundation(adapter);
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>,
    public ripple: MdcRipple) {
    super(elementRef);

    this._root = this.elementRef.nativeElement;
    this.ripple = this._createRipple();
    this.ripple.init();
  }

  ngAfterViewInit(): void {
    this._foundation.init();
  }

  ngAfterContentInit(): void {
    this._foundation.toggle(this._on || this._foundation.isOn());
    this._changeDetectorRef.detectChanges();

    // When the icons change, re-subscribe
    this._changeSubscription = this.icons.changes.pipe(startWith(null)).subscribe(() => {
      this.icons.forEach((icon: MdcIcon) => {
        icon.elementRef.nativeElement.classList.add('mdc-icon-button__icon');
        icon.role = null;
      });
    });
  }

  ngOnDestroy(): void {
    this._changeSubscription?.unsubscribe();
    this.ripple?.destroy();
    this._foundation?.destroy();
  }

  writeValue(value: boolean): void {
    this._onChange(value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  toggle(isOn?: boolean): void {
    this.on = isOn ? coerceBooleanProperty(isOn) : !this.on;
    this._foundation.toggle(this.on);
  }

  setOn(on: boolean): void {
    this._on = coerceBooleanProperty(on);
    this._foundation.toggle(this.on);

    this._changeDetectorRef.markForCheck();
  }

  /** Sets the button disabled state */
  setDisabled(disabled: boolean): void {
    this._disabled = coerceBooleanProperty(disabled);
    this.disabled ? this._root.setAttribute('disabled', '') : this._root.removeAttribute('disabled');
    this._changeDetectorRef.markForCheck();
  }

  handleClick(): void {
    if (this.icons.length === 1) {
      return;
    }

    this.on = !this.on;
    this._foundation.handleClick();
  }

  private _createRipple(): MdcRipple {
    const adapter: MDCRippleAdapter = {
      ...MdcRipple.createAdapter(this),
      isUnbounded: () => true
    };
    return new MdcRipple(this.elementRef, new MDCRippleFoundation(adapter));
  }
}
