import {
  AfterContentInit,
  ContentChildren,
  ElementRef,
  OnDestroy,
  Input,
  QueryList,
  OnChanges,
  SimpleChange,
  Renderer2,
} from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { toBoolean } from '../common';

import { MdcListItem, MdcListItemActivate } from '../list/list-item';

const DRAWER_SELECTED = 'mdc-drawer--selected';

export abstract class MdcDrawer implements AfterContentInit, OnChanges, OnDestroy {
  private _itemsSubscription: ISubscription;
  private _disableItemSelect: boolean = false;

  @Input()
  get disableItemSelect(): boolean { return this._disableItemSelect; }
  set disableItemSelect(value: boolean) {
    this._disableItemSelect = toBoolean(value);
  }
  @ContentChildren(MdcListItem, { descendants: true }) items: QueryList<MdcListItem>;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef) {
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    const disableItemSelect = changes['disableItemSelect'];

    if (disableItemSelect) {
      if (!disableItemSelect.currentValue) {
        this._closeItemsSubscription();
        this._removeItemSelectClass();
      } else {
        this._openItemsSubscription();
      }
    }
  }

  ngAfterContentInit() {
    this._openItemsSubscription();
  }

  ngOnDestroy() {
    if (this._itemsSubscription) {
      this._itemsSubscription.unsubscribe();
    }
  }

  setDisableItemSelect(value: boolean): void {
    this._disableItemSelect = toBoolean(value);
  }

  getDisableItemSelect(): boolean {
    return this._disableItemSelect;
  }

  private _openItemsSubscription(): void {
    if (this._disableItemSelect) { return; }

    if (!this._itemsSubscription || this._itemsSubscription.closed) {
      this._itemsSubscription = this.items.changes.subscribe(_ => { });
      this._itemsSubscription = merge(
        ...this.items.map(item => item.activate)).subscribe((_: MdcListItemActivate) => {
          this._removeItemSelectClass();

          _.item.select();
          if (!_.item.hasClass(DRAWER_SELECTED)) {
            this.renderer.addClass(_.item.elementRef.nativeElement, DRAWER_SELECTED);
          }
        });
    }
  }

  private _closeItemsSubscription(): void {
    if (this._itemsSubscription) {
      this._itemsSubscription.unsubscribe();
    }
  }

  private _removeItemSelectClass(): void {
    const item = this.items.find((_) => _.selected);

    if (item) {
      item.deselect();
      this.renderer.removeClass(item.elementRef.nativeElement, DRAWER_SELECTED);
    }
  }
}
