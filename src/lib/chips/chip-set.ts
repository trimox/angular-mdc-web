import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { startWith } from 'rxjs/operators/startWith';

import { toBoolean, EventRegistry } from '@angular-mdc/web/common';

import { MdcChip } from './chip';
import { MDCChipSetAdapter } from '@material/chips/chip-set/adapter';
import { MDCChipSetFoundation } from '@material/chips';

/** Change event object that is emitted when the chip list value has changed. */
export class MdcChipSetChange {
  constructor(
    /** ChipSet that emitted the event. */
    public source: MdcChipSet,
    /** Value of the chipset when the event was emitted. */
    public value: any) { }
}

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

  @HostBinding('class.mdc-chip-set') isHostClass = true;
  @HostBinding('class.mdc-chip-set--choice') get classChoice(): string {
    return this._choice ? 'mdc-chip-set--choice' : '';
  }
  @ContentChildren(MdcChip) chips: QueryList<MdcChip>;

  /** Subscription to changes in the chip list. */
  private _changeSubscription: Subscription;

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
    // When the list changes, re-subscribe
    this._changeSubscription = this.chips.changes.pipe(startWith(null)).subscribe(() => {
      // TO-DO(trimox) - Functional use of changes
    });
  }

  ngOnInit(): void {
    this._foundation.init();
  }

  ngOnDestroy(): void {
    if (this._changeSubscription) {
      this._changeSubscription.unsubscribe();
    }
    this._foundation.destroy();
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
