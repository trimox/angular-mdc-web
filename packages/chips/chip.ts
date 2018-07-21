import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';

import {
  toBoolean,
  isBrowser,
  EventRegistry
} from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcIcon } from '@angular-mdc/web/icon';

import { MDCChipAdapter } from '@material/chips/chip/adapter';
import { MDCChipFoundation } from '@material/chips/chip';

/** Represents an event fired on an individual `mdc-chip`. */
export interface MdcChipEvent {
  /** Reference to MdcChip that emitted the event. */
  chip: MdcChip;
}

/** Event object emitted by MdcChip when selected or deselected. */
export class MdcChipSelectionEvent {
  constructor(
    /** Reference to the chip that emitted the event. */
    public source: MdcChip) { }
}

let nextUniqueId = 0;

@Component({
  moduleId: module.id,
  selector: 'mdc-chip-icon, [mdc-chip-icon], [mdcChipIcon]',
  template: '<ng-content></ng-content>',
  exportAs: 'mdcChipIcon',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcChipIcon extends MdcIcon {
  @HostBinding('class.mdc-chip__icon') isHostClass = true;
  @HostBinding('class.mdc-chip__icon--leading') get classIconLeading(): string {
    return this.leading ? 'mdc-chip__icon--leading' : '';
  }
  @HostBinding('class.mdc-chip__icon--trailing') get classIconTrailing(): string {
    this.setClickable(this.trailing);
    return this.trailing ? 'mdc-chip__icon--trailing' : '';
  }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-chip-checkmark',
  exportAs: 'mdcChipCheckmark',
  template: `
  <div class="mdc-chip__checkmark">
    <svg class="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
      <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
    </svg>
  </div>
  `
})
export class MdcChipCheckmark { }

@Component({
  moduleId: module.id,
  selector: 'mdc-chip-text, [mdcChipText]',
  exportAs: 'mdcChipText',
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None
})
export class MdcChipText {
  @HostBinding('class.mdc-chip__text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-chip',
  host: {
    '[id]': 'id'
  },
  exportAs: 'mdcChip',
  template: `
  <ng-content *ngIf="isLeadingIconVisibile()" select="mdc-chip-icon[leading]"></ng-content>
  <mdc-chip-checkmark *ngIf="filter"></mdc-chip-checkmark>
  <div class="mdc-chip__text" *ngIf="label">{{label}}</div>
  <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    MdcRipple,
    EventRegistry
  ]
})
export class MdcChip implements AfterContentInit, OnDestroy {
  private _id = `mdc-chip-${nextUniqueId++}`;

  @Input() label: string;

  get selected(): boolean { return this._selected; }
  set selected(value: boolean) {
    this.setSelected(value);
  }
  protected _selected: boolean;

  get filter(): boolean { return this._filter; }
  set filter(value: boolean) {
    this._filter = toBoolean(value);
    this._changeDetectorRef.markForCheck();
  }
  protected _filter: boolean;

  @Input()
  get primary(): boolean { return this._primary; }
  set primary(value: boolean) {
    this.setPrimary(value);
  }
  protected _primary: boolean;

  @Input()
  get secondary(): boolean { return this._secondary; }
  set secondary(value: boolean) {
    this.setSecondary(value);
  }
  protected _secondary: boolean;

  /**
    * Determines whether or not the chip displays the remove styling and emits (removed) events.
    */
  @Input()
  get removable(): boolean { return this._removable; }
  set removable(value: boolean) {
    this.setRemovable(value);
  }
  protected _removable: boolean = true;

  /** Whether the chip has focus. */
  _hasFocus: boolean = false;

  /** The unique ID of the option. */
  get id(): string { return this._id; }

  /** Whether the chip is disabled. */
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
  }
  protected _disabled: boolean;

  /** Emits when the chip is focused. */
  readonly _onFocus = new Subject<MdcChipEvent>();

  /** Emits when the chip is blured. */
  readonly _onBlur = new Subject<MdcChipEvent>();

  /** Emitted when the chip is destroyed. */
  @Output() readonly destroyed: EventEmitter<MdcChipEvent> = new EventEmitter<MdcChipEvent>();

  /** Emitted when the chip is selected or deselected. */
  @Output() readonly selectionChange: EventEmitter<MdcChipSelectionEvent> = new EventEmitter<MdcChipSelectionEvent>();

  /** Emitted when the chip is selected or deselected. */
  @Output() readonly trailingIconInteraction: EventEmitter<void> = new EventEmitter<void>();

  /** Emitted when a chip is to be removed. */
  @Output() readonly removed: EventEmitter<MdcChipEvent> = new EventEmitter<MdcChipEvent>();

  @HostBinding('class.mdc-chip') isHostClass = true;
  @HostBinding('attr.tabindex') get tabindex(): number | null {
    return this.disabled ? null : 0;
  }
  @HostBinding('class.ng-mdc-chip--primary') get classPrimary(): string {
    return this.primary ? 'ng-mdc-chip--primary' : '';
  }
  @HostBinding('class.ng-mdc-chip--secondary') get classSecondary(): string {
    return this.secondary ? 'ng-mdc-chip--secondary' : '';
  }

  @HostListener('focus') onfocus() {
    this._hasFocus = true;
  }
  @HostListener('blur') onblur() {
    this._blur();
  }

  @ContentChild(MdcChipText) chipText: MdcChipText;
  @ContentChildren(MdcChipIcon) icons: QueryList<MdcChipIcon>;

  private _mdcAdapter: MDCChipAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    addClassToLeadingIcon: (className: string) => {
      const leadingIcon = this.getLeadingIcon();
      if (leadingIcon) {
        leadingIcon.elementRef.nativeElement.classList.add(className);
      }
    },
    removeClassFromLeadingIcon: (className: string) => {
      const leadingIcon = this.getLeadingIcon();
      if (leadingIcon) {
        leadingIcon.elementRef.nativeElement.classList.remove(className);
      }
    },
    eventTargetHasClass: (target: HTMLElement, className: string) => target.classList.contains(className),
    registerEventHandler: (evtType: string, handler: EventListener) => this._registry.listen(evtType, handler, this._getHostElement()),
    deregisterEventHandler: (evtType: string, handler: EventListener) => this._registry.unlisten(evtType, handler),
    registerInteractionHandler: (evtType: string, handler: EventListener) =>
      this._registry.listen(evtType, handler, this._getHostElement()),
    deregisterInteractionHandler: (evtType: string, handler: EventListener) => this._registry.unlisten(evtType, handler),
    registerTrailingIconInteractionHandler: (evtType: string, handler: EventListener) => {
      if (this.icons) {
        const trailingIcon = this.icons.find((_: MdcChipIcon) => _.isTrailing());

        if (trailingIcon) {
          this._registry.listen(evtType, handler, trailingIcon.elementRef.nativeElement);
        }
      }
    },
    deregisterTrailingIconInteractionHandler: (evtType: string, handler: EventListener) => this._registry.unlisten(evtType, handler),
    notifyInteraction: () => this._emitSelectionChangeEvent(),
    notifyTrailingIconInteraction: () => this.trailingIconInteraction.emit(),
    notifyRemoval: () => this.removed.emit({ chip: this }),
    getComputedStyleValue: (propertyName: string) => {
      if (isBrowser()) {
        window.getComputedStyle(this._getHostElement()).getPropertyValue(propertyName);
      }
    },
    setStyleProperty: (propertyName: string, value: string) => this._getHostElement().style.setProperty(propertyName, value)
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    setSelected(selected: boolean): void,
    isSelected(): boolean,
    setShouldRemoveOnTrailingIconClick(shouldRemove: boolean): void,
    beginExit(): void
  } = new MDCChipFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _ripple: MdcRipple,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterContentInit(): void {
    this._ripple.attachTo(this._getHostElement());

    this._foundation.init();
  }

  ngOnDestroy(): void {
    if (!this.removable) {
      this._foundation.beginExit();
    }

    this._ripple.destroy();
    this.destroyed.emit({ chip: this });
    this._foundation.destroy();
  }

  setSelected(selected: boolean): void {
    this._selected = toBoolean(selected);
    this._foundation.setSelected(selected);

    this._changeDetectorRef.markForCheck();
  }

  isSelected(): boolean {
    return this._foundation.isSelected();
  }

  setPrimary(primary: boolean): void {
    if (primary) {
      this.setSecondary(false);
    }

    this._primary = toBoolean(primary);
  }

  setSecondary(secondary: boolean): void {
    if (secondary) {
      this.setPrimary(false);
    }

    this._secondary = toBoolean(secondary);
  }

  setRemovable(removable: boolean): void {
    this._removable = toBoolean(removable);
    this._foundation.setShouldRemoveOnTrailingIconClick(removable);
    this._changeDetectorRef.markForCheck();
  }

  /** Allows for programmatic focusing of the chip. */
  focus(): void {
    this._getHostElement().focus();
    this._onFocus.next({ chip: this });
  }

  /**
   * Allows for programmatic removal of the chip. Called by the MdcChipSet when the DELETE or
   * BACKSPACE keys are pressed.
   *
   * Informs any listeners of the removal request. Does not remove the chip from the DOM.
   */
  remove(): void {
    this.removed.emit({ chip: this });
  }

  isLeadingIconVisibile(): boolean {
    return this.filter && this.selected ? false : true;
  }

  getLeadingIcon(): MdcChipIcon | undefined {
    if (this.icons) {
      return this.icons.find((_: MdcChipIcon) => _.isLeading());
    }
  }

  private _blur(): void {
    this._onBlur.next({ chip: this });
  }

  /** Retrieves the DOM element of the component host. */
  protected _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(): void {
    this.selectionChange.emit({ source: this });
  }
}
