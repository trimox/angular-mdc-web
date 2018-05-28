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
  OnDestroy,
  Output,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import {
  toBoolean,
  EventRegistry
} from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';

/** Change event that is fired whenever the selected state of an option changes. */
export class MdcListSelectionChange {
  constructor(
    public source: MdcListItem) { }
}

let uniqueIdCounter = 0;

@Directive({
  selector: '[mdcListItemGraphic], [mdc-list-item-graphic], mdc-list-item-graphic',
  exportAs: 'mdcListItemGraphic',
})
export class MdcListItemGraphic {
  @HostBinding('class.mdc-list-item__graphic') isHostClass = true;
  @HostBinding('attr.aria-hidden') ariaHidden: string = 'true';

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcListItemMeta], [mdc-list-item-meta], mdc-list-item-meta',
  exportAs: 'mdcListItemMeta',
})
export class MdcListItemMeta {
  @HostBinding('class.mdc-list-item__meta') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcListItemText], [mdc-list-item-text], mdc-list-item-text',
  exportAs: 'mdcListItemText',
})
export class MdcListItemText {
  @HostBinding('class.mdc-list-item__text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcListItemSecondary], [mdc-list-item-secondary], mdc-list-item-secondary',
  exportAs: 'mdcListItemSecondary',
})
export class MdcListItemSecondary {
  @HostBinding('class.mdc-list-item__secondary-text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-list-item, a[mdc-list-item]',
  exportAs: 'mdcListItem',
  host: {
    '[id]': 'id',
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    EventRegistry,
    MdcRipple
  ]
})
export class MdcListItem implements OnDestroy {
  private _id = `mdc-list-item-${uniqueIdCounter++}`;

  /** The unique ID of the option. */
  get id(): string { return this._id; }

  @HostBinding('class.mdc-list-item') isHostClass = true;
  @HostBinding('attr.role') role: string = 'listitem';
  @HostBinding('class.mdc-list-item--selected') get classSelected(): string {
    return this.selected ? 'mdc-list-item--selected' : '';
  }

  @Output() readonly selectionChange: EventEmitter<MdcListSelectionChange>
    = new EventEmitter<MdcListSelectionChange>();
  @ContentChild(MdcListItemGraphic) listItemStart: MdcListItemGraphic;

  @HostListener('click', ['$event']) onclick() {
    this.setSelected(!this.selected);
    this._emitChangeEvent();
  }

  /** Whether the option is selected. */
  @Input()
  get selected(): boolean { return this._selected; }
  set selected(value: boolean) {
    this.setSelected(value);
  }
  private _selected: boolean;

  /** Sets the selected state of the option. */
  setSelected(selected: boolean): void {
    this._selected = selected;
    this._changeDetector.markForCheck();
  }

  constructor(
    public ripple: MdcRipple,
    private _changeDetector: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  ngOnDestroy(): void {
    this.ripple.destroy();
  }

  _getHostElement(): any {
    return this.elementRef.nativeElement;
  }

  /** Emits a change event if the selected state of an option changed. */
  private _emitChangeEvent(): void {
    this.selectionChange.emit(new MdcListSelectionChange(this));
  }
}
