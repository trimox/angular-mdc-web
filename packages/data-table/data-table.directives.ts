import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {MdcCheckbox} from '@angular-mdc/web/checkbox';

let uniqueIdCounter = 0;

@Directive({
  selector: '[mdcDataTableTable]',
  exportAs: 'mdcDataTableTable',
  host: {'class': 'mdc-data-table__table'}
})
export class MDCDataTableTable {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Directive({
  selector: '[mdcDataTableHeaderRow]',
  exportAs: 'mdcDataTableHeaderRow',
  host: {'class': 'mdc-data-table__header-row'}
})
export class MDCDataTableHeaderRow {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Component({
  selector: '[mdcDataTableHeaderCell]',
  exportAs: 'mdcDataTableHeaderCell',
  host: {
    'role': 'columnheader',
    'scope': 'col',
    'class': 'mdc-data-table__header-cell',
    '[class.mdc-data-table__header-cell--checkbox]': '!!_checkbox',
    '[class.mdc-data-table__header-cell--numeric]': 'numeric'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MDCDataTableHeaderCell {
  @Input()
  get numeric(): boolean {
    return this._numeric;
  }
  set numeric(value: boolean) {
    this._numeric = coerceBooleanProperty(value);
  }
  private _numeric: boolean = false;

  @ContentChild(MdcCheckbox, {static: false}) _checkbox?: MdcCheckbox;

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Directive({
  selector: '[mdcDataTableContent]',
  exportAs: 'mdcDataTableContent',
  host: {'class': 'mdc-data-table__content'}
})
export class MDCDataTableContent {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Component({
  selector: '[mdcDataTableRow]',
  exportAs: 'mdcDataTableRow',
  host: {
    '[attr.data-row-id]': 'id',
    'class': 'mdc-data-table__row',
    '[class.mdc-data-table__row-checkbox]': '!!_checkbox',
    '[class.mdc-data-table__row--selected]': 'selected'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MDCDataTableRow {
  private _id = `mdc-data-table-row-${uniqueIdCounter++}`;

  /** The unique ID of the row. */
  get id(): string {
    return this._id;
  }

  @ContentChild(MdcCheckbox, {static: false}) _checkbox?: MdcCheckbox;

  @Input()
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: boolean) {
    this._selected = coerceBooleanProperty(value);
  }
  private _selected: boolean = false;

  constructor(public elementRef: ElementRef<HTMLElement>) {}

  getNativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}

@Component({
  selector: '[mdcDataTableCell]',
  exportAs: 'mdcDataTableCell',
  host: {
    'class': 'mdc-data-table__cell',
    '[class.mdc-data-table__cell--checkbox]': 'checkbox',
    '[class.mdc-data-table__cell--numeric]': 'numeric'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MDCDataTableCell {
  @Input()
  get checkbox(): boolean {
    return this._checkbox;
  }
  set checkbox(value: boolean) {
    this._checkbox = coerceBooleanProperty(value);
  }
  private _checkbox: boolean = false;

  @Input()
  get numeric(): boolean {
    return this._numeric;
  }
  set numeric(value: boolean) {
    this._numeric = coerceBooleanProperty(value);
  }
  private _numeric: boolean = false;

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
