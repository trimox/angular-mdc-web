import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChange,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean, EventRegistry } from '@angular-mdc/web/common';
import { MdcRipple } from '@angular-mdc/web/core';
import { MdcIcon } from '@angular-mdc/web/icon';

import { MDCTabAdapter } from './adapter';
import { MDCTabFoundation } from '@material/tabs';

export interface MdcTabChange {
  index: number;
  tab: MdcTab;
}

@Directive({
  selector: '[mdc-tab-icon-text], mdc-tab-icon-text'
})
export class MdcTabIconText {
  @HostBinding('class.mdc-tab__icon-text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdc-tab], mdc-tab',
  template: '<ng-content></ng-content>',
  providers: [
    MdcRipple,
    EventRegistry
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MdcTab implements OnInit, OnChanges, OnDestroy {
  private _active: boolean = false;
  private _disabled: boolean = false;
  private _disableRipple: boolean = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = value;
  }
  @Input()
  get active(): boolean { return this._active; }
  set active(value: boolean) {
    if (this._active !== value) {
      this._active = value;
    }
  }
  @Input()
  get preventsDefaultOnClick(): boolean { return this._foundation.preventsDefaultOnClick(); }
  set preventsDefaultOnClick(value: boolean) {
    this._foundation.setPreventDefaultOnClick(value);
  }
  @Input()
  get disableRipple(): boolean { return this._disableRipple; }
  set disableRipple(value: boolean) {
    this._disableRipple = toBoolean(value);
  }
  @Output() select: EventEmitter<MdcTabChange> = new EventEmitter();
  @HostBinding('class.mdc-tab') isHostClass = true;
  @HostBinding('attr.role') role: string = 'tab';
  @HostBinding('class.mdc-tab--with-icon-and-text') get classIconText() {
    return this.tabIcon != null && this.tabIconText != null;
  }
  @HostBinding('class.mdc-tab--active') get classActive() {
    return this._active ? 'mdc-tab--active' : '';
  }
  @HostBinding('class.mdc-tab--disabled') get classDisabled() {
    return this._disabled ? 'mdc-tab--disabled' : '';
  }
  @ContentChild(MdcIcon) tabIcon: MdcIcon;
  @ContentChild(MdcTabIconText) tabIconText: MdcTabIconText;

  private _mdcAdapter: MDCTabAdapter = {
    addClass: (className: string) => {
      this._renderer.addClass(this.elementRef.nativeElement, className);
    },
    removeClass: (className: string) => {
      this._renderer.removeClass(this.elementRef.nativeElement, className);
    },
    registerInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.listen(type, handler, this.elementRef.nativeElement);
    },
    deregisterInteractionHandler: (type: string, handler: EventListener) => {
      this._registry.unlisten(type, handler);
    },
    getOffsetWidth: () => this.elementRef.nativeElement.offsetWidth,
    getOffsetLeft: () => this.elementRef.nativeElement.offsetLeft,
    notifySelected: () => this.select.emit({ index: null, tab: this })
  };

  private _foundation: {
    init: Function,
    destroy: Function,
    isActive: Function,
    setActive: Function,
    getComputedWidth: Function,
    getComputedLeft: Function,
    preventsDefaultOnClick: Function,
    setPreventDefaultOnClick: Function,
    measureSelf: Function,
  } = new MDCTabFoundation(this._mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _registry: EventRegistry,
    public ripple: MdcRipple) { }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    const disabled = changes['disabled'];
    const tabIcon = changes['tabIcon'];
    const active = changes['active'];
    const disableRipple = changes['disableRipple'];

    if (disabled) {
      disabled.currentValue ? this._renderer.setStyle(this.elementRef.nativeElement, 'color', '#bcbcbc')
        : this._renderer.removeStyle(this.elementRef.nativeElement, 'color');
    }
    if (tabIcon) {
      this._renderer.addClass(this.tabIcon.elementRef.nativeElement, 'mdc-tab__icon');
    }
    if (active) {
      this._foundation.setActive(active.currentValue);
      if (active.currentValue) {
        this._mdcAdapter.notifySelected();
      }
    }
    if (disableRipple) {
      disableRipple.currentValue ? this.ripple.destroy() : this.ripple.init();
    }
  }

  ngOnInit(): void {
    this._foundation.init();
    this.setPreventDefaultOnClick(true);

    if (!this._disableRipple) {
      this.ripple.init();
    }
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  isActive(): boolean {
    return this._active;
  }

  setActive(value: boolean): void {
    this._active = value;
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

  setPreventDefaultOnClick(value: boolean): void {
    this._foundation.setPreventDefaultOnClick(value);
  }

  measureSelf(): void {
    this._foundation.measureSelf();
  }
}
