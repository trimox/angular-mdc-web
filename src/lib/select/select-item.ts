import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { ENTER } from '@angular-mdc/web/cdk';
import { toBoolean, isSpaceKey } from '@angular-mdc/web/common';

/** Event object emitted by MdcSelectItem when selected or deselected. */
export class MdcOptionSelectionChange {
  constructor(
    /** Reference to the option that emitted the event. */
    public source: MdcSelectItem,
    /** Whether the change in the option's value was a result of a user action. */
    public isUserInput = false) { }
}

let uniqueIdCounter = 0;

@Component({
  moduleId: module.id,
  selector: 'mdc-select-item',
  template: '<ng-content></ng-content>',
  host: {
    '[id]': 'id',
    'role': 'option',
    '[attr.tabindex]': '_getTabIndex()',
    '(click)': '_selectViaInteraction()',
  },
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdcSelectItem {
  private _selected = false;
  private _disabled: boolean = false;
  private _id = `mdc-select-item-${uniqueIdCounter++}`;

  /** The unique ID of the option. */
  get id(): string { return this._id; }

  /** Whether or not the option is currently selected. */
  get selected(): boolean { return this._selected; }

  /** The displayed label of the option. */
  get label(): string {
    return (this.elementRef.nativeElement.textContent || '').trim();
  }

  /** The form value of the option. */
  @Input() value: any;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.tabIndex = value ? -1 : 0;
    this._changeDetectorRef.markForCheck();
  }

  /** Event emitted when the option is selected or deselected. */
  @Output() onSelectionChange: EventEmitter<MdcOptionSelectionChange> = new EventEmitter<MdcOptionSelectionChange>();

  @HostBinding('class.mdc-list-item') isHostClass = true;
  @HostBinding('tabindex') tabIndex: number = 0;
  @HostBinding('attr.aria-disabled') get ariaDisabled(): string {
    return this._disabled ? 'true' : '';
  }
  @HostListener('keydown', ['$event']) keydown($event) {
    this._onKeydown($event);
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  /** Selects the option. */
  select(): void {
    this._selected = true;
    this._changeDetectorRef.markForCheck();
    this._emitSelectionChangeEvent();
  }

  /** Deselects the option. */
  deselect(): void {
    this._selected = false;
    this._changeDetectorRef.markForCheck();
    this._emitSelectionChangeEvent();
  }

  focus(): void {
    this.elementRef.nativeElement.focus();
  }

  /**
     * Selects the option while indicating the selection came from the user. Used to
     * determine if the select's view -> model callback should be invoked.
     */
  _selectViaInteraction(): void {
    if (!this.disabled) {
      this._selected = true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent(true);
    }
  }

  /** Returns the correct tabindex for the option depending on disabled state. */
  private _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }

  _onKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    if (keyCode === ENTER || isSpaceKey(event)) {
      this._selectViaInteraction();

      // Prevent the page from scrolling down and form submits.
      event.preventDefault();
    }
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(isUserInput = false): void {
    this.onSelectionChange.emit({ source: this, isUserInput: isUserInput });
  }
}
