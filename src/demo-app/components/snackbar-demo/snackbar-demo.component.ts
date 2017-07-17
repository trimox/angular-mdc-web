import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { SnackbarMessage, SnackbarComponent } from '@angular-mdc/web';

@Component({
  selector: 'snackbar-demo',
  templateUrl: './snackbar-demo.component.html'
})
export class SnackbarDemoComponent implements OnInit {
  message: SnackbarMessage;
  @ViewChild('snack') snack: SnackbarComponent;

  ngOnInit() {
    this.message = {
      message: 'Hello',
      actionText: 'Ok',
    };
  }

  show() {
    this.snack.show(this.message);
  }
}
