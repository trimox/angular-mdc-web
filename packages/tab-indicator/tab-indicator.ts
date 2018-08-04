import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { EventRegistry, toBoolean } from '@angular-mdc/web/common';

import { MDCTabIndicatorAdapter } from '@material/tab-indicator/adapter';
import {
  MDCSlidingTabIndicatorFoundation,
  MDCFadingTabIndicatorFoundation
} from '@material/tab-indicator';

@Component({
  moduleId: module.id,
  selector: '[mdcTabIndicator], mdc-tab-indicator',
  template: `
  <span #content class="mdc-tab-indicator__content">
    <ng-content></ng-content>
  </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [EventRegistry]
})
export class MdcTabIndicator implements AfterViewInit {
  private _isFoundationInit: boolean;

  @Input()
  get active(): boolean { return this._active; }
  set active(value: boolean) {
    this._active = toBoolean(value);
    this.initFoundation();
  }
  private _active: boolean = true;

  @Input()
  get fade(): boolean { return this._fade; }
  set fade(value: boolean) {
    this._fade = toBoolean(value);
    this.initFoundation();
  }
  private _fade: boolean;

  @Input()
  get underline(): boolean { return this._underline; }
  set underline(value: boolean) {
    this._underline = toBoolean(value);
    this._initContentClass();
  }
  private _underline: boolean = true;

  @Input()
  get icon(): boolean { return this._icon; }
  set icon(value: boolean) {
    this._icon = toBoolean(value);
    this._initContentClass();
  }
  private _icon: boolean;

  @HostBinding('class.mdc-tab-indicator') isHostClass = true;
  @HostBinding('class.mdc-tab-indicator--active') get classActive(): string {
    return this.active ? 'mdc-tab-indicator--active' : '';
  }
  @HostBinding('class.mdc-tab-indicator--fade') get classFade(): string {
    return this.fade ? 'mdc-tab-indicator--fade' : '';
  }

  @HostListener('transitionend') ontransitionend() {
    this._foundation.handleTransitionEnd();
  }

  @ViewChild('content') content: ElementRef;

  private _mdcAdapter: MDCTabIndicatorAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    registerEventHandler: (evtType: string, handler: EventListener) =>
      this._registry.listen(evtType, handler, this._getHostElement()),
    deregisterEventHandler: (evtType: string, handler: EventListener) => this._registry.unlisten(evtType, handler),
    computeContentClientRect: () => this.content.nativeElement.getBoundingClientRect(),
    setContentStyleProperty: (prop, value) => this.content.nativeElement.style.setProperty(prop, value)
  };

  private _foundation: {
    handleTransitionEnd(): void,
    computeContentClientRect(): ClientRect,
    activate(previousIndicatorClientRect: ClientRect): void,
    deactivate(): void
  };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    private _registry: EventRegistry) { }

  ngAfterViewInit(): void {
    if (!this._isFoundationInit) {
      this.initFoundation();
      this._initContentClass();
    }
  }

  activate(previousIndicatorClientRect: ClientRect): void {
    this._foundation.activate(previousIndicatorClientRect);
  }

  deactivate(): void {
    this._foundation.deactivate();
  }

  computeContentClientRect(): void {
    this._foundation.computeContentClientRect();
  }

  initFoundation(): void {
    if (this.fade) {
      this._foundation = new MDCFadingTabIndicatorFoundation(this._mdcAdapter);
    } else {
      this._foundation = new MDCSlidingTabIndicatorFoundation(this._mdcAdapter);
    }

    this._isFoundationInit = true;
    this._changeDetectorRef.markForCheck();
  }

  private _initContentClass() {
    this.content.nativeElement.classList.remove('mdc-tab-indicator__content--underline');
    this.content.nativeElement.classList.remove('mdc-tab-indicator__content--icon');

    if (this.underline) {
      this.content.nativeElement.classList.add('mdc-tab-indicator__content--underline');
    } else {
      this.content.nativeElement.classList.add('mdc-tab-indicator__content--icon');
    }
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
