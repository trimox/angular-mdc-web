import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, merge, Observable, Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import {
  toBoolean,
  Platform
} from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcIcon } from '@angular-mdc/web/icon';

import { MDCChipFoundation } from '@material/chips/chip/index';

export interface MdcChipInteractionEvent {
  detail: {
    chipId: string
  };
}

export interface MdcChipSelectionEvent {
  detail: {
    chipId: string,
    selected: boolean;
  };
}

export interface MdcChipRemovedEvent {
  detail: {
    chipId: string,
    root: MdcChip;
  };
}

const CHIP_INTERACTION_EVENTS = [
  'keydown',
  'click'
];

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
}

@Component({
  moduleId: module.id,
  selector: 'mdc-chip-checkmark',
  exportAs: 'mdcChipCheckmark',
  template: `
  <div class="mdc-chip__checkmark">
    <svg
      class="mdc-chip__checkmark-svg"
      viewBox="-2 -3 30 30"
      focusable="false">
      <path class="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
    </svg>
  </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MdcChipCheckmark { }

@Directive({
  selector: 'mdc-chip-text, [mdcChipText]',
  host: { 'class': 'mdc-chip__text' }
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
export class MdcChip implements AfterViewInit, OnDestroy {
  /** Emits whenever the component is destroyed. */
  private _destroy = new Subject<void>();

  private _id = `mdc-chip-${nextUniqueId++}`;

  /** The unique ID of the option. */
  get id(): string { return this._id; }

  get leadingIcon(): MdcChipIcon | undefined {
    return this.icons ? this.icons.find((_: MdcChipIcon) => _.leading) : undefined;
  }

  @Input() label: string;

  @Input()
  get selected(): boolean { return this._selected; }
  set selected(value: boolean) {
    this._selected = toBoolean(value);
    this._foundation.setSelected(this._selected);
    this._changeDetectorRef.markForCheck();
  }
  private _selected: boolean;

  get filter(): boolean { return this._filter; }
  set filter(value: boolean) {
    this._filter = toBoolean(value);
    this._changeDetectorRef.markForCheck();
  }
  private _filter: boolean;

  choice: boolean;
  input: boolean;

  @Input()
  get primary(): boolean { return this._primary; }
  set primary(value: boolean) {
    this._primary = toBoolean(value);
  }
  private _primary: boolean;

  @Input()
  get secondary(): boolean { return this._secondary; }
  set secondary(value: boolean) {
    this._secondary = toBoolean(value);
  }
  private _secondary: boolean;

  /** Determines whether or not the chip displays the remove styling and emits (removed) events. */
  @Input()
  get removable(): boolean { return this._removable; }
  set removable(value: boolean) {
    this._removable = toBoolean(value);
    this._foundation.setShouldRemoveOnTrailingIconClick(this._removable);
    this._changeDetectorRef.markForCheck();
  }
  private _removable: boolean = true;

  /** Whether the chip is disabled. */
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = toBoolean(value);
  }
  private _disabled: boolean;

  /** Emitted when the chip is selected or deselected. */
  @Output() readonly selectionChange: EventEmitter<MdcChipSelectionEvent> =
    new EventEmitter<MdcChipSelectionEvent>();

  /** Emitted when the chip icon is interacted with. */
  @Output() readonly trailingIconInteraction: EventEmitter<MdcChipInteractionEvent> =
    new EventEmitter<MdcChipInteractionEvent>();

  /** Emitted when a chip is to be removed. */
  @Output() readonly removed: EventEmitter<MdcChipRemovedEvent> =
    new EventEmitter<MdcChipRemovedEvent>();

  private _chipInteractionEventSubscription: Subscription;
  private _chipIconInteractionEventSubscription: Subscription;

  /** Combined stream of all of the chip interaction events. */
  get chipInteractionEvents(): Observable<any> {
    return merge(...CHIP_INTERACTION_EVENTS.map(evt => fromEvent(this._getHostElement(), evt)));
  }

  /** Combined stream of all of the chip icon events. */
  get chipIconInteractionEvents(): Observable<any> | undefined {
    const icon = this.icons.find(_ => _.trailing);
    if (!icon) { return; }
    return merge(...CHIP_INTERACTION_EVENTS.map(evt => fromEvent(icon.elementRef.nativeElement, evt)));
  }

  @ContentChild(MdcChipText) chipText: MdcChipText;
  @ContentChildren(MdcChipIcon, { descendants: true }) icons: QueryList<MdcChipIcon>;

  createAdapter() {
    return {
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
      notifyTrailingIconInteraction: () => this.trailingIconInteraction.emit({ detail: { chipId: this.id } }),
      notifyRemoval: () => this.removed.emit({ detail: { chipId: this.id, root: this } }),
      getComputedStyleValue: (propertyName: string) => {
        if (this._platform.isBrowser) {
          window.getComputedStyle(this._getHostElement()).getPropertyValue(propertyName);
        }
      },
      setStyleProperty: (propertyName: string, value: string) => this._getHostElement().style.setProperty(propertyName, value)
    };
  }

  private _foundation: {
    init(): void,
    destroy(): void,
    beginExit(): void,
    setSelected(selected: boolean): void,
    setShouldRemoveOnTrailingIconClick(shouldRemove: boolean): void,
    handleInteraction(evt: Event): void,
    handleTransitionEnd(evt: TransitionEvent): void,
    handleTrailingIconInteraction(evt: Event): void
  } = new MDCChipFoundation(this.createAdapter());

  constructor(
    private _platform: Platform,
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
    private _ripple: MdcRipple,
    public elementRef: ElementRef<HTMLElement>) { }

  ngAfterViewInit(): void {
    this._foundation.init();
    this._ripple.init({ surface: this._getHostElement() });
    this._loadListeners();
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();

    if (this._chipInteractionEventSubscription) {
      this._chipInteractionEventSubscription.unsubscribe();
    }
    if (this._chipIconInteractionEventSubscription) {
      this._chipIconInteractionEventSubscription.unsubscribe();
    }

    this._ripple.destroy();

    if (this._foundation) {
      this._foundation.destroy();
    }
  }

  private _loadListeners(): void {
    this._chipInteractionEventSubscription = this.chipInteractionEvents.pipe()
      .subscribe(evt => {
        this.selected = !this.selected;
        this._foundation.handleInteraction(evt);
      });

    if (this.chipIconInteractionEvents) {
      this._chipIconInteractionEventSubscription = this.chipIconInteractionEvents.pipe()
        .subscribe(evt => {
          if (this.removable) {
            this.removed.emit({ detail: { chipId: this.id, root: this } });
          }
          this._foundation.handleTrailingIconInteraction(evt);
        });
    }

    this._ngZone.runOutsideAngular(() =>
      fromEvent<TransitionEvent>(this._getHostElement(), 'transitionend')
        .pipe(takeUntil(this._destroy), filter((e: TransitionEvent) =>
          e.target === this._getHostElement()))
        .subscribe(evt => this._ngZone.run(() => this._foundation.handleTransitionEnd(evt))));
  }

  /** Allows for programmatic focusing of the chip. */
  focus(): void {
    this._getHostElement().focus();
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(): void {
    this.selectionChange.emit({ detail: { chipId: this.id, selected: this.selected } });
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
