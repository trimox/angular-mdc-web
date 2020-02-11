import {
  Directive,
  ElementRef,
  Input
} from '@angular/core';

@Directive({
  selector: 'mdc-chip-primary-action, [mdcChipPrimaryAction]',
  host: {
    '[attr.role]': 'role',
    '[attr.tabindex]': 'tabIndex',
    'class': 'mdc-chip__action--primary'
  }
})
export class MdcChipPrimaryAction {
  @Input() role: string | null = 'button';
  @Input() tabIndex: number | null = null;

  _root!: HTMLElement;

  constructor(public elementRef: ElementRef<HTMLElement>) {
    this._root = this.elementRef.nativeElement;
  }
}

@Directive({
  selector: 'mdc-chip-text, [mdcChipText]',
  host: {
    'class': 'mdc-chip__text'
  }
})
export class MdcChipText {}
