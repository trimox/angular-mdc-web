import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  Renderer2,
  SimpleChange,
} from '@angular/core';
import { toBoolean } from '../../common';

@Directive({
  selector: 'mdc-content, [mdc-content]'
})
export class MdcContent {
  @HostBinding('class.mdc-content') isHostClass = true;
}

@Directive({
  selector: '[mdc-theme-dark]'
})
export class MdcThemeDark implements OnChanges {
  @Input('mdc-theme-dark') mdcThemeDark: boolean = false;

  constructor(
    private _renderer: Renderer2,
    public elementRef: ElementRef) {
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    const change = changes['mdcThemeDark'];

    if (change) {
      !toBoolean(change.currentValue) ?
        this._renderer.removeClass(this.elementRef.nativeElement, 'mdc-theme--dark') :
        this._renderer.addClass(this.elementRef.nativeElement, 'mdc-theme--dark');
    }
  }
}
