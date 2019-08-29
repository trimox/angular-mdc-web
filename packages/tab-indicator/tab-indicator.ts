import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Platform} from '@angular/cdk/platform';

import {MDCComponent} from '@angular-mdc/web/base';
import {toBoolean} from '@angular-mdc/web/common';

import {
  MDCTabIndicatorAdapter,
  MDCSlidingTabIndicatorFoundation,
  MDCFadingTabIndicatorFoundation
} from '@material/tab-indicator';

@Component({
  moduleId: module.id,
  selector: '[mdcTabIndicator], mdc-tab-indicator',
  exportAs: 'mdcTabIndicator',
  host: {
    'class': 'mdc-tab-indicator',
    '[class.mdc-tab-indicator--active]': 'active',
    '[class.mdc-tab-indicator--fade]': 'fade'
  },
  template: `
  <span #content class="mdc-tab-indicator__content">
    <ng-container *ngIf="icon">{{icon}}</ng-container>
  </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcTabIndicator extends
  MDCComponent<MDCSlidingTabIndicatorFoundation | MDCFadingTabIndicatorFoundation> implements AfterViewInit {
  private _isFoundationInit: boolean = false;

  @Input()
  get active(): boolean { return this._active; }
  set active(value: boolean) {
    const newValue = toBoolean(value);
    if (this._active !== newValue) {
      this._active = toBoolean(newValue);
      this._active ? this.activate(this.computeContentClientRect()) : this.deactivate();
    }
  }
  private _active: boolean = false;

  @Input()
  get fade(): boolean { return this._fade; }
  set fade(value: boolean) {
    const newValue = toBoolean(value);
    if (newValue !== this._fade) {
      this._fade = newValue;
      this._initFoundation();
    }
  }
  private _fade: boolean = false;

  @Input()
  get icon(): string | null { return this._icon; }
  set icon(value: string | null) {
    this._icon = value;
    this._updateContentClasses();
  }
  private _icon: string | null = null;

  @ViewChild('content', { static: true }) content!: ElementRef<HTMLElement>;

  getDefaultFoundation() {
    const adapter: MDCTabIndicatorAdapter = {
      addClass: (className: string) => this._getHostElement().classList.add(className),
      removeClass: (className: string) => this._getHostElement().classList.remove(className),
      computeContentClientRect: () => {
        if (!this._platform.isBrowser) { return { height: 0, width: 0, bottom: 0, top: 0, left: 0, right: 0 }; }
        return this.content.nativeElement.getBoundingClientRect();
      },
      setContentStyleProperty: (propName: string, value: string) =>
        this.content.nativeElement.style.setProperty(propName, value)
    };
    return this._fade ? new MDCFadingTabIndicatorFoundation(adapter) : new MDCSlidingTabIndicatorFoundation(adapter);
  }

  constructor(
    private _platform: Platform,
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  ngAfterViewInit(): void {
    if (!this._isFoundationInit) {
      this._initFoundation();
      this._updateContentClasses();
    }
  }

  activate(previousIndicatorClientRect: ClientRect): void {
    if (this._foundation) {
      this._foundation.activate(previousIndicatorClientRect);
    }
  }

  deactivate(): void {
    if (this._foundation) {
      this._foundation.deactivate();
    }
  }

  computeContentClientRect(): ClientRect {
    return this._foundation.computeContentClientRect();
  }

  private _initFoundation(): void {
    this._foundation.init();
    this._isFoundationInit = true;
    this._changeDetectorRef.markForCheck();
  }

  private _updateContentClasses(): void {
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
