import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean } from '@angular-mdc/web/common';

/** Change event that is fired whenever the selected state of an option changes. */
export class MdcListSelectionChange {
  constructor(
    public source: MdcListItem) { }
}

let uniqueIdCounter = 0;

@Directive({
  selector: '[mdc-list-item-graphic], mdc-list-item-graphic'
})
export class MdcListItemGraphic {
  @HostBinding('class.mdc-list-item__start-detail') isHostClass = true;
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-list-item-meta], mdc-list-item-meta'
})
export class MdcListItemMeta {
  @HostBinding('class.mdc-list-item__end-detail') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-list-item-text], mdc-list-item-text'
})
export class MdcListItemText {
  @HostBinding('class.mdc-list-item__text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdc-list-item-secondary], mdc-list-item-secondary'
})
export class MdcListItemSecondaryText {
  @HostBinding('class.mdc-list-item__secondary-text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-list-item, a[mdc-list-item]',
  host: {
    '[id]': 'id',
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcListItem {
  private _selected: boolean = false;
  private _id = `mdc-list-item-${uniqueIdCounter++}`;

  /** The unique ID of the option. */
  get id(): string { return this._id; }

  @HostBinding('class.mdc-list-item') isHostClass = true;
  @HostBinding('attr.role') role: string = 'listitem';
  @Output() onSelectionChange: EventEmitter<MdcListSelectionChange>
    = new EventEmitter<MdcListSelectionChange>();
  @ContentChild(MdcListItemGraphic) listItemStart: MdcListItemGraphic;
  @HostListener('click', ['$event']) onclick() {
    this._setSelected(true);
    this.onSelectionChange.emit(new MdcListSelectionChange(this));
  }

  /** Whether the option is selected. */
  @Input()
  get selected(): boolean { return this._selected; }
  set selected(value: boolean) {
    const isSelected = toBoolean(value);

    if (isSelected !== this._selected) {
      this._setSelected(isSelected);
      this._emitChangeEvent();
    }
  }

  /** Selects the option. */
  select(): void {
    this._selected = true;
    this._renderer.addClass(this._getHostElement(), 'mdc-list-item--activated');
  }

  /** Deselects the option. */
  deselect(): void {
    this._selected = false;
    this._renderer.removeClass(this._getHostElement(), 'mdc-list-item--activated');
  }

  /** Toggles the selection state of the option. */
  toggle(): void {
    this.selected = !this.selected;
  }

  /** Sets the selected state of the option. */
  private _setSelected(selected: boolean) {
    if (selected === this._selected) {
      return;
    }

    selected ? this.select() : this.deselect();
    this._changeDetector.markForCheck();
  }

  constructor(
    private _changeDetector: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  _getHostElement() {
    return this.elementRef.nativeElement;
  }

  /** Emits a change event if the selected state of an option changed. */
  private _emitChangeEvent() {
    this.onSelectionChange.emit(new MdcListSelectionChange(this));
  }
}
