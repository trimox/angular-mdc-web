import { Component } from '@angular/core';

// import { MdcSnackbar } from '@angular-mdc/web';
import { MdcSnackbar } from '../../../lib/public_api';

@Component({
  selector: 'snackbar-demo',
  templateUrl: './snackbar-demo.html',
})
export class SnackbarDemo {
  message = 'Message deleted';
  action = 'Undo';
  multiline = false;
  dismissOnAction: boolean = true;
  alignStart: boolean;
  focusAction = false;
  actionOnBottom = false;

  constructor(public snackbar: MdcSnackbar) { }

  show() {
    let snackbarRef = this.snackbar.show(this.message, this.action, {
      align: this.alignStart ? 'start' : '',
      multiline: this.multiline,
      dismissOnAction: this.dismissOnAction,
      focusAction: this.focusAction,
      actionOnBottom: this.actionOnBottom,
    });
  }
}
