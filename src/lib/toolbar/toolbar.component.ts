import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MDCToolbarAdapter } from './toolbar-adapter';
import { ToolbarTitleDirective } from './toolbar-title.directive';

const { MDCToolbarFoundation } = require('@material/toolbar');
const MDC_TOOLBAR_STYLES = require('@material/toolbar/mdc-toolbar.scss');

type UnlistenerMap = WeakMap<EventListener, Function>;

@Component({
  selector: 'mdc-toolbar',
  template: '<ng-content></ng-content>',
  styles: [String(MDC_TOOLBAR_STYLES)],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements AfterViewInit, OnDestroy {
  @Input() flexible: boolean;
  @Input() flexibleTitle: boolean = true;
  @Input() fixed: boolean;
  @Input() waterfall: boolean;
  @Input() fixedLastrow: boolean;
  @Output() change: EventEmitter<number> = new EventEmitter<number>();
  @HostBinding('class.mdc-toolbar') className: string = 'mdc-toolbar';
  @HostBinding('class.mdc-toolbar--fixed') get classFixedToolbar(): string {
    return this.fixed ? 'mdc-toolbar--fixed' : '';
  }
  @HostBinding('class.mdc-toolbar--waterfall') get classWaterfallToolbar(): string {
    return this.waterfall ? 'mdc-toolbar--waterfall' : '';
  }
  @HostBinding('class.mdc-toolbar--flexible') get classFlexibleToolbar(): string {
    return this.flexible ? 'mdc-toolbar--flexible' : '';
  }
  @HostBinding('class.mdc-toolbar--fixed-lastrow-only') get classFixedLastrow(): string {
    return this.fixedLastrow ? 'mdc-toolbar--fixed-lastrow-only' : '';
  }
  @HostBinding('class.mdc-toolbar--flexible-default-behavior') get classFlexibleTitle(): string {
    return this.flexible && this.flexibleTitle ? 'mdc-toolbar--flexible-default-behavior' : '';
  }
  @ViewChild(ToolbarTitleDirective) titleEl: ElementRef;

  private _unlisteners: Map<string, UnlistenerMap> = new Map<string, UnlistenerMap>();

  private _mdcAdapter: MDCToolbarAdapter = {
    hasClass: (className: string) => {
      const { _root: root } = this;
      return root.nativeElement.classList.contains(className);
    },
    addClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.addClass(root.nativeElement, className);
    },
    removeClass: (className: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.removeClass(root.nativeElement, className);
    },
    registerScrollHandler: (handler: EventListener) => {
      if (this._root) {
        this.listen_('scroll', handler, window);
      }
    },
    deregisterScrollHandler: (handler: EventListener) => {
      this.unlisten_('scroll', handler);
    },
    registerResizeHandler: (handler: EventListener) => {
      const { _renderer: renderer, _root: root } = this;
      if (this._root) {
        this.listen_('resize', handler, renderer.parentNode(root.nativeElement));
      }
    },
    deregisterResizeHandler: (handler: EventListener) => {
      this.unlisten_('resize', handler);
    },
    getViewportWidth: () => {
      return window.innerWidth;
    },
    getViewportScrollY: () => {
      return window.pageYOffset;
    },
    getOffsetHeight: () => this._root.nativeElement.offsetHeight,
    getFirstRowElementOffsetHeight: () => {
      const { _root: root } = this;
      return root.nativeElement.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR).offsetHeight;
    },
    notifyChange: (evtData) => {
      this.change.emit(evtData.flexibleExpansionRatio);
    },
    setStyle: (property: string, value: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.setStyle(root.nativeElement, property, value);
    },
    setStyleForTitleElement: (property: string, value: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.setStyle(root.nativeElement.querySelector(MDCToolbarFoundation.strings.TITLE_SELECTOR), property, value);
    },
    setStyleForFlexibleRowElement: (property: string, value: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.setStyle(root.nativeElement.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR), property, value);
    },
    setStyleForFixedAdjustElement: (property: string, value: string) => {
      const { _renderer: renderer, _root: root } = this;
      renderer.setStyle(document.querySelector('.mdc-toolbar-fixed-adjust'), property, value);
    }
  };

  private _foundation: {
    init: Function,
    destroy: Function
  } = new MDCToolbarFoundation(this._mdcAdapter);

  constructor(private _renderer: Renderer2, private _root: ElementRef) { }

  ngAfterViewInit() {
    this._foundation.init();
  }
  ngOnDestroy() {
    this._foundation.destroy();
  }

  listen_(type: string, listener: EventListener, ref: any) {
    if (!this._unlisteners.has(type)) {
      this._unlisteners.set(type, new WeakMap<EventListener, Function>());
    }
    const unlistener = this._renderer.listen(ref, type, listener);
    this._unlisteners.get(type).set(listener, unlistener);
  }

  unlisten_(type: string, listener: EventListener) {
    if (!this._unlisteners.has(type)) {
      return;
    }
    const unlisteners = this._unlisteners.get(type);
    if (!unlisteners.has(listener)) {
      return;
    }
    unlisteners.get(listener)();
    unlisteners.delete(listener);
  }
}