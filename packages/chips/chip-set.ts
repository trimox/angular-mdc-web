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
import {merge, Observable, Subject, Subscription} from 'rxjs';
import {startWith, takeUntil} from 'rxjs/operators';

import {MDCComponent} from '@angular-mdc/web/base';
import {toBoolean} from '@angular-mdc/web/common';

import {
  MdcChip,
  MdcChipInteractionEvent,
  MdcChipRemovedEvent,
  MdcChipSelectionEvent,
  MDC_CHIPSET_PARENT_COMPONENT
} from './chip';

import {MDCChipSetFoundation, MDCChipSetAdapter} from '@material/chips';

export class MdcChipSetChange {
  constructor(
    public source: MdcChipSet,
    public value: any) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-chip-set',
  exportAs: 'mdcChipSet',
  host: {
    'class': 'mdc-chip-set',
    '[class.mdc-chip-set--choice]': 'choice',
    '[class.mdc-chip-set--filter]': 'filter',
    '[class.mdc-chip-set--input]': 'input'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MDC_CHIPSET_PARENT_COMPONENT, useExisting: MdcChipSet }]
})
export class MdcChipSet extends MDCComponent<MDCChipSetFoundation>
  implements AfterContentInit, OnDestroy, ControlValueAccessor {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  /**
  * Indicates that the chips in the set are choice chips, which allow a single selection from a set of options.
  */
  @Input()
  get choice(): boolean { return this._choice; }
  set choice(value: boolean) {
    this._choice = toBoolean(value);
  }
  private _choice: boolean = false;

  /**
  * Indicates that the chips in the set are filter chips, which allow multiple selection from a set of options.
  */
  @Input()
  get filter(): boolean { return this._filter; }
  set filter(value: boolean) {
    this._filter = toBoolean(value);
  }
  private _filter: boolean = false;

  /**
  * Indicates that the chips in the set are input chips, which enable user input by converting text into chips.
  */
  @Input()
  get input(): boolean { return this._input; }
  set input(value: boolean) {
    this._input = toBoolean(value);
  }
  private _input: boolean = false;

  @Input()
  get value(): any { return this._value; }
  set value(value: any) {
    this.writeValue(value);
    this._value = value;
  }
  protected _value: any;

  /**
   * A function to compare the option values with the selected values. The first argument
   * is a value from an option. The second is a value from the selection. A boolean
   * should be returned.
   */
  private _compareWith = (o1: any, o2: any) => o1 === o2;

  @Output() readonly change: EventEmitter<MdcChipSetChange> =
    new EventEmitter<MdcChipSetChange>();

  @ContentChildren(MdcChip, { descendants: true }) chips!: QueryList<MdcChip>;

  /** Function when touched */
  _onTouched = () => { };

  /** Function when changed */
  _onChange: (value: any) => void = () => { };

  /** Subscription to selection events in chips. */
  private _chipSelectionSubscription: Subscription | null = null;

  /** Subscription to remove changes in chips. */
  private _chipRemoveSubscription: Subscription | null = null;

  /** Subscription to interaction events in chips. */
  private _chipInteractionSubscription: Subscription | null = null;

  /** Combined stream of all of the chip selection events. */
  get chipSelections(): Observable<MdcChipSelectionEvent> {
    return merge(...this.chips.map(chip => chip.selectionChange));
  }

  /** Combined stream of all of the chip interaction events. */
  get chipInteractions(): Observable<MdcChipInteractionEvent> {
    return merge(...this.chips.map(chip => chip.trailingIconInteraction));
  }

  /** Combined stream of all of the chip remove events. */
  get chipRemoveChanges(): Observable<MdcChipRemovedEvent> {
    return merge(...this.chips.map(chip => chip.removed));
  }

  getDefaultFoundation() {
    const adapter: MDCChipSetAdapter = {
      hasClass: (className: string) => this._getHostElement().classList.contains(className),
      removeChip: (chipId: string) => {
        const index = this._findChipIndex(chipId);
        this.chips.toArray().splice(index, 1);
      },
      setSelected: (chipId: string, selected: boolean) => {
        const chip = this.getChipById(chipId);
        if (chip) {
          chip.selected = selected;
        }
      }
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
        if (this.chips.length > 0) {
          this._resetChipSet();
          this._initializeSelection();
        }
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();

    this._dropSubscriptions();
    if (this._chipRemoveSubscription) {
      this._chipRemoveSubscription.unsubscribe();
    }
  }

  // Implemented as part of ControlValueAccessor.
  writeValue(value: any): void {
    if (this.chips) {
      this.selectByValue(value, false);
    }
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

  getChipById(chipId: string): MdcChip | undefined {
    return this.chips.find(_ => _.id === chipId);
  }

  selectByValue(value: any, isUserInput: boolean = true): void {
    this.chips.forEach(chip => chip.deselect());

    if (Array.isArray(value)) {
      value.forEach(currentValue => this._selectValue(currentValue, isUserInput));
    } else {
      this._selectValue(value, isUserInput);
    }
  }

  /**
   * Finds and selects the chip based on its value.
   * @returns Chip that has the corresponding value.
   */
  private _selectValue(value: any, isUserInput: boolean = true): MdcChip | undefined {
    const correspondingChip = this.chips.find(chip => {
      return chip.value != null && this._compareWith(chip.value, value);
    });

    if (correspondingChip) {
      isUserInput ? correspondingChip.selectViaInteraction() : correspondingChip.select();
    }

    return correspondingChip;
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      if (this.ngControl || this._value) {
        this.selectByValue(this.ngControl ? this.ngControl.value : this._value, false);
      }
    });
  }

  private _propagateChanges(evt: MdcChipSelectionEvent): void {
    this._value = evt.detail.value;
    this.change.emit(new MdcChipSetChange(this, evt.detail));
    this._onChange(this._value);
    this._changeDetectorRef.markForCheck();
  }

  private _resetChipSet(): void {
    this._dropSubscriptions();
    this._listenForChipSelection();
    this._listenToChipsInteraction();
    this._listenToChipsRemoved();
  }

  private _dropSubscriptions(): void {
    if (this._chipSelectionSubscription) {
      this._chipSelectionSubscription.unsubscribe();
      this._chipSelectionSubscription = null;
    }
    if (this._chipInteractionSubscription) {
      this._chipInteractionSubscription.unsubscribe();
      this._chipInteractionSubscription = null;
    }
    if (this._chipRemoveSubscription) {
      this._chipRemoveSubscription.unsubscribe();
      this._chipRemoveSubscription = null;
    }
  }

  /** Listens to selected events on each chip. */
  private _listenForChipSelection(): void {
    this._chipSelectionSubscription = this.chipSelections
      .subscribe((event: MdcChipSelectionEvent) => {
        this._foundation.handleChipSelection(event.detail.chipId, event.detail.selected);

        if (event.isUserInput) {
          this._propagateChanges(event);
        }
      });
  }

  private _listenToChipsInteraction(): void {
    this._chipInteractionSubscription = this.chipInteractions
      .subscribe((event: MdcChipInteractionEvent) =>
        this._foundation.handleChipInteraction(event.detail.chipId));
  }

  private _listenToChipsRemoved(): void {
    this._chipRemoveSubscription = this.chipRemoveChanges
      .subscribe((event: MdcChipRemovedEvent) => this._foundation.handleChipRemoval(event.detail.chipId));
  }

  private _findChipIndex(chipId: string): number {
    return this.chips.toArray().findIndex(_ => _.id === chipId);
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
