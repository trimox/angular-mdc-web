import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { MdcList, MdcListItem } from '@angular-mdc/web/list';
import { MdcMenuSurfaceAbstract } from '@angular-mdc/web/menu-surface';

import { MDCMenuFoundation } from '@material/menu/index';

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
  constructor(public elementRef: ElementRef) { }
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
    '(click)': 'handleClick($event)',
    '(keydown)': 'handleKeydown($event)',
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcMenu extends MdcMenuSurfaceAbstract implements AfterContentInit, OnDestroy {
  private _uniqueId: string = `mdc-menu-${++nextUniqueId}`;

  @Input() id: string = this._uniqueId;

  @Output() readonly selected: EventEmitter<MdcMenuSelectedEvent> =
    new EventEmitter<MdcMenuSelectedEvent>();

  @ContentChild(MdcList) _list: MdcList;
  @ContentChildren(MdcListItem, { descendants: true }) _listItems: QueryList<MdcListItem>;

  /** Subscription to listen for menu-surface opened event. */
  private _openedSubscription: Subscription;

  /** Subscription to changes in list items. */
  private _changeSubscription: Subscription;

  private _createAdapter() {
    return Object.assign({
      addClassToElementAtIndex: (index: number, className: string) =>
        this._listItems.toArray()[index].getListItemElement().classList.add(className),
      removeClassFromElementAtIndex: (index: number, className: string) =>
        this._listItems.toArray()[index].getListItemElement().classList.remove(className),
      addAttributeToElementAtIndex: (index: number, attr: string, value: string) =>
        this._listItems.toArray()[index].getListItemElement().setAttribute(attr, value),
      removeAttributeFromElementAtIndex: (index: number, attr: string) =>
        this._listItems.toArray()[index].getListItemElement().removeAttribute(attr),
      elementContainsClass: (element: HTMLElement, className: string) => element.classList.contains(className),
      closeSurface: () => {
        this.open = false;
        this.setOpen();
      },
      getElementIndex: (element: HTMLElement) => this._listItems.toArray().findIndex(_ => _.getListItemElement() === element),
      getParentElement: (element: HTMLElement) => element.parentElement,
      getSelectedElementIndex: (selectionGroup: MdcMenuSelectionGroup) =>
        this._listItems.toArray().indexOf(
          selectionGroup.elementRef.nativeElement.querySelector('mdc-menu-item--selected')),
      notifySelected: (evtData: { index: number }) =>
        this.selected.emit(new MdcMenuSelectedEvent(evtData.index, this._listItems.toArray()[evtData.index]))
    });
  }

  private _menuFoundation: {
    destroy(): void,
    handleKeydown(evt: KeyboardEvent): void,
    handleClick(evt: MouseEvent): void
  } = new MDCMenuFoundation(this._createAdapter());

  ngAfterContentInit(): void {
    this.initMenuSurface();

    this._initList();

    // When the list items change, re-subscribe
    this._changeSubscription = this._listItems.changes.pipe(startWith(null))
      .subscribe(() => {
        this._listItems.forEach(item => item.setRole('menuitem'));
      });

    this._openedSubscription = this.opened.subscribe(() => {
      if (this._list) {
        this._list.focusFirstElement();
      }
    });
  }

  ngOnDestroy(): void {
    if (this._changeSubscription) {
      this._changeSubscription.unsubscribe();
    }
    if (this._openedSubscription) {
      this._openedSubscription.unsubscribe();
    }

    this.destroyMenuSurface();
    this._menuFoundation.destroy();
  }

  private _initList(): void {
    if (!this._list) { return; }

    this._list.setRole('menu');
    this._list.wrapFocus = true;
  }

  handleClick(evt: MouseEvent): void {
    this._menuFoundation.handleClick(evt);
  }

  handleKeydown(evt: KeyboardEvent): void {
    this._menuFoundation.handleKeydown(evt);
  }

  focus(): void {
    this._getHostElement().focus();
  }
}
