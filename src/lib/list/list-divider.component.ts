import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean } from '../common';

@Component({
  selector: '[mdc-list-divider], mdc-list-divider',
  template:
  `<div #divider class="mdc-list-divider" role="seperator"></div>`,
  encapsulation: ViewEncapsulation.None,
})
export class MdcListDividerComponent {
  private _inset: boolean;

  @Input()
  get inset() { return this._inset; }
  set inset(value) {
    this._inset = toBoolean(value);
    if (this._inset) {
      this._renderer.addClass(this.listItem.nativeElement, 'mdc-list-divider--inset');
    } else {
      this._renderer.removeClass(this.listItem.nativeElement, 'mdc-list-divider--inset');
    }
  }
  @ViewChild('divider') private listItem: ElementRef;

  constructor(
    public elementRef: ElementRef,
    private _renderer: Renderer2) { }
}
