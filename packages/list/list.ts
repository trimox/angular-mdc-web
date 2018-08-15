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
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { defer, merge, Observable, Subject } from 'rxjs';
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
  template: `
  <h3 class="mdc-list-group__subheader" *ngIf="subheader">{{subheader}}</h3>
  <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcListGroup {
  @Input() subheader: string;

  @HostBinding('class.mdc-list-group') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcListGroupSubheader], mdc-list-group-subheader',
  exportAs: 'mdcListGroupSubheader',
})
export class MdcListGroupSubheader {
  @HostBinding('class.mdc-list-group__subheader') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-list',
  exportAs: 'mdcList',
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

  @HostBinding('class.mdc-list') isHostClass = true;
  @HostBinding('attr.role') role: string = 'list';
  @HostBinding('attr.aria-orientation') ariaOrientation: string = 'vertical';
  @HostBinding('class.mdc-list--dense') get classDense(): string {
    return this.dense ? 'mdc-list--dense' : '';
  }
  @HostBinding('class.mdc-list--two-line') get classLines(): string {
    return this.lines === 2 ? 'mdc-list--two-line' : '';
  }
  @HostBinding('class.mdc-list--avatar-list') get classAvatar(): string {
    return this.avatar ? 'mdc-list--avatar-list' : '';
  }
  @HostBinding('class.ng-mdc-list--border') get classBorder(): string {
    return this.border ? 'ng-mdc-list--border' : '';
  }
  @HostBinding('class.mdc-list--non-interactive') get classInteractive(): string {
    return !this.interactive ? 'mdc-list--non-interactive' : '';
  }

  @HostListener('keydown', ['$event']) onkeydown(evt: KeyboardEvent) {
    this._foundation.handleKeydown(evt);
  }
  @HostListener('focusin', ['$event']) onfocusin(evt: FocusEvent) {
    this._foundation.handleFocusIn(evt);
  }
  @HostListener('focusout', ['$event']) onfocusout(evt: FocusEvent) {
    this._foundation.handleFocusOut(evt);
  }
  @HostListener('click') onclick() {
    if (!this.selection) { return; }

    this._foundation.handleClick();
  }

  @ContentChildren(MdcListItem, { descendants: true }) _listItems: QueryList<MdcListItem>;

  /** Emits a change event whenever the selected state of an option changes. */
  @Output() readonly selectionChange: EventEmitter<MdcListItemChange> =
    new EventEmitter<MdcListItemChange>();

  private _mdcAdapter: MDCListAdapter = {
    getListItemCount: () => this._listItems.length,
    getFocusedElementIndex: () =>
      this._listItems.toArray().findIndex((_) => _.elementRef.nativeElement === document.activeElement),
    getListItemIndex: (node: Element) => this._listItems.toArray().findIndex((_) => _.getListItemElement() === node),
    setAttributeForElementIndex: (index: number, attr: string, value: string) =>
      this._listItems.toArray()[index].getListItemElement().setAttribute(attr, value),
    removeAttributeForElementIndex: (index: number, attr: string) =>
      this._listItems.toArray()[index].getListItemElement().removeAttribute(attr),
    addClassForElementIndex: (index: number, className: string) =>
      this._listItems.toArray()[index].getListItemElement().classList.add(className),
    removeClassForElementIndex: (index: number, className: string) =>
      this._listItems.toArray()[index].getListItemElement().classList.remove(className),
    isListItem: (target: HTMLElement) => target.classList.contains('mdc-list-item'),
    focusItemAtIndex: (index: number) => this._listItems.toArray()[index].getListItemElement().focus(),
    isElementFocusable: (ele: ElementRef) => {
      if (!ele) { return false; }

      let matches = Element.prototype.matches;
      if (!matches) { // IE uses a different name for the same functionality
        matches = Element.prototype.msMatchesSelector;
      }
      return matches.call(ele, 'button:not(:disabled), a');
    },
    setTabIndexForListItemChildren: (listItemIndex: number, tabIndexValue: number) => {
      const listItemChildren = [].slice.call(this._listItems.toArray()[listItemIndex].getListItemElement()
        .querySelectorAll('.mdc-list-item button:not(:disabled), .mdc-list-item a'));
      listItemChildren.forEach((ele) => ele.setAttribute('tabindex', tabIndexValue));
    }
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    setVerticalOrientation(vertical: boolean): void,
    setWrapFocus(wrapFocus: boolean): void,
    handleClick(): void,
    handleKeydown(evt: KeyboardEvent): void,
    handleFocusIn(evt: FocusEvent): void,
    handleFocusOut(evt: FocusEvent): void,
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
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
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
        option.setSelected(false);
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

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
