import { Component } from '@angular/core';

import { buttons } from '../../navigation';

@Component({
  selector: 'buttons',
  templateUrl: './buttons.html'
})
export class Buttons {
  items = buttons.filter(_ => _.desc.length > 0);
}
