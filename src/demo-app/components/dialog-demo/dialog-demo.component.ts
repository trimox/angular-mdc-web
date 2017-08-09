import { Component, ViewChild } from '@angular/core';

import { DialogComponent } from '@angular-mdc/web';

@Component({
  selector: 'dialog-demo',
  templateUrl: './dialog-demo.component.html'
})
export class DialogDemoComponent {
  @ViewChild('dialog') dialog: DialogComponent;
  @ViewChild('dialogscroll') dialogScroll: DialogComponent;

  showDialog() {
    this.dialog.show();
  }

  showDialogScroll() {
    this.dialogScroll.show();
  }
}
