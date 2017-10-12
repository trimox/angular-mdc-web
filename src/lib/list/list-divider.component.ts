import {
  Component,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import { toBoolean } from '../common';

@Component({
  selector: '[mdc-list-divider], mdc-list-divider',
  template:
  `<div class="mdc-list-divider" role="seperator"></div>`,
})
export class MdcListDivider {
  private inset_: boolean;

  @Input()
  get inset() { return this.inset_; }
  set inset(value) {
    this.inset_ = toBoolean(value);
    if (this.inset_) {
      this.renderer_.addClass(this.elementRef.nativeElement, 'mdc-list-divider--inset');
    } else {
      this.renderer_.removeClass(this.elementRef.nativeElement, 'mdc-list-divider--inset');
    }
  }

  constructor(
    public elementRef: ElementRef,
    private renderer_: Renderer2) { }
}
