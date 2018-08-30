import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { defer, merge, Observable, Subject, Subscription } from 'rxjs';
import { startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { toBoolean } from '@angular-mdc/web/common';

import { MdcChip, MdcChipInteractionEvent } from './chip';

import { MDCChipSetAdapter } from '@material/chips/chip-set/adapter';
import { MDCChipSetFoundation } from '@material/chips/chip-set';

export class MdcChipSetChange {
  constructor(
    public source: MdcChipSet,
    public value: any) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-chip-set',
  exportAs: 'mdcChipSet',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcChipSet implements AfterContentInit, OnInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  /** Subscription to remove changes in chips. */
  private _chipRemoveSubscription: Subscription | null;

  /**
  * Indicates that the chips in the set are choice chips, which allow a single selection from a set of options.
  */
  @Input()
  get choice(): boolean { return this._choice; }
  set choice(value: boolean) {
    this.setChoice(value);
  }
  private _choice: boolean = false;

  /**
  * Indicates that the chips in the set are filter chips, which allow multiple selection from a set of options.
  */
  @Input()
  get filter(): boolean { return this._filter; }
  set filter(value: boolean) {
    this.setFilter(value);
  }
  private _filter: boolean = false;

  /**
  * Indicates that the chips in the set are input chips, which enable user input by converting text into chips.
  */
  @Input()
  get input(): boolean { return this._input; }
  set input(value: boolean) {
    this.setInput(value);
  }
  private _input: boolean = false;

  @Output() readonly change: EventEmitter<MdcChipSetChange> =
    new EventEmitter<MdcChipSetChange>();

  @HostBinding('class.mdc-chip-set') isHostClass = true;
  @HostBinding('class.mdc-chip-set--choice') get classChoice(): string {
    return this.choice ? 'mdc-chip-set--choice' : '';
  }
  @HostBinding('class.mdc-chip-set--filter') get classFilter(): string {
    return this.filter ? 'mdc-chip-set--filter' : '';
  }
  @HostBinding('class.mdc-chip-set--input') get classInput(): string {
    return this.input ? 'mdc-chip-set--input' : '';
  }

  @ContentChildren(MdcChip) chips: QueryList<MdcChip>;

  /** Combined stream of all of the child chips' remove change events. */
  get chipRemoveChanges(): Observable<MdcChipInteractionEvent> {
    return merge(...this.chips.map(chip => chip.removed));
  }

  /** Combined stream of all of the chip change events. */
  readonly chipSelectionChanges: Observable<MdcChipInteractionEvent> = defer(() => {
    if (this.chips) {
      return merge(...this.chips.map(chip => chip.selectionChange));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.chipSelectionChanges));
  });

  private _mdcAdapter: MDCChipSetAdapter = {
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    removeChip: (chipId: string) => {
      const index = this._findChipIndex(chipId);
      this.chips.toArray().splice(index, 1);
    },
    setSelected: (chipId: string, selected: boolean) => {
      const chip = this._findChip(chipId);
      if (chip) {
        chip.selected = selected;
      }
    }
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    getSelectedChipIds(): string[],
    toggleSelect(chipId: string): void,
    select(chipId: string): void,
    deselect(chipId: string): void
    handleChipInteraction(evt: any): void,
    handleChipRemoval(evt: any): void
  } = new MDCChipSetFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _ngZone: NgZone,
    public elementRef: ElementRef) { }

  ngAfterContentInit(): void {
    this.chipSelectionChanges
      .pipe(takeUntil(merge(this._destroy, this.chips.changes)))
      .subscribe((event: MdcChipInteractionEvent) => {
        this._foundation.handleChipInteraction(event);
        event.detail.chip.selected = !event.detail.chip.selected;

        this.change.emit(new MdcChipSetChange(this, event.detail.chip));
      });

    this._chipRemoveSubscription = this.chipRemoveChanges.subscribe((event: MdcChipInteractionEvent) => {
      this._foundation.handleChipRemoval(event);
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    if (this._chipRemoveSubscription) {
      this._chipRemoveSubscription.unsubscribe();
    }

    this._foundation.destroy();
  }

  ngOnInit(): void {
    this._foundation.init();
  }

  setChoice(choice: boolean): void {
    this._choice = toBoolean(choice);
    this._changeDetectorRef.markForCheck();
  }

  setFilter(filter: boolean): void {
    this._filter = toBoolean(filter);

    Promise.resolve().then(() => {
      this.chips.forEach((chip: MdcChip) => {
        chip.filter = this.filter;
      });
    });
    this._changeDetectorRef.markForCheck();
  }

  setInput(input: boolean): void {
    this._input = toBoolean(input);

    Promise.resolve().then(() => {
      this.chips.forEach((chip: MdcChip) => {
        chip.removable = true;
      });
    });
    this._changeDetectorRef.markForCheck();
  }

  getSelectedChipIds(): string[] {
    return this._foundation.getSelectedChipIds();
  }

  select(chipId: string): void {
    this._foundation.select(chipId);
  }

  deselect(chipId: string): void {
    this._foundation.deselect(chipId);
  }

  private _findChip(chipId: string): MdcChip | undefined {
    return this.chips.find((_) => _.id === chipId);
  }

  private _findChipIndex(chipId: string): number {
    return this.chips.toArray().findIndex((_) => _.id === chipId);
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
