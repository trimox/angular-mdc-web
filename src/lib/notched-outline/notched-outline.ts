import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MDCNotchedOutlineAdapter } from '@material/notched-outline/adapter';
import { MDCNotchedOutlineFoundation } from '@material/notched-outline';

@Directive({
  selector: 'mdc-notched-outline-idle',
})
export class MdcNotchedOutlineIdle {
  @HostBinding('class.mdc-notched-outline__idle') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Component({
  moduleId: module.id,
  selector: '[mdc-notched-outline], mdc-notched-outline',
  exportAs: 'mdcNotchedOutline',
  template: `
  <svg>
    <path #svgpath class="mdc-notched-outline__path"/>
  </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class MdcNotchedOutline implements OnInit, OnDestroy {
  get outlineIdle(): MdcNotchedOutlineIdle { return this._outlineIdle; }
  set outlineIdle(outlineIdle: MdcNotchedOutlineIdle) {
    this._outlineIdle = outlineIdle;
    this._changeDetectorRef.markForCheck();
  }
  private _outlineIdle: MdcNotchedOutlineIdle;

  @HostBinding('class.mdc-notched-outline') isHostClass = true;
  @ViewChild('svgpath') svgpath: ElementRef;

  private _mdcAdapter: MDCNotchedOutlineAdapter = {
    getWidth: () => this.elementRef.nativeElement.offsetWidth,
    getHeight: () => this.elementRef.nativeElement.offsetHeight,
    setOutlinePathAttr: (value: string) => {
      this._renderer.setAttribute(this.svgpath.nativeElement, 'd', value);
    },
    getIdleOutlineStyleValue: (propertyName: string) => {
      return window.getComputedStyle(this.outlineIdle.elementRef.nativeElement).getPropertyValue(propertyName);
    },
  };

  foundation: {
    init(): void,
    destroy(): void,
    updateSvgPath(notchWidth: number, isRtl: boolean): void
  } = new MDCNotchedOutlineFoundation(this._mdcAdapter);

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _renderer: Renderer2,
    public elementRef: ElementRef) { }

  ngOnInit(): void {
    this.foundation.init();
  }

  ngOnDestroy(): void {
    this.foundation.destroy();
  }

  destroy(): void {
    this.foundation.destroy();
  }

  /**
   * Updates the SVG path of the focus outline element based on the given width of the
   * label element and the RTL context.
   */
  updateSvgPath(notchWidth: number, isRtl: boolean): void {
    this.foundation.updateSvgPath(notchWidth, isRtl);
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }
}
