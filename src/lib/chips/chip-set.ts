import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { defer, merge, Observable, Subject } from 'rxjs';
import { startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { toBoolean, EventRegistry } from '@angular-mdc/web/common';

import { MdcChip, MdcChipIcon, MdcChipText, MdcChipSelectionEvent } from './chip';

import { MDCChipSetAdapter } from '@material/chips/chip-set/adapter';
import { MDCChipSetFoundation } from '@material/chips/chip-set';

@Component({
  moduleId: module.id,
  selector: 'mdc-chip-set',
  exportAs: 'mdcChipSet',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EventRegistry]
})
export class MdcChipSet implements AfterContentInit, OnInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

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

  /** Combined stream of all of the chip change events. */
  readonly chipSelectionChanges: Observable<MdcChipSelectionEvent> = defer(() => {
    if (this.chips) {
      return merge(...this.chips.map(chip => chip.selectionChange));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.chipSelectionChanges));
  });

  private _mdcAdapter: MDCChipSetAdapter = {
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    registerInteractionHandler: (evtType: string, handler: EventListener) =>
      this._registry.listen(evtType, handler, this._getHostElement()),
    deregisterInteractionHandler: (evtType: string, handler: EventListener) => this._registry.unlisten(evtType, handler),
    removeChip: (chip: MdcChip) => {
      const index = this.chips.toArray().indexOf(chip);
      this.chips.toArray().splice(index, 1);
    }
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    select(chipFoundation: any): void,
    deselect(chipFoundation: any): void
  } = new MDCChipSetFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _ngZone: NgZone,
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterContentInit(): void {
    this.chipSelectionChanges.pipe(
      takeUntil(merge(this._destroy, this.chips.changes))
    ).subscribe(event => {
      if (!this.filter) {
        this.chips.forEach(chip => {
          if (chip.selected && chip !== event.source) {
            chip.setSelected(!chip.selected);
          }
        });
      }

      if (this.choice || this.filter) {
        event.source.setSelected(!event.source.selected);
      }
    });

    this.chips.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      Promise.resolve().then(() => {
        this.chips.forEach(chip => {
          chip.filter = this.filter;
        });
      });
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
    this._foundation.destroy();
  }

  ngOnInit(): void {
    this._foundation.init();
  }

  setChoice(choice: boolean): void {
    this._choice = choice;
    this._changeDetectorRef.markForCheck();
  }

  setFilter(filter: boolean): void {
    this._filter = filter;
    this._changeDetectorRef.markForCheck();
  }

  setInput(input: boolean): void {
    this._input = input;
    this._changeDetectorRef.markForCheck();
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
