import {
  AfterContentInit,
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
import { toBoolean } from '@angular-mdc/web/common';

import { MDCTabIndicatorAdapter } from '@material/tab-indicator/adapter';
import {
  MDCSlidingTabIndicatorFoundation,
  MDCFadingTabIndicatorFoundation
} from '@material/tab-indicator';

@Component({
  moduleId: module.id,
  selector: '[mdcTabIndicator], mdc-tab-indicator',
  exportAs: 'MdcTabIndicator',
  template: `
  <span #content class="mdc-tab-indicator__content">
    <ng-container *ngIf="icon">{{icon}}</ng-container>
  </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcTabIndicator implements AfterContentInit {
  private _isFoundationInit: boolean;

  @Input()
  get active(): boolean { return this._active; }
  set active(value: boolean) {
    if (this._active !== value) {
      this._active = toBoolean(value);
      this._changeDetectorRef.markForCheck();

      this._active ? this.activate(this.computeContentClientRect()) : this.deactivate();
    }
  }
  private _active: boolean;

  @Input()
  get fade(): boolean { return this._fade; }
  set fade(value: boolean) {
    this._fade = toBoolean(value);
    this._initFoundation();
  }
  private _fade: boolean;

  @Input()
  get icon(): string { return this._icon; }
  set icon(value: string) {
    this._icon = value;
    this._updateContentClasses();
  }
  private _icon: string;

  @HostBinding('class.mdc-tab-indicator') isHostClass = true;
  @HostBinding('class.mdc-tab-indicator--active') get classActive(): string {
    return this.active ? 'mdc-tab-indicator--active' : '';
  }
  @HostBinding('class.mdc-tab-indicator--fade') get classFade(): string {
    return this.fade ? 'mdc-tab-indicator--fade' : '';
  }

  @ViewChild('content') content: ElementRef;

  private _mdcAdapter: MDCTabIndicatorAdapter = {
    addClass: (className: string) => this._getHostElement().classList.add(className),
    removeClass: (className: string) => this._getHostElement().classList.remove(className),
    computeContentClientRect: () => this.content.nativeElement.getBoundingClientRect(),
    setContentStyleProperty: (propName: string, value: string) => this.content.nativeElement.style.setProperty(propName, value)
  };

  private _foundation: {
    init(): void,
    computeContentClientRect(): ClientRect,
    activate(previousIndicatorClientRect: ClientRect): void,
    deactivate(): void
  };

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef) { }

  ngAfterContentInit(): void {
    if (!this._isFoundationInit) {
      this._initFoundation();
      this._updateContentClasses();
    }
  }

  activate(previousIndicatorClientRect: ClientRect): void {
    this._foundation.activate(previousIndicatorClientRect);
  }

  deactivate(): void {
    this._foundation.deactivate();
  }

  computeContentClientRect(): ClientRect {
    return this._foundation.computeContentClientRect();
  }

  private _initFoundation(): void {
    if (this.fade) {
      this._foundation = new MDCFadingTabIndicatorFoundation(this._mdcAdapter);
    } else {
      this._foundation = new MDCSlidingTabIndicatorFoundation(this._mdcAdapter);
    }

    this._foundation.init();
    this._isFoundationInit = true;
    this._changeDetectorRef.markForCheck();
  }

  private _updateContentClasses() {
    this.content.nativeElement.classList.remove('mdc-tab-indicator__content--underline');
    this.content.nativeElement.classList.remove('mdc-tab-indicator__content--icon');

    if (this.icon) {
      this.content.nativeElement.classList.add('mdc-tab-indicator__content--icon');
      this.content.nativeElement.classList.add('material-icons');
    } else {
      this.content.nativeElement.classList.add('mdc-tab-indicator__content--underline');
    }
    this._changeDetectorRef.markForCheck();
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
