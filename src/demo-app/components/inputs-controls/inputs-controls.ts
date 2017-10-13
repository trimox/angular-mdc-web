import { Component } from '@angular/core';

import { inputsControls } from '../../navigation';

@Component({
  selector: 'inputs-controls',
  templateUrl: './inputs-controls.html'
})
export class InputsControls {
  items = inputsControls.filter(_ => _.desc.length > 0);
}
