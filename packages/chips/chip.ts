import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { defer, merge, Observable, Subject } from 'rxjs';
import { startWith, switchMap, take, takeUntil } from 'rxjs/operators';

import {
  toBoolean,
  Platform
} from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcIcon } from '@angular-mdc/web/icon';

import { MDCChipAdapter } from '@material/chips/chip/adapter';
import { MDCChipFoundation } from '@material/chips/chip';

export interface MdcIconInteraction {
  source: MdcChipIcon;
  event: Event;
}

export interface MdcChipInteractionEvent {
  detail: {
    chip: MdcChip;
  };
}

let nextUniqueId = 0;

@Component({
  moduleId: module.id,
  selector: 'mdc-chip-icon, [mdc-chip-icon], [mdcChipIcon]',
  exportAs: 'mdcChipIcon',
  host: {
    'class': 'mdc-chip__icon',
    '[class.mdc-chip__icon--leading]': 'leading',
    '[class.mdc-chip__icon--trailing]': 'trailing'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcChipIcon extends MdcIcon {
  @Input()
  get leading(): boolean { return this._leading; }
  set leading(value: boolean) {
    this._leading = toBoolean(value);
  }
  private _leading: boolean;

  @Input()
  get trailing(): boolean { return this._trailing; }
  set trailing(value: boolean) {
    this._trailing = toBoolean(value);
  }
  private _trailing: boolean;

  @Output() readonly iconInteraction: EventEmitter<MdcIconInteraction> =
    new EventEmitter<MdcIconInteraction>();

  @HostListener('click', ['$event']) onclick(evt: Event) {
    this.iconInteraction.emit({ source: this, event: evt });
  }
  @HostListener('keydown', ['$event']) onkeydown(evt: KeyboardEvent) {
    this.iconInteraction.emit({ source: this, event: evt });
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
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcChipCheckmark { }

@Component({
  moduleId: module.id,
  selector: 'mdc-chip-text, [mdcChipText]',
  exportAs: 'mdcChipText',
  host: {
    'class': 'mdc-chip__text'
  },
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcChipText {
  constructor(public elementRef: ElementRef<HTMLElement>) { }
}

@Component({
  moduleId: module.id,
  selector: 'mdc-chip',
  exportAs: 'mdcChip',
  host: {
    '[id]': 'id',
    '[attr.tabindex]': 'disabled ? null : 0',
    'class': 'mdc-chip',
    '[class.ng-mdc-chip--primary]': 'primary',
    '[class.ng-mdc-chip--secondary]': 'secondary'
  },
  template: `
  <ng-container [ngSwitch]="filter">
    <ng-container [ngSwitch]="selected" *ngSwitchCase="true">
      <mdc-chip-checkmark *ngSwitchCase="true"></mdc-chip-checkmark>
      <ng-container *ngSwitchDefault>
        <ng-container *ngTemplateOutlet="leadingIcon"></ng-container>
      </ng-container>
    </ng-container>
    <ng-container *ngTemplateOutlet="leadingIcon"></ng-container>
  </ng-container>
  <ng-template #leadingIcon><ng-content select="mdc-chip-icon[leading]"></ng-content></ng-template>
  <div class="mdc-chip__text" *ngIf="label">{{label}}</div>
  <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MdcRipple]
})
export class MdcChip implements AfterContentInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _id = `mdc-chip-${nextUniqueId++}`;

  /** The unique ID of the option. */
  get id(): string { return this._id; }

  get leadingIcon(): MdcIcon | undefined {
    return this.icons ? this.icons.find((_: MdcChipIcon) => _.leading) : undefined;
  }

  @Input() label: string;

  get selected(): boolean { return this._foundation.isSelected(); }
  set selected(value: boolean) {
    this._foundation.setSelected(toBoolean(value));
    this._changeDetectorRef.markForCheck();
  }

  get filter(): boolean { return this._filter; }
  set filter(value: boolean) {
    this._filter = toBoolean(value);
    this._changeDetectorRef.markForCheck();
  }
  private _filter: boolean;

  @Input()
  get primary(): boolean { return this._primary; }
  set primary(value: boolean) {
    this.setPrimary(value);
  }
  private _primary: boolean;

  @Input()
  get secondary(): boolean { return this._secondary; }
  set secondary(value: boolean) {
    this.setSecondary(value);
  }
  private _secondary: boolean;

  /**
    * Determines whether or not the chip displays the remove styling and emits (removed) events.
    */
  @Input()
  get removable(): boolean { return this._removable; }
  set removable(value: boolean) {
    this._removable = toBoolean(value);
    this._foundation.setShouldRemoveOnTrailingIconClick(this._removable);
    this._changeDetectorRef.markForCheck();
  }
  private _removable: boolean;

  /** Whether the chip is disabled. */
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
  }
  private _disabled: boolean;

  /** Emitted when the chip is selected or deselected. */
  @Output() readonly selectionChange: EventEmitter<MdcChipInteractionEvent> = new EventEmitter<MdcChipInteractionEvent>();

  /** Emitted when the chip icon is interacted with. */
  @Output() readonly trailingIconInteraction: EventEmitter<void> = new EventEmitter<void>();

  /** Emitted when a chip is to be removed. */
  @Output() readonly removed: EventEmitter<MdcChipInteractionEvent> = new EventEmitter<MdcChipInteractionEvent>();

  @HostListener('transitionend', ['$event']) ontransitionend(evt: Event) {
    this._foundation.handleTransitionEnd(evt);
  }
  @HostListener('click', ['$event']) onclick(evt: Event) {
    this._foundation.handleInteraction(evt);
  }
  @HostListener('keydown', ['$event']) onkeydown(evt: KeyboardEvent) {
    this._foundation.handleInteraction(evt);
  }

  @ContentChild(MdcChipText) chipText: MdcChipText;
  @ContentChildren(MdcChipIcon, { descendants: true }) icons: QueryList<MdcChipIcon>;

  /** Combined stream of all of the icon events. */
  readonly chipIconInteractions: Observable<MdcIconInteraction> = defer(() => {
    if (this.icons) {
      return merge(...this.icons.map(icon => icon.iconInteraction));
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(take(1), switchMap(() => this.chipIconInteractions));
  });

  private _mdcAdapter: MDCChipAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    hasClass: (className: string) => this._getHostElement().classList.contains(className),
    addClassToLeadingIcon: (className: string) => {
      if (this.leadingIcon) {
        this.leadingIcon.elementRef.nativeElement.classList.add(className);
      }
    },
    removeClassFromLeadingIcon: (className: string) => {
      if (this.leadingIcon) {
        this.leadingIcon.elementRef.nativeElement.classList.remove(className);
      }
    },
    eventTargetHasClass: (target: HTMLElement, className: string) => target.classList.contains(className),
    notifyInteraction: () => this._emitSelectionChangeEvent(),
    notifyTrailingIconInteraction: () => this.trailingIconInteraction.emit(),
    notifyRemoval: () => this.removed.emit({ detail: { chip: this } }),
    getComputedStyleValue: (propertyName: string) => {
      if (this._platform.isBrowser) {
        window.getComputedStyle(this._getHostElement()).getPropertyValue(propertyName);
      }
    },
    setStyleProperty: (propertyName: string, value: string) => this._getHostElement().style.setProperty(propertyName, value)
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    beginExit(): void,
    setSelected(selected: boolean): void,
    isSelected(): boolean,
    setShouldRemoveOnTrailingIconClick(shouldRemove: boolean): void,
    handleInteraction(evt: Event): void,
    handleTransitionEnd(evt: Event): void,
    handleTrailingIconInteraction(evt: Event): void
  } = new MDCChipFoundation(this._mdcAdapter);

  constructor(
    private _platform: Platform,
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    private _ripple: MdcRipple,
    public elementRef: ElementRef<HTMLElement>) { }

  ngAfterContentInit(): void {
    this._ripple.attachTo(this._getHostElement());

    this._foundation.init();

    this.chipIconInteractions.pipe(
      takeUntil(merge(this._destroy, this.icons.changes))
    ).subscribe((event: MdcIconInteraction) => {
      if (event.source.trailing) {
        this._foundation.handleTrailingIconInteraction(event.event);
        this.removed.emit({ detail: { chip: this } });
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    this._ripple.destroy();

    if (this._foundation) {
      this._foundation.destroy();
    }
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

  /** Allows for programmatic focusing of the chip. */
  focus(): void {
    this._getHostElement().focus();
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(): void {
    this.selectionChange.emit({ detail: { chip: this } });
  }

  /** Retrieves the DOM element of the component host. */
  protected _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
