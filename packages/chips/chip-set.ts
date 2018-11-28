import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { toBoolean } from '@angular-mdc/web/common';

import {
  MdcChip,
  MdcChipInteractionEvent,
  MdcChipRemovedEvent,
  MdcChipSelectionEvent
} from './chip';

import { MDCChipSetFoundation } from '@material/chips/chip-set/index';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcChipSet implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  /**
  * Indicates that the chips in the set are choice chips, which allow a single selection from a set of options.
  */
  @Input()
  get choice(): boolean { return this._choice; }
  set choice(value: boolean) {
    this._choice = toBoolean(value);

    Promise.resolve().then(() => {
      this.chips.forEach((chip: MdcChip) => chip.choice = this._choice);
    });
  }
  private _choice: boolean = false;

  /**
  * Indicates that the chips in the set are filter chips, which allow multiple selection from a set of options.
  */
  @Input()
  get filter(): boolean { return this._filter; }
  set filter(value: boolean) {
    this._filter = toBoolean(value);

    Promise.resolve().then(() => {
      this.chips.forEach((chip: MdcChip) => chip.filter = this._filter);
    });
  }
  private _filter: boolean = false;

  /**
  * Indicates that the chips in the set are input chips, which enable user input by converting text into chips.
  */
  @Input()
  get input(): boolean { return this._input; }
  set input(value: boolean) {
    this._input = toBoolean(value);

    Promise.resolve().then(() => {
      this.chips.forEach((chip: MdcChip) => chip.removable = this._input);
    });
  }
  private _input: boolean = false;

  @Output() readonly change: EventEmitter<MdcChipSetChange> =
    new EventEmitter<MdcChipSetChange>();

  @ContentChildren(MdcChip, { descendants: true }) chips!: QueryList<MdcChip>;

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

  createAdapter() {
    return {
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
  }

  private _foundation: {
    init(): void,
    destroy(): void,
    getSelectedChipIds(): string[],
    select(chipId: string): void,
    handleChipInteraction(chipId: string): void,
    handleChipRemoval(chipId: string): void,
    handleChipSelection(chipId: string): void
  } = new MDCChipSetFoundation(this.createAdapter());

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _ngZone: NgZone,
    public elementRef: ElementRef<HTMLElement>) { }

  ngAfterContentInit(): void {
    this._foundation.init();

    // When chips change, re-subscribe
    this.chips.changes.pipe(startWith(null), takeUntil(this._destroyed))
      .subscribe(() => {
        if (this.chips.length > 0) {
          this._resetChipSet();
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

    this._foundation.destroy();
  }

  getSelectedChipIds(): string[] {
    return this._foundation.getSelectedChipIds();
  }

  select(chipId: string): void {
    this._foundation.select(chipId);
  }

  getChipById(chipId: string): MdcChip | undefined {
    return this.chips.find(_ => _.id === chipId);
  }

  private _resetChipSet() {
    this._dropSubscriptions();
    this._listenForChipSelection();
    this._listenToChipsInteraction();
    this._listenToChipsRemoved();
  }

  private _dropSubscriptions() {
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
        this._foundation.handleChipSelection(event.detail.chipId);
        this.change.emit(new MdcChipSetChange(this, event.detail));
      });
  }

  private _listenToChipsInteraction(): void {
    this._chipInteractionSubscription = this.chipInteractions
      .subscribe((event: MdcChipInteractionEvent) => this._foundation.handleChipInteraction(event.detail.chipId));
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
