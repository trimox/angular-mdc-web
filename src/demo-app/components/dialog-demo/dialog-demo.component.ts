import { Component, ViewChild } from '@angular/core';

import { DialogComponent } from '@angular-mdc/web';

@Component({
  selector: 'dialog-demo',
  templateUrl: './dialog-demo.component.html'
})
export class DialogDemoComponent {
  @ViewChild('dialog') dialog: DialogComponent;
  @ViewChild('dialogscroll') dialogScroll: DialogComponent;
  @ViewChild('dialogalert') dialogAlert: DialogComponent;
  @ViewChild('dialoggmail') dialogGmail: DialogComponent;

  showDialog() {
    this.dialog.show();
  }

  showDialogScroll() {
    this.dialogScroll.show();
  }

  showDialogAlert() {
    this.dialogAlert.show();
  }

  showDialogGmail() {
    this.dialogGmail.show();
  }

  closeDialogGmail() {
    this.dialogGmail.close();
  }
}
