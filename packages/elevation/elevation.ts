import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChange
} from '@angular/core';

@Directive({
  selector: '[mdcElevation]',
  exportAs: 'mdcElevation'
})
export class MdcElevation implements OnChanges {
  @Input() mdcElevation: number = 0;

  constructor(public elementRef: ElementRef<HTMLElement>) {}

  public ngOnChanges(changes: {[key: string]: SimpleChange}): void {
    const change = changes['mdcElevation'];

    if (change.currentValue < 0 || change.currentValue > 24) {
      throw new Error(`Valid mdc-elevation values are 0 through 24`);
    }

    if (!change.isFirstChange()) {
      this.elementRef.nativeElement.classList.remove(`mdc-elevation--z${change.previousValue}`);
    }
    this.elementRef.nativeElement.classList.add(`mdc-elevation--z${change.currentValue}`);
  }
}
