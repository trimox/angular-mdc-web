import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {merge, Observable, Subject, Subscription} from 'rxjs';
import {startWith, takeUntil} from 'rxjs/operators';

import {MDCComponent} from '@angular-mdc/web/base';

import {
  MdcChipInteractionEvent,
  MdcChipNavigationEvent,
  MdcChipSelectionEvent,
  MdcChipRemovalEvent
} from './chip-config';
import {
  MdcChip,
  MDC_CHIPSET_PARENT_COMPONENT
} from './chip';

import {MDCChipSetFoundation, MDCChipSetAdapter} from '@material/chips';

export class MdcChipSetChange {
  constructor(
    public source: MdcChipSet,
    public value: any) {}
}

@Component({
  selector: 'mdc-chip-set',
  exportAs: 'mdcChipSet',
  host: {
    'role': 'grid',
    'class': 'mdc-chip-set',
    '[class.mdc-chip-set--choice]': 'choice',
    '[class.mdc-chip-set--filter]': 'filter',
    '[class.mdc-chip-set--input]': 'input'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: MDC_CHIPSET_PARENT_COMPONENT, useExisting: MdcChipSet}]
})
export class MdcChipSet extends MDCComponent<MDCChipSetFoundation>
  implements AfterContentInit, OnDestroy, ControlValueAccessor {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  /**
  * Indicates that the chips in the set are choice chips, which allow a single selection from a set of options.
  */
  @Input()
  get choice(): boolean {
    return this._choice;
  }
  set choice(value: boolean) {
    this._choice = coerceBooleanProperty(value);
  }
  private _choice = false;

  /**
  * Indicates that the chips in the set are filter chips, which allow multiple selection from a set of options.
  */
  @Input()
  get filter(): boolean {
    return this._filter;
  }
  set filter(value: boolean) {
    this._filter = coerceBooleanProperty(value);
  }
  private _filter = false;

  /**
  * Indicates that the chips in the set are input chips, which enable user input by converting text into chips.
  */
  @Input()
  get input(): boolean {
    return this._input;
  }
  set input(value: boolean) {
    this._input = coerceBooleanProperty(value);
  }
  private _input = false;

  @Input()
  get value(): string | string[] | undefined {
    return this._value;
  }
  set value(value: string | string[] | undefined) {
    this._value = value;
    this.writeValue(value);
  }
  private _value?: string | string[];

  /**
   * A function to compare the option values with the selected values. The first argument
   * is a value from an option. The second is a value from the selection. A boolean
   * should be returned.
   */
  private _compareWith = (o1: any, o2: any) => o1 === o2;

  @Output() readonly change: EventEmitter<MdcChipSetChange> =
    new EventEmitter<MdcChipSetChange>();

  @Output() readonly interaction: EventEmitter<MdcChipInteractionEvent> =
    new EventEmitter<MdcChipInteractionEvent>();

  @ContentChildren(MdcChip, {descendants: true}) chips!: QueryList<MdcChip>;

  /** Function when touched */
  _onTouched = () => {};

  /** Function when changed */
  _onChange: (value: any) => void = () => {};

  /** Subscription to selection events in chips. */
  private _chipSelectionSubscription: Subscription | null = null;

  /** Subscription to removal changes. */
  private _chipRemovalSubscription: Subscription | null = null;

  /** Subscription to interaction events in chips. */
  private _chipInteractionSubscription: Subscription | null = null;

  /** Subscription to navigation events. */
  private _navigationSubscription: Subscription | null = null;

  /** Combined stream of all of the chip selection events. */
  get chipSelections(): Observable<MdcChipSelectionEvent> {
    return merge(...this.chips.map(chip => chip.selectionChange));
  }

  /** Combined stream of all of the chip interaction events. */
  get chipInteractions(): Observable<MdcChipInteractionEvent> {
    return merge(...this.chips.map(chip => chip.interactionEvent));
  }

  /** Combined stream of all of the chip removal events. */
  get chipRemovalChanges(): Observable<MdcChipRemovalEvent> {
    return merge(...this.chips.map(chip => chip.removalEvent));
  }

  /** Combined stream of all of the chip navigation events. */
  get chipNavigations(): Observable<MdcChipNavigationEvent> {
    return merge(...this.chips.map(chip => chip.navigationEvent));
  }

  getDefaultFoundation() {
    const adapter: MDCChipSetAdapter = {
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      focusChipPrimaryActionAtIndex: (index: number) => this.chips.toArray()[index].focusPrimaryAction(),
      focusChipTrailingActionAtIndex: (index: number) => this.chips.toArray()[index].focusTrailingAction(),
      getChipListCount: () => this.chips.length,
      getIndexOfChipById: (chipId: string) => this._findChipIndex(chipId),
      removeChipAtIndex: (index: number) => {
        if (index >= 0 && index < this.chips.length) {
          this.chips.toArray()[index].destroy();
          this.chips.toArray()[index].remove();
          this.chips.toArray().splice(index, 1);
        }
      },
      removeFocusFromChipAtIndex: (index: number) => this.chips.toArray()[index].removeFocus(),
      selectChipAtIndex: (index: number, selected: boolean, shouldNotifyClients: boolean) => {
        if (index >= 0 && index < this.chips.length) {
          this.chips.toArray()[index].setSelectedFromChipSet(selected, shouldNotifyClients);
        }
      },
      announceMessage: () => {},
      isRTL: () => typeof window !== 'undefined' ?
        window.getComputedStyle(this._getHostElement()).getPropertyValue('direction') === 'rtl' : false
    };
    return new MDCChipSetFoundation(adapter);
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Optional() public ngControl: NgControl) {
    super(elementRef);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngAfterContentInit(): void {
    // When chips change, re-subscribe
    this.chips.changes.pipe(startWith(null), takeUntil(this._destroyed))
      .subscribe(() => {
        this._resetChipSet();
        if (this.chips.length >= 0) {
          this._initializeSelection();
        }
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();

    this._dropSubscriptions();
    this._chipRemovalSubscription?.unsubscribe();
    this._foundation?.destroy();
  }

  // Implemented as part of ControlValueAccessor.
  writeValue(value: any): void {
    this.selectByValue(value, true);
  }

  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  getSelectedChipIds(): ReadonlyArray<string> {
    return this._foundation.getSelectedChipIds();
  }

  select(chipId: string): void {
    this._foundation.select(chipId);
  }

  selectByValue(value: string | string[] | undefined, shouldIgnore = true): void {
    if (!this.chips) {
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(currentValue => this._selectValue(currentValue, shouldIgnore));
    } else {
      this._selectValue(value, shouldIgnore);
    }
    this._value = value;
  }

  /**
   * Finds and selects the chip based on its value.
   * @returns Chip that has the corresponding value.
   */
  private _selectValue(value: any, shouldIgnore = true): MdcChip | undefined {
    const correspondingChip = this.chips.find(chip =>
      chip.value != null && this._compareWith(chip.value, value));
    if (correspondingChip) {
      if (this.choice) {
        this.select(correspondingChip.id);
      } else {
        correspondingChip.setSelectedFromChipSet(true, shouldIgnore);
      }
    }
    return correspondingChip;
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      if (this.ngControl || this._value) {
        this.selectByValue(this.ngControl?.value ?? this._value, false);
      }
    });
  }

  private _propagateChanges(evt: MdcChipSelectionEvent): void {
    this._value = evt.value;
    this.change.emit(new MdcChipSetChange(this, evt));
    this._onChange(this._value);
    this._changeDetectorRef.markForCheck();
  }

  private _findChipIndex(chipId: string): number {
    return this.chips.toArray().findIndex(_ => _.id === chipId);
  }

  private _resetChipSet(): void {
    this._dropSubscriptions();
    this._listenToChipEvents();
  }

  private _dropSubscriptions(): void {
    this._chipSelectionSubscription?.unsubscribe();
    this._chipInteractionSubscription?.unsubscribe();
    this._chipRemovalSubscription?.unsubscribe();
    this._navigationSubscription?.unsubscribe();
  }

  /** Listens to selected events on each chip. */
  private _listenToChipEvents(): void {
    this._chipSelectionSubscription = this.chipSelections
      .subscribe((event: MdcChipSelectionEvent) => {
        this._foundation.handleChipSelection(event);
        this._propagateChanges(event);
      });

    this._chipInteractionSubscription = this.chipInteractions
      .subscribe((event: MdcChipInteractionEvent) => {
        this._foundation.handleChipInteraction(event);
        this.interaction.emit(event);
      });

    this._chipRemovalSubscription = this.chipRemovalChanges
      .subscribe((event: MdcChipRemovalEvent) =>
        this._foundation.handleChipRemoval(event));

    this._navigationSubscription = this.chipNavigations
      .subscribe((event: MdcChipNavigationEvent) =>
        this._foundation.handleChipNavigation(event));
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
