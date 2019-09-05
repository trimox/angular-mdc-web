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
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {Platform} from '@angular/cdk/platform';
import {merge, Observable, Subscription} from 'rxjs';
import {startWith} from 'rxjs/operators';

import {MDCComponent} from '@angular-mdc/web/base';

import {MdcListItem, MdcListSelectionChange, MDC_LIST_PARENT_COMPONENT} from './list-item';

import {matches} from '@material/dom/ponyfill';
import {cssClasses, strings, MDCListFoundation, MDCListAdapter} from '@material/list';

/** Change event that is being fired whenever the selected state of an option changes. */
export class MdcListItemChange {
  constructor(
    /** Reference to the selection list that emitted the event. */
    public source: MdcList,
    /** Reference to the option that has been changed. */
    public option: MdcListItem) { }
}

/** Notifies user action on list item including keyboard and mouse actions. */
export interface MdcListItemAction {
  index: number;
}

@Component({
  moduleId: module.id,
  selector: '[mdcListGroup], mdc-list-group',
  exportAs: 'mdcListGroup',
  host: { 'class': 'mdc-list-group' },
  template: `
  <h3 class="mdc-list-group__subheader" *ngIf="subheader">{{subheader}}</h3>
  <ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcListGroup {
  @Input() subheader?: string;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcListGroupSubheader], mdc-list-group-subheader',
  exportAs: 'mdcListGroupSubheader',
  host: { 'class': 'mdc-list-group__subheader' }
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
    '[class.ngx-mdc-list--border]': 'border',
    '[class.mdc-list--non-interactive]': '!interactive',
    '[class.mdc-list--two-line]': 'twoLine',
    '(click)': '_handleClickEvent($event)',
    '(keydown)': '_onKeydown($event)',
    '(focusin)': '_onFocusIn($event)',
    '(focusout)': '_onFocusOut($event)'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MDC_LIST_PARENT_COMPONENT, useExisting: MdcList }]
})
export class MdcList extends MDCComponent<any> implements AfterViewInit, OnDestroy {
  @Input()
  get twoLine(): boolean { return this._twoLine; }
  set twoLine(value: boolean) {
    this._twoLine = coerceBooleanProperty(value);
  }
  private _twoLine: boolean = false;

  @Input()
  get dense(): boolean { return this._dense; }
  set dense(value: boolean) {
    this._dense = coerceBooleanProperty(value);
  }
  private _dense: boolean = false;

  @Input()
  get border(): boolean { return this._border; }
  set border(value: boolean) {
    this._border = coerceBooleanProperty(value);
  }
  private _border: boolean = false;

  @Input()
  get avatar(): boolean { return this._avatar; }
  set avatar(value: boolean) {
    this._avatar = coerceBooleanProperty(value);
  }
  private _avatar: boolean = false;

  @Input()
  get interactive(): boolean { return this._interactive; }
  set interactive(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._interactive) {
      this._interactive = newValue;
    }
  }
  private _interactive: boolean = true;

  @Input()
  get disableRipple(): boolean { return this._disableRipple; }
  set disableRipple(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._disableRipple) {
      this._disableRipple = newValue;
    }
  }
  private _disableRipple: boolean = false;

  @Input()
  get singleSelection(): boolean | undefined { return this._singleSelection; }
  set singleSelection(value: boolean | undefined) {
    if (value !== undefined) {
      const newValue = coerceBooleanProperty(value);

      if (newValue !== this._singleSelection) {
        this._singleSelection = newValue;
        this._foundation.setSingleSelection(this._singleSelection);
        this._changeDetectorRef.markForCheck();
      }
    }
  }
  private _singleSelection: boolean | undefined;

  @Input()
  get useActivatedClass(): boolean { return this._useActivatedClass; }
  set useActivatedClass(value: boolean) {
    this._useActivatedClass = coerceBooleanProperty(value);
    this._foundation.setUseActivatedClass(this._useActivatedClass);
    this._changeDetectorRef.markForCheck();
  }
  private _useActivatedClass: boolean = false;

  @Input()
  get useSelectedClass(): boolean { return this._useSelectedClass; }
  set useSelectedClass(value: boolean) {
    this._useSelectedClass = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  private _useSelectedClass: boolean = false;

  @Input()
  get verticalOrientation(): boolean { return this._verticalOrientation; }
  set verticalOrientation(value: boolean) {
    this._verticalOrientation = coerceBooleanProperty(value);
    this._foundation.setVerticalOrientation(this._verticalOrientation);
    this._changeDetectorRef.markForCheck();
  }
  private _verticalOrientation: boolean = true;

  @Input()
  get wrapFocus(): boolean { return this._wrapFocus; }
  set wrapFocus(value: boolean) {
    this._wrapFocus = coerceBooleanProperty(value);
    this._foundation.setWrapFocus(this._wrapFocus);
    this._changeDetectorRef.markForCheck();
  }
  private _wrapFocus: boolean = false;

  @ContentChildren(MdcListItem, { descendants: true }) items!: QueryList<MdcListItem>;

  /** Emits a change event whenever the selected state of an option changes. */
  @Output() readonly selectionChange: EventEmitter<MdcListItemChange> =
    new EventEmitter<MdcListItemChange>();

  /** Emits an event for keyboard and mouse actions. */
  @Output() readonly actionEvent: EventEmitter<MdcListItemAction> =
    new EventEmitter<MdcListItemAction>();

  /** Subscription to changes in list items. */
  private _changeSubscription: Subscription | null = null;

  /** Subscription to selection events in list items. */
  private itemSelectionSubscription: Subscription | null = null;

  /** Combined stream of all of the list item selection events. */
  get listItemSelections(): Observable<MdcListSelectionChange> {
    return merge(...this.items.map(item => item.selectionChange));
  }

  getDefaultFoundation() {
    const adapter: MDCListAdapter = {
      getListItemCount: () => this.items.length,
      getFocusedElementIndex: () => {
        if (!this._platform.isBrowser && document.activeElement!) { return -1; }
        return this.items.toArray().findIndex(_ => _.getListItemElement() === document.activeElement!) || -1;
      },
      setAttributeForElementIndex: (index: number, attr: string, value: string) => {
        const item = this.getListItemByIndex(index);
        if (item) {
          item.getListItemElement().setAttribute(attr, value);
        }
      },
      addClassForElementIndex: (index: number, className: string) =>
        this.items.toArray()[index].getListItemElement().classList.add(className),
      removeClassForElementIndex: (index: number, className: string) => {
        const item = this.getListItemByIndex(index);
        if (item) {
          item.getListItemElement().classList.remove(className);
        }
      },
      getAttributeForElementIndex: (index, attr) =>
        this.items.toArray()[index].getListItemElement().getAttribute(attr),
      focusItemAtIndex: (index: number) => this.focusItemAtIndex(index),
      setTabIndexForListItemChildren: (listItemIndex: number, tabIndexValue: string) => {
        const listItemChildren = [].slice.call(this.items.toArray()[listItemIndex].getListItemElement()
          .querySelectorAll(strings.CHILD_ELEMENTS_TO_TOGGLE_TABINDEX));
        listItemChildren.forEach((ele: Element) => ele.setAttribute('tabindex', `${tabIndexValue}`));
      },
      hasCheckboxAtIndex: (index: number) => {
        const listItem = this.items.toArray()[index].getListItemElement();
        return !!listItem.querySelector(strings.CHECKBOX_SELECTOR);
      },
      hasRadioAtIndex: (index: number) => {
        const listItem = this.items.toArray()[index].getListItemElement();
        return !!listItem.querySelector(strings.RADIO_SELECTOR);
      },
      isCheckboxCheckedAtIndex: (index: number) => {
        const listItem = this.items.toArray()[index].getListItemElement();
        const toggleEl = listItem.querySelector<HTMLInputElement>(strings.CHECKBOX_SELECTOR);
        return toggleEl!.checked;
      },
      setCheckedCheckboxOrRadioAtIndex: (index: number, isChecked: boolean) => {
        const listItem = this.items.toArray()[index].getListItemElement();
        const toggleEl = listItem.querySelector<HTMLInputElement>(strings.CHECKBOX_RADIO_SELECTOR);
        toggleEl!.checked = isChecked;

        if (this._platform.isBrowser) {
          const event = document.createEvent('Event');
          event.initEvent('change', true, true);
          toggleEl!.dispatchEvent(event);
        }
      },
      isFocusInsideList: () => this._platform.isBrowser ?
        this.elementRef.nativeElement.contains(document.activeElement) : false,
      isRootFocused: () => this._platform.isBrowser ? document.activeElement === this._getHostElement() : false,
      notifyAction: (index: number) => this.actionEvent.emit({ index: index })
    };
    return new MDCListFoundation(adapter);
  }

  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) {

    super(elementRef);
  }

  ngAfterViewInit(): void {
    this._foundation.init();
    this._foundation.layout();

    // When list items change, re-subscribe
    this._changeSubscription = this.items.changes.pipe(startWith(null))
      .subscribe(() => {
        if (this.items.length) {
          this._resetListItems();
        }
      });
  }

  ngOnDestroy(): void {
    this._dropSubscriptions();
    if (this._changeSubscription) {
      this._changeSubscription.unsubscribe();
    }

    this._foundation.destroy();
  }

  setSelectedIndex(index: number): void {
    this.reset();
    this._foundation.setSelectedIndex(index);
    if (index === -1) {
      return;
    }

    const selectedItem = this.items.toArray()[index];
    if (selectedItem) {
      this._applySelectionState(selectedItem);
    }
  }

  setSelectedValue(value: any): void {
    this.reset();
    if (value === null) {
      return;
    }

    const selectedItem = this.getListItemByValue(value);
    this._foundation.setSelectedIndex(this.getListItemIndexByValue(value));
    if (selectedItem) {
      this._applySelectionState(selectedItem);
    }
  }

  getSelectedItem(): MdcListItem | undefined {
    return this.items ? this.items.toArray().find(_ => _.selected || _.activated) : undefined;
  }

  getSelectedIndex(): number {
    return this.items ? this.items.toArray().findIndex(_ => _.selected || _.activated) : -1;
  }

  getSelectedValue(): any {
    const item = this.items ? this.items.find(_ => _.selected) : null;
    return item && item.value ? item.value : null;
  }

  getSelectedText(): string {
    const selectedItem = this.getSelectedItem();
    return selectedItem && selectedItem.getListItemElement().textContent || '';
  }

  getListItemByValue(value: any): MdcListItem | undefined {
    return this.items ? this.items.toArray().find(_ => _.value === value) : undefined;
  }

  getListItemByIndex(index: number): MdcListItem | undefined {
    return this.items ? this.items.toArray()[index] : undefined;
  }

  getListItemIndexByValue(value: any): number {
    return this.items ? this.items.toArray().findIndex(_ => _.value === value) : -1;
  }

  focusItemAtIndex(index: number): void {
    this.items.toArray()[index].getListItemElement().focus();
  }

  focusFirstElement(): number {
    return this._foundation.focusFirstElement();
  }

  focusLastElement(): number {
    return this._foundation.focusLastElement();
  }

  focusNextElement(index: number): number {
    return this._foundation.focusNextElement(index);
  }

  focusPrevElement(index: number): number {
    return this._foundation.focusPrevElement(index);
  }

  setRole(role: string): void {
    this._getHostElement().setAttribute('role', role);
  }

  setTabIndex(index: number): void {
    this._getHostElement().tabIndex = index;
  }

  focus(): void {
    this._getHostElement().focus();
  }

  reset(): void {
    this.items.forEach(_ => {
      _.selected = false;
      _.activated = false;
    });
  }

  private _applySelectionState(item: MdcListItem): void {
    if (this.useActivatedClass) {
      item.activated = true;
    } else if (this.useSelectedClass) {
      item.selected = true;
    }
  }

  private _resetListItems() {
    this._dropSubscriptions();
    this._listenForListItemSelection();
  }

  private _dropSubscriptions() {
    if (this.itemSelectionSubscription) {
      this.itemSelectionSubscription.unsubscribe();
      this.itemSelectionSubscription = null;
    }
  }

  /** Listens to selected events on each list item. */
  private _listenForListItemSelection(): void {
    this.itemSelectionSubscription = this.listItemSelections.subscribe(event => {
      if (this.singleSelection) {
        this.items.filter(_ => _.id !== event.source.id && (_.activated || _.selected))
          .forEach(_ => {
            _.selected = false;
            _.activated = false;
          });
      }

      this._applySelectionState(event.source);

      if (!this.singleSelection) {
        event.source.ripple.handleBlur();
      }
      this.selectionChange.emit(new MdcListItemChange(this, event.source));
    });
  }

  _onFocusIn(evt: FocusEvent): void {
    const index = this._getListItemIndexByEvent(evt);
    this._foundation.handleFocusIn(evt, index);
  }

  _onFocusOut(evt: FocusEvent): void {
    const index = this._getListItemIndexByEvent(evt);

    if (index >= 0) {
      this._foundation.handleFocusOut(evt, index);
    }
  }

  _onKeydown(evt: KeyboardEvent): void {
    const index = this._getListItemIndexByEvent(evt);
    const target = evt.target as Element;
    if (index >= 0) {
      this._foundation.handleKeydown(evt, target.classList.contains(cssClasses.LIST_ITEM_CLASS), index);
    }
  }

  _handleClickEvent(evt: MouseEvent): void {
    const index = this._getListItemIndexByEvent(evt);
    const target = evt.target as HTMLElement;

    const listItem = this._getListItemByEventTarget(evt.target!);
    if (listItem && listItem.disabled) {
      return;
    }

    // Toggle the checkbox only if it's not the target of the event, or the checkbox will have 2 change events.
    const toggleCheckbox = !matches(target, strings.CHECKBOX_RADIO_SELECTOR);
    this._foundation.handleClick(index, toggleCheckbox);
  }

  private _getListItemByEventTarget(target: EventTarget): MdcListItem | undefined {
    return this.items.toArray().find(_ => _.getListItemElement() === target);
  }

  private _getListItemIndexByEvent(evt: Event): number {
    return this.items.toArray().findIndex(_ => _.getListItemElement() === evt.target);
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
