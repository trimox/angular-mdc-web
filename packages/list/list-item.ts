import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { toBoolean } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';

/** Change event that is fired whenever the selected state of an option changes. */
export class MdcListSelectionChange {
  constructor(
    public source: MdcListItem) { }
}

let uniqueIdCounter = 0;

@Directive({
  selector: '[mdcListItemGraphic], mdc-list-item-graphic',
  exportAs: 'mdcListItemGraphic',
  host: {
    'role': 'presentation',
    'class': 'mdc-list-item__graphic',
    '[attr.aria-hidden]': 'true'
  }
})
export class MdcListItemGraphic {
  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcListItemMeta], mdc-list-item-meta',
  exportAs: 'mdcListItemMeta',
  host: {
    'class': 'mdc-list-item__meta'
  }
})
export class MdcListItemMeta {
  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdcListItemText], mdc-list-item-text',
  exportAs: 'mdcListItemText',
  host: {
    'class': 'mdc-list-item__text'
  },
  template: `
  <ng-container>
    <span class="mdc-list-item__primary-text"><ng-content></ng-content></span>
    <span class="mdc-list-item__secondary-text" *ngIf="secondaryText">{{secondaryText}}</span>
  </ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcListItemText {
  @Input() secondaryText?: string;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: '[mdcListItemSecondary], mdc-list-item-secondary',
  exportAs: 'mdcListItemSecondary',
  host: {
    'class': 'mdc-list-item__secondary-text'
  }
})
export class MdcListItemSecondary {
  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-list-item, a[mdc-list-item]',
  exportAs: 'mdcListItem',
  host: {
    'role': 'listitem',
    '[id]': 'id',
    '[tabIndex]': 'tabIndex',
    'class': 'mdc-list-item',
    '[class.mdc-list-item--selected]': 'selected',
    '[class.mdc-list-item--activated]': 'activated',
    '[class.mdc-list-item--disabled]': 'disabled'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MdcRipple]
})
export class MdcListItem implements AfterViewInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _id = `mdc-list-item-${uniqueIdCounter++}`;

  /** The unique ID of the option. */
  get id(): string { return this._id; }

  @Output() readonly selectionChange: EventEmitter<MdcListSelectionChange>
    = new EventEmitter<MdcListSelectionChange>();

  @ContentChild(MdcListItemGraphic) listItemStart!: MdcListItemGraphic;

  /** Whether the option is selected. */
  @Input()
  get selected(): boolean { return this._selected; }
  set selected(value: boolean) {
    this._selected = toBoolean(value);
    this._changeDetectorRef.markForCheck();
  }
  private _selected: boolean = false;

  /** Whether the option is activated. */
  @Input()
  get activated(): boolean { return this._activated; }
  set activated(value: boolean) {
    this._activated = toBoolean(value);
    this._changeDetectorRef.markForCheck();
  }
  private _activated: boolean = false;

  /** Whether the option is disabled. */
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
    this._changeDetectorRef.markForCheck();
  }
  private _disabled: boolean = false;

  @Input() tabIndex: number = -1;

  constructor(
    private _ngZone: NgZone,
    public ripple: MdcRipple,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this._loadListeners();
  }

  ngOnDestroy(): void {
    this.ripple.destroy();

    this._destroy.next();
    this._destroy.complete();
  }

  setInteractive(interactive: boolean): void {
    interactive ? this.ripple.init({ surface: this.getListItemElement() }) : this.ripple.destroy();
  }

  focus(): void {
    this.getListItemElement().focus();
  }

  setRole(role: string): void {
    this.getListItemElement().setAttribute('role', role);
  }

  getListItemElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  private _loadListeners(): void {
    this._ngZone.runOutsideAngular(() =>
      fromEvent<MouseEvent>(this.getListItemElement(), 'click').pipe(takeUntil(this._destroy))
        .subscribe(() => this._ngZone.run(() => this._emitChangeEvent())));
  }

  /** Emits a change event if the selected state of an option changed. */
  private _emitChangeEvent(): void {
    this.selectionChange.emit(new MdcListSelectionChange(this));
  }
}
