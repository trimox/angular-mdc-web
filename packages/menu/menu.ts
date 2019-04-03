import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { toBoolean } from '@angular-mdc/web/common';
import { MdcList, MdcListItem, MdcListItemAction } from '@angular-mdc/web/list';
import { MdcMenuSurfaceBase } from '@angular-mdc/web/menu-surface';

import { MDCMenuFoundation } from '@material/menu';

export class MdcMenuSelectedEvent {
  constructor(
    public index: number,
    public source: MdcListItem) { }
}

let nextUniqueId = 0;

@Directive({
  selector: '[mdcMenuSelectionGroup], mdc-menu-selection-group',
  host: { 'class': 'mdc-menu__selection-group' },
  exportAs: 'mdcMenuSelectionGroup'
})
export class MdcMenuSelectionGroup {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Directive({
  selector: '[mdcMenuSelectionGroupIcon], mdc-menu-selection-group-icon',
  host: { 'class': 'mdc-menu__selection-group-icon' },
  exportAs: 'mdcMenuSelectionGroupIcon'
})
export class MdcMenuSelectionGroupIcon {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-menu',
  exportAs: 'mdcMenu',
  host: {
    '[id]': 'id',
    'tabindex': '-1',
    'class': 'mdc-menu mdc-menu-surface',
    '(keydown)': '_handleKeydown($event)',
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcMenu extends MdcMenuSurfaceBase implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  private _uniqueId: string = `mdc-menu-${++nextUniqueId}`;

  @Input() id: string = this._uniqueId;

  @Input()
  get wrapFocus(): boolean { return this._wrapFocus; }
  set wrapFocus(value: boolean) {
    const newValue = toBoolean(value);
    if (newValue !== this._wrapFocus) {
      this._wrapFocus = newValue;
      this._list.wrapFocus = newValue;
    }
  }
  private _wrapFocus: boolean = false;

  @Output() readonly selected: EventEmitter<MdcMenuSelectedEvent> =
    new EventEmitter<MdcMenuSelectedEvent>();

  @ContentChild(MdcList) _list!: MdcList;

  private _createAdapter() {
    return Object.assign({
      addClassToElementAtIndex: (index: number, className: string) =>
        this._list.items.toArray()[index].getListItemElement().classList.add(className),
      removeClassFromElementAtIndex: (index: number, className: string) =>
        this._list.items.toArray()[index].getListItemElement().classList.remove(className),
      addAttributeToElementAtIndex: (index: number, attr: string, value: string) =>
        this._list.items.toArray()[index].getListItemElement().setAttribute(attr, value),
      removeAttributeFromElementAtIndex: (index: number, attr: string) =>
        this._list.items.toArray()[index].getListItemElement().removeAttribute(attr),
      elementContainsClass: (element: HTMLElement, className: string) => element.classList.contains(className),
      closeSurface: () => {
        this.open = false;
        this.setOpen();
      },
      getElementIndex: (element: HTMLElement) =>
        this._list.items.toArray().findIndex(_ => _.getListItemElement() === element),
      getParentElement: (element: HTMLElement) => element.parentElement,
      getSelectedElementIndex: (selectionGroup: HTMLElement) => {
        const selectedItem = selectionGroup.querySelector(`.mdc-menu-item--selected`);
        return selectedItem ? this._list.items.toArray().findIndex(_ => _.id === selectedItem.id) : -1;
      },
      notifySelected: (evtData: { index: number }) =>
        this.selected.emit(new MdcMenuSelectedEvent(evtData.index, this._list.items.toArray()[evtData.index])),
      getMenuItemCount: () => this._list.items.length,
      focusItemAtIndex: (index: number) => this._list.items.toArray()[index].focus(),
      isRootFocused: () => document.activeElement === this._getHostElement(),
      focusRoot: () => this._getHostElement().focus()
    });
  }

  private _menuFoundation: {
    destroy(): void,
    handleKeydown(evt: KeyboardEvent): void,
    handleItemAction(listItem: HTMLElement): void
  } = new MDCMenuFoundation(this._createAdapter());

  ngAfterContentInit(): void {
    this.initMenuSurface();
    this._initList();
    this._listenForListItemActions();

    this.opened.pipe(takeUntil(this._destroyed))
      .subscribe(() => {
        if (this._list) {
          this._list.focusFirstElement();
        }
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();

    this.destroyMenuSurface();
    this._menuFoundation.destroy();
  }

  focus(): void {
    this._getHostElement().focus();
  }

  _handleKeydown(evt: KeyboardEvent): void {
    this._menuFoundation.handleKeydown(evt);
  }

  private _initList(): void {
    if (!this._list) { return; }

    this._list.setRole('menu');
    this._list.wrapFocus = this._wrapFocus;

    // When the list items change, re-subscribe
    this._list.items.changes.pipe(takeUntil(this._destroyed))
      .subscribe(() => this._list.items.forEach(item => item.setRole('menuitem')));
  }

  /** Listens to action events on each list item. */
  private _listenForListItemActions(): void {
    this._list.actionEvent.pipe(takeUntil(this._destroyed))
      .subscribe((event: MdcListItemAction) =>
        this._menuFoundation.handleItemAction(this._list.items.toArray()[event.index].getListItemElement()));
  }
}
