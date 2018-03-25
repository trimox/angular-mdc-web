import {
  AfterContentInit,
  ChangeDetectionStrategy,
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
import { defer } from 'rxjs/observable/defer';
import { merge } from 'rxjs/observable/merge';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { Subject } from 'rxjs/Subject';
import { switchMap } from 'rxjs/operators/switchMap';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { toBoolean, EventRegistry } from '@angular-mdc/web/common';

import { MdcChip, MdcChipSelectionEvent } from './chip';
import { MDCChipSetAdapter } from '@material/chips/chip-set/adapter';
import { MDCChipSetFoundation } from '@material/chips';

@Component({
  moduleId: module.id,
  selector: 'mdc-chip-set',
  exportAs: 'mdcChipSet',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
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
    this._choice = toBoolean(value);
  }
  protected _choice: boolean = false;

  /**
  * Indicates that the chips in the set are filter chips, which allow multiple selection from a set of options.
  */
  @Input()
  get filter(): boolean { return this._filter; }
  set filter(value: boolean) {
    this._filter = toBoolean(value);
  }
  protected _filter: boolean = false;

  @HostBinding('class.mdc-chip-set') isHostClass = true;
  @HostBinding('class.mdc-chip-set--choice') get classChoice(): string {
    return this._choice ? 'mdc-chip-set--choice' : '';
  }
  @HostBinding('class.mdc-chip-set--filter') get classFilter(): string {
    return this._filter ? 'mdc-chip-set--filter' : '';
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
    deregisterInteractionHandler: (evtType: string, handler: EventListener) =>
      this._registry.unlisten(evtType, handler),
  };

  private _foundation: {
    init(): void,
    destroy(): void
  } = new MDCChipSetFoundation(this._mdcAdapter);

  constructor(
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
            chip.toggleSelected();
          }
        });
      }
      if (this.choice || this.filter) {
        event.source.toggleSelected();
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

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
