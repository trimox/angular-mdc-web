import {
  Component,
  ViewChild
} from '@angular/core';

import { SnackbarMessage, MdcSnackbarComponent } from '../../../lib/public_api';

@Component({
  selector: 'snackbar-demo',
  templateUrl: './snackbar-demo.component.html'
})
export class SnackbarDemoComponent {
  message: SnackbarMessage = {
    message: 'Hello',
    actionText: 'Ok',
  };
  @ViewChild('snack') snack: MdcSnackbarComponent;
  @ViewChild('snackStart') snackStart: MdcSnackbarComponent;

  show() {
    this.snack.show(this.message);
  }

  showStartAligned() {
    this.snackStart.show(this.message);
  }
}
