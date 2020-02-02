import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MdcList, MdcListItem, MdcListItemAction} from '@angular-mdc/web/list';
import {MdcMenuSurfaceBase} from '@angular-mdc/web/menu-surface';

import {closest} from '@material/dom/ponyfill';
import {
  cssClasses,
  DefaultFocusState,
  MDCMenuAdapter,
  MDCMenuFoundation
} from '@material/menu';

export class MdcMenuSelectedEvent {
  constructor(
    public index: number,
    public source: MdcListItem) {}
}

let nextUniqueId = 0;

@Component({
  moduleId: module.id,
  selector: 'mdc-menu',
  exportAs: 'mdcMenu',
  host: {
    '[id]': 'id',
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

  private _uniqueId: string = `${cssClasses.ROOT}-${++nextUniqueId}`;

  @Input() id: string = this._uniqueId;

  @Input()
  get wrapFocus(): boolean {
    return this._wrapFocus;
  }
  set wrapFocus(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._wrapFocus) {
      this._wrapFocus = newValue;
      this._list!.wrapFocus = newValue;
    }
  }
  private _wrapFocus = false;

  @Input()
  get closeSurfaceOnSelection(): boolean {
    return this._closeSurfaceOnSelection;
  }
  set closeSurfaceOnSelection(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._closeSurfaceOnSelection) {
      this._closeSurfaceOnSelection = newValue;
    }
  }
  private _closeSurfaceOnSelection = true;

  @Input()
  get defaultFocusState(): DefaultFocusState | undefined {
    return this._defaultFocusState;
  }
  set defaultFocusState(value: DefaultFocusState | undefined) {
    if (value !== this._defaultFocusState) {
      this._defaultFocusState = coerceNumberProperty(value, 0);
      this._menuFoundation.setDefaultFocusState(this._defaultFocusState);
    }
  }
  private _defaultFocusState?: DefaultFocusState;

  @Output() readonly selected: EventEmitter<MdcMenuSelectedEvent> = new EventEmitter<MdcMenuSelectedEvent>();

  @ContentChild(MdcList, {static: false}) _list?: MdcList;

  private _createAdapter(): MDCMenuAdapter {
    return Object.assign({
      addClassToElementAtIndex: (index: number, className: string) =>
        this._list!.items.toArray()[index].getListItemElement().classList.add(className),
      removeClassFromElementAtIndex: (index: number, className: string) =>
        this._list!.items.toArray()[index].getListItemElement().classList.remove(className),
      addAttributeToElementAtIndex: (index: number, attr: string, value: string) =>
        this._list!.items.toArray()[index].getListItemElement().setAttribute(attr, value),
      removeAttributeFromElementAtIndex: (index: number, attr: string) =>
        this._list!.items.toArray()[index].getListItemElement().removeAttribute(attr),
      elementContainsClass: (element: HTMLElement, className: string) => element.classList.contains(className),
      closeSurface: (skipRestoreFocus: boolean) => {
        if (this.closeSurfaceOnSelection) {
          this._foundation.close(skipRestoreFocus);
        }
      },
      getElementIndex: (element: HTMLElement) =>
        this._list!.items.toArray().findIndex(_ => _.getListItemElement() === element),
      notifySelected: (evtData: {index: number}) =>
        this.selected.emit(new MdcMenuSelectedEvent(evtData.index, this._list!.items.toArray()[evtData.index])),
      getMenuItemCount: () => this._list!.items.toArray().length,
      focusItemAtIndex: (index: number) => this._list!.items.toArray()[index].focus(),
      focusListRoot: () => this._list!.focus(),
      isSelectableItemAtIndex: (index: number) =>
        !!closest(this._list!.items.toArray()[index].getListItemElement(), `.${cssClasses.MENU_SELECTION_GROUP}`),
      getSelectedSiblingOfItemAtIndex: (index: number) => {
        const selectionGroupEl = closest(this._list!.items.toArray()[index].getListItemElement(),
          `.${cssClasses.MENU_SELECTION_GROUP}`) as HTMLElement;
        const selectedItemEl = selectionGroupEl.querySelector<HTMLElement>(`.${cssClasses.MENU_SELECTED_LIST_ITEM}`);
        return selectedItemEl ? this._list!.items.toArray().findIndex(_ =>
          _.elementRef.nativeElement === selectedItemEl) : -1;
      }
    });
  }

  private _menuFoundation: {
    destroy(): void,
    handleKeydown(evt: KeyboardEvent): void,
    handleItemAction(listItem: HTMLElement): void,
    handleMenuSurfaceOpened(): void,
    setDefaultFocusState(focusState: DefaultFocusState): void
  } = new MDCMenuFoundation(this._createAdapter());

  ngAfterContentInit(): void {
    this.initMenuSurface();
    this._initList();

    this.opened.pipe(takeUntil(this._destroyed))
      .subscribe(() => this._menuFoundation.handleMenuSurfaceOpened());
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();

    this.destroyMenuSurface();
    this._menuFoundation.destroy();
  }

  _handleKeydown(evt: KeyboardEvent): void {
    this._menuFoundation.handleKeydown(evt);
  }

  private _initList(): void {
    if (!this._list) {
      return;
    }

    this._list.setRole('menu');
    this._list.wrapFocus = this._wrapFocus;
    this._list.setTabIndex(-1);

    // When the list items change, re-subscribe
    this._list.items.changes.pipe(takeUntil(this._destroyed))
      .subscribe(() => this._list!.items.forEach(item => item.setRole('menuitem')));

    this._list!.actionEvent.pipe(takeUntil(this._destroyed))
      .subscribe((event: MdcListItemAction) =>
        this._menuFoundation.handleItemAction(this._list!.items.toArray()[event.index].getListItemElement()));
  }
}
