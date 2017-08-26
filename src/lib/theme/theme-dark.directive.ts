import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChange,
} from '@angular/core';
import { toBoolean } from '../common';

@Directive({
  selector: '[mdc-theme-dark]'
})
export class ThemeDark implements OnChanges {
  private nativeEl: ElementRef;
  private _mdcThemeDark: boolean;

  @Input('mdc-theme-dark') mdcThemeDark: boolean;

  constructor(
    private _renderer: Renderer2,
    private _root: ElementRef) {
    this.nativeEl = this._root.nativeElement;
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    let change = changes['mdcThemeDark'];

    if (!toBoolean(change.currentValue)) {
      this._renderer.removeClass(this.nativeEl, 'mdc-theme--dark');
    } else {
      this._renderer.addClass(this.nativeEl, 'mdc-theme--dark');
    }
  }
}
