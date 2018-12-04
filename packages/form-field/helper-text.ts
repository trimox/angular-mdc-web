import {
  ElementRef,
  Input
} from '@angular/core';

export abstract class MdcHelperTextBase {
  @Input() id?: string;

  constructor(public elementRef: ElementRef<HTMLElement>) { }

  /** Retrieves the DOM element of the component host. */
  protected getHostElement(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
