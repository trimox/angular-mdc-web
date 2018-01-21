import {
  Component,
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MdcRipple } from '@angular-mdc/web/ripple';

import { MDCTextFieldOutlineAdapter } from '@material/textfield/outline/adapter';
import { MDCTextFieldOutlineFoundation } from '@material/textfield/outline';

@Component({
  moduleId: module.id,
  selector: 'mdc-text-field-outline-path',
  template: `
  <svg>
    <path #svgpath class="mdc-text-field__outline-path"/>
  </svg>
  `,
})
export class MdcTextFieldOutlinePath {
  @ViewChild('svgpath') svgpath: ElementRef;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-text-field-idle-outline',
})
export class MdcTextFieldIdleOutline {
  @HostBinding('class.mdc-text-field__idle-outline') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-text-field-outline',
  providers: [
    MdcRipple
  ],
})
export class MdcTextFieldOutline {
  @HostBinding('class.mdc-text-field__outline') isHostClass = true;
  @ContentChild(MdcTextFieldOutlinePath) outlinePath: MdcTextFieldOutlinePath;

  mdcAdapter: MDCTextFieldOutlineAdapter = {
    getWidth: () => this.elementRef.nativeElement.offsetWidth,
    getHeight: () => this.elementRef.nativeElement.offsetHeight,
    setOutlinePathAttr: (value: string) => {
      this._renderer.setAttribute(this.outlinePath.svgpath.nativeElement, 'd', value);
    },
    // TO-DO: Re-add this for MDC v0.29.0
    // getIdleOutlineStyleValue: (propertyName: string) => {
    // if (this.idleOutline) {
    //   return window.getComputedStyle(this.idleOutline.elementRef.nativeElement).getPropertyValue(propertyName);
    // }
    // },
  };

  foundation: {
    init(): void,
    destroy(): void,
    updateSvgPath(labelWidth: number, isRtl: boolean): void
  } = new MDCTextFieldOutlineFoundation(this.mdcAdapter);

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef,
    private _ripple: MdcRipple) {

    this._ripple.init();
  }

  destroy(): void {
    this.foundation.destroy();
  }

  /**
     * Updates the SVG path of the focus outline element based on the given width of the
     * label element and the RTL context.
     */
  updateSvgPath(labelWidth: number, isRtl: boolean): void {
    this.foundation.updateSvgPath(labelWidth, isRtl);
  }
}
