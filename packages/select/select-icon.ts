import {Directive} from '@angular/core';

@Directive({
  selector: '[mdcSelectIcon]',
  exportAs: 'mdcSelectIcon',
  host: {'class': 'mdc-select__icon'}
})
export class MdcSelectIcon {}
