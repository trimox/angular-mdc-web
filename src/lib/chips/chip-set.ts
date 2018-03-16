import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { startWith } from 'rxjs/operators/startWith';
import { merge } from 'rxjs/observable/merge';

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

  /** Subscription to interaction in chips. */
  private _chipInteractionSubscription: Subscription | null;

  /** Subscription to changes in the chip list. */
  private _changeSubscription: Subscription;

  /** Combined stream of all of the child chips' selection change events. */
  get chipSelectionChanges(): Observable<MdcChipSelectionEvent> {
    return merge(...this.chips.map(chip => chip.selectionChange));
  }

  private _mdcAdapter: MDCChipSetAdapter = {
    hasClass: (className: string) => {
      return this._getHostElement().classList.contains(className);
    },
    registerInteractionHandler: (evtType: string, handler: EventListener) =>
      this._registry.listen(evtType, handler, this._getHostElement()),
    deregisterInteractionHandler: (evtType: string, handler: EventListener) =>
      this._registry.unlisten(evtType, handler),
  };

  private _foundation: {
    init(): void,
    destroy(): void,
  } = new MDCChipSetFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterContentInit(): void {
    // When chips change, re-subscribe
    this._changeSubscription = this.chips.changes.pipe(startWith(null)).subscribe(() => {
      this._resetChips();
    });
  }

  ngOnInit(): void {
    this._foundation.init();
  }

  ngOnDestroy(): void {
    if (this._changeSubscription) {
      this._changeSubscription.unsubscribe();
    }

    this._dropSubscriptions();
    this._foundation.destroy();
  }

  private _resetChips(): void {
    this._chipInteractionSubscription = this.chipSelectionChanges.subscribe(event => {
      this.chips.forEach(chip => {
        if ((chip.selected && this.choice) || event.source === chip) {
          chip.toggleSelected();
        }
      });
    });
  }

  private _dropSubscriptions(): void {
    if (this._chipInteractionSubscription) {
      this._chipInteractionSubscription.unsubscribe();
      this._chipInteractionSubscription = null;
    }
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
