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
import { defer } from 'rxjs/observable/defer';
import { merge } from 'rxjs/observable/merge';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { Subject } from 'rxjs/Subject';
import { switchMap } from 'rxjs/operators/switchMap';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { toBoolean, EventRegistry } from '@angular-mdc/web/common';

import { MdcChip, MdcChipIcon, MdcChipText, MdcChipSelectionEvent } from './chip';
import { MdcChipService } from './chip.service';

import { MDCChipSetAdapter } from '@material/chips/chip-set/adapter';
import { MDCChipSetFoundation, MDCChipFoundation } from '@material/chips';

@Component({
  moduleId: module.id,
  selector: 'mdc-chip-set',
  exportAs: 'mdcChipSet',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  providers: [
    EventRegistry,
    MdcChipService
  ]
})
export class MdcChipSet implements AfterContentInit, OnInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _disposeFn: (() => void) | null;

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
    appendChip: (text: string, leadingIcon: string, trailingIcon: string) => this._createChip(text, leadingIcon, trailingIcon),
    removeChip: (chip: MdcChip) => {
      const index = this.chips.toArray().indexOf(chip);
      this.chips.toArray().splice(index, 1);
    }
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    addChip(text: string, leadingIcon: string, trailingIcon: string): HTMLElement,
    select(chipFoundation: MDCChipFoundation): void,
    deselect(chipFoundation: MDCChipFoundation): void
  } = new MDCChipSetFoundation(this._mdcAdapter);

  constructor(
    private _chipService: MdcChipService,
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

  private _setDisposeFn(fn: () => void) {
    this._disposeFn = fn;
  }

  private _createChip(text: string, leadingIcon: string, trailingIcon: string): HTMLElement {
    const chipContainerRef = this._chipService.createComponentRef(MdcChip);
    const chipContainerElement = this._chipService.getDomElementFromComponentRef(chipContainerRef);
    this._chipService.addChild(chipContainerElement, this._getHostElement());
    this._setDisposeFn(() => chipContainerRef.destroy());

    if (leadingIcon) {
      const chipIconRef = this._chipService.createComponentRef(MdcChipIcon);
      const chipIconContainerElement = this._chipService.getDomElementFromComponentRef(chipIconRef);
      chipIconContainerElement.textContent = leadingIcon;
      chipIconRef.instance.leading = true;
      this._chipService.addChild(chipIconContainerElement, chipContainerElement);
      this._setDisposeFn(() => chipIconRef.destroy());
    }

    const chipTextRef = this._chipService.createComponentRef(MdcChipText);
    const chipTextContainerElement = this._chipService.getDomElementFromComponentRef(chipTextRef);
    chipTextContainerElement.textContent = text;
    this._chipService.addChild(chipTextContainerElement, chipContainerElement);
    this._setDisposeFn(() => chipTextRef.destroy());

    if (trailingIcon) {
      const chipIconRef = this._chipService.createComponentRef(MdcChipIcon);
      chipIconRef.instance.trailing = true;
      chipIconRef.instance.clickable = true;
      const chipIconContainerElement = this._chipService.getDomElementFromComponentRef(chipIconRef);
      chipIconContainerElement.textContent = trailingIcon;
      this._chipService.addChild(chipIconContainerElement, chipContainerElement);
      this._setDisposeFn(() => chipIconRef.destroy());
    }

    return chipContainerElement;
  }

  addChip(text: string, leadingIcon: string, trailingIcon: string): void {
    this._foundation.addChip(text, leadingIcon, trailingIcon);
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
