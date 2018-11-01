import { Directive } from '@angular/core';
import { MdcIcon } from '@angular-mdc/web/icon';

@Directive({
  selector: '[mdcSelectIcon]',
  exportAs: 'mdcSelectIcon',
  host: { 'class': 'mdc-select__icon' }
})
export class MdcSelectIcon extends MdcIcon { }
