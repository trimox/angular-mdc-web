import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, merge, Observable, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { toBoolean, Platform } from '@angular-mdc/web/common';

import { MdcListItem, MdcListSelectionChange } from './list-item';

import { strings } from '@material/list/constants';
import { matches } from '@material/dom/ponyfill';
import { MDCListFoundation } from '@material/list/index';

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
    'role': 'list',
    'class': 'mdc-list',
    '[attr.aria-orientation]': 'verticalOrientation ? "vertical" : "horizontal"',
    '[class.mdc-list--dense]': 'dense',
    '[class.mdc-list--avatar-list]': 'avatar',
    '[class.ng-mdc-list--border]': 'border',
    '[class.mdc-list--non-interactive]': '!interactive',
    '[class.mdc-list--two-line]': 'twoLine'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcList implements AfterViewInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  @Input()
  get twoLine(): boolean { return this._twoLine; }
  set twoLine(value: boolean) {
    this._twoLine = toBoolean(value);
  }
  private _twoLine: boolean;

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
  get singleSelection(): boolean { return this._singleSelection; }
  set singleSelection(value: boolean) {
    this.setSingleSelection(value);
  }
  private _singleSelection: boolean;

  @Input()
  get useActivatedClass(): boolean { return this._useActivatedClass; }
  set useActivatedClass(value: boolean) {
    this._useActivatedClass = toBoolean(value);
    this._foundation.setUseActivatedClass(this._useActivatedClass);
    this._changeDetectorRef.markForCheck();
  }
  private _useActivatedClass: boolean;

  @Input()
  get useSelectedClass(): boolean { return this._useSelectedClass; }
  set useSelectedClass(value: boolean) {
    this._useSelectedClass = toBoolean(value);
    this._changeDetectorRef.markForCheck();
  }
  private _useSelectedClass: boolean;

  @Input()
  get verticalOrientation(): boolean { return this._verticalOrientation; }
  set verticalOrientation(value: boolean) {
    this._verticalOrientation = toBoolean(value);
    this._foundation.setVerticalOrientation(this._verticalOrientation);
    this._changeDetectorRef.markForCheck();
  }
  private _verticalOrientation: boolean = true;

  @Input()
  get wrapFocus(): boolean { return this._wrapFocus; }
  set wrapFocus(value: boolean) {
    this._wrapFocus = toBoolean(value);
    this._foundation.setWrapFocus(this._wrapFocus);
    this._changeDetectorRef.markForCheck();
  }
  private _wrapFocus: boolean;

  @ContentChildren(MdcListItem, { descendants: true }) _listItems: QueryList<MdcListItem>;

  /** Emits a change event whenever the selected state of an option changes. */
  @Output() readonly selectionChange: EventEmitter<MdcListItemChange> =
    new EventEmitter<MdcListItemChange>();

  /** Subscription to changes in list items. */
  private _changeSubscription: Subscription;

  /** Subscription to selection events in list items. */
  private _listItemSelectionSubscription: Subscription | null;

  /** Combined stream of all of the list item selection events. */
  get listItemSelections(): Observable<MdcListSelectionChange> {
    return merge(...this._listItems.map(item => item.selectionChange));
  }

  createAdapter() {
    return {
      getListItemCount: () => this._listItems.length,
      getFocusedElementIndex: () => {
        if (!this._platform.isBrowser && document.activeElement!) { return -1; }
        return this._listItems.toArray().findIndex(_ => _.getListItemElement() === document.activeElement!) || -1;
      },
      setAttributeForElementIndex: (index: number, attr: string, value: string) =>
        this._listItems.toArray()[index].getListItemElement().setAttribute(attr, value),
      removeAttributeForElementIndex: (index: number, attr: string) =>
        this._listItems.toArray()[index].getListItemElement().removeAttribute(attr),
      addClassForElementIndex: (index: number, className: string) =>
        this._listItems.toArray()[index].getListItemElement().classList.add(className),
      removeClassForElementIndex: (index: number, className: string) =>
        this._listItems.toArray()[index].getListItemElement().classList.remove(className),
      focusItemAtIndex: (index: number) => this.focusItemAtIndex(index),
      setTabIndexForListItemChildren: (listItemIndex: number, tabIndexValue: number) => {
        const listItemChildren = [].slice.call(this._listItems.toArray()[listItemIndex].getListItemElement()
          .querySelectorAll(strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
        listItemChildren.forEach((ele: Element) => ele.setAttribute('tabindex', `${tabIndexValue}`));
      },
      followHref: (index: number) => {
        const listItem = this._listItems.toArray()[index];

        if (listItem && listItem.elementRef.nativeElement.href) {
          listItem.getListItemElement().click();
        }
      },
      toggleCheckbox: (index: number) => {
        let checkboxOrRadioExists = false;
        const listItem = this._listItems.toArray()[index];
        const elementsToToggle = [].slice.call(listItem.getListItemElement().querySelectorAll(strings.CHECKBOX_RADIO_SELECTOR));
        elementsToToggle.forEach((element: any) => {
          const event = document.createEvent('Event');
          event.initEvent('change', true, true);

          if (!element.checked || element.type !== 'radio') {
            element.checked = !element.checked;
            element.dispatchEvent(event);
          }
          checkboxOrRadioExists = true;
        });
        return checkboxOrRadioExists;
      },
    };
  }

  private _foundation: {
    init(): void,
    destroy(): void,
    setVerticalOrientation(vertical: boolean): void,
    setWrapFocus(wrapFocus: boolean): void,
    handleClick(index: number, toggleCheckbox: boolean): void,
    handleKeydown(evt: KeyboardEvent, isRootListItem: boolean, listItemIndex: number): void,
    handleFocusIn(evt: FocusEvent, listItemIndex: number): void,
    handleFocusOut(evt: FocusEvent, listItemIndex: number): void,
    focusNextElement(index: number): void,
    focusPrevElement(index: number): void,
    focusFirstElement(): void,
    focusLastElement(): void,
    setSelectedIndex(index: number): void,
    setSingleSelection(isSingleSelectionList: boolean): void,
    setUseActivatedClass(useActivated: boolean): void
  } = new MDCListFoundation(this.createAdapter());

  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    private _ngZone: NgZone,
    public elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this._foundation.init();

    // When list items change, re-subscribe
    this._changeSubscription = this._listItems.changes.pipe(startWith(null))
      .subscribe(() => {
        this._resetListItems();
        this.setInteractive(this.interactive);
      });

    this._loadListeners();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    this._dropSubscriptions();
    if (this._changeSubscription) {
      this._changeSubscription.unsubscribe();
    }

    this._foundation.destroy();
  }

  private _resetListItems() {
    this._dropSubscriptions();
    this._listenForListItemSelection();
  }

  private _dropSubscriptions() {
    if (this._listItemSelectionSubscription) {
      this._listItemSelectionSubscription.unsubscribe();
      this._listItemSelectionSubscription = null;
    }
  }

  /** Listens to selected events on each list item. */
  private _listenForListItemSelection(): void {
    this._listItemSelectionSubscription = this.listItemSelections.subscribe(event => {
      if (this.singleSelection) {
        this._listItems.filter(_ => _.activated || _.selected)
          .forEach(_ => {
            _.selected = false;
            _.activated = false;
          });
      }

      if (this.useActivatedClass) {
        event.source.activated = true;
      } else if (this.useSelectedClass) {
        event.source.selected = true;
      }

      if (!this.singleSelection && this.interactive) {
        event.source.ripple.handleBlur();
      }
      this.selectionChange.emit(new MdcListItemChange(this, event.source));
    });
  }

  setInteractive(value: boolean): void {
    this._interactive = toBoolean(value);

    if (!this._listItems) { return; }

    this._listItems.forEach(option => {
      option.setInteractive(value);
    });
  }

  setSingleSelection(singleSelection: boolean): void {
    this._singleSelection = toBoolean(singleSelection);
    this._foundation.setSingleSelection(this._singleSelection);

    if (this.getSelectedIndex() > -1) {
      this.setSelectedIndex(this.getSelectedIndex());
    }

    this._changeDetectorRef.markForCheck();
  }

  setSelectedIndex(index: number): void {
    this._foundation.setSelectedIndex(index);
  }

  getSelectedIndex(): number {
    if (!this._listItems) { return -1; }

    return this._listItems.toArray().findIndex(_ => _.selected || _.activated);
  }

  focusItemAtIndex(index: number): void {
    this._listItems.toArray()[index].getListItemElement().focus();
  }

  focusFirstElement(): void {
    this._foundation.focusFirstElement();
  }

  focusLastElement(): void {
    this._foundation.focusLastElement();
  }

  setRole(role: string): void {
    this._getHostElement().setAttribute('role', role);
  }

  private _loadListeners(): void {
    this._ngZone.runOutsideAngular(() =>
      fromEvent<MouseEvent>(this._getHostElement(), 'click').pipe(takeUntil(this._destroy))
        .subscribe(evt => this._ngZone.run(() => this._handleClickEvent(evt))));

    this._ngZone.runOutsideAngular(() =>
      fromEvent<KeyboardEvent>(this._getHostElement(), 'keydown').pipe(takeUntil(this._destroy))
        .subscribe(evt => this._ngZone.run(() => {
          const index = this._getListItemIndex(evt);
          if (index >= 0 && evt.target) {
            this._foundation.handleKeydown(evt, (<any>evt.target).classList.contains('mdc-list-item'), index);
          }
        })));

    this._ngZone.runOutsideAngular(() =>
      fromEvent<FocusEvent>(this._getHostElement(), 'focusin').pipe(takeUntil(this._destroy))
        .subscribe(evt => this._ngZone.run(() => {
          const index = this._getListItemIndex(evt);
          if (index >= 0) {
            this._foundation.handleFocusIn(evt, index);
          }
        })));

    this._ngZone.runOutsideAngular(() =>
      fromEvent<FocusEvent>(this._getHostElement(), 'focusout').pipe(takeUntil(this._destroy))
        .subscribe(evt => this._ngZone.run(() => {
          const index = this._getListItemIndex(evt);
          if (index >= 0) {
            this._foundation.handleFocusOut(evt, index);
          }
        })));
  }

  private _handleClickEvent(evt: MouseEvent): void {
    const index = this._getListItemIndex(evt);

    // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.
    const toggleCheckbox = !matches((evt.target), strings.CHECKBOX_RADIO_SELECTOR);
    this._foundation.handleClick(index, toggleCheckbox);
  }

  private _getListItemIndex(evt: Event): number {
    return this._listItems.toArray().findIndex(_ => _.getListItemElement() === evt.target);
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
