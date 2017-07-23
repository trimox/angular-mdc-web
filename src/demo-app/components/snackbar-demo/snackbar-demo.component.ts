import {
  Component,
  ViewChild
} from '@angular/core';

import { SnackbarMessage, SnackbarComponent } from '@angular-mdc/web';

@Component({
  selector: 'snackbar-demo',
  templateUrl: './snackbar-demo.component.html'
})
export class SnackbarDemoComponent {
  message: SnackbarMessage = {
    message: 'Hello',
    actionText: 'Ok',
  };
  @ViewChild('snack') snack: SnackbarComponent;
  @ViewChild('snackStart') snackStart: SnackbarComponent;

  show() {
    this.snack.show(this.message);
  }

  showStartAligned() {
    this.snackStart.show(this.message);
  }
}
