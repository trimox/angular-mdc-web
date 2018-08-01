import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';

import { toBoolean } from './boolean-property';
import { ENTER, SPACE } from './keycodes';

let nextUniqueId = 0;

/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 */
export interface MdcOptionParentComponent {
  disableRipple?: boolean;
  multiple?: boolean;
}

/**
 * Injection token used to provide the parent component to options.
 */
export const MDC_OPTION_PARENT_COMPONENT =
  new InjectionToken<MdcOptionParentComponent>('MDC_OPTION_PARENT_COMPONENT');

export class MdcOptionSelectionChange {
  constructor(
    public source: MdcOption,
    public isUserInput = false) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-option',
  exportAs: 'mdcOption',
  template: `<ng-content></ng-content>`,
  host: {
    'role': 'option',
    '[id]': 'id',
    '[attr.tabindex]': '_getTabIndex()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '(click)': 'selectViaInteraction()',
    '(keydown)': 'handleKeydown($event)'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcOption implements AfterViewChecked, OnDestroy {
  /** Emits when the state of the option changes and any parents have to be notified. */
  readonly _stateChanges = new Subject<void>();

  private _selected = false;
  private _id: string = `mdc-option-${++nextUniqueId}`;
  private _mostRecentViewValue = '';

  /** The unique ID of the option. */
  get id(): string { return this._id; }

  /** Whether or not the option is currently selected. */
  get selected(): boolean { return this._selected; }

  /** Whether the wrapping component is in multiple selection mode. */
  get multiple() { return this._parent && this._parent.multiple; }

  @Input() value: any;

  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
  }
  private _disabled = false;

  /** Selects the option. */
  select(): void {
    if (!this._selected) {
      this._selected = true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }

  /** Deselects the option. */
  deselect(): void {
    if (this._selected) {
      this._selected = false;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent();
    }
  }

  /** Sets focus onto this option. */
  focus(): void {
    const element = this._getHostElement();

    if (typeof element.focus === 'function') {
      element.focus();
    }
  }

  /** Returns the correct tabindex for the option depending on disabled state. */
  _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }

  _getDisabled(): any {
    return this.disabled ? 'disabled' : '';
  }

  /** Ensures the option is selected when activated from the keyboard. */
  handleKeydown(event: KeyboardEvent): void {
    if (event.keyCode === ENTER || event.keyCode === SPACE) {
      this.selectViaInteraction();

      // Prevent the page from scrolling down and form submits.
      event.preventDefault();
    }
  }

  /**
   * `Selects the option while indicating the selection came from the user. Used to
   * determine if the select's view -> model callback should be invoked.`
   */
  selectViaInteraction(): void {
    if (!this.disabled) {
      this._selected = this.multiple ? !this._selected : true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent(true);
    }
  }

  @Output() readonly selectionChange = new EventEmitter<MdcOptionSelectionChange>();

  /** Gets the label to be used when determining whether the option should be focused. */
  getLabel(): string {
    return this.viewValue;
  }

  get viewValue(): string {
    return (this._getHostElement().textContent || '').trim();
  }

  constructor(
    public elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() @Inject(MDC_OPTION_PARENT_COMPONENT) private _parent: MdcOptionParentComponent) { }

  ngAfterViewChecked() {
    // Since parent components could be using the option's label to display the selected values
    // (e.g. `mdc-select`) and they don't have a way of knowing if the option's label has changed
    // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
    // relatively cheap, however we still limit them only to selected options in order to avoid
    // hitting the DOM too often.
    if (this._selected) {
      const viewValue = this.viewValue;

      if (viewValue !== this._mostRecentViewValue) {
        this._mostRecentViewValue = viewValue;
        this._stateChanges.next();
      }
    }
  }

  ngOnDestroy() {
    this._stateChanges.complete();
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(isUserInput = false): void {
    this.selectionChange.emit(new MdcOptionSelectionChange(this, isUserInput));
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
