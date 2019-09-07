import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {coerceBooleanProperty} from '@angular/cdk/coercion';
import {ENTER, SPACE} from '@angular/cdk/keycodes';

import {MDCRippleFoundation, MDCRippleAdapter} from '@material/ripple';

import {MdcRipple, MDCRippleCapableSurface} from '@angular-mdc/web/ripple';

/** Change event that is fired whenever the selected state of an option changes. */
export class MdcListSelectionChange {
  constructor(
    public source: MdcListItem) {}
}

/**
 * Describes a parent MdcList component.
 * Contains properties that MdcListItem can inherit.
 */
export interface MdcListParentComponent {
  disableRipple: boolean;
}

/**
 * Injection token used to provide the parent MdcList component to MdcListItem.
 */
export const MDC_LIST_PARENT_COMPONENT =
  new InjectionToken<MdcListParentComponent>('MDC_LIST_PARENT_COMPONENT');

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
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Directive({
  selector: '[mdcListItemMeta], mdc-list-item-meta',
  exportAs: 'mdcListItemMeta',
  host: {'class': 'mdc-list-item__meta'}
})
export class MdcListItemMeta {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Component({
  moduleId: module.id,
  selector: '[mdcListItemText], mdc-list-item-text',
  exportAs: 'mdcListItemText',
  host: {'class': 'mdc-list-item__text'},
  template: `
  <ng-container>
    <span class="mdc-list-item__primary-text"><ng-content></ng-content></span>
    <span class="mdc-list-item__secondary-text" *ngIf="secondaryText">{{secondaryText}}</span>
  </ng-container>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcListItemText {
  @Input() secondaryText?: string;

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Directive({
  selector: '[mdcListItemSecondary], mdc-list-item-secondary',
  exportAs: 'mdcListItemSecondary',
  host: {'class': 'mdc-list-item__secondary-text'}
})
export class MdcListItemSecondary {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
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
    '[class.mdc-list-item--disabled]': 'disabled',
    '(click)': '_emitChangeEvent()',
    '(keydown)': '_onKeydown($event)'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MdcRipple]
})
export class MdcListItem implements OnDestroy, MDCRippleCapableSurface {
  private _id = `mdc-list-item-${uniqueIdCounter++}`;

  _root!: Element;

  /** The unique ID of the list item. */
  get id(): string {
    return this._id;
  }

  @Input() value: any;
  @Input() tabIndex: number = -1;

  /** Whether the list item is selected. */
  @Input()
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._selected) {
      this._selected = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }
  private _selected: boolean = false;

  /** Whether the list item is activated. */
  @Input()
  get activated(): boolean {
    return this._activated;
  }
  set activated(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._activated) {
      this._activated = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }
  private _activated: boolean = false;

  /** Whether the list item is disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);
    if (newValue !== this._disabled) {
      this._disabled = newValue;
      this._changeDetectorRef.markForCheck();
    }
  }
  private _disabled: boolean = false;

  @Output() readonly selectionChange: EventEmitter<MdcListSelectionChange>
    = new EventEmitter<MdcListSelectionChange>();

  constructor(
    public ripple: MdcRipple,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    @Optional() @Inject(MDC_LIST_PARENT_COMPONENT) private _parent: MdcListParentComponent) {
    this._root = this.elementRef.nativeElement;
    this.ripple = this._createRipple();
    this.ripple.init();
  }

  ngOnDestroy(): void {
    this.ripple.destroy();
  }

  private _createRipple(): MdcRipple {
    const adapter: MDCRippleAdapter = {
      ...MdcRipple.createAdapter(this),
      isSurfaceDisabled: () => this._disabled || this._parent.disableRipple
    };
    return new MdcRipple(this.elementRef, new MDCRippleFoundation(adapter));
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

  _onKeydown(evt: KeyboardEvent): void {
    if (evt.keyCode === ENTER || evt.keyCode === SPACE) {
      this._emitChangeEvent();
    }
  }

  /** Emits a change event if the selected state of an option changed. */
  _emitChangeEvent(): void {
    if (this._disabled) {
      return;
    }

    this.selectionChange.emit(new MdcListSelectionChange(this));
  }
}
