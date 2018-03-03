import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean, EventRegistry } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/ripple';
import { MdcIcon } from '@angular-mdc/web/icon';

import { MDCTabAdapter } from './adapter';
import { MDCTabFoundation } from '@material/tabs';

export interface MdcTabSelected {
  tab: MdcTab;
}

@Directive({
  selector: '[mdc-tab-icon-text], mdc-tab-icon-text',
  exportAs: 'mdcTabIconText'
})
export class MdcTabIconText {
  @HostBinding('class.mdc-tab__icon-text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdc-tab], mdc-tab',
  exportAs: 'mdcTab',
  template: '<ng-content></ng-content>',
  providers: [
    MdcRipple,
    EventRegistry
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcTab implements OnInit, OnDestroy {
  private _active: boolean = false;
  private _disabled: boolean = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this.setDisabled(value);
  }

  /** Event emitted when the option is selected. */
  @Output() onSelected: EventEmitter<MdcTabSelected> = new EventEmitter<MdcTabSelected>();

  @HostBinding('class.mdc-tab') isHostClass = true;
  @HostBinding('attr.role') role: string = 'tab';
  @HostBinding('class.mdc-tab--with-icon-and-text') get classIconText() {
    return this.tabIcon != null && this.tabIconText != null;
  }
  @HostBinding('class.mdc-tab--active') get classActive() {
    return this._active ? 'mdc-tab--active' : '';
  }
  @HostBinding('class.ng-mdc-tab--disabled') get classDisabled() {
    return this._disabled ? 'ng-mdc-tab--disabled' : '';
  }
  @ContentChild(MdcIcon) tabIcon: MdcIcon;
  @ContentChild(MdcTabIconText) tabIconText: MdcTabIconText;

  private _mdcAdapter: MDCTabAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this._getHostElement(), className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this._getHostElement(), className);
    },
    registerInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen(type, handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten(type, handler);
    },
    getOffsetWidth: () => this._getHostElement().offsetWidth,
    getOffsetLeft: () => this._getHostElement().offsetLeft,
    notifySelected: () => this._emitSelectedEvent()
  };

  private _foundation: {
    init(): void,
    destroy(): void,
    isActive(): boolean,
    setActive(isActive: boolean): void,
    getComputedWidth(): number,
    getComputedLeft(): number,
    preventsDefaultOnClick(): boolean,
    setPreventDefaultOnClick(preventDefaultOnClick: boolean): void,
    measureSelf(): void,
  } = new MDCTabFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry,
    public ripple: MdcRipple) { }

  ngOnInit(): void {
    this._foundation.init();
    this.setPreventDefaultOnClick(true);
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  isActive(): boolean {
    return this._foundation.isActive();
  }

  setActive(isActive: boolean): void {
    this._active = isActive;
    this._foundation.setActive(isActive);
  }

  setDisabled(isDisabled: boolean): void {
    if (this.isActive()) { return; }

    this._disabled = isDisabled;
  }

  getComputedWidth(): number {
    return this._foundation.getComputedWidth();
  }

  getComputedLeft(): number {
    return this._mdcAdapter.getOffsetLeft();
  }

  getPreventDefaultOnClick(): boolean {
    return this._foundation.preventsDefaultOnClick();
  }

  setPreventDefaultOnClick(preventDefaultOnClick: boolean): void {
    this._foundation.setPreventDefaultOnClick(preventDefaultOnClick);
  }

  measureSelf(): void {
    this._foundation.measureSelf();
  }

  /** Emits the tab selected event. */
  private _emitSelectedEvent(): void {
    this.onSelected.emit({ tab: this });
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
