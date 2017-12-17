import {
  Component, OnInit, Inject, ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MdcDialog, MdcDialogComponent, MDC_DIALOG_DATA, MdcDialogRef, MdcTextField } from '@angular-mdc/web';

@Component({
  selector: 'dialog-demo',
  templateUrl: './dialog-demo.html',
})
export class DialogDemo {
  dialogTabs = [
    { label: 'Dialog (Service)', route: 'dialog-service-tab' },
    { label: 'Dialog (Declarative)', route: 'dialog-tab' },
  ];
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-header>
      <mdc-dialog-header-title>
        Use Google's location service?
      </mdc-dialog-header-title>
    </mdc-dialog-header>
    <mdc-dialog-body>
      Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
    </mdc-dialog-body>
    <mdc-dialog-footer>
      <button mdc-dialog-button [cancel]="true">Decline</button>
      <button mdc-dialog-button [accept]="true">Accept</button>
    </mdc-dialog-footer>
  </mdc-dialog>
  `,
})
export class DialogSimpleExample {
  constructor(
    public dialogRef: MdcDialogRef<DialogSimpleExample>,
    @Inject(MDC_DIALOG_DATA) public data: any) { }
}

@Component({
  templateUrl: 'dialog-scrolling-example.html',
})
export class DialogScrollingExample {
  constructor(
    public dialogRef: MdcDialogRef<DialogScrollingExample>) { }
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-header>
      <mdc-dialog-header-title>
        Discard draft?
      </mdc-dialog-header-title>
    </mdc-dialog-header>
    <mdc-dialog-footer>
      <button mdc-dialog-button [cancel]="true">Cancel</button>
      <button mdc-dialog-button [action]="true" [accept]="true">Discard</button>
    </mdc-dialog-footer>
  </mdc-dialog>
  `,
})
export class DialogAlertExample {
  constructor(
    public dialogRef: MdcDialogRef<DialogAlertExample>) { }
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-header>
      <mdc-dialog-header-title>
        Set backup account
      </mdc-dialog-header-title>
    </mdc-dialog-header>
    <mdc-dialog-body>
      <mdc-list [avatar]="true">
        <mdc-list-item (click)="closeDialog()" mdc-surface>
          <mdc-icon mdc-list-item-graphic>person</mdc-icon>username@gmail.com
        </mdc-list-item>
        <mdc-list-item (click)="closeDialog()" mdc-surface>
          <mdc-icon mdc-list-item-graphic>person</mdc-icon>user02@gmail.com
        </mdc-list-item>
        <mdc-list-item (click)="closeDialog()" mdc-surface>
          <mdc-icon mdc-list-item-graphic>add</mdc-icon>add account
        </mdc-list-item>
      </mdc-list>
    </mdc-dialog-body>
  </mdc-dialog>
  `,
})
export class DialogNoFooterExample {
  constructor(
    public dialogRef: MdcDialogRef<DialogNoFooterExample>) { }

  closeDialog() {
    this.dialogRef.close();
  }
}

@Component({
  template: `
  <mdc-dialog>
    <mdc-dialog-header>
      <mdc-dialog-header-title>
        Profile
      </mdc-dialog-header-title>
    </mdc-dialog-header>
    <mdc-dialog-body>
      <form [formGroup]="userForm" id="userForm" (ngSubmit)="updateForm();">
        <mdc-text-field #input formControlName="username" label="Username" [required]="true"></mdc-text-field>
        <p mdc-text-field-helper-text [validation]="true" [persistent]="false">Username is required</p>
      </form>
    </mdc-dialog-body>
    <mdc-dialog-footer>
      <button mdc-dialog-button [cancel]="true">Cancel</button>
      <button mdc-dialog-button [action]="true" [focused]="true" type="submit" form="userForm">Update</button>
    </mdc-dialog-footer>
  </mdc-dialog>
  `,
})
export class DialogFormExample implements OnInit {
  userForm: FormGroup;
  @ViewChild('input') input: MdcTextField;

  constructor(
    public dialogRef: MdcDialogRef<DialogFormExample>) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required)
    });
    // this.userForm.controls['username'].setValue('Sample name');
  }

  closeDialog() {
    this.dialogRef.close();
  }

  updateForm() {
    if (!this.userForm.valid) {
      if (!this.input.valid) {
        this.input.setValid(false);
      }
      return;
    }
    this.closeDialog();
  }
}

@Component({
  templateUrl: './dialog-service.html',
})
export class DialogServiceTab {
  isEscapeToClose: boolean = true;
  isClickOutsideToClose: boolean = true;

  constructor(public dialog: MdcDialog) { }

  openSimple() {
    const dialogRef = this.dialog.open(DialogSimpleExample, {
      escapeToClose: this.isEscapeToClose,
      clickOutsideToClose: this.isClickOutsideToClose,
    });
  }

  openScrolling() {
    const dialogRef = this.dialog.open(DialogScrollingExample, {
      escapeToClose: this.isEscapeToClose,
      clickOutsideToClose: this.isClickOutsideToClose,
    });
  }

  openAlert() {
    const dialogRef = this.dialog.open(DialogAlertExample, {
      escapeToClose: false,
      clickOutsideToClose: false,
    });
  }

  openNoFooter() {
    const dialogRef = this.dialog.open(DialogNoFooterExample, {
      escapeToClose: this.isEscapeToClose,
      clickOutsideToClose: this.isClickOutsideToClose,
    });
  }

  openForm() {
    const dialogRef = this.dialog.open(DialogFormExample, {
      escapeToClose: this.isEscapeToClose,
      clickOutsideToClose: this.isClickOutsideToClose,
    });
  }
}

@Component({
  templateUrl: './dialog-declarative.html',
})
export class DialogTab {
  isEscapeToClose: boolean = true;
  isClickOutsideToClose: boolean = true;

  @ViewChild('myDialog') myDialog: MdcDialogComponent;

  openDialog() {
    this.myDialog.show();
  }
}
