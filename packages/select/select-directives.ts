import {
  Directive,
  ElementRef,
  Input
} from '@angular/core';

@Directive({
  selector: '[mdcSelectIcon]',
  exportAs: 'mdcSelectIcon',
  host: {'class': 'mdc-select__icon'}
})
export class MdcSelectIcon {}

@Directive({
  selector: '[mdcSelectAnchor]',
  exportAs: 'mdcSelectAnchor',
  host: {'class': 'mdc-select__anchor'}
})
export class MdcSelectAnchor {
  get root(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}

@Directive({
  selector: '[mdcSelectedText]',
  exportAs: 'mdcSelectedText',
  host: {
    'class': 'mdc-select__selected-text',
    'role': 'button',
    'aria-haspopup': 'listbox',
    '[attr.aria-labelledby]': 'ariaLabelledby',
    '[attr.aria-required]': 'ariaRequired'
  }
})
export class MdcSelectedText {
  /** The aria-labelledby attribute for improved a11y. */
  @Input() ariaLabelledby?: string;

  /** The aria-required attribute for improved a11y. */
  @Input() ariaRequired?: boolean;

  get root(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
