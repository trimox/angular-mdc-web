import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {merge, Observable, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {closest} from '@angular-mdc/web/dom';
import {MDCComponent} from '@angular-mdc/web/base';
import {MdcCheckbox, MdcCheckboxChange} from '@angular-mdc/web/checkbox';

import {
  MDCDataTableHeaderCell,
  MDCDataTableRow,
} from './data-table.directives';

import {
  strings,
  MDCDataTableRowSelectionChangedEventDetail,
  MDCDataTableAdapter,
  MDCDataTableFoundation
} from '@material/data-table';

export interface MDCDataTableRowSelectionChangedEvent {
  index: number;
  id: string | null;
  selected: boolean;
}

@Component({
  selector: 'mdc-data-table',
  exportAs: 'mdcDataTable',
  host: {'class': 'mdc-data-table'},
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MDCDataTable extends MDCComponent<MDCDataTableFoundation> implements AfterViewInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroyed = new Subject<void>();

  private _headerCheckbox: MdcCheckbox | undefined;

  private _headerCheckboxSubscription: Subscription | null = null;

  /** Subscription to checkbox events in rows. */
  private _rowCheckboxesSubscription: Subscription | null = null;

  /** Combined stream of all checkbox row change events. */
  get rowCheckboxChanges(): Observable<MdcCheckboxChange> {
    return merge(...this.rows.map(row => row._checkbox!.change));
  }

  /** Emitted when all rows are selected. */
  @Output() readonly selectedAll: EventEmitter<void> = new EventEmitter<void>();

  /** Emitted when all rows are unselected. */
  @Output() readonly unselectedAll: EventEmitter<void> = new EventEmitter<void>();

  /** Emitted when a row is selected. */
  @Output() readonly selectionChanged: EventEmitter<MDCDataTableRowSelectionChangedEvent> =
    new EventEmitter<MDCDataTableRowSelectionChangedEvent>();

  @ContentChildren(MDCDataTableRow, {descendants: true}) rows!: QueryList<MDCDataTableRow>;
  @ContentChildren(MDCDataTableHeaderCell, {descendants: true}) headerCells!: QueryList<MDCDataTableHeaderCell>;

  getDefaultFoundation() {
    const adapter: MDCDataTableAdapter = {
      addClassAtRowIndex: (rowIndex: number, className: string) =>
        this.getRows()[rowIndex].getNativeElement().classList.add(className),
      getRowCount: () => this.getRows().length,
      getRowElements: () => [].slice.call(this.elementRef.nativeElement.querySelectorAll(strings.ROW_SELECTOR)),
      getRowIdAtIndex: (rowIndex: number) =>
        this.getRows()[rowIndex].getNativeElement().getAttribute(strings.DATA_ROW_ID_ATTR),
      getRowIndexByChildElement: (el: Element) =>
        this.getRows().findIndex(_ => _.getNativeElement() === ((closest(el, strings.ROW_SELECTOR) as HTMLElement))),
      getSelectedRowCount: () => this.elementRef.nativeElement.querySelectorAll(strings.ROW_SELECTED_SELECTOR).length,
      isCheckboxAtRowIndexChecked: (rowIndex: number) =>
        this.rows.length > 0 && this.getRows()[rowIndex] && this.getRows()[rowIndex]._checkbox !== undefined &&
          this.getRows()[rowIndex]._checkbox!.checked ? true : false,
      isHeaderRowCheckboxChecked: () => this._headerCheckbox ? this._headerCheckbox.checked : false,
      isRowsSelectable: () => !!this.elementRef.nativeElement.querySelector(strings.ROW_CHECKBOX_SELECTOR),
      notifyRowSelectionChanged: (data: MDCDataTableRowSelectionChangedEventDetail) =>
        this.selectionChanged.emit({
          index: data.rowIndex,
          id: data.rowId,
          selected: data.selected
        }),
      notifySelectedAll: () => this.selectedAll.emit(),
      notifyUnselectedAll: () => this.unselectedAll.emit(),
      registerHeaderRowCheckbox: () => this._registerHeaderCheckbox(),
      registerRowCheckboxes: () => this._registerRowCheckboxes(),
      removeClassAtRowIndex: (rowIndex: number, className: string) =>
        this.getRows()[rowIndex].getNativeElement().classList.remove(className),
      setAttributeAtRowIndex: (rowIndex: number, attr: string, value: string) =>
        this.getRows()[rowIndex].getNativeElement().setAttribute(attr, value),
      setHeaderRowCheckboxChecked: (checked: boolean) => this._headerCheckbox.checked = checked,
      setHeaderRowCheckboxIndeterminate: (indeterminate: boolean) => this._headerCheckbox.indeterminate = indeterminate,
      setRowCheckboxCheckedAtIndex: (rowIndex: number, checked: boolean) =>
        this.getRows()[rowIndex]._checkbox ? this.getRows()[rowIndex]._checkbox!.toggle(checked) : null
    };
    return new MDCDataTableFoundation(adapter);
  }

  constructor(
    public elementRef: ElementRef) {
    super(elementRef);
  }

  ngAfterViewInit(): void {
    this._foundation.init();
    this.layoutAsync();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();

    this._unsubscribeHeaderCheckbox();
    this._unsubscribeRowCheckboxes();
    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  /**
   * Re-initializes header row checkbox and row checkboxes when selectable rows are added or removed from table.
   * Use this if registering checkbox is asynchronous.
   */
  async layoutAsync(): Promise<void> {
    await this._foundation.layoutAsync();
  }

  /**
   * Re-initializes header row checkbox and row checkboxes when selectable rows are added or removed from table.
   * Use this if registering checkbox is synchronous.
   */
  layout(): void {
    this._foundation.layout();
  }

  /**
   * @return Returns array of selected row ids.
   */
  getSelectedRowIds(): Array<string | null> {
    return this._foundation.getSelectedRowIds();
  }

  /**
   * Sets selected row ids. Overwrites previously selected rows.
   * @param rowIds Array of row ids that needs to be selected.
   */
  setSelectedRowIds(rowIds: string[]): void {
    return this._foundation.setSelectedRowIds(rowIds);
  }

  getRows(): MDCDataTableRow[] {
    return this.rows.toArray();
  }

  getHeaderCheckbox(): MdcCheckbox | undefined {
    return this._headerCheckbox;
  }

  private _unsubscribeHeaderCheckbox(): void {
    if (this._headerCheckboxSubscription) {
      this._headerCheckboxSubscription.unsubscribe();
    }
  }

  private _unsubscribeRowCheckboxes(): void {
    if (this._rowCheckboxesSubscription) {
      this._rowCheckboxesSubscription.unsubscribe();
    }
  }

  private _registerHeaderCheckbox(): void {
    this._unsubscribeHeaderCheckbox();
    const headerRowCheckboxIndex = this.headerCells.toArray().findIndex(_ => _._checkbox !== undefined);
    this._headerCheckbox = this.headerCells.toArray()[headerRowCheckboxIndex]._checkbox;
    this._headerCheckboxSubscription = this._headerCheckbox!.change.pipe(takeUntil(this._destroyed))
      .subscribe(_ => this._foundation.handleHeaderRowCheckboxChange());
  }

  private _registerRowCheckboxes(): void {
    this._unsubscribeRowCheckboxes();
    this._rowCheckboxesSubscription = this.rowCheckboxChanges.subscribe(event => {
      this._foundation.handleRowCheckboxChange({
        target: event.source._inputElement.nativeElement
      } as unknown as Event);
    });
  }
}
