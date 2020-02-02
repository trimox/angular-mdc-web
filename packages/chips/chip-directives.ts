import {
  Directive,
  ElementRef,
  Input
} from '@angular/core';

@Directive({
  selector: 'mdc-chip-text, [mdcChipText]',
  host: {
    '[attr.role]': 'role',
    '[attr.tabindex]': 'tabIndex',
    'class': 'mdc-chip__text mdc-chip__action--primary'
  }
})
export class MdcChipText {
  @Input() role: string | null = 'button';
  @Input() tabIndex: number | null = null;

  constructor(public elementRef: ElementRef<HTMLElement>) {}
}
