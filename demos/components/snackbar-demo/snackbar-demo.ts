import { Component } from '@angular/core';

import { MdcSnackbar } from '@angular-mdc/web';

@Component({
  templateUrl: './snackbar-demo.html',
})
export class SnackbarDemo {
  message = 'Message sent';
  action = 'Undo';
  multiline = false;
  dismissOnAction = true;
  align: string;
  focusAction = false;
  actionOnBottom = false;

  constructor(private snackbar: MdcSnackbar) { }

  show() {
    const snackbarRef = this.snackbar.show(this.message, this.action, {
      align: this.align,
      multiline: this.multiline,
      dismissOnAction: this.dismissOnAction,
      focusAction: this.focusAction,
      actionOnBottom: this.actionOnBottom,
    });

    snackbarRef.afterDismiss().subscribe(() => {
      console.log('The snack-bar was dismissed');
    });
  }
}
