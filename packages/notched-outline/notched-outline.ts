import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Platform } from '@angular-mdc/web/common';

import { MDCNotchedOutlineAdapter } from '@material/notched-outline/adapter';
import { MDCNotchedOutlineFoundation } from '@material/notched-outline';

@Component({
  moduleId: module.id,
  selector: '[mdcNotchedOutline], mdc-notched-outline',
  exportAs: 'mdcNotchedOutline',
  template: `
  <div #notchOutline class="mdc-notched-outline">
    <svg>
      <path #svgpath class="mdc-notched-outline__path"/>
    </svg>
  </div>
  <div #notchIdle class="mdc-notched-outline__idle"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class MdcNotchedOutline implements OnInit, OnDestroy {
  @ViewChild('notchOutline') _notchOutline: ElementRef;
  @ViewChild('svgpath') _svgpath: ElementRef;
  @ViewChild('notchIdle') _notchIdle: ElementRef;

  private _mdcAdapter: MDCNotchedOutlineAdapter = {
    getWidth: () => this._notchOutline.nativeElement.offsetWidth,
    getHeight: () => this._notchOutline.nativeElement.offsetHeight,
    addClass: (className: string) => this._notchOutline.nativeElement.classList.add(className),
    removeClass: (className: string) => this._notchOutline.nativeElement.classList.remove(className),
    setOutlinePathAttr: (value: string) => this._svgpath.nativeElement.setAttribute('d', value),
    getIdleOutlineStyleValue: (propertyName: string) =>
      this._platform.isBrowser ? window.getComputedStyle(this._notchIdle.nativeElement).getPropertyValue(propertyName) : ''
  };

  _foundation: {
    init(): void,
    destroy(): void,
    notch(notchWidth: number, isRtl: boolean): void,
    closeNotch(): void
  } = new MDCNotchedOutlineFoundation(this._mdcAdapter);

  constructor(
    private _platform: Platform,
    public elementRef: ElementRef) { }

  ngOnInit(): void {
    this._foundation.init();
  }

  ngOnDestroy(): void {
    this._foundation.destroy();
  }

  /** Updates outline selectors and SVG path to open notch. */
  notch(notchWidth: number, isRtl: boolean): void {
    this._foundation.notch(notchWidth, isRtl);
  }

  /** Updates the outline selectors to close notch and return it to idle state. */
  closeNotch(): void {
    this._foundation.closeNotch();
  }
}
