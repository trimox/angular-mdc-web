import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, defer, merge, Observable, Subject, Subscription } from 'rxjs';
import { filter, startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import { toBoolean } from '@angular-mdc/web/common';

import { MdcListItem, MdcListSelectionChange } from './list-item';

import { MDCListAdapter } from '@material/list/adapter';
import { MDCListFoundation } from '@material/list';

/** Change event that is being fired whenever the selected state of an option changes. */
export class MdcListItemChange {
  constructor(
    /** Reference to the selection list that emitted the event. */
    public source: MdcList,
    /** Reference to the option that has been changed. */
    public option: MdcListItem) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdcListGroup], mdc-list-group',
  exportAs: 'mdcListGroup',
  host: {
    'class': 'mdc-list-group'
  },
  template: `
  <h3 class="mdc-list-group__subheader" *ngIf="subheader">{{subheader}}</h3>
  <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcListGroup {
  @Input() subheader: string;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcListGroupSubheader], mdc-list-group-subheader',
  exportAs: 'mdcListGroupSubheader',
  host: {
    'class': 'mdc-list-group__subheader'
  }
})
export class MdcListGroupSubheader {
  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-list',
  exportAs: 'mdcList',
  host: {
    'class': 'mdc-list',
    '[class.mdc-list--dense]': 'dense',
    '[class.mdc-list--avatar-list]': 'avatar',
    '[class.ng-mdc-list--border]': 'border',
    '[class.mdc-list--non-interactive]': '!interactive',
    '[class.mdc-list--two-line]': 'lines === 2'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcList implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  @Input() lines: number = 1;

  @Input()
  get dense(): boolean { return this._dense; }
  set dense(value: boolean) {
    this._dense = toBoolean(value);
  }
  private _dense: boolean;

  @Input()
  get border(): boolean { return this._border; }
  set border(value: boolean) {
    this._border = toBoolean(value);
  }
  private _border: boolean;

  @Input()
  get avatar(): boolean { return this._avatar; }
  set avatar(value: boolean) {
    this._avatar = toBoolean(value);
  }
  private _avatar: boolean;

  @Input()
  get interactive(): boolean { return this._interactive; }
  set interactive(value: boolean) {
    if (value !== this._interactive) {
      this.setInteractive(value);
    }
  }
  private _interactive: boolean = true;

  @Input()
  get selection(): boolean { return this._selection; }
  set selection(value: boolean) {
    this.setSelection(value);
  }
  private _selection: boolean;

  @Input()
  get wrapFocus(): boolean { return this._wrapFocus; }
  set wrapFocus(value: boolean) {
    this._wrapFocus = toBoolean(value);
    this._foundation.setWrapFocus(this._wrapFocus);
  }
  private _wrapFocus: boolean;

  @HostBinding('attr.role') role: string = 'list';
  @HostBinding('attr.aria-orientation') ariaOrientation: string = 'vertical';
  @HostBinding('attr.aria-hidden') ariaHidden: boolean = false;

  private _clickSubscription: Subscription;

  @ContentChildren(MdcListItem, { descendants: true }) _listItems: QueryList<MdcListItem>;

  /** Emits a change event whenever the selected state of an option changes. */
  @Output() readonly selectionChange: EventEmitter<MdcListItemChange> =
    new EventEmitter<MdcListItemChange>();

  private _mdcAdapter: MDCListAdapter = {
    getListItemCount: () => this._listItems.length,
    getFocusedElementIndex: () =>
      this._listItems.toArray().findIndex((_) => _.elementRef.nativeElement === document.activeElement),
    setAttributeForElementIndex: (index: number, attr: string, value: string) =>
      this._listItems.toArray()[index].getListItemElement().setAttribute(attr, value),
    removeAttributeForElementIndex: (index: number, attr: string) =>
      this._listItems.toArray()[index].getListItemElement().removeAttribute(attr),
    addClassForElementIndex: (index: number, className: string) =>
      this._listItems.toArray()[index].getListItemElement().classList.add(className),
    removeClassForElementIndex: (index: number, className: string) =>
      this._listItems.toArray()[index].getListItemElement().classList.remove(className),
    focusItemAtIndex: (index: number) => this._listItems.toArray()[index].getListItemElement().focus(),
    setTabIndexForListItemChildren: (listItemIndex: number, tabIndexValue: number) => {
      const listItemChildren = [].slice.call(this._listItems.toArray()[listItemIndex].getListItemElement()
        .querySelectorAll('.mdc-list-item button:not(:disabled), .mdc-list-item a'));
      listItemChildren.forEach((ele) => ele.setAttribute('tabindex', tabIndexValue));
    },
    followHref: (index: number) => {
      const listItem = this._listItems.toArray()[index];

      if (listItem && listItem.elementRef.nativeElement.href) {
        listItem.getListItemElement().click();
      }
    }
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    setVerticalOrientation(vertical: boolean): void,
    setWrapFocus(wrapFocus: boolean): void,
    handleClick(): void,
    handleKeydown(evt: Event, isRootListItem: boolean, listItemIndex: number): void,
    handleFocusIn(evt: Event, listItemIndex: number): void,
    handleFocusOut(evt: Event, listItemIndex: number): void,
    focusNextElement(index: number): void,
    focusPrevElement(index: number): void,
    focusFirstElement(): void,
    focusLastElement(): void,
    setSelectedIndex(index: number): void,
    setSingleSelection(isSingleSelectionList: boolean): void
  } = new MDCListFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _ngZone: NgZone,
    public elementRef: ElementRef) { }

  /** Combined stream of all of the child options' change events. */
  readonly optionSelectionChanges: Observable<MdcListSelectionChange> = defer(() => {
    if (this._listItems) {
      return merge(...this._listItems.map(option => option.selectionChange));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.optionSelectionChanges));
  });

  ngAfterContentInit(): void {
    this._foundation.init();
    this._foundation.setVerticalOrientation(true);

    this.optionSelectionChanges.pipe(
      takeUntil(merge(this._destroy, this._listItems.changes))
    ).subscribe(event => {
      event.source.selected = this.selection;

      if (!this.selection && this.interactive) {
        event.source.ripple.handleBlur();
      }
      this.selectionChange.emit(new MdcListItemChange(this, event.source));
    });

    this._listItems.changes.pipe(startWith(null), takeUntil(this._destroy)).subscribe(() => {
      Promise.resolve().then(() => {
        this.setInteractive(this.interactive);
        this._resetOptions();
      });
    });

    this._loadListeners();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    if (this._clickSubscription) {
      this._clickSubscription.unsubscribe();
    }
  }

  private _loadListeners() {
    this._ngZone.runOutsideAngular(() =>
      fromEvent(this._getHostElement(), 'keydown').pipe(takeUntil(this._destroy))
        .subscribe((evt) => this._ngZone.run(() => {
          const index = this._getListItemIndex(evt);
          if (index >= 0 && evt.target) {
            this._foundation.handleKeydown(evt, (<any>evt.target).classList.contains('.mdc-list-item'), index);
          }
        })));

    this._ngZone.runOutsideAngular(() =>
      fromEvent(this._getHostElement(), 'focusin').pipe(takeUntil(this._destroy))
        .subscribe((evt) => this._ngZone.run(() => {
          const index = this._getListItemIndex(evt);
          if (index >= 0) {
            this._foundation.handleFocusIn(evt, index);
          }
        })));

    this._ngZone.runOutsideAngular(() =>
      fromEvent(this._getHostElement(), 'focusout').pipe(takeUntil(this._destroy))
        .subscribe((evt) => this._ngZone.run(() => {
          const index = this._getListItemIndex(evt);
          if (index >= 0) {
            this._foundation.handleFocusOut(evt, index);
          }
        })));
  }

  setInteractive(value: boolean): void {
    this._interactive = toBoolean(value);

    if (!this._listItems) {
      return;
    }

    this._listItems.forEach(option => {
      option.setInteractive(value);
    });
  }

  setSelection(selection: boolean): void {
    this._selection = toBoolean(selection);
    this._foundation.setSingleSelection(this.selection);

    if (this.selection) {
      this._clickSubscription = this._ngZone.runOutsideAngular(() =>
        fromEvent(document.body, 'click')
          .subscribe(() => this._ngZone.run(() => this._foundation.handleClick())));
    } else if (this._clickSubscription) {
      this._clickSubscription.unsubscribe();
    }

    if (this.getSelectedIndex() > -1) {
      this.setSelectedIndex(this.getSelectedIndex());
    }

    this._changeDetectorRef.markForCheck();
  }

  clearSelected(skip?: MdcListItem): void {
    if (!this._listItems) {
      return;
    }

    this._listItems.forEach(option => {
      if (option !== skip) {
        option.selected = false;
      }
    });
  }

  setSelectedIndex(index: number): void {
    this._foundation.setSelectedIndex(index);
  }

  getSelectedIndex(): number {
    if (!this._listItems) { return -1; }

    return this._listItems.toArray().findIndex((_) => _.selected);
  }

  focusFirstElement(): void {
    this._foundation.focusFirstElement();
  }

  focusLastElement(): void {
    this._foundation.focusLastElement();
  }

  /** Drops current option subscriptions and IDs and resets from scratch. */
  private _resetOptions(): void {
    const changedOrDestroyed = merge(this._listItems.changes, this._destroy);

    this.optionSelectionChanges
      .pipe(takeUntil(changedOrDestroyed)
      ).subscribe(event => {
        this.clearSelected(event.source);
      });
  }

  private _getListItemIndex(evt: Event) {
    return this._listItems.toArray().findIndex((_) => _.getListItemElement() === evt.target);
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
