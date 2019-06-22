import {Directive} from '@angular/core';

@Directive({
  selector: '[materialIcons]',
  host: {
    'class': 'material-icons'
  }
})
export class MdcMaterialIcons { }
