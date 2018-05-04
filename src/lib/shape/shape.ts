import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

const MDC_VALID_SHAPE_CORNERS = [
  'top-left',
  'top-right',
  'bottom-right',
  'bottom-left'
];

@Component({
  moduleId: module.id,
  selector: '[mdcShapeContainerCorner], [mdc-shape-container-corner], mdc-shape-container-corner',
  exportAs: 'mdcShapeContainerCorner',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class MdcShapeContainerCorner {
  @HostBinding('class.mdc-shape-container__corner') isHostClass = true;

  @Input()
  get corner(): string { return this._corner; }
  set corner(value: string) {
    this.setCorner(value);
  }
  protected _corner: string;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    public elementRef: ElementRef,
    private _renderer: Renderer2) { }

  setCorner(corner: string): void {
    if (this._isCornerValid(corner)) {
      const cssClass = 'mdc-shape-container__corner--';

      this._renderer.removeClass(this._getHostElement(), `${cssClass}${this.corner}`);
      this._renderer.addClass(this._getHostElement(), `${cssClass}${corner}`);
      this._corner = corner;

      this._changeDetectorRef.markForCheck();
    }
  }

  /** Retrieves the DOM element of the component host. */
  private _getHostElement() {
    return this.elementRef.nativeElement;
  }

  /** Make sure the corner value is supported. */
  protected _isCornerValid(corner: string): boolean {
    return MDC_VALID_SHAPE_CORNERS.indexOf(corner) > -1 ? true : false;
  }
}

@Component({
  moduleId: module.id,
  selector: '[mdcShapeContainer], [mdc-shape-container], mdc-shape-container',
  exportAs: 'mdcShapeContainer',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class MdcShapeContainer {
  @HostBinding('class.mdc-shape-container') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
