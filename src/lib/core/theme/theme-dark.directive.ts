import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChange,
} from '@angular/core';
import { toBoolean } from '../../common';

@Directive({
  selector: '[mdc-theme-dark]'
})
export class MdcThemeDark implements OnChanges {
  private mdcThemeDark_: boolean;

  @Input('mdc-theme-dark') mdcThemeDark: boolean;

  constructor(
    private renderer_: Renderer2,
    public elementRef: ElementRef) {
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }) {
    let change = changes['mdcThemeDark'];

    if (!toBoolean(change.currentValue)) {
      this.renderer_.removeClass(this.elementRef.nativeElement, 'mdc-theme--dark');
    } else {
      this.renderer_.addClass(this.elementRef.nativeElement, 'mdc-theme--dark');
    }
  }
}
