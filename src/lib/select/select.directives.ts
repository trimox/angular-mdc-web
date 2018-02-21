import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
} from '@angular/core';
import { MdcRipple } from '@angular-mdc/web/ripple';

@Directive({
  selector: 'mdc-select-menu',
  exportAs: 'mdcSelectMenu'
})
export class MdcSelectMenu {
  @HostBinding('class.mdc-menu') isHostClass = true;
  @HostBinding('class.mdc-select__menu') isSelectClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-select-items',
  exportAs: 'mdcSelectItems'
})
export class MdcSelectItems {
  @HostBinding('class.mdc-list') isHostClass = true;
  @HostBinding('class.mdc-menu__items') isSelectClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-select-surface',
  exportAs: 'mdcSelectSurface',
  providers: [
    MdcRipple
  ]
})
export class MdcSelectSurface {
  @HostBinding('class.mdc-select__surface') isHostClass = true;

  public getHostElement() {
    return this._elementRef.nativeElement;
  }

  constructor(
    private _elementRef: ElementRef,
    private _ripple: MdcRipple) {

    this._ripple.init();
  }
}

@Directive({
  selector: 'mdc-select-selected-text',
  exportAs: 'mdcSelectSelectedText'
})
export class MdcSelectSelectedText {
  @HostBinding('class.mdc-select__selected-text') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}

@Directive({
  selector: 'mdc-select-bottom-line',
  exportAs: 'mdcSelectBottomLine'
})
export class MdcSelectBottomLine {
  @HostBinding('class.mdc-select__bottom-line') isHostClass = true;

  constructor(public elementRef: ElementRef) { }
}
