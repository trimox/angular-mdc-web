import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// import { MdcDialog, MdcTextfield } from '@angular-mdc/web';
import { MdcDialog, MdcTextfield } from '../../../lib/public_api';

@Component({
  selector: 'dialog-demo',
  templateUrl: './dialog-demo.html'
})
export class DialogDemo {
  userForm: FormGroup;

  @ViewChild('input') input: MdcTextfield;
  @ViewChild('dialog') dialog: MdcDialog;
  @ViewChild('dialogscroll') dialogScroll: MdcDialog;
  @ViewChild('dialogalert') dialogAlert: MdcDialog;
  @ViewChild('dialoggmail') dialogGmail: MdcDialog;
  @ViewChild('dialogform') dialogForm: MdcDialog;

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required)
    });
    // this.userForm.setValue({username: 'test'});
  }

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

  showDialogForm() {
    // reset error state
    this.input.setValid(true);
    this.dialogForm.show();
  }

  updateForm() {
    // reset error state
    this.input.setValid(false);
    if (!this.userForm.valid) {
      return;
    }
    this.dialogForm.close();
  }
}
